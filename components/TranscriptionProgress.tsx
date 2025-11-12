
import React, { useEffect, useRef } from 'react';

interface TranscriptionProgressProps {
  text: string;
}

export const TranscriptionProgress: React.FC<TranscriptionProgressProps> = ({ text }) => {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    // Auto-scroll to the bottom as new text comes in
    if (preRef.current) {
      preRef.current.scrollTop = preRef.current.scrollHeight;
    }
  }, [text]);

  return (
    <div className="w-full max-w-2xl bg-base-200 dark:bg-dark-base-200 rounded-lg p-4 shadow-inner border border-base-300 dark:border-dark-base-300">
      <pre
        ref={preRef}
        className="whitespace-pre-wrap font-mono text-sm text-left text-content-200 dark:text-dark-content-200 overflow-y-auto h-48 scrollbar-thin"
      >
        {text || 'Waiting for transcription to start...'}
      </pre>
    </div>
  );
};
