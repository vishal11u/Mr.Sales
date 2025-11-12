import React from 'react';
import { AnalysisResult } from '../types';
import { TranscriptDisplay } from './TranscriptDisplay';
import { SentimentGraph } from './SentimentGraph';
import { CoachingCard } from './CoachingCard';
import { ExportButton } from './ExportButton';
import { AudioPlayer } from './AudioPlayer';

interface DashboardProps {
  result: AnalysisResult;
  audioUrl: string | null;
}

export const Dashboard: React.FC<DashboardProps> = ({ result, audioUrl }) => {
  return (
    <div className="flex flex-col h-full max-h-[calc(100vh-180px)]">
      <div className="flex justify-between items-center mb-6 shrink-0 px-1">
          <h2 className="text-3xl font-bold text-content-100 tracking-tight animate-fade-in" style={{ opacity: 0 }}>
            Analysis Dashboard
          </h2>
          <div className="animate-fade-in" style={{ animationDelay: '0.1s', opacity: 0 }}>
            <ExportButton result={result} />
          </div>
      </div>
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-5 gap-6 min-h-0">
        <div
          className="lg:col-span-2 h-full min-h-0 animate-fade-in-up"
          style={{ animationDelay: '0.2s', opacity: 0 }}
        >
          <TranscriptDisplay transcript={result.transcript} />
        </div>
        <div className="lg:col-span-3 space-y-6 overflow-y-auto pr-2 min-h-0">
          {audioUrl && (
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s', opacity: 0 }}>
              <AudioPlayer src={audioUrl} />
            </div>
          )}
          <div className="animate-fade-in-up" style={{ animationDelay: '0.4s', opacity: 0 }}>
            <SentimentGraph data={result.sentimentData} />
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.5s', opacity: 0 }}>
            <CoachingCard data={result.coachingCard} />
          </div>
        </div>
      </div>
    </div>
  );
};