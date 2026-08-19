"use client";

import { useState, useEffect, useRef } from 'react';
// @ts-ignore
import { supabase } from './supabaseClient';
import { useGame } from './GameContext';
import { worldSyllabus } from './syllabusData';
import { evaluateCode } from './lib/evaluator';
import { motion, AnimatePresence } from 'framer-motion';
import HeroSection from './HeroSection';
import AuthMatrix from './AuthMatrix';
import {
  Sparkles,
  ArrowLeft,
  Lock,
  Swords,
  Trophy,
  Cpu,
  Play,
  RotateCcw,
  Crown,
  AlertTriangle,
  Settings,
  Trash2,
  Volume2,
  VolumeX,
  X,
  LogOut,
  Bot,
  User,
  Mail,
  Calendar,
  Send,
  Upload,
  UserCheck,
  Code,
  Terminal,
  Database,
  Layers,
  Flame,
  Menu
} from 'lucide-react';
import { audioEngine } from './audioEngine';
import { ThreeDTilt } from './components/ThreeDTilt';

// Get API Key securely (Next.js syntax)
const API_KEY = process.env.NEXT_PUBLIC_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_BYTEZ_API_KEY || process.env.BYTEZ_API_KEY || '';


const SKILL_TRACKS = [
  {
    id: 'all',
    name: '🌟 ALL MODULES',
    description: 'Access all programming languages and operational environments.',
    modules: []
  },
  {
    id: 'web-ui',
    name: '🎨 Track 1: Web & UI',
    description: 'Structure, layout, style rules, and component architectures.',
    modules: ['HTML5', 'CSS3', 'React', 'PHP']
  },
  {
    id: 'core-logic',
    name: '🧠 Track 2: Core Logic',
    description: 'Conditionals, lists, loops, dynamic logic, and scope bounds.',
    modules: ['JavaScript', 'TypeScript', 'Python', 'Kotlin', 'Swift']
  },
  {
    id: 'systems-data',
    name: '📊 Track 3: Systems & Data',
    description: 'Low-level structures, heap memory, types safety, and queries.',
    modules: ['C++', 'Java', 'Rust', 'Go', 'C#', 'SQL']
  },
  {
    id: 'engineering-tools',
    name: '⚙️ Track 4: Tools & Eng',
    description: 'Version control, cloud containers, testing pipelines, and security.',
    modules: ['Command Line & Git', 'DevOps & Containers', 'Data Structures & Algorithms', 'Web Security & APIs', 'Testing & QA']
  }
];

const mockDbRecords = [
  { id: 1, name: 'HTML5', status: 'COMPLETED' },
  { id: 2, name: 'CSS3', status: 'ACTIVE' },
  { id: 3, name: 'JavaScript', status: 'LOCKED' },
  { id: 4, name: 'React', status: 'LOCKED' },
  { id: 5, name: 'Practice Playgrounds', status: 'RESTRICTED' },
];

const WORLD_CARDS_DATA = [
  {
    name: 'HTML5',
    label: 'MODULE 1',
    title: 'HTML5 Document Structure',
    desc: 'Structure construction challenges.',
    locked: false,
    metrics: 'SEO_OPTIMIZED / SEMANTIC_HTML',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 22h20L12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
      </svg>
    )
  },
  {
    name: 'CSS3',
    label: 'MODULE 2',
    title: 'CSS Flexbox & Grids',
    desc: 'Aesthetic styling & flex alignments.',
    locked: false,
    metrics: 'FLEXBOX / GRID / REACTION_ANIMATIONS',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
      </svg>
    )
  },
  {
    name: 'JavaScript',
    label: 'MODULE 3',
    title: 'JavaScript Core Logic',
    desc: 'Logic algorithms & dynamic variables.',
    locked: false,
    metrics: 'ES6+ / ASYNC_AWAIT / MEMORY_HEAPS',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
      </svg>
    )
  },
  {
    name: 'React',
    label: 'MODULE 4',
    title: 'React UI Components',
    desc: 'Component architecture controls.',
    locked: false,
    metrics: 'JSX_DOM / HOOKS / FIBER_RECONCILER',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
      </svg>
    )
  },
  {
    name: 'Python',
    label: 'MODULE 5',
    title: 'Python Dynamic Scripting',
    desc: 'Scripting pipelines & syntax arrays.',
    locked: false,
    metrics: 'NUMPY / PYTORCH / DEEP_LEARNING',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.9 1a3.7 3.7 0 0 0-3.6 3.7v2.3h7.2V4.7A3.7 3.7 0 0 0 11.9 1zm-2.7 8.3c-2 0-3.7 1.7-3.7 3.7v3.7a3.7 3.7 0 0 0 3.7 3.7h1.9v-2.3H9.2a1.4 1.4 0 0 1-1.4-1.4v-1.4h7.2v-1.4H7.8v-1.4a1.4 1.4 0 0 1 1.4-1.4h5.6c.8 0 1.4.6 1.4 1.4V16h2.3v-3.7c0-2-1.7-3.7-3.7-3.7H9.2z" />
      </svg>
    )
  },
  {
    name: 'C++',
    label: 'MODULE 6',
    title: 'C++ Low-level Memory',
    desc: 'Pointers, allocs & memory control.',
    locked: false,
    metrics: 'POINTER_REF / SEGFAULT_PREVENTION',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H8v-3H5v-2h3V8h3v3h3v2h-3v3zm8-3h-2v2h-2v-2h-2v-2h2V9h2v2h2v2z" />
      </svg>
    )
  },
  {
    name: 'Java',
    label: 'MODULE 7',
    title: 'Java Enterprise OOP',
    desc: 'Enterprise class entity creation.',
    locked: false,
    metrics: 'OOP_HIERARCHY / JVM_GARBAGE_COLLECTOR',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 18.5a1.5 1.5 0 0 0 1.5 1.5h17a1.5 1.5 0 0 0 1.5-1.5v-2H2v2zm16-14l-2 3.5h4L18 4.5zM6 14.5a3.5 3.5 0 0 1 3.5-3.5h5a3.5 3.5 0 0 1 3.5 3.5v1H6v-1zm4.5-9.5l-2.5 5H13L10.5 5z" />
      </svg>
    )
  },
  {
    name: 'Rust',
    label: 'MODULE 8',
    title: 'Rust Memory Safety',
    desc: 'Bulletproof borrow checker rules.',
    locked: false,
    metrics: 'BORROW_CHECKER / ZERO_COST_ABSTRACTIONS',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z M12 4a8 8 0 0 1 8 8 7.9 7.9 0 0 1-2.3 5.7l-1.4-1.4A5.9 5.9 0 0 0 18 12a6 6 0 1 0-12 0 5.9 5.9 0 0 0 1.7 4.3L6.3 17.7A7.9 7.9 0 0 1 4 12a8 8 0 0 1 8-8z" />
      </svg>
    )
  },
  {
    name: 'TypeScript',
    label: 'MODULE 9',
    title: 'TypeScript Strict Schemas',
    desc: 'Static type seals & interface rules.',
    locked: false,
    metrics: 'TYPES_SAFETY / COMPILE_TIME_CHECKS',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 10h3v8H6v-8zm10.5 8c-1.5 0-2.5-1-2.5-2.5h2c0 .5.3.8.8.8s.7-.3.7-.7c0-.5-.3-.7-1-1-1.2-.4-2-.8-2-2s.8-2 2-2 2.2 1 2.2 2.5h-2c0-.5-.3-.8-.7-.8s-.6.3-.6.6c0 .4.3.6 1 .9 1.2.4 2 .8 2 2s-.9 2.2-2.1 2.2z" />
      </svg>
    )
  },
  {
    name: 'SQL',
    label: 'MODULE 10',
    title: 'SQL Relational Queries',
    desc: 'Relational database schemas.',
    locked: false,
    metrics: 'RELATIONAL_SCHEMAS / AGGREGATIONS',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 4.02 2 6.5s4.48 4.5 10 4.5 10-2.02 10-4.5S17.52 2 12 2zm0 12c-5.52 0-10-2.02-10-4.5V14c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5v-4.5c0 2.48-4.48 4.5-10 4.5zm0 5.5c-5.52 0-10-2.02-10-4.5v2c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5v-2c0 2.48-4.48 4.5-10 4.5z" />
      </svg>
    )
  },
  {
    name: 'Go',
    label: 'MODULE 11',
    title: 'Go Concurrent Systems',
    desc: 'Goroutines & concurrency channels.',
    locked: false,
    metrics: 'GOROUTINES / CONCURRENCY_CHANNELS',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 2c-3.03 0-5.5 2.47-5.5 5.5v5.5c0 3.03 2.47 5.5 5.5 5.5s5.5-2.47 5.5-5.5V7.5c0-3.03-2.47-5.5-5.5-5.5zm0 13c-1.38 0-2.5-1.12-2.5-2.5V11h5v1.5c0 1.38-1.12 2.5-2.5 2.5zM6 6c-2.2 0-4 1.8-4 4v4c0 2.2 1.8 4 4 4h1v-2H6c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h1V6H6z" />
      </svg>
    )
  },
  {
    name: 'C#',
    label: 'MODULE 12',
    title: 'C# OOP & Linq',
    desc: 'LINQ query sets & async tasks.',
    locked: false,
    metrics: 'LINQ_QUERIES / ASYNC_AWAIT',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12c0 6.627-5.373 12-12 12S0 19.627 0 12 5.373 0 12 0s12 5.373 12 12zm-14.5 4h9v-2h-9v2zm0-6h9V8h-9v2z" />
      </svg>
    )
  },
  {
    name: 'PHP',
    label: 'MODULE 13',
    title: 'PHP Web Backend',
    desc: 'Variables, sessions & db connectors.',
    locked: false,
    metrics: 'PDO_DATABASE / SERVER_SIDE',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    )
  },
  {
    name: 'Swift',
    label: 'MODULE 14',
    title: 'Swift iOS Foundation',
    desc: 'Mutable reference blocks & protocols.',
    locked: false,
    metrics: 'MUTABILITY_SAFETY / PROTOCOLS',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 13.5l3.5-3.5 3 3 8.5-8.5-1.5-1.5L9 9.5l-3-3L1 11.5l1.5 2z" />
      </svg>
    )
  },
  {
    name: 'Kotlin',
    label: 'MODULE 15',
    title: 'Kotlin Android & Coroutines',
    desc: 'Null safety & suspend coroutines.',
    locked: false,
    metrics: 'NULL_SAFETY / COROUTINES',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 22h20L12 2zm0 4l6.5 13h-13L12 6z" />
      </svg>
    )
  },
  {
    name: 'Command Line & Git',
    label: 'MODULE 16',
    title: 'Git & Command Line Shell',
    desc: 'Bash commands & version control.',
    locked: false,
    metrics: 'SHELL_SCRIPTING / GIT_VERSION_CONTROL',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v5z" />
      </svg>
    )
  },
  {
    name: 'DevOps & Containers',
    label: 'MODULE 17',
    title: 'Docker & Kubernetes Cloud',
    desc: 'Containerization & deployment pipelines.',
    locked: false,
    metrics: 'DOCKER / K8S / GITHUB_ACTIONS',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 2h20v20H2V2zm4 4v12h12V6H6z" />
      </svg>
    )
  },
  {
    name: 'Data Structures & Algorithms',
    label: 'MODULE 18',
    title: 'DSA & Coding Complexity',
    desc: 'Core DSA concepts & search sorting.',
    locked: false,
    metrics: 'BIG_O / TREE_GRAPH_LINKEDLIST',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 3H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 10H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zm10-10h-4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 10h-4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2z" />
      </svg>
    )
  },
  {
    name: 'Web Security & APIs',
    label: 'MODULE 19',
    title: 'OWASP Security & GraphQL',
    desc: 'SQLi, XSS defense & GraphQL schemas.',
    locked: false,
    metrics: 'XSS_SQLI_PREVENTION / GRAPHQL_NOSQL',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 12c-2.7 0-5.08-1.57-6.22-3.88.08-.94.75-1.78 1.72-2.12C8.75 12.37 10.3 12 12 12s3.25.37 4.5.99c.97.34 1.64 1.18 1.72 2.12C17.08 17.43 14.7 19 12 19z" />
      </svg>
    )
  },
  {
    name: 'Testing & QA',
    label: 'MODULE 20',
    title: 'Jest, Playwright & Quality',
    desc: 'Unit testing, E2E Cypress assertion.',
    locked: false,
    metrics: 'JEST_EXPECT / CYPRESS_E2E',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
    )
  }
];


// Interfaces & Datatypes
interface Challenge {
  id: string;
  title: string;
  analogy: string;
  blueprint: string;
  deepDive: string;
  targetFile: string;
  expectedToken: string;
  instruction: string;
  starterCode: string;
  hint: string;
}

const CHALLENGES_DATABASE: Record<string, Challenge[]> = {
  'HTML5': [
    {
      id: 'html-01',
      title: 'Castle Gate Heading',
      analogy: 'HTML tags act as the structural anchors of your kingdom. An <h1> heading is like mounting a massive banner emblem on your castle gate.',
      blueprint: '```html\n<h1>MOTHERSHIP BEACON</h1>\n```',
      deepDive: 'Use exactly one <h1> per viewport context to enforce ideal SEO indexing. Always pair and close your heading elements.',
      targetFile: 'index.html',
      expectedToken: '<h1[^>]*>\\\\s*[^<]+\\\\s*</h1>',
      instruction: 'Mount your castle name by wrapping "IRONCLAD KEEP" inside <h1> and </h1> tags:',
      starterCode: '<!-- Mount gate banner here -->\n',
      hint: 'Type: <h1>IRONCLAD KEEP</h1>'
    }
  ],
  'CSS3': [
    {
      id: 'css-01',
      title: 'Weapon Rack Alignment',
      analogy: 'In CSS, Flexbox aligns layout blocks dynamically. Think of layout items as combat swords aligning inside a weapon storage rack.',
      blueprint: '```css\njustify-content: center;\n```',
      deepDive: 'Ensure display: flex is set before aligning. justify-content distributes space along the main axis.',
      targetFile: 'layout.css',
      expectedToken: 'justify-content: center;',
      instruction: 'Define the flex alignment property to align items at the center of the shelf:',
      starterCode: '#weapon-rack {\n  display: flex;\n  /* ALIGN HERE */\n}',
      hint: 'Type: justify-content: center;'
    }
  ],
  'JavaScript': [
    {
      id: 'js-01',
      title: 'Variable Binding',
      analogy: 'In JS, variables store mana payloads. To prevent reassignment and maintain strict bindings, declare constants.',
      blueprint: '```javascript\nconst spell = "fireball";\n```',
      deepDive: 'const enforces block-level immutable bindings. Avoid var completely to prevent scope hoisting bugs.',
      targetFile: 'spells.js',
      expectedToken: 'const spell = "fireball";',
      instruction: 'Declare a read-only variable named "spell" and bind it to the string "fireball":',
      starterCode: '// Declare crystal mana variable\n',
      hint: 'Type: const spell = "fireball";'
    }
  ],
  'Python': [
    {
      id: 'py-01',
      title: 'AI Network Arrays',
      analogy: 'Python lists organize sequence data arrays like neural path networks inside an AI core brain.',
      blueprint: '```python\nlayers = [64, 128, 256]\n```',
      deepDive: 'Python lists are dynamically sized mutable sequences. Appending elements operates in O(1) time.',
      targetFile: 'model.py',
      expectedToken: 'layers = [64, 128, 256]',
      instruction: 'Declare a python list named "layers" containing the integers 64, 128, and 256:',
      starterCode: '# Initialize AI network configuration\n',
      hint: 'Type: layers = [64, 128, 256]'
    }
  ],
  'C++': [
    {
      id: 'cpp-01',
      title: 'Direct Pointer Safety',
      analogy: 'C++ pointers directly reference physical layout memory coordinates, acting as raw memory addresses.',
      blueprint: '```cpp\nint* ptr = &mana;\n```',
      deepDive: 'Ensure direct references are valid. Dereferencing unallocated memory pointers will trigger immediate stack segment faults.',
      targetFile: 'shield.cpp',
      expectedToken: 'int* ptr = &mana;',
      instruction: 'Create an integer pointer variable named "ptr" and assign it to the address of "mana":',
      starterCode: 'int mana = 100;\n// Bind pointer address here\n',
      hint: 'Type: int* ptr = &mana;'
    }
  ],
  'Java': [
    {
      id: 'java-01',
      title: 'Enterprise Instance Creator',
      analogy: 'Java classes organize enterprise matrices. Instantiating class entities spawns functional logic structures.',
      blueprint: '```java\nMage mage = new Mage();\n```',
      deepDive: 'New keyword instantiates heap memory elements. Java garbage collectors manage allocations automatically.',
      targetFile: 'EnterpriseCore.java',
      expectedToken: 'Mage mage = new Mage();',
      instruction: 'Instantiate a new "Mage" object class structure and assign it to a "mage" reference variable:',
      starterCode: 'public class EnterpriseCore {\n  public void initialize() {\n    // Instantiate mage class object\n  }\n}\n',
      hint: 'Type: Mage mage = new Mage();'
    }
  ],
  'Rust': [
    {
      id: 'rust-01',
      title: 'Bulletproof Borrow Checking',
      analogy: 'Rust compiler borrow checkers enforce strict reference access ownership blocks to prevent race conditions.',
      blueprint: '```rust\nlet key = &ref_val;\n```',
      deepDive: 'References are strictly bound by scope lifetimes. Rust prevents concurrent mutation of shared variables.',
      targetFile: 'main.rs',
      expectedToken: 'let key = &ref_val;',
      instruction: 'Bind an immutable reference variable named "key" referencing the variable "ref_val":',
      starterCode: 'fn main() {\n  let ref_val = 42;\n  // Borrow immutable reference\n}\n',
      hint: 'Type: let key = &ref_val;'
    }
  ],
  'TypeScript': [
    {
      id: 'ts-01',
      title: 'Static Type Seals',
      analogy: 'In vanilla JS, variables are unlabeled boxes where anything can be dropped. TypeScript annotations put strict magical seals on them.',
      blueprint: '```typescript\nlet score: number = 100;\n```',
      deepDive: 'Type annotations are checked exclusively during compilation and are stripped away during transpilation.',
      targetFile: 'app.ts',
      expectedToken: 'let score: number = 100;',
      instruction: 'Declare a variable score with static type number and assign it the value 100:',
      starterCode: '// Declare score with number type and assign 100\n',
      hint: 'Type: let score: number = 100;'
    }
  ],
  'SQL': [
    {
      id: 'sql-01',
      title: 'Retrieve Knight Records',
      analogy: 'Searching through a dusty library scroll by scroll is exhausting. SQL queries act as sorting commands, immediately scanning tables to fetch exactly what columns you specify.',
      blueprint: '```sql\nSELECT name FROM knights;\n```',
      deepDive: 'The SELECT command specifies the projection fields. Always specify columns directly instead of SELECT * in large database applications to minimize latency.',
      targetFile: 'query.sql',
      expectedToken: 'SELECT name FROM knights;',
      instruction: 'Write a SQL query to select the name column from the table knights:',
      starterCode: '-- Query names from knights\n',
      hint: 'Type: SELECT name FROM knights;'
    }
  ],
  'Go': [
    {
      id: 'go-01',
      title: 'Fast Value Declarations',
      analogy: 'Go values are strictly typed. Short declarations allow you to create variables instantly without writing repetitive type tags.',
      blueprint: '```go\nhp := 100\n```',
      deepDive: 'Go infers types automatically at compile time during short variable assignments (:=). It is only valid within function scopes.',
      targetFile: 'main.go',
      expectedToken: 'hp := 100',
      instruction: 'Declare an integer variable hp initialized to 100 using Go short variable declaration syntax:',
      starterCode: 'package main\n\nfunc main() {\n  // Short variable declaration for hp\n  \n}\n',
      hint: 'Type: hp := 100'
    }
  ],
  'C#': [
    {
      id: 'csharp-01',
      title: 'Console Greetings',
      analogy: 'C# uses strict namespace assemblies. Printing strings requires utilizing static WriteLine methods in System Console packages.',
      blueprint: '```csharp\nConsole.WriteLine("Hello Knight");\n```',
      deepDive: 'Console belongs to System namespaces. Standard templates compile static program main blocks to initiate runtime tasks.',
      targetFile: 'Program.cs',
      expectedToken: 'Console.WriteLine("Hello Knight");',
      instruction: 'Write a C# code snippet using standard System Console to print the string "Hello Knight":',
      starterCode: 'using System;\n\npublic class Program {\n  public static void Main() {\n    // Print Hello Knight below\n    \n  }\n}\n',
      hint: 'Type: Console.WriteLine("Hello Knight");'
    }
  ],
  'PHP': [
    {
      id: 'php-01',
      title: 'Echoing Mana',
      analogy: 'PHP variables start with dollar shields. Outputting them to screen requires using basic output calls like echo.',
      blueprint: '```php\n$mana = 100;\necho $mana;\n```',
      deepDive: 'PHP variables are weakly typed. Echo handles output conversions internally, outputting string buffers directly.',
      targetFile: 'index.php',
      expectedToken: '$mana = 100; echo $mana;',
      instruction: 'Declare a variable mana with value 100 and echo it to the page:',
      starterCode: '<?php\n// Declare mana and echo it\n',
      hint: 'Type: $mana = 100; echo $mana;'
    }
  ],
  'Swift': [
    {
      id: 'swift-01',
      title: 'Safe Value Declarations',
      analogy: 'Swift values use strict mutability rules. Constants defined with let are read-only, making your logic highly secure.',
      blueprint: '```swift\nlet name = "Arthur"\n```',
      deepDive: 'Constants cannot be mutated. Defining immutable state by default prevents unintended side effects during threads.',
      targetFile: 'main.swift',
      expectedToken: 'let name = "Arthur"',
      instruction: 'Declare a constant named name with value "Arthur" using Swift standard declarations:',
      starterCode: '// Declare name constant below\n',
      hint: 'Type: let name = "Arthur"'
    }
  ],
  'Kotlin': [
    {
      id: 'kotlin-01',
      title: 'Read-only Values',
      analogy: 'Kotlin values are read-only when declared with val. This behaves like immutable pointers, ensuring stable logic grids.',
      blueprint: '```kotlin\nval power = 90\n```',
      deepDive: 'Declaring local variables with val creates final values. It initializes thread-safe constants that cannot be reassigned.',
      targetFile: 'main.kt',
      expectedToken: 'val power = 90',
      instruction: 'Declare a read-only variable named power initialized to 90:',
      starterCode: 'fun main() {\n  // Declare read-only power below\n  \n}\n',
      hint: 'Type: val power = 90'
    }
  ]
};

const CODEX_LANGUAGES = [
  {
    name: 'Frontend Foundation',
    title: 'Frontend Foundation',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 22h20L12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
      </svg>
    )
  },
  {
    name: 'JavaScript & TypeScript Core',
    title: 'JavaScript & TypeScript',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z" />
      </svg>
    )
  },
  {
    name: 'Python Node',
    title: 'Python AI & Automation',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M11.9 1a3.7 3.7 0 0 0-3.6 3.7v2.3h7.2V4.7A3.7 3.7 0 0 0 11.9 1zm-2.7 8.3c-2 0-3.7 1.7-3.7 3.7v3.7a3.7 3.7 0 0 0 3.7 3.7h1.9v-2.3H9.2a1.4 1.4 0 0 1-1.4-1.4v-1.4h7.2v-1.4H7.8v-1.4a1.4 1.4 0 0 1 1.4-1.4h5.6c.8 0 1.4.6 1.4 1.4V16h2.3v-3.7c0-2-1.7-3.7-3.7-3.7H9.2z" />
      </svg>
    )
  },
  {
    name: 'C++ Shield',
    title: 'C++ Speed & DSA',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 14H8v-3H5v-2h3V8h3v3h3v2h-3v3zm8-3h-2v2h-2v-2h-2v-2h2V9h2v2h2v2z" />
      </svg>
    )
  },
  {
    name: 'Java Core',
    title: 'Java Enterprise Systems',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 18.5a1.5 1.5 0 0 0 1.5 1.5h17a1.5 1.5 0 0 0 1.5-1.5v-2H2v2zm16-14l-2 3.5h4L18 4.5zM6 14.5a3.5 3.5 0 0 1 3.5-3.5h5a3.5 3.5 0 0 1 3.5 3.5v1H6v-1zm4.5-9.5l-2.5 5H13L10.5 5z" />
      </svg>
    )
  },
  {
    name: 'Rust Grid',
    title: 'Rust Safety Compiler',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-2h2v2zm0-4h-2V7h2v5z M12 4a8 8 0 0 1 8 8 7.9 7.9 0 0 1-2.3 5.7l-1.4-1.4A5.9 5.9 0 0 0 18 12a6 6 0 1 0-12 0 5.9 5.9 0 0 0 1.7 4.3L6.3 17.7A7.9 7.9 0 0 1 4 12a8 8 0 0 1 8-8z" />
      </svg>
    )
  },
  {
    name: 'TypeScript Temple',
    title: 'TypeScript strict templates',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zM6 10h3v8H6v-8zm10.5 8c-1.5 0-2.5-1-2.5-2.5h2c0 .5.3.8.8.8s.7-.3.7-.7c0-.5-.3-.7-1-1-1.2-.4-2-.8-2-2s.8-2 2-2 2.2 1 2.2 2.5h-2c0-.5-.3-.8-.7-.8s-.6.3-.6.6c0 .4.3.6 1 .9 1.2.4 2 .8 2 2s-.9 2.2-2.1 2.2z" />
      </svg>
    )
  },
  {
    name: 'SQL Vault',
    title: 'SQL Relational Queries',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 4.02 2 6.5s4.48 4.5 10 4.5 10-2.02 10-4.5S17.52 2 12 2zm0 12c-5.52 0-10-2.02-10-4.5V14c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5v-4.5c0 2.48-4.48 4.5-10 4.5zm0 5.5c-5.52 0-10-2.02-10-4.5v2c0 2.48 4.48 4.5 10 4.5s10-2.02 10-4.5v-2c0 2.48-4.48 4.5-10 4.5z" />
      </svg>
    )
  },
  {
    name: 'Go Sanctum',
    title: 'Go Concurrent Systems',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M13.5 2c-3.03 0-5.5 2.47-5.5 5.5v5.5c0 3.03 2.47 5.5 5.5 5.5s5.5-2.47 5.5-5.5V7.5c0-3.03-2.47-5.5-5.5-5.5zm0 13c-1.38 0-2.5-1.12-2.5-2.5V11h5v1.5c0 1.38-1.12 2.5-2.5 2.5zM6 6c-2.2 0-4 1.8-4 4v4c0 2.2 1.8 4 4 4h1v-2H6c-1.1 0-2-.9-2-2v-4c0-1.1.9-2 2-2h1V6H6z" />
      </svg>
    )
  },
  {
    name: 'C# Castle',
    title: 'C# OOP & Linq',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M24 12c0 6.627-5.373 12-12 12S0 19.627 0 12 5.373 0 12 0s12 5.373 12 12zm-14.5 4h9v-2h-9v2zm0-6h9V8h-9v2z" />
      </svg>
    )
  },
  {
    name: 'PHP Tavern',
    title: 'PHP Web Backend',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
      </svg>
    )
  },
  {
    name: 'Swift Swiftness',
    title: 'Swift iOS Foundation',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 13.5l3.5-3.5 3 3 8.5-8.5-1.5-1.5L9 9.5l-3-3L1 11.5l1.5 2z" />
      </svg>
    )
  },
  {
    name: 'Kotlin Kingdom',
    title: 'Kotlin Android Coroutines',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2L2 22h20L12 2zm0 4l6.5 13h-13L12 6z" />
      </svg>
    )
  },
  {
    name: 'Command Line & Git',
    title: 'Git & Command Line Shell',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v5z" />
      </svg>
    )
  },
  {
    name: 'DevOps & Containers',
    title: 'Docker & Kubernetes Cloud',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 2h20v20H2V2zm4 4v12h12V6H6z" />
      </svg>
    )
  },
  {
    name: 'Data Structures & Algorithms',
    title: 'DSA & Coding Complexity',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 3H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 10H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2zm10-10h-4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 10h-4c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h4c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2z" />
      </svg>
    )
  },
  {
    name: 'Web Security & APIs',
    title: 'OWASP Security & GraphQL',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 6c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 12c-2.7 0-5.08-1.57-6.22-3.88.08-.94.75-1.78 1.72-2.12C8.75 12.37 10.3 12 12 12s3.25.37 4.5.99c.97.34 1.64 1.18 1.72 2.12C17.08 17.43 14.7 19 12 19z" />
      </svg>
    )
  },
  {
    name: 'Testing & QA',
    title: 'Jest, Playwright & Quality',
    svg: (
      <svg className="w-5 h-5 fill-current text-[#09090B]" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" />
      </svg>
    )
  }
];

// Global Leaders Data
interface Leader {
  rank: number;
  name: string;
  track: string;
  xp: number;
  badges: string[];
}

const GLOBAL_LEADERS: Leader[] = [
  { rank: 1, name: 'KNIGHT ARNAV', track: 'React', xp: 9800, badges: ['👑 CYBER CROWN HOLDER', '🔥 SEMANTIC GOD'] },
  { rank: 2, name: 'SORCERESS LEA', track: 'JavaScript', xp: 8750, badges: ['⚡ LOGIC MASTER'] },
  { rank: 3, name: 'KNIGHT RYAN', track: 'CSS3', xp: 7400, badges: ['🎨 FLEX ARCHITECT'] },
  { rank: 4, name: 'CODE SLAYER', track: 'HTML5', xp: 6200, badges: ['🧱 BEDROCK FOUNDER'] },
  { rank: 5, name: 'VOID WALKER', track: 'React', xp: 5900, badges: ['⚛️ DOM DOMINATOR'] },
  { rank: 6, name: 'CYBER WIZARD', track: 'JavaScript', xp: 5100, badges: ['⚡ RECURSION MAGE'] },
  { rank: 7, name: 'KNIGHT GAUTAM', track: 'Frontend', xp: 4850, badges: ['🛡️ BRUTALIST RECRUIT'] },
  { rank: 8, name: 'TS WIZARD', track: 'TypeScript', xp: 4600, badges: ['📘 STRICT CONTRACTOR'] },
  { rank: 9, name: 'DB MASTER', track: 'SQL', xp: 4300, badges: ['💾 RELATIONAL ARCH'] },
  { rank: 10, name: 'ALCHEMIST TANYA', track: 'CSS3', xp: 4200, badges: ['🎨 GRID OVERLORD'] },
  { rank: 11, name: 'BYTE SURFER', track: 'HTML5', xp: 3950, badges: ['🧱 STRUCTURE KING'] },
  { rank: 12, name: 'GO GOURMET', track: 'Go', xp: 3800, badges: ['🐿️ ROUTINE SLAYER'] },
  { rank: 13, name: 'SHARP DEFIANT', track: 'C#', xp: 3500, badges: ['💠 LINQ MASTER'] },
  { rank: 14, name: 'PHP ELITE', track: 'PHP', xp: 3200, badges: ['🐘 PDO COMMANDER'] },
  { rank: 15, name: 'SWIFT FALCON', track: 'Swift', xp: 3100, badges: ['🍎 IMMUTABLE GUARD'] },
  { rank: 16, name: 'KOTLIN PILOT', track: 'Kotlin', xp: 3000, badges: ['🎯 NULL SHIELD'] }
];

export interface Advancement {
  id: string;
  title: string;
  desc: string;
  category: string;
  requirement: (completedMissions: string[]) => boolean;
  targetText: string;
  rewardTokens: number;
  icon: string;
}

export const ADVANCEMENTS_LIST: Advancement[] = [
  {
    id: 'first-blood',
    title: 'FIRST BLOOD',
    desc: 'Complete your first coding exercise in the arena.',
    category: 'Milestone',
    requirement: (missions) => missions.length >= 1,
    targetText: '1 level completed',
    rewardTokens: 5,
    icon: '⚡'
  },
  {
    id: 'bug-hunter',
    title: 'BUG HUNTER',
    desc: 'Resolve and validate at least 5 coding exercises.',
    category: 'Milestone',
    requirement: (missions) => missions.length >= 5,
    targetText: '5 levels completed',
    rewardTokens: 10,
    icon: '🕷️'
  },
  {
    id: 'syntax-squire',
    title: 'SYNTAX SQUIRE',
    desc: 'Complete at least 10 coding exercises across any track.',
    category: 'Milestone',
    requirement: (missions) => missions.length >= 10,
    targetText: '10 levels completed',
    rewardTokens: 15,
    icon: '🛡️'
  },
  {
    id: 'speed-demon',
    title: 'SPEED DEMON',
    desc: 'Complete at least 20 coding exercises across any track.',
    category: 'Milestone',
    requirement: (missions) => missions.length >= 20,
    targetText: '20 levels completed',
    rewardTokens: 25,
    icon: '🏃'
  },
  {
    id: 'logic-knight',
    title: 'LOGIC KNIGHT',
    desc: 'Complete at least 50 coding exercises across any track.',
    category: 'Milestone',
    requirement: (missions) => missions.length >= 50,
    targetText: '50 levels completed',
    rewardTokens: 30,
    icon: '⚔️'
  },
  {
    id: 'terminal-god',
    title: 'TERMINAL GOD',
    desc: 'Validate and conquer at least 75 coding challenges.',
    category: 'Milestone',
    requirement: (missions) => missions.length >= 75,
    targetText: '75 levels completed',
    rewardTokens: 100,
    icon: '🚀'
  },
  {
    id: 'compiler-conqueror',
    title: 'COMPILER CONQUEROR',
    desc: 'Complete at least 100 coding exercises across any track.',
    category: 'Milestone',
    requirement: (missions) => missions.length >= 100,
    targetText: '100 levels completed',
    rewardTokens: 60,
    icon: '💻'
  },
  {
    id: 'grandmaster-guru',
    title: 'GRANDMASTER GURU',
    desc: 'Complete at least 250 coding exercises across any track.',
    category: 'Milestone',
    requirement: (missions) => missions.length >= 250,
    targetText: '250 levels completed',
    rewardTokens: 120,
    icon: '👑'
  },
  {
    id: 'web-architect',
    title: 'WEB ARCHITECT',
    desc: 'Complete at least 10 levels in HTML5 or CSS3 combined.',
    category: 'Specialization',
    requirement: (missions) => {
      const count = missions.filter(m => m.startsWith('html5') || m.startsWith('css3')).length;
      return count >= 10;
    },
    targetText: '10 Web levels completed',
    rewardTokens: 20,
    icon: '🎨'
  },
  {
    id: 'js-wizard',
    title: 'JAVASCRIPT WIZARD',
    desc: 'Complete at least 10 levels in the JavaScript track.',
    category: 'Specialization',
    requirement: (missions) => {
      const count = missions.filter(m => m.startsWith('javascript')).length;
      return count >= 10;
    },
    targetText: '10 JS levels completed',
    rewardTokens: 20,
    icon: '⚡'
  },
  {
    id: 'db-master',
    title: 'DATABASE MASTER',
    desc: 'Complete at least 10 levels in the SQL track.',
    category: 'Specialization',
    requirement: (missions) => {
      const count = missions.filter(m => m.startsWith('sql')).length;
      return count >= 10;
    },
    targetText: '10 SQL levels completed',
    rewardTokens: 20,
    icon: '💾'
  },
  {
    id: 'react-overlord',
    title: 'REACT OVERLORD',
    desc: 'Complete at least 10 levels in the React track.',
    category: 'Specialization',
    requirement: (missions) => {
      const count = missions.filter(m => m.startsWith('react')).length;
      return count >= 10;
    },
    targetText: '10 React levels completed',
    rewardTokens: 25,
    icon: '⚛️'
  },
  {
    id: 'fullstack-wizard',
    title: 'FULLSTACK WIZARD',
    desc: 'Complete at least 2 levels in HTML5, CSS3, JavaScript, and React tracks.',
    category: 'Legendary',
    requirement: (missions) => {
      const hasHtml = missions.filter(m => m.startsWith('html5')).length >= 2;
      const hasCss = missions.filter(m => m.startsWith('css3')).length >= 2;
      const hasJs = missions.filter(m => m.startsWith('javascript')).length >= 2;
      const hasReact = missions.filter(m => m.startsWith('react')).length >= 2;
      return hasHtml && hasCss && hasJs && hasReact;
    },
    targetText: '2+ levels in HTML/CSS/JS/React completed',
    rewardTokens: 50,
    icon: '🔮'
  },
  {
    id: 'polyglot-champion',
    title: 'POLYGLOT CHAMPION',
    desc: 'Complete at least 2 levels in Python, C++, and JavaScript tracks.',
    category: 'Legendary',
    requirement: (missions) => {
      const hasPython = missions.filter(m => m.startsWith('python')).length >= 2;
      const hasCpp = missions.filter(m => m.startsWith('cpp')).length >= 2;
      const hasJs = missions.filter(m => m.startsWith('javascript')).length >= 2;
      return hasPython && hasCpp && hasJs;
    },
    targetText: '2+ levels in Python/C++/JS completed',
    rewardTokens: 50,
    icon: '🪐'
  }
];

export interface ShopItem {
  id: string;
  name: string;
  desc: string;
  cost: number;
  icon: string;
  category: string;
}

export const SHOP_ITEMS: ShopItem[] = [
  {
    id: 'hint-refill',
    name: 'HINT REFILL PACK',
    desc: 'Instantly grants 5 extra Hint Tokens to unlock solutions.',
    cost: 5,
    icon: '💡',
    category: 'Consumable'
  },
  {
    id: 'xp-booster',
    name: 'DOUBLE XP BOOSTER',
    desc: 'Receive double XP rewards (+200 XP instead of +100 XP) for the next 3 levels.',
    cost: 15,
    icon: '🔥',
    category: 'Booster'
  },
  {
    id: 'skip-ticket',
    name: 'LEVEL SKIP TICKET',
    desc: 'Allows skipping any coding challenge directly without completing it.',
    cost: 30,
    icon: '🎫',
    category: 'Consumable'
  },
  {
    id: 'streak-freeze',
    name: 'STREAK FREEZE SHIELD',
    desc: 'Protects your daily learning streak from resetting if you miss a day.',
    cost: 10,
    icon: '❄️',
    category: 'Consumable'
  },
  {
    id: 'cyber-shield',
    name: 'CYBER SHIELD MATRIX',
    desc: 'Gain temporary immunities against compiling validation penalties.',
    cost: 25,
    icon: '🛡️',
    category: 'Utility'
  },
  {
    id: 'avatar-frame',
    name: 'LEGENDARY AVATAR FRAME',
    desc: 'Unlocks a premium holographic golden profile frame in operator HUD.',
    cost: 45,
    icon: '🖼️',
    category: 'Cosmetic'
  },
  {
    id: 'ai-credits',
    name: 'AI MENTOR RECHARGE',
    desc: 'Refills 10 extra query credits for consultation with the AI Oracle.',
    cost: 8,
    icon: '🧠',
    category: 'Consumable'
  },
  {
    id: 'secret-codex',
    name: 'SECRET CODEX INDEX',
    desc: 'Decrypt advanced cheat-sheets and optimization guides instantly.',
    cost: 20,
    icon: '📂',
    category: 'Knowledge'
  }
];

const CODEX_DATA: Record<string, {
  quickSummary: string;
  bestPractices: string;
  topics: { name: string; desc: string; sample: string }[];
}> = {
  'Frontend Foundation': {
    quickSummary: 'Frontend Foundation covers HTML5 document architectures, semantic hierarchies, and CSS layout grids/flexbox systems.',
    bestPractices: 'Use semantic HTML tags for accessibility, keep layouts responsive with media queries and CSS grid, design templates first.',
    topics: [
      { name: 'Semantic Layouts', desc: 'Structure pages with main, header, section, footer elements.', sample: '<main>\n  <section>Content</section>\n</main>' },
      { name: 'Flexbox Axis Alignments', desc: 'Align items dynamically along horizontal and vertical axes.', sample: '.rack { display: flex; justify-content: space-between; }' },
      { name: 'Bento Grid Templates', desc: 'Deploy multi-column layouts with grid gaps and fractions.', sample: '.grid { display: grid; grid-template-columns: repeat(3, 1fr); }' },
      { name: 'CSS Variables & Themes', desc: 'Declare and override global design variables using custom property blocks.', sample: ':root { --accent: #D2E823; }' },
      { name: 'Responsive Media Queries', desc: 'Apply conditional CSS rules based on screen widths.', sample: '@media (max-width: 768px) { .menu { display: none; } }' },
      { name: 'Keyframe Animations', desc: 'Animate elements with ease transitions and timeline scales.', sample: '@keyframes blink { 50% { opacity: 0.5; } }' },
      { name: 'Forms and Validations', desc: 'Validate inputs using required flags and custom patterns.', sample: '<input type="text" required pattern="[A-Z]+" />' },
      { name: 'SEO and Metadata', desc: 'Configure document title, meta descriptions, and viewport properties.', sample: '<meta name="description" content="Syllabus" />' },
      { name: 'Accessibility & ARIA', desc: 'Implement role tags and alt text descriptions for screen readers.', sample: '<img src="emblem.png" alt="Knight Emblem" />' },
      { name: 'Web Storage APIs', desc: 'Cache game states and levels dynamically using localStorage.', sample: 'localStorage.setItem("unlocked", "2");' }
    ]
  },
  'JavaScript & TypeScript Core': {
    quickSummary: 'JS & TS Core implements client runtime logic, DOM operations, closure scopes, asynchronous streams, and strict type annotations.',
    bestPractices: 'Initialize values with const, use async/await for network requests, enforce interfaces for object shapes.',
    topics: [
      { name: 'Variable Binding & Scope', desc: 'Block scope variables declaration using const and let keyword blocks.', sample: 'const spells = ["fire", "water"];' },
      { name: 'Lexical Closures', desc: 'Retain local scope parameters inside returned functions capsules.', sample: 'const counter = () => { let c = 0; return () => ++c; };' },
      { name: 'Promises & Callbacks', desc: 'Manage asynchronous state operations with then/catch structures.', sample: 'fetchData().then(r => log(r)).catch(e => err(e));' },
      { name: 'Async/Await Pipeline', desc: 'Write cleaner asynchronous flows using try-catch blocks.', sample: 'async function cast() { try { await fetch(); } catch {} }' },
      { name: 'DOM Event Capture', desc: 'Intercept and react to user clicks and keystrokes.', sample: 'btn.addEventListener("click", (e) => castSpell());' },
      { name: 'Type Annotations', desc: 'Enforce static type constraints during compile-time checks.', sample: 'let xp: number = 2400;' },
      { name: 'Interface Specifications', desc: 'Define object schemas and extends contracts properties.', sample: 'interface Knight { name: string; active: boolean; }' },
      { name: 'Generic Templates', desc: 'Develop reusable components utilizing dynamic type arguments.', sample: 'function identity<T>(arg: T): T { return arg; }' },
      { name: 'React States & Hooks', desc: 'Bind reactive values and capture inputs with useState and useEffect.', sample: 'const [hp, setHp] = useState(100);' },
      { name: 'React Lifecycle Sync', desc: 'Sync state changes and external data hooks safely inside functional trees.', sample: 'useEffect(() => { loadLevels(); }, []);' }
    ]
  },
  'Python Node': {
    quickSummary: 'Python provides clean dynamic scripting, list transformations, custom decorators, and scope context managers.',
    bestPractices: 'Format expressions using f-strings, optimize iterations using list comprehensions, wrap tasks in with structures.',
    topics: [
      { name: 'Syntax Spacing Limits', desc: 'Indentation spacing limits, loop blocks declarations, logic functions.', sample: 'def cast():\n    print("Cast")' },
      { name: 'Variables & Data Types', desc: 'Dynamic typings, array list structures, key-value dictionary records.', sample: 'mana = {"fire": 100, "ice": 50}' },
      { name: 'Control Flow', desc: 'Conditional logical conditions, while iteration blocks, loop breaks.', sample: 'if hp < 20:\n    activate_shield()' },
      { name: 'Functions & Scope', desc: 'Positional arguments variables, global/local scope variables mapping.', sample: 'def add(a, b=10): return a + b' },
      { name: 'OOP overrides', desc: 'Class structures definition, constructor initialization, override method calls.', sample: 'class Mage:\n    def __init__(self): self.power = 50' },
      { name: 'Error Handling', desc: 'Try-except bounds checks, raise assertions, custom exception entities.', sample: 'try:\n    cast()\nexcept SpellError as e:\n    log(e)' },
      { name: 'Async Loops', desc: 'Generator pipelines, custom context managers, asynchronous routines.', sample: 'async def cast_async(): await asyncio.sleep(1)' },
      { name: 'Data Collections', desc: 'Lists variables, Key-value dictionary lookups, Set operations.', sample: 'knights = set(["Arnav", "Lea", "Ryan"])' },
      { name: 'File operations', desc: 'Context with open statements, file write pipelines, JSON data storage.', sample: 'with open("hero.json", "w") as f:\n    json.dump(data, f)' },
      { name: 'Testing Assertions', desc: 'Unittest validation suites, inline assert declarations, print diagnostics.', sample: 'assert result == expected, "Spell test failed!"' }
    ]
  },
  'C++ Shield': {
    quickSummary: 'C++ targets low-level memory parameters, using direct pointer references, OOP polymorphism, and smart pointer wrappers.',
    bestPractices: 'Manage memory scopes using smart pointers, prevent pointer exceptions, declare constructors virtual.',
    topics: [
      { name: 'Syntax basics', desc: 'Types compilation rules, main entry modules, standard directives.', sample: '#include <iostream>\nint main() {}' },
      { name: 'Pointers & References', desc: 'Raw integers, pointer reference markers, vector arrays.', sample: 'int* ptr = &mana;' },
      { name: 'Control Flow', desc: 'Condition statements, switch blocks, standard loop structures.', sample: 'if (hp > 0) { fight(); }' },
      { name: 'Functions & Scope', desc: 'Value passing templates, pointer arguments references, templates definitions.', sample: 'void cast(int& mana) { mana -= 10; }' },
      { name: 'OOP Class Hierarchy', desc: 'Inheritance class contracts, virtual overridden overrides, constructors.', sample: 'class Knight : public Hero { void attack() override; };' },
      { name: 'Exception Handling', desc: 'Try-catch blocks assertions, throw exception types, memory locks.', sample: 'throw std::runtime_error("Empty");' },
      { name: 'Smart allocations', desc: 'Threads allocations, mutex memory controls, smart wrapper structures.', sample: 'std::unique_ptr<Shield> s = std::make_unique<Shield>();' },
      { name: 'STL Containers', desc: 'Standard Template Library maps, sets lists, dynamic vector ranges.', sample: 'std::map<std::string, int> mana_map;' },
      { name: 'Binary I/O stream', desc: 'Ifstream file loaders, ofstream writing streams, binary data locks.', sample: 'std::ofstream file("data.bin", std::ios::binary);' },
      { name: 'Diagnostics Asserts', desc: 'Debug macros declarations, GDB terminal breakpoints, debug checks.', sample: '#include <cassert>\nassert(ptr != nullptr);' }
    ]
  },
  'Java Core': {
    quickSummary: 'Java manages enterprise entities, enforcing OOP class structures, multi-threaded operations, and streams pipelines.',
    bestPractices: 'Isolate variables using private scopes, instantiate threads safely, chain calculations with streams.',
    topics: [
      { name: 'Class structure', desc: 'Class wrapping structures, static main entrances, type definitions.', sample: 'public class Main { public static void main(String[] args) {} }' },
      { name: 'Collections framework', desc: 'Primitive data variables, reference class entities, lists collections.', sample: 'List<String> spells = new ArrayList<>();' },
      { name: 'Control Flow', desc: 'Logical expressions matching, standard loops mapping, break loops.', sample: 'if (mana >= 10) { cast(); }' },
      { name: 'Functions & Lambdas', desc: 'Static class methods, variable arguments parameters, lambda mappings.', sample: 'public void cast(String spell) { System.out.println(spell); }' },
      { name: 'OOP contracts', desc: 'Interface class contracts, class inheritance bounds, encapsulation.', sample: 'class Sorcerer implements SpellCaster { public void cast() {} }' },
      { name: 'Try-catch exceptions', desc: 'Exception try-catch configurations, throw checks declarations.', sample: 'try { run(); } catch (IOException e) { e.printStackTrace(); }' },
      { name: 'Streams and pipelines', desc: 'Thread implementations, concurrency execution structures, streams transformations.', sample: 'spells.stream().filter(s -> s.startsWith("A")).collect(Collectors.toList());' },
      { name: 'HashMap details', desc: 'HashMap collections, HashSet unique arrays, queue lists.', sample: 'Map<String, String> cache = new HashMap<>();' },
      { name: 'File Storage Systems', desc: 'NIO files writing, buffered writers operations, serialized streams.', sample: 'Files.write(Paths.get("spells.txt"), list);' },
      { name: 'JUnit Tests', desc: 'JUnit unit testing suites, assertions validation, print stack traces.', sample: 'org.junit.jupiter.api.Assertions.assertEquals(10, hp);' }
    ]
  },
  'Rust Grid': {
    quickSummary: 'Rust implements borrow checking, ensuring thread safety and preventing pointer errors without a garbage collector.',
    bestPractices: 'Borrow variables immutably where possible, scope structures with lifetime parameters, implement trait systems.',
    topics: [
      { name: 'Variable bindings', desc: 'Variable bindings declarations, formatting prints macros, functions blocks.', sample: 'fn main() { println!("Rust"); }' },
      { name: 'Ownership rules', desc: 'Immutable bindings, mut variable parameters, vector buffers arrays.', sample: 'let mut cart_total = 100;' },
      { name: 'Pattern Matching', desc: 'If expressions blocks, pattern matching variables, loop indicators.', sample: 'match status { Ok => process(), _ => retry() }' },
      { name: 'Functions & Lifetimes', desc: 'Scope structures definitions, value return operations, references mapping.', sample: 'fn add(x: i32, y: i32) -> i32 { x + y }' },
      { name: 'Struct Composition', desc: 'Struct structures definition, implementation behavior blocks, traits.', sample: 'struct User {} impl Printable for User {}' },
      { name: 'Result/Option wrap', desc: 'Result enum indicators, Option wrap outcomes, panic recovery controls.', sample: 'let key = map.get("session_id").expect("Missing");' },
      { name: 'Concurrency locks', desc: 'Thread communication channels, borrow rules enforcement, lifetimed structures.', sample: 'let key: &\'a str = name;' },
      { name: 'Rust collections', desc: 'Rust HashMap dictionaries, HashSet unique arrays, dynamic vectors.', sample: 'let mut cache: HashMap<String, u32> = HashMap::new();' },
      { name: 'FS Operations', desc: 'FS files writing pipelines, buffer read tools, path checks.', sample: 'std::fs::write("log.txt", b"Success")' },
      { name: 'Testing frameworks', desc: 'Unit testing declarations, custom debug prints, cargo tests.', sample: '#[test]\nfn test_score() { assert_eq!(score, 100); }' }
    ]
  },
  'TypeScript': {
    quickSummary: 'TypeScript adds compile-time type annotations, interface specifications, and generic templates to Javascript.',
    bestPractices: 'Avoid using loose any declarations, declare structures using interfaces, leverage utility types.',
    topics: [
      { name: 'Types transpilation', desc: 'Types transpilation, strict check configurations, syntax validations.', sample: 'let name: string = "Alex";' },
      { name: 'Static Annotations', desc: 'Static annotations types, enums declarations, interface arrays.', sample: 'let score: number = 100;' },
      { name: 'Type guards', desc: 'Type guarding checks, assertion checks, switch blocks.', sample: 'if (typeof val === "string") { ... }' },
      { name: 'Generic templates', desc: 'Parameter type signatures, return types assertions, generic functions.', sample: 'function processPayment(amount: number): boolean { return true; }' },
      { name: 'OOP properties', desc: 'Abstract base classes, interface integrations, access variables properties.', sample: 'interface User { salary: number; name: string; }' },
      { name: 'Validation guards', desc: 'Never return parameters, validation bounds checking, type assertions.', sample: 'function fail(msg: string): never { throw new Error(msg); }' },
      { name: 'Utility options', desc: 'Generic type definitions, mapped types operations, utility options.', sample: 'function identity<T>(arg: T): T { return arg; }' },
      { name: 'Readonly constraints', desc: 'Typed records dictionaries, ReadonlyArray arrays mapping, enums sets.', sample: 'const map: Record<string, number> = { key: 10 };' },
      { name: 'Module loaders', desc: 'Dynamic modules loading, file imports declarations, localstorage keys.', sample: 'import { load } from "./userStore";' },
      { name: 'Compiler checks', desc: 'Types diagnostics, compiler options checks, runtime checks assertion.', sample: 'const val = arg as ExpectedType;' }
    ]
  },
  'SQL & Databases': {
    quickSummary: 'SQL structures relational query commands, filtering database records, and aggregating statistics.',
    bestPractices: 'Select column names directly, configure index columns on join matches, validate queries using EXPLAIN.',
    topics: [
      { name: 'Table projection', desc: 'Table projection declarations, database setups, queries terminations.', sample: 'SELECT name FROM employees;' },
      { name: 'Key constraints', desc: 'CREATE TABLE structures, keys constraint configurations, type bounds.', sample: 'CREATE TABLE employees (id INT PRIMARY KEY, name VARCHAR(50));' },
      { name: 'Case classification', desc: 'Condition statements, filters conditions, case classifications.', sample: 'SELECT name, CASE WHEN salary > 50000 THEN "Senior" ELSE "Junior" END FROM employees;' },
      { name: 'String operations', desc: 'Row calculation functions, string concat operations, date calculations.', sample: 'SELECT CONCAT(first, " ", last) FROM names;' },
      { name: 'View declarations', desc: 'Views declarations, schema normalization procedures, trigger procedures.', sample: 'CREATE VIEW active_employees AS SELECT * FROM employees WHERE status="Active";' },
      { name: 'Transactions locks', desc: 'Constraints violations checks, query exceptions handling, database transaction locks.', sample: 'ROLLBACK TRANSACTION;' },
      { name: 'Relational join merges', desc: 'Relational join merges, grouping aggregates queries, window calculations.', sample: 'SELECT COUNT(*), department FROM employees GROUP BY department;' },
      { name: 'Temp database structures', desc: 'Temporary database tables, SQL records collections, row constraints.', sample: 'CREATE TEMPORARY TABLE item_cache (id INT);' },
      { name: 'Bulk insertion', desc: 'Database export files, CSV tables loaders, bulk inserts commands.', sample: 'COPY employees FROM "employees.csv" DELIMITER ",";' },
      { name: 'Explain execution plan', desc: 'Query explain analyze runs, indices validations, diagnostics plans.', sample: 'EXPLAIN ANALYZE SELECT * FROM employees;' }
    ]
  },
  'Go (Golang)': {
    quickSummary: 'Go provides fast compiled scripting, struct compositions, lightweight goroutines, and channels.',
    bestPractices: 'Keep structures composition-based, manage concurrency using select structures, handle errors explicitly.',
    topics: [
      { name: 'Syntax basics', desc: 'Main package declarations, standard imports packages, logic methods.', sample: 'package main\nimport "fmt"' },
      { name: 'Variables & slices', desc: 'Static assignments types, short variables assignments, dynamic slices.', sample: 'price := 100' },
      { name: 'Control loops', desc: 'If declarations blocks, switch matching cases, single loop construct.', sample: 'for i := 0; i < 5; i++ { ... }' },
      { name: 'Multiple returns', desc: 'Multiple return structures, error returns patterns, callback arguments.', sample: 'func fetchData() (string, error) { return "data", nil }' },
      { name: 'Struct compositions', desc: 'Struct declarations, method receivers definitions, interface definitions.', sample: 'type Employee struct { Salary int }' },
      { name: 'Explicit errors', desc: 'Explicit error declarations, panic recoveries, defer cleanups.', sample: 'if err != nil { log.Fatal(err) }' },
      { name: 'Goroutines channels', desc: 'Goroutines calls, channels communications tubes, select multiplexers.', sample: 'go processRequest()' },
      { name: 'Map buffers', desc: 'Go map structures, dynamic slices ranges, struct buffers.', sample: 'var cache = make(map[string]int)' },
      { name: 'OS writers', desc: 'OS file writers, dynamic file creators, file buffers writing.', sample: 'os.WriteFile("log.txt", data, 0644)' },
      { name: 'Unit testing frameworks', desc: 'Testing packages tests, print logger diagnostics, custom recovers.', sample: 'func TestScore(t *testing.T) { ... }' }
    ]
  },
  'C# (.NET)': {
    quickSummary: 'C# delivers object-oriented frameworks, automatic property setups, LINQ queries, and task-based async parameters.',
    bestPractices: 'Encapsulate properties with getter/setter modules, construct query filters with LINQ, execute async calls.',
    topics: [
      { name: 'Namespaces entry', desc: 'Namespace compilation blocks, entry classes structures, printing lines.', sample: 'Console.WriteLine("C#");' },
      { name: 'Typed variables', desc: 'Typed integer variables, list collections arrays, reference entities.', sample: 'List<int> scores = new List<int>();' },
      { name: 'Foreach mapping', desc: 'Logical evaluation statements, foreach loop arrays mapping.', sample: 'foreach (var user in users) { ... }' },
      { name: 'Lambda formulas', desc: 'Class method properties, parameter modifiers keys, lambda formulas.', sample: 'public void Export() => Console.Write("Export");' },
      { name: 'Encapsulations properties', desc: 'Properties encapsulations methods, class inheritance behaviors, interfaces.', sample: 'public int Salary { get; set; }' },
      { name: 'Resource finally blocks', desc: 'Catch exceptions handlers, throw checks, resource finally blocks.', sample: 'try { run(); } catch (Exception e) { ... }' },
      { name: 'LINQ query structures', desc: 'Task-based delays, await wait operators, LINQ query structures.', sample: 'await Task.Delay(1000);' },
      { name: 'Dictionary mappings', desc: 'Dictionary maps, HashSet unique lists, arrays collections.', sample: 'var cache = new Dictionary<string, int>();' },
      { name: 'Files stream systems', desc: 'System files writes, dynamic stream writers, path creations.', sample: 'File.WriteAllText("save.json", data);' },
      { name: 'Test suite validation', desc: 'Diagnostics assertions, test suite modules validations, trace logs.', sample: 'System.Diagnostics.Debug.Assert(score == 100);' }
    ]
  },
  'PHP Backend': {
    quickSummary: 'PHP drives server-side web logic, array mappings, class declarations, and secure PDO structures.',
    bestPractices: 'Sanitize database entries using PDO statements, write modern square array brackets, encapsulate classes.',
    topics: [
      { name: 'Script boundary tags', desc: 'PHP script boundaries tags, echo outputs values, syntax setups.', sample: '<?php echo "Hello"; ?>' },
      { name: 'Dollar variables', desc: 'Dollar variables shields, primitive numbers, associative arrays.', sample: '$price = 100;' },
      { name: 'Foreach associative mapping', desc: 'If evaluations, foreach associative array mapping, while loops.', sample: 'if ($score > 0) { ... }' },
      { name: 'Local/global scopes', desc: 'Function parameter definitions, local/global variables scope mappings.', sample: 'function processData($input) { echo $input; }' },
      { name: 'Public parameters overrides', desc: 'Class structures definition, public properties, methods interfaces.', sample: 'class Employee { public $salary = 50000; }' },
      { name: 'PDO Exceptions try-catch', desc: 'Exception try-catch configurations, error output configurations.', sample: 'try { execute(); } catch (PDOException $e) { ... }' },
      { name: 'Prepared SQL assertions', desc: 'PDO connection setup, prepared SQL assertions, dynamic arrays manipulations.', sample: '$pdo = new PDO("mysql:host=localhost;dbname=syntax");' },
      { name: 'Key arrays structures', desc: 'Associative key maps, indexed arrays structures, dynamic array push.', sample: '$items = array("laptop" => 1200, "phone" => 800);' },
      { name: 'File stream actions', desc: 'File put contents actions, read files buffers, dynamic streaming.', sample: 'file_put_contents("audit.txt", $log);' },
      { name: 'Diagnostics displays', desc: 'Error display levels setup, inline var_dump object inspector.', sample: 'var_dump($user_object);' }
    ]
  },
  'Swift (iOS)': {
    quickSummary: 'Swift manages iOS development, enforcing let/var mutability controls, optionals safety, and protocols.',
    bestPractices: 'Default to let constants, unwrap optionals safely using guard, construct clean structures.',
    topics: [
      { name: 'Clean entry rules', desc: 'Clean coding rules, print statements calls, entry procedures.', sample: 'print("Swift")' },
      { name: 'Constant mutability limits', desc: 'Constant let declarations, mutable var properties, optionals.', sample: 'let name = "Alex"' },
      { name: 'If-let unwrapping', desc: 'If-let unwrapping logic, switch matching variables, loop paths.', sample: 'if let user = user { ... }' },
      { name: 'Closures captures variables', desc: 'External parameter names, return structures, closures variables mapping.', sample: 'func validate(input: String) -> Bool { return true }' },
      { name: 'Mutating methods definitions', desc: 'Value structures structs, mutating methods definitions, protocol contracts.', sample: 'struct Account { mutating func deductFee() {} }' },
      { name: 'Do-catch wrapper blocks', desc: 'Throw assertions, do-catch exception wrapper blocks, try checks.', sample: 'do { try fetchData() } catch { ... }' },
      { name: 'Optional protocols bindings', desc: 'Optional bindings, protocol conformance parameters, async-await calls.', sample: 'protocol Executable { func run() }' },
      { name: 'Dictionary sets collections', desc: 'Array collections, sets groupings, key-value dictionary mappings.', sample: 'var inventory: [String: Int] = [:]' },
      { name: 'File manager buffers', desc: 'File manager write endpoints, system directories buffers.', sample: 'try data.write(to: fileURL)' },
      { name: 'XCTest validation tools', desc: 'XCTest validation tools, debug logs print indicators, check asserts.', sample: 'XCTAssertTrue(score > 50);' }
    ]
  },
  'Kotlin (Android)': {
    quickSummary: 'Kotlin delivers modern Android scripting, val/var mutability, null safety checks, and coroutines.',
    bestPractices: 'Declare read-only data using val, handle nullable fields with elvis operator, run coroutines.',
    topics: [
      { name: 'Package entry steps', desc: 'Package setups, print statements definitions, function entry points.', sample: 'fun main() { println("Kotlin") }' },
      { name: 'Read-only values constraints', desc: 'Read-only val variables, mutable var parameters, nullable strings.', sample: 'val power = 90' },
      { name: 'Safe null check pipelines', desc: 'When logic matching cases, safe null check pipelines, loop lists.', sample: 'when (status) { "ok" -> process() else -> retry() }' },
      { name: 'Lambda parameters maps', desc: 'Default parameter values, lambda expressions, inline helper functions.', sample: 'fun add(x: Int, y: Int = 10) = x + y' },
      { name: 'Data wrappers classes', desc: 'Data classes wrappers, constructors properties, interfaces declarations.', sample: 'data class Employee(val salary: Int)' },
      { name: 'Elvis expression returns', desc: 'Throw statements assertions, try-catch expressions returns.', sample: 'val num = try { parse() } catch (e: Exception) { null }' },
      { name: 'Coroutine suspend locks', desc: 'Suspend functions triggers, delay coroutines controls, launch routines.', sample: 'delay(1000)' },
      { name: 'Collection map structures', desc: 'Mutable lists arrays, map dictionary collections, sets uniqueness.', sample: 'val cache = mutableMapOf<String, Int>()' },
      { name: 'Files operations', desc: 'Java stream mappings, file write text calls, path assertions.', sample: 'File("report.txt").writeText(data)' },
      { name: 'Test assertion checks', desc: 'Kotlin test assertion check, debug logs print, variables validation.', sample: 'assert(score == 100)' }
    ]
  }
};

const getPlayerRank = (completedCount: number) => {
  if (completedCount >= 250) return { title: 'Principal Software Architect', color: 'text-purple-700 bg-purple-50 border-purple-200' };
  if (completedCount >= 180) return { title: 'Lead Systems Engineer', color: 'text-indigo-700 bg-indigo-50 border-indigo-200' };
  if (completedCount >= 120) return { title: 'Senior Software Engineer', color: 'text-blue-700 bg-blue-50 border-blue-200' };
  if (completedCount >= 70) return { title: 'Full-Stack Developer', color: 'text-cyan-700 bg-cyan-50 border-cyan-200' };
  if (completedCount >= 35) return { title: 'Software Developer', color: 'text-emerald-700 bg-emerald-50 border-emerald-200' };
  if (completedCount >= 15) return { title: 'Junior Developer', color: 'text-amber-700 bg-amber-50 border-amber-200' };
  if (completedCount >= 5) return { title: 'Associate Developer', color: 'text-slate-700 bg-slate-100 border-slate-200' };
  return { title: 'Student Engineer', color: 'text-slate-600 bg-slate-100 border-slate-200' };
};

interface ChatMessage {
  sender: 'user' | 'ai';
  text: string;
  timestamp: string;
}


export default function Homepage() {
  const {
    playerName,
    playerTrack,
    setPlayerProfile,
    addXP,
    completeMission,
    resetGame,
    completedMissions,
    playerTokens,
    addTokens,
    spendTokens,
    syncWithMongoDB
  } = useGame();

  const [currentScreen, setCurrentScreen] = useState<'home' | 'auth' | 'dashboard' | 'arena' | 'pvp' | 'leaderboard' | 'roadmap' | 'codex' | 'advancements' | 'shop'>(
    playerName ? 'dashboard' : 'home'
  );

  // Safety fallback for invalid currentScreen value
  useEffect(() => {
    const validScreens = ['home', 'auth', 'dashboard', 'roadmap', 'arena', 'pvp', 'leaderboard', 'codex', 'advancements', 'shop'];
    if (!validScreens.includes(currentScreen as string)) {
      setCurrentScreen('home');
    }
  }, [currentScreen]);

  // Load and listen to Supabase Authentication & Sync MongoDB
  useEffect(() => {
    const syncUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const user = session.user;
        const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'KNIGHT';
        setPlayerProfile(name.toUpperCase(), (user.user_metadata?.track || 'Frontend') as any);
        syncWithMongoDB(user.id);
        setCurrentScreen('dashboard');
      }
    };
    syncUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event: any, session: any) => {
      if (session?.user) {
        const user = session.user;
        const name = user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split('@')[0] || 'KNIGHT';
        setPlayerProfile(name.toUpperCase(), (user.user_metadata?.track || 'Frontend') as any);
        syncWithMongoDB(user.id);
        setCurrentScreen('dashboard');
      } else {
        setPlayerProfile('', '');
        setCurrentScreen('home');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setPlayerProfile, syncWithMongoDB]);

  const [activeTrackId, setActiveTrackId] = useState<string>('all');

  // Cyber Codex States
  const [activeCodexWorld, setActiveCodexWorld] = useState<string>('Frontend Foundation');
  const [codexCustomInput, setCodexCustomInput] = useState<string>('');

  // Settings Dashboard States
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(audioEngine.getMuted());
  const [parentalAge, setParentalAge] = useState<number>(20);
  const [authMousePos, setAuthMousePos] = useState({ x: 0, y: 0 });
  const [authPanelHover, setAuthPanelHover] = useState(false);
  const authPanelRef = useRef<HTMLDivElement>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(() => typeof window !== 'undefined' ? localStorage.getItem('syntax_knight_avatar') : null);

  // Aligned Login & Hardened Authentication States
  const [editUsername, setEditUsername] = useState(playerName);
  const [editTrack, setEditTrack] = useState(playerTrack);

  // Daily Quiz States
  const [quizIndex, setQuizIndex] = useState(() => Math.floor(Math.random() * 4)); // 4 questions
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizCorrect, setQuizCorrect] = useState<boolean | null>(null);

  // Codex Sandbox States
  const [codexSandboxCode, setCodexSandboxCode] = useState('');
  const [codexSandboxOutput, setCodexSandboxOutput] = useState('[STDOUT] Sandbox terminals ready. Execute compile.');
  const [codexSandboxRunning, setCodexSandboxRunning] = useState(false);

  // Level Progression State
  const [hoveredLanguage, setHoveredLanguage] = useState<string | null>(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const isGeneratingNext = false;

  // DBMS states
  const [sqlQuery, setSqlQuery] = useState<string>('SELECT * FROM modules');
  const [dbFilterStatus, setDbFilterStatus] = useState<string | null>(null);
  const [sqlError, setSqlError] = useState<string | null>(null);

  // General App State
  const [claimedAdvancements, setClaimedAdvancements] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem('sk_claimed_advancements');
    return raw ? JSON.parse(raw) : [];
  });
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('sk_claimed_advancements', JSON.stringify(claimedAdvancements));
  }, [claimedAdvancements]);

  const [unlockedItems, setUnlockedItems] = useState<string[]>(() => {
    if (typeof window === 'undefined') return [];
    const raw = localStorage.getItem('sk_shop_unlocked_items');
    return raw ? JSON.parse(raw) : [];
  });
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('sk_shop_unlocked_items', JSON.stringify(unlockedItems));
  }, [unlockedItems]);

  const [activeTheme, setActiveTheme] = useState<string>(() => {
    if (typeof window === 'undefined') return 'light';
    return localStorage.getItem('sk_shop_active_theme') || 'light';
  });
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('sk_shop_active_theme', activeTheme);
      document.documentElement.className = activeTheme;
    }
  }, [activeTheme]);

  const [doubleXpCount, setDoubleXpCount] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    return parseInt(localStorage.getItem('sk_double_xp_count') || '0', 10);
  });
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('sk_double_xp_count', String(doubleXpCount));
  }, [doubleXpCount]);

  const [skipTickets, setSkipTickets] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    return parseInt(localStorage.getItem('sk_skip_tickets') || '0', 10);
  });
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('sk_skip_tickets', String(skipTickets));
  }, [skipTickets]);

  const [hintRefills, setHintRefills] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    return parseInt(localStorage.getItem('sk_hint_refills') || '0', 10);
  });
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('sk_hint_refills', String(hintRefills));
  }, [hintRefills]);

  const [streakFreezes, setStreakFreezes] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    return parseInt(localStorage.getItem('sk_streak_freezes') || '0', 10);
  });
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('sk_streak_freezes', String(streakFreezes));
  }, [streakFreezes]);

  const [cyberShields, setCyberShields] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    return parseInt(localStorage.getItem('sk_cyber_shields') || '0', 10);
  });
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('sk_cyber_shields', String(cyberShields));
  }, [cyberShields]);

  const [aiCredits, setAiCredits] = useState<number>(() => {
    if (typeof window === 'undefined') return 0;
    return parseInt(localStorage.getItem('sk_ai_credits') || '0', 10);
  });
  useEffect(() => {
    if (typeof window !== 'undefined') localStorage.setItem('sk_ai_credits', String(aiCredits));
  }, [aiCredits]);

  const [selectedWorld, setSelectedWorld] = useState<string>('HTML5');
  const [arenaChallenge, setArenaChallenge] = useState<Challenge>(CHALLENGES_DATABASE['HTML5'][0]);
  const [userCode, setUserCode] = useState('');

  // Arena Compilation & Diagnostics
  const [diagnosticsStatus, setDiagnosticsStatus] = useState<'idle' | 'compiling' | 'success' | 'failed'>('idle');
  const [testCases, setTestCases] = useState<Array<{ id: number; title: string; status: 'idle' | 'running' | 'passed' | 'failed' }>>([
    { id: 1, title: 'Syntactic Vector Check', status: 'idle' },
    { id: 2, title: 'Architectural Bounds Check', status: 'idle' },
    { id: 3, title: 'Operational Logic Check', status: 'idle' }
  ]);
  const [diagnosticsMessage, setDiagnosticsMessage] = useState('Workspace loaded. Execute compile vector.');
  const [codexTab, setCodexTab] = useState<'analogy' | 'blueprint' | 'deep'>('analogy');
  const [shakeTrigger, setShakeTrigger] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorModalMessage, setErrorModalMessage] = useState('');
  const [errorModalDiagnosis, setErrorModalDiagnosis] = useState('');
  const [infoModal, setInfoModal] = useState<{ isOpen: boolean; type: 'success' | 'error' | 'info'; title: string; message: string } | null>(null);
  const [selectedAiModel, setSelectedAiModel] = useState('google/gemini-2.5-flash');

  // PVP Simulator State
  const [playerHp, setPlayerHp] = useState(100);
  const [opponentHp, setOpponentHp] = useState(100);
  const [pvpTimer, setPvpTimer] = useState(30);
  const [pvpTargetCode, setPvpTargetCode] = useState('let x = 10;');
  const [pvpInput, setPvpInput] = useState('');
  const [pvpActive, setPvpActive] = useState(false);
  const [pvpResult, setPvpResult] = useState<'win' | 'lose' | null>(null);
  const [pvpLog, setPvpLog] = useState<string[]>(['[PVP] Grid loaded. Prepare your keyboard arrays.']);
  const [impactFlash, setImpactFlash] = useState(false);

  // AI Chat Mentor Side-Drawer States
  const [isMentorOpen, setIsMentorOpen] = useState(false);
  const [mentorMessages, setMentorMessages] = useState<ChatMessage[]>([]);
  const [mentorInput, setMentorInput] = useState('');
  const [isMentorTyping, setIsMentorTyping] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);
  const [selectedLevelIndex, setSelectedLevelIndex] = useState<number>(0);

  // Leaderboards state
  const [activeLeaderboardTrack, setActiveLeaderboardTrack] = useState<string>('All');

  // Dynamic skill calculations based on operator progress
  const getSkillStats = () => {
    const categories = {
      logic: { name: '🧠 Logic & Flow', modules: ['JavaScript', 'TypeScript', 'Python', 'Kotlin', 'Swift', 'C#', 'PHP', 'Java'], score: 0 },
      systems: { name: '🛡️ Systems & Safety', modules: ['C++', 'Rust', 'Go', 'TypeScript'], score: 0 },
      data: { name: '📊 Data & Query', modules: ['SQL', 'Data Structures & Algorithms'], score: 0 },
      ui: { name: '🎨 UI & Layout', modules: ['HTML5', 'CSS3', 'React', 'PHP', 'Swift', 'Kotlin'], score: 0 },
      tools: { name: '⚙️ Tools & Ops', modules: ['Command Line & Git', 'DevOps & Containers', 'Testing & QA', 'Web Security & APIs'], score: 0 }
    };

    Object.keys(categories).forEach(key => {
      const cat = categories[key as keyof typeof categories];
      let totalLevels = 0;
      let completedCount = 0;

      cat.modules.forEach(modName => {
        const world = worldSyllabus.find(w => w.worldName === modName);
        if (world) {
          totalLevels += world.levels.length;
          world.levels.forEach(lvl => {
            if (completedMissions.includes(lvl.id)) completedCount++;
          });
        } else {
          const challenges = CHALLENGES_DATABASE[modName] || [];
          if (challenges.length > 0) {
            totalLevels += challenges.length;
            challenges.forEach(c => {
              if (completedMissions.includes(c.id)) completedCount++;
            });
          }
        }
      });

      cat.score = totalLevels > 0 ? Math.round((completedCount / totalLevels) * 100) : 0;
    });

    return categories;
  };

  const getRecommendedNext = () => {
    for (const track of SKILL_TRACKS) {
      if (track.id === 'all') continue;
      for (const modName of track.modules) {
        const world = worldSyllabus.find(w => w.worldName === modName);
        if (world) {
          const allCompleted = world.levels.every(lvl => completedMissions.includes(lvl.id));
          if (!allCompleted) {
            const nextLvlIndex = world.levels.findIndex(lvl => !completedMissions.includes(lvl.id));
            return {
              moduleName: modName,
              trackId: track.id,
              trackName: track.name.split(':')[1]?.trim() || track.name,
              levelIndex: nextLvlIndex >= 0 ? nextLvlIndex : 0,
              levelTitle: world.levels[nextLvlIndex]?.title || world.levels[0].title
            };
          }
        } else {
          const challenges = CHALLENGES_DATABASE[modName] || [];
          if (challenges.length > 0) {
            const allCompleted = challenges.every(c => completedMissions.includes(c.id));
            if (!allCompleted) {
              return {
                moduleName: modName,
                trackId: track.id,
                trackName: track.name.split(':')[1]?.trim() || track.name,
                levelIndex: 0,
                levelTitle: challenges[0].title
              };
            }
          }
        }
      }
    }
    return null;
  };

  // Rule-based syntax diagnostic generator
  const diagnoseMistake = (code: string, challenge: Challenge) => {
    const trimmed = code.trim();
    const hint = challenge.hint || '';
    const cleanHint = hint.replace('Example pattern match target: ', '').replace('Type: ', '');

    if (!trimmed) {
      return "Your workspace is completely empty. Please write your syntax solution first.";
    }

    // Check Case 1: Casing discrepancy in strings (e.g., "knight" instead of "Knight")
    if (challenge.expectedToken.includes('Knight') && code.includes('knight')) {
      return 'Casing Error: Programming languages are case-sensitive. You wrote lowercase "knight", but the instruction asks for uppercase "Knight" (capital K).';
    }

    // Check Case 2: Extra spaces inside the quotes (e.g., " Knight " or " Knight")
    const spaceRegex = /["']\s+Knight\s+["']|["']\s+Knight["']|["']Knight\s+["']/;
    if (spaceRegex.test(code)) {
      return 'Whitespace Error inside quotes: You wrote extra spaces around the word (e.g. " Knight " instead of "Knight"). Programming syntax validation is strict; please remove any spaces inside the quotes.';
    }

    // Check Case 3: Fuzzy quote space mismatch
    const quoteMatch = code.match(/["'](.*?)["']/);
    if (quoteMatch) {
      const innerText = quoteMatch[1];
      const matchesText = challenge.instruction.match(/"([^"]+)"/);
      if (matchesText) {
        const expectedText = matchesText[1];
        if (innerText.trim() === expectedText && innerText !== expectedText) {
          return `Whitespace inside quotes: You have extra leading or trailing spaces inside your quotes ("${innerText}"). It should be exactly "${expectedText}" with no extra spaces.`;
        }
      }
    }

    // Check Case 4: Casing of keywords (e.g., Console.log, Const, Function)
    const keywords = ['console.log', 'const', 'let', 'function', 'return', 'import', 'export', 'select', 'from', 'where'];
    for (const kw of keywords) {
      const fuzzyKw = new RegExp('\\b' + kw.replace('.', '\\.') + '\\b', 'i');
      if (fuzzyKw.test(code) && !code.includes(kw)) {
        const matchArr = code.match(new RegExp(kw.replace('.', '\\.'), 'gi'));
        if (matchArr && matchArr[0] !== kw) {
          return `Keyword Casing Error: You wrote "${matchArr[0]}". In most programming languages, keywords must be completely lowercase: "${kw}".`;
        }
      }
    }

    // Check Case 5: Semicolon mismatch
    if (cleanHint.endsWith(';') && !trimmed.endsWith(';')) {
      return `Syntax Tip: You missed the ending semicolon (;). While some languages don't strictly require it, the validator expects it here. Example: \`${cleanHint}\`.`;
    }

    // Check Case 6: Parenthesis or bracket mismatch
    const openParenthesisCount = (code.match(/\(/g) || []).length;
    const closeParenthesisCount = (code.match(/\)/g) || []).length;
    if (openParenthesisCount !== closeParenthesisCount) {
      return `Parenthesis Mismatch: You have ${openParenthesisCount} opening parentheses '(' but ${closeParenthesisCount} closing parentheses ')'. Make sure they pair up perfectly.`;
    }

    const openQuoteCount = (code.match(/["']/g) || []).length;
    if (openQuoteCount % 2 !== 0) {
      return `Unmatched Quotes: You have an odd number of quotation marks (${openQuoteCount}). Make sure every quote you open is also closed.`;
    }

    // Default detailed fallback
    return "Syntax match failed. Make sure you don't have spelling typos, missing brackets, or unexpected characters in your code statement.";
  };

  // Real-time local execution sandboxing for active interactive preview
  const executeUserCode = (code: string, world: string): string[] => {
    const outputs: string[] = [];
    const customConsole = {
      log: (...args: any[]) => {
        outputs.push(args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' '));
      },
      error: (...args: any[]) => {
        outputs.push(`[ERROR] ${args.join(' ')}`);
      }
    };

    try {
      if (world.toLowerCase().includes('js') || world.toLowerCase().includes('javascript') || world.toLowerCase().includes('academy')) {
        // Create a function block executing their code with a custom console context
        const runFn = new Function('console', code);
        runFn(customConsole);
      } else {
        outputs.push(`[SYSTEM] Compiler simulation initialized for file: ${arenaChallenge.targetFile}`);
        outputs.push(`[SYSTEM] Syntactic structure parsed successfully.`);
        outputs.push(`[SYSTEM] Ready for verification.`);
      }
    } catch (err: any) {
      outputs.push(`[RUNTIME_ERROR]: ${err.message}`);
    }
    return outputs;
  };

  // Launch AI Arena/Roadmap for a World
  const enterWorldArena = (worldName: string) => {
    audioEngine.playClickSound();
    setSelectedWorld(worldName);

    // Find the first uncompleted level index in this world, or default to 0
    const currentSyllabusWorld = worldSyllabus.find(w => w.worldName === worldName) || worldSyllabus[0];
    let firstUncompletedIdx = 0;
    for (let i = 0; i < currentSyllabusWorld.levels.length; i++) {
      if (!completedMissions.includes(currentSyllabusWorld.levels[i].id)) {
        firstUncompletedIdx = i;
        break;
      }
    }

    setSelectedLevelIndex(firstUncompletedIdx);
    setCurrentScreen('roadmap');
  };

  // Start practicing a selected level/lesson in the arena
  const startLessonPractice = (index: number) => {
    audioEngine.playClickSound();
    setSelectedLevelIndex(index);
    const currentSyllabusWorld = worldSyllabus.find(w => w.worldName === selectedWorld) || worldSyllabus[0];
    const levelData = currentSyllabusWorld.levels[index];

    // Assign dynamic file extensions
    let fileExt = 'index.html';
    if (selectedWorld.includes('CSS') || selectedWorld.includes('Tailwind') || selectedWorld.includes('Shop')) {
      fileExt = 'layout.css';
    } else if (selectedWorld.includes('JS') || selectedWorld.includes('JavaScript') || selectedWorld.includes('Academy')) {
      fileExt = 'spells.js';
    } else if (selectedWorld.includes('React') || selectedWorld.includes('Kingdom')) {
      fileExt = 'KnightBadge.tsx';
    } else if (selectedWorld.includes('Python') || selectedWorld.includes('Node')) {
      fileExt = 'model.py';
    } else if (selectedWorld.includes('C++') || selectedWorld.includes('Shield')) {
      fileExt = 'shield.cpp';
    } else if (selectedWorld.includes('Java') || selectedWorld.includes('Core')) {
      fileExt = 'EnterpriseCore.java';
    } else if (selectedWorld.includes('Rust') || selectedWorld.includes('Grid')) {
      fileExt = 'main.rs';
    } else if (selectedWorld.includes('TypeScript') || selectedWorld.includes('Temple')) {
      fileExt = 'app.ts';
    } else if (selectedWorld.includes('SQL') || selectedWorld.includes('Vault')) {
      fileExt = 'query.sql';
    } else if (selectedWorld.includes('Go') || selectedWorld.includes('Sanctum')) {
      fileExt = 'main.go';
    } else if (selectedWorld.includes('C#') || selectedWorld.includes('Castle')) {
      fileExt = 'Program.cs';
    } else if (selectedWorld.includes('PHP') || selectedWorld.includes('Tavern')) {
      fileExt = 'index.php';
    } else if (selectedWorld.includes('Swift') || selectedWorld.includes('Swiftness')) {
      fileExt = 'main.swift';
    } else if (selectedWorld.includes('Kotlin') || selectedWorld.includes('Kingdom')) {
      fileExt = 'main.kt';
    } else if (selectedWorld.includes('Command Line') || selectedWorld.includes('Git')) {
      fileExt = 'commands.sh';
    } else if (selectedWorld.includes('DevOps') || selectedWorld.includes('Containers')) {
      fileExt = 'Dockerfile';
    } else if (selectedWorld.includes('Data Structures') || selectedWorld.includes('Algorithms')) {
      fileExt = 'dsa.js';
    } else if (selectedWorld.includes('Web Security') || selectedWorld.includes('APIs')) {
      fileExt = 'api.js';
    } else if (selectedWorld.includes('Testing') || selectedWorld.includes('QA')) {
      fileExt = 'test.js';
    }

    setArenaChallenge({
      id: levelData.id,
      title: levelData.title,
      analogy: levelData.codex.analogy,
      blueprint: levelData.codex.blueprint,
      deepDive: levelData.codex.deepDive,
      targetFile: fileExt,
      expectedToken: levelData.validationRegex,
      instruction: levelData.instructions,
      starterCode: levelData.initialCode,
      hint: levelData.hint
    });
    setUserCode(levelData.initialCode);
    setDiagnosticsStatus('idle');
    setTestCases([
      { id: 1, title: 'Syntactic Vector Check', status: 'idle' },
      { id: 2, title: 'Architectural Bounds Check', status: 'idle' },
      { id: 3, title: 'Operational Logic Check', status: 'idle' }
    ]);
    setDiagnosticsMessage('Workspace loaded. Execute compile vector.');
    setCurrentScreen('arena');
  };

  // DBMS SQL Parser Effect (Extension Module 2)
  useEffect(() => {
    const q = sqlQuery.trim().replace(/\s+/g, ' ').toUpperCase();
    if (!q) {
      setDbFilterStatus(null);
      setSqlError(null);
      return;
    }

    if (q === 'SELECT * FROM MODULES') {
      setDbFilterStatus(null);
      setSqlError(null);
      return;
    }

    const lockedMatch = q.match(/^SELECT \* FROM MODULES WHERE STATUS\s*=\s*'LOCKED'$/);
    const activeMatch = q.match(/^SELECT \* FROM MODULES WHERE STATUS\s*=\s*'ACTIVE'$/);
    const completedMatch = q.match(/^SELECT \* FROM MODULES WHERE STATUS\s*=\s*'COMPLETED'$/);
    const restrictedMatch = q.match(/^SELECT \* FROM MODULES WHERE STATUS\s*=\s*'RESTRICTED'$/);

    if (lockedMatch) {
      setDbFilterStatus('LOCKED');
      setSqlError(null);
    } else if (activeMatch) {
      setDbFilterStatus('ACTIVE');
      setSqlError(null);
    } else if (completedMatch) {
      setDbFilterStatus('COMPLETED');
      setSqlError(null);
    } else if (restrictedMatch) {
      setDbFilterStatus('RESTRICTED');
      setSqlError(null);
    } else {
      if (q.startsWith('SELECT') && !q.includes('FROM MODULES')) {
        setSqlError("SQL_ERR: TABLE_NOT_FOUND");
      } else if (!q.startsWith('SELECT')) {
        setSqlError("SQL_ERR: INVALID_QUERY_ACTION");
      } else {
        setSqlError("SQL_ERR: SYNTAX_MISMATCH");
      }
    }
  }, [sqlQuery]);

  // Compile Arena Code with 3-Step Verification
  const handleArenaCompile = async () => {
    if (diagnosticsStatus === 'compiling') return;
    audioEngine.playClickSound();
    setDiagnosticsStatus('compiling');
    setDiagnosticsMessage('Invoking local execution sandbox...');

    // Reset test states
    setTestCases([
      { id: 1, title: 'Syntactic Vector Check', status: 'running' },
      { id: 2, title: 'Architectural Bounds Check', status: 'idle' },
      { id: 3, title: 'Operational Logic Check', status: 'idle' }
    ]);

    const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    try {
      // --- TEST CASE 1 ---
      await delay(800);
      const isNotEmpty = userCode.trim().length > 0;
      const isNotOnlyComments = userCode.replace(/\/\*[\s\S]*?\*\/|\/\/.*$/gm, '').trim().length > 0;

      if (!isNotEmpty) {
        setTestCases(prev => prev.map(t => t.id === 1 ? { ...t, status: 'failed' } : t));
        throw new Error('Code is empty. Write your syntax blueprint first.');
      }
      if (!isNotOnlyComments) {
        setTestCases(prev => prev.map(t => t.id === 1 ? { ...t, status: 'failed' } : t));
        throw new Error('Code only contains comments. Implement actual logic blocks.');
      }

      setTestCases(prev => prev.map(t => t.id === 1 ? { ...t, status: 'passed' } : t));
      audioEngine.playHoverSound();
      setDiagnosticsMessage('✔ Test 1 passed: Syntactic vector aligned.');

      // --- TEST CASE 2 ---
      await delay(800);
      setTestCases(prev => prev.map(t => t.id === 2 ? { ...t, status: 'running' } : t));
      await delay(800);

      const rawPattern = (arenaChallenge.expectedToken || '').trim();
      const pattern = rawPattern.replace(/\\\\/g, '\\');

      // AST & Syntax-first evaluation with string literal wildcarding
      const evalResult = evaluateCode(userCode, pattern, selectedWorld);

      if (!evalResult.isCorrect) {
        setTestCases(prev => prev.map(t => t.id === 2 ? { ...t, status: 'failed' } : t));
        throw new Error(evalResult.errorMsg || 'Syntax validation mismatch. Your code structural pattern does not satisfy verification requirements.');
      }

      setTestCases(prev => prev.map(t => t.id === 2 ? { ...t, status: 'passed' } : t));
      audioEngine.playHoverSound();
      setDiagnosticsMessage('✔ Test 2 passed: Architectural verification constraints aligned.');

      // --- TEST CASE 3 ---
      await delay(800);
      setTestCases(prev => prev.map(t => t.id === 3 ? { ...t, status: 'running' } : t));
      await delay(800);

      // Verify basic safety loop check
      const lowerCode = userCode.toLowerCase();
      if (lowerCode.includes('while(true)') || lowerCode.includes('while (true)')) {
        setTestCases(prev => prev.map(t => t.id === 3 ? { ...t, status: 'failed' } : t));
        throw new Error('Infinite loop warning detected. Terminate iteration blocks.');
      }

      setTestCases(prev => prev.map(t => t.id === 3 ? { ...t, status: 'passed' } : t));
      setDiagnosticsMessage('✔ Test 3 passed: Sandbox compilation execution passed.');
      await delay(400);

      handleLevelSuccess();
    } catch (err: any) {
      setDiagnosticsStatus('failed');
      setDiagnosticsMessage(`[PARSING_CRITICAL]: ${err.message}`);
      audioEngine.playErrorBuzzer();
      setShakeTrigger(true);
      setTimeout(() => setShakeTrigger(false), 500);

      // Trigger mistake diagnosis popup
      const diagnosis = diagnoseMistake(userCode, arenaChallenge);
      setErrorModalMessage(err.message);
      setErrorModalDiagnosis(diagnosis);
      setTimeout(() => {
        setShowErrorModal(true);
      }, 500);
    }
  };

  // Level success transition handler
  const handleLevelSuccess = () => {
    setDiagnosticsStatus('success');
    let xpAwarded = 100;
    if (doubleXpCount > 0) {
      xpAwarded = 200;
      setDoubleXpCount(prev => prev - 1);
      setDiagnosticsMessage('🔒 BUILD PASSED — Integrity vector aligned. DOUBLE XP BOOSTER ACTIVE! +200 XP gained.');
    } else {
      setDiagnosticsMessage('🔒 BUILD PASSED — Integrity vector aligned. +100 XP gained.');
    }
    audioEngine.playSuccessChime();
    addXP(xpAwarded);
    completeMission(arenaChallenge.id, false);
    setShowSuccessModal(true);
  };

  // Proceed to next dynamic level trigger mechanic
  const proceedToNextLevel = () => {
    audioEngine.playClickSound();
    setShowSuccessModal(false);
    setUserCode('');
    setCurrentScreen('roadmap');
  };

  // Chat Mentor query direct submission
  const handleMentorChatSubmitDirectly = async (promptText: string) => {
    setIsMentorTyping(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: promptText,
          currentCode: userCode,
          activeFile: arenaChallenge?.title || 'workspace',
          history: mentorMessages.slice(-4).map(m => ({
            role: m.sender === 'ai' ? 'assistant' : 'user',
            content: m.text,
          })),
        }),
      });

      const data = await response.json();
      const aiReply = data.reply || 'Review your code syntax carefully and retry.';

      setMentorMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: aiReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      audioEngine.playSuccessChime();
    } catch (err: any) {
      console.error('[AI_MENTOR_ERROR]', err);
      setMentorMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `🤖 **Cyber Mentor**: Review the target code blueprint above. Ensure all tags and brackets match the expected structure.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      audioEngine.playErrorBuzzer();
    } finally {
      setIsMentorTyping(false);
    }
  };

  // PVP Battle Grid Actions
  const handlePvpSubmit = () => {
    if (!pvpActive || pvpResult) return;
    audioEngine.playClickSound();

    if (pvpInput.trim() === pvpTargetCode) {
      // Striking rival
      setOpponentHp(prev => {
        const next = Math.max(prev - 25, 0);
        if (next === 0) {
          setPvpActive(false);
          setPvpResult('win');
          audioEngine.playSuccessChime();
        }
        return next;
      });
      setPvpLog(prev => [...prev, `[USER_HIT] strike success! Opponent HP reduced by 25.`]);
      setImpactFlash(true);
      setTimeout(() => setImpactFlash(false), 300);
      audioEngine.playSuccessChime();

      // Update next combat prompt
      setPvpInput('');
      const targets = [
        'for (let i = 0; i < 5; i++)',
        'const fire = () => {};',
        'import React from "react";',
        'return <Shield count={5} />;',
        'const [mana, setMana] = useState(100);'
      ];
      setPvpTargetCode(targets[Math.floor(Math.random() * targets.length)]);
      setPvpTimer(30);
    } else {
      // Failed strike counter
      setPlayerHp(prev => {
        const next = Math.max(prev - 20, 0);
        if (next === 0) {
          setPvpActive(false);
          setPvpResult('lose');
          audioEngine.playErrorBuzzer();
        }
        return next;
      });
      setPvpLog(prev => [...prev, `[FAIL] Spell fizzled. Opponent counter-strikes! -20 HP.`]);
      audioEngine.playErrorBuzzer();
      setShakeTrigger(true);
      setTimeout(() => setShakeTrigger(false), 500);
    }
  };

  // PVP Timer effect
  useEffect(() => {
    let interval: any;
    if (pvpActive && !pvpResult) {
      interval = setInterval(() => {
        setPvpTimer(prev => {
          if (prev <= 1) {
            // Timeout hit
            setPlayerHp(h => {
              const next = Math.max(h - 20, 0);
              if (next === 0) {
                setPvpActive(false);
                setPvpResult('lose');
                audioEngine.playErrorBuzzer();
              }
              return next;
            });
            setPvpLog(log => [...log, `[TIMEOUT] Round timer hit 0! Opponent strikes you. -20 HP.`]);
            audioEngine.playErrorBuzzer();
            setShakeTrigger(true);
            setTimeout(() => setShakeTrigger(false), 500);
            return 30; // reset
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [pvpActive, pvpResult]);


  // Master Sign Out Routine
  const handleSignOut = async () => {
    audioEngine.playClickSound();
    await supabase.auth.signOut();
    resetGame();
    setIsSettingsOpen(false);
    setCurrentScreen('home');
  };

  // System Audio toggle
  const toggleMuteState = () => {
    audioEngine.playClickSound();
    const nextMute = !isMuted;
    setIsMuted(nextMute);
    audioEngine.setMuted(nextMute);
  };

  // System Wipe Progress Engine
  const handleWipeData = () => {
    audioEngine.playClickSound();
    resetGame();
    audioEngine.playSuccessChime();
    setIsSettingsOpen(false);
  };

  // Sync profile fields on settings modal open
  useEffect(() => {
    if (isSettingsOpen) {
      setEditUsername(playerName);
      setEditTrack(playerTrack);
    }
  }, [isSettingsOpen, playerName, playerTrack]);

  // Real Avatar File Upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setAvatarPreview(base64String);
        localStorage.setItem('syntax_knight_avatar', base64String);
        audioEngine.playSuccessChime();
      };
      reader.readAsDataURL(file);
    }
  };

  // Save profile changes
  const handleSaveProfile = () => {
    if (!editUsername.trim()) {
      audioEngine.playErrorBuzzer();
      return;
    }
    setPlayerProfile(editUsername.trim().toUpperCase(), editTrack);
    audioEngine.playSuccessChime();
    setIsSettingsOpen(false);
  };

  // ─── DAILY CODESPACE QUIZ & STREAK BOOSTER DATA ───
  const QUIZ_QUESTIONS = [
    {
      question: "What is the difference between '==' and '===' in JavaScript?",
      options: [
        "No difference, they behave identically",
        "== compares values only, === compares both value and type",
        "== compares both value and type, === compares values only",
        "== is for strings, === is for numbers"
      ],
      answerIndex: 1,
      explanation: "Strict equality (===) checks both type and value, whereas loose equality (==) performs type coercion before comparison."
    },
    {
      question: "Which HTML5 tag is used to embed a self-contained content item like a blog post?",
      options: ["<section>", "<article>", "<aside>", "<div>"],
      answerIndex: 1,
      explanation: "The <article> tag is designed for self-contained, independent compositions that can be distributed separately."
    },
    {
      question: "In CSS Flexbox, what does 'justify-content' control?",
      options: [
        "Alignment along the cross axis",
        "Alignment along the main axis",
        "Item height sizing",
        "Item border margins"
      ],
      answerIndex: 1,
      explanation: "justify-content aligns flex items along the main axis (usually horizontal unless flex-direction is column)."
    },
    {
      question: "Which of the following is correct syntax to declare a strict type variable in TypeScript?",
      options: [
        "let x: number = 10;",
        "let x number = 10;",
        "let x = 10 as type number;",
        "number let x = 10;"
      ],
      answerIndex: 0,
      explanation: "TypeScript uses colons to declare type annotations: `let variableName: typeName = value;`."
    }
  ];

  // ─── CYBER CODEX TERMINAL PLAYGROUND TEMPLATES ───
  const CODEX_TEMPLATES: Record<string, string> = {
    'Frontend Foundation': '<!-- Frontend Foundation Structure -->\n<div class="card">\n  <h1>Welcome to Frontend</h1>\n  <p>Practice writing HTML5 semantic components and CSS styles here.</p>\n</div>\n\n<style>\n.card {\n  background: #F8F4E8;\n  border: 2px solid #09090B;\n  padding: 1rem;\n}\n</style>',
    'JavaScript & TypeScript Core': '// JavaScript & TypeScript Core\nconst castSpell = (spell: string, power: number): boolean => {\n  console.log(`Casting ${spell} with power level ${power}!`);\n  return true;\n};\n\ncastSpell("fireball", 95);',
    'Python Node': '# Python Node script\ndef process_levels(levels_list):\n    for lvl in levels_list:\n        print(f"Processing Level: {lvl}")\n\nprocess_levels([1, 2, 3, 4])',
    'C++ Shield': '// C++ Speed Shield\n#include <iostream>\n#include <vector>\n\nint main() {\n  std::vector<int> levels = {1, 2, 3, 4};\n  std::cout << "Curriculum levels loaded: " << levels.size() << std::endl;\n  return 0;\n}',
    'Java Core': '// Java Enterprise Core\nimport java.util.List;\nimport java.util.ArrayList;\n\npublic class Main {\n  public static void main(String[] args) {\n    List<String> tracks = new ArrayList<>();\n    tracks.add("Frontend");\n    System.out.println("Java curriculum initialized: " + tracks);\n  }\n}',
    'Rust Grid': '// Rust Safe Memory Pointer\nfn main() {\n  let levels = vec![1, 2, 3, 4];\n  println!("Rust matrix levels allocated: {:?}", levels);\n}',
    'TypeScript Temple': '// TypeScript static schemas\ninterface Operator {\n  name: string;\n  xp: number;\n}\nconst activeKnight: Operator = { name: "GAUTAM", xp: 1200 };',
    'SQL Vault': '-- SQL relational queries\nSELECT username, track, xp \nFROM operators \nWHERE xp > 1000 \nORDER BY xp DESC;',
    'Go Sanctum': '// Go concurrent routine channel\npackage main\nimport "fmt"\nfunc main() {\n  fmt.Println("Deploy Go routine channels active")\n}',
    'C# Castle': '// C# OOP class\nusing System;\npublic class Operator {\n  public string Name { get; set; }\n  public void Compile() {\n    Console.WriteLine("C# Runtime Compiling");\n  }\n}',
    'PHP Tavern': '<?php\n// PHP Web Script\n$knights = ["Gautam", "Sorceress", "Wizard"];\nforeach ($knights as $knight) {\n  echo "Knight: " . $knight . "\\n";\n}?>',
    'Swift Swiftness': '// Swift iOS foundations\nimport Foundation\nstruct Operator {\n  let id: String\n  var active: Bool\n}\nprint("Swift operator initialized")',
    'Kotlin Kingdom': '// Kotlin Android Coroutines\nfun main() {\n  val operator = "GAUTAM"\n  println("Kotlin coroutines thread active: $operator")\n}'
  };

  // Sync Codex Sandbox Template Code
  useEffect(() => {
    const template = CODEX_TEMPLATES[activeCodexWorld] || '// Select a topic and begin sandbox practices\n';
    setCodexSandboxCode(template);
    setCodexSandboxOutput('[STDOUT] Sandbox terminals ready. Execute compile.');
    setCodexSandboxRunning(false);
  }, [activeCodexWorld]);

  // Codex Sandbox Execution Simulation Engine
  const executeCodexSandbox = () => {
    if (codexSandboxRunning) return;
    audioEngine.playClickSound();
    setCodexSandboxRunning(true);
    setCodexSandboxOutput('[COMPILE] Initializing compiler sandbox runtime environment...\n[COMPILE] Parsing source syntax nodes...\n[COMPILE] Building execution bindings...');

    setTimeout(() => {
      let stdout = '';
      if (codexSandboxCode.includes('console.log')) {
        const matches = codexSandboxCode.match(/console\.log\((['"`])(.*?)\1\)/g);
        if (matches) {
          stdout = matches.map(m => {
            const inner = m.match(/\((['"`])(.*?)\1\)/);
            return inner ? `[STDOUT] ${inner[2]}` : '';
          }).filter(Boolean).join('\n');
        } else {
          stdout = '[STDOUT] Hello, World!';
        }
      } else if (codexSandboxCode.includes('SELECT')) {
        stdout = '[STDOUT] Query successful.\n[STDOUT] Columns: username | track | xp\n[STDOUT] Row 1: GAUTAM | Frontend | 1200\n[STDOUT] Row 2: LEA | Backend | 950';
      } else if (codexSandboxCode.includes('print') || codexSandboxCode.includes('println') || codexSandboxCode.includes('println!')) {
        stdout = '[STDOUT] Output: Swift/Python/Rust compilation sequence successfully triggered.';
      } else {
        stdout = `[STDOUT] Process executed successfully.\n[STDOUT] Code Segment: ${codexSandboxCode.slice(0, 45).replace(/\n/g, ' ')}...`;
      }

      setCodexSandboxOutput(prev => `${prev}\n${stdout}\n[STATUS] Exit Code: 0 (Success)\n[STATS] Execution Time: ${Math.floor(Math.random() * 25) + 5}ms | Memory: ${(Math.random() * 2 + 3).toFixed(2)} MB`);
      setCodexSandboxRunning(false);
      audioEngine.playSuccessChime();
    }, 1000);
  };

  // Chat Drawer submission query
  const handleMentorChatSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mentorInput.trim() || isMentorTyping) return;

    audioEngine.playClickSound();
    const userText = mentorInput.trim();
    setMentorInput('');

    const newMsg: ChatMessage = {
      sender: 'user',
      text: userText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    setMentorMessages(prev => [...prev, newMsg]);
    setIsMentorTyping(true);

    try {
      const response = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: userText,
          currentCode: userCode,
          activeFile: arenaChallenge?.title || 'workspace',
          history: mentorMessages.slice(-4).map(m => ({
            role: m.sender === 'ai' ? 'assistant' : 'user',
            content: m.text,
          })),
        }),
      });

      const data = await response.json();
      const aiReply = data.reply || 'Review your code syntax carefully and retry.';

      setMentorMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: aiReply,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      audioEngine.playSuccessChime();
    } catch (err: any) {
      console.error('[AI_MENTOR_ERROR]', err);
      setMentorMessages(prev => [
        ...prev,
        {
          sender: 'ai',
          text: `🤖 **Cyber Mentor**: Check your code syntax in the editor and ensure all opening tags have matching closing tags.`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        },
      ]);
      audioEngine.playErrorBuzzer();
    } finally {
      setIsMentorTyping(false);
    }
  };

  // Scroll drawer to bottom
  useEffect(() => {
    if (chatScrollRef.current) {
      chatScrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [mentorMessages, isMentorTyping]);

  // Set initial welcome in drawer
  useEffect(() => {
    if (isMentorOpen && mentorMessages.length === 0) {
      setMentorMessages([
        {
          sender: 'ai',
          text: `⚡ Hail Knight! I am your Cyber Mentor. Ask me any question regarding compiler errors, variable bounds, or structural layout files!`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    }
  }, [isMentorOpen, mentorMessages.length]);

  // Filter leaders
  const filteredLeaders = GLOBAL_LEADERS.filter(l =>
    activeLeaderboardTrack === 'All' ? true : l.track === activeLeaderboardTrack
  );

  return (
    <div className="min-h-screen bg-transparent text-[#F8F4E8] relative flex flex-col font-body overflow-x-hidden select-none">
      {activeTheme === 'theme-matrix' && (
        <style>{`
          .text-\\[\\#D2E823\\] { color: #00ff66 !important; }
          .bg-\\[\\#D2E823\\] { background-color: #00ff66 !important; }
          .border-\\[\\#D2E823\\] { border-color: #00ff66 !important; }
          .hover\\:bg-\\[\\#D2E823\\]\\/30:hover { background-color: rgba(0, 255, 102, 0.3) !important; }
          .bg-\\[\\#D2E823\\]\\/80 { background-color: rgba(0, 255, 102, 0.8) !important; }
          .bg-\\[\\#D2E823\\]\\/90 { background-color: rgba(0, 255, 102, 0.9) !important; }
          .text-cyan-500 { color: #00ff66 !important; }
          .bg-cyan-500 { background-color: #00ff66 !important; }
        `}</style>
      )}
      {activeTheme === 'theme-royal' && (
        <style>{`
          .text-\\[\\#D2E823\\] { color: #fbbf24 !important; }
          .bg-\\[\\#D2E823\\] { background-color: #fbbf24 !important; }
          .border-\\[\\#D2E823\\] { border-color: #fbbf24 !important; }
          .hover\\:bg-\\[\\#D2E823\\]\\/30:hover { background-color: rgba(251, 191, 36, 0.3) !important; }
          .bg-\\[\\#D2E823\\]\\/80 { background-color: rgba(251, 191, 36, 0.8) !important; }
          .bg-\\[\\#D2E823\\]\\/90 { background-color: rgba(251, 191, 36, 0.9) !important; }
        `}</style>
      )}

      {/* Grid line matrix backdrop */}
      <div className="absolute inset-0 vector-grid-backdrop pointer-events-none z-0 opacity-15" />

      {/* ─── MOTION GRAPHICS LAYER ─── */}
      {/* Ambient Glow Orbs */}
      <div className="ambient-glow ambient-glow-acid" style={{ width: 320, height: 320, top: '10%', left: '5%' }} />
      <div className="ambient-glow ambient-glow-cyan" style={{ width: 280, height: 280, top: '60%', right: '8%' }} />
      <div className="ambient-glow ambient-glow-amber" style={{ width: 240, height: 240, bottom: '15%', left: '40%' }} />

      {/* Floating Particles */}
      <div className="motion-particle motion-particle-1" style={{ top: '15%', left: '12%' }} />
      <div className="motion-particle motion-particle-2" style={{ top: '35%', right: '18%' }} />
      <div className="motion-particle motion-particle-3" style={{ top: '55%', left: '65%' }} />
      <div className="motion-particle motion-particle-4" style={{ top: '75%', left: '25%' }} />
      <div className="motion-particle motion-particle-5" style={{ top: '20%', right: '35%' }} />
      <div className="motion-particle motion-particle-1" style={{ top: '80%', right: '12%' }} />
      <div className="motion-particle motion-particle-3" style={{ top: '45%', left: '8%' }} />
      <div className="motion-particle motion-particle-2" style={{ bottom: '20%', right: '45%' }} />

      {/* Morphing Blob */}
      <div
        className="morph-blob absolute pointer-events-none z-0"
        style={{
          width: 400, height: 400,
          top: '30%', left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(210,232,35,0.04), transparent 70%)',
          filter: 'blur(60px)'
        }}
      />

      {/* Gradient Shift Background */}
      <div className="absolute inset-0 gradient-shift-bg pointer-events-none z-0" />

      {/* Scanning Line */}
      <div className="scan-line-overlay" />

      {/* Code Rain Drops */}
      <span className="code-rain-drop" style={{ left: '5%', animationDuration: '12s' }}>{'{ }'}</span>
      <span className="code-rain-drop" style={{ left: '20%', animationDuration: '15s', animationDelay: '2s' }}>{'<div>'}</span>
      <span className="code-rain-drop" style={{ left: '40%', animationDuration: '18s', animationDelay: '5s' }}>{'const x'}</span>
      <span className="code-rain-drop" style={{ left: '60%', animationDuration: '14s', animationDelay: '3s' }}>{'=> {}'}</span>
      <span className="code-rain-drop" style={{ left: '80%', animationDuration: '16s', animationDelay: '7s' }}>{'SELECT'}</span>
      <span className="code-rain-drop" style={{ left: '92%', animationDuration: '13s', animationDelay: '1s' }}>{'[]'}</span>

      {/* ─── Global SVG Noise Overlay ─── */}
      <svg className="fixed inset-0 w-full h-full pointer-events-none z-50 opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        <filter id="noiseFilter">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>


      {/* ─── HUD NAV HEADER STRIP (90% Opacity Frosted Glass) ─── */}
      {currentScreen === 'home' ? (
        <header className="sticky top-0 glass-outer border-b border-black/10 z-40 px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between select-none">
          <div
            onClick={() => {
              audioEngine.playClickSound();
              setCurrentScreen('home');
            }}
            className="flex items-center gap-2 cursor-pointer group"
          >
            <Code className="w-4 sm:w-5 h-4 sm:h-5 text-[#D2E823] group-hover:scale-110 transition-transform" />
            <span className="font-display text-sm sm:text-base tracking-tighter text-[#F8F4E8] glitch-text uppercase font-black">
              SyntaxKnight
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={() => {
                audioEngine.playClickSound();
                setCurrentScreen('auth');
              }}
              className="flex items-center gap-1.5 text-[10px] font-code font-bold bg-[#D2E823] text-black px-3 sm:px-4 py-2 border-2 border-[#09090B] shadow-brutal-glass-sm btn-press cursor-pointer uppercase min-h-[40px]"
            >
              ENTER CORE MATRIX (1)
            </button>
          </div>
        </header>
      ) : (
        <header className="sticky top-0 glass-outer border-b border-black/10 z-40 px-3 sm:px-6 py-2.5 sm:py-3.5 flex flex-col select-none">
          <div className="flex items-center justify-between w-full">
            <div
              onClick={() => {
                if (playerName) {
                  audioEngine.playClickSound();
                  setCurrentScreen('dashboard');
                } else {
                  audioEngine.playClickSound();
                  setCurrentScreen('home');
                }
              }}
              className="flex items-center gap-2 cursor-pointer group"
            >
              <Code className="w-4 sm:w-5 h-4 sm:h-5 text-[#D2E823] group-hover:scale-110 transition-transform" />
              <span className="font-display text-sm sm:text-base tracking-tighter text-[#F8F4E8] glitch-text">
                SyntaxKnight
              </span>
              <span className="sticker-badge scale-75 select-none font-bold bg-[#D2E823]/80 backdrop-blur-sm hidden sm:inline-block">ACID_v1.0</span>
            </div>

            {playerName && (
              <div className="hidden lg:flex items-center gap-3">
                <div className="flex items-center gap-2 text-[11px] font-code glass-inner px-3 py-1 rounded-lg shadow-brutal-glass-sm text-[#F8F4E8]">
                  <span className="font-bold text-[#F8F4E8]/60">STUDENT:</span>
                  <span className="font-bold text-black bg-[#D2E823]/80 backdrop-blur-sm px-1.5 py-0.5 rounded border border-[#09090B]/10">{playerName}</span>
                  <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border-2 uppercase tracking-wide ${getPlayerRank(completedMissions.length).color}`}>{getPlayerRank(completedMissions.length).title}</span>
                </div>
              </div>
            )}

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-2 sm:gap-3">
              {currentScreen !== 'auth' && currentScreen !== 'dashboard' && (
                <button
                  onClick={() => {
                    audioEngine.playClickSound();
                    setCurrentScreen(playerName ? 'dashboard' : 'home');
                  }}
                  className="flex items-center gap-1.5 text-[10px] font-code font-bold px-3 py-2 glass-inner rounded-lg btn-press shadow-brutal-glass-sm cursor-pointer text-[#F8F4E8] min-h-[40px]"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#D2E823]" />
                  BACK TO HQ
                </button>
              )}

              {/* Settings Dashboard toggle */}
              {playerName && (
                <button
                  onClick={() => {
                    audioEngine.playClickSound();
                    setIsSettingsOpen(true);
                  }}
                  className="p-2.5 glass-inner rounded-lg btn-press shadow-brutal-glass-sm cursor-pointer text-[#F8F4E8] min-h-[40px] min-w-[40px] flex items-center justify-center"
                  title="Settings Config"
                >
                  <Settings className="w-4 h-4 text-[#D2E823]" />
                </button>
              )}

              {playerName && (
                <button
                  onClick={() => {
                    audioEngine.playClickSound();
                    setCurrentScreen('advancements');
                  }}
                  className="flex items-center gap-1.5 text-[10px] font-code font-bold bg-amber-400 border-2 border-[#09090B] px-3 py-2 rounded-lg btn-press shadow-brutal-glass-sm cursor-pointer text-[#09090B] min-h-[40px]"
                >
                  🏆 ADVANCEMENTS
                </button>
              )}
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden items-center gap-2">
              {currentScreen !== 'auth' && currentScreen !== 'dashboard' && (
                <button
                  onClick={() => {
                    audioEngine.playClickSound();
                    setCurrentScreen(playerName ? 'dashboard' : 'home');
                  }}
                  className="p-2 glass-inner rounded-lg text-xs font-code text-[#F8F4E8] min-h-[38px] flex items-center gap-1"
                >
                  <ArrowLeft className="w-3.5 h-3.5 text-[#D2E823]" /> HQ
                </button>
              )}
              <button
                onClick={() => {
                  audioEngine.playClickSound();
                  setIsMobileMenuOpen(prev => !prev);
                }}
                className="p-2 glass-inner rounded-lg border border-white/20 text-[#D2E823] min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile Drawer Menu */}
          <AnimatePresence>
            {isMobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-white/10 mt-3 pt-3 flex flex-col gap-2 overflow-hidden"
              >
                {playerName && (
                  <div className="flex items-center justify-between p-2.5 glass-inner rounded-lg text-xs text-[#F8F4E8]">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#F8F4E8]/60 text-[10px]">KNIGHT:</span>
                      <span className="font-bold text-black bg-[#D2E823] px-1.5 py-0.5 rounded text-[10px]">{playerName}</span>
                    </div>
                    <span className={`text-[8px] font-bold px-1.5 py-0.5 rounded border-2 uppercase tracking-wide ${getPlayerRank(completedMissions.length).color}`}>
                      {getPlayerRank(completedMissions.length).title}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => {
                      audioEngine.playClickSound();
                      setIsMobileMenuOpen(false);
                      setCurrentScreen(playerName ? 'dashboard' : 'home');
                    }}
                    className="p-2.5 glass-inner rounded-lg text-[11px] font-code font-bold text-left text-[#F8F4E8] flex items-center gap-2 min-h-[44px]"
                  >
                    🏠 Dashboard HQ
                  </button>
                  {playerName && (
                    <button
                      onClick={() => {
                        audioEngine.playClickSound();
                        setIsMobileMenuOpen(false);
                        setCurrentScreen('advancements');
                      }}
                      className="p-2.5 bg-amber-400 border border-[#09090B] rounded-lg text-[11px] font-code font-bold text-left text-[#09090B] flex items-center gap-2 min-h-[44px]"
                    >
                      🏆 Advancements
                    </button>
                  )}
                  {playerName && (
                    <button
                      onClick={() => {
                        audioEngine.playClickSound();
                        setIsMobileMenuOpen(false);
                        setIsSettingsOpen(true);
                      }}
                      className="p-2.5 glass-inner rounded-lg text-[11px] font-code font-bold text-left text-[#F8F4E8] flex items-center gap-2 min-h-[44px]"
                    >
                      ⚙️ System Config
                    </button>
                  )}
                  <button
                    onClick={() => {
                      audioEngine.playClickSound();
                      setIsMobileMenuOpen(false);
                      setIsMentorOpen(true);
                    }}
                    className="p-2.5 bg-[#D2E823] border border-[#09090B] rounded-lg text-[11px] font-code font-bold text-left text-black flex items-center gap-2 min-h-[44px]"
                  >
                    🤖 AI Mentor
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </header>
      )}

      {/* ─── WORKSPACE ROUTING PANEL ─── */}
      <main className="flex-grow p-6 flex flex-col justify-center max-w-7xl mx-auto w-full relative z-10">
        <AnimatePresence mode="wait">

          {/* SCREEN 0: THE INITIAL LANDING PAGE (Home Page View) */}
          {currentScreen === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full flex items-center justify-center py-6 text-[#F8F4E8]"
            >
              <HeroSection
                onEnterMatrix={() => setCurrentScreen('auth')}
                onViewArchitecture={() => setCurrentScreen('leaderboard')}
              />
            </motion.div>
          )}

          {currentScreen === 'auth' && (
            <motion.div
              key="auth"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-6xl w-full mx-auto p-2"
            >
              <AuthMatrix />
            </motion.div>
          )}
          {currentScreen === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-6 w-full text-[#09090B]"
            >

              {/* Continuous infinite linear scrolling highlight ribbon */}
              <div className="w-full overflow-hidden bg-[#D2E823] border border-[#09090B] py-2 select-none rounded-xl shadow-sm text-[#09090B]">
                <div className="animate-marquee whitespace-nowrap flex text-[10px] font-code font-semibold tracking-widest uppercase">
                  <span className="px-6">⚡ CHOOSE A LEARNING MODULE TO BEGIN ⚡ ACCESS 19 LANGUAGE TRACKS ⚡ INTERACTIVE CODE LAB ⚡ COMPLETE EXERCISES</span>
                  <span className="px-6">⚡ CHOOSE A LEARNING MODULE TO BEGIN ⚡ ACCESS 19 LANGUAGE TRACKS ⚡ INTERACTIVE CODE LAB ⚡ COMPLETE EXERCISES</span>
                </div>
              </div>

              {/* Asymmetric 12-column Bento Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">

                {/* 1. Header Identity (Spans 8) */}
                <ThreeDTilt className="md:col-span-8 h-full">
                  <div className="glass-outer rounded-2xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between select-none text-[#09090B] h-full w-full">
                    <div className="absolute inset-0 dot-pattern opacity-[0.03] pointer-events-none" />
                    <div className="relative z-10 space-y-4">
                      <div className="flex items-center gap-3">
                        {avatarPreview ? (
                          <img src={avatarPreview} alt="avatar" className="w-12 h-12 rounded-lg border border-slate-200 object-cover" />
                        ) : (
                          <div className="w-12 h-12 rounded-lg bg-[#D2E823] text-[#09090B] flex items-center justify-center shadow-sm">
                            <Crown className="w-6 h-6 text-[#09090B]" />
                          </div>
                        )}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] font-code text-slate-500 font-bold uppercase tracking-wider">STUDENT DEVELOPER:</span>
                            {parentalAge < 18 ? (
                              <span className="text-[8px] bg-red-600 text-white px-1.5 py-0.5 rounded font-code font-bold uppercase">🛡️ PARENTAL GUARD ACTIVE</span>
                            ) : (
                              <span className="text-[8px] bg-emerald-600 text-white px-1.5 py-0.5 rounded font-code font-bold uppercase">🔓 VERIFIED STUDENT</span>
                            )}
                          </div>
                          <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                            <h2 className="text-xl font-display text-slate-900 leading-none">{playerName}</h2>
                            <span className={`text-[8px] font-code font-bold px-2 py-0.5 border rounded uppercase tracking-wider ${getPlayerRank(completedMissions.length).color}`}>
                              🏆 {getPlayerRank(completedMissions.length).title}
                            </span>
                            <button
                              onClick={() => {
                                audioEngine.playClickSound();
                                setIsSettingsOpen(true);
                              }}
                              className="flex items-center gap-1 text-[8.5px] font-code font-bold bg-[#D2E823] text-[#09090B] hover:bg-[#c2d813] border border-[#09090B] px-2.5 py-1 rounded-md shadow-sm transition-all cursor-pointer uppercase"
                              title="Edit profile settings"
                            >
                              ⚙️ EDIT PROFILE
                            </button>

                          </div>
                        </div>
                      </div>

                      {/* Progress tracking */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[10px] font-code font-bold text-slate-700">
                          <span>COMPLETED CURRICULUM EXERCISES</span>
                          <span>{completedMissions.length} / 300 EXERCISES</span>
                        </div>
                        <div className="w-full h-3 glass-inner rounded-md overflow-hidden">
                          <div
                            className="h-full bg-[#D2E823] transition-all duration-500"
                            style={{ width: `${Math.min((completedMissions.length / 300) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </ThreeDTilt>

                {/* 2. Side Console Actions (Spans 4) */}
                <ThreeDTilt className="md:col-span-4 h-full">
                  <div className="glass-dark-code rounded-2xl p-6 shadow-md text-white flex flex-col justify-between select-none h-full w-full">
                    <div>
                      <h3 className="font-display text-xs tracking-tight text-[#D2E823] uppercase">CURRICULUM MANUAL</h3>
                      <p className="text-[9.5px] font-code text-slate-400 mt-1 leading-relaxed">
                        Syllabus references compiled successfully. Navigate reference guides, read syntax, and run code lab validations.
                      </p>
                    </div>
                    <div className="pt-4 flex flex-col gap-2">
                      <button
                        onClick={() => {
                          audioEngine.playClickSound();
                          setCurrentScreen('codex');
                        }}
                        className="w-full py-2.5 bg-[#D2E823] hover:bg-[#c2d813] text-[#09090B] rounded-lg text-[9.5px] font-display transition-all shadow-sm cursor-pointer text-center font-bold uppercase"
                      >
                        📖 OPEN COURSE CODEX
                      </button>

                    </div>
                  </div>
                </ThreeDTilt>

                {/* 2.5 zero-to-max skill stats & guided path row */}
                {(() => {
                  const stats = getSkillStats();
                  const rec = getRecommendedNext();

                  return (
                    <>
                      {/* Skill stats console board (Spans 6) */}
                      <ThreeDTilt className="md:col-span-6 h-full min-h-[220px]">
                        <div className="glass-outer p-6 shadow-sm rounded-2xl relative overflow-hidden flex flex-col justify-between text-[#09090B] h-full w-full">
                          <div className="absolute inset-0 dot-pattern opacity-[0.02] pointer-events-none" />
                          <div>
                            <div className="flex items-center gap-2 mb-3 select-none">
                              <Sparkles className="w-5 h-5 text-[#88a000]" />
                              <h3 className="font-display text-xs tracking-tight text-slate-900 uppercase">SKILL RATINGS (LEVEL 1 TO MAX)</h3>
                            </div>

                            <div className="space-y-3.5">
                              {Object.entries(stats).map(([key, item]) => {
                                const skillLvl = Math.floor(item.score / 10) + 1;
                                return (
                                  <div key={key} className="space-y-1">
                                    <div className="flex justify-between text-[8.5px] font-code font-bold uppercase text-slate-700">
                                      <span>{item.name}</span>
                                      <span>LVL {skillLvl} ({item.score}%)</span>
                                    </div>
                                    <div className="w-full h-2.5 glass-inner rounded-md overflow-hidden border border-slate-200">
                                      <div
                                        className="h-full bg-[#D2E823] transition-all duration-300"
                                        style={{ width: `${item.score}%` }}
                                      />
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </ThreeDTilt>

                      {/* Recommended path stage & tracking (Spans 6) */}
                      <ThreeDTilt className="md:col-span-6 h-full min-h-[220px]">
                        <div className="glass-dark-code p-6 shadow-md rounded-2xl relative overflow-hidden flex flex-col justify-between text-white h-full w-full">
                          <div className="absolute inset-0 dot-pattern opacity-[0.05] pointer-events-none" />

                          <div className="space-y-2">
                            <span className="text-[8px] font-code font-bold bg-[#D2E823] text-[#09090B] px-2.5 py-0.5 rounded uppercase tracking-widest block w-max select-none">
                              RECOMMENDED MODULE
                            </span>

                            {rec ? (
                              <div className="pt-2 space-y-2">
                                <span className="text-[10px] font-code text-[#D2E823] uppercase block select-none">
                                  {rec.trackName}
                                </span>
                                <h3 className="font-display text-lg tracking-tight uppercase leading-none select-none text-white">
                                  {rec.moduleName}
                                </h3>
                                <p className="text-[9.5px] font-code text-slate-300 leading-relaxed">
                                  Next milestone: <span className="text-[#D2E823] font-bold">Lesson {rec.levelIndex + 1}: {rec.levelTitle}</span>. Master this module to boost your skill rating.
                                </p>
                              </div>
                            ) : (
                              <div className="pt-2">
                                <h3 className="font-display text-base text-[#D2E823] uppercase select-none">
                                  All Paths Completed! 👑
                                </h3>
                                <p className="text-[9.5px] font-code text-slate-300 mt-1">
                                  You have completed all 19 courses and mastered every exercise. You are a Principal Software Architect!
                                </p>
                              </div>
                            )}
                          </div>

                          {rec && (
                            <button
                              onClick={() => {
                                audioEngine.playClickSound();
                                setSelectedWorld(rec.moduleName);
                                setSelectedLevelIndex(rec.levelIndex);

                                const currentSyllabusWorld = worldSyllabus.find(w => w.worldName === rec.moduleName);
                                if (currentSyllabusWorld) {
                                  startLessonPractice(rec.levelIndex);
                                } else {
                                  const challenges = CHALLENGES_DATABASE[rec.moduleName] || [];
                                  if (challenges.length > 0) {
                                    setArenaChallenge(challenges[0]);
                                    setUserCode(challenges[0].starterCode);
                                    setDiagnosticsStatus('idle');
                                    setTestCases([
                                      { id: 1, title: 'Syntactic Vector Check', status: 'idle' },
                                      { id: 2, title: 'Architectural Bounds Check', status: 'idle' },
                                      { id: 3, title: 'Operational Logic Check', status: 'idle' }
                                    ]);
                                    setDiagnosticsMessage('Workspace loaded. Execute compile vector.');
                                    setCurrentScreen('arena');
                                  }
                                }
                              }}
                              className="w-full py-3 bg-[#D2E823] hover:bg-[#c2d813] text-[#09090B] rounded-xl text-[10px] font-display transition-all shadow-sm cursor-pointer font-bold mt-4 uppercase text-center select-none"
                            >
                              🚀 Begin Module: {rec.moduleName.toUpperCase()}
                            </button>
                          )}
                        </div>
                      </ThreeDTilt>

                      {/* Track Filter Section header (Spans 12) */}
                      <div className="md:col-span-12 space-y-4 pt-4 select-none">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-[#09090B]/10 pb-2">
                          <h3 className="font-display text-sm tracking-tight uppercase">⚔️ EXPLORE SYLLABUS ROADMAPS</h3>

                          {/* Track filter buttons */}
                          <div className="flex flex-wrap gap-1.5">
                            {SKILL_TRACKS.map(track => {
                              const isSelected = activeTrackId === track.id;
                              return (
                                <button
                                  key={track.id}
                                  onClick={() => {
                                    audioEngine.playClickSound();
                                    setActiveTrackId(track.id);
                                  }}
                                  className={`px-3 py-1.5 rounded-lg border-2 text-[9px] font-code font-bold uppercase transition-all btn-press shadow-brutal-glass-sm ${isSelected
                                    ? 'bg-[#D2E823] border-[#09090B]'
                                    : 'glass-inner border-[#09090B]/10 opacity-70 hover:opacity-100'
                                    }`}
                                >
                                  {track.name.split(':')[0]}
                                </button>
                              );
                            })}
                          </div>
                        </div>

                        {activeTrackId !== 'all' && (
                          <div className="p-3 bg-[#D2E823]/10 border-2 border-dashed border-[#D2E823] rounded-xl text-[9px] font-code leading-relaxed">
                            <span className="font-bold text-[#09090B] uppercase">
                              {SKILL_TRACKS.find(t => t.id === activeTrackId)?.name}:
                            </span>{' '}
                            {SKILL_TRACKS.find(t => t.id === activeTrackId)?.description}
                          </div>
                        )}
                      </div>
                    </>
                  );
                })()}

                {/* 3. Category cards */}
                {WORLD_CARDS_DATA
                  .filter(card => {
                    if (activeTrackId === 'all') return true;
                    const track = SKILL_TRACKS.find(t => t.id === activeTrackId);
                    return track?.modules.includes(card.name);
                  })
                  .map((card) => {
                    return (
                      <ThreeDTilt key={card.name} className="md:col-span-3 h-full">
                        <div
                          onClick={() => !card.locked && enterWorldArena(card.name)}
                          onMouseEnter={() => setHoveredLanguage(card.name)}
                          onMouseLeave={() => setHoveredLanguage(null)}
                          className={`glass-outer rounded-2xl p-5 shadow-brutal-glass hover:shadow-none transition-all duration-200 cursor-pointer flex flex-col justify-between min-h-[160px] dot-grid-pattern relative text-[#09090B] h-full w-full ${card.locked ? 'opacity-90' : ''
                            }`}
                        >
                          {/* Hover capsule badge metrics */}
                          <AnimatePresence>
                            {hoveredLanguage === card.name && (
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.8 }}
                                className="bg-[#D2E823] text-[#09090B] border-2 border-[#09090B] px-2 py-0.5 text-[8px] font-black tracking-widest uppercase font-mono shadow-brutal-glass-sm absolute -top-10 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-50 select-none pointer-events-none"
                              >
                                {card.metrics}
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Lock Mask */}
                          {card.locked && (
                            <div className="absolute inset-0 bg-[#09090B]/10 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center gap-2">
                              <div className="w-10 h-10 rounded-full bg-[#09090B] flex items-center justify-center text-[#D2E823] border-2 border-[#09090B] shadow-brutal-glass-sm">
                                <Lock className="w-4 h-4 animate-pulse" />
                              </div>
                              <span className="text-[8px] font-code font-bold bg-[#09090B] text-white px-2 py-0.5 rounded border border-white/10 uppercase tracking-widest">
                                LOCKED SYSTEM
                              </span>
                            </div>
                          )}

                          <div className="flex justify-between items-start select-none">
                            {/* High-Contrast Brand Icon container */}
                            <div className="w-10 h-10 rounded bg-white border-2 border-[#09090B] p-2 shadow-brutal-glass-sm flex items-center justify-center hover:bg-[#D2E823] text-[#09090B] hover:translate-y-[-2px] transition-all">
                              {card.svg}
                            </div>
                            <span className="text-[9px] font-code font-bold glass-inner border border-[#09090B]/20 px-1.5 py-0.5 rounded text-[#09090B]">{card.label}</span>
                          </div>

                          <div className="pt-4 select-none">
                            <h4 className="font-display text-xs text-[#09090B] uppercase">{card.title}</h4>
                            <p className="text-[10px] font-body text-[#09090B]/60 leading-relaxed mt-1">{card.desc}</p>
                          </div>
                        </div>
                      </ThreeDTilt>
                    );
                  })}

                {/* 4. Digital Trophies Cabinet (Achievements) */}
                <div className="md:col-span-6 glass-outer p-6 shadow-brutal-glass-lg rounded-2xl select-none flex flex-col justify-between min-h-[240px] text-[#09090B]">
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Trophy className="w-5 h-5 text-[#D2E823]" />
                      <h3 className="font-display text-sm tracking-tight text-[#09090B] uppercase">TROPHIES & BADGES CABINET</h3>
                    </div>
                    <p className="text-[10px] font-code text-[#09090B]/60 leading-relaxed">
                      Complete learning modules and compile correct sandbox syntax blueprints to unlock achievements and credentials.
                    </p>

                    {/* Badge Cabinet Grid */}
                    <div className="grid grid-cols-4 gap-3 pt-2">
                      {[
                        { id: 'first-blood', name: 'First Blood', desc: 'First compile pass', icon: '⚡' },
                        { id: 'semantic-architect', name: 'Semantic Guru', desc: '100% HTML5 syllabus', icon: '🏛️' },
                        { id: 'logic-wizard', name: 'Logic Wizard', desc: 'Core JavaScript mastery', icon: '🔮' },
                        { id: 'algorithm-master', name: 'Algo Master', desc: 'Strict TypeScript algorithms', icon: '🧠' }
                      ].map(badge => {
                        let unlocked = false;
                        if (badge.id === 'first-blood') unlocked = completedMissions.length >= 1;
                        if (badge.id === 'semantic-architect') unlocked = completedMissions.length >= 3;
                        if (badge.id === 'logic-wizard') unlocked = completedMissions.length >= 5;
                        if (badge.id === 'algorithm-master') unlocked = completedMissions.length >= 10;

                        return (
                          <div
                            key={badge.id}
                            className={`p-2.5 rounded-xl border text-center relative group flex flex-col items-center justify-center transition-all ${unlocked ? 'bg-[#D2E823]/20 border-[#D2E823]/50 shadow-brutal-glass-sm' : 'glass-inner border-black/5 opacity-40'}`}
                            title={`${badge.name}: ${badge.desc}`}
                          >
                            <span className="text-xl mb-1">{badge.icon}</span>
                            <span className="text-[7.5px] font-code font-black uppercase truncate w-full block">{badge.name}</span>
                            {unlocked ? (
                              <span className="text-[6px] bg-[#D2E823] text-black px-1 rounded-sm mt-1 font-bold">UNLOCKED</span>
                            ) : (
                              <span className="text-[6px] bg-slate-700/50 text-white/50 px-1 rounded-sm mt-1">LOCKED</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <div className="pt-3 border-t border-[#09090B]/10 text-[8.5px] font-mono text-[#09090B]/50">
                    OPERATOR_TROPHIES_SYNCED: {completedMissions.length >= 1 ? "RUNNING_METRICS_ACTIVE" : "AWAITING_ARENA_INITIALIZATION"}
                  </div>
                </div>

                {/* 5. Daily Coding Quiz & Streak Booster */}
                <div className="md:col-span-6 glass-outer p-6 shadow-brutal-glass-lg rounded-2xl relative overflow-hidden min-h-[240px] flex flex-col justify-between text-[#09090B]">
                  <div className="space-y-3 w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#D2E823]" />
                        <h3 className="font-display text-sm tracking-tight text-[#09090B] uppercase">DAILY STREAK BOOSTER</h3>
                      </div>
                      <span className="text-[8px] font-code font-black bg-[#D2E823] text-black px-1.5 py-0.5 rounded shadow-brutal-glass-sm uppercase">
                        +50 XP
                      </span>
                    </div>

                    {!quizSubmitted ? (
                      <div className="space-y-3">
                        <p className="text-[10.5px] font-code font-black text-[#09090B] leading-snug">
                          {QUIZ_QUESTIONS[quizIndex].question}
                        </p>
                        <div className="grid grid-cols-1 gap-1.5">
                          {QUIZ_QUESTIONS[quizIndex].options.map((option, idx) => (
                            <button
                              key={idx}
                              type="button"
                              onClick={() => { audioEngine.playClickSound(); setQuizSelectedOption(idx); }}
                              className={`w-full text-left text-[9.5px] font-code p-2 rounded-lg border transition-all ${quizSelectedOption === idx ? 'bg-[#D2E823] border-[#09090B] font-bold' : 'glass-inner border-[#09090B]/10 hover:bg-white/20'}`}
                            >
                              {String.fromCharCode(65 + idx)}. {option}
                            </button>
                          ))}
                        </div>
                        <button
                          type="button"
                          disabled={quizSelectedOption === null}
                          onClick={() => {
                            if (quizSelectedOption === null) return;
                            audioEngine.playClickSound();
                            const correct = quizSelectedOption === QUIZ_QUESTIONS[quizIndex].answerIndex;
                            setQuizCorrect(correct);
                            setQuizSubmitted(true);
                            if (correct) {
                              addXP(50);
                              audioEngine.playSuccessChime();
                            } else {
                              audioEngine.playErrorBuzzer();
                            }
                          }}
                          className="w-full py-2 bg-[#09090B] disabled:bg-gray-400 text-white rounded text-[9.5px] font-display uppercase tracking-wider btn-press cursor-pointer"
                        >
                          SUBMIT ANSWER ⚡
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2 pt-1 animate-fade-up">
                        <div className={`p-3 rounded-lg border text-[10px] font-code leading-relaxed ${quizCorrect ? 'bg-emerald-500/20 border-emerald-500/30 text-emerald-800' : 'bg-red-500/20 border-red-500/30 text-red-800'}`}>
                          <p className="font-black text-xs uppercase mb-1">
                            {quizCorrect ? '🎉 CORRECT DECISION!' : '❌ SYSTEM OVERRIDE FAILED'}
                          </p>
                          <p className="mb-2 font-body font-semibold">{QUIZ_QUESTIONS[quizIndex].explanation}</p>
                          <p className="text-[9px] font-black text-black">Reward: {quizCorrect ? '+50 XP Awarded to profile.' : '+0 XP. Reload terminal next time.'}</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            audioEngine.playClickSound();
                            setQuizIndex((quizIndex + 1) % QUIZ_QUESTIONS.length);
                            setQuizSelectedOption(null);
                            setQuizSubmitted(false);
                            setQuizCorrect(null);
                          }}
                          className="w-full py-1.5 glass-inner border border-[#09090B]/10 rounded text-[9px] font-code font-bold uppercase transition-all hover:bg-white/30 cursor-pointer"
                        >
                          [ LOAD NEXT STREAK BOOSTER ]
                        </button>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </motion.div>
          )}

          {/* SCREEN: ROADMAP HUB */}
          {currentScreen === 'roadmap' && (() => {
            const currentSyllabusWorld = worldSyllabus.find(w => w.worldName === selectedWorld) || worldSyllabus[0];
            const levels = currentSyllabusWorld.levels;
            const selectedLevel = levels[selectedLevelIndex] || levels[0];
            const isSelectedLevelLocked = selectedLevelIndex > 0 && levels[selectedLevelIndex - 1] && !completedMissions.includes(levels[selectedLevelIndex - 1].id);

            return (
              <motion.div
                key="roadmap"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                className="w-full space-y-6 text-[#09090B]"
              >
                {/* Header Strip */}
                <div className="glass-outer rounded-xl p-4 shadow-brutal-glass flex justify-between items-center select-none text-[#09090B]">
                  <div className="flex items-center gap-2.5">
                    <Code className="w-5 h-5 text-[#D2E823]" />
                    <span className="font-display text-sm tracking-tight text-[#09090B] uppercase">
                      LEARNING ROADMAP: {selectedWorld.toUpperCase()}
                    </span>
                  </div>
                  <button
                    onClick={() => {
                      audioEngine.playClickSound();
                      setCurrentScreen('dashboard');
                    }}
                    className="px-4 py-2 bg-[#D2E823] border-2 border-[#09090B] rounded-lg text-[9.5px] font-display text-[#09090B] shadow-brutal-glass-sm btn-press cursor-pointer uppercase font-bold"
                  >
                    [ BACK TO DASHBOARD ]
                  </button>
                </div>

                {/* 2-Column Bento Split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                  {/* Left Column: Vertical Roadmap timeline path */}
                  <div className="lg:col-span-5 glass-outer rounded-2xl p-6 shadow-brutal-glass-lg relative overflow-hidden select-none text-[#09090B] max-h-[600px] overflow-y-auto">
                    <div className="absolute inset-0 dot-pattern opacity-[0.03] pointer-events-none" />

                    <h3 className="font-display text-xs tracking-tight text-[#09090B] uppercase mb-6">PROGRESS TRAIL</h3>

                    <div className="relative space-y-8 pl-4">
                      {/* Connecting Line */}
                      <div className="absolute left-7 top-4 bottom-4 w-1 bg-[#09090B]/10 z-0" />

                      {levels.map((lvl, idx) => {
                        const isCompleted = completedMissions.includes(lvl.id);
                        const isSelected = selectedLevelIndex === idx;
                        const isLocked = idx > 0 && !completedMissions.includes(levels[idx - 1].id);

                        return (
                          <div
                            key={lvl.id}
                            onClick={() => {
                              if (isLocked) {
                                audioEngine.playErrorBuzzer();
                                setInfoModal({
                                  isOpen: true,
                                  type: 'error',
                                  title: 'Level Locked',
                                  message: `Complete Level ${idx} before practicing this level.`
                                });
                                return;
                              }
                              setSelectedLevelIndex(idx);
                            }}
                            className={`flex items-center gap-4 relative z-10 ${isLocked ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
                              }`}
                          >
                            {/* Node Indicator */}
                            <div
                              className={`w-10 h-10 rounded-full border-2 border-[#09090B] flex items-center justify-center font-display text-xs transition-all shadow-brutal-glass-sm ${isSelected
                                ? 'bg-[#D2E823] text-black scale-110 shadow-none'
                                : isCompleted
                                  ? 'bg-emerald-500 text-white'
                                  : isLocked
                                    ? 'bg-slate-200 text-slate-400 border-slate-300 shadow-none'
                                    : 'bg-white text-black hover:bg-[#D2E823]/30'
                                }`}
                            >
                              {isCompleted ? '✔' : isLocked ? <Lock className="w-3.5 h-3.5 text-slate-400" /> : lvl.levelNumber}
                            </div>

                            {/* Node Label */}
                            <div className="flex-1">
                              <div className="flex items-center gap-2">
                                <span className={`text-[10px] font-code font-bold px-1.5 py-0.5 rounded border ${isCompleted ? 'bg-emerald-100 border-emerald-500 text-emerald-700' :
                                  'bg-yellow-100 border-yellow-500 text-yellow-700'
                                  }`}>
                                  {lvl.tier.toUpperCase()}
                                </span>
                              </div>
                              <h4 className="font-display text-sm text-[#09090B] mt-1 uppercase truncate max-w-[200px]">
                                {lvl.title}
                              </h4>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Right Column: Dynamic Lesson Codex & Workspace Loader */}
                  <div className="lg:col-span-7 glass-outer rounded-2xl p-6 shadow-brutal-glass-lg relative overflow-hidden text-[#09090B]">
                    <div className="absolute inset-0 dot-pattern opacity-[0.03] pointer-events-none" />

                    <div className="flex justify-between items-center select-none border-b border-[#09090B]/10 pb-4 mb-4">
                      <div>
                        <span className="text-[9px] font-code font-bold text-[#09090B]/50 block uppercase">LESSON STUDY CENTER</span>
                        <h2 className="font-display text-lg text-[#09090B] uppercase">
                          LEVEL {selectedLevel.levelNumber}: {selectedLevel.title}
                        </h2>
                      </div>

                      {/* Status indicator */}
                      <span className={`text-[9px] font-code font-bold px-2 py-0.5 border-2 rounded uppercase tracking-wider ${completedMissions.includes(selectedLevel.id) ? 'bg-emerald-100 border-emerald-600 text-emerald-700' :
                        'bg-yellow-100 border-yellow-500 text-yellow-700'
                        }`}>
                        {completedMissions.includes(selectedLevel.id) ? '✔ Completed' : '🔓 Ready to Practice'}
                      </span>
                    </div>

                    {/* Instructions Box */}
                    <div className="p-5 bg-[#D2E823]/10 border border-[#D2E823]/30 rounded-xl shadow-sm mb-5 select-text">
                      <span className="text-[11px] font-code font-bold text-[#88a000] tracking-widest block mb-2 uppercase flex items-center gap-1.5">
                        ⚡ LESSON INSTRUCTION
                      </span>
                      <p className="text-sm font-body font-semibold leading-relaxed text-slate-900">
                        {selectedLevel.instructions}
                      </p>
                    </div>

                    {/* Tab Selection */}
                    <div className="flex gap-0.5 select-none mb-2">
                      {[
                        { key: 'analogy', label: 'ANALOGY' },
                        { key: 'blueprint', label: 'BLUEPRINT' },
                        { key: 'deep', label: 'DEEP DIVE' }
                      ].map(tab => (
                        <button
                          key={tab.key}
                          onClick={() => {
                            audioEngine.playClickSound();
                            setCodexTab(tab.key as any);
                          }}
                          className={`folder-tab text-[9px] font-code font-bold py-1.5 px-3 cursor-pointer ${codexTab === tab.key ? 'folder-tab-active' : 'folder-tab-inactive'
                            }`}
                        >
                          {tab.label}
                        </button>
                      ))}
                    </div>

                    {/* Tab display */}
                    <div className="glass-inner p-4 rounded-b-lg rounded-tr-lg min-h-[120px] text-xs font-body leading-relaxed text-[#09090B]/85 select-text mb-6">
                      {codexTab === 'analogy' && <p>{selectedLevel.codex.analogy}</p>}
                      {codexTab === 'blueprint' && (
                        <pre className="bg-[#09090B]/90 text-[#D2E823] p-2.5 rounded font-code text-[11px] overflow-x-auto border border-[#09090B]">
                          {selectedLevel.codex.blueprint.replace(/```[a-z]*/g, '').replace(/\\n/g, '\n')}
                        </pre>
                      )}
                      {codexTab === 'deep' && <p>{selectedLevel.codex.deepDive}</p>}
                    </div>

                    {/* Action Hub */}
                    <div className="flex flex-col sm:flex-row gap-3 select-none">
                      <button
                        onClick={() => {
                          if (isSelectedLevelLocked) {
                            audioEngine.playErrorBuzzer();
                            return;
                          }
                          startLessonPractice(selectedLevelIndex);
                        }}
                        disabled={isSelectedLevelLocked}
                        className={`flex-1 py-3 border-2 border-[#09090B] rounded-lg text-xs font-display shadow-brutal-glass flex items-center justify-center gap-2 uppercase font-bold transition-all ${isSelectedLevelLocked
                          ? 'bg-slate-100 border-slate-300 text-slate-400 cursor-not-allowed shadow-none'
                          : 'bg-[#D2E823] text-[#09090B] btn-press cursor-pointer'
                          }`}
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        {isSelectedLevelLocked
                          ? `🔒 Locked (Complete Level ${selectedLevelIndex} First)`
                          : completedMissions.includes(selectedLevel.id)
                            ? 'Re-Practice Level Code'
                            : 'Start Level Practice'}
                      </button>

                      <button
                        onClick={() => {
                          audioEngine.playClickSound();
                          setIsMentorOpen(true);
                          // Prep chat system to explain this topic
                          setMentorMessages(prev => [
                            ...prev,
                            {
                              sender: 'user',
                              text: `Explain level ${selectedLevel.levelNumber} of ${selectedWorld}: ${selectedLevel.title}. Describe the analogy and validation constraints.`,
                              timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                            }
                          ]);
                          handleMentorChatSubmitDirectly(`Explain level ${selectedLevel.levelNumber} of ${selectedWorld}: ${selectedLevel.title}. Describe the analogy and validation constraints.`);
                        }}
                        className="py-3 px-5 glass-inner rounded-lg text-xs font-code font-bold text-[#09090B] shadow-brutal-glass-sm btn-press cursor-pointer flex items-center justify-center gap-1.5 uppercase"
                      >
                        <Bot className="w-3.5 h-3.5 text-[#09090B]" /> ASK MENTOR (AI)
                      </button>
                    </div>
                  </div>

                </div>
              </motion.div>
            );
          })()}

          {/* SCREEN 4: THE AI DUNGEON MASTER */}
          {currentScreen === 'arena' && (
            <motion.div
              key="arena"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className={`grid grid-cols-1 lg:grid-cols-12 gap-4 ${shakeTrigger ? 'brutal-shake' : ''}`}
            >

              {/* Left Panel: Codex (Spans 4) */}
              <aside className="lg:col-span-4 glass-outer rounded-2xl p-5 flex flex-col justify-between shadow-brutal-glass text-[#09090B]">
                <div className="space-y-4">
                  {/* Header info */}
                  <div className="select-none">
                    <span className="text-[11px] font-code font-bold bg-[#D2E823]/80 backdrop-blur-sm border border-[#09090B] px-2 py-0.5 rounded uppercase">{selectedWorld}</span>
                    <h2 className="font-display text-base mt-2 text-[#09090B] leading-none uppercase">{arenaChallenge.title}</h2>
                  </div>

                  {/* Highlighted Level Instruction card */}
                  <div className="p-5 bg-[#D2E823]/10 border border-[#D2E823]/30 rounded-xl shadow-sm mb-2 select-text">
                    <span className="text-[11px] font-code font-bold text-[#88a000] tracking-widest block mb-2 uppercase flex items-center gap-1.5">
                      ⚡ EXERCISE INSTRUCTION
                    </span>
                    <p className="text-sm font-body font-semibold leading-relaxed text-slate-900">
                      {arenaChallenge.instruction}
                    </p>
                  </div>

                  {/* Folder Tab Cutouts */}
                  <div className="flex gap-0.5 select-none pt-2">
                    {[
                      { key: 'analogy', label: 'ANALOGY' },
                      { key: 'blueprint', label: 'BLUEPRINT' },
                      { key: 'deep', label: 'DEEP DIVE' }
                    ].map(tab => (
                      <button
                        key={tab.key}
                        onClick={() => {
                          audioEngine.playClickSound();
                          setCodexTab(tab.key as any);
                        }}
                        className={`folder-tab text-[11px] font-code font-bold py-1.5 px-3 cursor-pointer ${codexTab === tab.key ? 'folder-tab-active' : 'folder-tab-inactive'
                          }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Content */}
                  <div className="glass-inner p-4 rounded-b-lg rounded-tr-lg min-h-[140px] text-sm font-body leading-relaxed text-[#09090B]">
                    {codexTab === 'analogy' && <p>{arenaChallenge.analogy}</p>}
                    {codexTab === 'blueprint' && (
                      <pre className="bg-[#09090B]/85 backdrop-blur-lg text-[#D2E823] p-2.5 rounded font-code text-[13px] overflow-x-auto border border-[#09090B]">
                        {arenaChallenge.blueprint.replace(/```[a-z]*/g, '').replace(/\\n/g, '\n')}
                      </pre>
                    )}
                    {codexTab === 'deep' && <p>{arenaChallenge.deepDive}</p>}
                  </div>
                </div>

                <div className="pt-4 select-none flex flex-col gap-2">
                  <button
                    onClick={() => {
                      audioEngine.playClickSound();
                      setIsMentorOpen(true);
                    }}
                    className="w-full py-2 bg-[#D2E823] border-2 border-[#09090B] rounded-lg text-[9.5px] font-display text-[#09090B] shadow-brutal-glass-sm btn-press cursor-pointer flex items-center justify-center gap-1.5 uppercase font-bold"
                  >
                    <Bot className="w-3.5 h-3.5" /> ASK AI MENTOR
                  </button>

                </div>
              </aside>

              {/* Center Panel: IDE Workspace (Spans 5) */}
              <main className={`lg:col-span-5 glass-dark-code rounded-2xl flex flex-col justify-between overflow-hidden shadow-brutal-glass-lg ${diagnosticsStatus === 'success' ? 'code-success-flash' : diagnosticsStatus === 'failed' ? 'code-error-flash' : ''
                }`}>
                {/* File Header with Custom Language Dropdown Selector */}
                <div className="bg-transparent border-b border-[#F8F4E8]/10 px-4 py-2 flex items-center justify-between select-none">
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-sm bg-[#DC2626]" />
                    <div className="w-2 h-2 rounded-sm bg-[#D2E823]" />
                    <div className="w-2 h-2 rounded-sm bg-[#F8F4E8]" />

                    {/* Custom Dropdown Selector inside IDE Header */}
                    <div className="ml-2 relative">
                      <select
                        value={selectedWorld}
                        onChange={(e) => {
                          const val = e.target.value;
                          const card = WORLD_CARDS_DATA.find(c => c.name === val);
                          if (card && !card.locked) {
                            enterWorldArena(val);
                          }
                        }}
                        className="bg-black/60 text-[#D2E823] font-code font-bold text-[9px] border-2 border-[#D2E823]/30 px-1 py-0.5 rounded focus:outline-none cursor-pointer uppercase"
                      >
                        {WORLD_CARDS_DATA.map(c => (
                          <option key={c.name} value={c.name} disabled={c.locked}>
                            {c.title} {c.locked ? '🔒' : ''}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Visual Brand Icon next to filename */}
                  <div className="flex items-center gap-1.5">
                    <div className="w-5 h-5 rounded bg-white border border-[#F8F4E8]/20 flex items-center justify-center p-0.5 scale-75">
                      {WORLD_CARDS_DATA.find(c => c.name === selectedWorld)?.svg}
                    </div>
                    <span className="text-[10px] font-code text-[#F8F4E8]/40">{arenaChallenge.targetFile}</span>
                  </div>
                </div>

                {/* Real-time Interactive Execution Output Sandbox */}
                <div className="relative h-44 bg-[#09090B] border-b border-white/10 overflow-hidden flex flex-col justify-between p-3 select-none">
                  {/* Console Header */}
                  <div className="flex justify-between items-center text-[9px] font-mono text-[#D2E823] z-10 border-b border-white/5 pb-1.5 mb-1.5">
                    <span className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      COMPILER SANDBOX RUNTIME: {diagnosticsStatus.toUpperCase()}
                    </span>
                    <span className="uppercase text-[8px] font-bold">PREVIEW TYPE: {
                      (selectedWorld.toLowerCase().includes('html') || selectedWorld.toLowerCase().includes('css') || selectedWorld.toLowerCase().includes('react'))
                        ? 'Live DOM View'
                        : 'Terminal Output'
                    }</span>
                  </div>

                  {/* Sandbox Display Content */}
                  <div className="flex-grow overflow-auto relative z-10 font-mono text-[10px] leading-relaxed text-[#F8F4E8]/90">
                    {(selectedWorld.toLowerCase().includes('html') || selectedWorld.toLowerCase().includes('css') || selectedWorld.toLowerCase().includes('react')) ? (
                      <div className="w-full h-full bg-white rounded-lg overflow-hidden border border-white/20">
                        <iframe
                          title="SyntaxKnight Interactive Preview"
                          srcDoc={`
                            <!DOCTYPE html>
                            <html>
                              <head>
                                <meta charset="UTF-8">
                                <style>
                                  body { font-family: system-ui, -apple-system, sans-serif; padding: 12px; margin: 0; background: #fafafa; color: #111; font-size: 13px; line-height: 1.4; }
                                  ${(selectedWorld.toLowerCase().includes('css') || selectedWorld.toLowerCase().includes('armor')) ? userCode : ''}
                                </style>
                              </head>
                              <body>
                                ${(selectedWorld.toLowerCase().includes('html') || selectedWorld.toLowerCase().includes('fortress')) ? userCode : `
                                  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100px; text-align: center;">
                                    <div style="font-weight: bold; color: #D2E823; font-size: 16px; background: #000; padding: 8px 12px; border-radius: 6px;">SYNTAX_KNIGHT_OK</div>
                                    <p style="color: #666; font-size: 10px; margin-top: 6px;">Visual layout output sandbox initialized.</p>
                                  </div>
                                `}
                              </body>
                            </html>
                          `}
                          sandbox="allow-scripts"
                          className="w-full h-full border-none bg-white"
                        />
                      </div>
                    ) : (
                      /* Terminal STDOUT Log Console */
                      <div className="space-y-1 p-1 select-text">
                        {executeUserCode(userCode, selectedWorld).map((line, i) => (
                          <div key={i} className={line.startsWith('[ERROR]') ? 'text-red-400' : line.startsWith('[RUNTIME_ERROR]') ? 'text-red-500 font-bold' : line.startsWith('[SYSTEM]') ? 'text-white/40' : 'text-[#D2E823]'}>
                            {line}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* HP & Combat logs replaced by execution outcome */}
                  <div className="flex justify-between items-center text-[8px] font-mono text-white/55 pt-1.5 border-t border-white/5 z-10 select-none">
                    <div className="flex items-center gap-1.5">
                      <span>VERIFICATION:</span>
                      <span className={`font-bold ${diagnosticsStatus === 'success' ? 'text-emerald-400' :
                        diagnosticsStatus === 'failed' ? 'text-red-400 animate-pulse' :
                          'text-[#D2E823]'
                        }`}>
                        {diagnosticsStatus === 'compiling' ? 'RUNNING CHECKS...' :
                          diagnosticsStatus === 'success' ? 'INTEGRITY PASSED' :
                            diagnosticsStatus === 'failed' ? 'VERIFICATION ERROR' :
                              'READY'}
                      </span>
                    </div>
                    <div className="text-[7.5px] text-[#D2E823] font-bold">
                      {diagnosticsStatus === 'success' ? '🎉 CLICK PROCEED FOR NEXT LEVEL!' : '📝 COMPLETE INSTRUCTIONS TO PASS'}
                    </div>
                  </div>
                </div>

                {/* Textarea Code Block (Dark Tint Glass Editor) */}
                <div className="flex-grow flex min-h-[160px]">
                  {/* Gutter */}
                  <div className="w-10 bg-black/40 border-r border-white/10 py-3 select-none flex flex-col items-end pr-2 gap-[2px]">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <span key={i} className="text-[12px] font-code text-[#F8F4E8]/25">{i + 1}</span>
                    ))}
                  </div>
                  {/* Textarea body */}
                  <textarea
                    value={userCode}
                    onChange={e => {
                      setUserCode(e.target.value);
                      if (diagnosticsStatus === 'failed') setDiagnosticsStatus('idle');
                    }}
                    spellCheck={false}
                    className="flex-grow bg-transparent text-[#D2E823] p-3 focus:outline-none font-mono text-[15px] leading-relaxed resize-none caret-[#D2E823] placeholder-[#F8F4E8]/15"
                    placeholder="// Begin writing your incantation here..."
                  />
                </div>

                {/* Submit button */}
                <div className="p-4 border-t border-[#F8F4E8]/10 bg-transparent">
                  <button
                    onClick={handleArenaCompile}
                    disabled={diagnosticsStatus === 'compiling' || isGeneratingNext}
                    className="w-full py-3 bg-[#D2E823] border-2 border-[#D2E823] rounded-lg text-xs font-display text-[#09090B] transition-all btn-press shadow-brutal-glass-sm cursor-pointer flex items-center justify-center gap-2 select-none font-bold"
                  >
                    {isGeneratingNext ? (
                      <>
                        <Cpu className="w-4 h-4 animate-spin" /> Loading next coding exercise...
                      </>
                    ) : diagnosticsStatus === 'compiling' ? (
                      <>
                        <Cpu className="w-4 h-4 animate-spin" /> Sandboxing compiler module...
                      </>
                    ) : (
                      <>
                        <Play className="w-3.5 h-3.5 fill-current" /> COMPILE & VERIFY CODE ⚡
                      </>
                    )}
                  </button>
                </div>
              </main>

              {/* Right Panel: Diagnostics Core (Spans 3) */}
              <section className="lg:col-span-3 glass-outer rounded-2xl p-5 flex flex-col justify-between shadow-brutal-glass text-[#09090B]">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 border-b-2 border-[#09090B]/10 pb-3 select-none">
                    <Sparkles className="w-4 h-4 text-[#09090B]" />
                    <h3 className="text-xs font-bold text-[#09090B] tracking-wider uppercase font-display">Diagnostics</h3>
                  </div>

                  {/* Diagnostics status badge */}
                  <div className="select-none">
                    <span className="text-[10px] font-code text-[#09090B]/40 block mb-1">COMPILATION STATE:</span>
                    <span className={`text-[10px] font-code font-bold px-2 py-0.5 border-2 rounded uppercase tracking-wider ${diagnosticsStatus === 'success' ? 'bg-[#D2E823]/20 border-[#09090B] text-[#09090B]' :
                      diagnosticsStatus === 'failed' ? 'bg-[#DC2626]/20 border-[#DC2626] text-[#DC2626]' :
                        diagnosticsStatus === 'compiling' ? 'bg-white/10 backdrop-blur-sm border-[#09090B] text-[#09090B]' :
                          'bg-white/5 border-[#09090B]/20 text-[#09090B]/40'
                      }`}>
                      {diagnosticsStatus}
                    </span>
                  </div>

                  {/* Environment Verification Callout */}
                  <div className="p-3 glass-inner rounded-lg relative overflow-hidden shadow-brutal-glass-sm select-none text-[#09090B]">
                    <div className="flex items-center gap-1.5 mb-1.5">
                      <Cpu className="w-3.5 h-3.5 text-[#09090B]" />
                      <span className="text-[9px] font-code font-bold text-[#09090B]">AI CORE TELEMETRY</span>
                    </div>
                    {/* Guard check */}
                    {!API_KEY || API_KEY === 'your_real_api_key_here' ? (
                      <p className="text-[10px] font-bold text-[#DC2626] uppercase">
                        🔒 SYSTEM CORE LOCKED: Missing API Key Authorization.
                      </p>
                    ) : (
                      <p className="text-[10px] font-code font-bold text-[#09090B]/70 truncate">
                        KEY BOUND: ...{API_KEY.slice(-8)}
                      </p>
                    )}
                  </div>

                  {/* Test Cases Panel */}
                  <div className="space-y-2 select-none border-t-2 border-[#09090B]/10 pt-3">
                    <span className="text-[10px] font-code text-[#09090B]/40 block mb-1">VERIFICATION VECTORS:</span>
                    <div className="space-y-1.5 font-mono text-[9px]">
                      {testCases.map(tc => {
                        const statusColor =
                          tc.status === 'passed' ? 'text-emerald-600 font-bold' :
                            tc.status === 'failed' ? 'text-[#DC2626] font-bold animate-pulse' :
                              tc.status === 'running' ? 'text-yellow-600 font-bold animate-pulse' :
                                'text-gray-400';
                        const statusIcon =
                          tc.status === 'passed' ? '✔' :
                            tc.status === 'failed' ? '✖' :
                              tc.status === 'running' ? '⏳' :
                                '○';
                        return (
                          <div key={tc.id} className="flex justify-between items-center p-2 rounded border border-[#09090B]/10 bg-white/50 shadow-brutal-glass-sm">
                            <span className="text-[#09090B]/80 font-bold">{tc.id}. {tc.title}</span>
                            <span className={statusColor}>
                              {statusIcon} {tc.status.toUpperCase()}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  {/* Console print window */}
                  <div className="glass-dark-code rounded-lg p-3 text-[10px] font-code leading-relaxed select-text min-h-[90px] shadow-brutal-glass-sm">
                    <span className="text-[#D2E823] select-none mr-1.5">&gt;</span>
                    {diagnosticsMessage}
                  </div>

                  <button
                    onClick={() => {
                      audioEngine.playClickSound();
                      setDiagnosticsStatus('idle');
                      setTestCases([
                        { id: 1, title: 'Syntactic Vector Check', status: 'idle' },
                        { id: 2, title: 'Architectural Bounds Check', status: 'idle' },
                        { id: 3, title: 'Operational Logic Check', status: 'idle' }
                      ]);
                      setDiagnosticsMessage('Workspace reset. Enter compile vector.');
                      setUserCode(arenaChallenge.starterCode);
                    }}
                    className="w-full py-2 glass-inner rounded-lg text-[10px] font-code font-bold text-[#09090B] transition-all btn-press shadow-brutal-glass-sm cursor-pointer flex items-center justify-center gap-1 select-none"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#D2E823]" /> RESET WORKSPACE
                  </button>

                  <button
                    onClick={() => {
                      audioEngine.playClickSound();
                      setCurrentScreen('roadmap');
                    }}
                    className="w-full py-2 bg-white border-2 border-[#09090B] rounded-lg text-[10px] font-code font-bold text-[#09090B] transition-all btn-press shadow-brutal-glass-sm cursor-pointer flex items-center justify-center gap-1.5 select-none hover:bg-[#D2E823]"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" /> BACK TO ROADMAP
                  </button>

                  {/* Extension Module 2: Live Miniature DBMS SQL Sandbox Terminal */}
                  <div className="border-t-2 border-[#09090B]/10 pt-4 mt-2 space-y-2">
                    <span className="text-[8.5px] font-code font-black bg-[#09090B] text-white px-2 py-0.5 rounded border border-white/10 uppercase tracking-widest block w-max">
                      MINI DBMS TERMINAL
                    </span>
                    <div className="space-y-2">
                      {/* Database table view */}
                      <div className="w-full glass-inner overflow-x-auto rounded-lg">
                        <table className="w-full text-left font-mono text-[8px] select-none text-[#09090B]">
                          <thead>
                            <tr className="border-b-2 border-[#09090B] bg-[#D2E823]/20">
                              <th className="p-1 border-r border-[#09090B]">LEVEL_ID</th>
                              <th className="p-1 border-r border-[#09090B]">MODULE_NAME</th>
                              <th className="p-1">STATUS</th>
                            </tr>
                          </thead>
                          <tbody>
                            {mockDbRecords
                              .filter(r => !dbFilterStatus || r.status === dbFilterStatus)
                              .map(record => (
                                <tr key={record.id} className="border-b border-[#09090B]/10 hover:bg-[#D2E823]/10">
                                  <td className="p-1 border-r border-[#09090B]/10">{record.id}</td>
                                  <td className="p-1 border-r border-[#09090B]/10">{record.name}</td>
                                  <td className="p-1">
                                    <span className={`px-1 py-0.5 rounded-sm font-bold text-[7px] ${record.status === 'COMPLETED' ? 'bg-green-100 text-green-700' :
                                      record.status === 'ACTIVE' ? 'bg-blue-100 text-blue-700' :
                                        record.status === 'LOCKED' ? 'bg-yellow-100 text-yellow-700' :
                                          'bg-red-100 text-red-700'
                                      }`}>
                                      {record.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                          </tbody>
                        </table>
                      </div>

                      {/* Real-time parsing query input */}
                      <div className="space-y-1">
                        <input
                          type="text"
                          value={sqlQuery}
                          onChange={(e) => setSqlQuery(e.target.value)}
                          className="w-full glass-dark-code font-mono text-[9px] p-2 focus:outline-none rounded cursor-pointer"
                          placeholder="SELECT * FROM modules WHERE status='LOCKED'"
                        />
                        {sqlError ? (
                          <div className="text-red-500 font-code font-bold text-[7px] uppercase mt-0.5">
                            ✖ {sqlError}
                          </div>
                        ) : (
                          <div className="text-green-600 font-code font-bold text-[7px] uppercase mt-0.5">
                            ✔ SQL_OK: {dbFilterStatus ? `FILTERED_BY_${dbFilterStatus}` : "DISPLAY_ALL_RECORDS"}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </motion.div>
          )}

          {/* SCREEN 5: REAL-TIME PVP CODE ARENA */}
          {currentScreen === 'pvp' && (
            <motion.div
              key="pvp"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className={`space-y-6 max-w-4xl w-full mx-auto ${shakeTrigger ? 'brutal-shake' : ''}`}
            >

              {/* Interactive Game Header */}
              <div className="glass-outer rounded-xl p-4 shadow-brutal-glass flex justify-between items-center select-none text-[#09090B]">
                <div className="flex items-center gap-2 text-[#09090B]">
                  <Swords className="w-5 h-5 text-[#D2E823]" />
                  <span className="font-display text-sm text-[#09090B]">PVP DUEL SIMULATOR</span>
                </div>
                <div className="bg-[#D2E823] border-2 border-[#09090B] px-4 py-1.5 rounded-lg shadow-brutal-glass-sm flex items-center gap-2">
                  <span className="text-[10px] font-code font-bold text-[#09090B]">COUNTDOWN:</span>
                  <span className="text-xs font-display text-[#09090B] w-6 text-center">{pvpTimer}s</span>
                </div>
              </div>

              {/* Combatants Split screen */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">

                {/* Player Card (Left) */}
                <div className="glass-outer rounded-xl p-5 shadow-brutal-glass relative overflow-hidden select-none text-[#09090B]">
                  <div className="absolute inset-0 dot-pattern opacity-[0.02] pointer-events-none" />
                  <div className="relative z-10 space-y-3">
                    <span className="text-[9px] font-code font-bold bg-[#D2E823]/80 border border-[#09090B]/20 px-1.5 py-0.5 rounded">KNIGHT</span>
                    <h3 className="font-display text-lg text-[#09090B] leading-none">KNIGHT GAUTAM</h3>

                    {/* HP bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-code font-bold">
                        <span>HEALTH POINTS</span>
                        <span>{playerHp}/100 HP</span>
                      </div>
                      <div className="w-full h-4 glass-inner rounded-sm overflow-hidden">
                        <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${playerHp}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Rival Bot Card (Right) */}
                <div className={`glass-outer rounded-xl p-5 shadow-brutal-glass relative overflow-hidden select-none text-[#09090B] transition-all duration-200 ${impactFlash ? 'bg-[#DC2626]/20' : ''
                  }`}>
                  <div className="absolute inset-0 dot-pattern opacity-[0.02] pointer-events-none" />
                  <div className="relative z-10 space-y-3">
                    <span className="text-[9px] font-code font-bold bg-[#DC2626]/10 text-[#DC2626] border border-[#DC2626]/20 px-1.5 py-0.5 rounded">RIVAL</span>
                    <h3 className="font-display text-lg text-[#09090B] leading-none">DARK_COMPILER_X</h3>

                    {/* HP bar */}
                    <div className="space-y-1">
                      <div className="flex justify-between text-[9px] font-code font-bold">
                        <span>HEALTH POINTS</span>
                        <span>{opponentHp}/100 HP</span>
                      </div>
                      <div className="w-full h-4 glass-inner rounded-sm overflow-hidden">
                        <div className="h-full bg-[#DC2626] transition-all duration-300" style={{ width: `${opponentHp}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>

              {/* Combat execution block */}
              <div className="glass-outer rounded-xl p-6 shadow-brutal-glass space-y-4 text-[#09090B]">
                <div className="border-b-2 border-[#09090B]/10 pb-3 flex justify-between items-center select-none">
                  <div>
                    <span className="text-[9px] font-code text-[#09090B]/50 block font-bold">CURRENT SPELL PROMPT TARGET:</span>
                    <span className="text-xs font-code font-bold text-[#09090B] bg-[#D2E823] px-2 py-0.5 rounded border border-[#09090B]/20">{pvpTargetCode}</span>
                  </div>
                  <span className="text-[10px] font-code text-[#09090B]/40">Type spell correctly to strike</span>
                </div>

                {/* Input text box */}
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="text"
                    value={pvpInput}
                    onChange={e => setPvpInput(e.target.value)}
                    disabled={!pvpActive || !!pvpResult}
                    placeholder="Type spell syntax target here..."
                    className="flex-grow glass-inner rounded-lg px-4 py-3 text-xs font-code focus:outline-none focus:border-[#D2E823] text-[#09090B] shadow-brutal-glass-sm"
                  />
                  <button
                    onClick={handlePvpSubmit}
                    disabled={!pvpActive || !!pvpResult}
                    className="bg-[#D2E823] border-2 border-[#09090B] px-6 py-3 rounded-lg text-xs font-display text-[#09090B] font-bold transition-all btn-press shadow-brutal-glass cursor-pointer select-none"
                  >
                    STRIKE RIVAL ⚔️
                  </button>
                </div>

                {/* Combat activity log */}
                <div className="glass-dark-code rounded-lg p-3.5 h-24 overflow-y-auto text-[10px] font-code leading-relaxed">
                  {pvpLog.map((log, i) => (
                    <div key={i} className="flex gap-2">
                      <span className="text-[#D2E823]/50 select-none">&gt;</span>
                      <span className={log.includes('[FAIL]') ? 'text-[#DC2626] font-bold' : log.includes('[USER_HIT]') ? 'text-[#D2E823] font-bold' : ''}>
                        {log}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* End game modal overlays */}
              <AnimatePresence>
                {pvpResult && (
                  <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xl select-none">
                    <motion.div
                      initial={{ scale: 1.1, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      className="glass-outer rounded-xl p-8 max-w-sm w-[90%] text-center overflow-hidden shadow-brutal-glass-xl"
                    >
                      <div className="w-16 h-16 rounded-xl bg-[#D2E823] border-2 border-[#09090B] mx-auto flex items-center justify-center mb-4 shadow-brutal-glass-sm"
                      >
                        {pvpResult === 'win' ? <Trophy className="w-8 h-8 text-[#09090B]" /> : <AlertTriangle className="w-8 h-8 text-[#09090B]" />}
                      </div>

                      <h2 className="font-display text-2xl tracking-tighter text-[#09090B] uppercase">
                        {pvpResult === 'win' ? 'VICTORY CLEARED!' : 'DEFEAT SEQUENCE'}
                      </h2>
                      <p className="text-xs text-[#09090B]/60 font-body leading-relaxed mt-2.5 text-[#09090B]">
                        {pvpResult === 'win'
                          ? 'You managed to lock down the local PVP simulator and earned +250 XP. Your knight files have been registered!'
                          : 'Rival logic core has overridden your system defenses. Reload your crystals and retry.'}
                      </p>

                      <div className="flex flex-col gap-2 mt-6">
                        <button
                          onClick={() => {
                            audioEngine.playClickSound();
                            setPlayerHp(100);
                            setOpponentHp(100);
                            setPvpTimer(30);
                            setPvpInput('');
                            setPvpResult(null);
                            setPvpActive(true);
                            setPvpLog(['[SYSTEM] Reinitializing sandbox battle arena...']);
                          }}
                          className="w-full py-2.5 bg-[#D2E823] border-2 border-[#09090B] rounded-lg text-[10px] font-display text-[#09090B] transition-all btn-press shadow-brutal-glass cursor-pointer font-bold"
                        >
                          ⚔️ REMATCH SIMULATOR
                        </button>
                        <button
                          onClick={() => {
                            audioEngine.playClickSound();
                            setCurrentScreen('dashboard');
                          }}
                          className="w-full py-2 glass-inner rounded-lg text-[10px] font-code font-bold text-[#09090B] transition-all btn-press shadow-brutal-glass-sm cursor-pointer"
                        >
                          RETURN TO DASHBOARD
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>

            </motion.div>
          )}

          {/* SCREEN 6: THE ACID LEADERBOARD DECK */}
          {currentScreen === 'leaderboard' && (
            <motion.div
              key="leaderboard"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-6 w-full max-w-4xl mx-auto text-[#09090B]"
            >

              {/* Podium Modules (Top 3) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end select-none">

                {/* 2nd place (Left) */}
                <div className="glass-outer rounded-xl p-5 shadow-brutal-glass flex flex-col items-center text-center h-[200px] justify-between text-[#09090B]">
                  <span className="text-[10px] font-code font-bold bg-[#E8E4D8]/60 backdrop-blur-sm border border-[#09090B]/20 px-2 py-0.5 rounded">2ND RANK</span>
                  <div>
                    <h4 className="font-display text-sm text-[#09090B] uppercase">SORCERESS LEA</h4>
                    <p className="text-[9px] font-code text-[#09090B]/50 mt-0.5">{GLOBAL_LEADERS[1].track}</p>
                  </div>
                  <span className="text-xs font-display text-[#09090B] bg-[#D2E823] px-2.5 py-1 rounded border-2 border-[#09090B] shadow-brutal-glass-sm">
                    {GLOBAL_LEADERS[1].xp} XP
                  </span>
                </div>

                {/* 1st place (Center - Black Bg Inverted theme) */}
                <div className="glass-dark-code rounded-xl p-5 shadow-brutal-glass-lg flex flex-col items-center text-center h-[240px] justify-between text-[#F8F4E8]">
                  <span className="sticker-badge -rotate-3 text-[10px] bg-[#D2E823] border border-[#09090B] text-black">👑 CYBER CROWN HOLDER</span>
                  <div className="py-2">
                    <h4 className="font-display text-base text-[#D2E823] uppercase">KNIGHT ARNAV</h4>
                    <p className="text-[9px] font-code text-[#F8F4E8]/50 mt-0.5">{GLOBAL_LEADERS[0].track}</p>
                  </div>
                  <span className="text-xs font-display text-[#09090B] bg-[#D2E823] px-3 py-1.5 rounded border-2 border-[#09090B] shadow-brutal-glass">
                    {GLOBAL_LEADERS[0].xp} XP
                  </span>
                </div>

                {/* 3rd place (Right) */}
                <div className="glass-outer rounded-xl p-5 shadow-brutal-glass flex flex-col items-center text-center h-[180px] justify-between text-[#09090B]">
                  <span className="text-[10px] font-code font-bold bg-[#E8E4D8]/60 backdrop-blur-sm border border-[#09090B]/20 px-2 py-0.5 rounded">3RD RANK</span>
                  <div>
                    <h4 className="font-display text-sm text-[#09090B] uppercase">KNIGHT RYAN</h4>
                    <p className="text-[9px] font-code text-[#09090B]/50 mt-0.5">{GLOBAL_LEADERS[2].track}</p>
                  </div>
                  <span className="text-xs font-display text-[#09090B] bg-[#D2E823] px-2.5 py-1 rounded border-2 border-[#09090B] shadow-brutal-glass-sm">
                    {GLOBAL_LEADERS[2].xp} XP
                  </span>
                </div>

              </div>

              {/* Leaderboards Filters */}
              <div className="glass-outer rounded-xl p-4 shadow-brutal-glass flex flex-wrap gap-2 select-none justify-center text-[#09090B]">
                {['All', 'HTML5', 'CSS3', 'JavaScript', 'React', 'Python', 'C++', 'Java', 'Rust', 'TypeScript', 'SQL', 'Go', 'C#', 'PHP', 'Swift', 'Kotlin'].map(track => (
                  <button
                    key={track}
                    onClick={() => {
                      audioEngine.playClickSound();
                      setActiveLeaderboardTrack(track);
                    }}
                    className={`text-[9px] font-code font-bold px-3 py-1.5 rounded-lg border-2 cursor-pointer transition-all ${activeLeaderboardTrack === track
                      ? 'bg-[#D2E823] border-[#09090B] text-[#09090B] shadow-brutal-glass-sm'
                      : 'border-[#09090B]/20 bg-white/15 text-[#09090B]/80 hover:border-[#09090B] hover:text-[#09090B]'
                      }`}
                  >
                    {track.toUpperCase()}
                  </button>
                ))}
              </div>

              {/* Ranks Matrix Table */}
              <div className="glass-outer rounded-xl shadow-brutal-glass overflow-hidden select-none text-[#09090B]">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-black/60 text-[#F8F4E8] text-[10px] font-code font-bold border-b-2 border-[#09090B] text-left">
                      <th className="p-3 pl-5">RANK</th>
                      <th className="p-3">CODENAME</th>
                      <th className="p-3">TRACK AREA</th>
                      <th className="p-3">SPECIALTY BADGES</th>
                      <th className="p-3 pr-5 text-right">TOTAL SCORE</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y-2 divide-[#09090B]/10 text-xs font-body font-semibold">
                    {filteredLeaders.map(leader => {
                      const isSelf = leader.name === 'KNIGHT GAUTAM';
                      return (
                        <tr
                          key={leader.rank}
                          className={`hover:bg-[#D2E823] hover:translate-x-0.5 transition-all group ${isSelf ? 'bg-[#D2E823]/30 outline outline-2 outline-[#09090B] relative z-10' : ''
                            }`}
                        >
                          <td className="p-3 pl-5 font-code font-bold">{leader.rank}</td>
                          <td className="p-3 font-display text-[11px] group-hover:tracking-wider transition-all">{leader.name}</td>
                          <td className="p-3 font-code text-[10px] text-[#09090B]/60">{leader.track}</td>
                          <td className="p-3">
                            <div className="flex gap-1">
                              {leader.badges.map((badge, idx) => (
                                <span key={idx} className="text-[7.5px] font-code font-bold bg-[#FFFEF9]/70 backdrop-blur-sm border border-[#09090B] px-1 rounded">
                                  {badge}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="p-3 pr-5 text-right font-code font-bold group-hover:text-black">{leader.xp} XP</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

            </motion.div>
          )}

          {/* SCREEN: CYBER CODEX LANGUAGE GUIDE */}
          {currentScreen === 'codex' && (
            <motion.div
              key="codex"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-6 w-full text-[#09090B]"
            >
              {/* Header strip */}
              <div className="glass-outer rounded-xl p-4 shadow-brutal-glass flex justify-between items-center select-none text-[#09090B]">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">📖</span>
                  <span className="font-display text-sm tracking-tight text-[#09090B] uppercase">
                    CYBER CODEX - ALL TOPICS ENCYCLOPEDIA
                  </span>
                </div>
                <button
                  onClick={() => {
                    audioEngine.playClickSound();
                    setCurrentScreen('dashboard');
                  }}
                  className="px-4 py-2 bg-[#D2E823] border-2 border-[#09090B] rounded-lg text-[9.5px] font-display text-[#09090B] shadow-brutal-glass-sm btn-press cursor-pointer uppercase font-bold"
                >
                  [ BACK TO HQ ]
                </button>
              </div>

              {/* Asymmetric Split Layout */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

                {/* Left Sidebar: 15 Languages Toggle */}
                <aside className="lg:col-span-3 glass-outer rounded-2xl p-4 shadow-brutal-glass-lg select-none text-[#09090B] max-h-[500px] overflow-y-auto">
                  <span className="text-[9px] font-code font-bold text-[#09090B]/50 block mb-3 uppercase tracking-wider">SELECT PROGRAMMING LANGUAGE</span>
                  <div className="flex flex-col gap-1.5">
                    {CODEX_LANGUAGES.map(world => {
                      const isSelected = activeCodexWorld === world.name;
                      return (
                        <button
                          key={world.name}
                          onClick={() => {
                            audioEngine.playClickSound();
                            setActiveCodexWorld(world.name);
                          }}
                          className={`w-full text-left font-display text-[10px] px-3 py-2 rounded-lg border-2 transition-all flex items-center gap-2 cursor-pointer ${isSelected
                            ? 'bg-[#D2E823] border-[#09090B] text-black shadow-brutal-glass-sm'
                            : 'bg-white/10 border-transparent text-[#09090B]/80 hover:bg-white/20 hover:border-[#09090B]/20'
                            }`}
                        >
                          <div className="w-4 h-4 scale-75 fill-current flex items-center justify-center">
                            {world.svg}
                          </div>
                          <span className="truncate uppercase">{world.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </aside>

                {/* Right Panel: Active Language Document Guide */}
                <section className="lg:col-span-9 space-y-6">

                  {/* Language Overview */}
                  <div className="glass-outer rounded-2xl p-6 shadow-brutal-glass-lg relative overflow-hidden text-[#09090B]">
                    <div className="absolute inset-0 dot-pattern opacity-[0.03] pointer-events-none" />

                    <div className="flex items-center gap-3 border-b-2 border-[#09090B]/10 pb-4 mb-4 select-none">
                      <div className="w-10 h-10 rounded bg-white border-2 border-[#09090B] p-2 flex items-center justify-center">
                        {CODEX_LANGUAGES.find(w => w.name === activeCodexWorld)?.svg}
                      </div>
                      <div>
                        <span className="text-[9px] font-code text-[#09090B]/50 font-bold uppercase tracking-wider">ACTIVE KERNEL TYPE MANUAL:</span>
                        <h2 className="text-xl font-display leading-none uppercase">{activeCodexWorld}</h2>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <span className="text-[9px] font-code font-bold text-[#09090B]/60 block mb-1">QUICK CONTEXT SUMMARY:</span>
                        <p className="text-xs font-body font-semibold leading-relaxed text-[#09090B]/85">
                          {CODEX_DATA[activeCodexWorld]?.quickSummary}
                        </p>
                      </div>
                      <div>
                        <span className="text-[9px] font-code font-bold text-[#09090B]/60 block mb-1">BEST PRACTICE CHARMS:</span>
                        <p className="text-xs font-body font-semibold leading-relaxed text-emerald-800">
                          ✔ {CODEX_DATA[activeCodexWorld]?.bestPractices}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* INTERACTIVE SANDBOX PLAYGROUND */}
                  <div className="glass-outer rounded-2xl p-6 shadow-brutal-glass-lg relative overflow-hidden text-[#09090B] space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">⚡</span>
                        <div>
                          <h3 className="font-display text-xs text-[#09090B] uppercase leading-none">SANDBOX COMPILER TERMINAL</h3>
                          <span className="text-[8px] font-code text-[#09090B]/50 uppercase">Instant local execution terminal environment</span>
                        </div>
                      </div>
                      <span className="text-[8px] font-code font-bold bg-[#D2E823] text-black px-1.5 py-0.5 rounded border border-[#09090B]/10">ONLINE</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Code Input */}
                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center select-none">
                          <label className="text-[9px] font-code font-bold text-[#09090B]/60 uppercase">SOURCE CODE EDITOR:</label>
                          <button
                            onClick={() => {
                              audioEngine.playClickSound();
                              const template = CODEX_TEMPLATES[activeCodexWorld] || '';
                              setCodexSandboxCode(template);
                            }}
                            className="text-[8px] font-code font-bold text-[#D2E823] bg-black px-2 py-0.5 rounded hover:text-white transition-colors"
                          >
                            RESET CODE
                          </button>
                        </div>
                        <textarea
                          value={codexSandboxCode}
                          onChange={e => setCodexSandboxCode(e.target.value)}
                          spellCheck={false}
                          className="w-full h-40 font-code text-[11px] p-3 glass-dark-code text-[#D2E823] focus:outline-none rounded-lg border border-black/10 shadow-inner resize-none select-text"
                        />
                      </div>

                      {/* Compiler Output */}
                      <div className="space-y-1.5 flex flex-col justify-between">
                        <div>
                          <label className="text-[9px] font-code font-bold text-[#09090B]/60 uppercase">COMPILER TERMINAL OUTPUT:</label>
                          <div className="w-full h-40 font-code text-[10px] p-3 bg-black/95 text-green-400 rounded-lg overflow-y-auto border border-black/15 shadow-inner whitespace-pre-wrap select-none">
                            {codexSandboxOutput}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2.5">
                      <button
                        onClick={executeCodexSandbox}
                        disabled={codexSandboxRunning}
                        className="flex-1 py-2 bg-[#D2E823] text-black border border-[#09090B]/10 text-[9.5px] font-display font-bold uppercase tracking-widest shadow-brutal-glass-sm hover:shadow-none transition-all btn-press cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        {codexSandboxRunning ? (
                          <>
                            <span className="animate-spin inline-block w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full" />
                            COMPILING SOURCE...
                          </>
                        ) : (
                          <>⚡ RUN COMPILER SEQUENCE</>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Complete Topics Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {CODEX_DATA[activeCodexWorld]?.topics.map((topic, i) => (
                      <div
                        key={i}
                        className="glass-outer rounded-xl p-5 shadow-brutal-glass flex flex-col justify-between min-h-[160px] dot-grid-pattern relative text-[#09090B]"
                      >
                        <div className="space-y-2">
                          <span className="text-[8px] font-code font-bold bg-[#D2E823] border border-[#09090B] px-1.5 py-0.5 rounded text-black tracking-widest uppercase">
                            TOPIC {i + 1}
                          </span>
                          <h4 className="font-display text-xs text-[#09090B] uppercase">{topic.name}</h4>
                          <p className="text-[10px] font-body text-[#09090B]/70 leading-relaxed">{topic.desc}</p>

                          <pre className="bg-[#09090B] text-[#D2E823] p-2 rounded font-code text-[9.5px] overflow-x-auto border border-[#09090B]/10 select-all">
                            {topic.sample}
                          </pre>
                        </div>

                        <div className="pt-3">
                          <button
                            onClick={() => {
                              audioEngine.playClickSound();
                              setIsMentorOpen(true);
                              // Prep prompt text
                              const promptText = `Explain the concept of "${topic.name}" in ${activeCodexWorld} thoroughly. Provide a clear description, use cases, and clean, formatted code examples.`;
                              setMentorMessages(prev => [
                                ...prev,
                                {
                                  sender: 'user',
                                  text: promptText,
                                  timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                                }
                              ]);
                              handleMentorChatSubmitDirectly(promptText);
                            }}
                            className="w-full py-1.5 bg-[#D2E823] border-2 border-[#09090B] rounded text-[8px] font-display text-[#09090B] shadow-brutal-glass-sm btn-press cursor-pointer flex items-center justify-center gap-1 uppercase font-bold"
                          >
                            🚀 Ask AI to Explain concept
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Ask Anything Oracle Box */}
                  <div className="glass-outer rounded-2xl p-6 shadow-brutal-glass-lg relative overflow-hidden text-[#09090B]">
                    <h3 className="font-display text-xs text-[#09090B] uppercase mb-1">🔮 CYBER ORACLE QUESTIONS</h3>
                    <p className="text-[9.5px] font-code text-[#09090B]/50 uppercase mb-4">Query the AI Mentor for any topic or compiler behavior of this language</p>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!codexCustomInput.trim() || isMentorTyping) return;

                        audioEngine.playClickSound();
                        const userText = codexCustomInput.trim();
                        setCodexCustomInput('');
                        setIsMentorOpen(true);

                        const promptText = `Regarding the programming language "${activeCodexWorld}": ${userText}`;
                        setMentorMessages(prev => [
                          ...prev,
                          {
                            sender: 'user',
                            text: promptText,
                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          }
                        ]);
                        handleMentorChatSubmitDirectly(promptText);
                      }}
                      className="flex flex-col md:flex-row gap-3"
                    >
                      <input
                        type="text"
                        value={codexCustomInput}
                        onChange={e => setCodexCustomInput(e.target.value)}
                        placeholder={`e.g., How do I manage pointers vs references in ${activeCodexWorld}?`}
                        className="flex-grow glass-inner rounded-lg px-3.5 py-2.5 text-xs font-code focus:outline-none focus:border-[#D2E823] text-[#09090B] placeholder-[#09090B]/50"
                      />
                      <button
                        type="submit"
                        disabled={isMentorTyping}
                        className="bg-[#D2E823] border-2 border-[#09090B] px-6 py-2.5 rounded-lg text-xs font-display text-[#09090B] font-bold transition-all btn-press shadow-brutal-glass cursor-pointer"
                      >
                        SUBMIT INQUIRY ➔
                      </button>
                    </form>
                  </div>

                </section>
              </div>
            </motion.div>
          )}

          {/* SCREEN: ADVANCEMENTS */}
          {currentScreen === 'advancements' && (
            <motion.div
              key="advancements"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-6 w-full text-[#09090B]"
            >
              {/* Header strip */}
              <div className="glass-outer rounded-xl p-4 shadow-brutal-glass flex justify-between items-center select-none text-[#09090B]">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🏆</span>
                  <span className="font-display text-sm tracking-tight text-[#09090B] uppercase">
                    OPERATOR ADVANCEMENTS & TROPHIES
                  </span>
                </div>
                <button
                  onClick={() => {
                    audioEngine.playClickSound();
                    setCurrentScreen('dashboard');
                  }}
                  className="px-4 py-2 bg-[#D2E823] border-2 border-[#09090B] rounded-lg text-[9.5px] font-display text-[#09090B] shadow-brutal-glass-sm btn-press cursor-pointer uppercase font-bold"
                >
                  [ BACK TO HQ ]
                </button>
              </div>

              {/* Advancements List Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {ADVANCEMENTS_LIST.map((adv) => {
                  const isUnlocked = adv.requirement(completedMissions);
                  const isClaimed = claimedAdvancements.includes(adv.id);

                  return (
                    <div
                      key={adv.id}
                      className={`glass-outer rounded-2xl p-5 shadow-brutal-glass flex flex-col justify-between border-2 transition-all relative overflow-hidden ${isUnlocked
                        ? 'border-[#09090B] bg-emerald-50/10'
                        : 'border-[#09090B]/10 opacity-70'
                        }`}
                    >
                      {/* Top Row */}
                      <div>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{adv.icon}</span>
                            <div>
                              <span className="text-[7.5px] font-code font-bold px-1.5 py-0.5 rounded bg-[#D2E823]/20 border border-[#09090B]/10 text-emerald-800 uppercase">
                                {adv.category}
                              </span>
                              <h4 className="font-display text-xs text-[#09090B] mt-1 uppercase">
                                {adv.title}
                              </h4>
                            </div>
                          </div>
                          {isUnlocked ? (
                            <span className="text-[8px] font-code font-bold bg-emerald-500 text-white px-2 py-0.5 rounded border border-[#09090B]/10 uppercase shadow-brutal-glass-sm">
                              UNLOCKED
                            </span>
                          ) : (
                            <span className="text-[8px] font-code font-bold bg-slate-200 text-slate-500 px-2 py-0.5 rounded border border-[#09090B]/10 uppercase">
                              LOCKED
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        <p className="text-[10px] text-[#09090B]/60 font-body leading-relaxed mt-3.5">
                          {adv.desc}
                        </p>
                      </div>

                      {/* Bottom Control / Progress */}
                      <div className="mt-6 pt-4 border-t border-[#09090B]/10">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-code font-bold text-[#09090B]/50 uppercase">
                            REQ: {adv.targetText}
                          </span>
                          <span className="text-[9.5px] font-code font-bold text-black uppercase">
                            REWARD: +50 XP
                          </span>
                        </div>

                        <div className="mt-4">
                          {isUnlocked ? (
                            <button
                              onClick={() => {
                                if (isClaimed) return;
                                audioEngine.playSuccessChime();
                                setClaimedAdvancements((prev: string[]) => [...prev, adv.id]);
                                addXP(100);
                              }}
                              disabled={isClaimed}
                              className={`w-full py-2.5 rounded-lg text-[9.5px] font-display border-2 border-[#09090B] text-[#09090B] transition-all btn-press shadow-brutal-glass cursor-pointer text-center font-bold ${isClaimed
                                ? 'bg-slate-100 text-slate-400 border-slate-300 shadow-none cursor-default btn-press-disabled'
                                : 'bg-[#D2E823]'
                                }`}
                            >
                              {isClaimed ? 'CLAIMED' : '🎁 CLAIM REWARD'}
                            </button>
                          ) : (
                            <div className="w-full py-2 bg-slate-100 border border-[#09090B]/10 rounded-lg text-[8.5px] font-code text-slate-400 text-center font-bold uppercase select-none">
                              🔒 NOT YET MET
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* SCREEN: TOKEN SHOP */}
          {currentScreen === 'shop' && (
            <motion.div
              key="shop"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="space-y-6 w-full text-[#09090B]"
            >
              {/* Header strip */}
              <div className="glass-outer rounded-xl p-4 shadow-brutal-glass flex justify-between items-center select-none text-[#09090B]">
                <div className="flex items-center gap-2.5">
                  <span className="text-xl">🛒</span>
                  <span className="font-display text-sm tracking-tight text-[#09090B] uppercase">
                    CYBER ITEM EXCHANGE SHOP
                  </span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => {
                      audioEngine.playClickSound();
                      setCurrentScreen('dashboard');
                    }}
                    className="px-4 py-2 bg-[#D2E823] border-2 border-[#09090B] rounded-lg text-[9.5px] font-display text-[#09090B] shadow-brutal-glass-sm btn-press cursor-pointer uppercase font-bold"
                  >
                    [ BACK TO HQ ]
                  </button>
                </div>
              </div>

              {/* Purchase Feedback Notification Toast */}
              {(doubleXpCount > 0 || skipTickets > 0 || hintRefills > 0 || streakFreezes > 0 || cyberShields > 0 || aiCredits > 0) && (
                <div className="glass-outer rounded-xl p-3 bg-emerald-50/20 border-emerald-600/30 text-emerald-800 flex flex-wrap gap-4 text-[10px] font-code font-bold select-none justify-center">
                  {doubleXpCount > 0 && <span>🔥 XP BOOST ACTIVE: {doubleXpCount} LEVELS REMAINING</span>}
                  {skipTickets > 0 && <span>🎫 SKIP TICKETS: {skipTickets}</span>}
                  {hintRefills > 0 && <span>💡 HINTS: {hintRefills}</span>}
                  {streakFreezes > 0 && <span>❄️ STREAK FREEZES: {streakFreezes}</span>}
                  {cyberShields > 0 && <span>🛡️ CYBER SHIELDS: {cyberShields}</span>}
                  {aiCredits > 0 && <span>🧠 AI CREDITS: {aiCredits}</span>}
                </div>
              )}

              {/* Shop Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {SHOP_ITEMS.map((item) => {
                  const isUnlocked = unlockedItems.includes(item.id);
                  const isOneTimeUnlock = item.category === 'Cosmetic' || item.category === 'Knowledge' || item.id === 'avatar-frame' || item.id === 'secret-codex';
                  const isAlreadyAcquired = isOneTimeUnlock && isUnlocked;

                  return (
                    <div
                      key={item.id}
                      className="glass-outer rounded-2xl p-5 shadow-brutal-glass flex flex-col justify-between border-2 border-[#09090B] transition-all bg-white relative overflow-hidden"
                    >
                      {/* Top details */}
                      <div>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{item.icon}</span>
                            <div>
                              <span className="text-[7.5px] font-code font-bold px-1.5 py-0.5 rounded bg-cyan-100 border border-cyan-300 text-cyan-800 uppercase">
                                {item.category}
                              </span>
                              <h4 className="font-display text-xs text-[#09090B] mt-1 uppercase">
                                {item.name}
                              </h4>
                            </div>
                          </div>
                          <span className="text-xs font-display text-emerald-700 bg-emerald-100/50 px-2 py-1 rounded border border-emerald-200">
                            FREE
                          </span>
                        </div>

                        <p className="text-[10px] text-[#09090B]/60 font-body leading-relaxed mt-4">
                          {item.desc}
                        </p>
                      </div>

                      {/* Buy Action Box */}
                      <div className="mt-6 pt-4 border-t border-[#09090B]/10">
                        {isAlreadyAcquired ? (
                          <div className="flex gap-2">
                            <button
                              disabled
                              className="w-full py-2 rounded-lg text-[9px] font-display border-2 border-[#09090B]/20 text-[#09090B]/40 bg-slate-100 cursor-not-allowed text-center font-bold uppercase"
                            >
                              ✔️ ACQUIRED
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => {
                              audioEngine.playSuccessChime();

                              if (isOneTimeUnlock) {
                                setUnlockedItems((prev: string[]) => [...prev, item.id]);
                              } else if (item.id === 'hint-refill') {
                                setHintRefills((prev: number) => prev + 5);
                              } else if (item.id === 'xp-booster') {
                                setDoubleXpCount((prev: number) => prev + 3);
                              } else if (item.id === 'skip-ticket') {
                                setSkipTickets((prev: number) => prev + 1);
                              } else if (item.id === 'streak-freeze') {
                                setStreakFreezes((prev: number) => prev + 1);
                              } else if (item.id === 'cyber-shield') {
                                setCyberShields((prev: number) => prev + 1);
                              } else if (item.id === 'ai-credits') {
                                setAiCredits((prev: number) => prev + 10);
                              }

                              setInfoModal({
                                isOpen: true,
                                type: 'success',
                                title: 'UNLOCKED SUCCESSFUL',
                                message: `Successfully acquired ${item.name}!`
                              });
                            }}
                            className="w-full py-2.5 bg-[#D2E823] border-2 border-[#09090B] rounded-lg text-[9.5px] font-display text-[#09090B] transition-all btn-press shadow-brutal-glass cursor-pointer text-center font-bold"
                          >
                            🛒 UNLOCK ITEM
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* Safety Fallback Screen for unrecognized layout states */}
          {!['home', 'auth', 'dashboard', 'roadmap', 'arena', 'pvp', 'leaderboard', 'codex', 'advancements', 'shop'].includes(currentScreen as string) && (
            <motion.div
              key="home-fallback"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="w-full flex items-center justify-center py-6 text-[#F8F4E8]"
            >
              <HeroSection
                onEnterMatrix={() => setCurrentScreen('auth')}
                onViewArchitecture={() => setCurrentScreen('leaderboard')}
              />
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ─── SUCCESS STAGE OVERLAY MODAL (Explicit dynamic progression engine) ─── */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xl select-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-outer rounded-xl p-8 max-w-sm w-[90%] text-center relative overflow-hidden shadow-brutal-glass-xl"
            >
              <div className="w-16 h-16 rounded-xl bg-[#D2E823]/80 backdrop-blur-sm border-2 border-[#09090B] mx-auto flex items-center justify-center mb-4 shadow-brutal-glass-sm">
                <Trophy className="w-8 h-8 text-[#09090B]" />
              </div>

              <h2 className="font-display text-2xl tracking-tighter text-[#09090B] uppercase">
                LEVEL COMPLETED!
              </h2>
              <p className="text-xs text-[#09090B]/60 font-body leading-relaxed mt-2.5">
                Excellent work! Your code syntax passed all validation test checks successfully.
              </p>

              <div className="mt-6">
                <button
                  onClick={proceedToNextLevel}
                  disabled={isGeneratingNext}
                  className="w-full py-3.5 bg-[#D2E823] border-2 border-[#09090B] rounded-lg text-xs font-display text-[#09090B] hover:bg-[#D2E823] transition-all btn-press shadow-brutal-glass-sm cursor-pointer flex items-center justify-center gap-2 font-bold"
                >
                  {isGeneratingNext ? (
                    <>
                      <Cpu className="w-4 h-4 animate-spin text-[#09090B]" />
                      GENERATING NEXT LEVEL...
                    </>
                  ) : (
                    <>
                      PROCEED TO NEXT LEVEL ➔
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── ERROR DIAGNOSIS OVERLAY MODAL (Zero-to-Max mistake assistant) ─── */}
      <AnimatePresence>
        {showErrorModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xl select-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-outer rounded-xl p-4 sm:p-6 w-[92vw] max-w-md max-h-[85vh] overflow-y-auto text-left relative shadow-brutal-glass-xl border-2 border-red-500 bg-[#F8F4E8]"
            >
              {/* Corner Close button */}
              <button
                onClick={() => {
                  audioEngine.playClickSound();
                  setShowErrorModal(false);
                }}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 p-1.5 border-2 border-[#09090B] rounded-md glass-inner btn-press-sm cursor-pointer hover:bg-red-500 hover:text-white transition-all text-black min-h-[36px] min-w-[36px] flex items-center justify-center"
              >
                <X className="w-3.5 h-3.5" />
              </button>

              {/* Alert header */}
              <div className="flex items-center gap-2.5 border-b-2 border-red-500/20 pb-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-red-100 border-2 border-[#09090B] flex items-center justify-center shadow-brutal-glass-sm shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <span className="text-[8px] font-code font-black bg-[#DC2626] text-white px-2 py-0.5 rounded border border-black/10 uppercase tracking-widest block w-max mb-0.5">
                    VERIFICATION FAULT
                  </span>
                  <h2 className="font-display text-base tracking-tighter text-[#09090B] uppercase">
                    COMPILATION ERROR
                  </h2>
                </div>
              </div>

              {/* Error message */}
              <div className="p-3 bg-red-950 text-red-200 rounded-lg border border-red-500/30 text-[10px] font-code leading-relaxed mb-4 select-text">
                <span className="text-red-400 font-bold">CRITICAL_MSG:</span> {errorModalMessage}
              </div>

              {/* Mistake analysis */}
              <div className="space-y-2 select-text mb-4">
                <span className="text-[9px] font-code font-bold text-[#09090B]/60 uppercase tracking-wider block">
                  🛡️ MISTAKE ANALYSIS & DIAGNOSIS:
                </span>
                <div className="p-3 sm:p-4 bg-white border-2 border-[#09090B] rounded-xl shadow-brutal-glass-sm text-xs font-semibold leading-relaxed text-[#09090B] font-body bg-dot-pattern">
                  {errorModalDiagnosis}
                </div>
              </div>

              {/* Correct Solution Blueprint */}
              <div className="space-y-1.5 select-text mb-4">
                <span className="text-[9px] font-code font-bold text-emerald-600 uppercase tracking-wider block">
                  🔑 CORRECT SOLUTION BLUEPRINT:
                </span>
                <div className="p-3 bg-[#09090B] text-[#D2E823] rounded-lg border-2 border-[#09090B] font-mono text-[10.5px] leading-relaxed shadow-brutal-glass-sm select-all whitespace-pre overflow-x-auto">
                  {arenaChallenge.hint ?
                    arenaChallenge.hint.replace('Example pattern match target: ', '').replace('Type: ', '').replace('Example: ', '') :
                    arenaChallenge.expectedToken.replace(/\\\\/g, '\\')
                  }
                </div>
              </div>

              <div className="mt-6 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
                <button
                  onClick={() => {
                    audioEngine.playClickSound();
                    setShowErrorModal(false);
                  }}
                  className="flex-1 py-3 bg-[#D2E823] border-2 border-[#09090B] rounded-lg text-xs font-display text-[#09090B] transition-all btn-press shadow-brutal-glass-sm cursor-pointer font-bold uppercase text-center min-h-[44px]"
                >
                  [ RETRY INCANTATION ]
                </button>
                <button
                  onClick={async () => {
                    audioEngine.playClickSound();
                    setShowErrorModal(false);
                    setIsMentorOpen(true);

                    const promptText = `I got a validation error in level "${arenaChallenge.title}" of world "${selectedWorld}".\n\nHere is my current code:\n\`\`\`javascript\n${userCode}\n\`\`\`\n\nError Message: ${errorModalMessage}\nDiagnosis: ${errorModalDiagnosis}\n\nCan you explain my mistake in detail and show me exactly how to write the correct solution?`;

                    // Add user message visually
                    setMentorMessages(prev => [
                      ...prev,
                      {
                        sender: 'user',
                        text: promptText,
                        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                      }
                    ]);

                    // Automatically trigger the OpenRouter generation pipeline
                    await handleMentorChatSubmitDirectly(promptText);
                  }}
                  className="py-3 px-4 bg-white border-2 border-[#09090B] rounded-lg text-xs font-display text-[#09090B] transition-all btn-press shadow-brutal-glass-sm cursor-pointer font-bold uppercase text-center flex items-center justify-center gap-1.5 hover:bg-white/10 hover:text-black min-h-[44px]"
                >
                  <Bot className="w-4 h-4 text-black" /> ASK AI
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── SCREEN 3: Settings Configuration Dashboard Modal (HUD Operator Panel) ─── */}
      <AnimatePresence>
        {isSettingsOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-xl select-none">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="glass-outer rounded-xl p-4 sm:p-6 w-[92vw] max-w-md max-h-[85vh] overflow-y-auto space-y-5 relative shadow-brutal-glass text-[#09090B]"
            >
              {/* Header Title */}
              <div className="flex items-center justify-between border-b-2 border-[#09090B]/10 pb-3">
                <div className="flex items-center gap-2">
                  <Settings className="w-5 h-5 text-[#09090B]" />
                  <span className="font-display text-xs tracking-tight text-[#09090B] uppercase">SYSTEM CONTROLS</span>
                </div>
                <button
                  onClick={() => {
                    audioEngine.playClickSound();
                    setIsSettingsOpen(false);
                  }}
                  className="p-1 border-2 border-[#09090B] rounded-md glass-inner btn-press-sm cursor-pointer"
                >
                  <X className="w-3.5 h-3.5 text-[#09090B]" />
                </button>
              </div>

              {/* Control Options */}
              <div className="space-y-4">

                {/* Profile Picture Upload & Editing Fields */}
                <div className="p-4 glass-inner rounded-lg space-y-4 shadow-brutal-glass-sm">
                  <span className="text-[10px] font-code font-bold text-[#09090B]/50 block uppercase">PROFILE WORKSPACE</span>

                  {/* Avatar upload */}
                  <div className="flex items-center gap-4">
                    {avatarPreview ? (
                      <img src={avatarPreview} alt="avatar" className="w-14 h-14 rounded-lg border border-[#09090B]/20 object-cover" />
                    ) : (
                      <div className="w-14 h-14 rounded-lg bg-[#E8E4D8] border border-[#09090B]/20 flex items-center justify-center">
                        <User className="w-6 h-6 text-[#09090B]/40" />
                      </div>
                    )}
                    <div className="space-y-1.5">
                      <button
                        onClick={() => {
                          audioEngine.playClickSound();
                          document.getElementById('profile-pic-file-input')?.click();
                        }}
                        className="flex items-center gap-1 text-[9px] font-code font-bold bg-[#D2E823] border border-[#09090B]/20 px-2.5 py-1.5 rounded shadow-brutal-glass-sm hover:shadow-none btn-press cursor-pointer text-black uppercase"
                      >
                        <Upload className="w-3 h-3" /> UPLOAD REAL IMAGE
                      </button>
                      <input
                        type="file"
                        id="profile-pic-file-input"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <p className="text-[8px] font-code text-[#09090B]/50">Accepts local PNG/JPG files</p>
                    </div>
                  </div>

                  {/* Username and Track inputs */}
                  <div className="space-y-3 pt-2 border-t border-[#09090B]/10">
                    <div className="space-y-1">
                      <label className="text-[9px] font-code font-bold text-[#09090B]/70 uppercase">OPERATOR ID (USERNAME):</label>
                      <input
                        type="text"
                        value={editUsername}
                        onChange={e => setEditUsername(e.target.value)}
                        placeholder="OPERATOR NAME"
                        className="w-full glass-inner font-mono text-xs p-2 text-[#09090B] placeholder-[#09090B]/60 shadow-brutal-glass-sm focus:outline-none focus:bg-white/10 transition-all cursor-pointer"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[9px] font-code font-bold text-[#09090B]/70 uppercase">DEVELOPER TRACK:</label>
                      <select
                        value={editTrack}
                        onChange={e => setEditTrack(e.target.value)}
                        className="w-full glass-inner font-mono text-xs p-2 text-[#09090B] shadow-brutal-glass-sm focus:outline-none focus:bg-white/10 transition-all cursor-pointer"
                      >
                        <option value="Frontend">FRONTEND</option>
                        <option value="Backend">BACKEND</option>
                        <option value="Fullstack">FULLSTACK</option>
                        <option value="Database">DATABASE</option>
                      </select>
                    </div>
                  </div>

                  {/* Save button */}
                  <button
                    onClick={handleSaveProfile}
                    className="w-full py-2 bg-[#D2E823] text-black border border-[#09090B]/10 text-[9px] font-code font-bold tracking-widest uppercase shadow-brutal-glass-sm hover:shadow-none transition-all btn-press cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    💾 SAVE PROFILE CHANGES
                  </button>

                  {/* Parental Guard settings */}
                  <div className="pt-2 border-t border-[#09090B]/10 space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-code font-bold">
                      <span>OPERATOR AGE VERIFICATION:</span>
                      <input
                        type="number"
                        value={parentalAge}
                        onChange={e => setParentalAge(Math.max(1, parseInt(e.target.value) || 0))}
                        className="w-12 glass-inner border border-[#09090B]/15 px-1 py-0.5 rounded text-center text-xs font-bold font-code text-[#09090B]"
                      />
                    </div>
                    {parentalAge < 18 ? (
                      <div className="p-2 bg-[#DC2626]/10 border border-[#DC2626]/20 rounded text-[8px] font-code text-[#DC2626] font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>🛡️ PARENTAL SHIELD ENGAGED: PVP ACCESS BLOCKED</span>
                      </div>
                    ) : (
                      <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded text-[8px] font-code text-emerald-600 font-bold uppercase tracking-wider flex items-center gap-1.5">
                        <UserCheck className="w-3.5 h-3.5" />
                        <span>🔓 AGENT INDEPENDENT: ALL REGIONS UNLOCKED</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 1. Mute toggle */}
                <div className="flex items-center justify-between p-3.5 glass-inner rounded-lg shadow-brutal-glass-sm">
                  <div className="flex items-center gap-2 text-xs font-code font-bold text-[#09090B]">
                    {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    <span>SYSTEM AUDIO CONTROL</span>
                  </div>
                  <button
                    onClick={toggleMuteState}
                    className={`text-[9px] font-code font-bold px-3 py-1.5 border-2 border-[#09090B] rounded-lg btn-press shadow-brutal-glass-sm cursor-pointer ${isMuted ? 'bg-[#DC2626]/20 text-[#DC2626]' : 'bg-[#D2E823] text-[#09090B]'
                      }`}
                  >
                    {isMuted ? 'MUTED' : 'ACTIVE'}
                  </button>
                </div>

                {/* 3. Theme mode dropdown */}
                <div className="flex items-center justify-between p-3.5 glass-inner rounded-lg shadow-brutal-glass-sm">
                  <div className="flex items-center gap-2 text-xs font-code font-bold text-[#09090B]">
                    <Sparkles className="w-4 h-4" />
                    <span>SYSTEM INTERFACE MODE</span>
                  </div>
                  <select
                    value={activeTheme}
                    onChange={(e) => {
                      audioEngine.playClickSound();
                      const val = e.target.value;
                      setActiveTheme(val);
                      document.documentElement.className = val;
                    }}
                    className="bg-[#09090B] text-[#D2E823] font-code font-bold text-[9px] border-2 border-[#09090B] px-2.5 py-1.5 rounded focus:outline-none cursor-pointer uppercase shadow-brutal-glass-sm font-sans"
                  >
                    <option value="light">LIGHT MODE (ACID)</option>
                    <option value="theme-dark">DARK MODE (VOID)</option>
                    <option value="theme-matrix">MATRIX (GREEN)</option>
                    <option value="theme-royal">ROYAL (GOLD)</option>
                    <option value="theme-neon">NEON RETRO (CYAN/ROSE)</option>
                  </select>
                </div>

                {/* 2. Wipe Level Reset */}
                <div className="flex items-center justify-between p-3.5 glass-inner rounded-lg shadow-brutal-glass-sm">
                  <div className="flex items-center gap-2 text-xs font-code font-bold text-[#09090B]">
                    <Trash2 className="w-4 h-4 text-[#DC2626]" />
                    <span>WIPE LEVEL HISTORY (RESET)</span>
                  </div>
                  <button
                    onClick={handleWipeData}
                    className="text-[9px] font-code font-bold px-3 py-1.5 border-2 border-[#09090B] bg-[#DC2626]/20 text-[#DC2626] rounded-lg btn-press shadow-brutal-glass-sm cursor-pointer"
                  >
                    RESET SYSTEMS
                  </button>
                </div>

              </div>

              {/* 3. Master LogOut Button */}
              <div className="border-t-2 border-[#09090B]/10 pt-4">
                <button
                  onClick={handleSignOut}
                  className="w-full py-3 bg-[#09090B] text-white border-2 border-[#09090B] rounded-lg text-xs font-display tracking-wider hover:bg-[#09090B]/90 transition-all btn-press shadow-brutal-glass cursor-pointer flex items-center justify-center gap-2"
                >
                  <LogOut className="w-4 h-4 text-[#D2E823]" />
                  <span>AUTHORIZATION TERMINATE</span>
                </button>
              </div>

              <div className="text-center text-[8px] font-code text-[#09090B]/40 select-none">
                SYNTAXKNIGHT // VERSION 1.0.3 // HARDWARE SYNTH
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── SCREEN 6: THE CYBER MENTOR SIDE-DRAWER (AI Chat Console) ─── */}
      <AnimatePresence>
        {isMentorOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 22, stiffness: 120 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[380px] md:w-96 max-w-full glass-outer border-l border-black/10 z-50 flex flex-col justify-between shadow-[-8px_0px_0px_0px_#09090B,0_12px_40px_0_rgba(31,38,135,0.15)]"
          >
            {/* Header info */}
            <div className="p-3.5 sm:p-4 border-b-2 border-[#09090B]/15 flex flex-col gap-3 select-none text-[#09090B]">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-[#D2E823]" />
                  <h3 className="font-display text-xs tracking-tight text-[#09090B] uppercase">AI CODE MENTOR</h3>
                </div>
                <button
                  onClick={() => {
                    audioEngine.playClickSound();
                    setIsMentorOpen(false);
                  }}
                  className="p-1.5 rounded-lg border-2 border-[#09090B] glass-inner btn-press-sm cursor-pointer hover:bg-[#D2E823] min-h-[36px] min-w-[36px] flex items-center justify-center"
                >
                  <X className="w-4 h-4 text-[#09090B]" />
                </button>
              </div>

              {/* AI Model Selector */}
              <div className="flex items-center justify-between gap-2 p-2 bg-[#09090B]/5 rounded-lg border border-[#09090B]/15">
                <span className="text-[9px] font-code font-bold text-[#09090B]/60 uppercase">ACTIVE MODEL:</span>
                <select
                  value={selectedAiModel}
                  onChange={(e) => {
                    audioEngine.playClickSound();
                    setSelectedAiModel(e.target.value);
                  }}
                  className="bg-[#09090B] text-[#D2E823] font-code font-bold text-[9px] border-2 border-[#09090B] px-2 py-1 rounded focus:outline-none cursor-pointer uppercase shadow-brutal-glass-sm"
                >
                  <option value="google/gemini-2.5-flash">Gemini 2.5 Flash ⚡</option>
                  <option value="google/gemini-2.5-pro">Gemini 2.5 Pro 🧠</option>
                  <option value="anthropic/claude-3.5-sonnet">Claude 3.5 Sonnet 👑</option>
                  <option value="meta-llama/llama-3.3-70b-instruct">Llama 3.3 70B 🦙</option>
                  <option value="deepseek/deepseek-chat">DeepSeek V3 🇨🇳</option>
                </select>
              </div>
            </div>

            {/* Chat timeline logs */}
            <div className="flex-grow p-3 sm:p-4 overflow-y-auto space-y-3.5 sm:space-y-4 text-xs select-text">
              {mentorMessages.map((msg, index) => {
                const isAi = msg.sender === 'ai';
                return (
                  <div key={index} className={`flex items-start gap-2.5 ${!isAi ? 'flex-row-reverse' : ''}`}>
                    <div className={`w-8 h-8 rounded-lg border-2 border-[#09090B] flex items-center justify-center shrink-0 select-none ${isAi ? 'bg-[#D2E823]/80 backdrop-blur-sm' : 'glass-inner text-[#09090B]'
                      }`}>
                      {isAi ? <Bot className="w-4 h-4 text-black" /> : <User className="w-4 h-4" />}
                    </div>
                    <div className="space-y-1 max-w-[80%] sm:max-w-[75%]">
                      <div className={`p-2.5 sm:p-3 rounded-lg border-2 border-[#09090B] leading-relaxed font-body ${isAi ? 'glass-inner text-[#09090B]' : 'bg-[#D2E823]/25 backdrop-blur-sm text-[#09090B]'
                        }`}>
                        <p className="whitespace-pre-wrap font-semibold font-body text-xs leading-relaxed">{msg.text}</p>
                      </div>
                      <span className="text-[9px] font-code text-[#09090B]/50 block text-right">{msg.timestamp}</span>
                    </div>
                  </div>
                );
              })}

              {isMentorTyping && (
                <div className="flex items-start gap-2.5 select-none">
                  <div className="w-8 h-8 rounded-lg border-2 border-[#09090B] bg-[#D2E823]/80 backdrop-blur-sm flex items-center justify-center shrink-0">
                    <Cpu className="w-4 h-4 animate-spin text-[#09090B]" />
                  </div>
                  <div className="p-3 glass-inner rounded-lg font-body font-bold text-[#09090B]/60 animate-pulse text-xs">
                    Routing query to the compiler oracle...
                  </div>
                </div>
              )}
              <div ref={chatScrollRef} />
            </div>

            {/* Input Submission */}
            <form onSubmit={handleMentorChatSubmit} className="p-3 sm:p-4 border-t-2 border-[#09090B]/15 glass-inner flex gap-2 items-center">
              <input
                type="text"
                required
                value={mentorInput}
                onChange={e => setMentorInput(e.target.value)}
                disabled={isMentorTyping}
                placeholder="Ask technical question..."
                className="flex-grow glass-inner rounded-lg px-3 py-2.5 text-xs font-code focus:outline-none focus:border-[#D2E823] text-[#09090B] shadow-brutal-glass-sm min-h-[44px]"
              />
              <button
                type="submit"
                disabled={isMentorTyping || !mentorInput.trim()}
                className="p-3 bg-[#D2E823] border-2 border-[#09090B] rounded-lg btn-press cursor-pointer hover:bg-[#D2E823] min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <Send className="w-4 h-4 text-[#09090B]" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── CUSTOM GLOBAL INFO/ERROR POPUP MODAL ─── */}
      <AnimatePresence>
        {infoModal && infoModal.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/40 backdrop-blur-xl select-none text-[#09090B]">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`glass-outer rounded-xl p-5 sm:p-8 w-[92vw] max-w-sm text-center relative overflow-hidden shadow-brutal-glass-xl border-2 ${infoModal.type === 'error' ? 'border-red-500 bg-[#F8F4E8]' : 'border-[#09090B] bg-[#F8F4E8]'
                }`}
            >
              <div className={`w-14 sm:w-16 h-14 sm:h-16 rounded-xl mx-auto flex items-center justify-center mb-4 border-2 border-[#09090B] shadow-brutal-glass-sm ${infoModal.type === 'success' ? 'bg-[#D2E823]' : infoModal.type === 'error' ? 'bg-red-100' : 'bg-blue-100'
                }`}>
                {infoModal.type === 'success' ? <Trophy className="w-7 sm:w-8 h-7 sm:h-8 text-[#09090B]" /> : <AlertTriangle className="w-7 sm:w-8 h-7 sm:h-8 text-[#09090B]" />}
              </div>

              <h2 className="font-display text-xl sm:text-2xl tracking-tighter text-[#09090B] uppercase">
                {infoModal.title}
              </h2>
              <p className="text-xs text-[#09090B]/60 font-body leading-relaxed mt-2.5">
                {infoModal.message}
              </p>

              <div className="mt-6">
                <button
                  onClick={() => {
                    audioEngine.playClickSound();
                    setInfoModal(null);
                  }}
                  className="w-full py-3 bg-[#D2E823] border-2 border-[#09090B] rounded-lg text-xs font-display text-[#09090B] hover:bg-[#c5db1a] transition-all btn-press shadow-brutal-glass-sm cursor-pointer font-bold uppercase min-h-[44px]"
                >
                  DISMISS
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ─── Global Footer ─── */}
      <footer className="py-4 border-t-2 border-[#09090B] glass-outer text-center select-none">
        <p className="text-[9px] font-code text-[#F8F4E8]/60 leading-none">
          SYNTAXKNIGHT // INFINITE CODING RPG SYSTEM // HIGH-CONTRAST NEOBRUTALIST KERNEL
        </p>
      </footer>
    </div>
  );
}
