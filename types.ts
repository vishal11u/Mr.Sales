// FIX: Removed file content markers that were causing parsing errors.
export type FeedbackValue = 'up' | 'down' | null;

export type ConversationType = 'sales' | 'interview' | 'support' | 'presentation';

export interface TranscriptEntry {
  timestamp: number;
  speaker: 'A' | 'B'; // A: Customer/Interviewer, B: Salesperson/Candidate
  text: string;
}

export interface SentimentDataPoint {
  timestamp: number;
  customerSentiment: number; // For Speaker A
  salespersonSentiment: number; // For Speaker B
}

export interface CoachingCardData {
  strengths: string[];
  opportunities: string[];
}

export interface AiInsightsData {
  summary: string;
  keyPoints: string[];
  rolePlaySuggestion: string;
}

export interface FillerWord {
  word: string;
  count: number;
}

export interface ToneAnalysis {
  classification: string;
  impact: string;
}

export interface VocalDeliveryAnalysis {
  pace: string;
  clarity: string;
  tone: ToneAnalysis;
  fillerWords: FillerWord[];
}

export interface Keyword {
  text: string;
}

export interface KeywordAnalysis {
  keyword: string;
  salespersonMentions: number;
  customerMentions: number;
}

export interface AnalysisResult {
  transcript: TranscriptEntry[];
  sentimentData: SentimentDataPoint[];
  coachingCard: CoachingCardData;
  nextSteps: string[];
  aiInsights?: AiInsightsData;
  vocalDelivery?: VocalDeliveryAnalysis;
  keywordAnalysis?: KeywordAnalysis[];
}

export interface DashboardLayout {
  transcript: boolean;
  audioPlayer: boolean;
  aiInsights: boolean;
  sentimentGraph: boolean;
  coachingCard: boolean;
  nextSteps: boolean;
  vocalDelivery: boolean;
  keywordTracker: boolean;
}