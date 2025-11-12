
import React from 'react';
import { TranscriptEntry } from '../types';

interface TranscriptDisplayProps {
  transcript: TranscriptEntry[];
}

export const TranscriptDisplay: React.FC<TranscriptDisplayProps> = ({ transcript }) => {
  return (
    <div className="bg-base-200 rounded-lg shadow-lg p-6 h-full flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-content-100">Call Transcript</h2>
      <div className="flex-grow overflow-y-auto pr-2 space-y-4">
        {transcript.map((entry, index) => (
          <div key={index} className={`flex flex-col ${entry.speaker === 'B' ? 'items-end' : 'items-start'}`}>
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-lg ${
                entry.speaker === 'B'
                  ? 'bg-brand-primary text-white rounded-br-none'
                  : 'bg-base-300 text-content-100 rounded-bl-none'
              }`}
            >
              <p className="text-sm font-bold mb-1">
                {entry.speaker === 'A' ? 'Customer' : 'Salesperson'}
              </p>
              <p className="text-sm">{entry.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
