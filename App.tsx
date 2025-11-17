// FIX: Removed file content markers that were causing parsing errors.
import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { analyzeAudioStream } from './services/geminiService';
import { AnalysisResult, Keyword, ConversationType } from './types';
import { parseTranscript } from './utils/parsingUtils';
import { analyzeKeywords } from './utils/keywordUtils';
import PrivacyPage from './components/pages/PrivacyPage';
import TermsPage from './components/pages/TermsPage';
import ContactPage from './components/pages/ContactPage';
import { SAMPLE_ANALYSIS_RESULT, SAMPLE_AUDIO_URL } from './utils/sampleData';
import { AnalysisAnimation } from './components/AnalysisAnimation';
import { TranscriptionProgress } from './components/TranscriptionProgress';

export type View = 'home' | 'dashboard' | 'privacy' | 'terms' | 'contact';
export type Theme = 'light' | 'dark';

// Default keywords for analysis
const DEFAULT_KEYWORDS: Keyword[] = [
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
  const [conversationType, setConversationType] = useState<ConversationType | null>(null);
  const [keywords, setKeywords] = useState<Keyword[]>(DEFAULT_KEYWORDS);
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
  
  const handleConversationTypeSelect = (type: ConversationType) => {
    setConversationType(type);
    setError(null);
  }

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setAudioUrl(URL.createObjectURL(selectedFile));
    setError(null);
    setAnalysisResult(null);
    setProgressText('');
    handleAnalyze(selectedFile);
  };
  
  const handleAddKeyword = (text: string) => {
    if (text && !keywords.some(kw => kw.text.toLowerCase() === text.toLowerCase())) {
        setKeywords([...keywords, { text }]);
    }
  };

  const handleRemoveKeyword = (text: string) => {
    setKeywords(keywords.filter(kw => kw.text.toLowerCase() !== text.toLowerCase()));
  };
  
  const handleTrySample = () => {
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    setProgressText('Loading sample analysis...');
    
    // Simulate a short delay to feel like processing is happening
    setTimeout(() => {
      setAnalysisResult(SAMPLE_ANALYSIS_RESULT);
      setAudioUrl(SAMPLE_AUDIO_URL);
      setConversationType('sales'); // The sample is a sales call
      setKeywords(DEFAULT_KEYWORDS); // Reset keywords for the sample
      setView('dashboard');
      setIsLoading(false);
    }, 1500);
  };

  const handleAnalyze = async (audioFile: File) => {
    if (!conversationType) {
        setError('Please select a conversation type before uploading a file.');
        return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const jsonText = await analyzeAudioStream(audioFile, conversationType, setProgressText);
      
      let parsedData;
      try {
        parsedData = JSON.parse(jsonText);
      } catch (e) {
        console.error("Failed to parse JSON:", e);
        console.error("Received text:", jsonText);
        throw new Error("The AI model returned an invalid analysis format. Please try again.");
      }
      
      const transcript = parseTranscript(parsedData.transcript.map((t: any) => `[${t.timestamp}] Speaker ${t.speaker}: ${t.text}`).join('\n'));
      const keywordAnalysis = analyzeKeywords(transcript, keywords);

      const result: AnalysisResult = {
        ...parsedData,
        transcript,
        keywordAnalysis,
      };

      setAnalysisResult(result);
      setView('dashboard');
    } catch (err: any)      {
      setError(err.message || 'An unknown error occurred during analysis.');
      // Don't reset conversation type on error, so user can try another file.
      setView('home'); 
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
    setConversationType(null);
    setKeywords(DEFAULT_KEYWORDS);
  }

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center p-8 animate-fade-in h-[60vh]">
          <h2 className="text-3xl font-bold mb-4">Analyzing Your Conversation...</h2>
          <p className="text-content-200 dark:text-dark-content-200 mb-12">This might take a moment. Please wait.</p>
          
          <AnalysisAnimation />
          
          <TranscriptionProgress>
            {progressText}
          </TranscriptionProgress>
        </div>
      );
    }

    switch (view) {
      case 'dashboard':
        return analysisResult && audioUrl && conversationType ? (
          <Dashboard result={analysisResult} audioUrl={audioUrl} onReset={resetApp} conversationType={conversationType} />
        ) : <LandingPage onFileSelect={handleFileSelect} onConversationTypeSelect={handleConversationTypeSelect} conversationType={conversationType} keywords={keywords} onAddKeyword={handleAddKeyword} onRemoveKeyword={handleRemoveKeyword} onTrySample={handleTrySample} disabled={isLoading} error={error} />;
      case 'privacy':
        return <PrivacyPage />;
      case 'terms':
        return <TermsPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        return (
            <LandingPage onFileSelect={handleFileSelect} onConversationTypeSelect={handleConversationTypeSelect} conversationType={conversationType} keywords={keywords} onAddKeyword={handleAddKeyword} onRemoveKeyword={handleRemoveKeyword} onTrySample={handleTrySample} disabled={isLoading} error={error} />
        );
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