# ⚔️ SyntaxKnight — Cyberpunk Code Combat & AI-Powered Learning Platform

> **Academic Project Submission & Capstone Portfolio**  
> An immersive, full-stack gamified web application built to accelerate programming mastery through real-time code challenges, age-tailored access control, token economy shop, and an integrated AI **Cyber Mentor**.

---

### 🛡️ Tech Stack & Badges

![Next.js](https://img.shields.io/badge/Next.js_14-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB_Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![OpenRouter AI](https://img.shields.io/badge/OpenRouter_AI-6466F1?style=for-the-badge&logo=openai&logoColor=white)
![Supabase Auth](https://img.shields.io/badge/Supabase_OAuth-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)

---

## 🌟 Executive Summary

**SyntaxKnight** transforms traditional syntax learning into a high-octane cyberpunk RPG experience. Players solve real-time code challenges across 19 programming language tracks, track XP progression, unlock shop items with tokens, customize avatar credentials, and receive instant debugging assistance from a specialized **Cyber Mentor** powered by OpenRouter.

Designed with strict security standards and modern UX principles, the application features social Google OAuth authentication, automatic age-based content gating, database persistence via Mongoose, and a signature Neo-Brutalist Liquid Glassmorphism user interface.

---

## 🚀 Key Features

### 1. 🔐 Google OAuth Authentication & Unified Auth Matrix
- **Seamless Single Sign-On:** Integrated with Google OAuth and Supabase Auth for instant, secure authentication.
- **Custom Post-Login Onboarding:** Automatically intercepts new Google user sessions, prompting operators to set their developer track and profile details before granting main dashboard access.

### 2. 🛡️ Smart Age Verification & Content Gating
- **DOB-Based Age Calculation:** Dynamically calculates exact operator age from Date of Birth inputs during registration.
- **Under-18 Restricted Mode:** Users under 18 years of age are automatically assigned `restrictedMode: true`, enforcing safety policies and restricting sensitive advanced modules (such as low-level hardware memory manipulations or raw SQL execution).

### 3. 🖼️ Custom Profile Picture Upload & Database Persistence
- **Client-Side FileReader Stream:** Real-time photo selection allowing operators to personalize their avatars.
- **Base64 Avatar Encoding:** Encodes uploaded images into compressed Base64 strings, persisting them directly into MongoDB user documents.
- **Instant UI Synchronization:** Live state updates sync profile pictures across the HUD header, drawer, and settings without full page reloads.

### 4. 🎨 Liquid Glassmorphism UI & Neo-Brutalist Design System
- **Signature Visual System:** High-contrast palette combining **Acid Yellow-Green (`#D2E823`)**, Ink Black (`#09090B`), and Cream Base (`#F8F4E8`).
- **Liquid Glassmorphism:** Layered backdrop blur effects (`backdrop-blur-2xl`) paired with 3D interactive cursor-tilt cards (`ThreeDTilt`).
- **Tactile Micro-Animations:** Tactile button press feedback (`btn-press`), marquee ribbons, and responsive mobile-to-desktop grid layouts.

### 5. 🤖 "Cyber Mentor" AI Assistant (OpenRouter API Integration)
- **Interactive AI Copilot:** Embedded AI assistant connected to OpenRouter API providing real-time code explanations, hints, and error diagnosis.
- **Context-Aware Guidance:** Analyzes user code snippets and step instructions to guide learners interactively without spoiling direct answers.

### 6. 🛒 Cyber Token Exchange Shop & Full-Stack Inventory
- **Token Economy:** Complete levels and milestones to earn tokens.
- **Full-Stack Purchase Flow:** `/api/shop/purchase` endpoint verifies token balances, deducts costs, and atomically updates inventory items (`hintsAvailable`, `skipTickets`, `streakFreezeActive`, `aiCredits`) in MongoDB.

---

## 🏗️ System Architecture Overview

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Framework** | Next.js 14 (App Router) + React 18 | Server-side rendering, API routes, and state routing |
| **Styling** | Tailwind CSS v4 + Vanilla CSS | Neo-Brutalist design tokens and liquid glass utilities |
| **Database** | MongoDB Atlas + Mongoose ORM | Persistent user profile storage, inventory, and stats tracking |
| **Authentication**| Supabase Auth / Google OAuth | Secure token handling and social single sign-on |
| **AI Integration**| OpenRouter API | Cyber Mentor prompt engineering & AI code assistance |
| **Animations** | Framer Motion & 3D CSS Transforms | Interactive card tilt, button dynamics, and modal transitions |

---

## ⚙️ Setup Instructions

Follow these steps to configure environment credentials:

### Step 1: Create `.env.local` File
Rename or copy the provided `.env.example` file to `.env.local` in the project root directory:

```bash
cp .env.example .env.local
```

### Step 2: Configure Environment Keys
Open `.env.local` and add your API keys:

```env
# ==============================================================================
# SyntaxKnight Environment Configuration
# ==============================================================================

# 1. MongoDB Atlas Connection String
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/syntaxknight?retryWrites=true&w=majority

# 2. Supabase Auth & Google OAuth Credentials
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key-here
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key-here

# 3. OpenRouter AI Service Key (Cyber Mentor Copilot)
NEXT_PUBLIC_OPENROUTER_API_KEY=your-openrouter-api-key-here
NEXT_PUBLIC_GEMINI_API_KEY=your-gemini-api-key-here
```

> 💡 **Note for Evaluators:** Fallback mock responses are built into the app for AI and auth if live API keys are omitted.

---

## 💻 Run Instructions

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm**: `v9.0.0` or higher

### 1. Install Dependencies
Run the following command in the project root to install all required npm packages:

```bash
npm install
```

### 2. Launch Development Server
Start the local Next.js development server:

```bash
npm run dev
```

### 3. Access the Application
Open your web browser and navigate to:

```
http://localhost:3000
```

---

## 📂 Project Directory Structure

```
SyntaxKnight/
├── public/                 # Static assets, logos, and audio sound effects
├── src/
│   ├── app/                # Next.js App Router, global CSS, and API routes
│   │   ├── api/            # Serverless API endpoints (/api/users, /api/shop/purchase)
│   │   ├── globals.css     # Global theme tokens and glassmorphism styles
│   │   └── page.tsx        # Application root entry point
│   ├── components/         # Reusable UI components & HintUsageExample
│   ├── models/             # Mongoose schemas (User.ts, InventorySchema)
│   ├── services/           # Audio engine and API integrations
│   ├── lib/                # MongoDB cached connection helper
│   ├── Homepage.tsx        # Main dashboard, shop, and practice arena views
│   ├── AuthMatrix.tsx      # Authentication forms & profile onboarding modal
│   ├── HeroSection.tsx     # Landing page hero section
│   └── syllabusData.ts     # 19-Language syllabus catalog & regex evaluation engine
├── .env.example            # Environment Variable Template
├── package.json            # Dependencies and npm scripts
└── README.md               # Project documentation & evaluation guide
```

---

## 📝 Academic Evaluation Notes

- **Flexible Regex Code Validation:** The interactive coding evaluation engine uses dynamic regex pattern matching, allowing students to use custom variable names and formatting while strictly validating core syntax.
- **Persistent User Inventory:** Shop transactions, token balances, and consumable items (`hintsAvailable`, `skipTickets`, `streakFreezeActive`) are saved directly to MongoDB Atlas.
- **High-Contrast Accessibility:** Custom high-contrast Neo-Brutalist typography ensures optimal legibility across all dark liquid-glass cards.

---

*Submitted for Academic Project Evaluation — SyntaxKnight Team.*
