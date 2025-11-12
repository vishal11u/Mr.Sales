import React from 'react';
import { AiInsightsData, FeedbackValue } from '../types';
import { WandIcon } from './icons/WandIcon';
import { FeedbackButtons } from './FeedbackButtons';
import { Tooltip } from './Tooltip';
import { InfoIcon } from './icons/InfoIcon';

interface AiInsightsProps {
  data?: AiInsightsData;
  feedback: FeedbackValue;
  onFeedback: (value: FeedbackValue) => void;
}

export const AiInsights: React.FC<AiInsightsProps> = ({ data, feedback, onFeedback }) => {
  if (!data) return null;

  return (
    <div className="bg-base-200 dark:bg-dark-base-200 rounded-lg shadow-lg p-6 border border-base-300 dark:border-dark-base-300">
      <h2 className="flex items-center text-xl font-bold mb-4 text-content-100 dark:text-dark-content-100">
         <WandIcon className="w-6 h-6 mr-3 text-brand-accent dark:text-dark-brand-accent" />
        <span>AI Insights</span>
        <Tooltip text="Provides a high-level overview of the call, including a summary, key action items, and a practice scenario.">
          <InfoIcon className="w-4 h-4 text-content-200 dark:text-dark-content-200 ml-2" />
        </Tooltip>
      </h2>
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-content-100 dark:text-dark-content-100 mb-2">Summary</h3>
          <p className="text-content-200 dark:text-dark-content-200">{data.summary}</p>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-content-100 dark:text-dark-content-100 mb-2">Key Points</h3>
          <ul className="list-disc list-inside space-y-2 text-content-200 dark:text-dark-content-200 pl-2">
            {data.keyPoints.map((point, index) => (
              <li key={`point-${index}`}>{point}</li>
            ))}
          </ul>
        </div>
         <div>
          <h3 className="text-lg font-semibold text-content-100 dark:text-dark-content-100 mb-2">Suggested Role-Play Scenario</h3>
          <p className="text-sm italic text-content-200 dark:text-dark-content-200 p-3 bg-base-100 dark:bg-dark-base-100 rounded-md">
            "{data.rolePlaySuggestion}"
          </p>
        </div>
      </div>
      <div className="border-t border-base-300 dark:border-dark-base-300 mt-6 pt-4">
        <FeedbackButtons
          feedback={feedback}
          onFeedback={onFeedback}
        />
      </div>
    </div>
  );
};
