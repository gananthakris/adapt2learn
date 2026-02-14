import { a, defineData, defineFunction } from "@aws-amplify/backend";

const sendChatMessageFn = defineFunction({
  name: "send-chat-message",
  entry: "../functions/ai-tutor/handler.ts"
});

const generateQuizFn = defineFunction({
  name: "generate-quiz",
  entry: "../functions/generate-quiz/handler.ts"
});

const evaluateAnswerFn = defineFunction({
  name: "evaluate-answer",
  entry: "../functions/evaluate-answer/handler.ts"
});

const updateSkillMasteryFn = defineFunction({
  name: "update-skill-mastery",
  entry: "../functions/update-mastery/handler.ts"
});

const getRecommendationsFn = defineFunction({
  name: "get-recommendations",
  entry: "../functions/recommend-next/handler.ts"
});

const schema = a
  .schema({
    UserRole: a.enum(["LEARNER", "INSTRUCTOR", "ADMIN"]),
    MasteryLevel: a.enum(["NOT_STARTED", "BEGINNER", "DEVELOPING", "PROFICIENT", "EXPERT"]),
    DifficultyLevel: a.enum(["EASY", "MEDIUM", "HARD"]),
    QuestionType: a.enum(["MCQ", "TRUE_FALSE", "SHORT_ANSWER", "CODE_COMPLETION"]),
    EventType: a.enum(["PAGE_VIEW", "QUIZ_ATTEMPT", "CHAT", "STRUGGLE", "CONTENT_COMPLETE"]),

    UserProfile: a
      .model({
        owner: a.string().required(),
        email: a.string().required(),
        displayName: a.string().required(),
        role: a.ref("UserRole").required(),
        interests: a.string().array(),
        timezone: a.string(),
        streakDays: a.integer().default(0)
      })
      .authorization((allow) => [allow.owner(), allow.groups(["Admin"]).to(["read", "update"])]),

    Course: a
      .model({
        title: a.string().required(),
        slug: a.string().required(),
        description: a.string(),
        level: a.string(),
        isPublished: a.boolean().default(false)
      })
      .authorization((allow) => [allow.authenticated().to(["read"]), allow.groups(["Instructor", "Admin"]).to(["create", "update", "delete"])]),

    Topic: a
      .model({
        courseId: a.id().required(),
        title: a.string().required(),
        order: a.integer().required(),
        content: a.string().required(),
        estimatedMinutes: a.integer().default(10)
      })
      .authorization((allow) => [allow.authenticated().to(["read"]), allow.groups(["Instructor", "Admin"]).to(["create", "update", "delete"])]),

    Skill: a
      .model({
        courseId: a.id().required(),
        topicId: a.id().required(),
        key: a.string().required(),
        title: a.string().required(),
        description: a.string(),
        order: a.integer().required()
      })
      .authorization((allow) => [allow.authenticated().to(["read"]), allow.groups(["Instructor", "Admin"]).to(["create", "update", "delete"])]),

    SkillPrerequisite: a
      .model({
        courseId: a.id().required(),
        skillId: a.id().required(),
        prerequisiteSkillId: a.id().required()
      })
      .authorization((allow) => [allow.authenticated().to(["read"]), allow.groups(["Instructor", "Admin"]).to(["create", "delete"])]),

    CourseEnrollment: a
      .model({
        userId: a.string().required(),
        courseId: a.id().required(),
        progressPct: a.float().default(0),
        startedAt: a.datetime(),
        completedAt: a.datetime()
      })
      .authorization((allow) => [allow.ownerDefinedIn("userId"), allow.groups(["Instructor", "Admin"]).to(["read"])]),

    UserSkillMastery: a
      .model({
        userId: a.string().required(),
        skillId: a.id().required(),
        pKnown: a.float().default(0.2),
        pTransit: a.float().default(0.15),
        pSlip: a.float().default(0.1),
        pGuess: a.float().default(0.2),
        masteryScore: a.float().default(0),
        masteryLevel: a.ref("MasteryLevel").required(),
        lastEvidenceAt: a.datetime()
      })
      .authorization((allow) => [allow.ownerDefinedIn("userId"), allow.groups(["Instructor", "Admin"]).to(["read", "update"])]),

    Quiz: a
      .model({
        courseId: a.id().required(),
        topicId: a.id().required(),
        skillIds: a.id().array(),
        title: a.string().required(),
        difficulty: a.ref("DifficultyLevel").required(),
        generatedByAi: a.boolean().default(true)
      })
      .authorization((allow) => [allow.authenticated().to(["read"]), allow.groups(["Instructor", "Admin"]).to(["create", "update", "delete"])]),

    QuizQuestion: a
      .model({
        quizId: a.id().required(),
        prompt: a.string().required(),
        questionType: a.ref("QuestionType").required(),
        options: a.string().array(),
        correctAnswer: a.string(),
        explanation: a.string(),
        difficulty: a.ref("DifficultyLevel")
      })
      .authorization((allow) => [allow.authenticated().to(["read"]), allow.groups(["Instructor", "Admin"]).to(["create", "update", "delete"])]),

    QuizAttempt: a
      .model({
        userId: a.string().required(),
        quizId: a.id().required(),
        score: a.float().required(),
        maxScore: a.float().required(),
        answersJson: a.string(),
        feedbackJson: a.string(),
        completedAt: a.datetime().required()
      })
      .authorization((allow) => [allow.ownerDefinedIn("userId"), allow.groups(["Instructor", "Admin"]).to(["read"])]),

    ChatSession: a
      .model({
        userId: a.string().required(),
        topicId: a.id(),
        title: a.string(),
        contextSnapshot: a.string(),
        lastMessageAt: a.datetime()
      })
      .authorization((allow) => [allow.ownerDefinedIn("userId"), allow.groups(["Instructor", "Admin"]).to(["read"])]),

    ChatMessage: a
      .model({
        sessionId: a.id().required(),
        role: a.string().required(),
        content: a.string().required(),
        tokenCount: a.integer(),
        createdAt: a.datetime().required()
      })
      .authorization((allow) => [allow.authenticated().to(["read"]), allow.owner()]),

    LearningEvent: a
      .model({
        userId: a.string().required(),
        eventType: a.ref("EventType").required(),
        topicId: a.id(),
        skillId: a.id(),
        metadataJson: a.string(),
        durationMs: a.integer(),
        createdAt: a.datetime().required()
      })
      .authorization((allow) => [allow.ownerDefinedIn("userId"), allow.groups(["Instructor", "Admin"]).to(["read"])]),

    sendChatMessage: a
      .mutation()
      .arguments({ sessionId: a.id(), message: a.string().required(), topicId: a.id() })
      .returns(a.string())
      .handler(a.handler.function(sendChatMessageFn))
      .authorization((allow) => [allow.authenticated()]),

    generateQuiz: a
      .mutation()
      .arguments({ topicId: a.id().required(), difficulty: a.ref("DifficultyLevel").required(), questionCount: a.integer().required() })
      .returns(a.string())
      .handler(a.handler.function(generateQuizFn))
      .authorization((allow) => [allow.authenticated()]),

    evaluateAnswer: a
      .mutation()
      .arguments({ questionId: a.id().required(), userAnswer: a.string().required(), correctAnswer: a.string() })
      .returns(a.string())
      .handler(a.handler.function(evaluateAnswerFn))
      .authorization((allow) => [allow.authenticated()]),

    updateSkillMastery: a
      .mutation()
      .arguments({ userId: a.string().required(), skillId: a.id().required(), isCorrect: a.boolean().required() })
      .returns(a.float())
      .handler(a.handler.function(updateSkillMasteryFn))
      .authorization((allow) => [allow.authenticated()]),

    getRecommendations: a
      .query()
      .arguments({ userId: a.string().required(), limit: a.integer().default(5) })
      .returns(a.string())
      .handler(a.handler.function(getRecommendationsFn))
      .authorization((allow) => [allow.authenticated()])
  });

export const data = defineData({
  name: "adapt2learnData",
  schema
});
