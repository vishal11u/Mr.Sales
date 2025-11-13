import React from 'react';
import { Step1Icon } from './icons/Step1Icon';
import { Step2Icon } from './icons/Step2Icon';
import { Step3Icon } from './icons/Step3Icon';

const howItWorksSteps = [
    {
        icon: Step1Icon,
        title: 'Upload Your Audio',
        description: 'Click the upload area or drag and drop an audio file (MP3, WAV, etc.) of your sales call.'
    },
    {
        icon: Step2Icon,
        title: 'AI Analysis in Seconds',
        description: 'Our advanced AI processes the audio, transcribing the conversation and analyzing key metrics in real-time.'
    },
    {
        icon: Step3Icon,
        title: 'Receive Your Dashboard',
        description: 'Get a comprehensive dashboard with actionable insights, coaching tips, and a full performance breakdown.'
    }
];

export const HowItWorks: React.FC = () => {
    return (
        <div className="mt-20 max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-16">How It Works</h2>
            
            <div className="flex flex-col lg:flex-row justify-center items-center">
                {howItWorksSteps.map((step, index) => (
                    <React.Fragment key={index}>
                        {/* Step Card */}
                        <div 
                            className="group flex flex-col items-center text-center max-w-xs p-4 animate-fade-in-up transform transition-transform duration-300 hover:scale-105"
                            style={{ animationDelay: `${index * 150}ms`, opacity: 0 }}
                        >
                            <div className="relative mb-6">
                                {/* Number Badge */}
                                <div className="absolute -top-2 -right-2 w-8 h-8 flex items-center justify-center bg-brand-accent text-white dark:text-dark-base-100 rounded-full font-bold text-sm z-10 shadow-lg border-2 border-base-200 dark:border-dark-base-200">
                                    {index + 1}
                                </div>
                                {/* Icon Container */}
                                <div className="w-24 h-24 flex items-center justify-center bg-brand-primary/10 dark:bg-dark-brand-primary/10 rounded-full p-1 transition-transform duration-300 group-hover:rotate-6">
                                    <div className="w-full h-full flex items-center justify-center bg-base-200 dark:bg-dark-base-200 rounded-full">
                                         <step.icon className="w-10 h-10 text-brand-primary dark:text-dark-brand-primary" />
                                    </div>
                                </div>
                            </div>
                            <h3 className="text-xl font-bold text-content-100 dark:text-dark-content-100 mb-2">{step.title}</h3>
                            <p className="text-content-200 dark:text-dark-content-200 text-sm leading-relaxed">{step.description}</p>
                        </div>

                        {/* Connector */}
                        {index < howItWorksSteps.length - 1 && (
                            <>
                                {/* Desktop Horizontal Connector */}
                                <div className="hidden lg:block flex-grow h-1 max-w-24 mx-4 border-t-2 border-dashed border-base-300 dark:border-dark-base-300"></div>
                                {/* Mobile Vertical Connector */}
                                <div className="lg:hidden h-12 w-1 my-4 border-l-2 border-dashed border-base-300 dark:border-dark-base-300"></div>
                            </>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};
