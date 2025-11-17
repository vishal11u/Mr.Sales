import React from 'react';

export const AnalysisAnimation: React.FC = () => {
  return (
    <div className="flex justify-center items-end space-x-2 h-24">
      {Array.from({ length: 7 }).map((_, i) => (
        <div
          key={i}
          className="w-3 h-full bg-brand-primary dark:bg-dark-brand-primary animate-equalizer"
          style={{
            animationDelay: `${i * 120}ms`,
            animationDuration: '1.2s',
          }}
        />
      ))}
    </div>
  );
};
