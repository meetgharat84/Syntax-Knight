/* ═══════════════════════════════════════════════════════════════════
   projectsData.ts — Schema for Multi-File Project Quests
   
   Each GrandProject defines a complete multi-file coding quest with:
   - File tree structure & starter code
   - Sequential milestone steps with regex validation
   - Progressive hint system
   - Composite preview generator
   ═══════════════════════════════════════════════════════════════════ */

import { evaluateCode } from './lib/evaluator';

export interface ProjectFileDefinition {
  id: string;
  label: string;
  language: 'html' | 'css' | 'tsx' | 'ts' | 'json';
  icon: 'html' | 'css' | 'tsx' | 'component' | 'config';
  parentFolder?: string;
  starterCode: string;
}

export interface MilestoneStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  targetFile: string;         // The file ID the player should edit for this step
  instruction: string;        // Detailed instruction shown in the step panel
  validationRegex: string;    // Regex pattern string — evaluated via new RegExp()
  regexFlags?: string;        // Optional regex flags (default: 'is')
  successMessage: string;
  errorMessage: string;
  xpReward: number;
  hints: StepHint[];
}

export interface StepHint {
  level: number;              // 1 = gentle nudge, 2 = strong clue, 3 = near-solution
  text: string;
  xpPenalty: number;          // XP deducted from step reward for using this hint
}

export interface GrandProject {
  id: string;
  title: string;
  subtitle: string;
  questLabel: string;
  missionId: string;          // Used with GameContext completeMission()
  totalXP: number;
  files: ProjectFileDefinition[];
  steps: MilestoneStep[];
  previewGenerator: 'portfolio';  // Strategy key for preview composition
}

/* ═══════════════════════════════════════════════════════════════════
   PROJECT 1: CYBERPUNK PORTFOLIO ARCHITECTURE
   ═══════════════════════════════════════════════════════════════════ */

const PORTFOLIO_FILES: ProjectFileDefinition[] = [
  {
    id: 'index.html',
    label: 'index.html',
    language: 'html',
    icon: 'html',
    starterCode: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Portfolio</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <!-- TODO: Add the root div and script tag -->
</body>
</html>`,
  },
  {
    id: 'styles.css',
    label: 'styles.css',
    language: 'css',
    icon: 'css',
    starterCode: `/* ═══ CYBERPUNK PORTFOLIO STYLES ═══ */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Inter', system-ui, sans-serif;
  background: #0a0a0f;
  color: #e2e8f0;
  min-height: 100vh;
}

/* TODO: Add hero section, nav bar, and button styles */`,
  },
  {
    id: 'App.tsx',
    label: 'App.tsx',
    language: 'tsx',
    icon: 'tsx',
    starterCode: `// TODO: Import Hero component and build the App layout

export default function App() {
  return (
    <div className="app">
      {/* TODO: Add navigation bar and Hero component */}
    </div>
  );
}`,
  },
  {
    id: 'Hero.tsx',
    label: 'Hero.tsx',
    language: 'tsx',
    icon: 'component',
    parentFolder: 'components',
    starterCode: `// TODO: Build the Hero section component

export default function Hero() {
  return (
    <section>
      {/* TODO: Add hero title, subtitle, and CTA button */}
    </section>
  );
}`,
  },
];

const PORTFOLIO_STEPS: MilestoneStep[] = [
  /* ── STEP 1: HTML Foundation ── */
  {
    id: 'html-foundation',
    stepNumber: 1,
    title: 'Lay the Foundation',
    description: 'Set up the HTML skeleton with a root mount point.',
    targetFile: 'index.html',
    instruction: 'Inside the `<body>` tag of **index.html**, add a `<div>` element with `id="root"` and a `<script>` tag with `type="module"` pointing to `App.tsx`. This creates the mount point for your React application.',
    validationRegex: '<div\\s+id=["\']root["\']\\s*>\\s*<\\/div>[\\s\\S]*<script\\s+type=["\']module["\']',
    regexFlags: 'i',
    successMessage: 'HTML foundation locked in! The root mount point is ready.',
    errorMessage: 'Missing <div id="root"> and/or <script type="module"> inside the body.',
    xpReward: 80,
    hints: [
      { level: 1, text: 'You need two elements inside <body>: a div for React to mount into, and a script tag to load your app module.', xpPenalty: 10 },
      { level: 2, text: 'The div needs id="root" and the script needs type="module" with src="App.tsx".', xpPenalty: 20 },
      { level: 3, text: 'Add: <div id="root"></div> and <script type="module" src="App.tsx"></script>', xpPenalty: 35 },
    ],
  },

  /* ── STEP 2: CSS Hero Styling ── */
  {
    id: 'css-hero-styles',
    stepNumber: 2,
    title: 'Forge the Visual Identity',
    description: 'Create the CSS classes for the hero section and navigation.',
    targetFile: 'styles.css',
    instruction: 'In **styles.css**, define three CSS class rules: `.hero-section` (for the hero container with flexbox centering), `.hero-title` (for the gradient heading), and `.nav-bar` (for the fixed navigation). Each class must exist as a valid CSS rule block.',
    validationRegex: '\\.hero-section\\s*\\{[\\s\\S]*?\\}[\\s\\S]*\\.hero-title\\s*\\{[\\s\\S]*?\\}[\\s\\S]*\\.nav-bar\\s*\\{[\\s\\S]*?\\}',
    regexFlags: 'i',
    successMessage: 'Visual identity forged! Hero section and navigation styles are defined.',
    errorMessage: 'Missing one or more required CSS classes: .hero-section, .hero-title, .nav-bar',
    xpReward: 100,
    hints: [
      { level: 1, text: 'You need three CSS rule blocks. Each starts with a class selector (dot + name) followed by curly braces with properties inside.', xpPenalty: 12 },
      { level: 2, text: 'Define .hero-section { ... } with display: flex, then .hero-title { ... } for the heading, and .nav-bar { ... } for the top navigation.', xpPenalty: 25 },
      { level: 3, text: 'Add these blocks:\n.hero-section { min-height: 100vh; display: flex; align-items: center; justify-content: center; }\n.hero-title { font-size: 3rem; font-weight: 800; }\n.nav-bar { position: fixed; top: 0; width: 100%; }', xpPenalty: 40 },
    ],
  },

  /* ── STEP 3: CTA Button Style ── */
  {
    id: 'css-cta-button',
    stepNumber: 3,
    title: 'Craft the Call to Action',
    description: 'Style the CTA button with a gradient and hover effects.',
    targetFile: 'styles.css',
    instruction: 'Add a `.cta-button` CSS class in **styles.css** with styling for the call-to-action button. Include a `background` property (use a gradient or solid color) and a `.cta-button:hover` rule for interactivity.',
    validationRegex: '\\.cta-button\\s*\\{[\\s\\S]*?background[:\\s][\\s\\S]*?\\}[\\s\\S]*\\.cta-button:hover\\s*\\{[\\s\\S]*?\\}',
    regexFlags: 'i',
    successMessage: 'CTA button forged! The action trigger is styled and interactive.',
    errorMessage: 'Missing .cta-button class with background property, or missing .cta-button:hover rule.',
    xpReward: 80,
    hints: [
      { level: 1, text: 'Define a .cta-button class with background styling and add a separate :hover pseudo-class rule.', xpPenalty: 10 },
      { level: 2, text: 'Use background: linear-gradient(...) or a solid color inside .cta-button { }, then add .cta-button:hover { transform: translateY(-2px); }', xpPenalty: 20 },
      { level: 3, text: '.cta-button { padding: 0.85rem 2rem; background: linear-gradient(135deg, #06b6d4, #8b5cf6); border: none; border-radius: 12px; color: white; cursor: pointer; }\n.cta-button:hover { transform: translateY(-2px); }', xpPenalty: 35 },
    ],
  },

  /* ── STEP 4: Hero Component ── */
  {
    id: 'hero-component',
    stepNumber: 4,
    title: 'Assemble the Hero Component',
    description: 'Build the Hero.tsx React component with the correct class names.',
    targetFile: 'Hero.tsx',
    instruction: 'In **Hero.tsx**, build the hero section using JSX. Your component must return a `<section>` with `className="hero-section"`, containing an `<h1>` with `className="hero-title"`, a `<p>` for the subtitle, and a `<button>` with `className="cta-button"`. Don\'t forget `export default`.',
    validationRegex: 'export\\s+default\\s+function\\s+Hero[\\s\\S]*className=["\']hero-section["\'][\\s\\S]*className=["\']hero-title["\'][\\s\\S]*<button[\\s\\S]*className=["\']cta-button["\']',
    regexFlags: 'i',
    successMessage: 'Hero component assembled! The visual centerpiece is ready for battle.',
    errorMessage: 'Hero.tsx must export default a Hero function with hero-section, hero-title, and cta-button classNames.',
    xpReward: 120,
    hints: [
      { level: 1, text: 'Your Hero function should return JSX with a <section>, <h1>, <p>, and <button> — each using the correct className from your CSS.', xpPenalty: 15 },
      { level: 2, text: 'Use className="hero-section" on the <section>, className="hero-title" on the <h1>, and className="cta-button" on the <button>.', xpPenalty: 30 },
      { level: 3, text: 'export default function Hero() {\n  return (\n    <section className="hero-section">\n      <h1 className="hero-title">Digital Architect</h1>\n      <p>Full-stack developer</p>\n      <button className="cta-button">VIEW MY WORK</button>\n    </section>\n  );\n}', xpPenalty: 50 },
    ],
  },

  /* ── STEP 5: App Composition ── */
  {
    id: 'app-composition',
    stepNumber: 5,
    title: 'Wire the Architecture',
    description: 'Import Hero and compose the full App layout with navigation.',
    targetFile: 'App.tsx',
    instruction: 'In **App.tsx**, import the Hero component from `./components/Hero`. Inside the App function, render a `<nav>` with `className="nav-bar"` containing a logo span, and render the `<Hero />` component below it.',
    validationRegex: 'import\\s+Hero\\s+from[\\s\\S]*<nav[\\s\\S]*className=["\']nav-bar["\'][\\s\\S]*<Hero\\s*\\/?>',
    regexFlags: 'i',
    successMessage: 'Architecture wired! All components are connected. The portfolio is alive!',
    errorMessage: 'App.tsx needs: import Hero, a <nav className="nav-bar">, and a <Hero /> component render.',
    xpReward: 120,
    hints: [
      { level: 1, text: 'You need an import statement at the top, a nav element with the right className, and the Hero component rendered as JSX.', xpPenalty: 15 },
      { level: 2, text: 'Add import Hero from \'./components/Hero\'; at the top. Inside the return, add <nav className="nav-bar">...</nav> then <Hero />.', xpPenalty: 30 },
      { level: 3, text: 'import Hero from \'./components/Hero\';\n\nexport default function App() {\n  return (\n    <div className="app">\n      <nav className="nav-bar">\n        <span className="nav-logo">CYBERFOLIO</span>\n      </nav>\n      <Hero />\n    </div>\n  );\n}', xpPenalty: 50 },
    ],
  },
];

export const CYBERPUNK_PORTFOLIO_PROJECT: GrandProject = {
  id: 'cyberpunk-portfolio',
  title: 'CYBERPUNK PORTFOLIO ARCHITECTURE',
  subtitle: 'Build a complete cyberpunk-themed developer portfolio from scratch',
  questLabel: 'QUEST: CYBERPUNK PORTFOLIO ARCHITECTURE',
  missionId: 'react-project',
  totalXP: 500,
  files: PORTFOLIO_FILES,
  steps: PORTFOLIO_STEPS,
  previewGenerator: 'portfolio',
};

/* ═══════════════════════════════════════════════════════════════════
   PROJECT REGISTRY — add future projects here
   ═══════════════════════════════════════════════════════════════════ */
export const ALL_PROJECTS: GrandProject[] = [
  CYBERPUNK_PORTFOLIO_PROJECT,
];

/* ═══════════════════════════════════════════════════════════════════
   PREVIEW GENERATORS — compose multi-file output into renderable HTML
   ═══════════════════════════════════════════════════════════════════ */
export function generateProjectPreview(
  projectType: GrandProject['previewGenerator'],
  fileContents: Record<string, string>,
): string {
  switch (projectType) {
    case 'portfolio':
      return generatePortfolioPreview(fileContents);
    default:
      return '<html><body><p>Preview not available</p></body></html>';
  }
}

function generatePortfolioPreview(files: Record<string, string>): string {
  const css = files['styles.css'] || '';
  const hero = files['Hero.tsx'] || '';
  const app = files['App.tsx'] || '';

  // Extract JSX body from Hero.tsx
  const heroJsxMatch = hero.match(/return\s*\(\s*([\s\S]*?)\s*\)\s*;?\s*}/);
  let heroHtml = heroJsxMatch ? heroJsxMatch[1] : '';
  heroHtml = heroHtml.replace(/className=/g, 'class=');

  // Extract JSX body from App.tsx
  const appJsxMatch = app.match(/return\s*\(\s*([\s\S]*?)\s*\)\s*;?\s*}/);
  let appHtml = appJsxMatch ? appJsxMatch[1] : '';
  appHtml = appHtml.replace(/className=/g, 'class=');
  // Replace <Hero /> or <Hero> with extracted hero HTML
  appHtml = appHtml.replace(/<Hero\s*\/?>/, heroHtml);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>${css}</style>
  <style>
    body { background: #0a0a0f; margin: 0; }
    * { font-family: 'Inter', system-ui, sans-serif; }
  </style>
</head>
<body>${appHtml}</body>
</html>`;
}

/* ═══════════════════════════════════════════════════════════════════
   VALIDATION RUNNER — executes regex .test() against file content
   ═══════════════════════════════════════════════════════════════════ */
export interface ValidationResult {
  passed: boolean;
  errorMessage: string;
}

export function runStepValidation(
  step: MilestoneStep,
  fileContents: Record<string, string>,
): ValidationResult {
  const targetContent = fileContents[step.targetFile] || '';
  const evalResult = evaluateCode(targetContent, step.validationRegex, 'react');

  return {
    passed: evalResult.isCorrect,
    errorMessage: evalResult.isCorrect ? '' : (evalResult.errorMsg || step.errorMessage),
  };
}
