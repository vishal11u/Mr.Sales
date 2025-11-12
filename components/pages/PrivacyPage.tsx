import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="prose prose-invert max-w-4xl mx-auto py-8 px-4 animate-fade-in">
      <h1>Privacy Policy</h1>
      <p>Last updated: {new Date().toLocaleDateString()}</p>

      <h2>Introduction</h2>
      <p>
        Welcome to Sales Coach AI ("we", "us", "our"). We are committed to protecting your privacy. This Privacy Policy
        outlines how we handle your information when you use our Service. Our core privacy principle is simple: we do not
        store your audio files or the analysis generated from them.
      </p>

      <h2>1. Information We Process</h2>
      <p>
        To provide our service, we must temporarily process the data you provide. We do not "collect" or "store" this
        information in the traditional sense.
      </p>
      <ul>
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
          analyses performed, feature interaction) to help us improve our service. This data cannot be linked back to any
          individual user or specific audio file.
        </li>
      </ul>

      <h2>2. How We Use Your Information</h2>
      <p>
        The information we process is used exclusively for the following purposes:
      </p>
      <ul>
        <li>To provide the core functionality of the Service: transcribing, analyzing sentiment, and generating coaching feedback from your audio file.</li>
        <li>To deliver the generated analysis to you within your browser session.</li>
        <li>To monitor and improve the performance, security, and reliability of our Service through anonymized data.</li>
      </ul>
      
      <h2>3. Third-Party Data Processing</h2>
      <p>
        Our service is built upon Google's Gemini API. When you upload an audio file, it is securely transmitted to
        Google's services for processing. We do not control how Google handles the data on their end during processing,
        but we rely on their robust security and privacy commitments. We recommend you review <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a> for more information.
      </p>

      <h2>4. Data Security</h2>
      <p>
        We take data security seriously. All data transmitted between your browser, our servers, and our third-party AI
        provider is encrypted in transit using industry-standard TLS (Transport Layer Security). By not storing your files
        or analysis results, we significantly minimize security risks.
      </p>
      
      <h2>5. Your Rights and Choices</h2>
      <p>
        Since we do not store your personal data or uploaded content, traditional data rights (like the right to access,
        correct, or delete data) are not applicable in the same way. The data you provide is processed ephemerally. Your
        primary right is to choose whether or not to use our Service. You can clear any data held in your browser by
        simply closing the session or starting a new analysis.
      </p>

      <h2>6. Children's Privacy</h2>
      <p>
        Our Service is not intended for use by individuals under the age of 18. We do not knowingly process any data
        from children.
      </p>

      <h2>7. Changes to This Policy</h2>
      <p>
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy
        Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
      </p>
    </div>
  );
};

export default PrivacyPage;