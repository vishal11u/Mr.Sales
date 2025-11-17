import React, { useRef, useEffect } from 'react';

interface TranscriptionProgressProps {
  children: React.ReactNode;
}

export const TranscriptionProgress: React.FC<TranscriptionProgressProps> = ({ children }) => {
  const preRef = useRef<HTMLPreElement>(null);

  useEffect(() => {
    if (preRef.current) {
      preRef.current.scrollTop = preRef.current.scrollHeight;
    }
  }, [children]);

  return (
    <pre
      ref={preRef}
      className="mt-12 font-mono text-xs text-content-200 dark:text-dark-content-200 w-full max-w-2xl text-left p-4 bg-base-200/50 dark:bg-dark-base-200/50 rounded-md h-48 overflow-y-auto whitespace-pre-wrap break-words scrollbar-thin"
    >
      {children}
    </pre>
  );
};