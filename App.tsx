// FIX: Removed file content markers that were causing parsing errors.
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { TranscriptionProgress } from './components/TranscriptionProgress';
import { analyzeAudioStream } from './services/geminiService';
import { AnalysisResult, Keyword } from './types';
import { parseTranscript } from './utils/parsingUtils';
import { analyzeKeywords } from './utils/keywordUtils';
import PrivacyPage from './components/pages/PrivacyPage';
import TermsPage from './components/pages/TermsPage';
import ContactPage from './components/pages/ContactPage';

export type View = 'home' | 'dashboard' | 'privacy' | 'terms' | 'contact';
export type Theme = 'light' | 'dark';

// Pre-defined keywords for analysis
const KEYWORDS: Keyword[] = [
    { text: 'pricing' },
    { text: 'discount' },
    { text: 'contract' },
    { text: 'feature' },
    { text: 'competitor' },
    { text: 'timeline' },
    { text: 'budget' },
];

function App() {
  const [view, setView] = useState<View>('home');
  const [theme, setTheme] = useState<Theme>('dark');
  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    // Apply theme from localStorage or system preference on initial load
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (systemPrefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setAudioUrl(URL.createObjectURL(selectedFile));
    setError(null);
    setAnalysisResult(null);
    setProgressText('');
    handleAnalyze(selectedFile);
  };

  const handleAnalyze = async (audioFile: File) => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const jsonText = await analyzeAudioStream(audioFile, setProgressText);
      
      let parsedData;
      try {
        parsedData = JSON.parse(jsonText);
      } catch (e) {
        console.error("Failed to parse JSON:", e);
        console.error("Received text:", jsonText);
        throw new Error("The AI model returned an invalid analysis format. Please try again.");
      }
      
      const transcript = parseTranscript(parsedData.transcript.map((t: any) => `[${t.timestamp}] Speaker ${t.speaker}: ${t.text}`).join('\n'));
      const keywordAnalysis = analyzeKeywords(transcript, KEYWORDS);

      const result: AnalysisResult = {
        ...parsedData,
        transcript,
        keywordAnalysis,
      };

      setAnalysisResult(result);
      setView('dashboard');
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred during analysis.');
      setView('home'); // Go back to home on error
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetApp = () => {
    setView('home');
    setFile(null);
    if(audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl('');
    setIsLoading(false);
    setError(null);
    setAnalysisResult(null);
    setProgressText('');
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8 animate-fade-in">
          <h2 className="text-2xl font-bold mb-4">Analyzing Your Sales Call...</h2>
          <p className="text-content-200 dark:text-dark-content-200 mb-6">This might take a moment. Please wait.</p>
          <div className="w-full max-w-2xl">
            <div className="relative pt-1">
              <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-brand-primary/20">
                <div style={{ width: '100%' }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-brand-primary animate-pulse"></div>
              </div>
            </div>
            <TranscriptionProgress text={progressText} />
          </div>
        </div>
      );
    }

    switch (view) {
      case 'dashboard':
        return analysisResult && audioUrl ? (
          <Dashboard result={analysisResult} audioUrl={audioUrl} />
        ) : <LandingPage onFileSelect={handleFileSelect} disabled={isLoading} error={error} />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return <LandingPage onFileSelect={handleFileSelect} disabled={isLoading} error={error} />;
    }
  }

  return (
    <div className="flex flex-col min-h-screen bg-base-100 dark:bg-dark-base-100 text-content-100 dark:text-dark-content-100 font-sans">
      <Header onHomeClick={resetApp} onNavClick={setView} theme={theme} setTheme={setTheme} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <Footer onNavClick={setView} />
    </div>
  );
}

export default App;