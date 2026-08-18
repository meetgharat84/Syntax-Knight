import * as babelParser from '@babel/parser';

export interface EvaluationResult {
  isCorrect: boolean;
  errorMsg: string;
  syntaxValid: boolean;
}

/**
 * Normalizes string literals in user code so that any valid string literal
 * (inside single quotes, double quotes, or backticks) is converted to a wildcard token.
 */
export function normalizeStringLiterals(code: string): string {
  if (!code) return '';

  // 1. Replace template literal contents: `...`
  let normalized = code.replace(/`([^`\\]|\\.)*`/g, (match) => {
    return match.replace(/`([\s\S]*?)`/g, (_m, inner) => {
      const parts = inner.split(/(\${[\s\S]*?})/);
      const replacedParts = parts.map((part: string) => {
        if (part.startsWith('${') && part.endsWith('}')) {
          return part;
        }
        return '__STRING_LITERAL__';
      });
      return '`' + replacedParts.join('') + '`';
    });
  });

  // 2. Replace double-quoted strings: "..."
  normalized = normalized.replace(/"([^"\\]|\\.)*"/g, '"__STRING_LITERAL__"');

  // 3. Replace single-quoted strings: '...'
  normalized = normalized.replace(/'([^'\\]|\\.)*'/g, "'__STRING_LITERAL__'");

  return normalized;
}

/**
 * Validates whether string literals (quotes and template strings) in code are properly closed.
 */
export function checkUnclosedStrings(code: string): { isValid: boolean; errorMsg?: string; line?: number } {
  const lines = code.split('\n');
  let inMultiLineString: string | null = null;
  let multiLineStart = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    let inSingleQuote = false;
    let inDoubleQuote = false;
    let escaped = false;

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      if (escaped) {
        escaped = false;
        continue;
      }

      if (char === '\\') {
        escaped = true;
        continue;
      }

      if (char === '`' && !inSingleQuote && !inDoubleQuote) {
        if (inMultiLineString === '`') {
          inMultiLineString = null;
        } else if (!inMultiLineString) {
          inMultiLineString = '`';
          multiLineStart = i + 1;
        }
      } else if (char === '"' && !inSingleQuote && !inMultiLineString) {
        inDoubleQuote = !inDoubleQuote;
      } else if (char === "'" && !inDoubleQuote && !inMultiLineString) {
        inSingleQuote = !inSingleQuote;
      }
    }

    if (inSingleQuote) {
      return { isValid: false, errorMsg: `Unclosed single quote (') on line ${i + 1}`, line: i + 1 };
    }
    if (inDoubleQuote) {
      return { isValid: false, errorMsg: `Unclosed double quote (") on line ${i + 1}`, line: i + 1 };
    }
  }

  if (inMultiLineString) {
    return { isValid: false, errorMsg: `Unclosed template literal (\`) starting on line ${multiLineStart}`, line: multiLineStart };
  }

  return { isValid: true };
}

/**
 * Checks matching brackets, parentheses, and braces across code lines.
 */
export function checkMatchingBrackets(code: string): { isValid: boolean; errorMsg?: string } {
  const stack: { char: string; line: number }[] = [];
  const lines = code.split('\n');

  let inString: string | null = null;
  let escaped = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    for (let j = 0; j < line.length; j++) {
      const char = line[j];

      if (escaped) {
        escaped = false;
        continue;
      }
      if (char === '\\') {
        escaped = true;
        continue;
      }

      if (inString) {
        if (char === inString) {
          inString = null;
        }
        continue;
      }

      if (char === '"' || char === "'" || char === '`') {
        inString = char;
        continue;
      }

      if (char === '/' && line[j + 1] === '/') {
        break;
      }
      if (char === '#') {
        break;
      }

      if (char === '(' || char === '[' || char === '{') {
        stack.push({ char, line: i + 1 });
      } else if (char === ')' || char === ']' || char === '}') {
        if (stack.length === 0) {
          const expected = char === ')' ? '(' : char === ']' ? '[' : '{';
          return { isValid: false, errorMsg: `Unexpected closing '${char}' on line ${i + 1} without matching '${expected}'` };
        }
        const top = stack.pop()!;
        const matchPair = (top.char === '(' && char === ')') ||
          (top.char === '[' && char === ']') ||
          (top.char === '{' && char === '}');
        if (!matchPair) {
          return { isValid: false, errorMsg: `Mismatched bracket: '${top.char}' opened on line ${top.line} closed with '${char}' on line ${i + 1}` };
        }
      }
    }
  }

  if (stack.length > 0) {
    const top = stack[stack.length - 1];
    return { isValid: false, errorMsg: `Unclosed bracket '${top.char}' on line ${top.line}` };
  }

  return { isValid: true };
}

/**
 * Validates Python syntax (indentation, colon placement, keywords).
 */
export function checkPythonSyntax(code: string): { isValid: boolean; errorMsg?: string } {
  const lines = code.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const blockKeywords = ['if ', 'elif ', 'else', 'def ', 'for ', 'while ', 'class ', 'try', 'except', 'finally', 'with '];
    const startsBlock = blockKeywords.some(kw => trimmed.startsWith(kw) || trimmed === kw);

    if (startsBlock) {
      if (!trimmed.endsWith(':') && !trimmed.includes('#')) {
        return {
          isValid: false,
          errorMsg: `Missing colon ':' at the end of block statement on line ${i + 1}: "${trimmed}"`
        };
      }
    }
  }

  return { isValid: true };
}

/**
 * Validates JavaScript / TypeScript / React syntax using Babel AST Parser.
 */
export function parseJsTsAst(code: string): { isValid: boolean; errorMsg?: string; ast?: any } {
  try {
    const ast = babelParser.parse(code, {
      sourceType: 'module',
      plugins: [
        'jsx',
        'typescript',
        'decorators-legacy',
        'doExpressions',
        'exportDefaultFrom',
      ] as any,
      errorRecovery: false,
    });
    return { isValid: true, ast };
  } catch (err: any) {
    let msg = err.message || 'Syntax error';
    if (err.loc) {
      msg = `Syntax error on line ${err.loc.line}, col ${err.loc.column}: ${msg.replace(/\s*\(\d+:\d+\)/, '')}`;
    }
    return { isValid: false, errorMsg: msg };
  }
}

/**
 * Transforms rigid regexes containing specific string literal requirements
 * into relaxed regexes that accept wildcard string literals (`__STRING_LITERAL__` or any string).
 */
export function relaxValidationRegex(regexStr: string): RegExp {
  try {
    let relaxed = regexStr;

    relaxed = relaxed
      .replace(/\["\\'\][^"'\\]+?\["\\'\]/g, '(["\'].*?["\']|__STRING_LITERAL__)')
      .replace(/\\?["']([^"'\\]+?)\\?["']/g, '(["\'].*?["\']|__STRING_LITERAL__)');

    return new RegExp(relaxed, 'i');
  } catch (_err) {
    return new RegExp(regexStr, 'i');
  }
}

const MAX_CODE_LENGTH = 50000;

/**
 * Main evaluation entry point for SyntaxKnight.
 * Checks AST / Syntax FIRST, then validates code structure against the relaxed requirements.
 * Performs 100% isolated static AST parsing without eval() or dynamic code execution.
 */
export function evaluateCode(
  code: string,
  validationRegex: string,
  language: string = 'javascript'
): EvaluationResult {
  try {
    const trimmed = code ? code.trim() : '';

    if (!trimmed) {
      return {
        isCorrect: false,
        syntaxValid: false,
        errorMsg: 'Empty code submission — write your code, Knight!'
      };
    }

    if (trimmed.length > MAX_CODE_LENGTH) {
      return {
        isCorrect: false,
        syntaxValid: false,
        errorMsg: `Code payload exceeds safety limit (${MAX_CODE_LENGTH} characters).`
      };
    }

    // 1. Check unclosed string literals
    const stringCheck = checkUnclosedStrings(trimmed);
    if (!stringCheck.isValid) {
      return {
        isCorrect: false,
        syntaxValid: false,
        errorMsg: stringCheck.errorMsg || 'Unclosed string literal detected.'
      };
    }

    // 2. Check matching brackets/parentheses/braces
    const bracketCheck = checkMatchingBrackets(trimmed);
    if (!bracketCheck.isValid) {
      return {
        isCorrect: false,
        syntaxValid: false,
        errorMsg: bracketCheck.errorMsg || 'Syntax error: Bracket mismatch.'
      };
    }

    const langLower = language.toLowerCase();

    // 3. Full AST syntax check for JavaScript / TypeScript / React
    if (['javascript', 'js', 'typescript', 'ts', 'react', 'jsx', 'tsx'].includes(langLower)) {
      const astResult = parseJsTsAst(trimmed);
      if (!astResult.isValid) {
        return {
          isCorrect: false,
          syntaxValid: false,
          errorMsg: astResult.errorMsg || 'Syntax Error in JavaScript/TypeScript code.'
        };
      }
    }

    // 4. Python-specific syntax checks
    if (langLower === 'python' || langLower === 'py') {
      const pyResult = checkPythonSyntax(trimmed);
      if (!pyResult.isValid) {
        return {
          isCorrect: false,
          syntaxValid: false,
          errorMsg: pyResult.errorMsg || 'Python Syntax Error.'
        };
      }
    }

    // Syntax is 100% valid at this point!
    // 5. Structure & Pattern Validation with String Wildcarding
    const normalizedCode = normalizeStringLiterals(trimmed);

    const originalRegex = new RegExp(validationRegex, 'i');
    const relaxedRegex = relaxValidationRegex(validationRegex);

    const passesOriginal = originalRegex.test(trimmed);
    const passesNormalized = relaxedRegex.test(normalizedCode) || originalRegex.test(normalizedCode);

    if (passesOriginal || passesNormalized) {
      return {
        isCorrect: true,
        syntaxValid: true,
        errorMsg: ''
      };
    }

    return {
      isCorrect: false,
      syntaxValid: true,
      errorMsg: 'Syntax is valid ✅, but code structure does not fulfill the challenge requirements.'
    };
  } catch (err: any) {
    return {
      isCorrect: false,
      syntaxValid: false,
      errorMsg: `Evaluation error: ${err.message || 'Malformed input'}`
    };
  }
}
