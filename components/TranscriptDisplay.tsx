import React, { useRef, useEffect } from 'react';
import { TranscriptEntry } from '../types';
import { TranscriptIcon } from './icons/TranscriptIcon';
import { Tooltip } from './Tooltip';
import { InfoIcon } from './icons/InfoIcon';

interface TranscriptDisplayProps {
  transcript: TranscriptEntry[];
  currentTime: number;
  speakerALabel: string;
  speakerBLabel: string;
}

export const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({ transcript, currentTime, speakerALabel, speakerBLabel }) => {
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
            <span>Conversation Transcript</span>
        </h2>
        <Tooltip text="A full, time-stamped transcription of the conversation. The current speaker is highlighted as the audio plays.">
          <InfoIcon className="w-4 h-4 text-content-200 dark:text-dark-content-200" />
        </Tooltip>
      </div>
      <div className="max-h-[600px] overflow-y-auto pr-2 scrollbar-thin">
        {transcript.map((entry, index) => (
          <div
            key={index}
            ref={index === activeIndex ? activeEntryRef : null}
            className={`flex mb-4 animate-fade-in-up ${entry.speaker === 'B' ? 'justify-end' : 'justify-start'}`}
            style={{ animationDelay: `${index * 30}ms`, opacity: 0 }}
          >
            <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl transition-all duration-300 ${
                entry.speaker === 'B' 
                  ? 'bg-brand-primary dark:bg-dark-brand-primary text-white rounded-br-none' 
                  : 'bg-base-300 dark:bg-dark-base-300 text-content-100 dark:text-dark-content-100 rounded-bl-none'
              } ${
                index === activeIndex ? 'ring-2 ring-brand-accent dark:ring-dark-brand-accent shadow-lg scale-105' : 'shadow-md'
              }`}
            >
              <div className="flex items-baseline justify-between mb-1">
                  <p className={`font-bold text-sm ${entry.speaker === 'B' ? 'text-white/90' : 'text-content-100 dark:text-dark-content-100'}`}>
                      {entry.speaker === 'A' ? speakerALabel : speakerBLabel}
                  </p>
                  <span className={`text-xs ml-4 flex-shrink-0 ${entry.speaker === 'B' ? 'text-white/70' : 'text-content-200/80 dark:text-dark-content-200/80'}`}>
                      {new Date(entry.timestamp * 1000).toISOString().substr(14, 5)}
                  </span>
              </div>
              <p className="text-sm whitespace-pre-wrap leading-relaxed break-words" dir="auto">
                  {entry.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};