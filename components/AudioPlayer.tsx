import React, { useState, useRef, useEffect } from 'react';
import { PlayIcon } from './icons/PlayIcon';
import { PauseIcon } from './icons/PauseIcon';
import { Tooltip } from './Tooltip';
import { InfoIcon } from './icons/InfoIcon';

interface AudioPlayerProps {
  src: string;
  onTimeUpdate: (time: number) => void;
  onDurationChange: (duration: number) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ src, onTimeUpdate, onDurationChange }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleLoadedData = () => {
      const newDuration = audio.duration;
      setDuration(newDuration);
      onDurationChange(newDuration);
      setCurrentTime(audio.currentTime);
      onTimeUpdate(audio.currentTime);
      setIsReady(true);
    };

    const handleTimeUpdate = () => {
      const newTime = audio.currentTime;
      setCurrentTime(newTime);
      onTimeUpdate(newTime);
    };
    
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('loadedmetadata', handleLoadedData);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);

    // Reset state for new src
    setIsReady(false);
    setIsPlaying(false);
    
    return () => {
      audio.removeEventListener('loadedmetadata', handleLoadedData);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [src, onTimeUpdate, onDurationChange]);

  const togglePlayPause = () => {
    if (audioRef.current && isReady) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef.current && isReady) {
      const newTime = Number(e.target.value)
      audioRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      onTimeUpdate(newTime);
    }
  };
  
  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || !isFinite(timeInSeconds)) {
        return '00:00';
    }
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  return (
    <div className="bg-base-200 dark:bg-dark-base-200 rounded-lg shadow-lg p-4 border border-base-300 dark:border-dark-base-300">
      <div className="flex items-center space-x-2 mb-4">
        <h2 className="text-xl font-bold text-content-100 dark:text-dark-content-100">Audio Playback</h2>
        <Tooltip text="Use these controls to listen to the original audio recording of the call.">
          <InfoIcon className="w-4 h-4 text-content-200 dark:text-dark-content-200" />
        </Tooltip>
      </div>
      <audio ref={audioRef} src={src} preload="metadata" key={src}></audio>
      <div className="flex items-center space-x-4">
        <button
          onClick={togglePlayPause}
          className="p-2 rounded-full bg-brand-primary text-white dark:bg-dark-brand-primary hover:bg-brand-primary/80 dark:hover:bg-dark-brand-primary/80 transition-colors focus:outline-none focus:ring-2 focus:ring-brand-accent dark:focus:ring-dark-brand-accent disabled:bg-base-300 dark:disabled:bg-dark-base-300 disabled:cursor-not-allowed"
          aria-label={isPlaying ? 'Pause' : 'Play'}
          disabled={!isReady}
        >
          {isPlaying ? <PauseIcon className="w-6 h-6" /> : <PlayIcon className="w-6 h-6" />}
        </button>
        <div className="text-sm font-mono text-content-200 dark:text-dark-content-200 w-12 text-center">{formatTime(currentTime)}</div>
        <input
          type="range"
          value={currentTime}
          max={duration || 0}
          onChange={handleSeek}
          className="w-full h-2 bg-base-300 dark:bg-dark-base-300 rounded-lg appearance-none cursor-pointer accent-brand-accent dark:accent-dark-brand-accent disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!isReady}
        />
        <div className="text-sm font-mono text-content-200 dark:text-dark-content-200 w-12 text-center">{formatTime(duration)}</div>
      </div>
    </div>
  );
};
