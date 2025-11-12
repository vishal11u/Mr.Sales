
import React, { useState } from 'react';
import { AnalysisResult } from '../types';
import { ShareNetworkIcon } from './icons/ShareNetworkIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { SpinnerIcon } from './icons/SpinnerIcon';

interface ShareButtonProps {
    result: AnalysisResult;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ result }) => {
    const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

    const handleShare = () => {
        if (status !== 'idle') return;

        setStatus('loading');
        
        // Simulate an API call to generate a shareable link
        setTimeout(() => {
            const shareableText = `Check out this sales call analysis:\nSummary: ${result.aiInsights?.summary || 'N/A'}`;
            navigator.clipboard.writeText(shareableText)
                .then(() => {
                    setStatus('success');
                })
                .catch(() => {
                    // Fallback for older browsers or if clipboard fails
                    alert('Sharing feature is for demonstration purposes. Content copied to clipboard if supported.');
                    setStatus('idle');
                });
            
            // Reset the button state after a few seconds
            setTimeout(() => setStatus('idle'), 3000);
        }, 1000);
    };

    const getButtonContent = () => {
        switch (status) {
            case 'loading':
                return <><SpinnerIcon className="animate-spin -ml-1 mr-2 h-5 w-5" /> Processing...</>;
            case 'success':
                return <><CheckCircleIcon className="-ml-1 mr-2 h-5 w-5" /> Copied!</>;
            case 'idle':
            default:
                return <><ShareNetworkIcon className="-ml-1 mr-2 h-5 w-5" /> Share</>;
        }
    };

    return (
        <button
            type="button"
            className="inline-flex items-center justify-center w-full rounded-md border border-base-300 dark:border-dark-base-300 shadow-sm px-4 py-2 bg-base-200 dark:bg-dark-base-200 text-sm font-medium text-content-100 dark:text-dark-content-100 hover:bg-base-300 dark:hover:bg-dark-base-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-base-100 dark:focus:ring-offset-dark-base-100 focus:ring-brand-primary dark:focus:ring-dark-brand-primary disabled:opacity-50"
            onClick={handleShare}
            disabled={status !== 'idle'}
        >
            {getButtonContent()}
        </button>
    );
};
