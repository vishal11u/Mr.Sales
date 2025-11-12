import React from 'react';

interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  return (
    <div className="group relative inline-flex">
      {children}
      <div
        className="absolute bottom-full left-1/2 z-20 mb-2 w-max max-w-xs -translate-x-1/2 scale-0 transform-gpu opacity-0 transition-all duration-200 ease-in-out group-hover:scale-100 group-hover:opacity-100"
      >
        <div className="rounded-md bg-content-100 dark:bg-dark-content-100 px-3 py-2 text-xs font-medium text-base-100 dark:text-dark-base-100 shadow-lg">
          {text}
        </div>
      </div>
    </div>
  );
};
