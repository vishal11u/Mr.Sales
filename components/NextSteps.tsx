// FIX: Removed file content markers that were causing parsing errors.
import React from 'react';
import { Tooltip } from './Tooltip';
import { InfoIcon } from './icons/InfoIcon';
import { ChecklistIcon } from './icons/ChecklistIcon';

interface NextStepsProps {
  data: string[];
}

export const NextSteps: React.FC<NextStepsProps> = ({ data }) => {
  if (!data || data.length === 0) return null;

  return (
    <div className="bg-base-200 dark:bg-dark-base-200 rounded-lg shadow-lg p-6 border border-base-300 dark:border-dark-base-300">
      <div className="flex items-center space-x-2 mb-4">
        <h2 className="flex items-center text-xl font-bold text-content-100 dark:text-dark-content-100">
          <ChecklistIcon className="w-6 h-6 mr-3 text-brand-accent dark:text-dark-brand-accent" />
          <span>Actionable Next Steps</span>
        </h2>
        <Tooltip text="Direct calls to action for the salesperson to focus on for immediate improvement.">
          <InfoIcon className="w-4 h-4 text-content-200 dark:text-dark-content-200" />
        </Tooltip>
      </div>
      <ol className="list-decimal list-inside space-y-2 text-content-200 dark:text-dark-content-200 pl-2">
        {data.map((step, index) => (
          <li key={`step-${index}`}>
            {step}
          </li>
        ))}
      </ol>
    </div>
  );
};
