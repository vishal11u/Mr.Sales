import React from 'react';
import { CoachingCardData } from '../types';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { LightBulbIcon } from './icons/LightBulbIcon';

interface CoachingCardProps {
  data: CoachingCardData;
}

export const CoachingCard: React.FC<CoachingCardProps> = ({ data }) => {
  return (
    <div className="bg-base-200 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-content-100">AI Coaching Card</h2>
      <div className="space-y-6">
        <div>
          <h3 className="flex items-center text-lg font-semibold text-green-400 mb-2">
            <CheckCircleIcon className="w-6 h-6 mr-2" />
            Strengths
          </h3>
          <ul className="list-disc list-inside space-y-2 text-content-200 pl-2">
            {data.strengths.map((item, index) => (
              <li 
                key={`strength-${index}`}
                className="animate-fade-in-up"
                style={{ animationDelay: `${0.1 * (index + 1)}s`, opacity: 0 }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="flex items-center text-lg font-semibold text-yellow-400 mb-2">
            <LightBulbIcon className="w-6 h-6 mr-2" />
            Opportunities
          </h3>
          <ul className="list-disc list-inside space-y-2 text-content-200 pl-2">
            {data.opportunities.map((item, index) => (
              <li 
                key={`opportunity-${index}`}
                className="animate-fade-in-up"
                style={{ animationDelay: `${0.1 * (index + 1) + 0.3}s`, opacity: 0 }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};