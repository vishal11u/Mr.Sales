
export interface TranscriptEntry {
  speaker: 'A' | 'B';
  text: string;
  timestamp: number;
}

export interface SentimentDataPoint {
  turn: number;
  'Customer (A)': number;
  'Salesperson (B)': number;
}

export interface CoachingCardData {
  strengths: string[];
  opportunities: string[];
}

export interface AnalysisResult {
  transcript: TranscriptEntry[];
  sentimentData: SentimentDataPoint[];
  coachingCard: CoachingCardData;
}
