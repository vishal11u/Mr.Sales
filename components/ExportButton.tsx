import React, { useState, useRef, useEffect } from 'react';
import { AnalysisResult } from '../types';
import { exportTranscriptToCsv, exportSentimentToCsv, exportCoachingCardToText } from '../utils/exportUtils';
import { ExportIcon } from './icons/ExportIcon';

interface ExportButtonProps {
  result: AnalysisResult;
}

export const ExportButton: React.FC<ExportButtonProps> = ({ result }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleExportTranscript = () => {
    exportTranscriptToCsv(result.transcript);
    setIsOpen(false);
  };
  
  const handleExportSentiment = () => {
    exportSentimentToCsv(result.sentimentData);
    setIsOpen(false);
  };

  const handleExportCoachingCard = () => {
    exportCoachingCardToText(result.coachingCard);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <div>
        <button
          type="button"
          className="inline-flex items-center justify-center w-full rounded-md border border-base-300 shadow-sm px-4 py-2 bg-base-200 text-sm font-medium text-content-100 hover:bg-base-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-100 focus:ring-brand-primary"
          onClick={() => setIsOpen(!isOpen)}
          aria-haspopup="true"
          aria-expanded={isOpen}
        >
          <ExportIcon className="-ml-1 mr-2 h-5 w-5" />
          Export
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-base-300 ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
        >
          <div className="py-1" role="none">
            <button
              onClick={handleExportTranscript}
              className="text-content-200 block w-full text-left px-4 py-2 text-sm hover:bg-base-200 hover:text-content-100"
              role="menuitem"
            >
              Transcript (CSV)
            </button>
            <button
              onClick={handleExportSentiment}
              className="text-content-200 block w-full text-left px-4 py-2 text-sm hover:bg-base-200 hover:text-content-100"
              role="menuitem"
            >
              Sentiment Data (CSV)
            </button>
            <button
              onClick={handleExportCoachingCard}
              className="text-content-200 block w-full text-left px-4 py-2 text-sm hover:bg-base-200 hover:text-content-100"
              role="menuitem"
            >
              Coaching Summary (TXT)
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
