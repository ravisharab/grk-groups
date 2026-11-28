
export type TechnologySlug =
  | 'java'
  | 'aws'
  | 'kafka'
  | 'docker'
  | 'spring-boot'
  | 'kubernetes'
  | 'system-design'
  | 'coding';

export type Difficulty =
  | 'beginner'
  | 'intermediate'
  | 'advanced'
  | 'expert';

export type VoiceLanguage =
  | 'en-US'
  | 'en-IN'
  | 'te-IN'
  | 'hi-IN';

export interface Technology {
  slug: TechnologySlug;
  name: string;
  icon: string;
  description: string;
  targetQuestions: number;
  color: string;
  gradient: string;
  border: string;
  topics: string[];
}

export interface InterviewQuestion {
  id: string;
  technology: TechnologySlug;
  topic: string;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  detailedAnswerTelugu?: string;
  difficulty: Difficulty;

  experienceLevel?: string;

  codeExample?: string;
  codeLanguage?: string;
  codeOutput?: string;

  realTimeScenario?: string;
  interviewTips?: string[];

  followUpQuestions?: string[];
  commonMistakes?: string[];

  narrationEnglish?: string;
  narrationTelugu?: string;
  narrationHindi?: string;

  estimatedMinutes?: number;
  tags?: string[];

  isPublished: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface VoiceSettings {
  language: VoiceLanguage;
  rate: number;
  pitch: number;
  volume: number;
  voiceURI?: string;
  autoPlayNext: boolean;
}

export interface StudyProgress {
  questionId: string;
  completed: boolean;
  bookmarked: boolean;
  lastStudiedAt?: string;
}
