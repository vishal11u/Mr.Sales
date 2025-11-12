
import React, { useState } from 'react';
import { AnalysisResult, FeedbackValue, DashboardLayout } from '../types';
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

interface DashboardProps {
  result: AnalysisResult;
  audioUrl: string;
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

export const Dashboard: React.FC<DashboardProps> = ({ result, audioUrl }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [coachingFeedback, setCoachingFeedback] = useState<FeedbackValue>(null);
  const [insightsFeedback, setInsightsFeedback] = useState<FeedbackValue>(null);
  const [managerComment, setManagerComment] = useState('');
  const [layout, setLayout] = useState<DashboardLayout>(initialLayout);
  
  return (
    <div className="animate-fade-in space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 p-4 bg-base-200 dark:bg-dark-base-200 rounded-lg shadow-sm border border-base-300 dark:border-dark-base-300">
        <h1 className="text-2xl font-bold">Analysis Dashboard</h1>
        <div className="flex items-center space-x-2">
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
            {layout.transcript && <TranscriptDisplay transcript={result.transcript} currentTime={currentTime} />}
        </div>

        {/* Right column for other cards */}
        <div className="lg:col-span-2 space-y-6">
          {layout.sentimentGraph && <SentimentGraph data={result.sentimentData} currentTime={currentTime} duration={duration} />}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {layout.coachingCard && <CoachingCard data={result.coachingCard} feedback={coachingFeedback} onFeedback={setCoachingFeedback} />}
            {layout.nextSteps && <NextSteps data={result.nextSteps} />}
          </div>

          {layout.aiInsights && result.aiInsights && <AiInsights data={result.aiInsights} feedback={insightsFeedback} onFeedback={setInsightsFeedback} />}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {layout.vocalDelivery && result.vocalDelivery && <VocalDelivery data={result.vocalDelivery} />}
            {layout.keywordTracker && result.keywordAnalysis && <KeywordTracker data={result.keywordAnalysis} />}
          </div>
          
          <ManagerComments comment={managerComment} onCommentChange={setManagerComment} />
        </div>
      </div>
    </div>
  );
};
