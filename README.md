# Adapt2Learn

> AI-Native Adaptive Learning Platform - Revolutionizing personalized education with real-time AI and intelligent skill mapping

## 🎯 Vision

Build a learning platform that **adapts to each learner in real-time**, using AI to provide personalized tutoring, dynamically generated assessments, and visual skill progression tracking. Unlike traditional LMS platforms that serve static content, Adapt2Learn continuously adjusts to each learner's needs.

## 🚀 Key Differentiators

### 1. Visual Skill Graph Navigation
- Interactive graph showing prerequisite relationships between skills
- Color-coded mastery levels (beginner → expert)
- Real-time progress updates via GraphQL subscriptions
- Click-to-navigate between learning topics

### 2. Real-Time AI Tutor
- Streaming token-by-token responses using AWS Bedrock
- Context-aware tutoring based on skill level and learning history
- Conversation history with semantic search
- Personalized learning path guidance

### 3. Dynamic Learning Path Adaptation
- Real-time recommendations based on quiz performance
- "Next best learning item" suggestions
- Prerequisite-aware content sequencing
- Skill gap identification and filling

### 4. Generative Assessments
- AI-generated quizzes aligned to current skill gaps
- Difficulty adaptation based on performance
- Instant feedback with AI-generated explanations
- Multiple question formats (MCQ, short answer, code completion)

### 5. Multi-Signal Analytics
- Time spent per topic visualization
- Mastery progression charts
- Engagement heatmaps
- Predictive "at-risk" learner detection

### 6. Intelligent Recommendations
- Skill-based filtering and suggestions
- Prerequisite-aware recommendations
- "Fill your knowledge gaps" feature
- Personalized learning resources

## 🛠 Tech Stack

**Frontend**:
- Next.js 14+ (App Router)
- React 18
- TypeScript
- Tailwind CSS
- React Flow (graph visualization)
- Recharts (analytics)

**Backend**:
- AWS Amplify Gen 2
- AppSync GraphQL
- DynamoDB
- Lambda (Node.js)
- AWS Cognito (authentication)
- AWS Bedrock (AI/LLM - Amazon Nova Pro)

**Deployment**:
- AWS Amplify Hosting
- CloudWatch (monitoring)

## 📊 Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend (Next.js)                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │ Skill Graph  │  │  AI Tutor    │  │  Analytics   │  │
│  │ Visualization│  │   Chat       │  │  Dashboard   │  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
└────────────┬────────────────────────────────────────────┘
             │ GraphQL + Subscriptions
             ▼
┌─────────────────────────────────────────────────────────┐
│                  AWS AppSync (GraphQL)                   │
└────────────┬────────────────────────────────────────────┘
             │
      ┌──────┴──────┬──────────────┬──────────────┐
      ▼             ▼              ▼              ▼
┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
│ DynamoDB │  │  Lambda  │  │ Bedrock  │  │ Cognito  │
│  Tables  │  │Functions │  │   AI     │  │   Auth   │
└──────────┘  └──────────┘  └──────────┘  └──────────┘
     │             │              │
     │        ┌────┴────┐         │
     │        │         │         │
     ▼        ▼         ▼         ▼
  User    Generate  Recommend  Evaluate
  Data      Quiz      Next     Answers
```

## 🗂 Data Model

### Core Entities
- **User**: Learner, Instructor, Admin roles
- **Course**: Container for learning content
- **Topic**: Specific subject within a course
- **Skill**: Atomic learning unit with prerequisites
- **SkillPrerequisite**: Graph edges for skill relationships

### Progress Tracking
- **UserSkillMastery**: Bayesian Knowledge Tracing (BKT) for mastery estimation
- **CourseEnrollment**: User progress through courses
- **LearningEvent**: Multi-signal tracking (time, clicks, struggles)

### Assessments
- **Quiz**: Container for questions
- **QuizQuestion**: Individual assessment items
- **QuizAttempt**: User responses and scoring

### AI Tutoring
- **ChatSession**: Conversation container
- **ChatMessage**: Individual messages with context snapshots

## 🎓 Sample Course: Introduction to React

### Skill Graph Structure
```
JSX Basics → Components → Props → State
    ↓           ↓          ↓       ↓
  Styling   Composition  Forms   Hooks
                                   ↓
                              useEffect
                                   ↓
                            Custom Hooks
```

## 🚧 Project Timeline (6-8 Weeks)

### Phase 1: Foundation (Weeks 1-2)
- ✅ Project setup and scaffolding
- ✅ Complete GraphQL schema
- ✅ Cognito authentication
- ✅ Basic app structure
- ✅ Seed data

### Phase 2: AI Capabilities (Weeks 3-4)
- 🔲 Real-time AI tutor with streaming
- 🔲 Generative assessments
- 🔲 Bayesian Knowledge Tracing

### Phase 3: Adaptive Personalization (Weeks 5-6)
- 🔲 Multi-signal event tracking
- 🔲 Recommendation engine
- 🔲 Analytics dashboard

### Phase 4: Polish & Demo Prep (Weeks 7-8)
- 🔲 UI polish and animations
- 🔲 Content creation
- 🔲 Testing and deployment
- 🔲 Demo scenarios

## 📦 Getting Started

### Prerequisites
- Node.js 18+ and npm
- AWS Account
- AWS CLI configured
- Git

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd adapt2learn

# Install dependencies
npm install

# Start Amplify sandbox (deploys backend)
npx ampx sandbox

# In another terminal, start the dev server
npm run dev
```

### Environment Variables

Create a `.env.local` file:
```env
NEXT_PUBLIC_AWS_REGION=us-east-1
```

### Seeding Data

```bash
# Run seed script to populate sample course
npm run seed
```

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run E2E tests
npm run test:e2e

# Run type checking
npm run type-check
```

## 📈 Cost Estimates

### Demo Phase (30 days)
- AWS Bedrock: ~$12
- DynamoDB: ~$5
- Lambda: ~$2
- AppSync: ~$4
- Hosting: ~$1
- **Total: ~$24/month**

### Production (100 active users)
- ~$85/month

### Cost Control
- Response caching
- Request rate limiting
- CloudWatch alarms at $10/day
- Prompt optimization (<2K tokens)

## 🎬 Demo Scenarios

### Scenario 1: The Struggling Beginner (Sarah)
Shows AI adaptation for struggling learners with personalized support.

### Scenario 2: The Intermediate Practitioner (Alex)
Demonstrates predictive analytics and targeted skill gap filling.

### Scenario 3: The Instructor View
Highlights institutional value with class-wide analytics.

## 🔐 Security

- Row-level security with Cognito
- Owner-based authorization for user data
- Role-based access control (Learner, Instructor, Admin)
- API rate limiting
- Input validation and sanitization

## 📊 Analytics & Monitoring

- CloudWatch Logs for Lambda functions
- CloudWatch Metrics for performance
- Cost monitoring and alarms
- User engagement tracking
- AI response quality metrics

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

MIT License - See LICENSE file for details

## 🙏 Acknowledgments

- AWS Amplify team for Gen 2 framework
- React Flow for graph visualization
- AWS Bedrock for AI capabilities

## 📞 Support

For questions or issues:
- Create an issue in this repository
- Contact: [your-email@example.com]

---

**Status**: 🚧 Week 1 - Core Infrastructure (In Progress)

**Next Milestone**: Complete GraphQL schema and authentication setup
