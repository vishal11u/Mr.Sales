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
    <div className="w-full max-w-2xl bg-base-200 rounded-lg p-4 shadow-inner">
      <pre
        ref={preRef}
        className="whitespace-pre-wrap font-mono text-sm text-left text-content-200 overflow-y-auto h-48 scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-base-200"
      >
        {text || 'Waiting for transcription to start...'}
      </pre>
    </div>
  );
};
