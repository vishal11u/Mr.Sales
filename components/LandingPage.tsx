import React from 'react';
import { FileUpload } from './FileUpload';
import { Step1Icon } from './icons/Step1Icon';
import { Step2Icon } from './icons/Step2Icon';
import { Step3Icon } from './icons/Step3Icon';

interface LandingPageProps {
  onFileSelect: (file: File) => void;
  disabled: boolean;
  error: string | null;
}

export const LandingPage: React.FC<LandingPageProps> = ({ onFileSelect, disabled, error }) => {
  return (
    <div className="text-center animate-fade-in">
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-content-100 dark:text-dark-content-100">
        Unlock Your Sales Potential with
        <span className="text-brand-primary dark:text-dark-brand-primary ml-3">AI-Powered Coaching</span>
      </h1>
      <p className="mt-6 max-w-2xl mx-auto text-lg text-content-200 dark:text-dark-content-200">
        Get instant, data-driven feedback on your sales calls. Upload a recording to receive a detailed analysis of your performance, identify areas for improvement, and close more deals.
      </p>

      <div className="mt-12">
        <FileUpload onFileSelect={onFileSelect} disabled={disabled} />
        {error && (
            <div className="mt-4 text-red-500 bg-red-500/10 p-3 rounded-md max-w-lg mx-auto">
                <strong>Analysis Failed:</strong> {error}
            </div>
        )}
      </div>

      <div className="mt-20 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="flex flex-col items-center text-center p-6 bg-base-200/50 dark:bg-dark-base-200/50 rounded-lg">
            <Step1Icon className="w-12 h-12 mb-4 text-brand-accent dark:text-dark-brand-accent"/>
            <h3 className="text-xl font-semibold mb-2">1. Upload Your Call</h3>
            <p className="text-content-200 dark:text-dark-content-200">
              Securely upload an audio file of your sales conversation. We support common formats like MP3 and WAV.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-base-200/50 dark:bg-dark-base-200/50 rounded-lg">
            <Step2Icon className="w-12 h-12 mb-4 text-brand-accent dark:text-dark-brand-accent"/>
            <h3 className="text-xl font-semibold mb-2">2. AI Analysis Engine</h3>
            <p className="text-content-200 dark:text-dark-content-200">
              Our advanced AI processes the audio, transcribes the dialogue, and analyzes sentiment, tone, and key metrics.
            </p>
          </div>
          <div className="flex flex-col items-center text-center p-6 bg-base-200/50 dark:bg-dark-base-200/50 rounded-lg">
            <Step3Icon className="w-12 h-12 mb-4 text-brand-accent dark:text-dark-brand-accent"/>
            <h3 className="text-xl font-semibold mb-2">3. Get Actionable Insights</h3>
            <p className="text-content-200 dark:text-dark-content-200">
              Receive a comprehensive dashboard with your coaching card, sentiment graph, and a full transcript.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
