import React, { useState } from 'react';
import { AnalysisResult, FeedbackValue, DashboardLayout, ConversationType } from '../types';
import { TranscriptDisplay } from './TranscriptDisplay';
import { SentimentGraph } from './SentimentGraph';
import { CoachingCard } from './CoachingCard';
import { AudioPlayer } from './AudioPlayer';
import { AiInsights } from './AiInsights';
import { NextSteps } from './NextSteps';
import { VocalDelivery } from './VocalDelivery';
import { KeywordTracker } from './KeywordTracker';
import { ManagerComments } from './ManagerComments';
import { ExportButton } from './ExportButton';
import { DashboardSettings } from './DashboardSettings';
import { ShareButton } from './ShareButton';
import { UploadIcon } from './icons/UploadIcon';

interface DashboardProps {
  result: AnalysisResult;
  audioUrl: string;
  onReset: () => void;
  conversationType: ConversationType;
}

const initialLayout: DashboardLayout = {
  transcript: true,
  audioPlayer: true,
  aiInsights: true,
  sentimentGraph: true,
  coachingCard: true,
  nextSteps: true,
  vocalDelivery: true,
  keywordTracker: true,
};

const CONTEXT_LABELS: Record<ConversationType, any> = {
  sales: {
    dashboardTitle: "Sales Call Analysis",
    coachingCardTitle: "AI Coaching Card",
    speakerA: "Customer",
    speakerB: "Salesperson",
  },
  interview: {
    dashboardTitle: "Interview Analysis",
    coachingCardTitle: "Interview Feedback",
    speakerA: "Interviewer",
    speakerB: "Candidate",
  },
  support: {
    dashboardTitle: "Customer Support Analysis",
    coachingCardTitle: "Quality Assurance Card",
    speakerA: "Customer",
    speakerB: "Support Agent",
  },
  presentation: {
    dashboardTitle: "Presentation Analysis",
    coachingCardTitle: "Presentation Feedback",
    speakerA: "Audience",
    speakerB: "Presenter",
  },
};

export const Dashboard: React.FC<DashboardProps> = ({ result, audioUrl, onReset, conversationType }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [coachingFeedback, setCoachingFeedback] = useState<FeedbackValue>(null);
  const [insightsFeedback, setInsightsFeedback] = useState<FeedbackValue>(null);
  const [managerComment, setManagerComment] = useState('');
  const [layout, setLayout] = useState<DashboardLayout>(initialLayout);
  
  const labels = CONTEXT_LABELS[conversationType];

  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-base-200 dark:bg-dark-base-200 rounded-lg shadow-sm border border-base-300 dark:border-dark-base-300">
        <h1 className="text-2xl font-bold">{labels.dashboardTitle}</h1>
        <div className="flex items-center space-x-2">
          <button
            type="button"
            className="inline-flex items-center justify-center w-full rounded-md border border-brand-primary/50 dark:border-dark-brand-primary/50 shadow-sm px-4 py-2 bg-brand-primary/10 dark:bg-dark-brand-primary/10 text-sm font-medium text-brand-primary dark:text-dark-brand-primary hover:bg-brand-primary/20 dark:hover:bg-dark-brand-primary/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-100 dark:focus:ring-offset-dark-base-100 focus:ring-brand-primary dark:focus:ring-dark-brand-primary"
            onClick={onReset}
          >
            <UploadIcon className="-ml-1 mr-2 h-5 w-5" />
            New Analysis
          </button>
          <DashboardSettings layout={layout} onLayoutChange={setLayout} />
          <ExportButton result={result} comment={managerComment} />
          <ShareButton result={result} />
        </div>
      </div>

      {layout.audioPlayer && (
        <AudioPlayer 
          src={audioUrl} 
          onTimeUpdate={setCurrentTime}
          onDurationChange={setDuration}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column for transcript */}
        <div className={`lg:col-span-1 space-y-6 ${!layout.transcript ? 'hidden lg:block lg:invisible' : ''}`}>
            {layout.transcript && <TranscriptDisplay transcript={result.transcript} currentTime={currentTime} speakerALabel={labels.speakerA} speakerBLabel={labels.speakerB} />}
        </div>

        {/* Right column for other cards */}
        <div className="lg:col-span-2 space-y-6">
          {layout.sentimentGraph && <SentimentGraph data={result.sentimentData} currentTime={currentTime} duration={duration} speakerALabel={labels.speakerA} speakerBLabel={labels.speakerB}/>}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {layout.coachingCard && <CoachingCard data={result.coachingCard} feedback={coachingFeedback} onFeedback={setCoachingFeedback} title={labels.coachingCardTitle} />}
            {layout.nextSteps && <NextSteps data={result.nextSteps} />}
          </div>

          {layout.aiInsights && result.aiInsights && <AiInsights data={result.aiInsights} feedback={insightsFeedback} onFeedback={setInsightsFeedback} />}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {layout.vocalDelivery && result.vocalDelivery && <VocalDelivery data={result.vocalDelivery} />}
            {layout.keywordTracker && result.keywordAnalysis && <KeywordTracker data={result.keywordAnalysis} speakerALabel={labels.speakerA} speakerBLabel={labels.speakerB} />}
          </div>
          
          <ManagerComments comment={managerComment} onCommentChange={setManagerComment} />
        </div>
      </div>
    </div>
  );
};