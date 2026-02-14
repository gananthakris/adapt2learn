# Adapt2Learn Implementation To-Do

## Project Overview
AI-Native Adaptive Learning Platform - 6-8 Week Implementation Plan
**Goal**: Build a working prototype for investor/client pitch demo

---

## Phase 1: Foundation (Weeks 1-2)

### Week 1: Core Infrastructure ✅ CURRENT PRIORITY

- [ ] **Project Setup**
  - [ ] Run `npm create amplify@latest -- --template nextjs`
  - [ ] Install dependencies
  - [ ] Verify project structure
  - [ ] Initialize git repository

- [ ] **GraphQL Schema** (`amplify/data/resource.ts`)
  - [ ] Define enums (UserRole, MasteryLevel, DifficultyLevel, QuestionType, EventType)
  - [ ] Create User model with Cognito integration
  - [ ] Create Course model
  - [ ] Create Topic model
  - [ ] Create Skill model
  - [ ] Create SkillPrerequisite model (for graph relationships)
  - [ ] Create CourseEnrollment model
  - [ ] Create UserSkillMastery model (with BKT fields)
  - [ ] Create Quiz, QuizQuestion, QuizAttempt models
  - [ ] Create ChatSession, ChatMessage models
  - [ ] Create LearningEvent model
  - [ ] Define Lambda function references
  - [ ] Add custom mutations (sendChatMessage, generateQuiz, etc.)
  - [ ] Set up authorization rules

- [ ] **Authentication** (`amplify/auth/resource.ts`)
  - [ ] Configure Cognito with email/password
  - [ ] Add Google OAuth provider
  - [ ] Set up user roles (Learner, Instructor, Admin)
  - [ ] Configure user attributes

- [ ] **Backend Configuration** (`amplify/backend.ts`)
  - [ ] Register data resource
  - [ ] Register auth resource
  - [ ] Configure IAM policies for Bedrock access
  - [ ] Set up environment variables

- [ ] **Next.js App Structure**
  - [ ] Create root layout (`app/layout.tsx`) with auth provider
  - [ ] Create authenticated route group (`app/(authenticated)/`)
  - [ ] Create dashboard page (`app/(authenticated)/dashboard/page.tsx`)
  - [ ] Create instructor route group (`app/(instructor)/`)
  - [ ] Set up navigation components
  - [ ] Create auth utilities (`lib/auth.ts`)

- [ ] **Seed Data** (`lib/seed-data.ts`)
  - [ ] Create sample React course
  - [ ] Define 20-30 skills with prerequisites
  - [ ] Create skill graph structure
  - [ ] Add sample topics with content
  - [ ] Generate sample quiz questions
  - [ ] Create seed script

- [ ] **Deploy and Test**
  - [ ] Run `npx ampx sandbox` to deploy backend
  - [ ] Verify GraphQL API is accessible
  - [ ] Test authentication flow
  - [ ] Seed database with sample data

### Week 2: Skill Graph Visualization

- [ ] **Dependencies**
  - [ ] Install React Flow: `npm install reactflow`
  - [ ] Install dagre for layout: `npm install dagre @types/dagre`

- [ ] **Skill Graph Component**
  - [ ] Create `components/SkillGraph.tsx`
  - [ ] Create `components/SkillNode.tsx` (custom node with mastery colors)
  - [ ] Create `hooks/useSkillGraphData.ts` (data fetching + subscriptions)
  - [ ] Create `lib/graph-layout.ts` (dagre layout algorithm)

- [ ] **Skill Graph Page**
  - [ ] Create `app/(authenticated)/skill-graph/page.tsx`
  - [ ] Implement data transformation (DB → nodes/edges)
  - [ ] Add click-to-navigate functionality
  - [ ] Implement mastery color coding (red → yellow → green)
  - [ ] Add GraphQL subscription for real-time updates
  - [ ] Add zoom/pan controls

- [ ] **Testing**
  - [ ] Verify graph renders 20-30 skill nodes
  - [ ] Test mastery color updates
  - [ ] Test navigation to topic pages
  - [ ] Verify real-time subscription updates

---

## Phase 2: AI Capabilities (Weeks 3-4)

### Week 3: Real-Time AI Tutor

- [ ] **Lambda Function Setup**
  - [ ] Create `amplify/functions/ai-tutor/handler.ts`
  - [ ] Create `amplify/functions/ai-tutor/resource.ts`
  - [ ] Install AWS Bedrock SDK
  - [ ] Configure streaming API integration

- [ ] **AI Tutor Implementation**
  - [ ] Implement context-aware prompt engineering
  - [ ] Add user skill level injection
  - [ ] Add current topic context
  - [ ] Implement token-by-token streaming
  - [ ] Store conversation history in DynamoDB

- [ ] **Frontend Chat Interface**
  - [ ] Create `app/(authenticated)/tutor/page.tsx`
  - [ ] Create `components/ChatInterface.tsx`
  - [ ] Create `components/ChatMessage.tsx`
  - [ ] Create `hooks/useChatStreaming.ts`
  - [ ] Implement streaming display (token-by-token)
  - [ ] Add conversation history view

- [ ] **IAM & Permissions**
  - [ ] Add Bedrock access policy in `amplify/backend.ts`
  - [ ] Configure Lambda execution role
  - [ ] Set up cost monitoring (CloudWatch alarms)

- [ ] **Testing**
  - [ ] Test streaming responses
  - [ ] Verify context awareness
  - [ ] Test conversation persistence
  - [ ] Monitor costs (target: <$1/day)

### Week 4: Generative Assessments

- [ ] **Quiz Generation Lambda**
  - [ ] Create `amplify/functions/generate-quiz/handler.ts`
  - [ ] Implement prompt engineering for MCQ generation
  - [ ] Add true/false question support
  - [ ] Add short answer question support
  - [ ] Implement difficulty calibration

- [ ] **Answer Evaluation Lambda**
  - [ ] Create `amplify/functions/evaluate-answer/handler.ts`
  - [ ] Implement AI-generated explanations
  - [ ] Add feedback for wrong answers
  - [ ] Return learning tips

- [ ] **Mastery Update Lambda**
  - [ ] Create `amplify/functions/update-mastery/handler.ts`
  - [ ] Implement Bayesian Knowledge Tracing (BKT)
  - [ ] Create `lib/knowledge-tracing.ts` utilities
  - [ ] Update UserSkillMastery model
  - [ ] Trigger skill graph updates

- [ ] **Quiz UI**
  - [ ] Create `app/(authenticated)/quiz/[quizId]/page.tsx`
  - [ ] Create `components/QuizInterface.tsx`
  - [ ] Create `components/QuestionCard.tsx`
  - [ ] Add timer functionality
  - [ ] Implement answer submission
  - [ ] Display instant feedback

- [ ] **Testing**
  - [ ] Generate 5-question quiz in <3s
  - [ ] Verify question relevance
  - [ ] Test AI explanations
  - [ ] Verify mastery score updates
  - [ ] Test skill graph color changes

---

## Phase 3: Adaptive Personalization (Weeks 5-6)

### Week 5: Multi-Signal Tracking & Recommendations

- [ ] **Event Tracking**
  - [ ] Create `hooks/useEventTracking.ts`
  - [ ] Track page views automatically
  - [ ] Track time spent (dwell time)
  - [ ] Track scroll depth
  - [ ] Track quiz attempts
  - [ ] Track errors/struggles

- [ ] **Recommendation Engine**
  - [ ] Create `amplify/functions/recommend-next/handler.ts`
  - [ ] Implement prerequisite logic
  - [ ] Create `lib/recommendation-rules.ts`
  - [ ] Prioritize skill gaps
  - [ ] Implement "Next for You" algorithm

- [ ] **Learning Path Visualization**
  - [ ] Create `components/RecommendedPath.tsx`
  - [ ] Create `components/ContinueLearning.tsx`
  - [ ] Add personalized dashboard widgets
  - [ ] Show "Fill your knowledge gaps"

- [ ] **Testing**
  - [ ] Verify all interactions tracked
  - [ ] Test recommendations update after quiz
  - [ ] Verify prerequisite suggestions
  - [ ] Test weak skill prioritization

### Week 6: Analytics Dashboard

- [ ] **Dependencies**
  - [ ] Install Recharts: `npm install recharts`

- [ ] **Learner Analytics**
  - [ ] Create `app/(authenticated)/analytics/page.tsx`
  - [ ] Create `components/MasteryChart.tsx` (line chart)
  - [ ] Create `components/SkillBreakdown.tsx` (pie chart)
  - [ ] Create `components/EngagementHeatmap.tsx`
  - [ ] Add time-spent bar chart

- [ ] **Instructor Analytics**
  - [ ] Create `app/(instructor)/class-analytics/page.tsx`
  - [ ] Show class-wide performance
  - [ ] Add mastery distribution chart
  - [ ] Implement "at-risk" detection (rule-based)
  - [ ] Add export to CSV

- [ ] **Analytics Utilities**
  - [ ] Create `lib/analytics-calculations.ts`
  - [ ] Implement time-series aggregations
  - [ ] Create engagement scoring

- [ ] **Testing**
  - [ ] Verify charts display real data
  - [ ] Test mastery progression over time
  - [ ] Verify heatmap patterns
  - [ ] Test instructor view

---

## Phase 4: Polish & Demo Prep (Weeks 7-8)

### Week 7: Content Creation & UI Polish

- [ ] **Content Creation**
  - [ ] Create `data/courses/react-basics.json`
  - [ ] Define complete skill graph (20-30 skills)
  - [ ] Create `data/skills/react-skill-graph.json`
  - [ ] Write 50+ quiz questions
  - [ ] Create `data/quizzes/react-questions.json`

- [ ] **UI Enhancements**
  - [ ] Add smooth animations to skill graph
  - [ ] Create `styles/animations.css`
  - [ ] Implement loading skeletons
  - [ ] Create `components/ui/LoadingSkeleton.tsx`
  - [ ] Optimize mobile responsive design
  - [ ] Add dark mode toggle (optional)

- [ ] **Performance Optimization**
  - [ ] Optimize graph rendering
  - [ ] Add lazy loading for large datasets
  - [ ] Cache AI responses
  - [ ] Minimize GraphQL over-fetching

### Week 8: Testing, Deployment & Demo

- [ ] **Testing**
  - [ ] End-to-end user journey testing
  - [ ] Cross-browser testing (Chrome, Safari, Firefox)
  - [ ] Mobile testing (iPhone/iPad)
  - [ ] Performance testing (page load <2s)
  - [ ] Test all critical paths

- [ ] **Deployment**
  - [ ] Deploy to Amplify Hosting
  - [ ] Configure custom domain (optional)
  - [ ] Set up HTTPS
  - [ ] Configure production environment variables

- [ ] **Demo Preparation**
  - [ ] Create demo user accounts
  - [ ] Create `scripts/create-demo-users.ts`
  - [ ] Seed realistic learning history
  - [ ] Create `scripts/seed-demo-data.ts`
  - [ ] Create 3 personas (beginner, intermediate, advanced)

- [ ] **Demo Script**
  - [ ] Create `DEMO_SCRIPT.md`
  - [ ] Journey 1: "The Struggling Beginner" (Sarah)
  - [ ] Journey 2: "The Intermediate Practitioner" (Alex)
  - [ ] Journey 3: "The Instructor View" (Admin)
  - [ ] Prepare talking points
  - [ ] Record backup video

---

## Critical Files Checklist

### Backend Files
- [ ] `amplify/data/resource.ts` - Complete GraphQL schema
- [ ] `amplify/auth/resource.ts` - Cognito configuration
- [ ] `amplify/backend.ts` - Backend configuration
- [ ] `amplify/functions/ai-tutor/handler.ts` - Bedrock streaming
- [ ] `amplify/functions/generate-quiz/handler.ts` - Quiz generation
- [ ] `amplify/functions/recommend-next/handler.ts` - Recommendations
- [ ] `amplify/functions/evaluate-answer/handler.ts` - Answer evaluation
- [ ] `amplify/functions/update-mastery/handler.ts` - BKT implementation

### Frontend Files
- [ ] `app/layout.tsx` - Root layout with auth
- [ ] `app/(authenticated)/dashboard/page.tsx` - Learner dashboard
- [ ] `app/(authenticated)/skill-graph/page.tsx` - Skill graph page
- [ ] `app/(authenticated)/tutor/page.tsx` - AI tutor chat
- [ ] `app/(authenticated)/quiz/[quizId]/page.tsx` - Quiz interface
- [ ] `app/(authenticated)/analytics/page.tsx` - Learner analytics
- [ ] `app/(instructor)/class-analytics/page.tsx` - Instructor view
- [ ] `components/SkillGraph.tsx` - Graph visualization
- [ ] `components/ChatInterface.tsx` - Streaming chat UI
- [ ] `components/QuizInterface.tsx` - Quiz UI
- [ ] `components/AnalyticsDashboard.tsx` - Analytics charts

### Utilities & Hooks
- [ ] `hooks/useSkillGraphData.ts` - Graph data + subscriptions
- [ ] `hooks/useChatStreaming.ts` - Chat streaming
- [ ] `hooks/useEventTracking.ts` - Auto event tracking
- [ ] `lib/graph-layout.ts` - Dagre layout algorithm
- [ ] `lib/knowledge-tracing.ts` - BKT utilities
- [ ] `lib/recommendation-rules.ts` - Recommendation logic
- [ ] `lib/analytics-calculations.ts` - Analytics utilities
- [ ] `lib/auth.ts` - Auth helpers
- [ ] `lib/seed-data.ts` - Database seeding

### Data Files
- [ ] `data/courses/react-basics.json` - Course content
- [ ] `data/skills/react-skill-graph.json` - Skill graph
- [ ] `data/quizzes/react-questions.json` - Quiz questions

### Documentation
- [ ] `README.md` - Project setup instructions
- [ ] `DEMO_SCRIPT.md` - Demo presentation guide
- [ ] `ARCHITECTURE.md` - Technical architecture
- [ ] `.env.example` - Environment variables template

---

## Success Criteria

### Technical Performance
- [ ] Page load time: < 2 seconds
- [ ] Skill graph render: < 500ms (50 nodes)
- [ ] AI first token: < 1 second
- [ ] Quiz generation: < 3 seconds
- [ ] Graph updates: < 200ms

### User Experience
- [ ] "Wow" factor: Graph visualization impresses
- [ ] Streaming AI feels real-time and responsive
- [ ] Real-time updates are visibly smooth
- [ ] Mobile-friendly and responsive
- [ ] Professional UI quality

### Cost Control
- [ ] Demo phase: < $50/month
- [ ] Bedrock: < $12/month
- [ ] DynamoDB: < $5/month
- [ ] Lambda: < $2/month
- [ ] Monitoring alerts at $10/day

### Demo Readiness
- [ ] All 3 demo scenarios tested
- [ ] Demo accounts pre-populated
- [ ] No visible bugs in happy path
- [ ] Video recording backup ready
- [ ] Pitch deck with screenshots

---

## Risk Mitigation

### Technical Risks
- **Bedrock Streaming Complexity**: Have batch fallback ready
- **Skill Graph Performance**: Implement lazy loading for large graphs
- **Cost Overrun**: Set CloudWatch alarms, implement caching
- **Lambda Timeouts**: Set 30s timeout, add request queuing

### Timeline Risks
- **Feature Creep**: Stick to MVP scope, defer nice-to-haves
- **Integration Issues**: Test early and often
- **Data Modeling Changes**: Finalize schema in Week 1

---

## Budget Tracking

### Estimated Monthly Costs (Demo Phase)
- AWS Bedrock (Nova Pro): $12
- DynamoDB: $5
- Lambda: $2
- AppSync: $4
- Amplify Hosting: $1
- **Total: ~$24/month**

### Cost Monitoring
- [ ] Set up CloudWatch billing alarms
- [ ] Monitor Bedrock token usage
- [ ] Track Lambda invocations
- [ ] Review costs weekly

---

## Notes
- Focus on "wow" features first (graph, AI tutor, real-time updates)
- Keep it simple - don't over-engineer
- Test continuously, not just at the end
- Prepare for demo failures (backup video, offline mode)
- Document as you go (README, architecture diagrams)

---

**Last Updated**: 2026-02-13
**Status**: Week 1 - Core Infrastructure (In Progress)
**Next Milestone**: Complete GraphQL schema and authentication setup
