import React from 'react';
import { ConversationType } from '../types';
import { HandshakeIcon } from './icons/HandshakeIcon';
import { TieIcon } from './icons/TieIcon';
import { HeadsetIcon } from './icons/HeadsetIcon';
import { PresentationIcon } from './icons/PresentationIcon';

interface ConversationTypeSelectorProps {
    onSelect: (type: ConversationType) => void;
}

const conversationTypes = [
    {
        type: 'sales' as ConversationType,
        icon: HandshakeIcon,
        title: 'Sales Call',
        description: 'Analyze sales pitches, objection handling, and closing techniques.'
    },
    {
        type: 'interview' as ConversationType,
        icon: TieIcon,
        title: 'Job Interview',
        description: 'Get feedback on your answers, confidence, and communication style.'
    },
    {
        type: 'support' as ConversationType,
        icon: HeadsetIcon,
        title: 'Customer Support',
        description: 'Evaluate empathy, clarity, and effectiveness in problem-solving.'
    },
    {
        type: 'presentation' as ConversationType,
        icon: PresentationIcon,
        title: 'Presentation',
        description: 'Review your public speaking, pacing, and vocal delivery.'
    }
];

export const ConversationTypeSelector: React.FC<ConversationTypeSelectorProps> = ({ onSelect }) => {
    return (
        <div className="max-w-4xl mx-auto animate-fade-in-up">
            <h2 className="text-2xl font-bold text-center mb-2 text-content-100 dark:text-dark-content-100">
                What kind of conversation are you analyzing?
            </h2>
            <p className="text-center text-content-200 dark:text-dark-content-200 mb-8">
                Select a context to get the most relevant AI-powered feedback.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {conversationTypes.map((item, index) => (
                    <button
                        key={item.type}
                        onClick={() => onSelect(item.type)}
                        className="animate-fade-in-up flex flex-col items-center text-center p-6 bg-base-200/50 dark:bg-dark-base-200/50 rounded-lg shadow-sm border border-base-300 dark:border-dark-base-300 hover:border-brand-primary dark:hover:border-dark-brand-primary hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-in-out cursor-pointer group"
                        style={{ animationDelay: `${index * 100}ms`, opacity: 0 }}
                    >
                        <item.icon className="w-12 h-12 mb-4 text-brand-primary dark:text-dark-brand-primary transition-colors group-hover:text-brand-accent dark:group-hover:text-dark-brand-accent" />
                        <h3 className="text-lg font-semibold mb-2 text-content-100 dark:text-dark-content-100">{item.title}</h3>
                        <p className="text-content-200 dark:text-dark-content-200 text-sm">
                            {item.description}
                        </p>
                    </button>
                ))}
            </div>
        </div>
    );
};