export interface LevelCodex {
  analogy: string;
  blueprint: string;
  deepDive: string;
}

export interface SyllabusLevel {
  id: string;
  levelNumber: number;
  title: string;
  tier: 'Beginner' | 'Intermediate' | 'Grandmaster';
  codex: LevelCodex;
  instructions: string;
  initialCode: string;
  validationRegex: string;
  hint: string;
}

export interface SyllabusWorld {
  worldId: string;
  worldName: string;
  levels: SyllabusLevel[];
}

const rawWorldSyllabus: SyllabusWorld[] = [
  {
    "worldId": "html5",
    "worldName": "HTML5",
    "levels": []
  },
  {
    "worldId": "css3",
    "worldName": "CSS3",
    "levels": []
  },
  {
    "worldId": "javascript",
    "worldName": "JavaScript",
    "levels": [
      {
        "id": "javascript-print-console-01",
        "levelNumber": 1,
        "title": "Print Console",
        "tier": "Beginner",
        "codex": {
          "analogy": "Print Console outputs formatted strings to the system debugging console.",
          "blueprint": "```\\nconsole.log(\"Developer\");\\n```",
          "deepDive": "Deep dive documentation details for Print Console implementations."
        },
        "instructions": "Log the text \"Developer\" to the console.",
        "initialCode": "// Practice Print Console code here\n",
        "validationRegex": "console\\\\.log\\\\(\\\\s*[\"\\']Developer[\"\\']",
        "hint": "Example pattern match target: console.log(\"Developer\");"
      },
      {
        "id": "javascript-variables-declaration-02",
        "levelNumber": 2,
        "title": "Variables Declaration",
        "tier": "Beginner",
        "codex": {
          "analogy": "Variables store values in memory locations for reuse across application logic.",
          "blueprint": "```\\nconst score = 100;\\n```",
          "deepDive": "Deep dive documentation details for Variables Declaration implementations."
        },
        "instructions": "Declare a constant variable named score initialized to 100.",
        "initialCode": "// Practice Variables Declaration code here\n",
        "validationRegex": "const\\\\s+score\\\\s*=\\\\s*100",
        "hint": "Example pattern match target: const score = 100;"
      },
      {
        "id": "javascript-arithmetic-operations-03",
        "levelNumber": 3,
        "title": "Arithmetic operations",
        "tier": "Beginner",
        "codex": {
          "analogy": "Arithmetic operations compute numerical totals such as cart price calculations.",
          "blueprint": "```\\nconst total = price + tax;\\n```",
          "deepDive": "Deep dive documentation details for Arithmetic operations implementations."
        },
        "instructions": "Declare constant total storing sum of variables price and tax.",
        "initialCode": "// Practice Arithmetic operations code here\n",
        "validationRegex": "const\\\\s+total\\\\s*=\\\\s*price\\\\s*\\\\+\\\\s*tax",
        "hint": "Example pattern match target: const total = price + tax;"
      },
      {
        "id": "javascript-if-else-decisions-04",
        "levelNumber": 4,
        "title": "If-Else Decisions",
        "tier": "Beginner",
        "codex": {
          "analogy": "Conditional branches evaluate boolean state expressions to execute targeted code logic.",
          "blueprint": "```\\nif (score >= 100) {\n  active = true;\n}\\n```",
          "deepDive": "Deep dive documentation details for If-Else Decisions implementations."
        },
        "instructions": "Wrap decision logic setting active to true if score is greater than or equal to 100.",
        "initialCode": "// Practice If-Else Decisions code here\n",
        "validationRegex": "if\\\\s*\\\\(\\\\s*score\\\\s*>=\\\\s*100\\\\s*\\\\)",
        "hint": "Example pattern match target: if (score >= 100) {"
      },
      {
        "id": "javascript-functions-creation-05",
        "levelNumber": 5,
        "title": "Functions creation",
        "tier": "Beginner",
        "codex": {
          "analogy": "Functions encapsulate reusable logic blocks with input parameters and return values.",
          "blueprint": "```\\nfunction greet() {\n  return \"Hello\";\n}\\n```",
          "deepDive": "Deep dive documentation details for Functions creation implementations."
        },
        "instructions": "Define a simple function named greet that returns the string \"Hello\".",
        "initialCode": "// Practice Functions creation code here\n",
        "validationRegex": "function\\\\s+greet\\\\s*\\\\(\\\\s*\\\\)",
        "hint": "Example pattern match target: function greet() {"
      },
      {
        "id": "javascript-arrays-declaration-06",
        "levelNumber": 6,
        "title": "Arrays declaration",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Arrays store ordered collections of data items in contiguous memory slots.",
          "blueprint": "```\\nconst list = [1, 2];\\n```",
          "deepDive": "Deep dive documentation details for Arrays declaration implementations."
        },
        "instructions": "Declare array constant list holding elements 1 and 2.",
        "initialCode": "// Practice Arrays declaration code here\n",
        "validationRegex": "const\\\\s+list\\\\s*=\\\\s*\\\\[\\\\s*1\\\\s*,\\\\s*2\\\\s*\\\\]",
        "hint": "Example pattern match target: const list = [1, 2];"
      },
      {
        "id": "javascript-accessing-lists-07",
        "levelNumber": 7,
        "title": "Accessing lists",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Zero-based indexing accesses specific elements from data arrays.",
          "blueprint": "```\\nconst item = list[0];\\n```",
          "deepDive": "Deep dive documentation details for Accessing lists implementations."
        },
        "instructions": "Retrieve the first element from array list and store in constant item.",
        "initialCode": "// Practice Accessing lists code here\n",
        "validationRegex": "list\\\\[\\\\s*0\\\\s*\\\\]",
        "hint": "Example pattern match target: const item = list[0];"
      },
      {
        "id": "javascript-object-creations-08",
        "levelNumber": 8,
        "title": "Object creations",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Objects bind structured key-value property fields together.",
          "blueprint": "```\\nconst user = { id: 100 };\\n```",
          "deepDive": "Deep dive documentation details for Object creations implementations."
        },
        "instructions": "Create object constant user holding key id mapped to 100.",
        "initialCode": "// Practice Object creations code here\n",
        "validationRegex": "const\\\\s+user\\\\s*=\\\\s*\\\\{\\\\s*id\\\\s*:\\\\s*100\\\\s*\\\\}",
        "hint": "Example pattern match target: const user = { id: 100 };"
      },
      {
        "id": "javascript-for-loops-iteration-09",
        "levelNumber": 9,
        "title": "For Loops iteration",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Loops repeatedly execute code statements until a loop termination condition is met.",
          "blueprint": "```\\nfor (let i = 0; i < 3; i++) {}\\n```",
          "deepDive": "Deep dive documentation details for For Loops iteration implementations."
        },
        "instructions": "Construct loop iterating from index 0 to 2.",
        "initialCode": "// Practice For Loops iteration code here\n",
        "validationRegex": "for\\\\s*\\\\(\\\\s*let\\\\s+i",
        "hint": "Example pattern match target: for (let i = 0; i < 3; i++) {}"
      },
      {
        "id": "javascript-arrays-transmutation-filter-10",
        "levelNumber": 10,
        "title": "Arrays Transmutation filter",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Filter creates a subset array containing only elements matching criteria.",
          "blueprint": "```\\nlist.filter(x => x > 10)\\n```",
          "deepDive": "Deep dive documentation details for Arrays Transmutation filter implementations."
        },
        "instructions": "Filter elements of list keeping values greater than 10.",
        "initialCode": "// Practice Arrays Transmutation filter code here\n",
        "validationRegex": "filter.*map|filter",
        "hint": "Example pattern match target: list.filter(x => x > 10)"
      },
      {
        "id": "javascript-try-catch-interceptors-11",
        "levelNumber": 11,
        "title": "Try Catch interceptors",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Try-catch blocks intercept operational exceptions cleanly without crashing.",
          "blueprint": "```\\ntry { run(); } catch(e) {}\\n```",
          "deepDive": "Deep dive documentation details for Try Catch interceptors implementations."
        },
        "instructions": "Wrap run() call inside try-catch block catching exception parameter e.",
        "initialCode": "// Practice Try Catch interceptors code here\n",
        "validationRegex": "try\\\\s*\\\\{[\\\\s\\\\S]*?\\\\}\\\\s*catch",
        "hint": "Example pattern match target: try { run(); } catch(e) {}"
      },
      {
        "id": "javascript-simple-promises-12",
        "levelNumber": 12,
        "title": "Simple promises",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Promises manage asynchronous task resolution for API requests.",
          "blueprint": "```\\nnew Promise(resolve => resolve());\\n```",
          "deepDive": "Deep dive documentation details for Simple promises implementations."
        },
        "instructions": "Instantiate a simple Promise resolving immediately.",
        "initialCode": "// Practice Simple promises code here\n",
        "validationRegex": "new\\\\s+Promise",
        "hint": "Example pattern match target: new Promise(resolve => resolve());"
      },
      {
        "id": "javascript-nullish-coalescing-fallback-13",
        "levelNumber": 13,
        "title": "Nullish Coalescing fallback",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Nullish coalescing evaluates default fallback values when a variable is null.",
          "blueprint": "```\\nconst val = name ?? \"Guest\";\\n```",
          "deepDive": "Deep dive documentation details for Nullish Coalescing fallback implementations."
        },
        "instructions": "Assign name to val using nullish fallback ?? operator with default \"Guest\".",
        "initialCode": "// Practice Nullish Coalescing fallback code here\n",
        "validationRegex": "\\\\?\\\\?\\\\s*[\"\\']Guest[\"\\']",
        "hint": "Example pattern match target: const val = name ?? \"Guest\";"
      },
      {
        "id": "javascript-destructuring-objects-14",
        "levelNumber": 14,
        "title": "Destructuring objects",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Destructuring objects inside JS Academy.",
          "blueprint": "```\\nconst { hp } = hero;\\n```",
          "deepDive": "Deep dive documentation details for Destructuring objects implementations."
        },
        "instructions": "Extract hp parameter from hero object using destructuring syntax.",
        "initialCode": "// Practice Destructuring objects code here\n",
        "validationRegex": "const\\\\s*\\\\{\\\\s*hp\\\\s*\\\\}\\\\s*=\\\\s*hero",
        "hint": "Example pattern match target: const { hp } = hero;"
      },
      {
        "id": "javascript-async-await-pipelines-15",
        "levelNumber": 15,
        "title": "Async await pipelines",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Async await pipelines inside JS Academy.",
          "blueprint": "```\\nasync function load() {\n  await fetch();\n}\\n```",
          "deepDive": "Deep dive documentation details for Async await pipelines implementations."
        },
        "instructions": "Declare async function load awaiting fetch calls.",
        "initialCode": "// Practice Async await pipelines code here\n",
        "validationRegex": "async.*await",
        "hint": "Example pattern match target: async function load() {"
      }
    ]
  },
  {
    "worldId": "react",
    "worldName": "React",
    "levels": [
      {
        "id": "react-jsx-prints-01",
        "levelNumber": 1,
        "title": "JSX prints",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for JSX prints inside React Kingdom.",
          "blueprint": "```\\nreturn <h1>Welcome</h1>;\\n```",
          "deepDive": "Deep dive documentation details for JSX prints implementations."
        },
        "instructions": "Return main heading tag Welcomes inside JSX.",
        "initialCode": "// Practice JSX prints code here\n",
        "validationRegex": "return\\\\s+<h1.*Welcome",
        "hint": "Example pattern match target: return <h1>Welcome</h1>;"
      },
      {
        "id": "react-basic-component-elements-02",
        "levelNumber": 2,
        "title": "Basic Component elements",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Basic Component elements inside React Kingdom.",
          "blueprint": "```\\nexport default function Card() {\n  return <div>Card</div>;\n}\\n```",
          "deepDive": "Deep dive documentation details for Basic Component elements implementations."
        },
        "instructions": "Define standard React component Card returning Welcome.",
        "initialCode": "// Practice Basic Component elements code here\n",
        "validationRegex": "function\\\\s+Card",
        "hint": "Example pattern match target: export default function Card() {"
      },
      {
        "id": "react-props-attributes-03",
        "levelNumber": 3,
        "title": "Props attributes",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Props attributes inside React Kingdom.",
          "blueprint": "```\\nfunction Card({ name }) {\n  return <h1>{name}</h1>;\n}\\n```",
          "deepDive": "Deep dive documentation details for Props attributes implementations."
        },
        "instructions": "Define component Card destructuring name from props attribute.",
        "initialCode": "// Practice Props attributes code here\n",
        "validationRegex": "Card\\\\(\\\\s*\\\\{\\\\s*name\\\\s*\\\\}\\\\s*\\\\)",
        "hint": "Example pattern match target: function Card({ name }) {"
      },
      {
        "id": "react-state-initializations-04",
        "levelNumber": 4,
        "title": "State Initializations",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for State Initializations inside React Kingdom.",
          "blueprint": "```\\nconst [hp, setHp] = useState(100);\\n```",
          "deepDive": "Deep dive documentation details for State Initializations implementations."
        },
        "instructions": "Initialize state hook hp to value 100.",
        "initialCode": "// Practice State Initializations code here\n",
        "validationRegex": "useState\\\\(\\\\s*100\\\\s*\\\\)",
        "hint": "Example pattern match target: const [hp, setHp] = useState(100);"
      },
      {
        "id": "react-state-mutations-hooks-05",
        "levelNumber": 5,
        "title": "State Mutations hooks",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for State Mutations hooks inside React Kingdom.",
          "blueprint": "```\\nsetHp(50);\\n```",
          "deepDive": "Deep dive documentation details for State Mutations hooks implementations."
        },
        "instructions": "Mutate state value to 50 using setHp state dispatcher.",
        "initialCode": "// Practice State Mutations hooks code here\n",
        "validationRegex": "setHp\\\\(\\\\s*50\\\\s*\\\\)",
        "hint": "Example pattern match target: setHp(50);"
      },
      {
        "id": "react-conditional-rendering-06",
        "levelNumber": 6,
        "title": "Conditional Rendering",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Conditional Rendering inside React Kingdom.",
          "blueprint": "```\\nreturn active ? <Show /> : <Hide />;\\n```",
          "deepDive": "Deep dive documentation details for Conditional Rendering implementations."
        },
        "instructions": "Conditionally render Show or Hide components using ternary tags.",
        "initialCode": "// Practice Conditional Rendering code here\n",
        "validationRegex": "active\\\\s*\\\\?\\\\s*<Show.*:",
        "hint": "Example pattern match target: return active ? <Show /> : <Hide />;"
      },
      {
        "id": "react-iterative-lists-render-07",
        "levelNumber": 7,
        "title": "Iterative lists render",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Iterative lists render inside React Kingdom.",
          "blueprint": "```\\nitems.map(item => <li key={item.id}>{item.name}</li>)\\n```",
          "deepDive": "Deep dive documentation details for Iterative lists render implementations."
        },
        "instructions": "Map collection items inside JSX list elements configuring unique keys.",
        "initialCode": "// Practice Iterative lists render code here\n",
        "validationRegex": "map\\\\(.*key",
        "hint": "Example pattern match target: items.map(item => <li key={item.id}>{item.name}</li>)"
      },
      {
        "id": "react-ref-hooks-dom-references-08",
        "levelNumber": 8,
        "title": "Ref Hooks DOM references",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Ref Hooks DOM references inside React Kingdom.",
          "blueprint": "```\\nconst ref = useRef(null);\\n```",
          "deepDive": "Deep dive documentation details for Ref Hooks DOM references implementations."
        },
        "instructions": "Define reference container ref initialized to null.",
        "initialCode": "// Practice Ref Hooks DOM references code here\n",
        "validationRegex": "useRef\\\\(\\\\s*null\\\\s*\\\\)",
        "hint": "Example pattern match target: const ref = useRef(null);"
      },
      {
        "id": "react-global-context-streams-09",
        "levelNumber": 9,
        "title": "Global context streams",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Global context streams inside React Kingdom.",
          "blueprint": "```\\nuseContext(ThemeContext);\\n```",
          "deepDive": "Deep dive documentation details for Global context streams implementations."
        },
        "instructions": "Retrieve ThemeContext global values.",
        "initialCode": "// Practice Global context streams code here\n",
        "validationRegex": "useContext",
        "hint": "Example pattern match target: useContext(ThemeContext);"
      },
      {
        "id": "react-memoized-caches-10",
        "levelNumber": 10,
        "title": "Memoized caches",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Memoized caches inside React Kingdom.",
          "blueprint": "```\\nuseMemo(() => load(), []);\\n```",
          "deepDive": "Deep dive documentation details for Memoized caches implementations."
        },
        "instructions": "Cache calculations values utilizing useMemo hook.",
        "initialCode": "// Practice Memoized caches code here\n",
        "validationRegex": "useMemo",
        "hint": "Example pattern match target: useMemo(() => load(), []);"
      },
      {
        "id": "react-callback-memo-handlers-11",
        "levelNumber": 11,
        "title": "Callback memo handlers",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Callback memo handlers inside React Kingdom.",
          "blueprint": "```\\nuseCallback(() => click(), []);\\n```",
          "deepDive": "Deep dive documentation details for Callback memo handlers implementations."
        },
        "instructions": "Cache inline click handler logic using useCallback.",
        "initialCode": "// Practice Callback memo handlers code here\n",
        "validationRegex": "useCallback",
        "hint": "Example pattern match target: useCallback(() => click(), []);"
      },
      {
        "id": "react-strict-validations-wrappers-12",
        "levelNumber": 12,
        "title": "Strict validations wrappers",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Strict validations wrappers inside React Kingdom.",
          "blueprint": "```\\n<React.StrictMode></React.StrictMode>\\n```",
          "deepDive": "Deep dive documentation details for Strict validations wrappers implementations."
        },
        "instructions": "Inject StrictMode validation boundaries.",
        "initialCode": "// Practice Strict validations wrappers code here\n",
        "validationRegex": "StrictMode",
        "hint": "Example pattern match target: <React.StrictMode></React.StrictMode>"
      },
      {
        "id": "react-reducer-state-engines-13",
        "levelNumber": 13,
        "title": "Reducer State engines",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Reducer State engines inside React Kingdom.",
          "blueprint": "```\\nuseReducer(reducer, initial);\\n```",
          "deepDive": "Deep dive documentation details for Reducer State engines implementations."
        },
        "instructions": "Manage state structures utilizing useReducer hook configurations.",
        "initialCode": "// Practice Reducer State engines code here\n",
        "validationRegex": "useReducer",
        "hint": "Example pattern match target: useReducer(reducer, initial);"
      },
      {
        "id": "react-react-portal-windowing-14",
        "levelNumber": 14,
        "title": "React Portal windowing",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for React Portal windowing inside React Kingdom.",
          "blueprint": "```\\ncreatePortal(children, node);\\n```",
          "deepDive": "Deep dive documentation details for React Portal windowing implementations."
        },
        "instructions": "Route elements outputs inside separate nodes using createPortal.",
        "initialCode": "// Practice React Portal windowing code here\n",
        "validationRegex": "createPortal",
        "hint": "Example pattern match target: createPortal(children, node);"
      },
      {
        "id": "react-suspense-lazy-boundaries-15",
        "levelNumber": 15,
        "title": "Suspense Lazy boundaries",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Suspense Lazy boundaries inside React Kingdom.",
          "blueprint": "```\\n<Suspense fallback={<Loading />}></Suspense>\\n```",
          "deepDive": "Deep dive documentation details for Suspense Lazy boundaries implementations."
        },
        "instructions": "Wrap items inside Suspense boundary configuring loading fallback component.",
        "initialCode": "// Practice Suspense Lazy boundaries code here\n",
        "validationRegex": "Suspense",
        "hint": "Example pattern match target: <Suspense fallback={<Loading />}></Suspense>"
      }
    ]
  },
  {
    "worldId": "python-node",
    "worldName": "Python",
    "levels": [
      {
        "id": "python-node-print-outputs-strings-01",
        "levelNumber": 1,
        "title": "Print outputs strings",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Print outputs strings inside Python Node.",
          "blueprint": "```\\nprint(\"Python\")\\n```",
          "deepDive": "Deep dive documentation details for Print outputs strings implementations."
        },
        "instructions": "Print message Python to standard console.",
        "initialCode": "// Practice Print outputs strings code here\n",
        "validationRegex": "print\\\\(\\\\s*[\"\\']Python[\"\\']",
        "hint": "Example pattern match target: print(\"Python\")"
      },
      {
        "id": "python-node-variables-assignments-types-02",
        "levelNumber": 2,
        "title": "Variables assignments types",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Variables assignments types inside Python Node.",
          "blueprint": "```\\nscore = 100\\n```",
          "deepDive": "Deep dive documentation details for Variables assignments types implementations."
        },
        "instructions": "Initialize variable score to value 100.",
        "initialCode": "// Practice Variables assignments types code here\n",
        "validationRegex": "score\\\\s*=\\\\s*100",
        "hint": "Example pattern match target: score = 100"
      },
      {
        "id": "python-node-conditional-branches-03",
        "levelNumber": 3,
        "title": "Conditional branches",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Conditional branches inside Python Node.",
          "blueprint": "```\\nif score > 50:\n  pass\\n```",
          "deepDive": "Deep dive documentation details for Conditional branches implementations."
        },
        "instructions": "Declare conditional branch evaluating score greater than 50.",
        "initialCode": "// Practice Conditional branches code here\n",
        "validationRegex": "if\\\\s+score\\\\s*>",
        "hint": "Example pattern match target: if score > 50:"
      },
      {
        "id": "python-node-functions-creations-04",
        "levelNumber": 4,
        "title": "Functions creations",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Functions creations inside Python Node.",
          "blueprint": "```\\ndef run():\n  return True\\n```",
          "deepDive": "Deep dive documentation details for Functions creations implementations."
        },
        "instructions": "Define standard function run returning True.",
        "initialCode": "// Practice Functions creations code here\n",
        "validationRegex": "def\\\\s+run\\\\(\\\\s*\\\\)",
        "hint": "Example pattern match target: def run():"
      },
      {
        "id": "python-node-lists-collections-mappings-05",
        "levelNumber": 5,
        "title": "Lists collections mappings",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Lists collections mappings inside Python Node.",
          "blueprint": "```\\nitems = [1, 2]\\n```",
          "deepDive": "Deep dive documentation details for Lists collections mappings implementations."
        },
        "instructions": "Initialize list items storing elements 1 and 2.",
        "initialCode": "// Practice Lists collections mappings code here\n",
        "validationRegex": "items\\\\s*=\\\\s*\\\\[\\\\s*1\\\\s*,\\\\s*2\\\\s*\\\\]",
        "hint": "Example pattern match target: items = [1, 2]"
      },
      {
        "id": "python-node-accessing-lists-variables-06",
        "levelNumber": 6,
        "title": "Accessing lists variables",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Accessing lists variables inside Python Node.",
          "blueprint": "```\\nval = items[0]\\n```",
          "deepDive": "Deep dive documentation details for Accessing lists variables implementations."
        },
        "instructions": "Extract first element from list items.",
        "initialCode": "// Practice Accessing lists variables code here\n",
        "validationRegex": "items\\\\[\\\\s*0\\\\s*\\\\]",
        "hint": "Example pattern match target: val = items[0]"
      },
      {
        "id": "python-node-classes-objects-models-07",
        "levelNumber": 7,
        "title": "Classes objects models",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Classes objects models inside Python Node.",
          "blueprint": "```\\nclass Hero:\n  pass\\n```",
          "deepDive": "Deep dive documentation details for Classes objects models implementations."
        },
        "instructions": "Define class Hero wrapper structure.",
        "initialCode": "// Practice Classes objects models code here\n",
        "validationRegex": "class\\\\s+Hero",
        "hint": "Example pattern match target: class Hero:"
      },
      {
        "id": "python-node-loops-ranges-iteration-08",
        "levelNumber": 8,
        "title": "Loops ranges iteration",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Loops ranges iteration inside Python Node.",
          "blueprint": "```\\nfor i in range(3):\n  pass\\n```",
          "deepDive": "Deep dive documentation details for Loops ranges iteration implementations."
        },
        "instructions": "Construct loop iterating from index 0 to 2.",
        "initialCode": "// Practice Loops ranges iteration code here\n",
        "validationRegex": "for\\\\s+i\\\\s+in\\\\s+range",
        "hint": "Example pattern match target: for i in range(3):"
      },
      {
        "id": "python-node-collections-filter-comprehension-09",
        "levelNumber": 9,
        "title": "Collections Filter comprehension",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Collections Filter comprehension inside Python Node.",
          "blueprint": "```\\n[x for x in data if x > 10]\\n```",
          "deepDive": "Deep dive documentation details for Collections Filter comprehension implementations."
        },
        "instructions": "Filter data elements returning list values greater than 10.",
        "initialCode": "// Practice Collections Filter comprehension code here\n",
        "validationRegex": "\\\\[.*for.*if",
        "hint": "Example pattern match target: [x for x in data if x > 10]"
      },
      {
        "id": "python-node-functional-lambdas-maps-10",
        "levelNumber": 10,
        "title": "Functional lambdas maps",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Functional lambdas maps inside Python Node.",
          "blueprint": "```\\nfn = lambda x: x * 2\\n```",
          "deepDive": "Deep dive documentation details for Functional lambdas maps implementations."
        },
        "instructions": "Assign simple lambda multiplying x by 2 to variable fn.",
        "initialCode": "// Practice Functional lambdas maps code here\n",
        "validationRegex": "lambda\\\\s+x",
        "hint": "Example pattern match target: fn = lambda x: x * 2"
      },
      {
        "id": "python-node-exceptions-try-blocks-11",
        "levelNumber": 11,
        "title": "Exceptions try blocks",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Exceptions try blocks inside Python Node.",
          "blueprint": "```\\ntry:\n  run()\nexcept Exception:\n  pass\\n```",
          "deepDive": "Deep dive documentation details for Exceptions try blocks implementations."
        },
        "instructions": "Wrap run() call inside try block catching Exception scopes.",
        "initialCode": "// Practice Exceptions try blocks code here\n",
        "validationRegex": "try\\\\s*:.*except",
        "hint": "Example pattern match target: try:"
      },
      {
        "id": "python-node-file-context-readers-12",
        "levelNumber": 12,
        "title": "File context readers",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for File context readers inside Python Node.",
          "blueprint": "```\\nwith open(\"log.txt\") as f:\n  pass\\n```",
          "deepDive": "Deep dive documentation details for File context readers implementations."
        },
        "instructions": "Open log.txt file wrapper utilizing with keyword.",
        "initialCode": "// Practice File context readers code here\n",
        "validationRegex": "with\\\\s+open",
        "hint": "Example pattern match target: with open(\"log.txt\") as f:"
      },
      {
        "id": "python-node-method-decorators-wrappers-13",
        "levelNumber": 13,
        "title": "Method decorators wrappers",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Method decorators wrappers inside Python Node.",
          "blueprint": "```\\n@log_call\ndef play():\n  pass\\n```",
          "deepDive": "Deep dive documentation details for Method decorators wrappers implementations."
        },
        "instructions": "Decorate play function configurations with log_call method.",
        "initialCode": "// Practice Method decorators wrappers code here\n",
        "validationRegex": "@log_call",
        "hint": "Example pattern match target: @log_call"
      },
      {
        "id": "python-node-generator-yields-iterations-14",
        "levelNumber": 14,
        "title": "Generator yields iterations",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Generator yields iterations inside Python Node.",
          "blueprint": "```\\ndef numbers():\n  yield 1\\n```",
          "deepDive": "Deep dive documentation details for Generator yields iterations implementations."
        },
        "instructions": "Declare generator function numbers yielding 1.",
        "initialCode": "// Practice Generator yields iterations code here\n",
        "validationRegex": "yield",
        "hint": "Example pattern match target: def numbers():"
      },
      {
        "id": "python-node-async-coroutines-loops-15",
        "levelNumber": 15,
        "title": "Async coroutines loops",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Async coroutines loops inside Python Node.",
          "blueprint": "```\\nasync def play():\n  await sleep()\\n```",
          "deepDive": "Deep dive documentation details for Async coroutines loops implementations."
        },
        "instructions": "Declare async function play awaiting sleep triggers.",
        "initialCode": "// Practice Async coroutines loops code here\n",
        "validationRegex": "async.*await",
        "hint": "Example pattern match target: async def play():"
      }
    ]
  },
  {
    "worldId": "cpp-shield",
    "worldName": "C++",
    "levels": [
      {
        "id": "cpp-shield-print-outputs-scopes-01",
        "levelNumber": 1,
        "title": "Print outputs scopes",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Print outputs scopes inside C++ Shield.",
          "blueprint": "```\\nstd::cout << \"C++\";\\n```",
          "deepDive": "Deep dive documentation details for Print outputs scopes implementations."
        },
        "instructions": "Print message C++ using standard output stream std::cout.",
        "initialCode": "// Practice Print outputs scopes code here\n",
        "validationRegex": "cout\\\\s*<<\\\\s*[\"\\']C\\\\+\\\\+[\"\\']",
        "hint": "Example pattern match target: std::cout << \"C++\";"
      },
      {
        "id": "cpp-shield-variables-assignments-types-02",
        "levelNumber": 2,
        "title": "Variables assignments types",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Variables assignments types inside C++ Shield.",
          "blueprint": "```\\nint hp = 100;\\n```",
          "deepDive": "Deep dive documentation details for Variables assignments types implementations."
        },
        "instructions": "Declare integer variable hp set to value 100.",
        "initialCode": "// Practice Variables assignments types code here\n",
        "validationRegex": "int\\\\s+hp\\\\s*=\\\\s*100",
        "hint": "Example pattern match target: int hp = 100;"
      },
      {
        "id": "cpp-shield-conditional-scopes-evaluation-03",
        "levelNumber": 3,
        "title": "Conditional scopes evaluation",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Conditional scopes evaluation inside C++ Shield.",
          "blueprint": "```\\nif (hp > 50) {}\\n```",
          "deepDive": "Deep dive documentation details for Conditional scopes evaluation implementations."
        },
        "instructions": "Verify conditions validating if hp is greater than 50.",
        "initialCode": "// Practice Conditional scopes evaluation code here\n",
        "validationRegex": "if\\\\s*\\\\(\\\\s*hp",
        "hint": "Example pattern match target: if (hp > 50) {}"
      },
      {
        "id": "cpp-shield-functions-structures-04",
        "levelNumber": 4,
        "title": "Functions structures",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Functions structures inside C++ Shield.",
          "blueprint": "```\\nint run() { return 0; }\\n```",
          "deepDive": "Deep dive documentation details for Functions structures implementations."
        },
        "instructions": "Define integer function run returning 0.",
        "initialCode": "// Practice Functions structures code here\n",
        "validationRegex": "int\\\\s+run\\\\(\\\\s*\\\\)",
        "hint": "Example pattern match target: int run() { return 0; }"
      },
      {
        "id": "cpp-shield-vectors-arrays-creations-05",
        "levelNumber": 5,
        "title": "Vectors arrays creations",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Vectors arrays creations inside C++ Shield.",
          "blueprint": "```\\nstd::vector<int> list = {1, 2};\\n```",
          "deepDive": "Deep dive documentation details for Vectors arrays creations implementations."
        },
        "instructions": "Initialize vector list holding integers 1 and 2.",
        "initialCode": "// Practice Vectors arrays creations code here\n",
        "validationRegex": "vector\\\\s*<.*>",
        "hint": "Example pattern match target: std::vector<int> list = {1, 2};"
      },
      {
        "id": "cpp-shield-references-passing-variables-06",
        "levelNumber": 6,
        "title": "References passing variables",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for References passing variables inside C++ Shield.",
          "blueprint": "```\\nvoid run(int &ref) {}\\n```",
          "deepDive": "Deep dive documentation details for References passing variables implementations."
        },
        "instructions": "Define void function run accepting integer reference parameter ref.",
        "initialCode": "// Practice References passing variables code here\n",
        "validationRegex": "void\\\\s+run\\\\(\\\\s*int\\\\s*&",
        "hint": "Example pattern match target: void run(int &ref) {}"
      },
      {
        "id": "cpp-shield-pointer-addresses-extraction-07",
        "levelNumber": 7,
        "title": "Pointer addresses extraction",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Pointer addresses extraction inside C++ Shield.",
          "blueprint": "```\\nint* ptr = &hp;\\n```",
          "deepDive": "Deep dive documentation details for Pointer addresses extraction implementations."
        },
        "instructions": "Initialize integer pointer variable ptr storing address of hp.",
        "initialCode": "// Practice Pointer addresses extraction code here\n",
        "validationRegex": "int\\\\s*\\\\*\\\\s*\\\\w+\\\\s*=\\\\s*&",
        "hint": "Example pattern match target: int* ptr = &hp;"
      },
      {
        "id": "cpp-shield-loops-vectors-traversal-08",
        "levelNumber": 8,
        "title": "Loops vectors traversal",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Loops vectors traversal inside C++ Shield.",
          "blueprint": "```\\nfor(int x : list) {}\\n```",
          "deepDive": "Deep dive documentation details for Loops vectors traversal implementations."
        },
        "instructions": "Iterate over elements list utilizing range-based for loops.",
        "initialCode": "// Practice Loops vectors traversal code here\n",
        "validationRegex": "for\\\\s*\\\\(\\\\s*int",
        "hint": "Example pattern match target: for(int x : list) {}"
      },
      {
        "id": "cpp-shield-virtual-methods-polymorphism-09",
        "levelNumber": 9,
        "title": "Virtual methods polymorphism",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Virtual methods polymorphism inside C++ Shield.",
          "blueprint": "```\\nvirtual int run() override {}\\n```",
          "deepDive": "Deep dive documentation details for Virtual methods polymorphism implementations."
        },
        "instructions": "Override virtual method declarations utilizing override keywords.",
        "initialCode": "// Practice Virtual methods polymorphism code here\n",
        "validationRegex": "override",
        "hint": "Example pattern match target: virtual int run() override {}"
      },
      {
        "id": "cpp-shield-exceptions-catch-blocks-10",
        "levelNumber": 10,
        "title": "Exceptions catch blocks",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Exceptions catch blocks inside C++ Shield.",
          "blueprint": "```\\ntry { run(); } catch(...) {}\\n```",
          "deepDive": "Deep dive documentation details for Exceptions catch blocks implementations."
        },
        "instructions": "Catch exceptions triggers wrapping run() call.",
        "initialCode": "// Practice Exceptions catch blocks code here\n",
        "validationRegex": "try\\\\s*\\\\{[\\\\s\\\\S]*?\\\\}\\\\s*catch",
        "hint": "Example pattern match target: try { run(); } catch(...) {}"
      },
      {
        "id": "cpp-shield-file-inputs-streams-11",
        "levelNumber": 11,
        "title": "File inputs streams",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for File inputs streams inside C++ Shield.",
          "blueprint": "```\\nstd::ifstream file(\"log.txt\");\\n```",
          "deepDive": "Deep dive documentation details for File inputs streams implementations."
        },
        "instructions": "Open file inputs wrapper stream loading log.txt.",
        "initialCode": "// Practice File inputs streams code here\n",
        "validationRegex": "ifstream",
        "hint": "Example pattern match target: std::ifstream file(\"log.txt\");"
      },
      {
        "id": "cpp-shield-smart-pointers-allocations-12",
        "levelNumber": 12,
        "title": "Smart Pointers allocations",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Smart Pointers allocations inside C++ Shield.",
          "blueprint": "```\\nstd::unique_ptr<int> ptr = std::make_unique<int>(5);\\n```",
          "deepDive": "Deep dive documentation details for Smart Pointers allocations implementations."
        },
        "instructions": "Initialize smart pointer unique_ptr utilizing make_unique.",
        "initialCode": "// Practice Smart Pointers allocations code here\n",
        "validationRegex": "unique_ptr.*make_unique",
        "hint": "Example pattern match target: std::unique_ptr<int> ptr = std::make_unique<int>(5);"
      },
      {
        "id": "cpp-shield-template-functions-patterns-13",
        "levelNumber": 13,
        "title": "Template functions patterns",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Template functions patterns inside C++ Shield.",
          "blueprint": "```\\ntemplate <typename T>\nT add(T a) {}\\n```",
          "deepDive": "Deep dive documentation details for Template functions patterns implementations."
        },
        "instructions": "Declare template configurations capturing generic type T.",
        "initialCode": "// Practice Template functions patterns code here\n",
        "validationRegex": "template\\\\s*<",
        "hint": "Example pattern match target: template <typename T>"
      },
      {
        "id": "cpp-shield-namespaces-isolation-containers-14",
        "levelNumber": 14,
        "title": "Namespaces isolation containers",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Namespaces isolation containers inside C++ Shield.",
          "blueprint": "```\\nnamespace Game {}\\n```",
          "deepDive": "Deep dive documentation details for Namespaces isolation containers implementations."
        },
        "instructions": "Wrap classes allocations inside namespace isolation context Game.",
        "initialCode": "// Practice Namespaces isolation containers code here\n",
        "validationRegex": "namespace",
        "hint": "Example pattern match target: namespace Game {}"
      },
      {
        "id": "cpp-shield-mutex-thread-configurations-15",
        "levelNumber": 15,
        "title": "Mutex thread configurations",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Mutex thread configurations inside C++ Shield.",
          "blueprint": "```\\nstd::lock_guard<std::mutex> lock(mtx);\\n```",
          "deepDive": "Deep dive documentation details for Mutex thread configurations implementations."
        },
        "instructions": "Lock execution block using mutex lock_guard.",
        "initialCode": "// Practice Mutex thread configurations code here\n",
        "validationRegex": "lock_guard",
        "hint": "Example pattern match target: std::lock_guard<std::mutex> lock(mtx);"
      }
    ]
  },
  {
    "worldId": "java-core",
    "worldName": "Java",
    "levels": [
      {
        "id": "java-core-system-outputs-prints-01",
        "levelNumber": 1,
        "title": "System outputs prints",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for System outputs prints inside Java Core.",
          "blueprint": "```\\nSystem.out.print(\"Java\");\\n```",
          "deepDive": "Deep dive documentation details for System outputs prints implementations."
        },
        "instructions": "Print message Java to standard output stream.",
        "initialCode": "// Practice System outputs prints code here\n",
        "validationRegex": "System\\\\.out\\\\.print",
        "hint": "Example pattern match target: System.out.print(\"Java\");"
      },
      {
        "id": "java-core-primitive-types-initialization-02",
        "levelNumber": 2,
        "title": "Primitive types initialization",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Primitive types initialization inside Java Core.",
          "blueprint": "```\\nint score = 100;\\n```",
          "deepDive": "Deep dive documentation details for Primitive types initialization implementations."
        },
        "instructions": "Declare integer variable score set to value 100.",
        "initialCode": "// Practice Primitive types initialization code here\n",
        "validationRegex": "int\\\\s+score\\\\s*=\\\\s*100",
        "hint": "Example pattern match target: int score = 100;"
      },
      {
        "id": "java-core-conditionals-validations-branches-03",
        "levelNumber": 3,
        "title": "Conditionals validations branches",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Conditionals validations branches inside Java Core.",
          "blueprint": "```\\nif (score > 50) {}\\n```",
          "deepDive": "Deep dive documentation details for Conditionals validations branches implementations."
        },
        "instructions": "Verify conditions checks evaluating score greater than 50.",
        "initialCode": "// Practice Conditionals validations branches code here\n",
        "validationRegex": "if\\\\s*\\\\(\\\\s*score",
        "hint": "Example pattern match target: if (score > 50) {}"
      },
      {
        "id": "java-core-methods-signatures-declarations-04",
        "levelNumber": 4,
        "title": "Methods signatures declarations",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Methods signatures declarations inside Java Core.",
          "blueprint": "```\\npublic int run() { return 0; }\\n```",
          "deepDive": "Deep dive documentation details for Methods signatures declarations implementations."
        },
        "instructions": "Define public method run returning 0.",
        "initialCode": "// Practice Methods signatures declarations code here\n",
        "validationRegex": "public\\\\s+int\\\\s+run",
        "hint": "Example pattern match target: public int run() { return 0; }"
      },
      {
        "id": "java-core-lists-creations-wrappers-05",
        "levelNumber": 5,
        "title": "Lists creations wrappers",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Lists creations wrappers inside Java Core.",
          "blueprint": "```\\nList<Integer> list = new ArrayList<>();\\n```",
          "deepDive": "Deep dive documentation details for Lists creations wrappers implementations."
        },
        "instructions": "Initialize integer list using ArrayList mappings.",
        "initialCode": "// Practice Lists creations wrappers code here\n",
        "validationRegex": "List\\\\s*<",
        "hint": "Example pattern match target: List<Integer> list = new ArrayList<>();"
      },
      {
        "id": "java-core-maps-lookup-dictionaries-06",
        "levelNumber": 6,
        "title": "Maps lookup dictionaries",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Maps lookup dictionaries inside Java Core.",
          "blueprint": "```\\nMap<String, Integer> map = new HashMap<>();\\n```",
          "deepDive": "Deep dive documentation details for Maps lookup dictionaries implementations."
        },
        "instructions": "Initialize String-to-Integer lookup map using HashMap.",
        "initialCode": "// Practice Maps lookup dictionaries code here\n",
        "validationRegex": "Map\\\\s*<",
        "hint": "Example pattern match target: Map<String, Integer> map = new HashMap<>();"
      },
      {
        "id": "java-core-interface-signatures-implementations-07",
        "levelNumber": 7,
        "title": "Interface signatures implementations",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Interface signatures implementations inside Java Core.",
          "blueprint": "```\\nclass Knight implements Unit {}\\n```",
          "deepDive": "Deep dive documentation details for Interface signatures implementations implementations."
        },
        "instructions": "Implement interface Unit on class Knight.",
        "initialCode": "// Practice Interface signatures implementations code here\n",
        "validationRegex": "implements",
        "hint": "Example pattern match target: class Knight implements Unit {}"
      },
      {
        "id": "java-core-loops-collections-iterators-08",
        "levelNumber": 8,
        "title": "Loops collections iterators",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Loops collections iterators inside Java Core.",
          "blueprint": "```\\nfor(int x : list) {}\\n```",
          "deepDive": "Deep dive documentation details for Loops collections iterators implementations."
        },
        "instructions": "Iterate over list values utilizing for loop.",
        "initialCode": "// Practice Loops collections iterators code here\n",
        "validationRegex": "for\\\\s*\\\\(\\\\s*int",
        "hint": "Example pattern match target: for(int x : list) {}"
      },
      {
        "id": "java-core-functional-streams-filters-09",
        "levelNumber": 9,
        "title": "Functional streams filters",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Functional streams filters inside Java Core.",
          "blueprint": "```\\nlist.stream().filter(x -> x > 10)\\n```",
          "deepDive": "Deep dive documentation details for Functional streams filters implementations."
        },
        "instructions": "Filter values stream keeping integers greater than 10.",
        "initialCode": "// Practice Functional streams filters code here\n",
        "validationRegex": "stream\\\\(\\\\s*\\\\)\\\\s*\\\\.\\\\s*filter",
        "hint": "Example pattern match target: list.stream().filter(x -> x > 10)"
      },
      {
        "id": "java-core-exceptions-try-handling-10",
        "levelNumber": 10,
        "title": "Exceptions try handling",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Exceptions try handling inside Java Core.",
          "blueprint": "```\\ntry { run(); } catch(Exception e) {}\\n```",
          "deepDive": "Deep dive documentation details for Exceptions try handling implementations."
        },
        "instructions": "Wrap executions inside try-catch block catching Exception e.",
        "initialCode": "// Practice Exceptions try handling code here\n",
        "validationRegex": "try\\\\s*\\\\{[\\\\s\\\\S]*?\\\\}\\\\s*catch",
        "hint": "Example pattern match target: try { run(); } catch(Exception e) {}"
      },
      {
        "id": "java-core-optional-values-containers-11",
        "levelNumber": 11,
        "title": "Optional values containers",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Optional values containers inside Java Core.",
          "blueprint": "```\\nOptional.ofNullable(val);\\n```",
          "deepDive": "Deep dive documentation details for Optional values containers implementations."
        },
        "instructions": "Wrap reference safely using Optional ofNullable wrapper.",
        "initialCode": "// Practice Optional values containers code here\n",
        "validationRegex": "Optional\\\\.ofNullable",
        "hint": "Example pattern match target: Optional.ofNullable(val);"
      },
      {
        "id": "java-core-files-operations-writing-12",
        "levelNumber": 12,
        "title": "Files operations writing",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Files operations writing inside Java Core.",
          "blueprint": "```\\nFiles.writeString(path, data);\\n```",
          "deepDive": "Deep dive documentation details for Files operations writing implementations."
        },
        "instructions": "Write text content string to path destination using NIO Files API.",
        "initialCode": "// Practice Files operations writing code here\n",
        "validationRegex": "Files\\\\.writeString",
        "hint": "Example pattern match target: Files.writeString(path, data);"
      },
      {
        "id": "java-core-thread-loops-allocation-13",
        "levelNumber": 13,
        "title": "Thread loops allocation",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Thread loops allocation inside Java Core.",
          "blueprint": "```\\nnew Thread(() -> run()).start();\\n```",
          "deepDive": "Deep dive documentation details for Thread loops allocation implementations."
        },
        "instructions": "Instantiate Thread passing Runnable lambda and start it.",
        "initialCode": "// Practice Thread loops allocation code here\n",
        "validationRegex": "new\\\\s+Thread.*start",
        "hint": "Example pattern match target: new Thread(() -> run()).start();"
      },
      {
        "id": "java-core-records-structures-containers-14",
        "levelNumber": 14,
        "title": "Records structures containers",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Records structures containers inside Java Core.",
          "blueprint": "```\\nrecord Point(int x) {}\\n```",
          "deepDive": "Deep dive documentation details for Records structures containers implementations."
        },
        "instructions": "Define data record entity structure Point holding integer x.",
        "initialCode": "// Practice Records structures containers code here\n",
        "validationRegex": "record",
        "hint": "Example pattern match target: record Point(int x) {}"
      },
      {
        "id": "java-core-generics-class-specifications-15",
        "levelNumber": 15,
        "title": "Generics class specifications",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Generics class specifications inside Java Core.",
          "blueprint": "```\\nclass Box<T> {}\\n```",
          "deepDive": "Deep dive documentation details for Generics class specifications implementations."
        },
        "instructions": "Declare generic class mapping type parameter T.",
        "initialCode": "// Practice Generics class specifications code here\n",
        "validationRegex": "class\\\\s+\\\\w+\\\\s*<\\\\s*T\\\\s*>",
        "hint": "Example pattern match target: class Box<T> {}"
      }
    ]
  },
  {
    "worldId": "rust-grid",
    "worldName": "Rust",
    "levels": [
      {
        "id": "rust-grid-println-formatting-print-01",
        "levelNumber": 1,
        "title": "Println formatting print",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Println formatting print inside Rust Grid.",
          "blueprint": "```\\nprintln!(\"Rust\");\\n```",
          "deepDive": "Deep dive documentation details for Println formatting print implementations."
        },
        "instructions": "Print message Rust utilizing standard print macro println!.",
        "initialCode": "// Practice Println formatting print code here\n",
        "validationRegex": "println\\\\s*!\\\\s*\\\\(\\\\s*[\"\\']Rust[\"\\']",
        "hint": "Example pattern match target: println!(\"Rust\");"
      },
      {
        "id": "rust-grid-let-variables-bindings-02",
        "levelNumber": 2,
        "title": "Let variables bindings",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Let variables bindings inside Rust Grid.",
          "blueprint": "```\\nlet score = 100;\\n```",
          "deepDive": "Deep dive documentation details for Let variables bindings implementations."
        },
        "instructions": "Declare immutable variable binding score initialized to 100.",
        "initialCode": "// Practice Let variables bindings code here\n",
        "validationRegex": "let\\\\s+score\\\\s*=\\s*100",
        "hint": "Example pattern match target: let score = 100;"
      },
      {
        "id": "rust-grid-if-else-checks-03",
        "levelNumber": 3,
        "title": "If else checks",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for If else checks inside Rust Grid.",
          "blueprint": "```\\nif score > 50 {}\\n```",
          "deepDive": "Deep dive documentation details for If else checks implementations."
        },
        "instructions": "Evaluate if score variable is greater than 50.",
        "initialCode": "// Practice If else checks code here\n",
        "validationRegex": "if\\\\s+score\\\\s*>",
        "hint": "Example pattern match target: if score > 50 {}"
      },
      {
        "id": "rust-grid-functions-structures-declarations-04",
        "levelNumber": 4,
        "title": "Functions structures declarations",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Functions structures declarations inside Rust Grid.",
          "blueprint": "```\\nfn run() -> bool { true }\\n```",
          "deepDive": "Deep dive documentation details for Functions structures declarations implementations."
        },
        "instructions": "Define function run returning boolean true.",
        "initialCode": "// Practice Functions structures declarations code here\n",
        "validationRegex": "fn\\\\s+run\\\\(\\\\s*\\\\)\\\\s*->",
        "hint": "Example pattern match target: fn run() -> bool { true }"
      },
      {
        "id": "rust-grid-vectors-arrays-creations-05",
        "levelNumber": 5,
        "title": "Vectors arrays creations",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Vectors arrays creations inside Rust Grid.",
          "blueprint": "```\\nlet list = vec![1, 2];\\n```",
          "deepDive": "Deep dive documentation details for Vectors arrays creations implementations."
        },
        "instructions": "Initialize vector list holding integers 1 and 2.",
        "initialCode": "// Practice Vectors arrays creations code here\n",
        "validationRegex": "let\\\\s+\\\\w+\\\\s*=\\\\s*vec!",
        "hint": "Example pattern match target: let list = vec![1, 2];"
      },
      {
        "id": "rust-grid-struct-definitions-fields-06",
        "levelNumber": 6,
        "title": "Struct definitions fields",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Struct definitions fields inside Rust Grid.",
          "blueprint": "```\\nstruct Knight {\n  hp: u32,\n}\\n```",
          "deepDive": "Deep dive documentation details for Struct definitions fields implementations."
        },
        "instructions": "Define struct Knight containing unsigned integer attribute hp.",
        "initialCode": "// Practice Struct definitions fields code here\n",
        "validationRegex": "struct\\\\s+Knight",
        "hint": "Example pattern match target: struct Knight {"
      },
      {
        "id": "rust-grid-enum-variant-matches-07",
        "levelNumber": 7,
        "title": "Enum variant matches",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Enum variant matches inside Rust Grid.",
          "blueprint": "```\\nenum State {\n  Active,\n}\\n```",
          "deepDive": "Deep dive documentation details for Enum variant matches implementations."
        },
        "instructions": "Define enum State containing Active variant.",
        "initialCode": "// Practice Enum variant matches code here\n",
        "validationRegex": "enum\\\\s+State",
        "hint": "Example pattern match target: enum State {"
      },
      {
        "id": "rust-grid-loops-iterator-traversals-08",
        "levelNumber": 8,
        "title": "Loops iterator traversals",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Loops iterator traversals inside Rust Grid.",
          "blueprint": "```\\nfor x in list.iter() {}\\n```",
          "deepDive": "Deep dive documentation details for Loops iterator traversals implementations."
        },
        "instructions": "Traverse list elements utilizing iter() loops.",
        "initialCode": "// Practice Loops iterator traversals code here\n",
        "validationRegex": "for\\\\s+\\\\w+\\\\s+in",
        "hint": "Example pattern match target: for x in list.iter() {}"
      },
      {
        "id": "rust-grid-pattern-matching-branches-09",
        "levelNumber": 9,
        "title": "Pattern matching branches",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Pattern matching branches inside Rust Grid.",
          "blueprint": "```\\nmatch state {\n  State::Active => 1,\n}\\n```",
          "deepDive": "Deep dive documentation details for Pattern matching branches implementations."
        },
        "instructions": "Match state variables branches returning integer.",
        "initialCode": "// Practice Pattern matching branches code here\n",
        "validationRegex": "match\\\\s+\\\\w+\\\\s*\\{",
        "hint": "Example pattern match target: match state {"
      },
      {
        "id": "rust-grid-trait-behaviors-specifications-10",
        "levelNumber": 10,
        "title": "Trait behaviors specifications",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Trait behaviors specifications inside Rust Grid.",
          "blueprint": "```\\nimpl Combat for Knight {}\\n```",
          "deepDive": "Deep dive documentation details for Trait behaviors specifications implementations."
        },
        "instructions": "Implement Combat trait for struct Knight.",
        "initialCode": "// Practice Trait behaviors specifications code here\n",
        "validationRegex": "impl\\\\s+Combat\\\\s+for",
        "hint": "Example pattern match target: impl Combat for Knight {}"
      },
      {
        "id": "rust-grid-option-safely-unwraps-11",
        "levelNumber": 11,
        "title": "Option safely unwraps",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Option safely unwraps inside Rust Grid.",
          "blueprint": "```\\nopt.unwrap();\\n```",
          "deepDive": "Deep dive documentation details for Option safely unwraps implementations."
        },
        "instructions": "Extract variables safely from Option wrappers using unwrap.",
        "initialCode": "// Practice Option safely unwraps code here\n",
        "validationRegex": "unwrap",
        "hint": "Example pattern match target: opt.unwrap();"
      },
      {
        "id": "rust-grid-result-errors-propagation-12",
        "levelNumber": 12,
        "title": "Result errors propagation",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Result errors propagation inside Rust Grid.",
          "blueprint": "```\\nlet file = open()?;\\n```",
          "deepDive": "Deep dive documentation details for Result errors propagation implementations."
        },
        "instructions": "Propagate execution errors utilizing question mark operator.",
        "initialCode": "// Practice Result errors propagation code here\n",
        "validationRegex": "\\\\?",
        "hint": "Example pattern match target: let file = open()?;"
      },
      {
        "id": "rust-grid-shared-arc-pointer-13",
        "levelNumber": 13,
        "title": "Shared Arc pointer",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Shared Arc pointer inside Rust Grid.",
          "blueprint": "```\\nArc::new(Mutex::new(5));\\n```",
          "deepDive": "Deep dive documentation details for Shared Arc pointer implementations."
        },
        "instructions": "Establish thread-safe shared mutex reference locked under Arc.",
        "initialCode": "// Practice Shared Arc pointer code here\n",
        "validationRegex": "Arc::new",
        "hint": "Example pattern match target: Arc::new(Mutex::new(5));"
      },
      {
        "id": "rust-grid-thread-spawning-loops-14",
        "levelNumber": 14,
        "title": "Thread spawning loops",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Thread spawning loops inside Rust Grid.",
          "blueprint": "```\\nthread::spawn(move || {});\\n```",
          "deepDive": "Deep dive documentation details for Thread spawning loops implementations."
        },
        "instructions": "Spawn system processing thread passing closure.",
        "initialCode": "// Practice Thread spawning loops code here\n",
        "validationRegex": "thread::spawn",
        "hint": "Example pattern match target: thread::spawn(move || {});"
      },
      {
        "id": "rust-grid-lifetimes-references-parameters-15",
        "levelNumber": 15,
        "title": "Lifetimes references parameters",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Lifetimes references parameters inside Rust Grid.",
          "blueprint": "```\\nstruct Doc<'a> {\n  text: &'a str,\n}\\n```",
          "deepDive": "Deep dive documentation details for Lifetimes references parameters implementations."
        },
        "instructions": "Define struct Doc enclosing lifetime string reference annotation a.",
        "initialCode": "// Practice Lifetimes references parameters code here\n",
        "validationRegex": "<\\\\s*\\\\'a\\\\s*>",
        "hint": "Example pattern match target: struct Doc<'a> {"
      }
    ]
  },
  {
    "worldId": "typescript",
    "worldName": "TypeScript",
    "levels": [
      {
        "id": "typescript-print-logging-console-01",
        "levelNumber": 1,
        "title": "Print logging console",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Print logging console inside TypeScript Temple.",
          "blueprint": "```\\nconsole.log(\"TS\");\\n```",
          "deepDive": "Deep dive documentation details for Print logging console implementations."
        },
        "instructions": "Print message TS to developer console.",
        "initialCode": "// Practice Print logging console code here\n",
        "validationRegex": "console\\\\.log\\\\(\\\\s*[\"\\']TS[\"\\']",
        "hint": "Example pattern match target: console.log(\"TS\");"
      },
      {
        "id": "typescript-strict-types-annotation-02",
        "levelNumber": 2,
        "title": "Strict Types annotation",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Strict Types annotation inside TypeScript Temple.",
          "blueprint": "```\\nlet score: number = 100;\\n```",
          "deepDive": "Deep dive documentation details for Strict Types annotation implementations."
        },
        "instructions": "Declare variable score annotated as number type initialized to 100.",
        "initialCode": "// Practice Strict Types annotation code here\n",
        "validationRegex": "let\\\\s+score\\\\s*:\\\\s*number",
        "hint": "Example pattern match target: let score: number = 100;"
      },
      {
        "id": "typescript-interfaces-constraints-specifications-03",
        "levelNumber": 3,
        "title": "Interfaces constraints specifications",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Interfaces constraints specifications inside TypeScript Temple.",
          "blueprint": "```\\ninterface Knight {\n  hp: number;\n}\\n```",
          "deepDive": "Deep dive documentation details for Interfaces constraints specifications implementations."
        },
        "instructions": "Define interface Knight enforcing numeric attribute hp.",
        "initialCode": "// Practice Interfaces constraints specifications code here\n",
        "validationRegex": "interface\\\\s+Knight",
        "hint": "Example pattern match target: interface Knight {"
      },
      {
        "id": "typescript-union-types-validations-04",
        "levelNumber": 4,
        "title": "Union types validations",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Union types validations inside TypeScript Temple.",
          "blueprint": "```\\nlet val: string | number = 10;\\n```",
          "deepDive": "Deep dive documentation details for Union types validations implementations."
        },
        "instructions": "Declare variable supporting string or number inputs types.",
        "initialCode": "// Practice Union types validations code here\n",
        "validationRegex": "let\\\\s+\\\\w+\\\\s*:\\\\s*string\\\\s*\\\\|\\\\s*number",
        "hint": "Example pattern match target: let val: string | number = 10;"
      },
      {
        "id": "typescript-class-typed-attributes-05",
        "levelNumber": 5,
        "title": "Class typed attributes",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Class typed attributes inside TypeScript Temple.",
          "blueprint": "```\\nclass Hero {\n  private hp: number = 100;\n}\\n```",
          "deepDive": "Deep dive documentation details for Class typed attributes implementations."
        },
        "instructions": "Declare private class attribute hp initialized to 100.",
        "initialCode": "// Practice Class typed attributes code here\n",
        "validationRegex": "private\\\\s+hp",
        "hint": "Example pattern match target: class Hero {"
      },
      {
        "id": "typescript-generics-types-variables-06",
        "levelNumber": 6,
        "title": "Generics types variables",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Generics types variables inside TypeScript Temple.",
          "blueprint": "```\\nfunction identity<T>(arg: T): T {}\\n```",
          "deepDive": "Deep dive documentation details for Generics types variables implementations."
        },
        "instructions": "Define generic function identity parameterizing type T.",
        "initialCode": "// Practice Generics types variables code here\n",
        "validationRegex": "identity\\\\s*<\\\\s*T\\\\s*>",
        "hint": "Example pattern match target: function identity<T>(arg: T): T {}"
      },
      {
        "id": "typescript-string-enums-parameters-07",
        "levelNumber": 7,
        "title": "String enums parameters",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for String enums parameters inside TypeScript Temple.",
          "blueprint": "```\\nenum Role {\n  Knight = \"KNIGHT\"\n}\\n```",
          "deepDive": "Deep dive documentation details for String enums parameters implementations."
        },
        "instructions": "Define string enum Role containing Knight mapped to string.",
        "initialCode": "// Practice String enums parameters code here\n",
        "validationRegex": "enum\\\\s+Role",
        "hint": "Example pattern match target: enum Role {"
      },
      {
        "id": "typescript-custom-type-aliases-08",
        "levelNumber": 8,
        "title": "Custom Type Aliases",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Custom Type Aliases inside TypeScript Temple.",
          "blueprint": "```\\ntype ID = string | number;\\n```",
          "deepDive": "Deep dive documentation details for Custom Type Aliases implementations."
        },
        "instructions": "Declare custom type alias ID supporting string or number types.",
        "initialCode": "// Practice Custom Type Aliases code here\n",
        "validationRegex": "type\\\\s+ID",
        "hint": "Example pattern match target: type ID = string | number;"
      },
      {
        "id": "typescript-partial-utility-types-09",
        "levelNumber": 9,
        "title": "Partial utility types",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Partial utility types inside TypeScript Temple.",
          "blueprint": "```\\nlet opt: Partial<Knight>;\\n```",
          "deepDive": "Deep dive documentation details for Partial utility types implementations."
        },
        "instructions": "Declare optional options variable block utilizing Partial helper.",
        "initialCode": "// Practice Partial utility types code here\n",
        "validationRegex": "Partial\\\\s*<",
        "hint": "Example pattern match target: let opt: Partial<Knight>;"
      },
      {
        "id": "typescript-type-narrowing-checks-10",
        "levelNumber": 10,
        "title": "Type Narrowing checks",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Type Narrowing checks inside TypeScript Temple.",
          "blueprint": "```\\nif (typeof val === \"string\") {}\\n```",
          "deepDive": "Deep dive documentation details for Type Narrowing checks implementations."
        },
        "instructions": "Verify variable types alignment using typeof guards checks.",
        "initialCode": "// Practice Type Narrowing checks code here\n",
        "validationRegex": "typeof",
        "hint": "Example pattern match target: if (typeof val === \"string\") {}"
      },
      {
        "id": "typescript-never-exhaustiveness-bounds-11",
        "levelNumber": 11,
        "title": "Never exhaustiveness bounds",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Never exhaustiveness bounds inside TypeScript Temple.",
          "blueprint": "```\\nfunction fail(): never {}\\n```",
          "deepDive": "Deep dive documentation details for Never exhaustiveness bounds implementations."
        },
        "instructions": "Define validation fallback functions returning type never.",
        "initialCode": "// Practice Never exhaustiveness bounds code here\n",
        "validationRegex": ":\\\\s*never",
        "hint": "Example pattern match target: function fail(): never {}"
      },
      {
        "id": "typescript-readonly-properties-variables-12",
        "levelNumber": 12,
        "title": "Readonly properties variables",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Readonly properties variables inside TypeScript Temple.",
          "blueprint": "```\\nreadonly name: string;\\n```",
          "deepDive": "Deep dive documentation details for Readonly properties variables implementations."
        },
        "instructions": "Lock interface attribute fields declaring them readonly.",
        "initialCode": "// Practice Readonly properties variables code here\n",
        "validationRegex": "readonly",
        "hint": "Example pattern match target: readonly name: string;"
      },
      {
        "id": "typescript-required-properties-enforce-13",
        "levelNumber": 13,
        "title": "Required properties enforce",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Required properties enforce inside TypeScript Temple.",
          "blueprint": "```\\nlet opt: Required<Knight>;\\n```",
          "deepDive": "Deep dive documentation details for Required properties enforce implementations."
        },
        "instructions": "Enforce mandatory presence of attributes fields using Required helper.",
        "initialCode": "// Practice Required properties enforce code here\n",
        "validationRegex": "Required",
        "hint": "Example pattern match target: let opt: Required<Knight>;"
      },
      {
        "id": "typescript-keyof-extraction-signatures-14",
        "levelNumber": 14,
        "title": "Keyof extraction signatures",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Keyof extraction signatures inside TypeScript Temple.",
          "blueprint": "```\\ntype Keys = keyof Knight;\\n```",
          "deepDive": "Deep dive documentation details for Keyof extraction signatures implementations."
        },
        "instructions": "Extract union keys signatures using keyof operator.",
        "initialCode": "// Practice Keyof extraction signatures code here\n",
        "validationRegex": "keyof",
        "hint": "Example pattern match target: type Keys = keyof Knight;"
      },
      {
        "id": "typescript-mapped-types-mappings-15",
        "levelNumber": 15,
        "title": "Mapped Types mappings",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Mapped Types mappings inside TypeScript Temple.",
          "blueprint": "```\\ntype ReadOnly<T> = { readonly [P in keyof T]: T[P] };\\n```",
          "deepDive": "Deep dive documentation details for Mapped Types mappings implementations."
        },
        "instructions": "Define type transforms utilizing mapped types iterations.",
        "initialCode": "// Practice Mapped Types mappings code here\n",
        "validationRegex": "in\\\\s+keyof",
        "hint": "Example pattern match target: type ReadOnly<T> = { readonly [P in keyof T]: T[P] };"
      }
    ]
  },
  {
    "worldId": "sql",
    "worldName": "SQL",
    "levels": [
      {
        "id": "sql-select-fields-columns-01",
        "levelNumber": 1,
        "title": "SELECT fields columns",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for SELECT fields columns inside SQL Vault.",
          "blueprint": "```\\nSELECT name FROM knights;\\n```",
          "deepDive": "Deep dive documentation details for SELECT fields columns implementations."
        },
        "instructions": "Select column name from table knights.",
        "initialCode": "// Practice SELECT fields columns code here\n",
        "validationRegex": "SELECT\\\\s+name\\\\s+FROM",
        "hint": "Example pattern match target: SELECT name FROM knights;"
      },
      {
        "id": "sql-where-filters-constraints-02",
        "levelNumber": 2,
        "title": "WHERE filters constraints",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for WHERE filters constraints inside SQL Vault.",
          "blueprint": "```\\nSELECT * FROM knights WHERE hp > 50;\\n```",
          "deepDive": "Deep dive documentation details for WHERE filters constraints implementations."
        },
        "instructions": "Filter knights keeping elements where hp is greater than 50.",
        "initialCode": "// Practice WHERE filters constraints code here\n",
        "validationRegex": "WHERE\\\\s+hp\\\\s*>",
        "hint": "Example pattern match target: SELECT * FROM knights WHERE hp > 50;"
      },
      {
        "id": "sql-insert-record-inserts-03",
        "levelNumber": 3,
        "title": "INSERT record inserts",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for INSERT record inserts inside SQL Vault.",
          "blueprint": "```\\nINSERT INTO knights (name) VALUES ('Gautam');\\n```",
          "deepDive": "Deep dive documentation details for INSERT record inserts implementations."
        },
        "instructions": "Insert new record with name Gautam into table knights.",
        "initialCode": "// Practice INSERT record inserts code here\n",
        "validationRegex": "INSERT\\\\s+INTO.*VALUES",
        "hint": "Example pattern match target: INSERT INTO knights (name) VALUES ('Gautam');"
      },
      {
        "id": "sql-update-record-mutations-04",
        "levelNumber": 4,
        "title": "UPDATE record mutations",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for UPDATE record mutations inside SQL Vault.",
          "blueprint": "```\\nUPDATE knights SET hp = 100 WHERE id = 1;\\n```",
          "deepDive": "Deep dive documentation details for UPDATE record mutations implementations."
        },
        "instructions": "Update records setting hp to 100 where id matches 1.",
        "initialCode": "// Practice UPDATE record mutations code here\n",
        "validationRegex": "UPDATE.*SET",
        "hint": "Example pattern match target: UPDATE knights SET hp = 100 WHERE id = 1;"
      },
      {
        "id": "sql-delete-record-removals-05",
        "levelNumber": 5,
        "title": "DELETE record removals",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for DELETE record removals inside SQL Vault.",
          "blueprint": "```\\nDELETE FROM knights WHERE status = 'Inactive';\\n```",
          "deepDive": "Deep dive documentation details for DELETE record removals implementations."
        },
        "instructions": "Delete table entries where status matches Inactive.",
        "initialCode": "// Practice DELETE record removals code here\n",
        "validationRegex": "DELETE\\\\s+FROM",
        "hint": "Example pattern match target: DELETE FROM knights WHERE status = 'Inactive';"
      },
      {
        "id": "sql-inner-join-joins-06",
        "levelNumber": 6,
        "title": "INNER JOIN joins",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for INNER JOIN joins inside SQL Vault.",
          "blueprint": "```\\nSELECT * FROM levels INNER JOIN worlds ON levels.world_id = worlds.id;\\n```",
          "deepDive": "Deep dive documentation details for INNER JOIN joins implementations."
        },
        "instructions": "Join table levels with worlds matching world_id fields.",
        "initialCode": "// Practice INNER JOIN joins code here\n",
        "validationRegex": "INNER\\\\s+JOIN",
        "hint": "Example pattern match target: SELECT * FROM levels INNER JOIN worlds ON levels.world_id = worlds.id;"
      },
      {
        "id": "sql-group-by-categories-aggregations-07",
        "levelNumber": 7,
        "title": "GROUP BY categories aggregations",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for GROUP BY categories aggregations inside SQL Vault.",
          "blueprint": "```\\nSELECT COUNT(*), world FROM levels GROUP BY world;\\n```",
          "deepDive": "Deep dive documentation details for GROUP BY categories aggregations implementations."
        },
        "instructions": "Aggregate challenges counts grouped by world name.",
        "initialCode": "// Practice GROUP BY categories aggregations code here\n",
        "validationRegex": "GROUP\\\\s+BY",
        "hint": "Example pattern match target: SELECT COUNT(*), world FROM levels GROUP BY world;"
      },
      {
        "id": "sql-create-index-speed-indices-08",
        "levelNumber": 8,
        "title": "CREATE INDEX speed indices",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for CREATE INDEX speed indices inside SQL Vault.",
          "blueprint": "```\\nCREATE INDEX name_idx ON knights (name);\\n```",
          "deepDive": "Deep dive documentation details for CREATE INDEX speed indices implementations."
        },
        "instructions": "Create query speed index name_idx on column name of knights.",
        "initialCode": "// Practice CREATE INDEX speed indices code here\n",
        "validationRegex": "CREATE\\\\s+INDEX",
        "hint": "Example pattern match target: CREATE INDEX name_idx ON knights (name);"
      },
      {
        "id": "sql-nested-subqueries-lookups-09",
        "levelNumber": 9,
        "title": "Nested subqueries lookups",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Nested subqueries lookups inside SQL Vault.",
          "blueprint": "```\\nSELECT * FROM levels WHERE world_id IN (SELECT id FROM worlds);\\n```",
          "deepDive": "Deep dive documentation details for Nested subqueries lookups implementations."
        },
        "instructions": "Select levels using subquery filters matching world IDs.",
        "initialCode": "// Practice Nested subqueries lookups code here\n",
        "validationRegex": "IN\\\\s*\\\\(\\\\s*SELECT",
        "hint": "Example pattern match target: SELECT * FROM levels WHERE world_id IN (SELECT id FROM worlds);"
      },
      {
        "id": "sql-transaction-committing-commit-10",
        "levelNumber": 10,
        "title": "Transaction committing commit",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Transaction committing commit inside SQL Vault.",
          "blueprint": "```\\nCOMMIT;\\n```",
          "deepDive": "Deep dive documentation details for Transaction committing commit implementations."
        },
        "instructions": "Persist current transaction changes committing statements.",
        "initialCode": "// Practice Transaction committing commit code here\n",
        "validationRegex": "COMMIT|ROLLBACK",
        "hint": "Example pattern match target: COMMIT;"
      },
      {
        "id": "sql-view-creations-query-maps-11",
        "levelNumber": 11,
        "title": "View Creations query maps",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for View Creations query maps inside SQL Vault.",
          "blueprint": "```\\nCREATE VIEW active AS SELECT * FROM users;\\n```",
          "deepDive": "Deep dive documentation details for View Creations query maps implementations."
        },
        "instructions": "Create relational query view mapper active.",
        "initialCode": "// Practice View Creations query maps code here\n",
        "validationRegex": "CREATE\\\\s+VIEW",
        "hint": "Example pattern match target: CREATE VIEW active AS SELECT * FROM users;"
      },
      {
        "id": "sql-aggregate-having-filters-12",
        "levelNumber": 12,
        "title": "Aggregate HAVING filters",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Aggregate HAVING filters inside SQL Vault.",
          "blueprint": "```\\nHAVING COUNT(*) > 5\\n```",
          "deepDive": "Deep dive documentation details for Aggregate HAVING filters implementations."
        },
        "instructions": "Filter aggregate groupings outputs utilizing HAVING clause.",
        "initialCode": "// Practice Aggregate HAVING filters code here\n",
        "validationRegex": "HAVING",
        "hint": "Example pattern match target: HAVING COUNT(*) > 5"
      },
      {
        "id": "sql-alter-tables-structures-13",
        "levelNumber": 13,
        "title": "Alter Tables structures",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Alter Tables structures inside SQL Vault.",
          "blueprint": "```\\nALTER TABLE users ADD COLUMN age INT;\\n```",
          "deepDive": "Deep dive documentation details for Alter Tables structures implementations."
        },
        "instructions": "Modify database schema structures using ALTER TABLE.",
        "initialCode": "// Practice Alter Tables structures code here\n",
        "validationRegex": "ALTER\\\\s+TABLE",
        "hint": "Example pattern match target: ALTER TABLE users ADD COLUMN age INT;"
      },
      {
        "id": "sql-foreign-keys-references-constraints-14",
        "levelNumber": 14,
        "title": "Foreign Keys references constraints",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Foreign Keys references constraints inside SQL Vault.",
          "blueprint": "```\\nFOREIGN KEY (uid) REFERENCES users (id)\\n```",
          "deepDive": "Deep dive documentation details for Foreign Keys references constraints implementations."
        },
        "instructions": "Reference database keys linkages using foreign keys.",
        "initialCode": "// Practice Foreign Keys references constraints code here\n",
        "validationRegex": "FOREIGN.*REFERENCES",
        "hint": "Example pattern match target: FOREIGN KEY (uid) REFERENCES users (id)"
      },
      {
        "id": "sql-cascade-deletions-15",
        "levelNumber": 15,
        "title": "Cascade deletions",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Cascade deletions inside SQL Vault.",
          "blueprint": "```\\nDROP TABLE users CASCADE;\\n```",
          "deepDive": "Deep dive documentation details for Cascade deletions implementations."
        },
        "instructions": "Cascade schema drop operations utilizing CASCADE modifiers.",
        "initialCode": "// Practice Cascade deletions code here\n",
        "validationRegex": "DROP.*CASCADE",
        "hint": "Example pattern match target: DROP TABLE users CASCADE;"
      }
    ]
  },
  {
    "worldId": "go",
    "worldName": "Go",
    "levels": [
      {
        "id": "go-package-setups-imports-01",
        "levelNumber": 1,
        "title": "Package setups imports",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Package setups imports inside Go Sanctum.",
          "blueprint": "```\\npackage main\nimport \"fmt\"\\n```",
          "deepDive": "Deep dive documentation details for Package setups imports implementations."
        },
        "instructions": "Define main package structures importing standard library.",
        "initialCode": "// Practice Package setups imports code here\n",
        "validationRegex": "package\\\\s+main",
        "hint": "Example pattern match target: package main"
      },
      {
        "id": "go-println-prints-output-02",
        "levelNumber": 2,
        "title": "Println prints output",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Println prints output inside Go Sanctum.",
          "blueprint": "```\\nfmt.Println(\"Go\")\\n```",
          "deepDive": "Deep dive documentation details for Println prints output implementations."
        },
        "instructions": "Print message Go utilizing standard output method Println.",
        "initialCode": "// Practice Println prints output code here\n",
        "validationRegex": "fmt\\\\.Println",
        "hint": "Example pattern match target: fmt.Println(\"Go\")"
      },
      {
        "id": "go-short-declarations-variable-03",
        "levelNumber": 3,
        "title": "Short Declarations variable",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Short Declarations variable inside Go Sanctum.",
          "blueprint": "```\\nhp := 100\\n```",
          "deepDive": "Deep dive documentation details for Short Declarations variable implementations."
        },
        "instructions": "Initialize hp variable set to 100 using short declarations operator.",
        "initialCode": "// Practice Short Declarations variable code here\n",
        "validationRegex": "hp\\\\s*:=\\\\s*100",
        "hint": "Example pattern match target: hp := 100"
      },
      {
        "id": "go-conditionals-checks-04",
        "levelNumber": 4,
        "title": "Conditionals checks",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Conditionals checks inside Go Sanctum.",
          "blueprint": "```\\nif hp > 50 {}\\n```",
          "deepDive": "Deep dive documentation details for Conditionals checks implementations."
        },
        "instructions": "Declare conditional blocks evaluating if hp is greater than 50.",
        "initialCode": "// Practice Conditionals checks code here\n",
        "validationRegex": "if\\\\s+hp",
        "hint": "Example pattern match target: if hp > 50 {}"
      },
      {
        "id": "go-struct-definition-data-05",
        "levelNumber": 5,
        "title": "Struct Definition data",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Struct Definition data inside Go Sanctum.",
          "blueprint": "```\\ntype Knight struct {\n  HP int\n}\\n```",
          "deepDive": "Deep dive documentation details for Struct Definition data implementations."
        },
        "instructions": "Define struct Knight holding integer HP.",
        "initialCode": "// Practice Struct Definition data code here\n",
        "validationRegex": "type\\\\s+Knight\\\\s+struct",
        "hint": "Example pattern match target: type Knight struct {"
      },
      {
        "id": "go-maps-lookup-lists-06",
        "levelNumber": 6,
        "title": "Maps lookup lists",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Maps lookup lists inside Go Sanctum.",
          "blueprint": "```\\ncache := make(map[string]int)\\n```",
          "deepDive": "Deep dive documentation details for Maps lookup lists implementations."
        },
        "instructions": "Initialize lookup dictionary cache mapping strings to integers.",
        "initialCode": "// Practice Maps lookup lists code here\n",
        "validationRegex": "make\\\\(\\\\s*map",
        "hint": "Example pattern match target: cache := make(map[string]int)"
      },
      {
        "id": "go-dynamic-slices-arrays-07",
        "levelNumber": 7,
        "title": "Dynamic slices arrays",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Dynamic slices arrays inside Go Sanctum.",
          "blueprint": "```\\nlist = append(list, 10);\\n```",
          "deepDive": "Deep dive documentation details for Dynamic slices arrays implementations."
        },
        "instructions": "Append integer 10 to slices list.",
        "initialCode": "// Practice Dynamic slices arrays code here\n",
        "validationRegex": "append",
        "hint": "Example pattern match target: list = append(list, 10);"
      },
      {
        "id": "go-loops-ranges-iteration-08",
        "levelNumber": 8,
        "title": "Loops ranges iteration",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Loops ranges iteration inside Go Sanctum.",
          "blueprint": "```\\nfor idx, val := range list {}\\n```",
          "deepDive": "Deep dive documentation details for Loops ranges iteration implementations."
        },
        "instructions": "Iterate over slices structures ranges loops.",
        "initialCode": "// Practice Loops ranges iteration code here\n",
        "validationRegex": "for.*range",
        "hint": "Example pattern match target: for idx, val := range list {}"
      },
      {
        "id": "go-explicit-errors-checking-09",
        "levelNumber": 9,
        "title": "Explicit Errors checking",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Explicit Errors checking inside Go Sanctum.",
          "blueprint": "```\\nif err != nil {\n  return err\n}\\n```",
          "deepDive": "Deep dive documentation details for Explicit Errors checking implementations."
        },
        "instructions": "Inspect return flags errors nil conditions explicitly.",
        "initialCode": "// Practice Explicit Errors checking code here\n",
        "validationRegex": "err\\\\s*!=\\\\s*nil",
        "hint": "Example pattern match target: if err != nil {"
      },
      {
        "id": "go-implicit-interfaces-contracts-10",
        "levelNumber": 10,
        "title": "Implicit interfaces contracts",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Implicit interfaces contracts inside Go Sanctum.",
          "blueprint": "```\\ntype Caster interface {\n  Cast()\n}\\n```",
          "deepDive": "Deep dive documentation details for Implicit interfaces contracts implementations."
        },
        "instructions": "Define interfaces configurations contract Caster declaring Cast().",
        "initialCode": "// Practice Implicit interfaces contracts code here\n",
        "validationRegex": "type\\\\s+\\\\w+\\\\s+interface",
        "hint": "Example pattern match target: type Caster interface {"
      },
      {
        "id": "go-deferred-cleanups-defer-11",
        "levelNumber": 11,
        "title": "Deferred cleanups defer",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Deferred cleanups defer inside Go Sanctum.",
          "blueprint": "```\\ndefer file.Close()\\n```",
          "deepDive": "Deep dive documentation details for Deferred cleanups defer implementations."
        },
        "instructions": "Defer files closures cleanups scopes routines execution.",
        "initialCode": "// Practice Deferred cleanups defer code here\n",
        "validationRegex": "defer",
        "hint": "Example pattern match target: defer file.Close()"
      },
      {
        "id": "go-panic-recovery-pipelines-12",
        "levelNumber": 12,
        "title": "Panic recovery pipelines",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Panic recovery pipelines inside Go Sanctum.",
          "blueprint": "```\\nrecover()\\n```",
          "deepDive": "Deep dive documentation details for Panic recovery pipelines implementations."
        },
        "instructions": "Capture panic errors collapse pipelines utilizing recover().",
        "initialCode": "// Practice Panic recovery pipelines code here\n",
        "validationRegex": "recover",
        "hint": "Example pattern match target: recover()"
      },
      {
        "id": "go-json-marshallers-encoders-13",
        "levelNumber": 13,
        "title": "JSON Marshallers encoders",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for JSON Marshallers encoders inside Go Sanctum.",
          "blueprint": "```\\njson.NewEncoder(w).Encode(x)\\n```",
          "deepDive": "Deep dive documentation details for JSON Marshallers encoders implementations."
        },
        "instructions": "Serialize structs variables interfaces utilizing JSON encoders.",
        "initialCode": "// Practice JSON Marshallers encoders code here\n",
        "validationRegex": "NewEncoder",
        "hint": "Example pattern match target: json.NewEncoder(w).Encode(x)"
      },
      {
        "id": "go-waitgroups-synchronization-14",
        "levelNumber": 14,
        "title": "WaitGroups synchronization",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for WaitGroups synchronization inside Go Sanctum.",
          "blueprint": "```\\nwg.Add(1)\nwg.Wait()\\n```",
          "deepDive": "Deep dive documentation details for WaitGroups synchronization implementations."
        },
        "instructions": "Synchronize concurrent processing routines utilizing WaitGroups.",
        "initialCode": "// Practice WaitGroups synchronization code here\n",
        "validationRegex": "wg\\\\.",
        "hint": "Example pattern match target: wg.Add(1)"
      },
      {
        "id": "go-goroutines-concurrent-channels-15",
        "levelNumber": 15,
        "title": "Goroutines Concurrent channels",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Goroutines Concurrent channels inside Go Sanctum.",
          "blueprint": "```\\nch := make(chan int)\ngo run(ch)\\n```",
          "deepDive": "Deep dive documentation details for Goroutines Concurrent channels implementations."
        },
        "instructions": "Allocate integer channel and spawn goroutine run concurrently.",
        "initialCode": "// Practice Goroutines Concurrent channels code here\n",
        "validationRegex": "chan\\\\s+int.*go",
        "hint": "Example pattern match target: ch := make(chan int)"
      }
    ]
  },
  {
    "worldId": "csharp",
    "worldName": "C#",
    "levels": [
      {
        "id": "csharp-system-prints-console-01",
        "levelNumber": 1,
        "title": "System prints Console",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for System prints Console inside C# Castle.",
          "blueprint": "```\\nConsole.WriteLine(\"C#\");\\n```",
          "deepDive": "Deep dive documentation details for System prints Console implementations."
        },
        "instructions": "Print message C# to execution output console.",
        "initialCode": "// Practice System prints Console code here\n",
        "validationRegex": "Console\\\\.WriteLine",
        "hint": "Example pattern match target: Console.WriteLine(\"C#\");"
      },
      {
        "id": "csharp-primitive-types-initialization-02",
        "levelNumber": 2,
        "title": "Primitive types initialization",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Primitive types initialization inside C# Castle.",
          "blueprint": "```\\nint hp = 100;\\n```",
          "deepDive": "Deep dive documentation details for Primitive types initialization implementations."
        },
        "instructions": "Declare integer variable hp set to value 100.",
        "initialCode": "// Practice Primitive types initialization code here\n",
        "validationRegex": "int\\\\s+hp\\\\s*=\\\\s*100",
        "hint": "Example pattern match target: int hp = 100;"
      },
      {
        "id": "csharp-conditionals-validations-structures-03",
        "levelNumber": 3,
        "title": "Conditionals validations structures",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Conditionals validations structures inside C# Castle.",
          "blueprint": "```\\nif (hp > 50) {}\\n```",
          "deepDive": "Deep dive documentation details for Conditionals validations structures implementations."
        },
        "instructions": "Verify validations structures checks checking if hp exceeds 50.",
        "initialCode": "// Practice Conditionals validations structures code here\n",
        "validationRegex": "if\\\\s*\\\\(\\\\s*hp",
        "hint": "Example pattern match target: if (hp > 50) {}"
      },
      {
        "id": "csharp-class-objects-structures-04",
        "levelNumber": 4,
        "title": "Class objects structures",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Class objects structures inside C# Castle.",
          "blueprint": "```\\nclass Knight {\n  public int HP { get; set; }\n}\\n```",
          "deepDive": "Deep dive documentation details for Class objects structures implementations."
        },
        "instructions": "Define class Knight holding auto-implemented property HP.",
        "initialCode": "// Practice Class objects structures code here\n",
        "validationRegex": "class\\\\s+Knight",
        "hint": "Example pattern match target: class Knight {"
      },
      {
        "id": "csharp-generics-lists-collections-05",
        "levelNumber": 5,
        "title": "Generics lists collections",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Generics lists collections inside C# Castle.",
          "blueprint": "```\\nList<int> list = new List<int>();\\n```",
          "deepDive": "Deep dive documentation details for Generics lists collections implementations."
        },
        "instructions": "Initialize list of integers list using List constructors.",
        "initialCode": "// Practice Generics lists collections code here\n",
        "validationRegex": "List\\\\s*<.*>",
        "hint": "Example pattern match target: List<int> list = new List<int>();"
      },
      {
        "id": "csharp-foreach-loops-traversal-06",
        "levelNumber": 6,
        "title": "Foreach loops traversal",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Foreach loops traversal inside C# Castle.",
          "blueprint": "```\\nforeach(var x in list) {}\\n```",
          "deepDive": "Deep dive documentation details for Foreach loops traversal implementations."
        },
        "instructions": "Traverse list elements utilizing foreach loops.",
        "initialCode": "// Practice Foreach loops traversal code here\n",
        "validationRegex": "foreach",
        "hint": "Example pattern match target: foreach(var x in list) {}"
      },
      {
        "id": "csharp-linq-collections-operations-07",
        "levelNumber": 7,
        "title": "LINQ collections operations",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for LINQ collections operations inside C# Castle.",
          "blueprint": "```\\nlist.Where(x => x > 10)\\n```",
          "deepDive": "Deep dive documentation details for LINQ collections operations implementations."
        },
        "instructions": "Filter collections entries using LINQ Where closures.",
        "initialCode": "// Practice LINQ collections operations code here\n",
        "validationRegex": "Where",
        "hint": "Example pattern match target: list.Where(x => x > 10)"
      },
      {
        "id": "csharp-null-checks-fallbacks-08",
        "levelNumber": 8,
        "title": "Null checks fallbacks",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Null checks fallbacks inside C# Castle.",
          "blueprint": "```\\nvar val = name ?? \"Knight\";\\n```",
          "deepDive": "Deep dive documentation details for Null checks fallbacks implementations."
        },
        "instructions": "Define variable mapping fallback default strings using ??.",
        "initialCode": "// Practice Null checks fallbacks code here\n",
        "validationRegex": "\\d?\\\\?\\\\s*[\"\\']Knight[\"\\']",
        "hint": "Example pattern match target: var val = name ?? \"Knight\";"
      },
      {
        "id": "csharp-static-utilities-objects-09",
        "levelNumber": 9,
        "title": "Static utilities objects",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Static utilities objects inside C# Castle.",
          "blueprint": "```\\npublic static class Util {}\\n```",
          "deepDive": "Deep dive documentation details for Static utilities objects implementations."
        },
        "instructions": "Define static class container configuration Util.",
        "initialCode": "// Practice Static utilities objects code here\n",
        "validationRegex": "static\\\\s+class",
        "hint": "Example pattern match target: public static class Util {}"
      },
      {
        "id": "csharp-dictionary-collections-lookups-10",
        "levelNumber": 10,
        "title": "Dictionary collections lookups",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Dictionary collections lookups inside C# Castle.",
          "blueprint": "```\\nDictionary<string, int> dict = new Dictionary<string, int>();\\n```",
          "deepDive": "Deep dive documentation details for Dictionary collections lookups implementations."
        },
        "instructions": "Initialize string-to-integer dictionary using Dictionary constructor.",
        "initialCode": "// Practice Dictionary collections lookups code here\n",
        "validationRegex": "Dictionary\\\\s*<",
        "hint": "Example pattern match target: Dictionary<string, int> dict = new Dictionary<string, int>();"
      },
      {
        "id": "csharp-try-catch-exceptions-11",
        "levelNumber": 11,
        "title": "Try catch exceptions",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Try catch exceptions inside C# Castle.",
          "blueprint": "```\\ntry { run(); } catch(Exception e) {}\\n```",
          "deepDive": "Deep dive documentation details for Try catch exceptions implementations."
        },
        "instructions": "Catch C# runtime exceptions wrapping run() calls.",
        "initialCode": "// Practice Try catch exceptions code here\n",
        "validationRegex": "try\\\\s*\\\\{[\\\\s\\\\S]*?\\\\}\\\\s*catch",
        "hint": "Example pattern match target: try { run(); } catch(Exception e) {}"
      },
      {
        "id": "csharp-task-based-awaits-12",
        "levelNumber": 12,
        "title": "Task based awaits",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Task based awaits inside C# Castle.",
          "blueprint": "```\\nawait Task.Delay(1000);\\n```",
          "deepDive": "Deep dive documentation details for Task based awaits implementations."
        },
        "instructions": "Await Task execution delay operations asynchronously.",
        "initialCode": "// Practice Task based awaits code here\n",
        "validationRegex": "await\\\\s+Task",
        "hint": "Example pattern match target: await Task.Delay(1000);"
      },
      {
        "id": "csharp-nullable-values-annotations-13",
        "levelNumber": 13,
        "title": "Nullable values annotations",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Nullable values annotations inside C# Castle.",
          "blueprint": "```\\nint? score = null;\\n```",
          "deepDive": "Deep dive documentation details for Nullable values annotations implementations."
        },
        "instructions": "Declare nullable integer score initialized to null.",
        "initialCode": "// Practice Nullable values annotations code here\n",
        "validationRegex": "int\\\\s*\\\\?\\\\s+score",
        "hint": "Example pattern match target: int? score = null;"
      },
      {
        "id": "csharp-event-delegate-loops-14",
        "levelNumber": 14,
        "title": "Event delegate loops",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Event delegate loops inside C# Castle.",
          "blueprint": "```\\npublic event Action OnChange;\\n```",
          "deepDive": "Deep dive documentation details for Event delegate loops implementations."
        },
        "instructions": "Declare class events triggers utilizing event Action delegates.",
        "initialCode": "// Practice Event delegate loops code here\n",
        "validationRegex": "event\\\\s+Action",
        "hint": "Example pattern match target: public event Action OnChange;"
      },
      {
        "id": "csharp-generics-class-specifications-15",
        "levelNumber": 15,
        "title": "Generics class specifications",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Generics class specifications inside C# Castle.",
          "blueprint": "```\\nclass Repository<T> {}\\n```",
          "deepDive": "Deep dive documentation details for Generics class specifications implementations."
        },
        "instructions": "Define generic class Repository capturing parameter type T.",
        "initialCode": "// Practice Generics class specifications code here\n",
        "validationRegex": "class\\\\s+\\\\w+\\\\s*<\\\\s*T\\\\s*>",
        "hint": "Example pattern match target: class Repository<T> {}"
      }
    ]
  },
  {
    "worldId": "php",
    "worldName": "PHP",
    "levels": [
      {
        "id": "php-boundary-opening-tags-01",
        "levelNumber": 1,
        "title": "Boundary opening tags",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Boundary opening tags inside PHP Tavern.",
          "blueprint": "```\\n<?php\necho \"PHP\";\\n```",
          "deepDive": "Deep dive documentation details for Boundary opening tags implementations."
        },
        "instructions": "Enclose PHP scripts execution inside opening boundaries tags.",
        "initialCode": "// Practice Boundary opening tags code here\n",
        "validationRegex": "<\\\\?php",
        "hint": "Example pattern match target: <?php"
      },
      {
        "id": "php-print-outputs-strings-02",
        "levelNumber": 2,
        "title": "Print outputs strings",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Print outputs strings inside PHP Tavern.",
          "blueprint": "```\\necho \"PHP\";\\n```",
          "deepDive": "Deep dive documentation details for Print outputs strings implementations."
        },
        "instructions": "Output text PHP using echo command.",
        "initialCode": "// Practice Print outputs strings code here\n",
        "validationRegex": "echo\\\\s+[\"\\']PHP[\"\\']",
        "hint": "Example pattern match target: echo \"PHP\";"
      },
      {
        "id": "php-variables-assignments-types-03",
        "levelNumber": 3,
        "title": "Variables assignments types",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Variables assignments types inside PHP Tavern.",
          "blueprint": "```\\n$hp = 100;\\n```",
          "deepDive": "Deep dive documentation details for Variables assignments types implementations."
        },
        "instructions": "Initialize variable hp to value 100.",
        "initialCode": "// Practice Variables assignments types code here\n",
        "validationRegex": "\\\\$hp\\\\s*=\\\\s*100",
        "hint": "Example pattern match target: $hp = 100;"
      },
      {
        "id": "php-conditional-branches-decisions-04",
        "levelNumber": 4,
        "title": "Conditional branches decisions",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Conditional branches decisions inside PHP Tavern.",
          "blueprint": "```\\nif ($hp > 50) {}\\n```",
          "deepDive": "Deep dive documentation details for Conditional branches decisions implementations."
        },
        "instructions": "Verify checks checking if variable hp exceeds 50.",
        "initialCode": "// Practice Conditional branches decisions code here\n",
        "validationRegex": "if\\\\s*\\\\(\\\\s*\\\\$hp",
        "hint": "Example pattern match target: if ($hp > 50) {}"
      },
      {
        "id": "php-functions-structures-declarations-05",
        "levelNumber": 5,
        "title": "Functions structures declarations",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Functions structures declarations inside PHP Tavern.",
          "blueprint": "```\\nfunction cast($spell) {\n  return $spell;\n}\\n```",
          "deepDive": "Deep dive documentation details for Functions structures declarations implementations."
        },
        "instructions": "Define function cast returning spell argument.",
        "initialCode": "// Practice Functions structures declarations code here\n",
        "validationRegex": "function\\\\s+cast",
        "hint": "Example pattern match target: function cast($spell) {"
      },
      {
        "id": "php-associative-lists-mappings-06",
        "levelNumber": 6,
        "title": "Associative lists mappings",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Associative lists mappings inside PHP Tavern.",
          "blueprint": "```\\n$list = [\"hp\" => 100];\\n```",
          "deepDive": "Deep dive documentation details for Associative lists mappings implementations."
        },
        "instructions": "Initialize associative array list mapping hp to 100.",
        "initialCode": "// Practice Associative lists mappings code here\n",
        "validationRegex": "=>",
        "hint": "Example pattern match target: $list = [\"hp\" => 100];"
      },
      {
        "id": "php-class-objects-structures-07",
        "levelNumber": 7,
        "title": "Class objects structures",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Class objects structures inside PHP Tavern.",
          "blueprint": "```\\nclass Mage {\n  public $power = 50;\n}\\n```",
          "deepDive": "Deep dive documentation details for Class objects structures implementations."
        },
        "instructions": "Define class Mage holding public variable power.",
        "initialCode": "// Practice Class objects structures code here\n",
        "validationRegex": "class\\\\s+Mage",
        "hint": "Example pattern match target: class Mage {"
      },
      {
        "id": "php-loops-arrays-traversals-08",
        "levelNumber": 8,
        "title": "Loops arrays traversals",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Loops arrays traversals inside PHP Tavern.",
          "blueprint": "```\\nforeach($list as $val) {}\\n```",
          "deepDive": "Deep dive documentation details for Loops arrays traversals implementations."
        },
        "instructions": "Traverse list elements utilizing foreach loop.",
        "initialCode": "// Practice Loops arrays traversals code here\n",
        "validationRegex": "foreach",
        "hint": "Example pattern match target: foreach($list as $val) {}"
      },
      {
        "id": "php-form-parameters-capture-09",
        "levelNumber": 9,
        "title": "Form Parameters capture",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Form Parameters capture inside PHP Tavern.",
          "blueprint": "```\\n$val = $_POST[\"key\"];\\n```",
          "deepDive": "Deep dive documentation details for Form Parameters capture implementations."
        },
        "instructions": "Extract input fields variables from POST parameters array.",
        "initialCode": "// Practice Form Parameters capture code here\n",
        "validationRegex": "\\\\$_POST",
        "hint": "Example pattern match target: $val = $_POST[\"key\"];"
      },
      {
        "id": "php-nullish-coalescing-fallbacks-10",
        "levelNumber": 10,
        "title": "Nullish coalescing fallbacks",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Nullish coalescing fallbacks inside PHP Tavern.",
          "blueprint": "```\\n$val = $key ?? \"default\";\\n```",
          "deepDive": "Deep dive documentation details for Nullish coalescing fallbacks implementations."
        },
        "instructions": "Define fallback assignments utilizing coalescing ?? operator.",
        "initialCode": "// Practice Nullish coalescing fallbacks code here\n",
        "validationRegex": "\\\\?\\\\?\\\\s*[\"\\']default[\"\\']",
        "hint": "Example pattern match target: $val = $key ?? \"default\";"
      },
      {
        "id": "php-try-catch-exceptions-11",
        "levelNumber": 11,
        "title": "Try catch exceptions",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Try catch exceptions inside PHP Tavern.",
          "blueprint": "```\\ntry { run(); } catch(Exception $e) {}\\n```",
          "deepDive": "Deep dive documentation details for Try catch exceptions implementations."
        },
        "instructions": "Wrap run() calls catching Exception errors.",
        "initialCode": "// Practice Try catch exceptions code here\n",
        "validationRegex": "try\\\\s*\\\\{[\\\\s\\\\S]*?\\\\}\\\\s*catch",
        "hint": "Example pattern match target: try { run(); } catch(Exception $e) {}"
      },
      {
        "id": "php-file-writing-operations-12",
        "levelNumber": 12,
        "title": "File writing operations",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for File writing operations inside PHP Tavern.",
          "blueprint": "```\\nfile_put_contents(\"quest.txt\", $data);\\n```",
          "deepDive": "Deep dive documentation details for File writing operations implementations."
        },
        "instructions": "Write text content string to quest.txt file.",
        "initialCode": "// Practice File writing operations code here\n",
        "validationRegex": "file_put_contents",
        "hint": "Example pattern match target: file_put_contents(\"quest.txt\", $data);"
      },
      {
        "id": "php-pdo-database-links-13",
        "levelNumber": 13,
        "title": "PDO database links",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for PDO database links inside PHP Tavern.",
          "blueprint": "```\\n$pdo = new PDO($dsn, $user, $pass);\\n```",
          "deepDive": "Deep dive documentation details for PDO database links implementations."
        },
        "instructions": "Initialize PDO object executing database connection.",
        "initialCode": "// Practice PDO database links code here\n",
        "validationRegex": "new\\\\s+PDO",
        "hint": "Example pattern match target: $pdo = new PDO($dsn, $user, $pass);"
      },
      {
        "id": "php-json-data-marshalling-14",
        "levelNumber": 14,
        "title": "JSON data marshalling",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for JSON data marshalling inside PHP Tavern.",
          "blueprint": "```\\njson_encode($data);\\n```",
          "deepDive": "Deep dive documentation details for JSON data marshalling implementations."
        },
        "instructions": "Marshal structure variables utilizing json_encode.",
        "initialCode": "// Practice JSON data marshalling code here\n",
        "validationRegex": "json_encode",
        "hint": "Example pattern match target: json_encode($data);"
      },
      {
        "id": "php-autoloader-mappings-register-15",
        "levelNumber": 15,
        "title": "Autoloader mappings register",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Autoloader mappings register inside PHP Tavern.",
          "blueprint": "```\\nspl_autoload_register();\\n```",
          "deepDive": "Deep dive documentation details for Autoloader mappings register implementations."
        },
        "instructions": "Register autoloader dynamic mappings utilizing spl_autoload_register.",
        "initialCode": "// Practice Autoloader mappings register code here\n",
        "validationRegex": "spl_autoload_register",
        "hint": "Example pattern match target: spl_autoload_register();"
      }
    ]
  },
  {
    "worldId": "swift",
    "worldName": "Swift",
    "levels": [
      {
        "id": "swift-print-outputs-strings-01",
        "levelNumber": 1,
        "title": "Print outputs strings",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Print outputs strings inside Swift Swiftness.",
          "blueprint": "```\\nprint(\"Swift\")\\n```",
          "deepDive": "Deep dive documentation details for Print outputs strings implementations."
        },
        "instructions": "Print message Swift to output streams.",
        "initialCode": "// Practice Print outputs strings code here\n",
        "validationRegex": "print\\\\(\\\\s*[\"\\']Swift[\"\\']",
        "hint": "Example pattern match target: print(\"Swift\")"
      },
      {
        "id": "swift-let-var-mutability-02",
        "levelNumber": 2,
        "title": "Let var mutability",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Let var mutability inside Swift Swiftness.",
          "blueprint": "```\\nlet score = 100;\\n```",
          "deepDive": "Deep dive documentation details for Let var mutability implementations."
        },
        "instructions": "Declare immutable constant score set to value 100.",
        "initialCode": "// Practice Let var mutability code here\n",
        "validationRegex": "let\\\\s+score\\\\s*=\\\\s*100",
        "hint": "Example pattern match target: let score = 100;"
      },
      {
        "id": "swift-conditionals-checks-decisions-03",
        "levelNumber": 3,
        "title": "Conditionals checks decisions",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Conditionals checks decisions inside Swift Swiftness.",
          "blueprint": "```\\nif score > 50 {}\\n```",
          "deepDive": "Deep dive documentation details for Conditionals checks decisions implementations."
        },
        "instructions": "Evaluate if score exceeds 50.",
        "initialCode": "// Practice Conditionals checks decisions code here\n",
        "validationRegex": "if\\\\s+score",
        "hint": "Example pattern match target: if score > 50 {}"
      },
      {
        "id": "swift-functions-declarations-signatures-04",
        "levelNumber": 4,
        "title": "Functions declarations signatures",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Functions declarations signatures inside Swift Swiftness.",
          "blueprint": "```\\nfunc run() -> Bool { return true }\\n```",
          "deepDive": "Deep dive documentation details for Functions declarations signatures implementations."
        },
        "instructions": "Define function run returning boolean value.",
        "initialCode": "// Practice Functions declarations signatures code here\n",
        "validationRegex": "func\\\\s+run\\\\(\\\\s*\\\\)\\\\s*->",
        "hint": "Example pattern match target: func run() -> Bool { return true }"
      },
      {
        "id": "swift-arrays-collections-creations-05",
        "levelNumber": 5,
        "title": "Arrays collections creations",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Arrays collections creations inside Swift Swiftness.",
          "blueprint": "```\\nlet list = [1, 2]\\n```",
          "deepDive": "Deep dive documentation details for Arrays collections creations implementations."
        },
        "instructions": "Initialize array list holding integers 1 and 2.",
        "initialCode": "// Practice Arrays collections creations code here\n",
        "validationRegex": "let\\\\s+\\\\w+\\\\s*=\\\\s*\\\\[\\\\s*1\\\\s*,\\\\s*2\\\\s*\\\\]",
        "hint": "Example pattern match target: let list = [1, 2]"
      },
      {
        "id": "swift-struct-variables-definitions-06",
        "levelNumber": 6,
        "title": "Struct variables definitions",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Struct variables definitions inside Swift Swiftness.",
          "blueprint": "```\\nstruct Hero {\n  var hp: Int\n}\\n```",
          "deepDive": "Deep dive documentation details for Struct variables definitions implementations."
        },
        "instructions": "Define struct Hero holding integer variable hp.",
        "initialCode": "// Practice Struct variables definitions code here\n",
        "validationRegex": "struct\\\\s+Hero",
        "hint": "Example pattern match target: struct Hero {"
      },
      {
        "id": "swift-enums-states-definitions-07",
        "levelNumber": 7,
        "title": "Enums states definitions",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Enums states definitions inside Swift Swiftness.",
          "blueprint": "```\\nenum State {\n  case active\n}\\n```",
          "deepDive": "Deep dive documentation details for Enums states definitions implementations."
        },
        "instructions": "Define enum State holding case active.",
        "initialCode": "// Practice Enums states definitions code here\n",
        "validationRegex": "enum\\\\s+State",
        "hint": "Example pattern match target: enum State {"
      },
      {
        "id": "swift-loops-collections-traversals-08",
        "levelNumber": 8,
        "title": "Loops collections traversals",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Loops collections traversals inside Swift Swiftness.",
          "blueprint": "```\\nfor x in list {}\\n```",
          "deepDive": "Deep dive documentation details for Loops collections traversals implementations."
        },
        "instructions": "Traverse list elements utilizing for loops.",
        "initialCode": "// Practice Loops collections traversals code here\n",
        "validationRegex": "for\\\\s+\\\\w+\\\\s+in",
        "hint": "Example pattern match target: for x in list {}"
      },
      {
        "id": "swift-optional-values-bindings-09",
        "levelNumber": 9,
        "title": "Optional values bindings",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Optional values bindings inside Swift Swiftness.",
          "blueprint": "```\\nif let active = optional {}\\n```",
          "deepDive": "Deep dive documentation details for Optional values bindings implementations."
        },
        "instructions": "Unwrap optional reference safely using if-let binding.",
        "initialCode": "// Practice Optional values bindings code here\n",
        "validationRegex": "if\\\\s+let\\\\s+active",
        "hint": "Example pattern match target: if let active = optional {}"
      },
      {
        "id": "swift-nil-coalescing-defaults-10",
        "levelNumber": 10,
        "title": "Nil coalescing defaults",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Nil coalescing defaults inside Swift Swiftness.",
          "blueprint": "```\\nlet name = nickname ?? \"Guest\"\\n```",
          "deepDive": "Deep dive documentation details for Nil coalescing defaults implementations."
        },
        "instructions": "Define fallback assignments utilizing nil coalescing ??.",
        "initialCode": "// Practice Nil coalescing defaults code here\n",
        "validationRegex": "nickname\\\\s*\\\\?\\\\?\\\\s*[\"\\']Guest[\"\\']",
        "hint": "Example pattern match target: let name = nickname ?? \"Guest\""
      },
      {
        "id": "swift-early-exit-guards-11",
        "levelNumber": 11,
        "title": "Early exit guards",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Early exit guards inside Swift Swiftness.",
          "blueprint": "```\\nguard let val = val else { return }\\n```",
          "deepDive": "Deep dive documentation details for Early exit guards implementations."
        },
        "instructions": "Enforce parameters values presence utilizing early exits guard blocks.",
        "initialCode": "// Practice Early exit guards code here\n",
        "validationRegex": "guard.*else",
        "hint": "Example pattern match target: guard let val = val else { return }"
      },
      {
        "id": "swift-protocols-blueprints-definitions-12",
        "levelNumber": 12,
        "title": "Protocols blueprints definitions",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Protocols blueprints definitions inside Swift Swiftness.",
          "blueprint": "```\\nprotocol Combat {\n  func strike()\n}\\n```",
          "deepDive": "Deep dive documentation details for Protocols blueprints definitions implementations."
        },
        "instructions": "Define interface protocol Combat declaring strike().",
        "initialCode": "// Practice Protocols blueprints definitions code here\n",
        "validationRegex": "protocol",
        "hint": "Example pattern match target: protocol Combat {"
      },
      {
        "id": "swift-closures-routines-executions-13",
        "levelNumber": 13,
        "title": "Closures routines executions",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Closures routines executions inside Swift Swiftness.",
          "blueprint": "```\\nlet f = { (x: Int) in }\\n```",
          "deepDive": "Deep dive documentation details for Closures routines executions implementations."
        },
        "instructions": "Define closure block mapping parameters.",
        "initialCode": "// Practice Closures routines executions code here\n",
        "validationRegex": "\\\\{.*in",
        "hint": "Example pattern match target: let f = { (x: Int) in }"
      },
      {
        "id": "swift-deferred-executions-cleanups-14",
        "levelNumber": 14,
        "title": "Deferred executions cleanups",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Deferred executions cleanups inside Swift Swiftness.",
          "blueprint": "```\\ndefer { file.close() }\\n```",
          "deepDive": "Deep dive documentation details for Deferred executions cleanups implementations."
        },
        "instructions": "Schedule deferred code block cleanup routines execution upon scope exits utilizing defer block.",
        "initialCode": "// Practice Deferred executions cleanups code here\n",
        "validationRegex": "defer",
        "hint": "Example pattern match target: defer { file.close() }"
      },
      {
        "id": "swift-concurrency-tasks-async-15",
        "levelNumber": 15,
        "title": "Concurrency Tasks async",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Concurrency Tasks async inside Swift Swiftness.",
          "blueprint": "```\\nasync let data = load()\\n```",
          "deepDive": "Deep dive documentation details for Concurrency Tasks async implementations."
        },
        "instructions": "Initiate async bindings loading variables data.",
        "initialCode": "// Practice Concurrency Tasks async code here\n",
        "validationRegex": "async\\\\s+let",
        "hint": "Example pattern match target: async let data = load()"
      }
    ]
  },
  {
    "worldId": "kotlin",
    "worldName": "Kotlin",
    "levels": [
      {
        "id": "kotlin-print-outputs-strings-01",
        "levelNumber": 1,
        "title": "Print outputs strings",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Print outputs strings inside Kotlin Kingdom.",
          "blueprint": "```\\nprint(\"Kotlin\")\\n```",
          "deepDive": "Deep dive documentation details for Print outputs strings implementations."
        },
        "instructions": "Print message Kotlin using standard print method.",
        "initialCode": "// Practice Print outputs strings code here\n",
        "validationRegex": "print\\\\(\\\\s*[\"\\']Kotlin[\"\\']",
        "hint": "Example pattern match target: print(\"Kotlin\")"
      },
      {
        "id": "kotlin-val-var-variables-02",
        "levelNumber": 2,
        "title": "Val var variables",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Val var variables inside Kotlin Kingdom.",
          "blueprint": "```\\nval score = 100\\n```",
          "deepDive": "Deep dive documentation details for Val var variables implementations."
        },
        "instructions": "Declare read-only constant variable score set to value 100.",
        "initialCode": "// Practice Val var variables code here\n",
        "validationRegex": "val\\\\s+score\\\\s*=\\\\s*100",
        "hint": "Example pattern match target: val score = 100"
      },
      {
        "id": "kotlin-conditionals-checks-evaluations-03",
        "levelNumber": 3,
        "title": "Conditionals checks evaluations",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Conditionals checks evaluations inside Kotlin Kingdom.",
          "blueprint": "```\\nif (score > 50) {}\\n```",
          "deepDive": "Deep dive documentation details for Conditionals checks evaluations implementations."
        },
        "instructions": "Verify conditions checking if score is greater than 50.",
        "initialCode": "// Practice Conditionals checks evaluations code here\n",
        "validationRegex": "if\\\\s*\\\\(\\\\s*score",
        "hint": "Example pattern match target: if (score > 50) {}"
      },
      {
        "id": "kotlin-functions-variables-parameters-04",
        "levelNumber": 4,
        "title": "Functions variables parameters",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Functions variables parameters inside Kotlin Kingdom.",
          "blueprint": "```\\nfun run(): Int { return 0 }\\n```",
          "deepDive": "Deep dive documentation details for Functions variables parameters implementations."
        },
        "instructions": "Define function run returning integer 0.",
        "initialCode": "// Practice Functions variables parameters code here\n",
        "validationRegex": "fun\\\\s+run\\\\(\\\\s*\\\\)",
        "hint": "Example pattern match target: fun run(): Int { return 0 }"
      },
      {
        "id": "kotlin-lists-collections-helper-05",
        "levelNumber": 5,
        "title": "Lists collections helper",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Lists collections helper inside Kotlin Kingdom.",
          "blueprint": "```\\nval list = listOf(1, 2)\\n```",
          "deepDive": "Deep dive documentation details for Lists collections helper implementations."
        },
        "instructions": "Initialize read-only list holding elements 1 and 2.",
        "initialCode": "// Practice Lists collections helper code here\n",
        "validationRegex": "listOf",
        "hint": "Example pattern match target: val list = listOf(1, 2)"
      },
      {
        "id": "kotlin-mutable-list-creators-06",
        "levelNumber": 6,
        "title": "Mutable list creators",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Mutable list creators inside Kotlin Kingdom.",
          "blueprint": "```\\nval list = mutableListOf(1, 2)\\n```",
          "deepDive": "Deep dive documentation details for Mutable list creators implementations."
        },
        "instructions": "Initialize mutable list storing integers 1 and 2.",
        "initialCode": "// Practice Mutable list creators code here\n",
        "validationRegex": "mutableListOf",
        "hint": "Example pattern match target: val list = mutableListOf(1, 2)"
      },
      {
        "id": "kotlin-data-classes-holders-07",
        "levelNumber": 7,
        "title": "Data classes holders",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Data classes holders inside Kotlin Kingdom.",
          "blueprint": "```\\ndata class Hero(val hp: Int)\\n```",
          "deepDive": "Deep dive documentation details for Data classes holders implementations."
        },
        "instructions": "Define data class Hero holding integer attribute hp.",
        "initialCode": "// Practice Data classes holders code here\n",
        "validationRegex": "data\\\\s+class\\\\s+Hero",
        "hint": "Example pattern match target: data class Hero(val hp: Int)"
      },
      {
        "id": "kotlin-loops-collections-range-08",
        "levelNumber": 8,
        "title": "Loops collections range",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Loops collections range inside Kotlin Kingdom.",
          "blueprint": "```\\nfor (x in list) {}\\n```",
          "deepDive": "Deep dive documentation details for Loops collections range implementations."
        },
        "instructions": "Iterate over list values utilizing for loop.",
        "initialCode": "// Practice Loops collections range code here\n",
        "validationRegex": "for\\\\s*\\\\(\\\\s*\\\\w+\\\\s+in",
        "hint": "Example pattern match target: for (x in list) {}"
      },
      {
        "id": "kotlin-when-checks-branch-09",
        "levelNumber": 9,
        "title": "When checks branch",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for When checks branch inside Kotlin Kingdom.",
          "blueprint": "```\\nwhen(state) {\n  \"active\" -> run()\n}\\n```",
          "deepDive": "Deep dive documentation details for When checks branch implementations."
        },
        "instructions": "Evaluate state branches choices utilizing when block checks.",
        "initialCode": "// Practice When checks branch code here\n",
        "validationRegex": "when\\\\s*\\\\(\\\\s*state\\\\s*\\\\)",
        "hint": "Example pattern match target: when(state) {"
      },
      {
        "id": "kotlin-lambdas-parameters-mappings-10",
        "levelNumber": 10,
        "title": "Lambdas parameters mappings",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Lambdas parameters mappings inside Kotlin Kingdom.",
          "blueprint": "```\\nlist.filter { it > 10 }\\n```",
          "deepDive": "Deep dive documentation details for Lambdas parameters mappings implementations."
        },
        "instructions": "Filter list elements keeping integers greater than 10 using trailing lambda.",
        "initialCode": "// Practice Lambdas parameters mappings code here\n",
        "validationRegex": "filter\\\\s*\\\\{",
        "hint": "Example pattern match target: list.filter { it > 10 }"
      },
      {
        "id": "kotlin-null-safety-definitions-11",
        "levelNumber": 11,
        "title": "Null safety definitions",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Null safety definitions inside Kotlin Kingdom.",
          "blueprint": "```\\nvar name: String? = null\\n```",
          "deepDive": "Deep dive documentation details for Null safety definitions implementations."
        },
        "instructions": "Declare nullable String reference variable name initialized to null.",
        "initialCode": "// Practice Null safety definitions code here\n",
        "validationRegex": "String\\\\s*\\\\?",
        "hint": "Example pattern match target: var name: String? = null"
      },
      {
        "id": "kotlin-elvis-operators-fallbacks-12",
        "levelNumber": 12,
        "title": "Elvis operators fallbacks",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Elvis operators fallbacks inside Kotlin Kingdom.",
          "blueprint": "```\\nval name = nickname ?: \"Guest\"\\n```",
          "deepDive": "Deep dive documentation details for Elvis operators fallbacks implementations."
        },
        "instructions": "Define default fallback assignments utilizing Elvis Operator ?:.",
        "initialCode": "// Practice Elvis operators fallbacks code here\n",
        "validationRegex": "\\\\?\\\\:",
        "hint": "Example pattern match target: val name = nickname ?: \"Guest\""
      },
      {
        "id": "kotlin-let-scoped-blocks-13",
        "levelNumber": 13,
        "title": "Let Scoped blocks",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Let Scoped blocks inside Kotlin Kingdom.",
          "blueprint": "```\\nname?.let { run() }\\n```",
          "deepDive": "Deep dive documentation details for Let Scoped blocks implementations."
        },
        "instructions": "Execute scoped blocks triggers checking null values references.",
        "initialCode": "// Practice Let Scoped blocks code here\n",
        "validationRegex": "let\\\\s*\\\\{",
        "hint": "Example pattern match target: name?.let { run() }"
      },
      {
        "id": "kotlin-file-writing-operations-14",
        "levelNumber": 14,
        "title": "File writing operations",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for File writing operations inside Kotlin Kingdom.",
          "blueprint": "```\\nFile(\"quest.txt\").writeText(data)\\n```",
          "deepDive": "Deep dive documentation details for File writing operations implementations."
        },
        "instructions": "Write text content string to quest.txt file.",
        "initialCode": "// Practice File writing operations code here\n",
        "validationRegex": "writeText",
        "hint": "Example pattern match target: File(\"quest.txt\").writeText(data)"
      },
      {
        "id": "kotlin-coroutine-suspension-delay-15",
        "levelNumber": 15,
        "title": "Coroutine suspension delay",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Coroutine suspension delay inside Kotlin Kingdom.",
          "blueprint": "```\\ndelay(1000)\\n```",
          "deepDive": "Deep dive documentation details for Coroutine suspension delay implementations."
        },
        "instructions": "Call suspending function delay passing delay execution timeout.",
        "initialCode": "// Practice Coroutine suspension delay code here\n",
        "validationRegex": "delay",
        "hint": "Example pattern match target: delay(1000)"
      }
    ]
  },
  {
    "worldId": "bash-git",
    "worldName": "Command Line & Git",
    "levels": [
      {
        "id": "bash-git-list-directory-01",
        "levelNumber": 1,
        "title": "List Directory",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for List Directory inside Command Line & Git.",
          "blueprint": "```\\nls\\n```",
          "deepDive": "Deep dive documentation details for List Directory implementations."
        },
        "instructions": "List standard files in active directory using ls.",
        "initialCode": "// Practice List Directory code here\n",
        "validationRegex": "ls",
        "hint": "Example pattern match target: ls"
      },
      {
        "id": "bash-git-change-directory-02",
        "levelNumber": 2,
        "title": "Change Directory",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Change Directory inside Command Line & Git.",
          "blueprint": "```\\ncd src\\n```",
          "deepDive": "Deep dive documentation details for Change Directory implementations."
        },
        "instructions": "Navigate into folder src.",
        "initialCode": "// Practice Change Directory code here\n",
        "validationRegex": "cd\\\\s+src",
        "hint": "Example pattern match target: cd src"
      },
      {
        "id": "bash-git-create-folder-03",
        "levelNumber": 3,
        "title": "Create Folder",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Create Folder inside Command Line & Git.",
          "blueprint": "```\\nmkdir temp\\n```",
          "deepDive": "Deep dive documentation details for Create Folder implementations."
        },
        "instructions": "Create directory named temp.",
        "initialCode": "// Practice Create Folder code here\n",
        "validationRegex": "mkdir\\\\s+temp",
        "hint": "Example pattern match target: mkdir temp"
      },
      {
        "id": "bash-git-write-file-04",
        "levelNumber": 4,
        "title": "Write File",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Write File inside Command Line & Git.",
          "blueprint": "```\\necho \"text\" > file.txt\\n```",
          "deepDive": "Deep dive documentation details for Write File implementations."
        },
        "instructions": "Redirect echo message text to output file.txt.",
        "initialCode": "// Practice Write File code here\n",
        "validationRegex": "echo.*file\\\\.txt",
        "hint": "Example pattern match target: echo \"text\" > file.txt"
      },
      {
        "id": "bash-git-file-permissions-05",
        "levelNumber": 5,
        "title": "File permissions",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for File permissions inside Command Line & Git.",
          "blueprint": "```\\nchmod +x run.sh\\n```",
          "deepDive": "Deep dive documentation details for File permissions implementations."
        },
        "instructions": "Mark run.sh file as executable.",
        "initialCode": "// Practice File permissions code here\n",
        "validationRegex": "chmod\\\\s*\\\\+x",
        "hint": "Example pattern match target: chmod +x run.sh"
      },
      {
        "id": "bash-git-find-pattern-text-06",
        "levelNumber": 6,
        "title": "Find pattern text",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Find pattern text inside Command Line & Git.",
          "blueprint": "```\\ngrep \"pattern\" file.txt\\n```",
          "deepDive": "Deep dive documentation details for Find pattern text implementations."
        },
        "instructions": "Grep for string pattern in file.txt.",
        "initialCode": "// Practice Find pattern text code here\n",
        "validationRegex": "grep.*file\\\\.txt",
        "hint": "Example pattern match target: grep \"pattern\" file.txt"
      },
      {
        "id": "bash-git-git-initialize-repo-07",
        "levelNumber": 7,
        "title": "Git initialize repo",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Git initialize repo inside Command Line & Git.",
          "blueprint": "```\\ngit init\\n```",
          "deepDive": "Deep dive documentation details for Git initialize repo implementations."
        },
        "instructions": "Initialize empty local Git repository.",
        "initialCode": "// Practice Git initialize repo code here\n",
        "validationRegex": "git\\\\s+init",
        "hint": "Example pattern match target: git init"
      },
      {
        "id": "bash-git-git-check-status-08",
        "levelNumber": 8,
        "title": "Git check status",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Git check status inside Command Line & Git.",
          "blueprint": "```\\ngit status\\n```",
          "deepDive": "Deep dive documentation details for Git check status implementations."
        },
        "instructions": "Check repository modification status.",
        "initialCode": "// Practice Git check status code here\n",
        "validationRegex": "git\\\\s+status",
        "hint": "Example pattern match target: git status"
      },
      {
        "id": "bash-git-git-stage-changes-09",
        "levelNumber": 9,
        "title": "Git stage changes",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Git stage changes inside Command Line & Git.",
          "blueprint": "```\\ngit add .\\n```",
          "deepDive": "Deep dive documentation details for Git stage changes implementations."
        },
        "instructions": "Stage all workspace modifications.",
        "initialCode": "// Practice Git stage changes code here\n",
        "validationRegex": "git\\\\s+add",
        "hint": "Example pattern match target: git add ."
      },
      {
        "id": "bash-git-git-commit-changes-10",
        "levelNumber": 10,
        "title": "Git commit changes",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Git commit changes inside Command Line & Git.",
          "blueprint": "```\\ngit commit -m \"msg\"\\n```",
          "deepDive": "Deep dive documentation details for Git commit changes implementations."
        },
        "instructions": "Commit staged changes with message msg.",
        "initialCode": "// Practice Git commit changes code here\n",
        "validationRegex": "git\\\\s+commit",
        "hint": "Example pattern match target: git commit -m \"msg\""
      },
      {
        "id": "bash-git-git-create-branch-11",
        "levelNumber": 11,
        "title": "Git create branch",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Git create branch inside Command Line & Git.",
          "blueprint": "```\\ngit branch dev\\n```",
          "deepDive": "Deep dive documentation details for Git create branch implementations."
        },
        "instructions": "Create branch named dev.",
        "initialCode": "// Practice Git create branch code here\n",
        "validationRegex": "git\\\\s+branch",
        "hint": "Example pattern match target: git branch dev"
      },
      {
        "id": "bash-git-git-switch-branch-12",
        "levelNumber": 12,
        "title": "Git switch branch",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Git switch branch inside Command Line & Git.",
          "blueprint": "```\\ngit checkout dev\\n```",
          "deepDive": "Deep dive documentation details for Git switch branch implementations."
        },
        "instructions": "Switch workspace branch to dev.",
        "initialCode": "// Practice Git switch branch code here\n",
        "validationRegex": "git\\\\s+checkout|git\\\\s+switch",
        "hint": "Example pattern match target: git checkout dev"
      },
      {
        "id": "bash-git-git-merge-changes-13",
        "levelNumber": 13,
        "title": "Git merge changes",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Git merge changes inside Command Line & Git.",
          "blueprint": "```\\ngit merge dev\\n```",
          "deepDive": "Deep dive documentation details for Git merge changes implementations."
        },
        "instructions": "Merge dev branch commits into current branch.",
        "initialCode": "// Practice Git merge changes code here\n",
        "validationRegex": "git\\\\s+merge",
        "hint": "Example pattern match target: git merge dev"
      },
      {
        "id": "bash-git-git-view-history-14",
        "levelNumber": 14,
        "title": "Git view history",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Git view history inside Command Line & Git.",
          "blueprint": "```\\ngit log --oneline\\n```",
          "deepDive": "Deep dive documentation details for Git view history implementations."
        },
        "instructions": "View oneline formatted repository commit history.",
        "initialCode": "// Practice Git view history code here\n",
        "validationRegex": "git\\\\s+log",
        "hint": "Example pattern match target: git log --oneline"
      },
      {
        "id": "bash-git-git-stash-modifications-15",
        "levelNumber": 15,
        "title": "Git stash modifications",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Git stash modifications inside Command Line & Git.",
          "blueprint": "```\\ngit stash\\n```",
          "deepDive": "Deep dive documentation details for Git stash modifications implementations."
        },
        "instructions": "Stash active uncommitted edits.",
        "initialCode": "// Practice Git stash modifications code here\n",
        "validationRegex": "git\\\\s+stash",
        "hint": "Example pattern match target: git stash"
      }
    ]
  },
  {
    "worldId": "devops-containers",
    "worldName": "DevOps & Containers",
    "levels": [
      {
        "id": "devops-containers-docker-base-image-01",
        "levelNumber": 1,
        "title": "Docker base image",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Docker base image inside DevOps & Containers.",
          "blueprint": "```\\nFROM node:alpine\\n```",
          "deepDive": "Deep dive documentation details for Docker base image implementations."
        },
        "instructions": "Specify base image node:alpine using FROM.",
        "initialCode": "// Practice Docker base image code here\n",
        "validationRegex": "FROM\\\\s+node",
        "hint": "Example pattern match target: FROM node:alpine"
      },
      {
        "id": "devops-containers-docker-working-dir-02",
        "levelNumber": 2,
        "title": "Docker working dir",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Docker working dir inside DevOps & Containers.",
          "blueprint": "```\\nWORKDIR /app\\n```",
          "deepDive": "Deep dive documentation details for Docker working dir implementations."
        },
        "instructions": "Configure container working directory to /app.",
        "initialCode": "// Practice Docker working dir code here\n",
        "validationRegex": "WORKDIR\\\\s+/app",
        "hint": "Example pattern match target: WORKDIR /app"
      },
      {
        "id": "devops-containers-docker-file-copy-03",
        "levelNumber": 3,
        "title": "Docker file copy",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Docker file copy inside DevOps & Containers.",
          "blueprint": "```\\nCOPY package.json ./\\n```",
          "deepDive": "Deep dive documentation details for Docker file copy implementations."
        },
        "instructions": "Copy packages files to target directory.",
        "initialCode": "// Practice Docker file copy code here\n",
        "validationRegex": "COPY\\\\s+package",
        "hint": "Example pattern match target: COPY package.json ./"
      },
      {
        "id": "devops-containers-docker-build-run-04",
        "levelNumber": 4,
        "title": "Docker build run",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Docker build run inside DevOps & Containers.",
          "blueprint": "```\\nRUN npm install\\n```",
          "deepDive": "Deep dive documentation details for Docker build run implementations."
        },
        "instructions": "Execute installations commands RUN npm install.",
        "initialCode": "// Practice Docker build run code here\n",
        "validationRegex": "RUN\\\\s+npm",
        "hint": "Example pattern match target: RUN npm install"
      },
      {
        "id": "devops-containers-docker-expose-ports-05",
        "levelNumber": 5,
        "title": "Docker expose ports",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Docker expose ports inside DevOps & Containers.",
          "blueprint": "```\\nEXPOSE 3000\\n```",
          "deepDive": "Deep dive documentation details for Docker expose ports implementations."
        },
        "instructions": "Expose container network port 3000.",
        "initialCode": "// Practice Docker expose ports code here\n",
        "validationRegex": "EXPOSE\\\\s+3000",
        "hint": "Example pattern match target: EXPOSE 3000"
      },
      {
        "id": "devops-containers-docker-env-variables-06",
        "levelNumber": 6,
        "title": "Docker env variables",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Docker env variables inside DevOps & Containers.",
          "blueprint": "```\\nENV PORT=3000\\n```",
          "deepDive": "Deep dive documentation details for Docker env variables implementations."
        },
        "instructions": "Declare container environment variables PORT to 3000.",
        "initialCode": "// Practice Docker env variables code here\n",
        "validationRegex": "ENV\\\\s+PORT",
        "hint": "Example pattern match target: ENV PORT=3000"
      },
      {
        "id": "devops-containers-docker-commands-triggers-07",
        "levelNumber": 7,
        "title": "Docker commands triggers",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Docker commands triggers inside DevOps & Containers.",
          "blueprint": "```\\nCMD [\"npm\", \"start\"]\\n```",
          "deepDive": "Deep dive documentation details for Docker commands triggers implementations."
        },
        "instructions": "Configure default runtime command CMD to start npm.",
        "initialCode": "// Practice Docker commands triggers code here\n",
        "validationRegex": "CMD\\\\s*\\\\[",
        "hint": "Example pattern match target: CMD [\"npm\", \"start\"]"
      },
      {
        "id": "devops-containers-docker-builds-image-08",
        "levelNumber": 8,
        "title": "Docker builds image",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Docker builds image inside DevOps & Containers.",
          "blueprint": "```\\ndocker build -t app .\\n```",
          "deepDive": "Deep dive documentation details for Docker builds image implementations."
        },
        "instructions": "Build local image labeled app.",
        "initialCode": "// Practice Docker builds image code here\n",
        "validationRegex": "docker\\\\s+build",
        "hint": "Example pattern match target: docker build -t app ."
      },
      {
        "id": "devops-containers-docker-runs-containers-09",
        "levelNumber": 9,
        "title": "Docker runs containers",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Docker runs containers inside DevOps & Containers.",
          "blueprint": "```\\ndocker run -d -p 3000:3000 app\\n```",
          "deepDive": "Deep dive documentation details for Docker runs containers implementations."
        },
        "instructions": "Run container image app mapping port 3000.",
        "initialCode": "// Practice Docker runs containers code here\n",
        "validationRegex": "docker\\\\s+run",
        "hint": "Example pattern match target: docker run -d -p 3000:3000 app"
      },
      {
        "id": "devops-containers-compose-schemas-version-10",
        "levelNumber": 10,
        "title": "Compose schemas version",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Compose schemas version inside DevOps & Containers.",
          "blueprint": "```\\nversion: \"3.8\"\\n```",
          "deepDive": "Deep dive documentation details for Compose schemas version implementations."
        },
        "instructions": "Define docker-compose schemas format version to 3.8.",
        "initialCode": "// Practice Compose schemas version code here\n",
        "validationRegex": "version",
        "hint": "Example pattern match target: version: \"3.8\""
      },
      {
        "id": "devops-containers-compose-services-define-11",
        "levelNumber": 11,
        "title": "Compose services define",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Compose services define inside DevOps & Containers.",
          "blueprint": "```\\nservices:\n  web:\n    image: node\\n```",
          "deepDive": "Deep dive documentation details for Compose services define implementations."
        },
        "instructions": "Configure compose service web.",
        "initialCode": "// Practice Compose services define code here\n",
        "validationRegex": "services.*web",
        "hint": "Example pattern match target: services:"
      },
      {
        "id": "devops-containers-compose-ports-forward-12",
        "levelNumber": 12,
        "title": "Compose ports forward",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Compose ports forward inside DevOps & Containers.",
          "blueprint": "```\\nports:\n  - \"3000:3000\"\\n```",
          "deepDive": "Deep dive documentation details for Compose ports forward implementations."
        },
        "instructions": "Map network ports configurations.",
        "initialCode": "// Practice Compose ports forward code here\n",
        "validationRegex": "ports",
        "hint": "Example pattern match target: ports:"
      },
      {
        "id": "devops-containers-github-workflows-actions-13",
        "levelNumber": 13,
        "title": "GitHub workflows actions",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for GitHub workflows actions inside DevOps & Containers.",
          "blueprint": "```\\non: [push]\\n```",
          "deepDive": "Deep dive documentation details for GitHub workflows actions implementations."
        },
        "instructions": "Configure action trigger event on push.",
        "initialCode": "// Practice GitHub workflows actions code here\n",
        "validationRegex": "on\\\\s*:\\\\s*\\\\[\\\\s*push",
        "hint": "Example pattern match target: on: [push]"
      },
      {
        "id": "devops-containers-actions-checkouts-steps-14",
        "levelNumber": 14,
        "title": "Actions checkouts steps",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Actions checkouts steps inside DevOps & Containers.",
          "blueprint": "```\\nuses: actions/checkout@v4\\n```",
          "deepDive": "Deep dive documentation details for Actions checkouts steps implementations."
        },
        "instructions": "Configure workflow step invoking checkout actions.",
        "initialCode": "// Practice Actions checkouts steps code here\n",
        "validationRegex": "checkout",
        "hint": "Example pattern match target: uses: actions/checkout@v4"
      },
      {
        "id": "devops-containers-actions-custom-scripts-15",
        "levelNumber": 15,
        "title": "Actions custom scripts",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Actions custom scripts inside DevOps & Containers.",
          "blueprint": "```\\nrun: npm test\\n```",
          "deepDive": "Deep dive documentation details for Actions custom scripts implementations."
        },
        "instructions": "Write terminal script execution step.",
        "initialCode": "// Practice Actions custom scripts code here\n",
        "validationRegex": "run",
        "hint": "Example pattern match target: run: npm test"
      }
    ]
  },
  {
    "worldId": "dsa",
    "worldName": "Data Structures & Algorithms",
    "levels": [
      {
        "id": "dsa-arrays-instantiation-01",
        "levelNumber": 1,
        "title": "Arrays instantiation",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Arrays instantiation inside Data Structures & Algorithms.",
          "blueprint": "```\\nconst arr = [];\\n```",
          "deepDive": "Deep dive documentation details for Arrays instantiation implementations."
        },
        "instructions": "Instantiate empty array variable arr.",
        "initialCode": "// Practice Arrays instantiation code here\n",
        "validationRegex": "const\\\\s+arr\\\\s*=\\\\s*\\\\[",
        "hint": "Example pattern match target: const arr = [];"
      },
      {
        "id": "dsa-arrays-push-values-02",
        "levelNumber": 2,
        "title": "Arrays push values",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Arrays push values inside Data Structures & Algorithms.",
          "blueprint": "```\\narr.push(10);\\n```",
          "deepDive": "Deep dive documentation details for Arrays push values implementations."
        },
        "instructions": "Append integer 10 to array.",
        "initialCode": "// Practice Arrays push values code here\n",
        "validationRegex": "arr\\\\.push",
        "hint": "Example pattern match target: arr.push(10);"
      },
      {
        "id": "dsa-stacks-popping-values-03",
        "levelNumber": 3,
        "title": "Stacks popping values",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Stacks popping values inside Data Structures & Algorithms.",
          "blueprint": "```\\nstack.pop();\\n```",
          "deepDive": "Deep dive documentation details for Stacks popping values implementations."
        },
        "instructions": "Pop top value element from stack.",
        "initialCode": "// Practice Stacks popping values code here\n",
        "validationRegex": "stack\\\\.pop",
        "hint": "Example pattern match target: stack.pop();"
      },
      {
        "id": "dsa-queues-shift-dequeue-04",
        "levelNumber": 4,
        "title": "Queues shift dequeue",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Queues shift dequeue inside Data Structures & Algorithms.",
          "blueprint": "```\\nqueue.shift();\\n```",
          "deepDive": "Deep dive documentation details for Queues shift dequeue implementations."
        },
        "instructions": "Dequeue first element from queue.",
        "initialCode": "// Practice Queues shift dequeue code here\n",
        "validationRegex": "queue\\\\.shift",
        "hint": "Example pattern match target: queue.shift();"
      },
      {
        "id": "dsa-graph-nodes-definitions-05",
        "levelNumber": 5,
        "title": "Graph Nodes definitions",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Graph Nodes definitions inside Data Structures & Algorithms.",
          "blueprint": "```\\nclass Node {\n  constructor(val) {\n    this.val = val;\n    this.next = null;\n  }\n}\\n```",
          "deepDive": "Deep dive documentation details for Graph Nodes definitions implementations."
        },
        "instructions": "Define linked list Node constructor holding val and next.",
        "initialCode": "// Practice Graph Nodes definitions code here\n",
        "validationRegex": "this\\\\.next",
        "hint": "Example pattern match target: class Node {"
      },
      {
        "id": "dsa-linkedlist-heads-link-06",
        "levelNumber": 6,
        "title": "LinkedList heads link",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for LinkedList heads link inside Data Structures & Algorithms.",
          "blueprint": "```\\nthis.head = new Node(val);\\n```",
          "deepDive": "Deep dive documentation details for LinkedList heads link implementations."
        },
        "instructions": "Initialize LinkedList head mapping new Node.",
        "initialCode": "// Practice LinkedList heads link code here\n",
        "validationRegex": "new\\\\s+Node",
        "hint": "Example pattern match target: this.head = new Node(val);"
      },
      {
        "id": "dsa-trees-node-linkage-07",
        "levelNumber": 7,
        "title": "Trees node linkage",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Trees node linkage inside Data Structures & Algorithms.",
          "blueprint": "```\\nthis.root = new Node(val);\\n```",
          "deepDive": "Deep dive documentation details for Trees node linkage implementations."
        },
        "instructions": "Initialize BinaryTree root mapping new Node.",
        "initialCode": "// Practice Trees node linkage code here\n",
        "validationRegex": "this\\\\.root",
        "hint": "Example pattern match target: this.root = new Node(val);"
      },
      {
        "id": "dsa-binary-searches-splits-08",
        "levelNumber": 8,
        "title": "Binary searches splits",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Binary searches splits inside Data Structures & Algorithms.",
          "blueprint": "```\\nlet mid = Math.floor((low + high) / 2);\\n```",
          "deepDive": "Deep dive documentation details for Binary searches splits implementations."
        },
        "instructions": "Calculate middle indexes bounds binary search split.",
        "initialCode": "// Practice Binary searches splits code here\n",
        "validationRegex": "Math\\\\.floor",
        "hint": "Example pattern match target: let mid = Math.floor((low + high) / 2);"
      },
      {
        "id": "dsa-bubble-sort-swaps-09",
        "levelNumber": 9,
        "title": "Bubble Sort swaps",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Bubble Sort swaps inside Data Structures & Algorithms.",
          "blueprint": "```\\nlet temp = arr[i];\narr[i] = arr[i+1];\narr[i+1] = temp;\\n```",
          "deepDive": "Deep dive documentation details for Bubble Sort swaps implementations."
        },
        "instructions": "Swap adjacent elements for sorting.",
        "initialCode": "// Practice Bubble Sort swaps code here\n",
        "validationRegex": "arr\\\\[\\\\s*i\\\\s*\\\\]",
        "hint": "Example pattern match target: let temp = arr[i];"
      },
      {
        "id": "dsa-linear-complexity-o1-10",
        "levelNumber": 10,
        "title": "Linear complexity O1",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Linear complexity O1 inside Data Structures & Algorithms.",
          "blueprint": "```\\n// Complexity: O(n)\\n```",
          "deepDive": "Deep dive documentation details for Linear complexity O1 implementations."
        },
        "instructions": "Document linear complexity boundary using Big-O comment.",
        "initialCode": "// Practice Linear complexity O1 code here\n",
        "validationRegex": "O\\\\(n\\\\)",
        "hint": "Example pattern match target: // Complexity: O(n)"
      },
      {
        "id": "dsa-quadratic-complexity-on2-11",
        "levelNumber": 11,
        "title": "Quadratic complexity ON2",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Quadratic complexity ON2 inside Data Structures & Algorithms.",
          "blueprint": "```\\n// Complexity: O(n^2)\\n```",
          "deepDive": "Deep dive documentation details for Quadratic complexity ON2 implementations."
        },
        "instructions": "Document quadratic complexity boundary using Big-O comment.",
        "initialCode": "// Practice Quadratic complexity ON2 code here\n",
        "validationRegex": "O\\\\(n\\\\^2\\\\)",
        "hint": "Example pattern match target: // Complexity: O(n^2)"
      },
      {
        "id": "dsa-hashtables-mappings-key-12",
        "levelNumber": 12,
        "title": "HashTables mappings key",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for HashTables mappings key inside Data Structures & Algorithms.",
          "blueprint": "```\\nreturn this.table[key];\\n```",
          "deepDive": "Deep dive documentation details for HashTables mappings key implementations."
        },
        "instructions": "Retrieve bucket values entries from table hashing key.",
        "initialCode": "// Practice HashTables mappings key code here\n",
        "validationRegex": "table\\\\[\\\\s*key",
        "hint": "Example pattern match target: return this.table[key];"
      },
      {
        "id": "dsa-graphs-adjacencies-link-13",
        "levelNumber": 13,
        "title": "Graphs adjacencies link",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Graphs adjacencies link inside Data Structures & Algorithms.",
          "blueprint": "```\\nthis.adj[v] = [];\\n```",
          "deepDive": "Deep dive documentation details for Graphs adjacencies link implementations."
        },
        "instructions": "Initialize vertices list inside graph adjacency list.",
        "initialCode": "// Practice Graphs adjacencies link code here\n",
        "validationRegex": "adj\\\\[\\\\s*v",
        "hint": "Example pattern match target: this.adj[v] = [];"
      },
      {
        "id": "dsa-recursive-factorials-functions-14",
        "levelNumber": 14,
        "title": "Recursive Factorials functions",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Recursive Factorials functions inside Data Structures & Algorithms.",
          "blueprint": "```\\nif (n <= 1) return 1;\nreturn n * fact(n-1);\\n```",
          "deepDive": "Deep dive documentation details for Recursive Factorials functions implementations."
        },
        "instructions": "Write base and recursive call for factorial.",
        "initialCode": "// Practice Recursive Factorials functions code here\n",
        "validationRegex": "fact\\\\(",
        "hint": "Example pattern match target: if (n <= 1) return 1;"
      },
      {
        "id": "dsa-fibonacci-memoization-cache-15",
        "levelNumber": 15,
        "title": "Fibonacci Memoization cache",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Fibonacci Memoization cache inside Data Structures & Algorithms.",
          "blueprint": "```\\nif(memo[n]) return memo[n];\nmemo[n] = fib(n-1) + fib(n-2);\\n```",
          "deepDive": "Deep dive documentation details for Fibonacci Memoization cache implementations."
        },
        "instructions": "Retrieve memoized calculation or compute fibonacci recursively.",
        "initialCode": "// Practice Fibonacci Memoization cache code here\n",
        "validationRegex": "memo\\\\[\\\\s*n",
        "hint": "Example pattern match target: if(memo[n]) return memo[n];"
      }
    ]
  },
  {
    "worldId": "security-apis",
    "worldName": "Web Security & APIs",
    "levels": [
      {
        "id": "security-apis-xss-sanitizations-regex-01",
        "levelNumber": 1,
        "title": "XSS Sanitizations regex",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for XSS Sanitizations regex inside Web Security & APIs.",
          "blueprint": "```\\nstr.replace(/</g, \"&lt;\");\\n```",
          "deepDive": "Deep dive documentation details for XSS Sanitizations regex implementations."
        },
        "instructions": "Escape left angle brackets to prevent script execution.",
        "initialCode": "// Practice XSS Sanitizations regex code here\n",
        "validationRegex": "replace",
        "hint": "Example pattern match target: str.replace(/</g, \"&lt;\");"
      },
      {
        "id": "security-apis-bcrypt-hashes-pass-02",
        "levelNumber": 2,
        "title": "Bcrypt hashes pass",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Bcrypt hashes pass inside Web Security & APIs.",
          "blueprint": "```\\nawait bcrypt.hash(pass, 10);\\n```",
          "deepDive": "Deep dive documentation details for Bcrypt hashes pass implementations."
        },
        "instructions": "Hash pass variable using bcrypt salt 10.",
        "initialCode": "// Practice Bcrypt hashes pass code here\n",
        "validationRegex": "hash",
        "hint": "Example pattern match target: await bcrypt.hash(pass, 10);"
      },
      {
        "id": "security-apis-cors-access-headers-03",
        "levelNumber": 3,
        "title": "CORS access headers",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for CORS access headers inside Web Security & APIs.",
          "blueprint": "```\\nres.setHeader(\"Access-Control-Allow-Origin\", \"*\");\\n```",
          "deepDive": "Deep dive documentation details for CORS access headers implementations."
        },
        "instructions": "Set access header letting origin domains cross.",
        "initialCode": "// Practice CORS access headers code here\n",
        "validationRegex": "Access-Control-Allow-Origin",
        "hint": "Example pattern match target: res.setHeader(\"Access-Control-Allow-Origin\", \"*\");"
      },
      {
        "id": "security-apis-jwt-signatures-keys-04",
        "levelNumber": 4,
        "title": "JWT signatures keys",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for JWT signatures keys inside Web Security & APIs.",
          "blueprint": "```\\njwt.sign({ id }, secret);\\n```",
          "deepDive": "Deep dive documentation details for JWT signatures keys implementations."
        },
        "instructions": "Generate signature tokens containing id.",
        "initialCode": "// Practice JWT signatures keys code here\n",
        "validationRegex": "sign",
        "hint": "Example pattern match target: jwt.sign({ id }, secret);"
      },
      {
        "id": "security-apis-jwt-validations-verification-05",
        "levelNumber": 5,
        "title": "JWT validations verification",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for JWT validations verification inside Web Security & APIs.",
          "blueprint": "```\\njwt.verify(token, secret);\\n```",
          "deepDive": "Deep dive documentation details for JWT validations verification implementations."
        },
        "instructions": "Decode and verify authorization token.",
        "initialCode": "// Practice JWT validations verification code here\n",
        "validationRegex": "verify",
        "hint": "Example pattern match target: jwt.verify(token, secret);"
      },
      {
        "id": "security-apis-graphql-queries-requests-06",
        "levelNumber": 6,
        "title": "GraphQL queries requests",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for GraphQL queries requests inside Web Security & APIs.",
          "blueprint": "```\\nquery { user { id } }\\n```",
          "deepDive": "Deep dive documentation details for GraphQL queries requests implementations."
        },
        "instructions": "Query GraphQL client requesting user ID.",
        "initialCode": "// Practice GraphQL queries requests code here\n",
        "validationRegex": "query",
        "hint": "Example pattern match target: query { user { id } }"
      },
      {
        "id": "security-apis-graphql-mutations-updates-07",
        "levelNumber": 7,
        "title": "GraphQL mutations updates",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for GraphQL mutations updates inside Web Security & APIs.",
          "blueprint": "```\\nmutation { add(val: 5) { id } }\\n```",
          "deepDive": "Deep dive documentation details for GraphQL mutations updates implementations."
        },
        "instructions": "Write GraphQL mutation invoking add.",
        "initialCode": "// Practice GraphQL mutations updates code here\n",
        "validationRegex": "mutation",
        "hint": "Example pattern match target: mutation { add(val: 5) { id } }"
      },
      {
        "id": "security-apis-graphql-schemas-definitions-08",
        "levelNumber": 8,
        "title": "GraphQL Schemas definitions",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for GraphQL Schemas definitions inside Web Security & APIs.",
          "blueprint": "```\\ntype User {\n  id: ID!\n}\\n```",
          "deepDive": "Deep dive documentation details for GraphQL Schemas definitions implementations."
        },
        "instructions": "Define GraphQL schema type User holding non-nullable ID.",
        "initialCode": "// Practice GraphQL Schemas definitions code here\n",
        "validationRegex": "type\\\\s+User",
        "hint": "Example pattern match target: type User {"
      },
      {
        "id": "security-apis-mongodb-records-insertions-09",
        "levelNumber": 9,
        "title": "MongoDB records insertions",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for MongoDB records insertions inside Web Security & APIs.",
          "blueprint": "```\\ndb.collection(\"users\").insertOne(u);\\n```",
          "deepDive": "Deep dive documentation details for MongoDB records insertions implementations."
        },
        "instructions": "Insert document records into collection.",
        "initialCode": "// Practice MongoDB records insertions code here\n",
        "validationRegex": "insertOne",
        "hint": "Example pattern match target: db.collection(\"users\").insertOne(u);"
      },
      {
        "id": "security-apis-mongodb-query-lookup-10",
        "levelNumber": 10,
        "title": "MongoDB query lookup",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for MongoDB query lookup inside Web Security & APIs.",
          "blueprint": "```\\ndb.collection(\"users\").findOne({ id });\\n```",
          "deepDive": "Deep dive documentation details for MongoDB query lookup implementations."
        },
        "instructions": "Query collection returning single document matching id.",
        "initialCode": "// Practice MongoDB query lookup code here\n",
        "validationRegex": "findOne",
        "hint": "Example pattern match target: db.collection(\"users\").findOne({ id });"
      },
      {
        "id": "security-apis-redis-caches-keys-11",
        "levelNumber": 11,
        "title": "Redis caches keys",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Redis caches keys inside Web Security & APIs.",
          "blueprint": "```\\nredis.set(key, val);\\n```",
          "deepDive": "Deep dive documentation details for Redis caches keys implementations."
        },
        "instructions": "Cache key-value data inside Redis.",
        "initialCode": "// Practice Redis caches keys code here\n",
        "validationRegex": "set",
        "hint": "Example pattern match target: redis.set(key, val);"
      },
      {
        "id": "security-apis-redis-caches-fetch-12",
        "levelNumber": 12,
        "title": "Redis caches fetch",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Redis caches fetch inside Web Security & APIs.",
          "blueprint": "```\\nredis.get(key);\\n```",
          "deepDive": "Deep dive documentation details for Redis caches fetch implementations."
        },
        "instructions": "Retrieve cached values from Redis.",
        "initialCode": "// Practice Redis caches fetch code here\n",
        "validationRegex": "get",
        "hint": "Example pattern match target: redis.get(key);"
      },
      {
        "id": "security-apis-sql-injection-defense-13",
        "levelNumber": 13,
        "title": "SQL Injection defense",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for SQL Injection defense inside Web Security & APIs.",
          "blueprint": "```\\ndb.query(\"SELECT * FROM users WHERE id = ?\", [id]);\\n```",
          "deepDive": "Deep dive documentation details for SQL Injection defense implementations."
        },
        "instructions": "Inject sanitized input fields values using parameterized query array.",
        "initialCode": "// Practice SQL Injection defense code here\n",
        "validationRegex": "db\\\\.query.*\\\\[",
        "hint": "Example pattern match target: db.query(\"SELECT * FROM users WHERE id = ?\", [id]);"
      },
      {
        "id": "security-apis-helmet-headers-protection-14",
        "levelNumber": 14,
        "title": "Helmet headers protection",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Helmet headers protection inside Web Security & APIs.",
          "blueprint": "```\\napp.use(helmet());\\n```",
          "deepDive": "Deep dive documentation details for Helmet headers protection implementations."
        },
        "instructions": "Apply Helmet protection middleware to app.",
        "initialCode": "// Practice Helmet headers protection code here\n",
        "validationRegex": "helmet",
        "hint": "Example pattern match target: app.use(helmet());"
      },
      {
        "id": "security-apis-csrf-tokens-checks-15",
        "levelNumber": 15,
        "title": "CSRF tokens checks",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for CSRF tokens checks inside Web Security & APIs.",
          "blueprint": "```\\nif (token !== expected) throw new Error();\\n```",
          "deepDive": "Deep dive documentation details for CSRF tokens checks implementations."
        },
        "instructions": "Verify tokens references validating signatures matches.",
        "initialCode": "// Practice CSRF tokens checks code here\n",
        "validationRegex": "expected",
        "hint": "Example pattern match target: if (token !== expected) throw new Error();"
      }
    ]
  },
  {
    "worldId": "testing-qa",
    "worldName": "Testing & QA",
    "levels": [
      {
        "id": "testing-qa-assert-equality-values-01",
        "levelNumber": 1,
        "title": "Assert equality values",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Assert equality values inside Testing & QA.",
          "blueprint": "```\\nassert.strictEqual(act, exp);\\n```",
          "deepDive": "Deep dive documentation details for Assert equality values implementations."
        },
        "instructions": "Assert strict equality of variables act and exp.",
        "initialCode": "// Practice Assert equality values code here\n",
        "validationRegex": "strictEqual",
        "hint": "Example pattern match target: assert.strictEqual(act, exp);"
      },
      {
        "id": "testing-qa-jest-expect-checks-02",
        "levelNumber": 2,
        "title": "Jest expect checks",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Jest expect checks inside Testing & QA.",
          "blueprint": "```\\nexpect(act).toBe(exp);\\n```",
          "deepDive": "Deep dive documentation details for Jest expect checks implementations."
        },
        "instructions": "Compare equality utilizing Jest expect checks.",
        "initialCode": "// Practice Jest expect checks code here\n",
        "validationRegex": "expect.*toBe",
        "hint": "Example pattern match target: expect(act).toBe(exp);"
      },
      {
        "id": "testing-qa-jest-suites-descriptors-03",
        "levelNumber": 3,
        "title": "Jest suites descriptors",
        "tier": "Beginner",
        "codex": {
          "analogy": "Concept analogy for Jest suites descriptors inside Testing & QA.",
          "blueprint": "```\\ndescribe(\"suite\", () => {});\\n```",
          "deepDive": "Deep dive documentation details for Jest suites descriptors implementations."
        },
        "instructions": "Enclose tests inside suite descriptor block.",
        "initialCode": "// Practice Jest suites descriptors code here\n",
        "validationRegex": "describe",
        "hint": "Example pattern match target: describe(\"suite\", () => {});"
      },
      {
        "id": "testing-qa-jest-tests-case-04",
        "levelNumber": 4,
        "title": "Jest tests case",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Jest tests case inside Testing & QA.",
          "blueprint": "```\\nit(\"works\", () => {});\\n```",
          "deepDive": "Deep dive documentation details for Jest tests case implementations."
        },
        "instructions": "Declare test case block checking if it works.",
        "initialCode": "// Practice Jest tests case code here\n",
        "validationRegex": "it\\\\(",
        "hint": "Example pattern match target: it(\"works\", () => {});"
      },
      {
        "id": "testing-qa-jest-mock-closures-05",
        "levelNumber": 5,
        "title": "Jest mock closures",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Jest mock closures inside Testing & QA.",
          "blueprint": "```\\nconst fn = jest.fn();\\n```",
          "deepDive": "Deep dive documentation details for Jest mock closures implementations."
        },
        "instructions": "Initialize mock function using Jest helpers.",
        "initialCode": "// Practice Jest mock closures code here\n",
        "validationRegex": "jest\\\\.fn",
        "hint": "Example pattern match target: const fn = jest.fn();"
      },
      {
        "id": "testing-qa-before-hook-triggers-06",
        "levelNumber": 6,
        "title": "Before Hook triggers",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Before Hook triggers inside Testing & QA.",
          "blueprint": "```\\nbeforeEach(() => {});\\n```",
          "deepDive": "Deep dive documentation details for Before Hook triggers implementations."
        },
        "instructions": "Configure setup hooks running before each case runs.",
        "initialCode": "// Practice Before Hook triggers code here\n",
        "validationRegex": "beforeEach",
        "hint": "Example pattern match target: beforeEach(() => {});"
      },
      {
        "id": "testing-qa-after-hook-cleanups-07",
        "levelNumber": 7,
        "title": "After Hook cleanups",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for After Hook cleanups inside Testing & QA.",
          "blueprint": "```\\nafterEach(() => {});\\n```",
          "deepDive": "Deep dive documentation details for After Hook cleanups implementations."
        },
        "instructions": "Configure teardown cleanups hook.",
        "initialCode": "// Practice After Hook cleanups code here\n",
        "validationRegex": "afterEach",
        "hint": "Example pattern match target: afterEach(() => {});"
      },
      {
        "id": "testing-qa-async-tests-asserts-08",
        "levelNumber": 8,
        "title": "Async tests asserts",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Async tests asserts inside Testing & QA.",
          "blueprint": "```\\nawait expect(run()).resolves.toBe(5);\\n```",
          "deepDive": "Deep dive documentation details for Async tests asserts implementations."
        },
        "instructions": "Assert async returns resolving to 5.",
        "initialCode": "// Practice Async tests asserts code here\n",
        "validationRegex": "resolves",
        "hint": "Example pattern match target: await expect(run()).resolves.toBe(5);"
      },
      {
        "id": "testing-qa-assertions-errors-throws-09",
        "levelNumber": 9,
        "title": "Assertions errors throws",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Assertions errors throws inside Testing & QA.",
          "blueprint": "```\\nexpect(() => run()).toThrow();\\n```",
          "deepDive": "Deep dive documentation details for Assertions errors throws implementations."
        },
        "instructions": "Verify functions execution triggers error throw.",
        "initialCode": "// Practice Assertions errors throws code here\n",
        "validationRegex": "toThrow",
        "hint": "Example pattern match target: expect(() => run()).toThrow();"
      },
      {
        "id": "testing-qa-cypress-page-loading-10",
        "levelNumber": 10,
        "title": "Cypress page loading",
        "tier": "Intermediate",
        "codex": {
          "analogy": "Concept analogy for Cypress page loading inside Testing & QA.",
          "blueprint": "```\\ncy.visit(\"/home\");\\n```",
          "deepDive": "Deep dive documentation details for Cypress page loading implementations."
        },
        "instructions": "Navigate browser target window utilizing cy.visit().",
        "initialCode": "// Practice Cypress page loading code here\n",
        "validationRegex": "cy\\\\.visit",
        "hint": "Example pattern match target: cy.visit(\"/home\");"
      },
      {
        "id": "testing-qa-cypress-selector-click-11",
        "levelNumber": 11,
        "title": "Cypress selector click",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Cypress selector click inside Testing & QA.",
          "blueprint": "```\\ncy.get(\"#btn\").click();\\n```",
          "deepDive": "Deep dive documentation details for Cypress selector click implementations."
        },
        "instructions": "Retrieve element button by ID and click it.",
        "initialCode": "// Practice Cypress selector click code here\n",
        "validationRegex": "cy\\\\.get.*click",
        "hint": "Example pattern match target: cy.get(\"#btn\").click();"
      },
      {
        "id": "testing-qa-cypress-visibility-check-12",
        "levelNumber": 12,
        "title": "Cypress visibility check",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Cypress visibility check inside Testing & QA.",
          "blueprint": "```\\ncy.contains(\"Home\").should(\"be.visible\");\\n```",
          "deepDive": "Deep dive documentation details for Cypress visibility check implementations."
        },
        "instructions": "Assert element visibility contents matching home.",
        "initialCode": "// Practice Cypress visibility check code here\n",
        "validationRegex": "should",
        "hint": "Example pattern match target: cy.contains(\"Home\").should(\"be.visible\");"
      },
      {
        "id": "testing-qa-cypress-input-keystroke-13",
        "levelNumber": 13,
        "title": "Cypress input keystroke",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Cypress input keystroke inside Testing & QA.",
          "blueprint": "```\\ncy.get(\"input\").type(\"key\");\\n```",
          "deepDive": "Deep dive documentation details for Cypress input keystroke implementations."
        },
        "instructions": "Type input string key inside text box.",
        "initialCode": "// Practice Cypress input keystroke code here\n",
        "validationRegex": "type",
        "hint": "Example pattern match target: cy.get(\"input\").type(\"key\");"
      },
      {
        "id": "testing-qa-playwright-page-goto-14",
        "levelNumber": 14,
        "title": "Playwright page goto",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Playwright page goto inside Testing & QA.",
          "blueprint": "```\\nawait page.goto(\"/home\");\\n```",
          "deepDive": "Deep dive documentation details for Playwright page goto implementations."
        },
        "instructions": "Route driver browser execution to URL target utilizing page.goto().",
        "initialCode": "// Practice Playwright page goto code here\n",
        "validationRegex": "page\\\\.goto",
        "hint": "Example pattern match target: await page.goto(\"/home\");"
      },
      {
        "id": "testing-qa-playwright-title-verify-15",
        "levelNumber": 15,
        "title": "Playwright title verify",
        "tier": "Grandmaster",
        "codex": {
          "analogy": "Concept analogy for Playwright title verify inside Testing & QA.",
          "blueprint": "```\\nawait expect(page).toHaveTitle(\"Home\");\\n```",
          "deepDive": "Deep dive documentation details for Playwright title verify implementations."
        },
        "instructions": "Assert pages title maps to Home.",
        "initialCode": "// Practice Playwright title verify code here\n",
        "validationRegex": "toHaveTitle",
        "hint": "Example pattern match target: await expect(page).toHaveTitle(\"Home\");"
      }
    ]
  }
];

function cleanText(txt: string): string {
  if (!txt) return '';
  return txt.replace(/\\n/g, '\n');
}

const getLessonsPool = (worldId: string) => {
  const wid = worldId.toLowerCase();

  // 1. HTML5 Fortress
  if (wid.includes('html')) {
    return [
      {
        title: "Heading element {{index}}",
        instructions: "Mount custom gate header wrapping banner name {{var}}.",
        starterCode: "<!-- HTML heading -->\n",
        validationRegex: "<h[1-6]>.*</h[1-6]>",
        hint: "<h1>{{var}}</h1>",
        blueprint: "<h1>{{var}}</h1>"
      },
      {
        title: "Div Container {{index}}",
        instructions: "Create divider container wrapping content with id class {{var}}.",
        starterCode: "<!-- Structural blocks -->\n",
        validationRegex: "<div\\\\s+id=['\"]{{var}}['\"]\>",
        hint: "<div id=\"{{var}}\">Container</div>",
        blueprint: "<div id=\"{{var}}\">\n  Container\n</div>"
      },
      {
        title: "Link Anchor {{index}}",
        instructions: "Create link anchor directing user to /route-{{val}}.",
        starterCode: "<!-- Hyperlink anchor -->\n",
        validationRegex: "href=['\"]/route-{{val}}['\"]",
        hint: "<a href=\"/route-{{val}}\">Link</a>",
        blueprint: "<a href=\"/route-{{val}}\">Link</a>"
      },
      {
        title: "Section container tag {{index}}",
        instructions: "Establish a document layout wrapper using semantic <section>.",
        starterCode: "<!-- Semantic sections -->\n",
        validationRegex: "<section>",
        hint: "<section>Knight Guild</section>",
        blueprint: "<section>\n  Knight Guild\n</section>"
      },
      {
        title: "HTML Input form fields {{index}}",
        instructions: "Create password parameter form input named input_{{var}}.",
        starterCode: "<!-- Input field block -->\n",
        validationRegex: "type=['\"]password['\"]\\\\s+name=['\"]input_{{var}}['\"]",
        hint: "<input type=\"password\" name=\"input_{{var}}\" />",
        blueprint: "<input type=\"password\" name=\"input_{{var}}\" />"
      },
      {
        title: "Image element {{index}}",
        instructions: "Create image tag mapping source to /images/{{var}}.png.",
        starterCode: "<!-- Image block -->\n",
        validationRegex: "<img\\\\s+src=['\"]/images/{{var}}\\\\.png['\"]",
        hint: "<img src=\"/images/{{var}}.png\" />",
        blueprint: "<img src=\"/images/{{var}}.png\" />"
      },
      {
        title: "Unordered list {{index}}",
        instructions: "Create unordered list containing list items.",
        starterCode: "<!-- Bullet list block -->\n",
        validationRegex: "<ul>\\\\s*<li>",
        hint: "<ul><li>Item</li></ul>",
        blueprint: "<ul>\n  <li>Item</li>\n</ul>"
      },
      {
        title: "Paragraph element {{index}}",
        instructions: "Create paragraph element wrapping text welcome {{var}}.",
        starterCode: "<!-- Paragraph text block -->\n",
        validationRegex: "<p>\\\\s*[^<]+\\\\s*</p>",
        hint: "<p>Welcome {{var}}</p>",
        blueprint: "<p>Welcome {{var}}</p>"
      },
      {
        title: "Form wrapper {{index}}",
        instructions: "Create form layout pointing action to /submit-{{val}}.",
        starterCode: "<!-- Form layout container -->\n",
        validationRegex: "<form\\\\s+action=['\"]/submit-{{val}}['\"]",
        hint: "<form action=\"/submit-{{val}}\"></form>",
        blueprint: "<form action=\"/submit-{{val}}\">\n</form>"
      },
      {
        title: "Button element {{index}}",
        instructions: "Create submit button containing text Submit.",
        starterCode: "<!-- Action button block -->\n",
        validationRegex: "<button.*>Submit</button>",
        hint: "<button type=\"submit\">Submit</button>",
        blueprint: "<button type=\"submit\">Submit</button>"
      },
      {
        title: "HTML Table structure {{index}}",
        instructions: "Create a table with a header row containing columns Name and Score.",
        starterCode: "<!-- Table structure -->\n",
        validationRegex: "<table>.*<th>",
        hint: "<table><tr><th>Name</th><th>Score</th></tr></table>",
        blueprint: "<table>\n  <tr><th>Name</th><th>Score</th></tr>\n</table>"
      },
      {
        title: "Ordered list {{index}}",
        instructions: "Create an ordered numbered list with at least two items.",
        starterCode: "<!-- Ordered list -->\n",
        validationRegex: "<ol>\\\\s*<li>",
        hint: "<ol><li>First</li><li>Second</li></ol>",
        blueprint: "<ol>\n  <li>First</li>\n  <li>Second</li>\n</ol>"
      },
      {
        title: "Textarea element {{index}}",
        instructions: "Create a textarea with name {{var}} and {{val}} rows.",
        starterCode: "<!-- Text area input -->\n",
        validationRegex: "<textarea.*name=['\"]{{var}}['\"]",
        hint: "<textarea name=\"{{var}}\" rows=\"{{val}}\"></textarea>",
        blueprint: "<textarea name=\"{{var}}\" rows=\"{{val}}\"></textarea>"
      },
      {
        title: "Select dropdown {{index}}",
        instructions: "Create a dropdown select with id {{var}} containing at least two options.",
        starterCode: "<!-- Dropdown select -->\n",
        validationRegex: "<select.*id=['\"]{{var}}['\"].*<option",
        hint: "<select id=\"{{var}}\"><option>One</option><option>Two</option></select>",
        blueprint: "<select id=\"{{var}}\">\n  <option>One</option>\n  <option>Two</option>\n</select>"
      },
      {
        title: "Audio element {{index}}",
        instructions: "Embed an audio player with source /audio/{{var}}.mp3 and controls.",
        starterCode: "<!-- Audio player -->\n",
        validationRegex: "<audio.*controls",
        hint: "<audio controls><source src=\"/audio/{{var}}.mp3\" type=\"audio/mpeg\"></audio>",
        blueprint: "<audio controls>\n  <source src=\"/audio/{{var}}.mp3\" type=\"audio/mpeg\">\n</audio>"
      },
      {
        title: "Video element {{index}}",
        instructions: "Embed a video player with source /video/{{var}}.mp4, width {{val}}px and controls.",
        starterCode: "<!-- Video player -->\n",
        validationRegex: "<video.*controls",
        hint: "<video width=\"{{val}}\" controls><source src=\"/video/{{var}}.mp4\"></video>",
        blueprint: "<video width=\"{{val}}\" controls>\n  <source src=\"/video/{{var}}.mp4\">\n</video>"
      },
      {
        title: "Details and Summary {{index}}",
        instructions: "Create a collapsible details element with summary text Click to expand.",
        starterCode: "<!-- Collapsible details -->\n",
        validationRegex: "<details>\\\\s*<summary>",
        hint: "<details><summary>Click to expand</summary><p>Hidden content</p></details>",
        blueprint: "<details>\n  <summary>Click to expand</summary>\n  <p>Hidden content</p>\n</details>"
      },
      {
        title: "Nav element {{index}}",
        instructions: "Create a semantic nav element containing a link to /{{var}}.",
        starterCode: "<!-- Navigation -->\n",
        validationRegex: "<nav>.*<a",
        hint: "<nav><a href=\"/{{var}}\">Navigation</a></nav>",
        blueprint: "<nav>\n  <a href=\"/{{var}}\">Navigation</a>\n</nav>"
      },
      {
        title: "Footer element {{index}}",
        instructions: "Create a page footer containing copyright text.",
        starterCode: "<!-- Page footer -->\n",
        validationRegex: "<footer>",
        hint: "<footer><p>&copy; 2024 SyntaxKnight</p></footer>",
        blueprint: "<footer>\n  <p>&copy; 2024 SyntaxKnight</p>\n</footer>"
      },
      {
        title: "Header element {{index}}",
        instructions: "Create a page header containing a heading and navigation.",
        starterCode: "<!-- Page header -->\n",
        validationRegex: "<header>",
        hint: "<header><h1>{{var}}</h1></header>",
        blueprint: "<header>\n  <h1>{{var}}</h1>\n</header>"
      },
      {
        title: "Article element {{index}}",
        instructions: "Create an article element wrapping a blog post with title {{var}}.",
        starterCode: "<!-- Blog article -->\n",
        validationRegex: "<article>",
        hint: "<article><h2>{{var}}</h2><p>Content here</p></article>",
        blueprint: "<article>\n  <h2>{{var}}</h2>\n  <p>Content here</p>\n</article>"
      },
      {
        title: "Figure and Figcaption {{index}}",
        instructions: "Create a figure element with an image and caption text {{var}}.",
        starterCode: "<!-- Figure with caption -->\n",
        validationRegex: "<figure>.*<figcaption>",
        hint: "<figure><img src=\"photo.jpg\"><figcaption>{{var}}</figcaption></figure>",
        blueprint: "<figure>\n  <img src=\"photo.jpg\">\n  <figcaption>{{var}}</figcaption>\n</figure>"
      },
      {
        title: "Fieldset and Legend {{index}}",
        instructions: "Create a form fieldset with legend text {{var}}.",
        starterCode: "<!-- Fieldset group -->\n",
        validationRegex: "<fieldset>.*<legend>",
        hint: "<fieldset><legend>{{var}}</legend><input type=\"text\"></fieldset>",
        blueprint: "<fieldset>\n  <legend>{{var}}</legend>\n  <input type=\"text\">\n</fieldset>"
      },
      {
        title: "Label element {{index}}",
        instructions: "Create a label element with for attribute pointing to {{var}}.",
        starterCode: "<!-- Form label -->\n",
        validationRegex: "<label.*for=['\"]{{var}}['\"]",
        hint: "<label for=\"{{var}}\">Enter value:</label>",
        blueprint: "<label for=\"{{var}}\">Enter value:</label>"
      },
      {
        title: "Progress bar {{index}}",
        instructions: "Create a progress bar element with value {{val}} and max 100.",
        starterCode: "<!-- Progress indicator -->\n",
        validationRegex: "<progress.*value=['\"]{{val}}['\"]",
        hint: "<progress value=\"{{val}}\" max=\"100\"></progress>",
        blueprint: "<progress value=\"{{val}}\" max=\"100\"></progress>"
      },
      {
        title: "Meter element {{index}}",
        instructions: "Create a meter gauge with value {{val}}, min 0, max 100.",
        starterCode: "<!-- Meter gauge -->\n",
        validationRegex: "<meter.*value=['\"]{{val}}['\"]",
        hint: "<meter value=\"{{val}}\" min=\"0\" max=\"100\"></meter>",
        blueprint: "<meter value=\"{{val}}\" min=\"0\" max=\"100\"></meter>"
      },
      {
        title: "Blockquote element {{index}}",
        instructions: "Create a blockquote element with a cited quote.",
        starterCode: "<!-- Block quote -->\n",
        validationRegex: "<blockquote>",
        hint: "<blockquote cite=\"source\"><p>{{var}} said this.</p></blockquote>",
        blueprint: "<blockquote cite=\"source\">\n  <p>{{var}} said this.</p>\n</blockquote>"
      },
      {
        title: "Code element {{index}}",
        instructions: "Wrap inline code {{var}} inside a code element.",
        starterCode: "<!-- Inline code -->\n",
        validationRegex: "<code>",
        hint: "<code>{{var}}</code>",
        blueprint: "<p>Use <code>{{var}}</code> to start.</p>"
      },
      {
        title: "Pre element {{index}}",
        instructions: "Create a preformatted text block displaying code.",
        starterCode: "<!-- Preformatted block -->\n",
        validationRegex: "<pre>",
        hint: "<pre>const x = {{val}};</pre>",
        blueprint: "<pre>\nconst x = {{val}};\n</pre>"
      },
      {
        title: "Iframe embed {{index}}",
        instructions: "Embed an iframe loading URL /embed/{{var}} with width {{val}}.",
        starterCode: "<!-- Iframe embed -->\n",
        validationRegex: "<iframe.*src=['\"]/embed/{{var}}['\"]",
        hint: "<iframe src=\"/embed/{{var}}\" width=\"{{val}}\"></iframe>",
        blueprint: "<iframe src=\"/embed/{{var}}\" width=\"{{val}}\"></iframe>"
      },
      {
        title: "Meta tag {{index}}",
        instructions: "Add a meta tag with name description and content {{var}}.",
        starterCode: "<!-- Meta tag -->\n",
        validationRegex: "<meta.*name=['\"]description['\"]",
        hint: "<meta name=\"description\" content=\"{{var}}\">",
        blueprint: "<meta name=\"description\" content=\"{{var}}\">"
      },
      {
        title: "Aside element {{index}}",
        instructions: "Create a sidebar aside element with class {{var}}.",
        starterCode: "<!-- Sidebar aside -->\n",
        validationRegex: "<aside.*class=['\"]{{var}}['\"]",
        hint: "<aside class=\"{{var}}\"><p>Sidebar</p></aside>",
        blueprint: "<aside class=\"{{var}}\">\n  <p>Sidebar</p>\n</aside>"
      },
      {
        title: "Main element {{index}}",
        instructions: "Create the main content area using the semantic main element.",
        starterCode: "<!-- Main content -->\n",
        validationRegex: "<main>",
        hint: "<main><h1>Welcome</h1></main>",
        blueprint: "<main>\n  <h1>Welcome</h1>\n</main>"
      },
      {
        title: "Data attribute {{index}}",
        instructions: "Create a div with a custom data-{{var}} attribute set to {{val}}.",
        starterCode: "<!-- Data attributes -->\n",
        validationRegex: "data-{{var}}=['\"]{{val}}['\"]",
        hint: "<div data-{{var}}=\"{{val}}\">Custom data</div>",
        blueprint: "<div data-{{var}}=\"{{val}}\">Custom data</div>"
      },
      {
        title: "Span inline element {{index}}",
        instructions: "Wrap text {{var}} in a span element with class highlight.",
        starterCode: "<!-- Inline span -->\n",
        validationRegex: "<span.*class=['\"]highlight['\"]",
        hint: "<span class=\"highlight\">{{var}}</span>",
        blueprint: "<p>See <span class=\"highlight\">{{var}}</span> here.</p>"
      }
    ];
  }


  // 2. CSS Armor Shop
  if (wid.includes('css') || wid.includes('style')) {
    return [
      {
        title: "Responsive Breakpoint {{index}}",
        instructions: "Establish screen size query matching breakpoint max-width {{val}}px.",
        starterCode: "/* CSS Media query */\n",
        validationRegex: "media\\\\s*\\\\(\\\\s*max-width\\\\s*:\\\\s*{{val}}px\\\\)",
        hint: "@media (max-width: {{val}}px) {}",
        blueprint: "@media (max-width: {{val}}px) {}"
      },
      {
        title: "Alignment Margin {{index}}",
        instructions: "Center align grid container named .{{var}}.",
        starterCode: "/* Grid alignment rules */\n.{{var}} {\n  width: 100%;\n}\n",
        validationRegex: "margin\\\\s*:\\\\s*0\\\\s+auto",
        hint: "margin: 0 auto;",
        blueprint: "margin: 0 auto;"
      },
      {
        title: "Color Property Variable {{index}}",
        instructions: "Define a root color variable named --{{var}} with value #{{val}}.",
        starterCode: ":root {\n  /* Colors metadata */\n}\n",
        validationRegex: "--{{var}}\\\\s*:\\\\s*#{{val}}",
        hint: "--{{var}}: #{{val}};",
        blueprint: "--{{var}}: #{{val}};"
      },
      {
        title: "Opacity transition {{index}}",
        instructions: "Define opacity transition duration of {{val}}ms on element .{{var}}.",
        starterCode: ".{{var}} {\n  transition: opacity 300ms;\n}\n",
        validationRegex: "transition\\\\s*:\\\\s*opacity\\\\s+{{val}}ms",
        hint: "transition: opacity {{val}}ms ease-in-out;",
        blueprint: "transition: opacity {{val}}ms ease-in-out;"
      },
      {
        title: "Flex Column Align {{index}}",
        instructions: "Format display flex direction to column on element .{{var}}.",
        starterCode: ".{{var}} {\n  display: flex;\n}\n",
        validationRegex: "flex-direction\\\\s*:\\\\s*column",
        hint: "flex-direction: column;",
        blueprint: "flex-direction: column;"
      },
      {
        title: "CSS Grid layout {{index}}",
        instructions: "Define a grid layout on .{{var}} with 3 equal columns.",
        starterCode: "/* Grid layout */\n.{{var}} {\n}\n",
        validationRegex: "display\\\\s*:\\\\s*grid",
        hint: ".{{var}} { display: grid; grid-template-columns: 1fr 1fr 1fr; }",
        blueprint: ".{{var}} {\n  display: grid;\n  grid-template-columns: 1fr 1fr 1fr;\n}"
      },
      {
        title: "Grid gap spacing {{index}}",
        instructions: "Set grid gap to {{val}}px on container .{{var}}.",
        starterCode: "/* Grid gap spacing */\n.{{var}} {\n  display: grid;\n}\n",
        validationRegex: "gap\\\\s*:\\\\s*{{val}}px",
        hint: "gap: {{val}}px;",
        blueprint: "gap: {{val}}px;"
      },
      {
        title: "Box shadow {{index}}",
        instructions: "Add a box shadow to element .{{var}} with offset {{val}}px.",
        starterCode: "/* Box shadow styling */\n.{{var}} {\n}\n",
        validationRegex: "box-shadow",
        hint: "box-shadow: 0 {{val}}px {{val}}px rgba(0,0,0,0.2);",
        blueprint: "box-shadow: 0 {{val}}px {{val}}px rgba(0,0,0,0.2);"
      },
      {
        title: "Border radius {{index}}",
        instructions: "Round corners of element .{{var}} by {{val}}px.",
        starterCode: "/* Border radius */\n.{{var}} {\n}\n",
        validationRegex: "border-radius\\\\s*:\\\\s*{{val}}px",
        hint: "border-radius: {{val}}px;",
        blueprint: "border-radius: {{val}}px;"
      },
      {
        title: "CSS Animation keyframes {{index}}",
        instructions: "Define a keyframe animation named slide_{{var}} that moves element left to right.",
        starterCode: "/* CSS animation */\n",
        validationRegex: "@keyframes\\\\s+slide_{{var}}",
        hint: "@keyframes slide_{{var}} { from { transform: translateX(0); } to { transform: translateX(100px); } }",
        blueprint: "@keyframes slide_{{var}} {\n  from { transform: translateX(0); }\n  to { transform: translateX(100px); }\n}"
      },
      {
        title: "Pseudo element before {{index}}",
        instructions: "Add a ::before pseudo-element to .{{var}} with content.",
        starterCode: "/* Pseudo elements */\n.{{var}} {\n  position: relative;\n}\n",
        validationRegex: "\\.{{var}}::before",
        hint: ".{{var}}::before { content: ''; position: absolute; }",
        blueprint: ".{{var}}::before {\n  content: '';\n  position: absolute;\n}"
      },
      {
        title: "Z-index stacking {{index}}",
        instructions: "Set z-index of .{{var}} to {{val}} with position relative.",
        starterCode: "/* Z-index stacking */\n.{{var}} {\n}\n",
        validationRegex: "z-index\\\\s*:\\\\s*{{val}}",
        hint: "z-index: {{val}};",
        blueprint: "position: relative;\nz-index: {{val}};"
      },
      {
        title: "Overflow hidden {{index}}",
        instructions: "Set overflow to hidden on container .{{var}}.",
        starterCode: "/* Overflow control */\n.{{var}} {\n}\n",
        validationRegex: "overflow\\\\s*:\\\\s*hidden",
        hint: "overflow: hidden;",
        blueprint: "overflow: hidden;"
      },
      {
        title: "Position absolute {{index}}",
        instructions: "Position element .{{var}} absolutely at top {{val}}px.",
        starterCode: "/* Position absolute */\n.{{var}} {\n}\n",
        validationRegex: "position\\\\s*:\\\\s*absolute",
        hint: "position: absolute; top: {{val}}px;",
        blueprint: "position: absolute;\ntop: {{val}}px;"
      },
      {
        title: "Text alignment {{index}}",
        instructions: "Center-align text inside element .{{var}}.",
        starterCode: "/* Text alignment */\n.{{var}} {\n}\n",
        validationRegex: "text-align\\\\s*:\\\\s*center",
        hint: "text-align: center;",
        blueprint: "text-align: center;"
      },
      {
        title: "Font size responsive {{index}}",
        instructions: "Set font-size using clamp with min 14px, preferred {{val}}vw, max 32px.",
        starterCode: "/* Responsive font */\n.{{var}} {\n}\n",
        validationRegex: "font-size\\\\s*:\\\\s*clamp",
        hint: "font-size: clamp(14px, {{val}}vw, 32px);",
        blueprint: "font-size: clamp(14px, {{val}}vw, 32px);"
      },
      {
        title: "Background gradient {{index}}",
        instructions: "Apply a linear gradient background from #D2E823 to #22D3EE on .{{var}}.",
        starterCode: "/* Gradient background */\n.{{var}} {\n}\n",
        validationRegex: "linear-gradient",
        hint: "background: linear-gradient(135deg, #D2E823, #22D3EE);",
        blueprint: "background: linear-gradient(135deg, #D2E823, #22D3EE);"
      },
      {
        title: "CSS Transform rotate {{index}}",
        instructions: "Rotate element .{{var}} by {{val}} degrees.",
        starterCode: "/* Transform rotate */\n.{{var}} {\n}\n",
        validationRegex: "transform\\\\s*:\\\\s*rotate",
        hint: "transform: rotate({{val}}deg);",
        blueprint: "transform: rotate({{val}}deg);"
      },
      {
        title: "CSS Filter blur {{index}}",
        instructions: "Apply a blur filter of {{val}}px to element .{{var}}.",
        starterCode: "/* Filter effects */\n.{{var}} {\n}\n",
        validationRegex: "filter\\\\s*:\\\\s*blur",
        hint: "filter: blur({{val}}px);",
        blueprint: "filter: blur({{val}}px);"
      },
      {
        title: "Hover state change {{index}}",
        instructions: "Change background color of .{{var}} to #D2E823 on hover.",
        starterCode: "/* Hover interaction */\n",
        validationRegex: "\\.{{var}}:hover",
        hint: ".{{var}}:hover { background-color: #D2E823; }",
        blueprint: ".{{var}}:hover {\n  background-color: #D2E823;\n}"
      },
      {
        title: "Aspect ratio {{index}}",
        instructions: "Set aspect ratio of .{{var}} to 16/9.",
        starterCode: "/* Aspect ratio */\n.{{var}} {\n}\n",
        validationRegex: "aspect-ratio\\\\s*:\\\\s*16\\\\s*/\\\\s*9",
        hint: "aspect-ratio: 16 / 9;",
        blueprint: "aspect-ratio: 16 / 9;"
      },
      {
        title: "CSS calc width {{index}}",
        instructions: "Set width of .{{var}} using calc(100% - {{val}}px).",
        starterCode: "/* Calc width */\n.{{var}} {\n}\n",
        validationRegex: "width\\\\s*:\\\\s*calc",
        hint: "width: calc(100% - {{val}}px);",
        blueprint: "width: calc(100% - {{val}}px);"
      },
      {
        title: "Position sticky {{index}}",
        instructions: "Make element .{{var}} sticky at top {{val}}px.",
        starterCode: "/* Sticky positioning */\n.{{var}} {\n}\n",
        validationRegex: "position\\\\s*:\\\\s*sticky",
        hint: "position: sticky; top: {{val}}px;",
        blueprint: "position: sticky;\ntop: {{val}}px;"
      },
      {
        title: "Flexbox justify center {{index}}",
        instructions: "Center content horizontally and vertically in .{{var}} using flexbox.",
        starterCode: "/* Flexbox centering */\n.{{var}} {\n  display: flex;\n}\n",
        validationRegex: "justify-content\\\\s*:\\\\s*center",
        hint: "justify-content: center; align-items: center;",
        blueprint: "justify-content: center;\nalign-items: center;"
      }
    ];
  }


  // 3. React Kingdom
  if (wid.includes('react')) {
    return [
      {
        title: "Component State {{index}}",
        instructions: "Declare component state variable tracker named {{var}} hook.",
        starterCode: "// Component state variables\n",
        validationRegex: "useState",
        hint: "const [{{var}}, set{{var}}] = useState({{val}});",
        blueprint: "const [{{var}}, set{{var}}] = useState({{val}});"
      },
      {
        title: "Effect Hook Trigger {{index}}",
        instructions: "Initiate component hook useEffect mapping to function {{fun}}.",
        starterCode: "// Effect core hooks\n",
        validationRegex: "useEffect",
        hint: "useEffect(() => { {{fun}}(); }, []);",
        blueprint: "useEffect(() => {\n  {{fun}}();\n}, []);"
      },
      {
        title: "Destructured parameters {{index}}",
        instructions: "Destructure parameter value {{var}} from component props.",
        starterCode: "// React properties destructuring\nfunction Badge(props) {\n",
        validationRegex: "const\\\\s+\\\\{\\\\s*{{var}}\\\\s*\\\\}\\\\s*=\\\\s*props",
        hint: "const { {{var}} } = props;",
        blueprint: "const { {{var}} } = props;"
      },
      {
        title: "JSX Iteration Mapping {{index}}",
        instructions: "Map items array returning children keys mapping to index {{var}}.",
        starterCode: "// JSX elements mapping\n",
        validationRegex: "\\\\.map\\\\(",
        hint: "items.map(item => <div key={item.{{var}}}>{item.name}</div>);",
        blueprint: "items.map(item => <div key={item.{{var}}}>{item.name}</div>);"
      },
      {
        title: "Reference Hook initialization {{index}}",
        instructions: "Initialize React useRef referencing value {{var}}.",
        starterCode: "// React references core\n",
        validationRegex: "useRef",
        hint: "const {{var}} = useRef({{val}});",
        blueprint: "const {{var}} = useRef({{val}});"
      },
      {
        title: "useMemo optimization {{index}}",
        instructions: "Memoize an expensive computation result into {{var}} using useMemo.",
        starterCode: "// Performance optimization\n",
        validationRegex: "useMemo",
        hint: "const {{var}} = useMemo(() => computeExpensive(data), [data]);",
        blueprint: "const {{var}} = useMemo(() => computeExpensive(data), [data]);"
      },
      {
        title: "useCallback handler {{index}}",
        instructions: "Wrap callback function {{fun}} with useCallback hook.",
        starterCode: "// Callback memoization\n",
        validationRegex: "useCallback",
        hint: "const {{fun}} = useCallback(() => { /* handler */ }, []);",
        blueprint: "const {{fun}} = useCallback(() => {\n  /* handler */\n}, []);"
      },
      {
        title: "useContext consumer {{index}}",
        instructions: "Consume context value {{var}} using useContext hook.",
        starterCode: "// Context consumption\n",
        validationRegex: "useContext",
        hint: "const {{var}} = useContext(AppContext);",
        blueprint: "const {{var}} = useContext(AppContext);"
      },
      {
        title: "Conditional rendering {{index}}",
        instructions: "Conditionally render component based on {{var}} being truthy.",
        starterCode: "// Conditional rendering\n",
        validationRegex: "&&|\\?",
        hint: "{{{var}} && <div>Visible</div>}",
        blueprint: "{{{var}} && <div>Visible</div>}"
      },
      {
        title: "Event handler onClick {{index}}",
        instructions: "Attach an onClick event handler calling function {{fun}}.",
        starterCode: "// Event handling\n",
        validationRegex: "onClick",
        hint: "<button onClick={{{fun}}}>Click</button>",
        blueprint: "<button onClick={{{fun}}}>Click</button>"
      },
      {
        title: "Controlled input {{index}}",
        instructions: "Create a controlled input bound to state {{var}} with onChange handler.",
        starterCode: "// Controlled form input\n",
        validationRegex: "value=\\{|onChange=\\{",
        hint: "<input value={{{var}}} onChange={e => set{{var}}(e.target.value)} />",
        blueprint: "<input value={{{var}}} onChange={e => set{{var}}(e.target.value)} />"
      },
      {
        title: "Custom hook {{index}}",
        instructions: "Create a custom hook named use{{var}} that returns a state value.",
        starterCode: "// Custom hooks\n",
        validationRegex: "function\\s+use",
        hint: "function use{{var}}() { const [val, setVal] = useState({{val}}); return val; }",
        blueprint: "function use{{var}}() {\n  const [val, setVal] = useState({{val}});\n  return val;\n}"
      },
      {
        title: "useReducer hook {{index}}",
        instructions: "Initialize state management using useReducer with dispatch for {{var}}.",
        starterCode: "// Reducer state management\n",
        validationRegex: "useReducer",
        hint: "const [{{var}}, dispatch] = useReducer(reducer, initialState);",
        blueprint: "const [{{var}}, dispatch] = useReducer(reducer, initialState);"
      },
      {
        title: "React Fragment {{index}}",
        instructions: "Return multiple elements without a wrapper using React Fragment.",
        starterCode: "// Fragment grouping\n",
        validationRegex: "<>|Fragment",
        hint: "return (<><h1>Title</h1><p>Content</p></>);",
        blueprint: "return (\n  <>\n    <h1>Title</h1>\n    <p>Content</p>\n  </>\n);"
      },
      {
        title: "React.memo wrapper {{index}}",
        instructions: "Wrap component {{var}} with React.memo for performance.",
        starterCode: "// Memoized component\n",
        validationRegex: "React\\.memo|memo\\(",
        hint: "const {{var}} = React.memo(function {{var}}(props) { return <div>{props.name}</div>; });",
        blueprint: "const {{var}} = React.memo(function {{var}}(props) {\n  return <div>{props.name}</div>;\n});"
      },
      {
        title: "React lazy import {{index}}",
        instructions: "Lazy load component {{var}} using React.lazy and dynamic import.",
        starterCode: "// Code splitting\n",
        validationRegex: "React\\.lazy|lazy\\(",
        hint: "const {{var}} = React.lazy(() => import('./{{var}}'));",
        blueprint: "const {{var}} = React.lazy(() => import('./{{var}}'));"
      },
      {
        title: "Spread props {{index}}",
        instructions: "Pass all props to a child component using spread syntax.",
        starterCode: "// Props spreading\n",
        validationRegex: "\\.\\.\\.",
        hint: "return <ChildComponent {...props} extra={{{val}}} />;",
        blueprint: "return <ChildComponent {...props} extra={{{val}}} />;"
      },
      {
        title: "Children prop {{index}}",
        instructions: "Create a wrapper component {{var}} that renders its children prop.",
        starterCode: "// Children composition\n",
        validationRegex: "children",
        hint: "function {{var}}({ children }) { return <div className=\"wrapper\">{children}</div>; }",
        blueprint: "function {{var}}({ children }) {\n  return <div className=\"wrapper\">{children}</div>;\n}"
      },
      {
        title: "Key prop in list {{index}}",
        instructions: "Render a list of items with unique key prop from {{var}} field.",
        starterCode: "// List rendering with keys\n",
        validationRegex: "key=\\{",
        hint: "items.map(item => <li key={item.{{var}}}>{item.name}</li>);",
        blueprint: "items.map(item => <li key={item.{{var}}}>{item.name}</li>);"
      }
    ];
  }


  // 4. Python Node
  if (wid.includes('python')) {
    return [
      {
        title: "Variable Bind {{index}}",
        instructions: "Declare variable {{var}} assigning value {{val}}.",
        starterCode: "# Define Python variables\n",
        validationRegex: "{{var}}\\\\s*=\\\\s*{{val}}",
        hint: "{{var}} = {{val}}",
        blueprint: "{{var}} = {{val}}"
      },
      {
        title: "Function Declaration {{index}}",
        instructions: "Construct Python function {{fun}} returning parameter value {{val}}.",
        starterCode: "# Python functional components\n",
        validationRegex: "def\\\\s+{{fun}}",
        hint: "def {{fun}}(): return {{val}}",
        blueprint: "def {{fun}}():\n    return {{val}}"
      },
      {
        title: "List Comprehension {{index}}",
        instructions: "Map Python values from items matching elements greater than {{val}} into variable {{var}}.",
        starterCode: "# Python collections pipeline\nitems = [10, 50, 100, 200]\n",
        validationRegex: "{{var}}\\\\s*=\\\\s*\\\\[.*\\\\s+for\\\\s+.*\\\\s+in\\\\s+items",
        hint: "{{var}} = [x for x in items if x > {{val}}]",
        blueprint: "{{var}} = [x for x in items if x > {{val}}]"
      },
      {
        title: "Dictionary Mapping {{index}}",
        instructions: "Create metadata mapping dict named {{var}} mapping key 'id' to {{val}}.",
        starterCode: "# Dict mappings block\n",
        validationRegex: "{{var}}\\\\s*=\\\\s*\\\\{\\\\s*['\"]id['\"]\\\\s*:\\\\s*{{val}}\\\\s*\\\\}",
        hint: "{{var}} = {'id': {{val}}}",
        blueprint: "{{var}} = {'id': {{val}}}"
      },
      {
        title: "Python Try-Except Handler {{index}}",
        instructions: "Apply safe except wrapper block routing error faults to function {{fun}}.",
        starterCode: "# Exceptions wrapper\n",
        validationRegex: "try\\\\s*:|except\\\\s+Exception",
        hint: "try:\n    {{fun}}()\nexcept Exception:\n    pass",
        blueprint: "try:\n    {{fun}}()\nexcept Exception:\n    pass"
      },
      {
        title: "For Loop iteration {{index}}",
        instructions: "Iterate over a range of {{val}} items printing each value.",
        starterCode: "# For loop iteration\n",
        validationRegex: "for\\\\s+.*\\\\s+in\\\\s+range",
        hint: "for i in range({{val}}):\n    print(i)",
        blueprint: "for i in range({{val}}):\n    print(i)"
      },
      {
        title: "While Loop {{index}}",
        instructions: "Create a while loop that runs while {{var}} is less than {{val}}.",
        starterCode: "# While loop\n{{var}} = 0\n",
        validationRegex: "while\\\\s+{{var}}",
        hint: "while {{var}} < {{val}}:\n    {{var}} += 1",
        blueprint: "while {{var}} < {{val}}:\n    {{var}} += 1"
      },
      {
        title: "Class Definition {{index}}",
        instructions: "Define a Python class named {{var}} with __init__ method.",
        starterCode: "# Class definition\n",
        validationRegex: "class\\\\s+{{var}}",
        hint: "class {{var}}:\n    def __init__(self):\n        self.id = {{val}}",
        blueprint: "class {{var}}:\n    def __init__(self):\n        self.id = {{val}}"
      },
      {
        title: "Class Inheritance {{index}}",
        instructions: "Create a class {{var}} that inherits from BaseModel.",
        starterCode: "# Inheritance\n",
        validationRegex: "class\\\\s+{{var}}\\\\s*\\\\(\\\\s*BaseModel",
        hint: "class {{var}}(BaseModel):\n    pass",
        blueprint: "class {{var}}(BaseModel):\n    pass"
      },
      {
        title: "Lambda Function {{index}}",
        instructions: "Create a lambda function stored in {{var}} that doubles a number.",
        starterCode: "# Lambda expression\n",
        validationRegex: "{{var}}\\\\s*=\\\\s*lambda",
        hint: "{{var}} = lambda x: x * 2",
        blueprint: "{{var}} = lambda x: x * 2"
      },
      {
        title: "Decorator Usage {{index}}",
        instructions: "Apply a decorator @staticmethod to function {{fun}}.",
        starterCode: "# Python decorator\n",
        validationRegex: "@staticmethod",
        hint: "@staticmethod\ndef {{fun}}():\n    return {{val}}",
        blueprint: "@staticmethod\ndef {{fun}}():\n    return {{val}}"
      },
      {
        title: "Generator with Yield {{index}}",
        instructions: "Create a generator function {{fun}} that yields values up to {{val}}.",
        starterCode: "# Generator function\n",
        validationRegex: "yield",
        hint: "def {{fun}}():\n    for i in range({{val}}):\n        yield i",
        blueprint: "def {{fun}}():\n    for i in range({{val}}):\n        yield i"
      },
      {
        title: "With Statement {{index}}",
        instructions: "Open file {{var}}.txt using with statement for reading.",
        starterCode: "# Context manager\n",
        validationRegex: "with\\\\s+open",
        hint: "with open('{{var}}.txt', 'r') as f:\n    data = f.read()",
        blueprint: "with open('{{var}}.txt', 'r') as f:\n    data = f.read()"
      },
      {
        title: "F-String formatting {{index}}",
        instructions: "Create an f-string that includes variable {{var}} and value {{val}}.",
        starterCode: "# String formatting\n",
        validationRegex: "f['\"]",
        hint: "message = f\"Value of {{var}} is {{{var}}}\"",
        blueprint: "message = f\"Value of {{var}} is {{{var}}}\""
      },
      {
        title: "Tuple Unpacking {{index}}",
        instructions: "Unpack tuple into variables {{var}} and second.",
        starterCode: "# Tuple unpacking\ndata = ({{val}}, 'hello')\n",
        validationRegex: "{{var}}\\\\s*,\\\\s*\\\\w+\\\\s*=",
        hint: "{{var}}, second = data",
        blueprint: "{{var}}, second = data"
      },
      {
        title: "Set Operations {{index}}",
        instructions: "Create a set named {{var}} and add value {{val}} to it.",
        starterCode: "# Set data structure\n",
        validationRegex: "{{var}}\\\\s*=\\\\s*set|{{var}}\\\\.add",
        hint: "{{var}} = set()\n{{var}}.add({{val}})",
        blueprint: "{{var}} = set()\n{{var}}.add({{val}})"
      },
      {
        title: "Import Module {{index}}",
        instructions: "Import the json module and use json.dumps on {{var}}.",
        starterCode: "# Module import\n",
        validationRegex: "import\\\\s+json",
        hint: "import json\nresult = json.dumps({{var}})",
        blueprint: "import json\nresult = json.dumps({{var}})"
      },
      {
        title: "Type Hints {{index}}",
        instructions: "Define function {{fun}} with type hint parameter x: int returning int.",
        starterCode: "# Type annotations\n",
        validationRegex: "def\\\\s+{{fun}}.*->\\\\s*int",
        hint: "def {{fun}}(x: int) -> int:\n    return x * {{val}}",
        blueprint: "def {{fun}}(x: int) -> int:\n    return x * {{val}}"
      },
      {
        title: "Enumerate Loop {{index}}",
        instructions: "Loop over items using enumerate, storing index in {{var}}.",
        starterCode: "# Enumerate iteration\nitems = ['a', 'b', 'c']\n",
        validationRegex: "enumerate",
        hint: "for {{var}}, item in enumerate(items):\n    print({{var}}, item)",
        blueprint: "for {{var}}, item in enumerate(items):\n    print({{var}}, item)"
      }
    ];
  }


  // 5. TypeScript Temple
  if (wid.includes('typescript')) {
    return [
      {
        title: "Typed Const declaration {{index}}",
        instructions: "Declare typed constant {{var}} assigning numeric value {{val}}.",
        starterCode: "// TypeScript type checking\n",
        validationRegex: "const\\\\s+{{var}}\\\\s*:\\\\s*number\\\\s*=\\\\s*{{val}}",
        hint: "const {{var}}: number = {{val}};",
        blueprint: "const {{var}}: number = {{val}};"
      },
      {
        title: "Interface Contract {{index}}",
        instructions: "Establish types interface model named {{var}} holding numerical id parameter.",
        starterCode: "// TS Interfaces mapping\n",
        validationRegex: "interface\\\\s+{{var}}\\\\s*\\\\{\\\\s*id\\\\s*:\\\\s*number",
        hint: "interface {{var}} { id: number; }",
        blueprint: "interface {{var}} {\n  id: number;\n}"
      },
      {
        title: "Union Type verification {{index}}",
        instructions: "Define variables instance {{var}} holding union type string or null.",
        starterCode: "// Union type annotations\n",
        validationRegex: "let\\\\s+{{var}}\\\\s*:\\\\s*string\\\\s*\\\\|\\\\s*null",
        hint: "let {{var}}: string | null = null;",
        blueprint: "let {{var}}: string | null = null;"
      },
      {
        title: "Typed Method signature {{index}}",
        instructions: "Create TS functional method {{fun}} returning typed number value {{val}}.",
        starterCode: "// Method signatures type checking\n",
        validationRegex: "function\\\\s+{{fun}}\\\\s*\\\\(\\\\s*\\\\)\\\\s*:\\\\s*number",
        hint: "function {{fun}}(): number { return {{val}}; }",
        blueprint: "function {{fun}}(): number {\n  return {{val}};\n}"
      },
      {
        title: "Generic Parameter mapper {{index}}",
        instructions: "Construct generic method mapper {{fun}} mapping type vector variable T.",
        starterCode: "// TS Generics bindings\n",
        validationRegex: "function\\\\s+{{fun}}\\\\s*<\\\\s*T\\\\s*>",
        hint: "function {{fun}}<T>(arg: T): T { return arg; }",
        blueprint: "function {{fun}}<T>(arg: T): T {\n  return arg;\n}"
      },
      {
        title: "Enum declaration {{index}}",
        instructions: "Define an enum named {{var}} with at least two members.",
        starterCode: "// TypeScript Enum\n",
        validationRegex: "enum\\\\s+{{var}}",
        hint: "enum {{var}} { Active, Inactive }",
        blueprint: "enum {{var}} {\n  Active,\n  Inactive\n}"
      },
      {
        title: "Type Alias {{index}}",
        instructions: "Create a type alias {{var}} for an object with name string and id number.",
        starterCode: "// Type alias\n",
        validationRegex: "type\\\\s+{{var}}",
        hint: "type {{var}} = { name: string; id: number; };",
        blueprint: "type {{var}} = {\n  name: string;\n  id: number;\n};"
      },
      {
        title: "Intersection Type {{index}}",
        instructions: "Create type {{var}} as intersection of HasName and HasId.",
        starterCode: "// Intersection types\n",
        validationRegex: "type\\\\s+{{var}}\\\\s*=.*&",
        hint: "type {{var}} = HasName & HasId;",
        blueprint: "type {{var}} = HasName & HasId;"
      },
      {
        title: "Readonly property {{index}}",
        instructions: "Declare an interface with readonly property {{var}} of type string.",
        starterCode: "// Readonly modifier\n",
        validationRegex: "readonly\\\\s+{{var}}",
        hint: "interface Config { readonly {{var}}: string; }",
        blueprint: "interface Config {\n  readonly {{var}}: string;\n}"
      },
      {
        title: "Record type {{index}}",
        instructions: "Create a Record type mapping string keys to number values named {{var}}.",
        starterCode: "// Record utility type\n",
        validationRegex: "Record<string",
        hint: "const {{var}}: Record<string, number> = {};",
        blueprint: "const {{var}}: Record<string, number> = {};"
      },
      {
        title: "Partial type {{index}}",
        instructions: "Use Partial to make all properties of {{var}} optional.",
        starterCode: "// Partial utility type\n",
        validationRegex: "Partial<{{var}}>",
        hint: "function update(data: Partial<{{var}}>) { /* ... */ }",
        blueprint: "function update(data: Partial<{{var}}>) {\n  // merge\n}"
      },
      {
        title: "Tuple type {{index}}",
        instructions: "Declare a tuple variable {{var}} with types [string, number].",
        starterCode: "// Tuple types\n",
        validationRegex: "\\[string,\\\\s*number\\]",
        hint: "const {{var}}: [string, number] = ['hello', {{val}}];",
        blueprint: "const {{var}}: [string, number] = ['hello', {{val}}];"
      },
      {
        title: "Type Guard {{index}}",
        instructions: "Create a type guard function {{fun}} checking if value is string.",
        starterCode: "// Type guard\n",
        validationRegex: "is\\\\s+string",
        hint: "function {{fun}}(value: unknown): value is string { return typeof value === 'string'; }",
        blueprint: "function {{fun}}(value: unknown): value is string {\n  return typeof value === 'string';\n}"
      },
      {
        title: "Optional chaining {{index}}",
        instructions: "Safely access nested property {{var}} using optional chaining.",
        starterCode: "// Optional chaining\n",
        validationRegex: "\\?\\.",
        hint: "const result = data?.{{var}}?.name;",
        blueprint: "const result = data?.{{var}}?.name;"
      },
      {
        title: "Keyof operator {{index}}",
        instructions: "Use keyof to get union of keys from type {{var}}.",
        starterCode: "// Keyof operator\n",
        validationRegex: "keyof\\\\s+{{var}}",
        hint: "type Keys = keyof {{var}};",
        blueprint: "type Keys = keyof {{var}};"
      },
      {
        title: "Class with modifiers {{index}}",
        instructions: "Create a class {{var}} with private property id and public getter.",
        starterCode: "// TS Class\n",
        validationRegex: "class\\\\s+{{var}}",
        hint: "class {{var}} { private id: number = {{val}}; getId() { return this.id; } }",
        blueprint: "class {{var}} {\n  private id: number = {{val}};\n  getId() { return this.id; }\n}"
      },
      {
        title: "Async function typed {{index}}",
        instructions: "Create an async function {{fun}} returning Promise<number>.",
        starterCode: "// Async typed function\n",
        validationRegex: "async\\\\s+function\\\\s+{{fun}}",
        hint: "async function {{fun}}(): Promise<number> { return {{val}}; }",
        blueprint: "async function {{fun}}(): Promise<number> {\n  return {{val}};\n}"
      },
      {
        title: "Mapped type {{index}}",
        instructions: "Create a mapped type that makes all properties of T optional.",
        starterCode: "// Mapped types\n",
        validationRegex: "\\[K\\\\s+in",
        hint: "type Optional<T> = { [K in keyof T]?: T[K] };",
        blueprint: "type Optional<T> = {\n  [K in keyof T]?: T[K];\n};"
      },
      {
        title: "Template literal type {{index}}",
        instructions: "Create a template literal type for event names using {{var}}.",
        starterCode: "// Template literal types\n",
        validationRegex: "type.*=.*`",
        hint: "type EventName = `on${Capitalize<{{var}}>}`;",
        blueprint: "type EventName = `on${Capitalize<{{var}}>}`;"
      }
    ];
  }


  // 6. SQL Vault
  if (wid.includes('sql')) {
    return [
      {
        title: "Secure Query Selection {{index}}",
        instructions: "Filter relational db values from table {{var}} where index equals {{val}}.",
        starterCode: "-- Database Query Engine\n",
        validationRegex: "SELECT\\\\s+.*\\\\s+FROM\\\\s+{{var}}\\\\s+WHERE",
        hint: "SELECT * FROM {{var}} WHERE id = {{val}};",
        blueprint: "SELECT * FROM {{var}} WHERE id = {{val}};"
      },
      {
        title: "SQL Inner Join Query {{index}}",
        instructions: "Merge values from table user and table {{var}} using inner joins.",
        starterCode: "-- SQL Relational Joins\n",
        validationRegex: "INNER\\\\s+JOIN\\\\s+{{var}}",
        hint: "SELECT * FROM user INNER JOIN {{var}} ON user.id = {{var}}.user_id;",
        blueprint: "SELECT * FROM user INNER JOIN {{var}} ON user.id = {{var}}.user_id;"
      },
      {
        title: "Create Relational Table {{index}}",
        instructions: "Construct relational table schema named {{var}} holding numerical id parameter.",
        starterCode: "-- Schema tables creations\n",
        validationRegex: "CREATE\\\\s+TABLE\\\\s+{{var}}",
        hint: "CREATE TABLE {{var}} (id INT);",
        blueprint: "CREATE TABLE {{var}} (id INT);"
      },
      {
        title: "Database Index Creation {{index}}",
        instructions: "Construct query index named index_{{var}} on target parameters.",
        starterCode: "-- Database indexing routines\n",
        validationRegex: "CREATE\\\\s+INDEX\\\\s+index_{{var}}",
        hint: "CREATE INDEX index_{{var}} ON user(id);",
        blueprint: "CREATE INDEX index_{{var}} ON user(id);"
      },
      {
        title: "Update Query statement {{index}}",
        instructions: "Apply updates modifying status column values to 'active' on table {{var}}.",
        starterCode: "-- Data manipulation SQL queries\n",
        validationRegex: "UPDATE\\\\s+{{var}}\\\\s+SET",
        hint: "UPDATE {{var}} SET status = 'active';",
        blueprint: "UPDATE {{var}} SET status = 'active';"
      },
      {
        title: "INSERT INTO statement {{index}}",
        instructions: "Insert a new row into table {{var}} with id value {{val}}.",
        starterCode: "-- Insert data\n",
        validationRegex: "INSERT\\\\s+INTO\\\\s+{{var}}",
        hint: "INSERT INTO {{var}} (id) VALUES ({{val}});",
        blueprint: "INSERT INTO {{var}} (id) VALUES ({{val}});"
      },
      {
        title: "DELETE statement {{index}}",
        instructions: "Delete rows from table {{var}} where id equals {{val}}.",
        starterCode: "-- Delete rows\n",
        validationRegex: "DELETE\\\\s+FROM\\\\s+{{var}}",
        hint: "DELETE FROM {{var}} WHERE id = {{val}};",
        blueprint: "DELETE FROM {{var}} WHERE id = {{val}};"
      },
      {
        title: "GROUP BY aggregation {{index}}",
        instructions: "Select status and count from {{var}} grouped by status.",
        starterCode: "-- Aggregate grouping\n",
        validationRegex: "GROUP\\\\s+BY",
        hint: "SELECT status, COUNT(*) FROM {{var}} GROUP BY status;",
        blueprint: "SELECT status, COUNT(*) FROM {{var}} GROUP BY status;"
      },
      {
        title: "ORDER BY sorting {{index}}",
        instructions: "Select all from {{var}} ordered by id descending.",
        starterCode: "-- Sorting results\n",
        validationRegex: "ORDER\\\\s+BY",
        hint: "SELECT * FROM {{var}} ORDER BY id DESC;",
        blueprint: "SELECT * FROM {{var}} ORDER BY id DESC;"
      },
      {
        title: "HAVING clause {{index}}",
        instructions: "Filter grouped results having count greater than {{val}}.",
        starterCode: "-- Having filter\n",
        validationRegex: "HAVING",
        hint: "SELECT status, COUNT(*) FROM {{var}} GROUP BY status HAVING COUNT(*) > {{val}};",
        blueprint: "SELECT status, COUNT(*) FROM {{var}} GROUP BY status HAVING COUNT(*) > {{val}};"
      },
      {
        title: "LEFT JOIN query {{index}}",
        instructions: "Left join table {{var}} with orders on matching user_id.",
        starterCode: "-- Left join\n",
        validationRegex: "LEFT\\\\s+JOIN",
        hint: "SELECT * FROM user LEFT JOIN {{var}} ON user.id = {{var}}.user_id;",
        blueprint: "SELECT * FROM user LEFT JOIN {{var}} ON user.id = {{var}}.user_id;"
      },
      {
        title: "ALTER TABLE statement {{index}}",
        instructions: "Add a new column email VARCHAR(255) to table {{var}}.",
        starterCode: "-- Alter table structure\n",
        validationRegex: "ALTER\\\\s+TABLE\\\\s+{{var}}",
        hint: "ALTER TABLE {{var}} ADD email VARCHAR(255);",
        blueprint: "ALTER TABLE {{var}} ADD email VARCHAR(255);"
      },
      {
        title: "DISTINCT selection {{index}}",
        instructions: "Select distinct status values from table {{var}}.",
        starterCode: "-- Distinct values\n",
        validationRegex: "SELECT\\\\s+DISTINCT",
        hint: "SELECT DISTINCT status FROM {{var}};",
        blueprint: "SELECT DISTINCT status FROM {{var}};"
      },
      {
        title: "Aggregate COUNT {{index}}",
        instructions: "Count total rows in table {{var}}.",
        starterCode: "-- Count aggregate\n",
        validationRegex: "COUNT\\\\(",
        hint: "SELECT COUNT(*) FROM {{var}};",
        blueprint: "SELECT COUNT(*) FROM {{var}};"
      },
      {
        title: "LIKE pattern matching {{index}}",
        instructions: "Select from {{var}} where name starts with letter matching pattern.",
        starterCode: "-- Pattern matching\n",
        validationRegex: "LIKE",
        hint: "SELECT * FROM {{var}} WHERE name LIKE 'A%';",
        blueprint: "SELECT * FROM {{var}} WHERE name LIKE 'A%';"
      },
      {
        title: "BETWEEN range {{index}}",
        instructions: "Select from {{var}} where id is between 1 and {{val}}.",
        starterCode: "-- Range filter\n",
        validationRegex: "BETWEEN",
        hint: "SELECT * FROM {{var}} WHERE id BETWEEN 1 AND {{val}};",
        blueprint: "SELECT * FROM {{var}} WHERE id BETWEEN 1 AND {{val}};"
      },
      {
        title: "LIMIT OFFSET pagination {{index}}",
        instructions: "Select from {{var}} with limit {{val}} offset 0.",
        starterCode: "-- Pagination\n",
        validationRegex: "LIMIT\\\\s+{{val}}",
        hint: "SELECT * FROM {{var}} LIMIT {{val}} OFFSET 0;",
        blueprint: "SELECT * FROM {{var}} LIMIT {{val}} OFFSET 0;"
      },
      {
        title: "Subquery {{index}}",
        instructions: "Select from {{var}} where id is in a subquery result.",
        starterCode: "-- Subquery\n",
        validationRegex: "IN\\\\s*\\\\(\\\\s*SELECT",
        hint: "SELECT * FROM {{var}} WHERE id IN (SELECT user_id FROM orders);",
        blueprint: "SELECT * FROM {{var}} WHERE id IN (SELECT user_id FROM orders);"
      },
      {
        title: "CASE WHEN expression {{index}}",
        instructions: "Use CASE WHEN to classify status in table {{var}}.",
        starterCode: "-- Conditional expression\n",
        validationRegex: "CASE\\\\s+WHEN",
        hint: "SELECT id, CASE WHEN status = 1 THEN 'Active' ELSE 'Inactive' END FROM {{var}};",
        blueprint: "SELECT id, CASE WHEN status = 1 THEN 'Active' ELSE 'Inactive' END FROM {{var}};"
      }
    ];
  }


  // 7. Rust Grid
  if (wid.includes('rust')) {
    return [
      {
        title: "Let binding {{index}}",
        instructions: "Declare immutable variable {{var}} assigning value {{val}}.",
        starterCode: "// Rust variables allocations\n",
        validationRegex: "let\\\\s+{{var}}\\\\s*=\\\\s*{{val}}",
        hint: "let {{var}} = {{val}};",
        blueprint: "let {{var}} = {{val}};"
      },
      {
        title: "Let Mut binding {{index}}",
        instructions: "Declare mutable variable {{var}} assigning value {{val}}.",
        starterCode: "// Mutability variables mapping\n",
        validationRegex: "let\\\\s+mut\\\\s+{{var}}\\\\s*=\\\\s*{{val}}",
        hint: "let mut {{var}} = {{val}};",
        blueprint: "let mut {{var}} = {{val}};"
      },
      {
        title: "Rust Pattern match {{index}}",
        instructions: "Apply pattern matching matches on state parameter {{var}}.",
        starterCode: "// Pattern matching scopes\n",
        validationRegex: "match\\\\s+{{var}}",
        hint: "match {{var}} { 0 => println!(), _ => () }",
        blueprint: "match {{var}} {\n  0 => println!(\"zero\"),\n  _ => ()\n}"
      },
      {
        title: "Struct definitions {{index}}",
        instructions: "Create custom schema struct named {{var}} holding numerical id parameter.",
        starterCode: "// Struct models creation\n",
        validationRegex: "struct\\\\s+{{var}}",
        hint: "struct {{var}} { id: i32 }",
        blueprint: "struct {{var}} {\n  id: i32\n}"
      },
      {
        title: "Borrow references pointer {{index}}",
        instructions: "Reference data resource wrapper dynamically utilizing variable {{var}}.",
        starterCode: "// Resource pointer referencing\nconst data: i32 = 100;\n",
        validationRegex: "let\\\\s+{{var}}\\\\s*=\\\\s*&data",
        hint: "let {{var}} = &data;",
        blueprint: "let {{var}} = &data;"
      }
    ];
  }

  // 8. Go Sanctum
  if (wid.includes('go')) {
    return [
      {
        title: "Short Variable Assignment {{index}}",
        instructions: "Bind local variable {{var}} assigning value {{val}} utilizing short assignments.",
        starterCode: "// Go memory bounds allocation\n",
        validationRegex: "{{var}}\\\\s*:=\\\\s*{{val}}",
        hint: "{{var}} := {{val}}",
        blueprint: "{{var}} := {{val}}"
      },
      {
        title: "Method Signature declaration {{index}}",
        instructions: "Create functional Go routine {{fun}} returning int parameters value {{val}}.",
        starterCode: "// Go structural routines mapping\n",
        validationRegex: "func\\\\s+{{fun}}.*int",
        hint: "func {{fun}}() int { return {{val}} }",
        blueprint: "func {{fun}}() int {\n    return {{val}}\n}"
      },
      {
        title: "Struct definitions {{index}}",
        instructions: "Construct class models struct named {{var}} holding numerical id parameter.",
        starterCode: "// Struct definitions core\n",
        validationRegex: "type\\\\s+{{var}}\\\\s+struct",
        hint: "type {{var}} struct { id int }",
        blueprint: "type {{var}} struct {\n    id int\n}"
      },
      {
        title: "Channel initialization {{index}}",
        instructions: "Initialize buffered channel named {{var}} holding capacity size {{val}}.",
        starterCode: "// Concurrency routines pipelines\n",
        validationRegex: "{{var}}\\\\s*:=\\\\s*make\\\\(\\\\s*chan",
        hint: "{{var}} := make(chan int, {{val}})",
        blueprint: "{{var}} := make(chan int, {{val}})"
      },
      {
        title: "Defer routine trigger {{index}}",
        instructions: "Schedule Go routine deferral callback executing function {{fun}}.",
        starterCode: "// Defer triggers mapping\n",
        validationRegex: "defer\\\\s+{{fun}}",
        hint: "defer {{fun}}()",
        blueprint: "defer {{fun}}()"
      }
    ];
  }

  // 9. C++ Shield
  if (wid.includes('cpp') || wid.includes('c++')) {
    return [
      {
        title: "Int declaration {{index}}",
        instructions: "Declare integer constant {{var}} assigning value {{val}}.",
        starterCode: "// C++ variables allocation\n",
        validationRegex: "int\\\\s+{{var}}\\\\s*=\\\\s*{{val}}",
        hint: "int {{var}} = {{val}};",
        blueprint: "int {{var}} = {{val}};"
      },
      {
        title: "Pointer reference heap {{index}}",
        instructions: "Allocate dynamic pointer variable {{var}} assigning heap reference size {{val}}.",
        starterCode: "// Pointer stack references allocation\n",
        validationRegex: "int\\\\*\\\\s*{{var}}\\\\s*=\\\\s*new\\\\s+int",
        hint: "int* {{var}} = new int({{val}});",
        blueprint: "int* {{var}} = new int({{val}});"
      },
      {
        title: "Vector initialization {{index}}",
        instructions: "Initialize collections vector named {{var}} mapping int elements.",
        starterCode: "// Vector collections stack allocation\n",
        validationRegex: "std::vector<int>\\\\s+{{var}}",
        hint: "std::vector<int> {{var}};",
        blueprint: "std::vector<int> {{var}};"
      },
      {
        title: "Smart pointer unique_ptr {{index}}",
        instructions: "Instantiate heap smart pointer unique_ptr {{var}} holding numerical reference {{val}}.",
        starterCode: "// Smart pointer templates mapping\n",
        validationRegex: "make_unique",
        hint: "auto {{var}} = std::make_unique<int>({{val}});",
        blueprint: "auto {{var}} = std::make_unique<int>({{val}});"
      },
      {
        title: "Struct definitions {{index}}",
        instructions: "Construct structural class schema struct named {{var}} holding numerical id parameter.",
        starterCode: "// Struct models mappings\n",
        validationRegex: "struct\\\\s+{{var}}",
        hint: "struct {{var}} { int id; };",
        blueprint: "struct {{var}} {\n    int id;\n};"
      },
      {
        title: "For Loop iteration {{index}}",
        instructions: "Create a for loop iterating {{var}} from 0 to {{val}}.",
        starterCode: "// C++ for loop\n",
        validationRegex: "for\\\\s*\\\\(\\\\s*int\\\\s+{{var}}",
        hint: "for (int {{var}} = 0; {{var}} < {{val}}; {{var}}++) {}",
        blueprint: "for (int {{var}} = 0; {{var}} < {{val}}; {{var}}++) {\n}"
      },
      {
        title: "Class definition {{index}}",
        instructions: "Define a class named {{var}} with a public method.",
        starterCode: "// C++ class\n",
        validationRegex: "class\\\\s+{{var}}",
        hint: "class {{var}} { public: int getId() { return {{val}}; } };",
        blueprint: "class {{var}} {\npublic:\n    int getId() { return {{val}}; }\n};"
      },
      {
        title: "Reference parameter {{index}}",
        instructions: "Create function {{fun}} that takes an int reference parameter.",
        starterCode: "// Reference parameters\n",
        validationRegex: "void\\\\s+{{fun}}\\\\s*\\\\(\\\\s*int\\\\s*&",
        hint: "void {{fun}}(int& val) { val = {{val}}; }",
        blueprint: "void {{fun}}(int& val) {\n    val = {{val}};\n}"
      },
      {
        title: "Template function {{index}}",
        instructions: "Create a template function {{fun}} that returns its argument.",
        starterCode: "// Template function\n",
        validationRegex: "template\\\\s*<",
        hint: "template <typename T> T {{fun}}(T arg) { return arg; }",
        blueprint: "template <typename T>\nT {{fun}}(T arg) {\n    return arg;\n}"
      },
      {
        title: "Enum declaration {{index}}",
        instructions: "Define an enum named {{var}} with at least two values.",
        starterCode: "// Enum type\n",
        validationRegex: "enum\\\\s+{{var}}",
        hint: "enum {{var}} { Active, Inactive };",
        blueprint: "enum {{var}} {\n    Active,\n    Inactive\n};"
      },
      {
        title: "Namespace usage {{index}}",
        instructions: "Define a namespace named {{var}} containing a constant.",
        starterCode: "// Namespace\n",
        validationRegex: "namespace\\\\s+{{var}}",
        hint: "namespace {{var}} { const int VALUE = {{val}}; }",
        blueprint: "namespace {{var}} {\n    const int VALUE = {{val}};\n}"
      },
      {
        title: "String operations {{index}}",
        instructions: "Create a std::string variable {{var}} and find its length.",
        starterCode: "// String operations\n#include <string>\n",
        validationRegex: "std::string\\\\s+{{var}}",
        hint: "std::string {{var}} = \"Knight\";\nint len = {{var}}.length();",
        blueprint: "std::string {{var}} = \"Knight\";\nint len = {{var}}.length();"
      },
      {
        title: "Try-catch block {{index}}",
        instructions: "Wrap operation in a try-catch block catching std::exception.",
        starterCode: "// Exception handling\n",
        validationRegex: "try\\\\s*\\\\{.*\\\\}\\\\s*catch",
        hint: "try { {{fun}}(); } catch (const std::exception& e) {}",
        blueprint: "try {\n    {{fun}}();\n} catch (const std::exception& e) {\n}"
      },
      {
        title: "Lambda expression {{index}}",
        instructions: "Create a lambda stored in {{var}} that returns {{val}}.",
        starterCode: "// Lambda expression\n",
        validationRegex: "auto\\\\s+{{var}}\\\\s*=\\\\s*\\\\[",
        hint: "auto {{var}} = []() { return {{val}}; };",
        blueprint: "auto {{var}} = []() {\n    return {{val}};\n};"
      },
      {
        title: "Class inheritance {{index}}",
        instructions: "Create a class {{var}} that inherits publicly from Base.",
        starterCode: "// Inheritance\nclass Base { public: virtual void run() {} };\n",
        validationRegex: "class\\\\s+{{var}}\\\\s*:\\\\s*public",
        hint: "class {{var}} : public Base { public: void run() override {} };",
        blueprint: "class {{var}} : public Base {\npublic:\n    void run() override {}\n};"
      }
    ];
  }

  // 10. Java Core
  if (wid.includes('java')) {
    return [
      {
        title: "Class definitions {{index}}",
        instructions: "Construct Java class template named {{var}}.",
        starterCode: "// Java class models mapping\n",
        validationRegex: "public\\\\s+class\\\\s+{{var}}",
        hint: "public class {{var}} {}",
        blueprint: "public class {{var}} {}"
      },
      {
        title: "Method signatures type checks {{index}}",
        instructions: "Declare public int function {{fun}} returning parameter value {{val}}.",
        starterCode: "// Java method signatures mapping\n",
        validationRegex: "public\\\\s+int\\\\s+{{fun}}",
        hint: "public int {{fun}}() { return {{val}}; }",
        blueprint: "public int {{fun}}() {\n    return {{val}};\n}"
      },
      {
        title: "Array List structures initialization {{index}}",
        instructions: "Initialize collection dynamic lists mapped named {{var}}.",
        starterCode: "// List collections mapping\n",
        validationRegex: "List<Integer>\\\\s+{{var}}\\\\s*=",
        hint: "List<Integer> {{var}} = new ArrayList<>();",
        blueprint: "List<Integer> {{var}} = new ArrayList<>();"
      },
      {
        title: "Exception Safety wraps {{index}}",
        instructions: "Wrap target exceptions faults route executing function {{fun}}.",
        starterCode: "// Safe exception wrapper\n",
        validationRegex: "try\\\\s*\\\\{|catch\\\\s*\\\\(\\\\s*Exception",
        hint: "try { {{fun}}(); } catch (Exception e) {}",
        blueprint: "try {\n    {{fun}}();\n} catch (Exception e) {}"
      },
      {
        title: "Generics Class Map maps {{index}}",
        instructions: "Declare dynamic mapping schema binding String values to instances {{var}}.",
        starterCode: "// Generics type models mapping\n",
        validationRegex: "Map<String,\\\\s*{{var}}>",
        hint: "Map<String, {{var}}> map = new HashMap<>();",
        blueprint: "Map<String, {{var}}> map = new HashMap<>();"
      },
      {
        title: "Enum declaration {{index}}",
        instructions: "Define an enum named {{var}} with at least two constants.",
        starterCode: "// Java enum\n",
        validationRegex: "enum\\\\s+{{var}}",
        hint: "enum {{var}} { ACTIVE, INACTIVE }",
        blueprint: "enum {{var}} {\n    ACTIVE,\n    INACTIVE\n}"
      },
      {
        title: "Interface definition {{index}}",
        instructions: "Define an interface named {{var}} with a method signature.",
        starterCode: "// Java interface\n",
        validationRegex: "interface\\\\s+{{var}}",
        hint: "interface {{var}} { int getValue(); }",
        blueprint: "interface {{var}} {\n    int getValue();\n}"
      },
      {
        title: "For-each loop {{index}}",
        instructions: "Iterate over a list using enhanced for-each loop.",
        starterCode: "// Enhanced for loop\nList<String> items = Arrays.asList(\"a\", \"b\");\n",
        validationRegex: "for\\\\s*\\\\(.*:\\\\s*items",
        hint: "for (String {{var}} : items) { System.out.println({{var}}); }",
        blueprint: "for (String {{var}} : items) {\n    System.out.println({{var}});\n}"
      },
      {
        title: "Lambda expression {{index}}",
        instructions: "Create a lambda expression that takes a parameter and prints it.",
        starterCode: "// Lambda expression\n",
        validationRegex: "->",
        hint: "Consumer<String> {{var}} = s -> System.out.println(s);",
        blueprint: "Consumer<String> {{var}} = s -> System.out.println(s);"
      },
      {
        title: "Stream API filter {{index}}",
        instructions: "Use Stream API to filter and collect items from a list.",
        starterCode: "// Stream API\nList<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);\n",
        validationRegex: "\\\\.stream\\\\(\\\\)",
        hint: "List<Integer> {{var}} = numbers.stream().filter(n -> n > {{val}}).collect(Collectors.toList());",
        blueprint: "List<Integer> {{var}} = numbers.stream()\n    .filter(n -> n > {{val}})\n    .collect(Collectors.toList());"
      },
      {
        title: "Abstract class {{index}}",
        instructions: "Define an abstract class named {{var}} with an abstract method.",
        starterCode: "// Abstract class\n",
        validationRegex: "abstract\\\\s+class\\\\s+{{var}}",
        hint: "abstract class {{var}} { abstract int compute(); }",
        blueprint: "abstract class {{var}} {\n    abstract int compute();\n}"
      },
      {
        title: "StringBuilder usage {{index}}",
        instructions: "Create a StringBuilder {{var}} and append text to it.",
        starterCode: "// StringBuilder\n",
        validationRegex: "StringBuilder\\\\s+{{var}}",
        hint: "StringBuilder {{var}} = new StringBuilder();\n{{var}}.append(\"Knight\");",
        blueprint: "StringBuilder {{var}} = new StringBuilder();\n{{var}}.append(\"Knight\");"
      },
      {
        title: "Switch statement {{index}}",
        instructions: "Write a switch statement checking variable {{var}}.",
        starterCode: "// Switch statement\n",
        validationRegex: "switch\\\\s*\\\\(\\\\s*{{var}}",
        hint: "switch ({{var}}) { case {{val}}: break; default: break; }",
        blueprint: "switch ({{var}}) {\n    case {{val}}: break;\n    default: break;\n}"
      },
      {
        title: "Static method {{index}}",
        instructions: "Create a static method {{fun}} that returns {{val}}.",
        starterCode: "// Static method\n",
        validationRegex: "static\\\\s+int\\\\s+{{fun}}",
        hint: "public static int {{fun}}() { return {{val}}; }",
        blueprint: "public static int {{fun}}() {\n    return {{val}};\n}"
      },
      {
        title: "Class inheritance {{index}}",
        instructions: "Create a class {{var}} that extends BaseEntity.",
        starterCode: "// Inheritance\n",
        validationRegex: "class\\\\s+{{var}}\\\\s+extends",
        hint: "class {{var}} extends BaseEntity { int id = {{val}}; }",
        blueprint: "class {{var}} extends BaseEntity {\n    int id = {{val}};\n}"
      }
    ];
  }

  // 11. C# Castle
  if (wid.includes('csharp') || wid.includes('c#')) {
    return [
      {
        title: "LINQ Query selection {{index}}",
        instructions: "Select elements source collections mapping variable {{var}}.",
        starterCode: "// Collections LINQ mapping\n",
        validationRegex: "from\\\\s+.*\\\\s+in\\\\s+datasource\\\\s+select",
        hint: "var {{var}} = from x in datasource select x;",
        blueprint: "var {{var}} = from x in datasource select x;"
      },
      {
        title: "Async Task waiting delay {{index}}",
        instructions: "Implement async Task execution wrapper named {{fun}}.",
        starterCode: "// Async task scheduling pipeline\n",
        validationRegex: "async\\\\s+Task\\\\s+{{fun}}",
        hint: "async Task {{fun}}() { await Task.Delay({{val}}); }",
        blueprint: "async Task {{fun}}() {\n    await Task.Delay({{val}});\n}"
      },
      {
        title: "Namespace grouping declaration {{index}}",
        instructions: "Declare system logic namespace named {{var}}.",
        starterCode: "// Logical namespaces mapping\n",
        validationRegex: "namespace\\\\s+{{var}}",
        hint: "namespace {{var}} {}",
        blueprint: "namespace {{var}} {}"
      },
      {
        title: "Property getter setter definition {{index}}",
        instructions: "Declare class properties getter and setters parameter named {{var}}.",
        starterCode: "// Class properties mapping\n",
        validationRegex: "public\\\\s+int\\\\s+{{var}}\\\\s*\\\\{\\\\s*get\\\\s*;\\\\s*set\\\\s*;\\\\s*\\\\}",
        hint: "public int {{var}} { get; set; }",
        blueprint: "public int {{var}} { get; set; }"
      },
      {
        title: "Console Log Print {{index}}",
        instructions: "Output numeric parameters value {{val}} to standard logs console.",
        starterCode: "// Terminal standard logs printing\n",
        validationRegex: "Console\\\\.WriteLine\\\\(\\\\s*{{val}}\\\\s*\\\\)",
        hint: "Console.WriteLine({{val}});",
        blueprint: "Console.WriteLine({{val}});"
      }
    ];
  }

  // 12. PHP Tavern
  if (wid.includes('php')) {
    return [
      {
        title: "Variable Bind {{index}}",
        instructions: "Declare PHP local variable named ${{var}} assigning value {{val}}.",
        starterCode: "<?php\n// PHP variables allocation\n",
        validationRegex: "\\\\${{var}}\\\\s*=\\\\s*{{val}}",
        hint: "${{var}} = {{val}};",
        blueprint: "${{var}} = {{val}};"
      },
      {
        title: "Array Init {{index}}",
        instructions: "Initialize collections array named ${{var}} holding value reference {{val}}.",
        starterCode: "<?php\n// Collections mappings block\n",
        validationRegex: "\\\\${{var}}\\\\s*=\\\\s*array",
        hint: "${{var}} = array(\"Knight\", {{val}});",
        blueprint: "${{var}} = array(\"Knight\", {{val}});"
      },
      {
        title: "Session Storage cache {{index}}",
        instructions: "Initialize secure session cache key named {{var}} with parameters value {{val}}.",
        starterCode: "<?php\n// Server session data storage\n",
        validationRegex: "\\\\_SESSION\\\\[['\"]{{var}}['\"]\\\\]\\\\s*=\\\\s*{{val}}",
        hint: "$_SESSION['{{var}}'] = {{val}};",
        blueprint: "$_SESSION['{{var}}'] = {{val}};"
      },
      {
        title: "GET Request Parameter check {{index}}",
        instructions: "Filter requests parameter mapping query named ${{var}} from GET.",
        starterCode: "<?php\n// GET Input request parser\n",
        validationRegex: "\\\\${{var}}\\\\s*=\\\\s*\\\\_GET",
        hint: "${{var}} = $_GET['id'];",
        blueprint: "${{var}} = $_GET['id'];"
      },
      {
        title: "Include routing file {{index}}",
        instructions: "Include external controller routing block file name {{var}}.php.",
        starterCode: "<?php\n// Core routing controllers inclusion\n",
        validationRegex: "include\\\\s+['\"]{{var}}\\\\.php['\"]",
        hint: "include \"{{var}}.php\";",
        blueprint: "include \"{{var}}.php\";"
      }
    ];
  }

  // 13. Swift Swiftness
  if (wid.includes('swift')) {
    return [
      {
        title: "Let constant binding {{index}}",
        instructions: "Declare immutable constant {{var}} assigning value {{val}}.",
        starterCode: "// Swift immutable bindings allocation\n",
        validationRegex: "let\\\\s+{{var}}\\\\s*=\\\\s*{{val}}",
        hint: "let {{var}} = {{val}}",
        blueprint: "let {{var}} = {{val}}"
      },
      {
        title: "Var variable binding {{index}}",
        instructions: "Declare mutable variable {{var}} assigning value {{val}}.",
        starterCode: "// Swift variables allocation\n",
        validationRegex: "var\\\\s+{{var}}\\\\s*=\\\\s*{{val}}",
        hint: "var {{var}} = {{val}}",
        blueprint: "var {{var}} = {{val}}"
      },
      {
        title: "Swift Optional binding unwrap {{index}}",
        instructions: "Safely unwrap values optional variable parameter {{var}} using let.",
        starterCode: "// Safe optional unwrap patterns\n",
        validationRegex: "if\\\\s+let\\\\s+{{var}}",
        hint: "if let {{var}} = optionalValue {}",
        blueprint: "if let {{var}} = optionalValue {}"
      },
      {
        title: "Guard Let unwrap safety {{index}}",
        instructions: "Verify optional variable parameter exists binding to constant {{var}}.",
        starterCode: "// Swift guard assertions block\n",
        validationRegex: "guard\\\\s+let\\\\s+{{var}}",
        hint: "guard let {{var}} = optionalValue else { return }",
        blueprint: "guard let {{var}} = optionalValue else { return }"
      },
      {
        title: "Struct definitions {{index}}",
        instructions: "Construct custom models struct named {{var}} holding numerical id parameter.",
        starterCode: "// Struct model layouts\n",
        validationRegex: "struct\\\\s+{{var}}",
        hint: "struct {{var}} { var id: Int }",
        blueprint: "struct {{var}} {\n    var id: Int\n}"
      }
    ];
  }

  // 14. Kotlin Kingdom
  if (wid.includes('kotlin')) {
    return [
      {
        title: "Val constant allocation {{index}}",
        instructions: "Declare immutable variable val {{var}} assigning value {{val}}.",
        starterCode: "// Kotlin immutable constant allocation\n",
        validationRegex: "val\\\\s+{{var}}\\\\s*=\\\\s*{{val}}",
        hint: "val {{var}} = {{val}}",
        blueprint: "val {{var}} = {{val}}"
      },
      {
        title: "Var variable allocation {{index}}",
        instructions: "Declare mutable variable var {{var}} assigning value {{val}}.",
        starterCode: "// Kotlin variables allocation\n",
        validationRegex: "var\\\\s+{{var}}\\\\s*=\\\\s*{{val}}",
        hint: "var {{var}} = {{val}}",
        blueprint: "var {{var}} = {{val}}"
      },
      {
        title: "Kotlin Nullable annotations {{index}}",
        instructions: "Declare variable instance {{var}} holding nullable String model.",
        starterCode: "// Kotlin Nullable configurations mapping\n",
        validationRegex: "var\\\\s+{{var}}\\\\s*:\\\\s*String\\\\?",
        hint: "var {{var}}: String? = null",
        blueprint: "var {{var}}: String? = null"
      },
      {
        title: "Data Class schema {{index}}",
        instructions: "Construct dynamic structural data class named {{var}} holding Int parameter id.",
        starterCode: "// Kotlin data class models mapping\n",
        validationRegex: "data\\\\s+class\\\\s+{{var}}",
        hint: "data class {{var}}(val id: Int)",
        blueprint: "data class {{var}}(val id: Int)"
      },
      {
        title: "When Expression bounds {{index}}",
        instructions: "Apply Kotlin when branching checking variable {{var}}.",
        starterCode: "// Kotlin conditional mapping branching\n",
        validationRegex: "when\\\\s*\\\\(\\\\s*{{var}}\\\\s*\\\\)",
        hint: "when ({{var}}) { 0 -> println() }",
        blueprint: "when ({{var}}) {\n    0 -> println()\n}"
      }
    ];
  }

  // 15. Command Line & Git (bash-git)
  if (wid.includes('git') || wid.includes('bash')) {
    return [
      {
        title: "Git Workspace Init {{index}}",
        instructions: "Initialize local git index directory tracking.",
        starterCode: "# Terminal command initialization\n",
        validationRegex: "git\\\\s+init",
        hint: "git init",
        blueprint: "git init"
      },
      {
        title: "Git Stage tracking {{index}}",
        instructions: "Add elements index file named {{var}}.js to staging area.",
        starterCode: "# Add files terminal commands\n",
        validationRegex: "git\\\\s+add\\\\s+{{var}}\\\\.js",
        hint: "git add {{var}}.js",
        blueprint: "git add {{var}}.js"
      },
      {
        title: "Git Commit versioning {{index}}",
        instructions: "Commit staging changes adding message referencing commit {{val}}.",
        starterCode: "# Commits version control\n",
        validationRegex: "git\\\\s+commit\\\\s+-m",
        hint: "git commit -m \"commit {{val}}\"",
        blueprint: "git commit -m \"commit {{val}}\""
      },
      {
        title: "Git Index Reset revert {{index}}",
        instructions: "Revert the staging files index completely to state HEAD~{{val}}.",
        starterCode: "# Reset index version control\n",
        validationRegex: "git\\\\s+reset\\\\s+--hard",
        hint: "git reset --hard HEAD~{{val}}",
        blueprint: "git reset --hard HEAD~{{val}}"
      },
      {
        title: "Git Branch Switch create {{index}}",
        instructions: "Create and switch branch tracking focus to branch_{{var}}.",
        starterCode: "# Branch checkout terminal command\n",
        validationRegex: "git\\\\s+checkout\\\\s+-b",
        hint: "git checkout -b branch_{{var}}",
        blueprint: "git checkout -b branch_{{var}}"
      }
    ];
  }

  // 16. DevOps & Containers (devops-containers)
  if (wid.includes('devops') || wid.includes('containers')) {
    return [
      {
        title: "Docker Container Port expose {{index}}",
        instructions: "Expose container boundary service port map at port {{val}}.",
        starterCode: "# Docker environment configs\n",
        validationRegex: "EXPOSE\\\\s+{{val}}",
        hint: "EXPOSE {{val}}",
        blueprint: "EXPOSE {{val}}"
      },
      {
        title: "Docker Copy files {{index}}",
        instructions: "Copy directory resources targets into container destination /app/{{var}}.",
        starterCode: "# Dockerfile configs metadata\n",
        validationRegex: "COPY\\\\s+\\\\.\\\\s+/app/{{var}}",
        hint: "COPY . /app/{{var}}",
        blueprint: "COPY . /app/{{var}}"
      },
      {
        title: "Docker Base image {{index}}",
        instructions: "Import base image node version target tag node:{{val}}.",
        starterCode: "# Dockerfile source definitions\n",
        validationRegex: "FROM\\\\s+node:{{val}}",
        hint: "FROM node:{{val}}",
        blueprint: "FROM node:{{val}}"
      },
      {
        title: "Kubernetes Replicas count {{index}}",
        instructions: "Define Kubernetes spec configuring replica pod targets size to {{val}}.",
        starterCode: "# K8s deployment configurations spec\nspec:\n",
        validationRegex: "replicas\\\\s*:\\\\s*{{val}}",
        hint: "replicas: {{val}}",
        blueprint: "replicas: {{val}}"
      },
      {
        title: "Docker Working directory {{index}}",
        instructions: "Set execution boundary directory path inside container to /app/{{var}}.",
        starterCode: "# WORKDIR definitions config\n",
        validationRegex: "WORKDIR\\\\s+/app/{{var}}",
        hint: "WORKDIR /app/{{var}}",
        blueprint: "WORKDIR /app/{{var}}"
      }
    ];
  }

  // 17. Data Structures & Algorithms (dsa)
  if (wid.includes('dsa')) {
    return [
      {
        title: "Stack Push operations {{index}}",
        instructions: "Add numerical data elements value {{val}} to dynamic stack.",
        starterCode: "// Stack collections buffer mapping\n",
        validationRegex: "stack\\\\.push\\\\(\\\\s*{{val}}\\\\s*\\\\)",
        hint: "stack.push({{val}});",
        blueprint: "stack.push({{val}});"
      },
      {
        title: "Queue Enqueue operations {{index}}",
        instructions: "Add elements item size {{val}} to execution queue.",
        starterCode: "// Queue collections mappings\n",
        validationRegex: "queue\\\\.enqueue\\\\(\\\\s*{{val}}\\\\s*\\\\)",
        hint: "queue.enqueue({{val}});",
        blueprint: "queue.enqueue({{val}});"
      },
      {
        title: "Linked List node mapping {{index}}",
        instructions: "Establish list chain pointer next reference pointing to Node({{val}}).",
        starterCode: "// Linked lists pointers nodes\n",
        validationRegex: "node\\\\.next\\\\s*=\\\\s*new\\\\s+Node",
        hint: "node.next = new Node({{val}});",
        blueprint: "node.next = new Node({{val}});"
      },
      {
        title: "Hash Map keys lookup {{index}}",
        instructions: "Store key mapping in hash table mapping 'key' to {{val}}.",
        starterCode: "// Hash map collections buffers\n",
        validationRegex: "map\\\\.set\\\\(\\\\s*['\"]key['\"]\\\\s*,\\\\s*{{val}}\\\\s*\\\\)",
        hint: "map.set(\"key\", {{val}});",
        blueprint: "map.set(\"key\", {{val}});"
      },
      {
        title: "Binary Tree node insert {{index}}",
        instructions: "Insert numerical node element value {{val}} into BST tree structure.",
        starterCode: "// Binary trees metadata mapping\n",
        validationRegex: "bst\\\\.insert\\\\(\\\\s*{{val}}\\\\s*\\\\)",
        hint: "bst.insert({{val}});",
        blueprint: "bst.insert({{val}});"
      }
    ];
  }

  // 18. Web Security & APIs (security-apis)
  if (wid.includes('security') || wid.includes('api')) {
    return [
      {
        title: "Input Sanitization routines {{index}}",
        instructions: "Apply input sanitization sanitizing input variable assigning to constant {{var}}.",
        starterCode: "// Safe sanitization middleware\n",
        validationRegex: "const\\\\s+{{var}}\\\\s*=\\\\s*sanitize\\\\(input\\\\)",
        hint: "const {{var}} = sanitize(input);",
        blueprint: "const {{var}} = sanitize(input);"
      },
      {
        title: "JWT Token authorization sign {{index}}",
        instructions: "Generate secure JWT authorization signature holding payload metadata id: {{val}}.",
        starterCode: "// JWT configurations authorization\n",
        validationRegex: "jwt\\\\.sign",
        hint: "const {{var}} = jwt.sign({ id: {{val}} }, secret);",
        blueprint: "const {{var}} = jwt.sign({ id: {{val}} }, secret);"
      },
      {
        title: "Hash Encrypt Password credentials {{index}}",
        instructions: "Generate secure cryptographic hash of credentials mapping to {{var}}.",
        starterCode: "// Cryptographic password hash pipeline\n",
        validationRegex: "sha256",
        hint: "const {{var}} = sha256(password);",
        blueprint: "const {{var}} = sha256(password);"
      },
      {
        title: "CORS headers authorization origin {{index}}",
        instructions: "Restrict CORS resource loading origin mapping allowed origin to host {{var}}.",
        starterCode: "// CORS parameters security\n",
        validationRegex: "cors.*origin",
        hint: "cors({ origin: \"{{var}}\" });",
        blueprint: "cors({ origin: \"{{var}}\" });"
      },
      {
        title: "SQL Bind Parameters shielding {{index}}",
        instructions: "Apply parameter placeholder query shielding queries from injection using {{val}}.",
        starterCode: "// Safe database query bindings\n",
        validationRegex: "db\\\\.query.*\\\\[\\\\s*{{val}}\\\\s*\\\\]",
        hint: "db.query(\"SELECT * FROM user WHERE id = ?\", [{{val}}]);",
        blueprint: "db.query(\"SELECT * FROM user WHERE id = ?\", [{{val}}]);"
      }
    ];
  }

  // 19. Testing & QA (testing-qa)
  if (wid.includes('testing') || wid.includes('qa')) {
    return [
      {
        title: "Assert Equals check {{index}}",
        instructions: "Verify testing checks asserting variable {{var}} equals expected value {{val}}.",
        starterCode: "// Assertion tests routines\n",
        validationRegex: "assert\\\\.equal",
        hint: "assert.equal({{var}}, {{val}});",
        blueprint: "assert.equal({{var}}, {{val}});"
      },
      {
        title: "Expect toBe match {{index}}",
        instructions: "Assert variable {{var}} matches expectations returning toBe value {{val}}.",
        starterCode: "// Testing frameworks matchers\n",
        validationRegex: "expect.*toBe",
        hint: "expect({{var}}).toBe({{val}});",
        blueprint: "expect({{var}}).toBe({{val}});"
      },
      {
        title: "Playwright Page click action {{index}}",
        instructions: "Simulate test browser click event routing click to class selector selector .btn-{{var}}.",
        starterCode: "// Automated browser queries click\n",
        validationRegex: "page\\\\.click",
        hint: "await page.click(\".btn-{{var}}\");",
        blueprint: "await page.click(\".btn-{{var}}\");"
      },
      {
        title: "Cypress Visit redirect check {{index}}",
        instructions: "Route Cypress test executor to path redirect URL /{{var}}.",
        starterCode: "// Cypress integration tests routing\n",
        validationRegex: "cy\\\\.visit",
        hint: "cy.visit(\"/{{var}}\");",
        blueprint: "cy.visit(\"/{{var}}\");"
      },
      {
        title: "Mock Functions framework callback {{index}}",
        instructions: "Initialize a test mock spy callback assigning to constant {{fun}}.",
        starterCode: "// Mocking objects frameworks assertions\n",
        validationRegex: "jest\\\\.fn",
        hint: "const {{fun}} = jest.fn();",
        blueprint: "const {{fun}} = jest.fn();"
      }
    ];
  }

  // JS Academy (JavaScript)
  if (wid.includes('js') || wid.includes('javascript')) {
    return [
      {
        title: "Variable Declaration {{index}}",
        instructions: "Declare constant {{var}} assigning value {{val}}.",
        starterCode: "// Variable declaration\n",
        validationRegex: "const\\\\s+{{var}}\\\\s*=\\\\s*{{val}}",
        hint: "const {{var}} = {{val}};",
        blueprint: "const {{var}} = {{val}};"
      },
      {
        title: "Arrow Function {{index}}",
        instructions: "Create an arrow function {{fun}} that returns value {{val}}.",
        starterCode: "// Arrow function\n",
        validationRegex: "const\\\\s+{{fun}}\\\\s*=\\\\s*\\\\(\\\\s*\\\\)\\\\s*=>",
        hint: "const {{fun}} = () => {{val}};",
        blueprint: "const {{fun}} = () => {{val}};"
      },
      {
        title: "Template Literal {{index}}",
        instructions: "Create a template literal string stored in {{var}} that interpolates a variable.",
        starterCode: "// Template literal\nconst name = 'Knight';\n",
        validationRegex: "{{var}}\\\\s*=\\\\s*`",
        hint: "const {{var}} = `Hello ${name}`;",
        blueprint: "const {{var}} = `Hello ${name}`;"
      },
      {
        title: "Function Declaration {{index}}",
        instructions: "Declare a function named {{fun}} that returns value {{val}}.",
        starterCode: "// Function declaration\n",
        validationRegex: "function\\\\s+{{fun}}",
        hint: "function {{fun}}() { return {{val}}; }",
        blueprint: "function {{fun}}() {\n  return {{val}};\n}"
      },
      {
        title: "Switch Case {{index}}",
        instructions: "Write a switch statement checking the value of variable {{var}}.",
        starterCode: "// Switch case\n",
        validationRegex: "switch\\\\s*\\\\(\\\\s*{{var}}",
        hint: "switch ({{var}}) { case {{val}}: break; default: break; }",
        blueprint: "switch ({{var}}) {\n  case {{val}}:\n    break;\n  default:\n    break;\n}"
      },
      {
        title: "While Loop {{index}}",
        instructions: "Create a while loop that runs while {{var}} is less than {{val}}.",
        starterCode: "// While loop\nlet {{var}} = 0;\n",
        validationRegex: "while\\\\s*\\\\(\\\\s*{{var}}",
        hint: "while ({{var}} < {{val}}) { {{var}}++; }",
        blueprint: "while ({{var}} < {{val}}) {\n  {{var}}++;\n}"
      },
      {
        title: "Spread Operator {{index}}",
        instructions: "Create a new array {{var}} by spreading an existing array and adding {{val}}.",
        starterCode: "// Spread operator\nconst original = [1, 2, 3];\n",
        validationRegex: "\\\\.\\\\.\\\\.original",
        hint: "const {{var}} = [...original, {{val}}];",
        blueprint: "const {{var}} = [...original, {{val}}];"
      },
      {
        title: "Class Declaration {{index}}",
        instructions: "Create a class named {{var}} with a constructor that sets an id property.",
        starterCode: "// Class declaration\n",
        validationRegex: "class\\\\s+{{var}}",
        hint: "class {{var}} { constructor() { this.id = {{val}}; } }",
        blueprint: "class {{var}} {\n  constructor() {\n    this.id = {{val}};\n  }\n}"
      },
      {
        title: "Destructuring Assignment {{index}}",
        instructions: "Destructure property {{var}} from an object.",
        starterCode: "// Destructuring\nconst data = { {{var}}: {{val}}, name: 'Knight' };\n",
        validationRegex: "const\\\\s*\\\\{\\\\s*{{var}}",
        hint: "const { {{var}} } = data;",
        blueprint: "const { {{var}} } = data;"
      },
      {
        title: "Ternary Operator {{index}}",
        instructions: "Use a ternary operator to assign {{var}} based on a condition.",
        starterCode: "// Ternary operator\nconst score = {{val}};\n",
        validationRegex: "{{var}}\\\\s*=.*\\\\?.*:",
        hint: "const {{var}} = score > 50 ? 'pass' : 'fail';",
        blueprint: "const {{var}} = score > 50 ? 'pass' : 'fail';"
      },
      {
        title: "For...of Loop {{index}}",
        instructions: "Iterate over an array using a for...of loop.",
        starterCode: "// For...of loop\nconst items = [{{val}}, 20, 30];\n",
        validationRegex: "for\\\\s*\\\\(.*\\\\s+of\\\\s+",
        hint: "for (const {{var}} of items) { console.log({{var}}); }",
        blueprint: "for (const {{var}} of items) {\n  console.log({{var}});\n}"
      },
      {
        title: "Map Data Structure {{index}}",
        instructions: "Create a new Map and set a key-value pair with key '{{var}}' and value {{val}}.",
        starterCode: "// Map data structure\n",
        validationRegex: "new\\\\s+Map|map\\\\.set",
        hint: "const map = new Map();\nmap.set('{{var}}', {{val}});",
        blueprint: "const map = new Map();\nmap.set('{{var}}', {{val}});"
      },
      {
        title: "Async Await {{index}}",
        instructions: "Create an async function {{fun}} that awaits a promise.",
        starterCode: "// Async/await\n",
        validationRegex: "async\\\\s+function\\\\s+{{fun}}",
        hint: "async function {{fun}}() { const result = await fetch('/api'); return result; }",
        blueprint: "async function {{fun}}() {\n  const result = await fetch('/api');\n  return result;\n}"
      },
      {
        title: "Promise Creation {{index}}",
        instructions: "Create a new Promise stored in {{var}} that resolves with value {{val}}.",
        starterCode: "// Promise creation\n",
        validationRegex: "new\\\\s+Promise",
        hint: "const {{var}} = new Promise((resolve) => resolve({{val}}));",
        blueprint: "const {{var}} = new Promise((resolve) => {\n  resolve({{val}});\n});"
      },
      {
        title: "Try-Catch Block {{index}}",
        instructions: "Wrap function call {{fun}} inside a try-catch block.",
        starterCode: "// Error handling\n",
        validationRegex: "try\\\\s*\\\\{.*\\\\}\\\\s*catch",
        hint: "try { {{fun}}(); } catch (error) { console.error(error); }",
        blueprint: "try {\n  {{fun}}();\n} catch (error) {\n  console.error(error);\n}"
      },
      {
        title: "Array Filter {{index}}",
        instructions: "Filter array items keeping only values greater than {{val}}, store in {{var}}.",
        starterCode: "// Array filter\nconst numbers = [5, 15, 25, 35, 45];\n",
        validationRegex: "\\\\.filter\\\\(",
        hint: "const {{var}} = numbers.filter(n => n > {{val}});",
        blueprint: "const {{var}} = numbers.filter(n => n > {{val}});"
      },
      {
        title: "Array Reduce {{index}}",
        instructions: "Reduce array to a sum stored in {{var}}.",
        starterCode: "// Array reduce\nconst values = [10, 20, 30];\n",
        validationRegex: "\\\\.reduce\\\\(",
        hint: "const {{var}} = values.reduce((acc, val) => acc + val, 0);",
        blueprint: "const {{var}} = values.reduce((acc, val) => acc + val, 0);"
      },
      {
        title: "Optional Chaining {{index}}",
        instructions: "Safely access nested property using optional chaining on {{var}}.",
        starterCode: "// Optional chaining\nconst user = { profile: { name: 'Knight' } };\n",
        validationRegex: "\\\\?\\\\.",
        hint: "const {{var}} = user?.profile?.name;",
        blueprint: "const {{var}} = user?.profile?.name;"
      }
    ];
  }

  // 20. Fallback Logic (Generic fallback loops)
  return [
    {
      title: "Data transformation {{index}}",
      instructions: "Multiply number values in list mappings to {{var}} using coefficient {{val}}.",
      starterCode: "// General list mapping pipeline\n",
      validationRegex: "map",
      hint: "const {{var}} = list.map(x => x * {{val}});",
      blueprint: "const {{var}} = list.map(x => x * {{val}});"
    }
  ];
};

const applyDynamicVariation = (
  worldId: string,
  poolIndex: number,
  variationIndex: number,
  template: { title: string; instructions: string; starterCode: string; validationRegex: string; hint: string; blueprint: string },
  varName: string
) => {
  const wid = worldId.toLowerCase();

  // HTML5
  if (wid.includes('html')) {
    if (poolIndex === 0) {
      const lvl = (variationIndex % 6) + 1;
      template.title = `Heading level <h${lvl}> element {{index}}`;
      template.instructions = `Create an HTML heading element using <h${lvl}>{{var}}</h${lvl}>.`;
      template.hint = `<h${lvl}>{{var}}</h${lvl}>`;
      template.blueprint = `<h${lvl}>{{var}}</h${lvl}>`;
      template.validationRegex = `<h${lvl}[^>]*>\\\\s*[^<]+\\\\s*</h${lvl}>`;
    } else if (poolIndex === 1) {
      const tag = ['div', 'section', 'article', 'aside', 'nav', 'header', 'footer'][variationIndex % 7];
      template.title = `Container <${tag}> element {{index}}`;
      template.instructions = `Create a <${tag}> element with id="{{var}}" containing text "Container".`;
      template.hint = `<${tag} id="{{var}}">Container</${tag}>`;
      template.blueprint = `<${tag} id="{{var}}">\n  Container\n</${tag}>`;
      template.validationRegex = `<${tag}\\s+id=['"]{{var}}['"]>`;
    } else if (poolIndex === 2) {
      const route = ['route', 'profile', 'api', 'dashboard', 'settings', 'details'][variationIndex % 6];
      template.title = `Link Anchor to ${route} {{index}}`;
      template.instructions = `Create an <a> link element directing to /${route}-{{val}}.`;
      template.hint = `<a href="/${route}-{{val}}">Link</a>`;
      template.blueprint = `<a href="/${route}-{{val}}">Link</a>`;
      template.validationRegex = `href=['"]/${route}-{{val}}['"]`;
    } else if (poolIndex === 3) {
      const text = ['Web Page', 'Header Section', 'User Profile', 'Dashboard View', 'Navigation Bar', 'Footer Links'][variationIndex % 6];
      template.title = `Semantic layout ${text} {{index}}`;
      template.instructions = `Create a semantic <section> element containing text "${text}".`;
      template.hint = `<section>${text}</section>`;
      template.blueprint = `<section>\n  ${text}\n</section>`;
      template.validationRegex = `<section[^>]*>\\\\s*[^<]+\\\\s*</section>`;
    } else if (poolIndex === 4) {
      const type = ['text', 'email', 'password', 'number', 'checkbox', 'date', 'color'][variationIndex % 7];
      template.title = `HTML Input type ${type} {{index}}`;
      template.instructions = `Create an <input> element of type="${type}" named input_{{var}}.`;
      template.hint = `<input type="${type}" name="input_{{var}}" />`;
      template.blueprint = `<input type="${type}" name="input_{{var}}" />`;
      template.validationRegex = `type=['"]${type}['"]\\s+name=['"]input_{{var}}['"]`;
    }
  }

  // CSS3
  else if (wid.includes('css')) {
    if (poolIndex === 0) {
      const prop = ['color', 'background-color', 'border-color', 'outline-color', 'text-decoration-color'][variationIndex % 5];
      const colorVal = `#${(variationIndex % 9).toString().repeat(6)}`;
      template.title = `Color property ${prop} {{index}}`;
      template.instructions = `Set the CSS property "${prop}" to "${colorVal}".`;
      template.hint = `${prop}: ${colorVal};`;
      template.blueprint = `.element {\n  ${prop}: ${colorVal};\n}`;
      template.validationRegex = `${prop}\\s*:\\s*${colorVal}`;
    } else if (poolIndex === 1) {
      const prop = ['margin', 'padding', 'margin-top', 'padding-bottom', 'border-width'][variationIndex % 5];
      template.title = `Spacer property ${prop} {{index}}`;
      template.instructions = `Create a CSS rule for .{{var}} setting "${prop}" to "{{val}}px".`;
      template.hint = `.${varName} { ${prop}: {{val}}px; }`;
      template.blueprint = `.${varName} {\n  ${prop}: {{val}}px;\n}`;
      template.validationRegex = `\\.${varName}\\s*\\{[^\\}]*${prop}\\s*:\\s*{{val}}px`;
    } else if (poolIndex === 2) {
      const prop = ['opacity', 'transform', 'background-color', 'width', 'color'][variationIndex % 5];
      template.title = `Transition property ${prop} {{index}}`;
      template.instructions = `Set the CSS transition rule for property "${prop}" to {{val}}ms on element .{{var}}.`;
      template.hint = `.${varName} { transition: ${prop} {{val}}ms ease-in-out; }`;
      template.blueprint = `.${varName} {\n  transition: ${prop} {{val}}ms ease-in-out;\n}`;
      template.validationRegex = `transition\\s*:\\s*${prop}\\s+{{val}}ms`;
    }
  }

  // JavaScript
  else if (wid.includes('js') || wid.includes('javascript')) {
    if (poolIndex === 0) {
      const kw = ['const', 'let', 'var'][variationIndex % 3];
      template.title = `JS Variable declaration with ${kw} {{index}}`;
      template.instructions = `Declare a variable named {{var}} initialized to {{val}} using ${kw}.`;
      template.hint = `${kw} {{var}} = {{val}};`;
      template.blueprint = `${kw} {{var}} = {{val}};`;
      template.validationRegex = `${kw}\\s+{{var}}\\s*=\\s*{{val}}`;
    } else if (poolIndex === 1) {
      const kw = ['const', 'function'][variationIndex % 2];
      template.title = `JS Function returning value {{index}}`;
      if (kw === 'const') {
        template.instructions = `Create an arrow function named {{fun}} returning {{val}}.`;
        template.hint = `const {{fun}} = () => {{val}};`;
        template.blueprint = `const {{fun}} = () => {{val}};`;
        template.validationRegex = `const\\s+{{fun}}\\s*=\\s*\\(\\s*\\)\\s*=>\\s*{{val}}`;
      } else {
        template.instructions = `Create a function named {{fun}} returning {{val}}.`;
        template.hint = `function {{fun}}() { return {{val}}; }`;
        template.blueprint = `function {{fun}}() {\n  return {{val}};\n}`;
        template.validationRegex = `function\\s+{{fun}}\\s*\\(\\s*\\)[^\\}]*return\\s+{{val}}`;
      }
    }
  }

  // React
  else if (wid.includes('react')) {
    if (poolIndex === 0) {
      const prop = ['useState', 'useRef', 'useMemo', 'useCallback', 'useContext'][variationIndex % 5];
      template.title = `React hook ${prop} {{index}}`;
      template.instructions = `Declare a React hook named {{var}} using ${prop}({{val}}).`;
      if (prop === 'useState') {
        template.hint = `const [{{var}}, set{{var}}] = useState({{val}});`;
        template.blueprint = `const [{{var}}, set{{var}}] = useState({{val}});`;
        template.validationRegex = `useState\\(\\s*{{val}}\\s*\\)`;
      } else {
        template.hint = `const {{var}} = ${prop}({{val}});`;
        template.blueprint = `const {{var}} = ${prop}({{val}});`;
        template.validationRegex = `${prop}\\(\\s*{{val}}\\s*\\)`;
      }
    }
  }

  // SQL
  else if (wid.includes('sql')) {
    if (poolIndex === 0) {
      const command = ['SELECT *', 'SELECT id', 'SELECT name', 'SELECT status'][variationIndex % 4];
      template.title = `SQL Relational projection ${command} {{index}}`;
      template.instructions = `Write a SQL query using ${command} FROM {{var}} WHERE id = {{val}}.`;
      template.hint = `${command} FROM {{var}} WHERE id = {{val}};`;
      template.blueprint = `${command} FROM {{var}} WHERE id = {{val}};`;
      template.validationRegex = `${command.replace('*', '\\*')}\\s+FROM\\s+{{var}}\\s+WHERE\\s+id\\s*=\\s*{{val}}`;
    }
  }
};

const generateRemainingLevels = (worldId: string, worldName: string, existing: SyllabusLevel[]): SyllabusLevel[] => {
  const result = [...existing];

  const worldLessons = getLessonsPool(worldId);
  // Cap at poolSize × 8 unique variations to prevent topic repetition
  const maxVariations = 8;
  const targetCount = Math.min(existing.length + worldLessons.length * maxVariations, 500);
  if (result.length >= targetCount) return result;

  const startOffset = existing.length + 1;

  for (let i = startOffset; i <= targetCount; i++) {
    const poolIndex = (i - startOffset) % worldLessons.length;
    const template = { ...worldLessons[poolIndex] };
    const variationIndex = Math.floor((i - startOffset) / worldLessons.length);

    const uniqueId = i;
    const varName = `var_${uniqueId}`;
    const functionName = `compute_${uniqueId}`;
    const value = uniqueId * 5;

    applyDynamicVariation(worldId, poolIndex, variationIndex, template, varName);

    const hint = template.hint.replace(/{{var}}/g, varName).replace(/{{fun}}/g, functionName).replace(/{{val}}/g, String(value));
    const blueprint = template.blueprint.replace(/{{var}}/g, varName).replace(/{{fun}}/g, functionName).replace(/{{val}}/g, String(value));
    const validationRegex = template.validationRegex
      .replace(/{{var}}/g, '[a-zA-Z_$][a-zA-Z0-9_$]*')
      .replace(/{{fun}}/g, '[a-zA-Z_$][a-zA-Z0-9_$]*')
      .replace(/{{val}}/g, '\\\\S+');

    const title = template.title.replace(/{{index}}/g, String(i)).replace(/{{val}}/g, String(value));

    // Aligned translation map to convert cryptic templates into standard, educational instructions
    const rawInstructions = template.instructions;
    let instructions = rawInstructions;

    const translationMap: { [key: string]: string } = {
      "Mount custom gate header wrapping banner name {{var}}.": "Create an HTML heading element using `<h1>{{var}}</h1>`.",
      "Create divider container wrapping content with id class {{var}}.": "Create a `<div>` element with the id attribute set to `{{var}}` (e.g. `<div id=\"{{var}}\">`).",
      "Create link anchor directing user to /route-{{val}}.": "Create a hyperlink anchor using `<a>` tag pointing to `/route-{{val}}` (e.g. `<a href=\"/route-{{val}}\">`).",
      "Establish a document layout wrapper using semantic <section>.": "Create a semantic container using the `<section>` tag (e.g. `<section>Knight Guild</section>`).",
      "Create password parameter form input named input_{{var}}.": "Create an input form element using `<input type=\"password\" name=\"input_{{var}}\" />`.",
      "Create image tag mapping source to /images/{{var}}.png.": "Create an `<img>` tag with the source set to `/images/{{var}}.png` (e.g. `<img src=\"/images/{{var}}.png\" />`).",
      "Create unordered list containing list items.": "Create an HTML unordered list element `<ul>` containing at least one list item `<li>` element.",
      "Create paragraph element wrapping text welcome {{var}}.": "Create a paragraph element using `<p>welcome {{var}}</p>`.",
      "Create form layout pointing action to /submit-{{val}}.": "Create a `<form>` element with the action attribute set to `/submit-{{val}}`.",
      "Create submit button containing text Submit.": "Create a submit `<button>` element containing the text Submit (e.g. `<button type=\"submit\">Submit</button>`).",

      "Establish screen size query matching breakpoint max-width {{val}}px.": "Write a CSS media query rule using `@media (max-width: {{val}}px)`.",
      "Center align grid container named .{{var}}.": "Center align a class named `.{{var}}` inside a CSS rule using `margin: 0 auto;`.",
      "Define a root color variable named --{{var}} with value #{{val}}.": "Declare a root color variable inside a CSS rule using `--{{var}}: #{{val}};`.",
      "Define opacity transition duration of {{val}}ms on element .{{var}}.": "Apply an opacity transition rule inside `.{{var}}` class using `transition: opacity {{val}}ms ease-in-out;`.",
      "Format display flex direction to column on element .{{var}}.": "Format a display layout to column using `flex-direction: column;` inside the `.{{var}}` class.",

      "Declare component state variable tracker named {{var}} hook.": "Declare a React state variable hook using `const [{{var}}, set{{var}}] = useState({{val}});`.",
      "Initiate component hook useEffect mapping to function {{fun}}.": "Use the React `useEffect` hook to execute the function `{{fun}}()` on mount: `useEffect(() => { {{fun}}(); }, []);`.",
      "Destructure parameter value {{var}} from component props.": "Destructure a prop parameter from component props using `const { {{var}} } = props;`.",
      "Map items array returning children keys mapping to index {{var}}.": "Map an array in JSX using key attributes mapping to `item.{{var}}` (e.g. `items.map(item => <div key={item.{{var}}}>...`).",
      "Initialize React useRef referencing value {{var}}.": "Initialize a React ref hook using `const {{var}} = useRef({{val}});`.",

      "Declare variable {{var}} assigning value {{val}}.": "Declare a variable named `{{var}}` and assign it the value `{{val}}` (e.g. `{{var}} = {{val}}`).",
      "Construct Python function {{fun}} returning parameter value {{val}}.": "Define a Python function named `{{fun}}` that returns `{{val}}` (e.g. `def {{fun}}(): return {{val}}`).",
      "Map Python values from items matching elements greater than {{val}} into variable {{var}}.": "Create a Python list comprehension filtering elements greater than `{{val}}` using `{{var}} = [x for x in items if x > {{val}}]`.",
      "Create metadata mapping dict named {{var}} mapping key 'id' to {{val}}.": "Create a Python dictionary using the syntax `{{var}} = {'id': {{val}}}`.",
      "Apply safe except wrapper block routing error faults to function {{fun}}.": "Construct a Python try-except block that runs `{{fun}}()` inside `try:` and handles exceptions using `except Exception:`.",

      "Declare typed constant {{var}} assigning numeric value {{val}}.": "Declare a TypeScript constant of type number using the syntax `const {{var}}: number = {{val}};`.",
      "Establish types interface model named {{var}} holding numerical id parameter.": "Establish a TypeScript interface named `{{var}}` with an id property using the syntax `interface {{var}} { id: number; }`.",
      "Define variables instance {{var}} holding union type string or null.": "Declare a TypeScript union type variable using `let {{var}}: string | null = null;`.",
      "Create TS functional method {{fun}} returning typed number value {{val}}.": "Write a TypeScript function returning a typed number using `function {{fun}}(): number { return {{val}}; }`.",
      "Construct generic method mapper {{fun}} mapping type parameter T.": "Construct a generic TypeScript function using the syntax `function {{fun}}<T>(arg: T): T`.",

      "Filter relational db values from table {{var}} where index equals {{val}}.": "Write a SQL query using the syntax `SELECT * FROM {{var}} WHERE id = {{val}};`.",
      "Merge values from table user and table {{var}} using inner joins.": "Write a SQL query using the syntax `INNER JOIN {{var}} ON user.id = {{var}}.user_id`.",
      "Construct relational table schema named {{var}} holding numerical id parameter.": "Write a SQL command to CREATE a table named `{{var}}` with an id column of type INT: `CREATE TABLE {{var}} (id INT);`.",
      "Construct query index named index_{{var}} on target parameters.": "Write a SQL command to CREATE an index named `index_{{var}}` on the `user(id)` column: `CREATE INDEX index_{{var}} ON user(id);`.",
      "Apply updates modifying status column values to 'active' on table {{var}}.": "Write a SQL query to UPDATE the `{{var}}` table, setting the status column to active: `UPDATE {{var}} SET status = 'active';`.",

      "Declare immutable variable {{var}} assigning value {{val}}.": "Declare an immutable variable named `{{var}}` and assign it `{{val}}` (e.g. `let {{var}} = {{val}};`).",
      "Declare mutable variable {{var}} assigning value {{val}}.": "Declare a mutable variable named `{{var}}` and assign it `{{val}}` (e.g. `let mut {{var}} = {{val}};`).",
      "Apply pattern matching matches on state parameter {{var}}.": "Apply pattern matching on the state parameter `{{var}}` using a match block: `match {{var}} { ... }`.",
      "Create custom schema struct named {{var}} holding numerical id parameter.": "Create a struct named `{{var}}` holding a numerical id parameter: `struct {{var}} { id: i32 }`.",
      "Reference data resource wrapper dynamically utilizing variable {{var}}.": "Reference the data resource wrapper dynamically using variable `{{var}}` (e.g. `let {{var}} = &data;`).",

      "Bind local variable {{var}} assigning value {{val}} utilizing short assignments.": "Bind a local variable named `{{var}}` with the value `{{val}}` using the short variable assignment operator: `{{var}} := {{val}}`.",
      "Create functional Go routine {{fun}} returning int parameters value {{val}}.": "Create a Go function named `{{fun}}` that returns an int parameter of value `{{val}}`: `func {{fun}}() int { return {{val}} }`.",
      "Construct class models struct named {{var}} holding numerical id parameter.": "Construct a struct named `{{var}}` holding a numerical id parameter: `type {{var}} struct { id int }`.",
      "Initialize buffered channel named {{var}} holding capacity size {{val}}.": "Initialize a buffered channel named `{{var}}` with a buffer capacity of `{{val}}`: `{{var}} := make(chan int, {{val}})`.",
      "Schedule Go routine deferral callback executing function {{fun}}.": "Schedule a Go routine deferral callback that executes function `{{fun}}()`: `defer {{fun}}()`.",

      "Declare integer constant {{var}} assigning value {{val}}.": "Declare an integer constant named `{{var}}` and assign it the value `{{val}}`: `int {{var}} = {{val}};`.",
      "Allocate dynamic pointer variable {{var}} assigning heap reference size {{val}}.": "Allocate a dynamic pointer variable named `{{var}}` assigning a heap reference: `int* {{var}} = new int({{val}});`.",
      "Initialize collections vector named {{var}} mapping int elements.": "Initialize a vector collection named `{{var}}` holding integer elements: `std::vector<int> {{var}};`.",
      "Instantiate heap smart pointer unique_ptr {{var}} holding numerical reference {{val}}.": "Instantiate a unique smart pointer named `{{var}}` holding a reference value of `{{val}}`: `auto {{var}} = std::make_unique<int>({{val}});`.",
      "Construct structural class schema struct named {{var}} holding numerical id parameter.": "Construct a struct named `{{var}}` holding a numerical id parameter: `struct {{var}} { int id; };`.",

      "Construct Java class template named {{var}}.": "Construct a public Java class named `{{var}}`: `public class {{var}} {}`.",
      "Declare public int function {{fun}} returning parameter value {{val}}.": "Declare a public function named `{{fun}}` that returns an int of value `{{val}}`: `public int {{fun}}() { return {{val}}; }`.",
      "Initialize collection dynamic lists mapped named {{var}}.": "Initialize an ArrayList named `{{var}}` holding Integer elements: `List<Integer> {{var}} = new ArrayList<>();`.",
      "Wrap target exceptions faults route executing function {{fun}}.": "Wrap a try-catch block running `{{fun}}()` to handle standard Exceptions safely: `try { {{fun}}(); } catch (Exception e) {}`.",
      "Declare dynamic mapping schema binding String values to instances {{var}}.": "Declare a Map named `map` binding String keys to instances of type `{{var}}`: `Map<String, {{var}}> map = new HashMap<>();`."
    };

    if (translationMap[rawInstructions]) {
      instructions = translationMap[rawInstructions]
        .replace(/{{var}}/g, varName)
        .replace(/{{val}}/g, String(value))
        .replace(/{{fun}}/g, functionName)
        .replace(/{{index}}/g, String(i));
    } else {
      instructions = rawInstructions
        .replace(/{{var}}/g, varName)
        .replace(/{{val}}/g, String(value))
        .replace(/{{fun}}/g, functionName)
        .replace(/{{index}}/g, String(i));
    }

    const analogyMap: { [key: string]: string } = {
      "Mount custom gate header wrapping banner name {{var}}.": "Think of an HTML heading like the headline of a newspaper article. The `<h1>` tag defines the most important heading on a page, used to display the main title of the page.",
      "Create divider container wrapping content with id class {{var}}.": "A `<div>` tag is like an empty container box. It has no visual meaning on its own, but it is used to group other elements together so you can apply styles or layout rules.",
      "Create link anchor directing user to /route-{{val}}.": "A hyperlink anchor (`<a>`) is like a portal that connects two pages on the web. Clicking it instantly navigates the browser to the destination URL specified in the `href` attribute.",
      "Establish a document layout wrapper using semantic <section>.": "A `<section>` element is like a chapter in a book. It groups related content together under a single thematic header.",
      "Create password parameter form input named input_{{var}}.": "A password input is like a screen shield. As you type your credentials, it masks the characters with dots or stars to protect them from shoulder-surfing.",
      "Create image tag mapping source to /images/{{var}}.png.": "An image element (`<img>`) is like a picture frame hanging on a wall. It references a target URL and displays the graphic inside the frame.",
      "Create unordered list containing list items.": "An unordered list (`<ul>`) is like a bulleted shopping list: the items are displayed in a clean stack, but their order does not signify priority.",
      "Create paragraph element wrapping text welcome {{var}}.": "A paragraph element (`<p>`) is like a standard sentence box, adding clean vertical space before and after the text block.",
      "Create form layout pointing action to /submit-{{val}}.": "A `<form>` is like an envelope. You collect multiple user input fields inside it and send the bundle to a target URL handler.",
      "Create submit button containing text Submit.": "A button element is like a trigger button: clicking it dispatches action events or submits a parent form block.",

      "Establish screen size query matching breakpoint max-width {{val}}px.": "A media query breakpoint is like a fluid layout helper. It tells the web page to change its style rules automatically when the screen width shrinks below a specific size.",
      "Center align grid container named .{{var}}.": "Using `margin: 0 auto;` is like pulling an object to the absolute center of a shelf by pushing equal pads on its left and right sides.",
      "Define a root color variable named --{{var}} with value #{{val}}.": "A CSS variable is like a master paint bucket. Instead of styling each element individually, you define the color once at the root level and reuse it everywhere.",
      "Define opacity transition duration of {{val}}ms on element .{{var}}.": "A transition is like a smooth fade-in theater entrance rather than a sudden, jarring change.",
      "Format display flex direction to column on element .{{var}}.": "Flex direction column is like stacking plates in a single vertical tower instead of lining them up side-by-side on a table.",

      "Declare component state variable tracker named {{var}} hook.": "React state is like the memory of a component. It stores values that can change over time, forcing the component to redraw itself whenever the memory updates.",
      "Initiate component hook useEffect mapping to function {{fun}}.": "A `useEffect` hook is like a trigger that waits for the page load or state changes, and then runs side operations automatically.",
      "Destructure parameter value {{var}} from component props.": "Props destructuring is like unpacking a parcel at the door to get the exact items you need, instead of carrying the entire box around.",
      "Map items array returning children keys mapping to index {{var}}.": "Array map iteration is like taking a list of data items, wrapping each inside HTML templates, and rendering the decorated list dynamically.",
      "Initialize React useRef referencing value {{var}}.": "A React ref is like a persistent sticky note that remembers a value across renders without causing the component to redraw when it updates.",

      "Declare variable {{var}} assigning value {{val}}.": "Variables are labeled jars. Declaring a variable allocates a storage slot in memory, labeling it with a name so you can retrieve or overwrite the content later.",
      "Construct Python function {{fun}} returning parameter value {{val}}.": "A function is like a cookbook recipe. You define the steps once, and you can execute it as many times as you want with different parameters.",
      "Map Python values from items matching elements greater than {{val}} into variable {{var}}.": "List comprehensions are like automated sorting machines in a factory that filter out bad products and wrap the good ones into a new box in a single step.",
      "Create metadata mapping dict named {{var}} mapping key 'id' to {{val}}.": "A dictionary is like an actual language dictionary. You look up a unique key (the word) to immediately retrieve its associated value.",
      "Apply safe except wrapper block routing error faults to function {{fun}}.": "A try-except block is like a safety net for a tightrope walker. It lets the program perform risky operations, catching them gracefully if they fail.",

      "Declare typed constant {{var}} assigning numeric value {{val}}.": "TypeScript type annotations are like custom puzzle shapes. You can only insert matching circular tokens into circular slots.",
      "Establish types interface model named {{var}} holding numerical id parameter.": "A TypeScript interface is like a construction contract. It guarantees that any object signing the contract will possess the exact fields and types promised.",
      "Define variables instance {{var}} holding union type string or null.": "A union type is like a dual-slot container that can hold either a value or remain completely empty (null), but never an unrelated item.",
      "Create TS functional method {{fun}} returning typed number value {{val}}.": "A typed return signature is like a vending machine contract: you feed in correct currency inputs and the machine guarantees it outputs a drink.",
      "Construct generic method mapper {{fun}} mapping type parameter T.": "Generics are like shipping container frames: they fit any cargo inside, but once a cargo type is loaded, the container enforces that specific cargo shape.",

      "Filter relational db values from table {{var}} where index equals {{val}}.": "A SELECT WHERE query is like telling a librarian: 'Bring me all books on the shelf, but only if they were published after the year 2000.'",
      "Merge values from table user and table {{var}} using inner joins.": "An INNER JOIN is like matching puzzle pieces from two different tables using a shared ID column.",
      "Construct relational table schema named {{var}} holding numerical id parameter.": "CREATE TABLE is like drafting the architectural floor blueprint of a database table before you start inserting any records.",
      "Construct query index named index_{{var}} on target parameters.": "A database index is like the index pages at the back of a textbook: instead of reading page by page, you lookup the keyword to find the exact pages immediately.",
      "Apply updates modifying status column values to 'active' on table {{var}}.": "An UPDATE command is like changing the tag label on multiple folders in a filing cabinet at the same time.",

      "Declare immutable variable {{var}} assigning value {{val}}.": "A Rust immutable binding is like a stone carving: once the value is set, you cannot erase or modify it unless you explicitly mark it as mutable.",
      "Declare mutable variable {{var}} assigning value {{val}}.": "A Rust mutable binding is like a whiteboard: you can write a value down and easily overwrite it with a new value later.",
      "Apply pattern matching matches on state parameter {{var}}.": "Rust pattern matching is like a strict check at a border gate: every single case must be design-handled or matched explicitly.",
      "Create custom schema struct named {{var}} holding numerical id parameter.": "A struct is like a profile card that groups different data properties under a single named type.",
      "Reference data resource wrapper dynamically utilizing variable {{var}}.": "Borrowing in Rust is like reading a library book: you can read it as much as you want, but you must return it when your borrow time is up.",

      "Bind local variable {{var}} assigning value {{val}} utilizing short assignments.": "Bind a local variable named `{{var}}` with the value `{{val}}` using the Go short variable assignment operator (:=).",
      "Create functional Go routine {{fun}} returning int parameters value {{val}}.": "Create a Go function named `{{fun}}` that returns an int parameter of value `{{val}}`: `func {{fun}}() int { return {{val}} }`.",
      "Construct class models struct named {{var}} holding numerical id parameter.": "Construct a struct named `{{var}}` holding a numerical id parameter: `type {{var}} struct { id int }`.",
      "Initialize buffered channel named {{var}} holding capacity size {{val}}.": "Initialize a buffered channel named `{{var}}` with a buffer capacity of `{{val}}`: `{{var}} := make(chan int, {{val}})`.",
      "Schedule Go routine deferral callback executing function {{fun}}.": "Schedule a Go routine deferral callback that executes function `{{fun}}()`: `defer {{fun}}()`.",

      "Declare integer constant {{var}} assigning value {{val}}.": "Declare an integer constant named `{{var}}` and assign it the value `{{val}}`: `int {{var}} = {{val}};`.",
      "Allocate dynamic pointer variable {{var}} assigning heap reference size {{val}}.": "Allocate a dynamic pointer variable named `{{var}}` assigning a heap reference: `int* {{var}} = new int({{val}});`.",
      "Initialize collections vector named {{var}} mapping int elements.": "Initialize a vector collection named `{{var}}` holding integer elements: `std::vector<int> {{var}};`.",
      "Instantiate heap smart pointer unique_ptr {{var}} holding numerical reference {{val}}.": "Instantiate a unique smart pointer named `{{var}}` holding a reference value of `{{val}}`: `auto {{var}} = std::make_unique<int>({{val}});`.",
      "Construct structural class schema struct named {{var}} holding numerical id parameter.": "Construct a struct named `{{var}}` holding a numerical id parameter: `struct {{var}} { int id; };`.",

      "Construct Java class template named {{var}}.": "Construct a public Java class named `{{var}}`: `public class {{var}} {}`.",
      "Declare public int function {{fun}} returning parameter value {{val}}.": "Declare a public function named `{{fun}}` that returns an int of value `{{val}}`: `public int {{fun}}() { return {{val}}; }`.",
      "Initialize collection dynamic lists mapped named {{var}}.": "Initialize an ArrayList named `{{var}}` holding Integer elements: `List<Integer> {{var}} = new ArrayList<>();`.",
      "Wrap target exceptions faults route executing function {{fun}}.": "Wrap a try-catch block running `{{fun}}()` to handle standard Exceptions safely: `try { {{fun}}(); } catch (Exception e) {}`.",
      "Declare dynamic mapping schema binding String values to instances {{var}}.": "Declare a Map named `map` binding String keys to instances of type `{{var}}`: `Map<String, {{var}}> map = new HashMap<>();`."
    };

    const deepDiveMap: { [key: string]: string } = {
      "Mount custom gate header wrapping banner name {{var}}.": "Use exactly one `<h1>` tag per page for ideal search engine indexing. Headings should form a logical hierarchy (`<h1>` down to `<h6>`) for proper accessibility.",
      "Create divider container wrapping content with id class {{var}}.": "Avoid excessive nested divs (known as 'divitis'). Use semantic HTML tags like `<header>`, `<main>`, and `<footer>` where applicable to improve SEO.",
      "Create link anchor directing user to /route-{{val}}.": "Always ensure links have descriptive text. For external links, consider adding `target=\"_blank\"` and `rel=\"noopener noreferrer\"` to protect user security.",
      "Establish a document layout wrapper using semantic <section>.": "Use `<section>` for broad content groups that deserve a heading entry in the outline. Do not use it purely for styling layouts — use a `<div>` instead.",
      "Create password parameter form input named input_{{var}}.": "Always pair input fields with a `<label>` element for accessibility. Use the `name` attribute so that form submission handlers can parse inputs.",
      "Create image tag mapping source to /images/{{var}}.png.": "Always include an `alt` attribute describing the image content. This is a critical SEO standard and enables screen readers to parse the element.",
      "Create unordered list containing list items.": "List items (`<li>`) should always reside directly within a `<ul>` or `<ol>` parent container to maintain compliant document structures.",
      "Create paragraph element wrapping text welcome {{var}}.": "Avoid nesting layout blocks (like `<div>` or headings) inside a `<p>` tag, as browsers will force render correction lines.",
      "Create form layout pointing action to /submit-{{val}}.": "Always define a submit method (typically POST) on forms that transmit credentials or data updates to prevent URL leakage.",
      "Create submit button containing text Submit.": "Always set the `type` attribute on buttons explicitly (e.g. `type=\"button\"` or `type=\"submit\"`) to avoid default submission triggers.",

      "Establish screen size query matching breakpoint max-width {{val}}px.": "Always adopt a mobile-first design strategy. Define media breakpoints in relative units like `em` or `rem` to adapt to browser zoom preferences cleanly.",
      "Center align grid container named .{{var}}.": "This centering technique only works on block-level elements that have a defined `width` smaller than their parent container.",
      "Define a root color variable named --{{var}} with value #{{val}}.": "Declare custom properties within the `:root` pseudo-class for global scope. You can override them dynamically in sub-scopes or using JavaScript.",
      "Define opacity transition duration of {{val}}ms on element .{{var}}.": "Always set the transition property on the base element, not just the `:hover` state, to ensure the transition animates smoothly in both directions.",
      "Format display flex direction to column on element .{{var}}.": "Setting `flex-direction: column` swaps the main axis to vertical, meaning `justify-content` now controls vertical spacing and `align-items` controls horizontal alignments.",

      "Declare component state variable tracker named {{var}} hook.": "Never mutate state variables directly. Always use the setter function provided by the `useState` hook to schedule rendering updates.",
      "Initiate component hook useEffect mapping to function {{fun}}.": "Always declare all dependencies utilized inside the effect in the dependency array to prevent stale closure bugs or infinite rendering loops.",
      "Destructure parameter value {{var}} from component props.": "Destructuring makes your React parameter lists and code cleaner. You can also define fallback default values directly during destructuring.",
      "Map items array returning children keys mapping to index {{var}}.": "Always specify a unique, stable `key` prop on the root element of each mapped child to help React track DOM updates efficiently.",
      "Initialize React useRef referencing value {{var}}.": "Refs are ideal for storing references to actual DOM nodes (like focusing inputs) or storing timers that do not affect the visible layout.",

      "Declare variable {{var}} assigning value {{val}}.": "Use descriptive variable names for code readability. Choose between mutable declarations and immutable constant declarations based on your scope rules.",
      "Construct Python function {{fun}} returning parameter value {{val}}.": "Keep functions small, focused, and pure. A single function should ideally perform exactly one logical operation to maximize testability.",
      "Map Python values from items matching elements greater than {{val}} into variable {{var}}.": "List comprehensions are highly optimized. However, avoid writing overly complex nested comprehensions to maintain readability.",
      "Create metadata mapping dict named {{var}} mapping key 'id' to {{val}}.": "Dictionaries provide fast lookup times of O(1). Keys must be unique and immutable objects (like strings, numbers, or tuples).",
      "Apply safe except wrapper block routing error faults to function {{fun}}.": "Never use bare except clauses. Always catch specific exception classes (e.g. `ValueError`) to avoid accidentally masking unexpected bugs.",

      "Declare typed constant {{var}} assigning numeric value {{val}}.": "TypeScript checks type compatibility strictly at compile time, catching errors before they reach production. All types are completely stripped out at runtime.",
      "Establish types interface model named {{var}} holding numerical id parameter.": "Interfaces are highly extensible. You can extend interfaces or merge multiple declarations of the same interface automatically.",
      "Define variables instance {{var}} holding union type string or null.": "Use type narrowing check blocks (like `typeof` or checking for null) to safely handle union types in your function bodies.",
      "Create TS functional method {{fun}} returning typed number value {{val}}.": "Declaring return types explicitly makes your code self-documenting and prevents handlers from returning unexpected undefined outputs.",
      "Construct generic method mapper {{fun}} mapping type parameter T.": "Generics let you write highly reusable code blocks while maintaining full type safety. The compiler infers type variables automatically on invocation.",

      "Filter relational db values from table {{var}} where index equals {{val}}.": "Always filter data using WHERE queries to reduce network payloads. Index targeted columns to speed up search scan latency.",
      "Merge values from table user and table {{var}} using inner joins.": "Joins match tables based on foreign keys. Ensure join columns are indexed to prevent full table scans on large databases.",
      "Construct relational table schema named {{var}} holding numerical id parameter.": "Define correct constraints (PRIMARY KEY, NOT NULL, UNIQUE) when designing tables to enforce database integrity rules.",
      "Construct query index named index_{{var}} on target parameters.": "Indexes speed up queries significantly, but they slow down writes (INSERT, UPDATE) and consume extra storage disk space.",
      "Apply updates modifying status column values to 'active' on table {{var}}.": "Always verify your WHERE clauses before executing UPDATE queries to avoid accidentally modifying every row in the database.",

      "Declare immutable variable {{var}} assigning value {{val}}.": "Rust variables are immutable by default to prevent data races. Use `mut` only when you explicitly plan to change the bound value.",
      "Declare mutable variable {{var}} assigning value {{val}}.": "Mutable variables can be modified, but Rust ownership constraints guarantee that you can only have one mutable reference to a value at a time.",
      "Apply pattern matching matches on state parameter {{var}}.": "Rust `match` expressions are exhaustive: the compiler forces you to handle every possible value or variant, eliminating unhandled null cases.",
      "Create custom schema struct named {{var}} holding numerical id parameter.": "Structs allow you to define custom aggregate types. Implement logic on structs using `impl` blocks to keep operations clean.",
      "Reference data resource wrapper dynamically utilizing variable {{var}}.": "References do not take ownership of the data. Rust lifetime rules ensure that references are always valid and never outlive the original owner.",

      "Bind local variable {{var}} assigning value {{val}} utilizing short assignments.": "Bind a local variable named `{{var}}` with the value `{{val}}` using the short variable assignment operator (:=).",
      "Create functional Go routine {{fun}} returning int parameters value {{val}}.": "Create a Go function named `{{fun}}` that returns an int parameter of value `{{val}}`: `func {{fun}}() int { return {{val}} }`.",
      "Construct class models struct named {{var}} holding numerical id parameter.": "Construct a struct named `{{var}}` holding a numerical id parameter: `type {{var}} struct { id int }`.",
      "Initialize buffered channel named {{var}} holding capacity size {{val}}.": "Initialize a buffered channel named `{{var}}` with a buffer capacity of `{{val}}`: `{{var}} := make(chan int, {{val}})`.",
      "Schedule Go routine deferral callback executing function {{fun}}.": "Schedule a Go routine deferral callback that executes function `{{fun}}()`: `defer {{fun}}()`.",

      "Declare integer constant {{var}} assigning value {{val}}.": "Declare an integer constant named `{{var}}` and assign it the value `{{val}}`: `int {{var}} = {{val}};`.",
      "Allocate dynamic pointer variable {{var}} assigning heap reference size {{val}}.": "Allocate a dynamic pointer variable named `{{var}}` assigning a heap reference: `int* {{var}} = new int({{val}});`.",
      "Initialize collections vector named {{var}} mapping int elements.": "Initialize a vector collection named `{{var}}` holding integer elements: `std::vector<int> {{var}};`.",
      "Instantiate heap smart pointer unique_ptr {{var}} holding numerical reference {{val}}.": "Instantiate a unique smart pointer named `{{var}}` holding a reference value of `{{val}}`: `auto {{var}} = std::make_unique<int>({{val}});`.",
      "Construct structural class schema struct named {{var}} holding numerical id parameter.": "Construct a struct named `{{var}}` holding a numerical id parameter: `struct {{var}} { int id; };`.",

      "Construct Java class template named {{var}}.": "Construct a public Java class named `{{var}}`: `public class {{var}} {}`.",
      "Declare public int function {{fun}} returning parameter value {{val}}.": "Declare a public function named `{{fun}}` that returns an int of value `{{val}}`: `public int {{fun}}() { return {{val}}; }`.",
      "Initialize collection dynamic lists mapped named {{var}}.": "Initialize an ArrayList named `{{var}}` holding Integer elements: `List<Integer> {{var}} = new ArrayList<>();`.",
      "Wrap target exceptions faults route executing function {{fun}}.": "Wrap a try-catch block running `{{fun}}()` to handle standard Exceptions safely: `try { {{fun}}(); } catch (Exception e) {}`.",
      "Declare dynamic mapping schema binding String values to instances {{var}}.": "Declare a Map named `map` binding String keys to instances of type `{{var}}`: `Map<String, {{var}}> map = new HashMap<>();`."
    };

    let analogyText = `Concept analogy and runtime mental model explanation for ${title} under ${worldName}.`;
    if (analogyMap[rawInstructions]) {
      analogyText = analogyMap[rawInstructions]
        .replace(/{{var}}/g, varName)
        .replace(/{{val}}/g, String(value))
        .replace(/{{fun}}/g, functionName)
        .replace(/{{index}}/g, String(i));
    }

    let deepDiveText = `Deep dive documentation and best practices concerning ${title} implementations in ${worldName}.`;
    if (deepDiveMap[rawInstructions]) {
      deepDiveText = deepDiveMap[rawInstructions]
        .replace(/{{var}}/g, varName)
        .replace(/{{val}}/g, String(value))
        .replace(/{{fun}}/g, functionName)
        .replace(/{{index}}/g, String(i));
    }

    const starterCode = template.starterCode.replace(/{{var}}/g, varName).replace(/{{fun}}/g, functionName).replace(/{{val}}/g, String(value));

    result.push({
      id: `${worldId}-lvl-${i}`,
      levelNumber: i,
      title: `${title}`,
      tier: i < 40 ? 'Beginner' : i < 80 ? 'Intermediate' : 'Grandmaster',
      codex: {
        analogy: analogyText,
        blueprint: blueprint,
        deepDive: deepDiveText
      },
      instructions: instructions,
      initialCode: starterCode,
      validationRegex: validationRegex,
      hint: `Example: ${hint}`
    });
  }

  return result;
};

const cleanLegacyNames = (str: string): string => {
  return str
    .replace(/JS Academy/g, 'JavaScript')
    .replace(/HTML5 Fortress/g, 'HTML5')
    .replace(/CSS Armor Shop/g, 'CSS3')
    .replace(/React Kingdom/g, 'React')
    .replace(/Python Node/g, 'Python')
    .replace(/C\+\+ Shield/g, 'C++')
    .replace(/Java Core/g, 'Java')
    .replace(/Rust Grid/g, 'Rust')
    .replace(/TypeScript Temple/g, 'TypeScript')
    .replace(/SQL Vault/g, 'SQL')
    .replace(/Go Sanctum/g, 'Go')
    .replace(/C\# Castle/g, 'C#')
    .replace(/PHP Tavern/g, 'PHP')
    .replace(/Swift Swiftness/g, 'Swift')
    .replace(/Kotlin Kingdom/g, 'Kotlin');
};

export const worldSyllabus: SyllabusWorld[] = rawWorldSyllabus.map(world => {
  const cleanedExisting = world.levels.map(level => ({
    ...level,
    instructions: cleanText(level.instructions),
    initialCode: cleanText(level.initialCode),
    codex: {
      ...level.codex,
      analogy: cleanLegacyNames(cleanText(level.codex.analogy)),
      blueprint: cleanText(level.codex.blueprint),
      deepDive: cleanLegacyNames(cleanText(level.codex.deepDive))
    }
  }));

  return {
    ...world,
    levels: generateRemainingLevels(world.worldId, world.worldName, cleanedExisting)
  };
});
