import React from 'react';
import { CoachingCardData, FeedbackValue } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { LightBulbIcon } from './icons/LightBulbIcon';
import { FeedbackButtons } from './FeedbackButtons';
import { Tooltip } from './Tooltip';
import { InfoIcon } from './icons/InfoIcon';

interface CoachingCardProps {
  data: CoachingCardData;
  feedback: FeedbackValue;
  onFeedback: (value: FeedbackValue) => void;
  title: string;
}

export const CoachingCard: React.FC<CoachingCardProps> = ({ data, feedback, onFeedback, title }) => {
  return (
    <div className="bg-base-200 dark:bg-dark-base-200 rounded-lg shadow-lg p-6 border border-base-300 dark:border-dark-base-300">
      <h2 className="text-xl font-bold mb-4 text-content-100 dark:text-dark-content-100">{title}</h2>
      <div className="space-y-6">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="flex items-center text-lg font-semibold text-green-600 dark:text-green-400">
              <CheckCircleIcon className="w-6 h-6 mr-2" />
              Strengths
            </h3>
            <Tooltip text="Highlights what was done well, based on best practices for this type of conversation.">
              <InfoIcon className="w-4 h-4 text-content-200 dark:text-dark-content-200" />
            </Tooltip>
          </div>
          <ul className="list-disc list-inside space-y-2 text-content-200 dark:text-dark-content-200 pl-2">
            {data.strengths.map((item, index) => (
              <li 
                key={`strength-${index}`}
                className="animate-fade-in-up"
                style={{ animationDelay: `${0.1 * (index + 1)}s`, opacity: 0 }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="flex items-center text-lg font-semibold text-yellow-600 dark:text-yellow-400">
              <LightBulbIcon className="w-6 h-6 mr-2" />
              Opportunities
            </h3>
            <Tooltip text="Identifies key moments where a different approach could have improved the outcome.">
              <InfoIcon className="w-4 h-4 text-content-200 dark:text-dark-content-200" />
            </Tooltip>
          </div>
          <ul className="list-disc list-inside space-y-2 text-content-200 dark:text-dark-content-200 pl-2">
            {data.opportunities.map((item, index) => (
              <li 
                key={`opportunity-${index}`}
                className="animate-fade-in-up"
                style={{ animationDelay: `${0.1 * (index + 1) + 0.3}s`, opacity: 0 }}
              >
                {item}
              </li>
            ))}
          </ul>
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