
import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-16 px-4 text-center animate-fade-in">
      <h1 className="text-3xl font-bold tracking-tight text-content-100 dark:text-dark-content-100 sm:text-4xl">Contact Us</h1>
      <p className="mt-6 text-lg leading-8 text-content-200 dark:text-dark-content-200">
        We appreciate your interest in Clarity AI. If you have any questions, feedback, or inquiries, please feel
        free to get in touch.
      </p>
      
      <div className="mt-12">
        <p className="text-content-100 dark:text-dark-content-100 text-lg">
            For support or general questions, please email us at:
        </p>
        <a 
            href="mailto:support@clarityai.example.com"
            className="text-2xl font-semibold text-brand-accent dark:text-dark-brand-accent hover:underline mt-2 inline-block transition-colors"
        >
            support@clarityai.example.com
        </a>
        <p className="mt-4 text-content-200 dark:text-dark-content-200">
            We aim to respond to all inquiries within 24-48 business hours.
        </p>
      </div>
    </div>
  );
};

export default ContactPage;