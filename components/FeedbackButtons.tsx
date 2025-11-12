import React from 'react';
import { FeedbackValue } from '../types';
import { ThumbsUpIcon } from './icons/ThumbsUpIcon';
import { ThumbsDownIcon } from './icons/ThumbsDownIcon';

interface FeedbackButtonsProps {
  feedback: FeedbackValue;
  onFeedback: (value: FeedbackValue) => void;
}

export const FeedbackButtons: React.FC<FeedbackButtonsProps> = ({ feedback, onFeedback }) => {
  return (
    <div className="flex items-center justify-end space-x-2">
        <span className="text-sm text-content-200 dark:text-dark-content-200 mr-2">Was this analysis helpful?</span>
        <button
            onClick={() => onFeedback('up')}
            className={`p-2 rounded-full transition-colors duration-200 ${
                feedback === 'up' 
                ? 'bg-green-500/20 text-green-600 dark:text-green-400' 
                : 'text-content-200 dark:text-dark-content-200 hover:bg-base-300 dark:hover:bg-dark-base-300'
            }`}
            aria-label="Helpful"
        >
            <ThumbsUpIcon className="w-5 h-5" />
        </button>
        <button
            onClick={() => onFeedback('down')}
            className={`p-2 rounded-full transition-colors duration-200 ${
                feedback === 'down' 
                ? 'bg-red-500/20 text-red-600 dark:text-red-400' 
                : 'text-content-200 dark:text-dark-content-200 hover:bg-base-300 dark:hover:bg-dark-base-300'
            }`}
            aria-label="Not helpful"
        >
            <ThumbsDownIcon className="w-5 h-5" />
        </button>
    </div>
  );
};
