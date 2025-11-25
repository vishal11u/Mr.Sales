import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
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
  // Use lazy initialization for state that needs to persist on refresh
  // This ensures the router gets the correct state on the very first render
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return savedTheme || (systemPrefersDark ? 'dark' : 'light');
  });

  const [conversationType, setConversationType] = useState<ConversationType | null>(() => {
    return localStorage.getItem('conversationType') as ConversationType | null;
  });

  const [keywords, setKeywords] = useState<Keyword[]>(() => {
    const savedKeywords = localStorage.getItem('keywords');
    try {
        return savedKeywords ? JSON.parse(savedKeywords) : DEFAULT_KEYWORDS;
    } catch {
        return DEFAULT_KEYWORDS;
    }
  });

  const [audioLanguage, setAudioLanguage] = useState<string>(() => {
     return localStorage.getItem('audioLanguage') || 'Auto-Detect';
  });

  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(() => {
     const savedResult = localStorage.getItem('analysisResult');
     try {
         return savedResult ? JSON.parse(savedResult) : null;
     } catch {
         return null;
     }
  });

  const [file, setFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [progressText, setProgressText] = useState('');
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Save state updates to local storage
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    if (analysisResult) {
        localStorage.setItem('analysisResult', JSON.stringify(analysisResult));
    } else {
        localStorage.removeItem('analysisResult');
    }
  }, [analysisResult]);

  useEffect(() => {
     if(conversationType) localStorage.setItem('conversationType', conversationType);
  }, [conversationType]);

  useEffect(() => {
     localStorage.setItem('keywords', JSON.stringify(keywords));
  }, [keywords]);

  useEffect(() => {
     localStorage.setItem('audioLanguage', audioLanguage);
  }, [audioLanguage]);
  
  const handleConversationTypeSelect = (type: ConversationType) => {
    setConversationType(type);
    setError(null);
  }

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    const url = URL.createObjectURL(selectedFile);
    setAudioUrl(url);
    setError(null);
    setAnalysisResult(null);
    setProgressText('');
    handleAnalyze(selectedFile, url);
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
      setConversationType('sales'); 
      setKeywords(DEFAULT_KEYWORDS);
      setIsLoading(false);
      navigate('/dashboard');
    }, 1500);
  };

  const handleAnalyze = async (audioFile: File, currentAudioUrl: string) => {
    if (!conversationType) {
        setError('Please select a conversation type before uploading a file.');
        return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult(null);
    try {
      const jsonText = await analyzeAudioStream(audioFile, conversationType, audioLanguage, setProgressText);
      
      let parsedData;
      try {
        parsedData = JSON.parse(jsonText);
      } catch (e) {
        console.error("Failed to parse JSON:", e);
        console.error("Received text:", jsonText);
        throw new Error("The AI model returned an invalid analysis format. Please try again.");
      }
      
      const transcript = parseTranscript(parsedData.transcript);
      const keywordAnalysis = analyzeKeywords(transcript, keywords);

      const result: AnalysisResult = {
        ...parsedData,
        transcript,
        keywordAnalysis,
      };

      setAnalysisResult(result);
      // Ensure we navigate after setting result
      navigate('/dashboard');
    } catch (err: any)      {
      setError(err.message || 'An unknown error occurred during analysis.');
      navigate('/');
    } finally {
      setIsLoading(false);
    }
  };
  
  const resetApp = () => {
    setFile(null);
    if(audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setIsLoading(false);
    setError(null);
    setAnalysisResult(null);
    setProgressText('');
    setConversationType(null);
    setKeywords(DEFAULT_KEYWORDS);
    setAudioLanguage('Auto-Detect');
    
    // Clear storage for a fresh start
    localStorage.removeItem('analysisResult');
    localStorage.removeItem('conversationType');
    
    navigate('/');
  }

  // Loading Screen
  if (isLoading) {
      return (
        <div className="flex flex-col min-h-screen bg-base-100 dark:bg-dark-base-100 text-content-100 dark:text-dark-content-100 font-sans">
             <Header theme={theme} setTheme={setTheme} />
             <main className="flex-grow container mx-auto px-4 py-8 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-center p-8 animate-fade-in w-full max-w-4xl">
                    <h2 className="text-3xl font-bold mb-4">Analyzing Your Conversation...</h2>
                    <p className="text-content-200 dark:text-dark-content-200 mb-12">This might take a moment. Please wait.</p>
                    <AnalysisAnimation />
                    <TranscriptionProgress>
                        {progressText}
                    </TranscriptionProgress>
                </div>
             </main>
             <Footer />
        </div>
      );
  }

  return (
    <div className="flex flex-col min-h-screen bg-base-100 dark:bg-dark-base-100 text-content-100 dark:text-dark-content-100 font-sans">
      <Header theme={theme} setTheme={setTheme} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <Routes>
            <Route path="/" element={
                <LandingPage 
                    onFileSelect={handleFileSelect} 
                    onConversationTypeSelect={handleConversationTypeSelect} 
                    conversationType={conversationType} 
                    keywords={keywords} 
                    onAddKeyword={handleAddKeyword} 
                    onRemoveKeyword={handleRemoveKeyword} 
                    language={audioLanguage} 
                    onLanguageSelect={setAudioLanguage} 
                    onTrySample={handleTrySample} 
                    disabled={isLoading} 
                    error={error} 
                />
            } />
            <Route path="/dashboard" element={
                analysisResult ? (
                    <Dashboard 
                        result={analysisResult} 
                        audioUrl={audioUrl} 
                        onReset={resetApp} 
                        conversationType={conversationType || 'sales'} 
                    />
                ) : (
                    <Navigate to="/" replace />
                )
            } />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;