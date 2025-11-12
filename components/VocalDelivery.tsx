import React from 'react';
import { VocalDeliveryAnalysis } from '../types';
import { SpeedometerIcon } from './icons/SpeedometerIcon';
import { Tooltip } from './Tooltip';
import { InfoIcon } from './icons/InfoIcon';

interface VocalDeliveryProps {
  data?: VocalDeliveryAnalysis;
}

export const VocalDelivery: React.FC<VocalDeliveryProps> = ({ data }) => {
  if (!data) return null;

  return (
    <div className="bg-base-200 dark:bg-dark-base-200 rounded-lg shadow-lg p-6 border border-base-300 dark:border-dark-base-300">
      <h2 className="flex items-center text-xl font-bold mb-4 text-content-100 dark:text-dark-content-100">
        <SpeedometerIcon className="w-6 h-6 mr-3 text-brand-accent dark:text-dark-brand-accent" />
        <span>Vocal Delivery</span>
        <Tooltip text="Analyzes the salesperson's speech patterns based on the transcript to provide feedback on their delivery.">
          <InfoIcon className="w-4 h-4 text-content-200 dark:text-dark-content-200 ml-2" />
        </Tooltip>
      </h2>
      <div className="space-y-4 text-sm">
        <div className="flex justify-between">
          <span className="font-semibold text-content-100 dark:text-dark-content-100">Pace:</span>
          <span className="text-content-200 dark:text-dark-content-200 text-right">{data.pace}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-semibold text-content-100 dark:text-dark-content-100">Clarity:</span>
          <span className="text-content-200 dark:text-dark-content-200 text-right">{data.clarity}</span>
        </div>
        <div>
          <div className="flex justify-between items-center">
            <span className="font-semibold text-content-100 dark:text-dark-content-100">Tone:</span>
            <span className="text-content-100 dark:text-dark-content-100 text-xs font-semibold px-2 py-1 bg-base-300 dark:bg-dark-base-300 rounded-full">{data.tone.classification}</span>
          </div>
          <p className="text-content-200 dark:text-dark-content-200 text-xs italic mt-1 pl-2 border-l-2 border-base-300 dark:border-dark-base-300">
            {data.tone.impact}
          </p>
        </div>
        {data.fillerWords.length > 0 && (
          <div>
            <span className="font-semibold text-content-100 dark:text-dark-content-100">Filler Words:</span>
            <div className="flex flex-wrap gap-2 mt-1">
              {data.fillerWords.map(fw => (
                <span key={fw.word} className="bg-base-300 dark:bg-dark-base-300 text-xs font-medium px-2 py-1 rounded-full">
                  {fw.word}: {fw.count}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};