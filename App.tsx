import React, { useState, useCallback, useEffect } from 'react';
import { FileUpload } from './components/FileUpload';
import { Dashboard } from './components/Dashboard';
import { LandingPage } from './components/LandingPage';
import { TranscriptionProgress } from './components/TranscriptionProgress';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { transcribeAudioStream, analyzeSentiment, generateCoachingCard } from './services/geminiService';
import { parseTranscript } from './utils/parsingUtils';
import { AnalysisResult } from './types';
import TermsPage from './components/pages/TermsPage';
import PrivacyPage from './components/pages/PrivacyPage';
import ContactPage from './components/pages/ContactPage';

export type View = 'home' | 'terms' | 'privacy' | 'contact';

function App() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentStatus, setCurrentStatus] = useState('');
  const [transcriptionProgress, setTranscriptionProgress] = useState('');
  const [view, setView] = useState<View>('home');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const resetState = useCallback(() => {
    setAnalysisResult(null);
    setIsLoading(false);
    setError(null);
    setCurrentStatus('');
    setTranscriptionProgress('');
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
      setAudioUrl(null);
    }
  }, [audioUrl]);

  useEffect(() => {
    // Cleanup object URL on component unmount
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  const handleHomeClick = useCallback(() => {
    setView('home');
    resetState();
  }, [resetState]);

  const handleNavClick = (newView: View) => {
    setView(newView);
  };

  const handleFileSelect = useCallback(async (file: File) => {
    resetState();
    setIsLoading(true);

    const newAudioUrl = URL.createObjectURL(file);
    setAudioUrl(newAudioUrl);

    try {
      setCurrentStatus('Transcribing audio...');
      const fullTranscriptText = await transcribeAudioStream(file, (chunk) => {
        setTranscriptionProgress((prev) => prev + chunk);
      });

      const parsedTranscript = parseTranscript(fullTranscriptText);
      if (parsedTranscript.length === 0) {
        throw new Error("Transcription failed or returned no content. Please check the audio file.");
      }

      setCurrentStatus('Analyzing sentiment and generating coaching feedback...');
      const [sentimentData, coachingCard] = await Promise.all([
        analyzeSentiment(parsedTranscript),
        generateCoachingCard(parsedTranscript),
      ]);
      
      const result: AnalysisResult = {
        transcript: parsedTranscript,
        sentimentData,
        coachingCard,
      };

      setAnalysisResult(result);
    } catch (err: any) {
      console.error("An error occurred during analysis:", err);
      setError(err.message || 'An unexpected error occurred. Please try again.');
    } finally {
      setIsLoading(false);
      setCurrentStatus('');
    }
  }, [resetState]);

  const renderContent = () => {
    switch (view) {
      case 'terms':
        return <TermsPage />;
      case 'privacy':
        return <PrivacyPage />;
      case 'contact':
        return <ContactPage />;
      case 'home':
      default:
        if (isLoading) {
          return (
            <div className="flex flex-col items-center justify-center space-y-4">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-primary"></div>
              <p className="text-lg font-semibold">{currentStatus}</p>
              {currentStatus.includes('Transcribing') && <TranscriptionProgress text={transcriptionProgress} />}
            </div>
          );
        }
        if (error) {
          return (
            <div className="text-center p-8 bg-red-500/10 border border-red-500 rounded-lg">
              <h3 className="text-xl font-bold text-red-400 mb-2">Analysis Failed</h3>
              <p>{error}</p>
              <button
                onClick={handleHomeClick}
                className="mt-4 btn btn-primary"
              >
                Try Again
              </button>
            </div>
          );
        }
        if (analysisResult) {
          return <Dashboard result={analysisResult} audioUrl={audioUrl} />;
        }
        return (
          <div className="space-y-12 animate-fade-in">
            <LandingPage />
            <FileUpload onFileSelect={handleFileSelect} disabled={false} />
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-base-100 text-content-100 font-sans">
      <Header onHomeClick={handleHomeClick} onNavClick={handleNavClick} />
      <main className="flex-grow container mx-auto px-4 py-8">
        {renderContent()}
      </main>
      <Footer onNavClick={handleNavClick} />
    </div>
  );
}

export default App;