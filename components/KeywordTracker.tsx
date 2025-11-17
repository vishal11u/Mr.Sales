import React from 'react';
import { KeywordAnalysis } from '../types';
import { TagIcon } from './icons/TagIcon';
import { Tooltip } from './Tooltip';
import { InfoIcon } from './icons/InfoIcon';

interface KeywordTrackerProps {
  data?: KeywordAnalysis[];
  speakerALabel: string;
  speakerBLabel: string;
}

export const KeywordTracker: React.FC<KeywordTrackerProps> = ({ data, speakerALabel, speakerBLabel }) => {
  if (!data || data.length === 0) return null;

  // Find the maximum mention count to normalize the bar widths for visual consistency
  const maxMentions = Math.max(
    ...data.map(d => Math.max(d.salespersonMentions, d.customerMentions)),
    1 // Use 1 as a minimum to prevent division by zero if all counts are 0
  );

  const Bar = ({ count, max, colorClass }: { count: number, max: number, colorClass: string }) => {
    const percentage = max > 0 ? (count / max) * 100 : 0;
    return (
      <div className="w-full bg-base-300 dark:bg-dark-base-300 rounded-full h-2.5">
        <div
          className={`${colorClass} h-2.5 rounded-full transition-all duration-500 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  return (
    <div className="bg-base-200 dark:bg-dark-base-200 rounded-lg shadow-lg p-6 border border-base-300 dark:border-dark-base-300">
      <h2 className="flex items-center text-xl font-bold mb-4 text-content-100 dark:text-dark-content-100">
        <TagIcon className="w-6 h-6 mr-3 text-brand-accent dark:text-dark-brand-accent" />
        <span>Keyword Tracker</span>
        <Tooltip text="Counts the number of times each pre-defined keyword was mentioned by both speakers.">
          <InfoIcon className="w-4 h-4 text-content-200 dark:text-dark-content-200 ml-2" />
        </Tooltip>
      </h2>
      <div className="space-y-4">
        {data.map(kw => (
          <div key={kw.keyword}>
            <h3 className="text-sm font-semibold text-content-100 dark:text-dark-content-100 mb-2 truncate" title={kw.keyword}>
              {kw.keyword}
            </h3>
            <div className="space-y-2 text-xs">
              <div className="grid grid-cols-12 items-center gap-2">
                <span className="col-span-3 text-content-200 dark:text-dark-content-200">{speakerBLabel}</span>
                <div className="col-span-8">
                    <Bar count={kw.salespersonMentions} max={maxMentions} colorClass="bg-blue-500 dark:bg-blue-400" />
                </div>
                <span className="col-span-1 text-right font-medium text-content-100 dark:text-dark-content-100">{kw.salespersonMentions}</span>
              </div>
              <div className="grid grid-cols-12 items-center gap-2">
                <span className="col-span-3 text-content-200 dark:text-dark-content-200">{speakerALabel}</span>
                <div className="col-span-8">
                    <Bar count={kw.customerMentions} max={maxMentions} colorClass="bg-emerald-500 dark:bg-emerald-400" />
                </div>
                <span className="col-span-1 text-right font-medium text-content-100 dark:text-dark-content-100">{kw.customerMentions}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};