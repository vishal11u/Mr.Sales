import React from 'react';
import { FileUpload } from './FileUpload';
import { ConversationTypeSelector } from './ConversationTypeSelector';
import { LightBulbIcon } from './icons/LightBulbIcon';
import { TranscriptIcon } from './icons/TranscriptIcon';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { SpeedometerIcon } from './icons/SpeedometerIcon';
import { TagIcon } from './icons/TagIcon';
import { ChecklistIcon } from './icons/ChecklistIcon';
import { WandIcon } from './icons/WandIcon';
import { ExportIcon } from './icons/ExportIcon';
import { HowItWorks } from './HowItWorks';
import { KeywordGlossary } from './KeywordGlossary';
import { ConversationType, Keyword } from '../types';
import { KeywordInput } from './KeywordInput';
import { LanguageSelector } from './LanguageSelector';
import { UserCheckIcon } from './icons/UserCheckIcon';
import { QuoteIcon } from './icons/QuoteIcon';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { HandshakeIcon } from './icons/HandshakeIcon';
import { TieIcon } from './icons/TieIcon';
import { HeadsetIcon } from './icons/HeadsetIcon';
import { PresentationIcon } from './icons/PresentationIcon';

interface LandingPageProps {
  onFileSelect: (file: File) => void;
  onConversationTypeSelect: (type: ConversationType) => void;
  conversationType: ConversationType | null;
  keywords: Keyword[];
  onAddKeyword: (text: string) => void;
  onRemoveKeyword: (text: string) => void;
  language: string;
  onLanguageSelect: (lang: string) => void;
  onTrySample: () => void;
  disabled: boolean;
  error: string | null;
}

const features = [
    {
      icon: LightBulbIcon,
      title: 'AI Coaching Card',
      description: 'Receive personalized strengths and opportunities for improvement based on your call performance.'
    },
    {
      icon: TranscriptIcon,
      title: 'Full Call Transcript',
      description: 'Get a complete, time-stamped, and speaker-diarized transcript of the entire conversation.'
    },
    {
      icon: ChartBarIcon,
      title: 'Sentiment Analysis',
      description: 'Visualize the emotional tone of both the salesperson and customer throughout the call.'
    },
    {
      icon: SpeedometerIcon,
      title: 'Vocal Delivery Metrics',
      description: 'Analyze your pace, clarity, tone, and usage of filler words to enhance your communication style.'
    },
    {
      icon: TagIcon,
      title: 'Custom Keyword Tracking',
      description: 'Monitor how often key terms related to pricing, features, and competitors are mentioned.'
    },
    {
      icon: ChecklistIcon,
      title: 'Actionable Next Steps',
      description: 'Obtain a clear, concise list of actions to take to improve and move the deal forward.'
    },
    {
      icon: WandIcon,
      title: 'AI-Generated Insights',
      description: 'A high-level summary, key discussion points, and even a role-play scenario for practice.'
    },
    {
      icon: ExportIcon,
      title: 'Export & Share',
      description: 'Easily export the full analysis for reports, or share insights with your manager or team.'
    },
];

const testimonials = [
    {
        name: "Sarah Jenkins",
        role: "Sales Director, TechFlow",
        quote: "Clarity AI completely transformed how we do call reviews. My team gets instant feedback, and our closing rates have improved by 20% in just two months."
    },
    {
        name: "Michael Chen",
        role: "Job Seeker",
        quote: "I used this to practice for my product management interviews. The feedback on my pacing and 'filler words' was eye-opening. I landed the job!"
    },
    {
        name: "Elena Rodriguez",
        role: "Customer Support Lead",
        quote: "It's like having a dedicated QA coach for every single agent. We've seen a massive boost in empathy scores and faster resolution times."
    }
];

const faqs = [
    {
        question: "Is my audio data secure?",
        answer: "Absolutely. We prioritize your privacy. Your audio files are processed in-memory and are never stored on our servers. Once the analysis is complete and you close the session, the data is gone."
    },
    {
        question: "What languages do you support?",
        answer: "We support over 15 languages including English, Hindi, Spanish, French, and Mandarin. You can let the AI auto-detect the language or select it manually."
    },
    {
        question: "Can I customize the analysis?",
        answer: "Yes! You can add custom keywords to track specific terms relevant to your business, like competitor names or product features."
    }
];

const Accordion: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = React.useState(false);
    return (
        <div className="border-b border-base-300 dark:border-dark-base-300">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center py-4 text-left font-medium text-lg text-content-100 dark:text-dark-content-100 focus:outline-none"
            >
                <span>{title}</span>
                <ChevronDownIcon className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96 opacity-100 pb-4' : 'max-h-0 opacity-0'}`}>
                <p className="text-content-200 dark:text-dark-content-200">{children}</p>
            </div>
        </div>
    )
}


export const LandingPage: React.FC<LandingPageProps> = ({ onFileSelect, onConversationTypeSelect, conversationType, keywords, onAddKeyword, onRemoveKeyword, language, onLanguageSelect, onTrySample, disabled, error }) => {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="text-center py-10 lg:py-20">
        <h1
          className="text-4xl md:text-6xl font-extrabold tracking-tight text-content-100 dark:text-dark-content-100 leading-tight"
        >
          Analyze & Improve Your Conversations with
          <span className="text-brand-primary dark:text-dark-brand-primary ml-3">AI</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-content-200 dark:text-dark-content-200">
          Unlock the power of your voice. Get instant, data-driven feedback on your sales calls, interviews, and presentations to communicate with confidence.
        </p>

        {/* Main Action Area */}
        <div className="mt-12">
          {!conversationType ? (
            <div>
              <ConversationTypeSelector onSelect={onConversationTypeSelect} />
            </div>
          ) : (
            <div className="max-w-3xl mx-auto space-y-8 bg-base-200 dark:bg-dark-base-200 p-8 rounded-2xl shadow-xl border border-base-300 dark:border-dark-base-300">
                <div className="text-left mb-6">
                    <button 
                        onClick={() => onConversationTypeSelect(null as any)}
                        className="text-sm text-brand-primary dark:text-dark-brand-primary hover:underline"
                    >
                        ← Back to Context Selection
                    </button>
                    <h2 className="text-2xl font-bold mt-2 capitalize">{conversationType} Analysis Setup</h2>
                </div>

                <div className="animate-fade-in space-y-6">
                    <KeywordInput 
                        keywords={keywords}
                        onAddKeyword={onAddKeyword}
                        onRemoveKeyword={onRemoveKeyword}
                    />
                    <LanguageSelector 
                        selectedLanguage={language} 
                        onSelect={onLanguageSelect} 
                        disabled={disabled}
                   />
                   <div className="border-t border-base-300 dark:border-dark-base-300 my-6 pt-6">
                        <p className="text-sm font-semibold mb-4 text-center">Ready to analyze?</p>
                        <FileUpload onFileSelect={onFileSelect} disabled={disabled} />
                   </div>
                </div>
            </div>
          )}

          {error && (
              <div className="mt-6 text-red-500 bg-red-500/10 p-4 rounded-md max-w-lg mx-auto border border-red-500/20">
                  <strong>Analysis Failed:</strong> {error}
              </div>
          )}

           {!conversationType && (
               <div className="mt-12">
                    <span className="text-sm text-content-200/80 dark:text-dark-content-200/80">Don't have a recording handy?</span>
                    <button
                        onClick={onTrySample}
                        disabled={disabled}
                        className="ml-2 text-sm font-semibold text-brand-primary dark:text-dark-brand-primary hover:underline focus:outline-none focus:ring-2 focus:ring-brand-accent rounded-sm disabled:opacity-50"
                    >
                        See a Sample Analysis
                    </button>
                </div>
           )}
        </div>
      </div>
      
      <HowItWorks />

      {/* Use Cases Section */}
      <div className="mt-24 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Who is Clarity AI For?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-base-200/50 dark:bg-dark-base-200/50 p-6 rounded-xl border border-base-300 dark:border-dark-base-300">
                <HandshakeIcon className="w-10 h-10 mb-4 text-emerald-500" />
                <h3 className="text-xl font-bold mb-2">Sales Professionals</h3>
                <p className="text-sm text-content-200 dark:text-dark-content-200">Refine your pitch, handle objections better, and close more deals by analyzing your customer interactions.</p>
            </div>
            <div className="bg-base-200/50 dark:bg-dark-base-200/50 p-6 rounded-xl border border-base-300 dark:border-dark-base-300">
                <TieIcon className="w-10 h-10 mb-4 text-blue-500" />
                <h3 className="text-xl font-bold mb-2">Job Seekers</h3>
                <p className="text-sm text-content-200 dark:text-dark-content-200">Practice your interview answers, get feedback on your tone, and walk into your next interview with confidence.</p>
            </div>
             <div className="bg-base-200/50 dark:bg-dark-base-200/50 p-6 rounded-xl border border-base-300 dark:border-dark-base-300">
                <HeadsetIcon className="w-10 h-10 mb-4 text-purple-500" />
                <h3 className="text-xl font-bold mb-2">Support Agents</h3>
                <p className="text-sm text-content-200 dark:text-dark-content-200">Improve customer satisfaction scores by monitoring empathy, clarity, and resolution effectiveness.</p>
            </div>
            <div className="bg-base-200/50 dark:bg-dark-base-200/50 p-6 rounded-xl border border-base-300 dark:border-dark-base-300">
                <PresentationIcon className="w-10 h-10 mb-4 text-orange-500" />
                <h3 className="text-xl font-bold mb-2">Public Speakers</h3>
                <p className="text-sm text-content-200 dark:text-dark-content-200">Master your delivery, reduce filler words, and keep your audience engaged from start to finish.</p>
            </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mt-24 max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-6 bg-base-200 dark:bg-dark-base-200 rounded-lg shadow-sm border border-transparent hover:border-brand-primary/30 dark:hover:border-dark-brand-primary/30 transition-all duration-300"
            >
              <feature.icon className="w-12 h-12 mb-4 text-brand-accent dark:text-dark-brand-accent" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-content-200 dark:text-dark-content-200 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <KeywordGlossary />

      {/* Testimonials */}
      <div className="mt-24 bg-base-200/30 dark:bg-dark-base-200/30 py-16 rounded-3xl">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">What Users Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((t, i) => (
                    <div key={i} className="bg-base-100 dark:bg-dark-base-100 p-8 rounded-xl shadow-sm relative">
                        <QuoteIcon className="w-8 h-8 text-brand-primary/20 dark:text-dark-brand-primary/20 absolute top-6 left-6" />
                        <p className="relative z-10 text-content-200 dark:text-dark-content-200 italic mb-6 pt-4">"{t.quote}"</p>
                        <div>
                            <p className="font-bold text-content-100 dark:text-dark-content-100">{t.name}</p>
                            <p className="text-sm text-brand-primary dark:text-dark-brand-primary">{t.role}</p>
                        </div>
                    </div>
                ))}
            </div>
          </div>
      </div>

      {/* FAQ */}
      <div className="mt-24 max-w-3xl mx-auto px-4 pb-20">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
              {faqs.map((faq, i) => (
                  <Accordion key={i} title={faq.question}>
                      {faq.answer}
                  </Accordion>
              ))}
          </div>
      </div>

    </div>
  );
};