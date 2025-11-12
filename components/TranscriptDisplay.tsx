import React, { useRef, useEffect } from 'react';
import { TranscriptEntry } from '../types';
import { TranscriptIcon } from './icons/TranscriptIcon';
import { Tooltip } from './Tooltip';
import { InfoIcon } from './icons/InfoIcon';

interface TranscriptDisplayProps {
  transcript: TranscriptEntry[];
  currentTime: number;
}

export const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({ transcript, currentTime }) => {
  const activeEntryRef = useRef<HTMLDivElement>(null);

  const findActiveEntryIndex = () => {
    // Find the last entry whose timestamp is less than or equal to the current time
    let activeIndex = -1;
    for (let i = 0; i < transcript.length; i++) {
        if (transcript[i].timestamp <= currentTime) {
            activeIndex = i;
        } else {
            break;
        }
    }
    return activeIndex;
  };
  
  const activeIndex = findActiveEntryIndex();

  useEffect(() => {
    if (activeEntryRef.current) {
      activeEntryRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [activeIndex]);

  return (
    <div className="bg-base-200 dark:bg-dark-base-200 rounded-lg shadow-lg p-6 border border-base-300 dark:border-dark-base-300">
       <div className="flex items-center space-x-2 mb-4">
        <h2 className="flex items-center text-xl font-bold text-content-100 dark:text-dark-content-100">
            <TranscriptIcon className="w-6 h-6 mr-3" />
            <span>Call Transcript</span>
        </h2>
        <Tooltip text="A full, time-stamped transcription of the conversation. The current speaker is highlighted as the audio plays.">
          <InfoIcon className="w-4 h-4 text-content-200 dark:text-dark-content-200" />
        </Tooltip>
      </div>
      <div className="max-h-[600px] overflow-y-auto pr-4 scrollbar-thin">
        {transcript.map((entry, index) => (
          <div
            key={index}
            ref={index === activeIndex ? activeEntryRef : null}
            className={`p-3 rounded-lg transition-colors duration-300 mb-3 ${
              index === activeIndex
                ? 'bg-brand-primary/10 dark:bg-dark-brand-primary/10'
                : 'bg-base-100/50 dark:bg-dark-base-100/50'
            }`}
          >
            <div className="flex items-start">
              <div className="w-24 flex-shrink-0">
                <span className="font-mono text-xs text-content-200 dark:text-dark-content-200">
                  {new Date(entry.timestamp * 1000).toISOString().substr(14, 5)}
                </span>
                <span
                  className={`ml-2 text-xs font-bold ${
                    entry.speaker === 'A' ? 'text-emerald-600 dark:text-emerald-400' : 'text-blue-600 dark:text-blue-400'
                  }`}
                >
                  {entry.speaker === 'A' ? 'Customer' : 'Sales'}
                </span>
              </div>
              <p className="text-sm text-content-200 dark:text-dark-content-200 whitespace-pre-wrap leading-relaxed">
                {entry.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
