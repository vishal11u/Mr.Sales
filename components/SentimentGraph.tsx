import React from 'react';
import { SentimentDataPoint } from '../types';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { Tooltip } from './Tooltip';
import { InfoIcon } from './icons/InfoIcon';

interface SentimentGraphProps {
  data: SentimentDataPoint[];
  currentTime: number;
  duration: number;
}

export const SentimentGraph: React.FC<SentimentGraphProps> = ({ data, currentTime, duration }) => {
  if (!data || data.length < 2) {
    return (
      <div className="bg-base-200 dark:bg-dark-base-200 rounded-lg shadow-lg p-6 border border-base-300 dark:border-dark-base-300">
        <h2 className="text-xl font-bold mb-4">Sentiment Analysis</h2>
        <p className="text-content-200 dark:text-dark-content-200">Not enough data to display sentiment graph.</p>
      </div>
    );
  }

  const width = 800;
  const height = 250;
  const padding = 40;

  const maxTime = duration > 0 ? duration : Math.max(...data.map(d => d.timestamp));
  const scaleX = (t: number) => (t / maxTime) * (width - padding * 2) + padding;
  const scaleY = (s: number) => (height - padding * 2) * (1 - (s + 1) / 2) + padding;

  const customerPath = data.map(d => `${scaleX(d.timestamp)},${scaleY(d.customerSentiment)}`).join(' L');
  const salespersonPath = data.map(d => `${scaleX(d.timestamp)},${scaleY(d.salespersonSentiment)}`).join(' L');

  const progress = maxTime > 0 ? (currentTime / maxTime) * (width - padding * 2) : 0;

  return (
    <div className="bg-base-200 dark:bg-dark-base-200 rounded-lg shadow-lg p-6 border border-base-300 dark:border-dark-base-300">
      <div className="flex items-center space-x-2 mb-4">
        <h2 className="flex items-center text-xl font-bold text-content-100 dark:text-dark-content-100">
          <ChartBarIcon className="w-6 h-6 mr-3" />
          <span>Sentiment Over Time</span>
        </h2>
        <Tooltip text="Visualizes the emotional tone of the conversation. Positive scores indicate positive language, negative scores indicate negative language.">
          <InfoIcon className="w-4 h-4 text-content-200 dark:text-dark-content-200" />
        </Tooltip>
      </div>
      <div className="relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="w-full">
          {/* Grid lines */}
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke="var(--color-base-300)" />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke="var(--color-base-300)" />
          <line x1={padding} y1={height/2} x2={width - padding} y2={height/2} stroke="var(--color-base-300)" strokeDasharray="4"/>
          <line x1={padding} y1={padding} x2={width-padding} y2={padding} stroke="var(--color-base-300)" strokeDasharray="4"/>
          
          {/* Y-axis labels */}
          <text x={padding - 10} y={padding + 5} textAnchor="end" fill="var(--color-content-200)" fontSize="10">Positive</text>
          <text x={padding - 10} y={height/2 + 5} textAnchor="end" fill="var(--color-content-200)" fontSize="10">Neutral</text>
          <text x={padding - 10} y={height-padding + 5} textAnchor="end" fill="var(--color-content-200)" fontSize="10">Negative</text>
          
          {/* Data paths */}
          <path d={`M ${customerPath}`} stroke="#10b981" fill="none" strokeWidth="2" />
          <path d={`M ${salespersonPath}`} stroke="#3b82f6" fill="none" strokeWidth="2" />

          {/* Progress Indicator */}
          <line x1={padding + progress} y1={padding} x2={padding + progress} y2={height - padding} stroke="var(--color-brand-accent)" strokeWidth="1.5" />
        </svg>
      </div>
      <div className="flex justify-end space-x-4 mt-2 text-xs">
          <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>
              <span>Customer</span>
          </div>
          <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
              <span>Salesperson</span>
          </div>
      </div>
    </div>
  );
};
