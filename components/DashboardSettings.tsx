// FIX: Removed file content markers that were causing parsing errors.
import React, { useState, useRef, useEffect } from 'react';
import { SettingsIcon } from './icons/SettingsIcon';
import { DashboardLayout } from '../types';

interface DashboardSettingsProps {
  layout: DashboardLayout;
  onLayoutChange: (newLayout: DashboardLayout) => void;
}

const panelLabels: Record<keyof DashboardLayout, string> = {
  transcript: 'Transcript',
  audioPlayer: 'Audio Player',
  aiInsights: 'AI Insights',
  sentimentGraph: 'Sentiment Graph',
  coachingCard: 'Coaching Card',
  nextSteps: 'Next Steps',
  vocalDelivery: 'Vocal Delivery',
  keywordTracker: 'Keyword Tracker',
};

export const DashboardSettings: React.FC<DashboardSettingsProps> = ({ layout, onLayoutChange }) => {
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
  
  const handleToggle = (panel: keyof DashboardLayout) => {
    onLayoutChange({ ...layout, [panel]: !layout[panel] });
  };

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-md hover:bg-base-300 dark:hover:bg-dark-base-300 transition-colors"
        aria-label="Dashboard Settings"
      >
        <SettingsIcon className="w-5 h-5 text-content-200 dark:text-dark-content-200" />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-64 rounded-md shadow-lg bg-base-200 dark:bg-dark-base-200 ring-1 ring-black ring-opacity-5 focus:outline-none z-10 p-2">
          <div className="py-1">
            <p className="px-2 pb-2 text-sm font-semibold text-content-100 dark:text-dark-content-100">Visible Panels</p>
            <div className="space-y-2">
              {(Object.keys(layout) as Array<keyof DashboardLayout>).map((panel) => (
                <div key={panel} className="flex items-center justify-between px-2 py-1">
                  <label htmlFor={panel} className="text-sm text-content-200 dark:text-dark-content-200">{panelLabels[panel]}</label>
                  <button
                    type="button"
                    className={`${
                      layout[panel] ? 'bg-brand-primary dark:bg-dark-brand-primary' : 'bg-base-300 dark:bg-dark-base-300'
                    } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-brand-primary dark:focus:ring-dark-brand-primary focus:ring-offset-2 dark:focus:ring-offset-dark-base-200`}
                    role="switch"
                    aria-checked={layout[panel]}
                    onClick={() => handleToggle(panel)}
                    id={panel}
                  >
                    <span
                      aria-hidden="true"
                      className={`${
                        layout[panel] ? 'translate-x-5' : 'translate-x-0'
                      } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
