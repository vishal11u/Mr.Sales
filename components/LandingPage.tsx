import React from 'react';
import { TranscriptIcon } from './icons/TranscriptIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { BrainIcon } from './icons/BrainIcon';

const features = [
  {
    name: 'Full Transcription',
    description: 'Get a complete, speaker-diarized transcript of your sales call.',
    icon: TranscriptIcon,
  },
  {
    name: 'Sentiment Analysis',
    description: 'Track customer and salesperson sentiment throughout the conversation to identify key moments.',
    icon: ChartBarIcon,
  },
  {
    name: 'AI-Powered Coaching',
    description: 'Receive actionable feedback with identified strengths and opportunities for improvement.',
    icon: BrainIcon,
  },
];

export const LandingPage: React.FC = () => {
  return (
    <div className="text-center">
      <h2 className="text-3xl font-bold tracking-tight text-content-100 sm:text-4xl">
        Unlock Actionable Insights from Your Sales Calls
      </h2>
      <p className="mt-6 text-lg leading-8 text-content-200">
        Upload an audio recording of a sales call, and our AI will provide a full transcript, sentiment analysis, and a personalized coaching card to help you improve your sales technique.
      </p>
      <div className="mt-20 grid grid-cols-1 gap-y-10 md:grid-cols-3 md:gap-x-8 md:gap-y-16">
        {features.map((feature) => (
          <div key={feature.name} className="flex flex-col items-center">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-brand-primary text-white">
              <feature.icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-medium leading-6 text-content-100">{feature.name}</h3>
              <p className="mt-2 text-base text-content-200">{feature.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
