# Adapt2Learn — Complete Project Overview

> Last updated: February 2026
> Live URL: **https://adapt2learn-two.vercel.app**
> GitHub: **https://github.com/gananthakris/adapt2learn**

---

## What Is This?

Adapt2Learn is an **AI-native adaptive learning platform** built with Next.js 14. It uses **Bayesian Knowledge Tracing (BKT)** to model how well a learner knows each skill and adapts the learning path in real-time. Think of it as a smart tutor that knows exactly what you know and what to teach you next.

---

## Live Routes

| URL | What it does |
|-----|-------------|
| `/` | Landing page |
| `/dashboard` | Learner dashboard — mastery stats, recommendations |
| `/skill-graph` | Interactive visual skill dependency graph |
| `/tutor` | AI tutor chat interface |
| `/analytics` | Learner analytics — mastery trend charts |
| `/quiz/[quizId]` | Quiz interface for a specific quiz |
| `/topics/[topicId]` | Individual topic/lesson page |
| `/class-analytics` | Instructor dashboard (requires INSTRUCTOR role) |
| `/login` | Login page |
| `/mcp-2099` | ADAPT-2099 showcase — visualised BKT engine |
| `/api/quiz` | REST: list quizzes |
| `/api/quiz/[quizId]` | REST: get specific quiz |
| `/api/recommendations` | REST: get personalised recommendations |
| `/api/chat` | REST: AI tutor chat (streams response) |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS + custom CSS variables |
| Auth | AWS Cognito via Amplify Gen 2 |
| Database | AWS DynamoDB via Amplify Gen 2 (AppSync/GraphQL) |
| AI | AWS Bedrock (`amazon.nova-micro-v1`) |
| Hosting | Vercel (free tier) |
| Backend infra | AWS Amplify Gen 2 (Lambda + DynamoDB + Cognito) |
| Charts | Recharts |
| Skill graph | @xyflow/react (React Flow) |

---

## Project Structure

```
adapt2learn/
│
├── app/                          # Next.js App Router pages
│   ├── (authenticated)/          # Route group — learner pages
│   │   ├── dashboard/            # Learner dashboard
│   │   ├── analytics/            # Learner analytics
│   │   ├── skill-graph/          # Skill graph viewer
│   │   ├── tutor/                # AI tutor chat
│   │   ├── quiz/[quizId]/        # Quiz interface
│   │   └── topics/[topicId]/     # Topic/lesson page
│   │
│   ├── (instructor)/             # Route group — instructor pages
│   │   └── class-analytics/      # Full instructor dashboard
│   │
│   ├── api/                      # API routes
│   │   ├── chat/                 # AI tutor endpoint
│   │   ├── quiz/                 # Quiz list + detail
│   │   └── recommendations/      # Personalised recommendations
│   │
│   ├── login/                    # Login page
│   ├── mcp-2099/                 # ADAPT-2099 showcase page
│   ├── layout.tsx                # Root layout (nav, footer, SEO)
│   └── page.tsx                  # Landing page
│
├── amplify/                      # AWS Amplify Gen 2 backend
│   ├── auth/resource.ts          # Cognito config (Google OAuth)
│   ├── data/resource.ts          # GraphQL schema (13 models)
│   ├── backend.ts                # Backend composition
│   └── functions/
│       ├── ai-tutor/             # Lambda: AI tutor responses
│       ├── evaluate-answer/      # Lambda: grade quiz answers
│       ├── generate-quiz/        # Lambda: create adaptive quiz
│       └── update-mastery/       # Lambda: run BKT update
│
├── components/
│   ├── analytics/                # Dashboard + instructor components
│   │   ├── dashboard-overview    # Learner mastery dashboard
│   │   ├── learner-analytics     # Charts for learner progress
│   │   ├── instructor-analytics  # Instructor view (main wrapper)
│   │   ├── class-overview-cards  # 4-stat card grid
│   │   ├── skill-gap-analysis    # Class-wide skill gap bars
│   │   ├── students-table        # Sortable/searchable student list
│   │   ├── quick-actions         # Create assignment / announce
│   │   ├── class-selector        # Switch between classes
│   │   ├── at-risk-students      # At-risk detection panel
│   │   ├── student-detail-modal  # Individual student drill-down
│   │   ├── assignment-modal      # Create assignment flow
│   │   ├── announcement-modal    # Send announcement flow
│   │   └── export-reports        # Export to CSV/PDF
│   │
│   ├── auth/auth-guard.tsx       # Client-side auth protection
│   ├── common/error-boundary.tsx # React error boundary
│   ├── graph/skill-graph.tsx     # Interactive skill graph
│   ├── layout/main-nav.tsx       # Navigation bar
│   ├── mcp-2099/index.tsx        # ADAPT-2099 showcase component
│   ├── providers/app-providers   # Amplify + context providers
│   ├── quiz/quiz-interface.tsx   # Quiz UI
│   ├── tutor/tutor-panel.tsx     # Chat interface
│   └── ui/loading-skeleton.tsx   # Loading states
│
├── data/                         # Static course content
│   ├── courses/react-basics.ts   # React 101 course definition
│   ├── quizzes/react-questions   # 20+ quiz questions
│   └── skills/react-skill-graph  # Skill node + edge definitions
│
├── hooks/
│   ├── use-auth.ts               # Auth state (Cognito or demo mode)
│   ├── use-chat-streaming.ts     # Streaming AI chat hook
│   ├── use-skill-graph-data.ts   # Graph data fetching
│   ├── use-performance.ts        # Web Vitals tracking
│   ├── use-intersection-observer # Scroll animations
│   └── use-event-tracking.ts     # Analytics events
│
└── lib/
    ├── knowledge-tracing.ts      # BKT algorithm implementation
    ├── recommendation-rules.ts   # "What to learn next" logic
    ├── analytics-calculations.ts  # Mastery + progress maths
    ├── seed-data.ts              # Mock data for demo mode
    ├── types.ts                  # All TypeScript types
    ├── amplify-client.ts         # Amplify client config
    └── auth.ts                   # Auth utilities
```

---

## The BKT Algorithm (`lib/knowledge-tracing.ts`)

Bayesian Knowledge Tracing models the probability that a learner **knows** a skill. After every quiz answer it updates this probability.

### Four Parameters

| Parameter | What it means | Typical value |
|-----------|--------------|---------------|
| `pKnown` | Probability the learner already knows the skill | Starts at 0.3 |
| `pTransit` | Probability of learning the skill after one practice | 0.1 |
| `pSlip` | Probability of answering wrong even when you know it | 0.1 |
| `pGuess` | Probability of answering right even when you don't know it | 0.2 |

### Update Formula
```
After a correct answer:
  P(know | correct) = pKnown × (1 - pSlip)
                    / [pKnown × (1-pSlip) + (1-pKnown) × pGuess]

After a wrong answer:
  P(know | wrong)   = pKnown × pSlip
                    / [pKnown × pSlip + (1-pKnown) × (1-pGuess)]

Then apply learning:
  pKnown_new = P(know | answer) + (1 - P(know | answer)) × pTransit
```

### Mastery Levels

| Level | pKnown range | Display |
|-------|-------------|---------|
| Seed | 0 – 0.2 | ○ Not started |
| Sprout | 0.2 – 0.4 | ◐ Beginner |
| Growing | 0.4 – 0.6 | ◑ Developing |
| Blooming | 0.6 – 0.8 | ● Proficient |
| Flourishing | 0.8 – 1.0 | ✦ Expert |

---

## Authentication (`hooks/use-auth.ts`)

The app has **two modes**:

### Demo Mode (no AWS config)
When `amplify_outputs.json` is absent (e.g. local dev without a sandbox), the app automatically enters demo mode:
- User is set to `demo-learner` with `LEARNER` role
- No real auth required
- All features work with seed data

### Real Mode (AWS Cognito)
When `amplify_outputs.json` exists:
- Full Cognito authentication
- Google OAuth support
- Three roles: `LEARNER`, `INSTRUCTOR`, `ADMIN`
- Role is determined by Cognito User Pool groups

### Auth Guard
`components/auth/auth-guard.tsx` wraps all authenticated routes. It redirects to `/login` if not authenticated. The instructor pages also require `INSTRUCTOR` role.

---

## Design System — "Neural Garden"

The app uses a custom design system called **Neural Garden** — organic, growth-themed visuals.

### Colour Palette

```css
--color-canvas:       #FAF9F6   /* Off-white background */
--color-forest-deep:  #1A4D2E   /* Dark green — primary */
--color-forest-mid:   #2D6A4F   /* Medium green */
--color-forest-light: #52B788   /* Light green — accent */
--color-terracotta:   #E76F51   /* Warm orange — warnings */
--color-lavender:     #B8A9C9   /* Purple — secondary accent */
--color-amber:        #F4A261   /* Amber — highlights */
```

### Mastery Colours
```css
--mastery-seed:      #9CA3AF   /* grey */
--mastery-sprout:    #A7C4BC   /* muted teal */
--mastery-grow:      #52B788   /* green */
--mastery-bloom:     #2D6A4F   /* dark green */
--mastery-flourish:  #1A4D2E   /* deep green */
```

### Typography
- **Display:** Fraunces (serif, variable)
- **Body:** Inter (sans-serif, variable)
- **Code:** JetBrains Mono

### CSS Utilities (in `globals.css`)
```css
.card              /* white card with shadow + hover */
.progress-bar      /* container */
.progress-fill     /* animated fill bar */
.btn-primary       /* green primary button */
.btn-secondary     /* outline button */
.btn-ghost         /* text-only button */
.gradient-text     /* green gradient text */
.animate-fade-in-up /* fade + slide up */
.stagger-1/2/3     /* animation delay steps */
```

---

## AWS Amplify Backend (`amplify/`)

> **Status:** Lambda functions are stubs — they return mock data. The GraphQL schema and Cognito auth are fully defined and deploy-ready.

### GraphQL Schema — 13 Models

| Model | Purpose |
|-------|---------|
| `UserProfile` | Learner profile, role, preferences |
| `Course` | Course definition |
| `Skill` | Individual skill node |
| `SkillPrerequisite` | Prerequisite edges between skills |
| `LearnerSkillState` | Per-learner BKT state (pKnown etc.) |
| `Topic` | Lesson/topic within a course |
| `Quiz` | Quiz definition |
| `Question` | Individual question |
| `QuizAttempt` | Learner's quiz session |
| `QuizResponse` | Individual answer within a session |
| `LearningSession` | Time-on-task tracking |
| `Recommendation` | AI-generated next-step recommendation |
| `InstructorClass` | Instructor ↔ class relationship |

### Lambda Functions (stubs)

| Function | Trigger | Purpose |
|----------|---------|---------|
| `ai-tutor` | API call | Generate personalised tutor response |
| `evaluate-answer` | After quiz response | Grade answer + update BKT |
| `generate-quiz` | On-demand | Create adaptive quiz from skill state |
| `update-mastery` | After evaluation | Run BKT update, persist new pKnown |

### Auth Config
- Email + password sign-up
- Google OAuth (social sign-in)
- Three user groups: `Admin`, `Instructor`, `Learner`
- Row-level security on all data models

---

## Instructor Dashboard (`/class-analytics`)

Fully built with mock data. Shows:

### 1. Four-Card Overview
- **Total Students** — enrolled in class
- **Average Mastery** — class-wide BKT average
- **Active Today** — learners who logged in today
- **At Risk** — flagged for intervention (red card)

### 2. Skill Gap Analysis
Bar chart showing which skills most students are struggling with, colour-coded:
- 🔴 Red — >25% of class struggling
- 🟡 Orange — 15–25% struggling
- 🟢 Green — <15% struggling

### 3. Students Table
Searchable, sortable table with:
- Progress bar per student
- Last active timestamp
- Streak (🔥 for 7+ days, ⚠️ for 0)
- At-risk students highlighted with red left border
- Actions menu per student

### 4. Quick Actions
- Create Assignment (modal)
- Send Announcement (modal)
- Generate Report (export)

### 5. Class Selector
Dropdown to switch between multiple classes (React 101, Python 201, TypeScript Fundamentals)

### At-Risk Detection Logic
A student is flagged if any of:
- Overall progress < 30%
- Inactive for 3+ days
- Streak = 0
- Quiz score declining for 2+ weeks

---

## ADAPT-2099 (`/mcp-2099`)

A standalone futuristic showcase page visualising the Adapt2Learn AI engine. No external animation libraries — pure CSS.

### Visual Elements
| Element | What it represents |
|---------|-------------------|
| Pulsing hex core | The BKT algorithm running |
| Concentric rings | Knowledge domains pulsing |
| Orbital arms | AI model orbiting the data |
| Data streams | `BKT`, `pK`, `pT`, `JSX`, `Hook`, `Mastery` etc. flowing up |
| Three panels | Mastery Index 73.4% / Active Learners 24 / Knowledge Nodes 8 |
| Circuit traces | Skill dependency graph edges (JSX → Hooks → State → Props) |
| Status ticker | Live BKT engine status messages |

---

## API Endpoints

### `GET /api/quiz`
Returns list of available quizzes.
```json
[{ "id": "quiz-react-basics", "title": "React Basics", "topicId": "topic-jsx", "questionCount": 5 }]
```

### `GET /api/quiz/[quizId]`
Returns full quiz with questions.
```json
{
  "id": "quiz-react-basics",
  "questions": [
    { "id": "q1", "text": "What does JSX stand for?", "options": [...], "correctAnswer": "B" }
  ]
}
```

### `GET /api/recommendations`
Returns personalised next steps based on current mastery state.
```json
[
  { "skillId": "skill-jsx", "topicId": "topic-jsx", "title": "JSX Basics", "reason": "Prerequisites met, mastery below proficient" }
]
```

### `POST /api/chat`
AI tutor endpoint. Accepts a message, returns a streamed or plain text response.
```json
// Request
{ "message": "Can you explain React hooks?" }

// Response
{ "response": "Let's break this down: Hooks are functions that..." }
```

---

## Performance & Accessibility

### Web Vitals (`hooks/use-performance.ts`)
Tracks LCP, FID, CLS, FCP, TTFB. Ready to wire to Sentry or DataDog.

### Accessibility
- Skip-to-content link
- WCAG AAA colour contrast
- `:focus-visible` keyboard indicators
- Semantic HTML throughout
- All interactive elements keyboard accessible
- `aria-label` on all icon buttons

### CSS Optimisations
- `content-visibility: auto` on off-screen sections
- `will-change: transform` only on animated elements
- `font-display: swap` on all fonts
- Variable fonts (one file, multiple weights)

---

## Deployment

### Vercel (Frontend)
- **URL:** https://adapt2learn-two.vercel.app
- **Auto-deploy:** ⚠️ GitHub integration is disconnected — deploy manually:
  ```bash
  vercel --prod
  ```
- **Region:** `iad1` (Washington DC)

### GitHub
- **Repo:** https://github.com/gananthakris/adapt2learn
- **Branch:** `main`
- To push: `git push origin main` (then `vercel --prod`)

### AWS Amplify (Backend)
- Backend is defined but not currently deployed to a live AWS environment
- To deploy backend: `npx ampx sandbox` (dev) or `npx ampx pipeline-deploy` (prod)
- Requires AWS credentials configured

---

## Git History

| Commit | What was done |
|--------|--------------|
| `04ffe03` | Neural Garden landing page + layout enhancements |
| `0bc4cfd` | Adapted MCP-2099 → ADAPT-2099 with Adapt2Learn content |
| `f92b820` | Added ADAPT-2099 hyper-futuristic showcase component |
| `46365ba` | Completed all remaining pages (90% → 100%) |
| `34be4c8` | Complete instructor view (10% → 100%) |
| `0155f4e` | Senior frontend engineer enhancements (perf, a11y, SEO) |
| `149c1eb` | Neural Garden design system redesign |
| `e2cf56e` | Vercel deployment configuration |
| `3a02664` | Initial MVP commit |

---

## Known Limitations / What's Left

| Item | Status | Notes |
|------|--------|-------|
| Lambda functions | Stub only | Return hardcoded mock data. Need real BKT + Bedrock calls wired in. |
| Real auth | Demo mode only | Works with Cognito when `amplify_outputs.json` exists |
| Vercel auto-deploy | Disconnected | Run `vercel --prod` manually after each push |
| SCORM compliance | Not implemented | Would need enterprise integration layer |
| Real-time updates | Not implemented | Would need WebSockets or AppSync subscriptions |
| Mobile app | Not built | Responsive web only |
| Instructor class CRUD | Mock only | Create/edit classes not persisted |

---

## Running Locally

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev
# → http://localhost:3000

# 3. Build for production
npm run build

# 4. Run production server
npm start

# 5. Run E2E tests (builds first)
npm run build && node scripts/e2e-comprehensive.mjs
```

**No environment variables needed** — the app auto-detects missing Amplify config and enters demo mode.

---

## Key Files to Know

| File | Why it matters |
|------|---------------|
| `lib/knowledge-tracing.ts` | The BKT brain — all mastery maths lives here |
| `lib/seed-data.ts` | All mock data — change this to test different states |
| `lib/types.ts` | Every TypeScript type in the app |
| `app/globals.css` | Entire design system — colours, cards, buttons, animations |
| `components/graph/skill-graph.tsx` | The visual skill graph — most complex component |
| `components/analytics/instructor-analytics.tsx` | Instructor dashboard entry point |
| `amplify/data/resource.ts` | GraphQL schema — the data model |
| `hooks/use-auth.ts` | How auth + demo mode works |
