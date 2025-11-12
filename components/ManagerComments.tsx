import React from 'react';
import { Tooltip } from './Tooltip';
import { InfoIcon } from './icons/InfoIcon';

interface ManagerCommentsProps {
    comment: string;
    onCommentChange: (comment: string) => void;
}

export const ManagerComments: React.FC<ManagerCommentsProps> = ({ comment, onCommentChange }) => {
    return (
        <div className="bg-base-200 dark:bg-dark-base-200 rounded-lg shadow-lg p-6 border border-base-300 dark:border-dark-base-300">
            <div className="flex items-center space-x-2 mb-4">
                <h2 className="text-xl font-bold text-content-100 dark:text-dark-content-100">
                    Manager's Comments
                </h2>
                <Tooltip text="A space for a manager or coach to add their own notes and feedback to this analysis. These comments are included in the text export.">
                    <InfoIcon className="w-4 h-4 text-content-200 dark:text-dark-content-200" />
                </Tooltip>
            </div>
            <textarea
                value={comment}
                onChange={(e) => onCommentChange(e.target.value)}
                placeholder="Add your coaching notes here..."
                rows={4}
                className="w-full p-2 bg-base-100 dark:bg-dark-base-100 border border-base-300 dark:border-dark-base-300 rounded-md text-sm focus:ring-2 focus:ring-brand-primary dark:focus:ring-dark-brand-primary focus:outline-none transition-colors"
            />
        </div>
    );
};
