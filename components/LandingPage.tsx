import React from 'react';
import { FileUpload } from './FileUpload';
import { LightBulbIcon } from './icons/LightBulbIcon';
import { TranscriptIcon } from './icons/TranscriptIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { SpeedometerIcon } from './icons/SpeedometerIcon';
import { TagIcon } from './icons/TagIcon';
import { ChecklistIcon } from './icons/ChecklistIcon';
import { WandIcon } from './icons/WandIcon';
import { ExportIcon } from './icons/ExportIcon';
import { HowItWorks } from './HowItWorks';
import { KeywordGlossary } from './KeywordGlossary';

interface LandingPageProps {
  onFileSelect: (file: File) => void;
  disabled: boolean;
  error: string | null;
}

const features = [
    {
      icon: LightBulbIcon,
      title: 'AI Coaching Card',
      description: 'Receive personalized strengths and opportunities for improvement based on your call performance.'
    },
    {
      icon: TranscriptIcon,
      title: 'Full Call Transcript',
      description: 'Get a complete, time-stamped, and speaker-diarized transcript of the entire conversation.'
    },
    {
      icon: ChartBarIcon,
      title: 'Sentiment Analysis',
      description: 'Visualize the emotional tone of both the salesperson and customer throughout the call.'
    },
    {
      icon: SpeedometerIcon,
      title: 'Vocal Delivery Metrics',
      description: 'Analyze your pace, clarity, tone, and usage of filler words to enhance your communication style.'
    },
    {
      icon: TagIcon,
      title: 'Keyword Tracking',
      description: 'Monitor how often key terms related to pricing, features, and competitors are mentioned.'
    },
    {
      icon: ChecklistIcon,
      title: 'Actionable Next Steps',
      description: 'Obtain a clear, concise list of actions to take to improve and move the deal forward.'
    },
    {
      icon: WandIcon,
      title: 'AI-Generated Insights',
      description: 'A high-level summary, key discussion points, and even a role-play scenario for practice.'
    },
    {
      icon: ExportIcon,
      title: 'Export & Share',
      description: 'Easily export the full analysis for reports, or share insights with your manager or team.'
    },
];


export const LandingPage: React.FC<LandingPageProps> = ({ onFileSelect, disabled, error }) => {
  return (
    <div className="animate-fade-in">
      <div className="text-center">
        <h1
          className="text-4xl md:text-5xl font-extrabold tracking-tight text-content-100 dark:text-dark-content-100"
          data-tour-id="welcome-title"
        >
          Unlock Your Sales Potential with
          <span className="text-brand-primary dark:text-dark-brand-primary ml-3">AI-Powered Coaching</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-content-200 dark:text-dark-content-200">
          Get instant, data-driven feedback on your sales calls. Upload a recording to receive a detailed analysis of your performance, identify areas for improvement, and close more deals.
        </p>

        <div className="mt-12" data-tour-id="file-upload">
          <FileUpload onFileSelect={onFileSelect} disabled={disabled} />
          {error && (
              <div className="mt-4 text-red-500 bg-red-500/10 p-3 rounded-md max-w-lg mx-auto">
                  <strong>Analysis Failed:</strong> {error}
              </div>
          )}
        </div>
      </div>
      
      <HowItWorks />

      <div className="mt-20 max-w-7xl mx-auto" data-tour-id="features-section">
        <h2 className="text-3xl font-bold text-center mb-12">Features at a Glance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="animate-fade-in-up flex flex-col items-center text-center p-6 bg-base-200/50 dark:bg-dark-base-200/50 rounded-lg shadow-sm border border-transparent hover:border-base-300 dark:hover:border-dark-base-300 hover:shadow-xl hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
              style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
            >
              <feature.icon className="w-12 h-12 mb-4 text-brand-accent dark:text-dark-brand-accent" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-content-200 dark:text-dark-content-200 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <KeywordGlossary />
    </div>
  );
};