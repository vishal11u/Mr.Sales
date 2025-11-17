import React from 'react';
import { DatabaseIcon } from '../icons/DatabaseIcon';
import { CogIcon } from '../icons/CogIcon';
import { CloudIcon } from '../icons/CloudIcon';
import { ShieldCheckIcon } from '../icons/ShieldCheckIcon';
import { UserCheckIcon } from '../icons/UserCheckIcon';
import { InfoIcon } from '../icons/InfoIcon';

interface Section {
  id: string;
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  summary: string;
  content: React.ReactNode;
}

const sections: Section[] = [
  {
    id: 'processing',
    title: 'Information We Process',
    icon: DatabaseIcon,
    summary: 'We don\'t store your audio or its analysis. We only process it temporarily to provide the service during your session.',
    content: (
      <ul className="list-disc list-inside space-y-2">
        <li>
          <strong>Audio Files ("User Content"):</strong> When you upload an audio file, it is sent directly to a third-party AI
          service for processing. The file is held in memory during the analysis and is not saved to our servers'
          hard drives.
        </li>
        <li>
          <strong>Analysis Data:</strong> The transcript, sentiment data, and coaching feedback generated from your audio file are
          created in real-time and sent directly to your browser. This data exists only within your active session and is
          not stored in our database.
        </li>
        <li>
          <strong>Anonymous Usage Data:</strong> We may collect anonymous, aggregated data about service usage (e.g., number of
          analyses performed) to help us improve our service. This data cannot be linked back to any
          individual user or specific audio file.
        </li>
      </ul>
    ),
  },
  {
    id: 'usage',
    title: 'How We Use Information',
    icon: CogIcon,
    summary: 'We use the data you provide only to generate the analysis and send it back to you. Anonymized data helps us improve the app.',
    content: (
        <ul className="list-disc list-inside space-y-2">
            <li>To provide the core functionality of the Service: transcribing, analyzing sentiment, and generating coaching feedback from your audio file.</li>
            <li>To deliver the generated analysis to you within your browser session.</li>
            <li>To monitor and improve the performance, security, and reliability of our Service through anonymized data.</li>
        </ul>
    ),
  },
  {
    id: 'third-party',
    title: 'Third-Party Processing',
    icon: CloudIcon,
    summary: 'We use Google\'s Gemini API to power our analysis. Your audio is sent to them for processing under their robust privacy policies.',
    content: (
        <p>
            Our service is built upon Google's Gemini API. When you upload an audio file, it is securely transmitted to
            Google's services for processing. We do not control how Google handles the data on their end during processing,
            but we rely on their robust security and privacy commitments. We recommend you review <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand-accent dark:text-dark-brand-accent hover:underline">Google's Privacy Policy</a> for more information.
        </p>
    ),
  },
  {
    id: 'security',
    title: 'Data Security',
    icon: ShieldCheckIcon,
    summary: 'We encrypt all data in transit. By not storing your files, we minimize security risks by design.',
    content: (
      <p>
        We take data security seriously. All data transmitted between your browser, our servers, and our third-party AI
        provider is encrypted in transit using industry-standard TLS (Transport Layer Security). By not storing your files
        or analysis results, we significantly minimize security risks.
      </p>
    ),
  },
  {
    id: 'rights',
    title: 'Your Rights & Choices',
    icon: UserCheckIcon,
    summary: 'Since we don\'t store your data, your main right is to choose whether to use the service. Closing the page erases the session data.',
    content: (
      <p>
        Since we do not store your personal data or uploaded content, traditional data rights (like the right to access,
        correct, or delete data) are not applicable in the same way. The data you provide is processed ephemerally. Your
        primary right is to choose whether or not to use our Service. You can clear any data held in your browser by
        simply closing the session or starting a new analysis.
      </p>
    ),
  },
  {
    id: 'policy-changes',
    title: 'Policy Changes',
    icon: InfoIcon,
    summary: 'We may update this policy. We will post any changes on this page.',
     content: (
      <p>
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy
        Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
      </p>
    ),
  }
];

const SectionCard: React.FC<{ section: Section }> = ({ section }) => (
  <div id={section.id} className="bg-base-200 dark:bg-dark-base-200 p-6 rounded-lg shadow-md border border-base-300 dark:border-dark-base-300">
    <div className="flex items-start gap-4">
      <section.icon className="w-8 h-8 text-brand-primary dark:text-dark-brand-primary flex-shrink-0 mt-1" />
      <div>
        <h2 className="text-xl font-bold text-content-100 dark:text-dark-content-100">{section.title}</h2>
        <p className="mt-2 text-sm italic p-3 bg-base-100 dark:bg-dark-base-100 rounded-md border-l-4 border-brand-accent dark:border-dark-brand-accent">
          <strong>In Plain English:</strong> {section.summary}
        </p>
        <div className="mt-4 text-content-200 dark:text-dark-content-200 text-sm leading-relaxed space-y-2">
          {section.content}
        </div>
      </div>
    </div>
  </div>
);

const PrivacyPage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto py-8 px-4 animate-fade-in">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-extrabold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-content-200 dark:text-dark-content-200">Last updated: {new Date().toLocaleDateString()}</p>
        <p className="mt-4 max-w-3xl mx-auto text-lg">
            Our core privacy principle is simple: we do not store your audio files or the analysis generated from them. Your data is processed ephemerally and is gone when your session ends.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        {/* Main Content */}
        <div className="lg:w-2/3 space-y-8">
          {sections.map(section => (
            <SectionCard key={section.id} section={section} />
          ))}
        </div>

        {/* Sticky Navigation */}
        <aside className="lg:w-1/3">
          <div className="sticky top-24">
            <h3 className="text-lg font-semibold mb-4 border-b border-base-300 dark:border-dark-base-300 pb-2">On this page</h3>
            <ul className="space-y-2">
              {sections.map(section => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="flex items-center gap-3 text-sm text-content-200 dark:text-dark-content-200 hover:text-brand-primary dark:hover:text-dark-brand-primary font-medium transition-colors"
                  >
                     <section.icon className="w-4 h-4 flex-shrink-0" />
                    <span>{section.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default PrivacyPage;