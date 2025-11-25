import { TranscriptEntry } from '../types';

/**
 * Parses a timestamp string (e.g., "5.2" or "00:05.2") into seconds.
 * Used for string-based parsing fallback.
 */
const parseTimestamp = (timestampStr: string): number => {
  const cleanedStr = timestampStr.trim();
  if (cleanedStr.includes(':')) {
    const parts = cleanedStr.split(':').map(parseFloat).reverse(); // [ss.ms, mm, hh]
    let seconds = 0;
    if (parts[0]) seconds += parts[0]; // seconds
    if (parts[1]) seconds += parts[1] * 60; // minutes
    if (parts[2]) seconds += parts[2] * 3600; // hours
    return seconds;
  }
  return parseFloat(cleanedStr);
};

/**
 * Legacy string parser using Regex.
 * Handles text format: `[timestamp] Speaker A/B: text`
 */
const parseTranscriptString = (text: string): TranscriptEntry[] => {
  const cleanedText = text.replace(/```/g, '').trim();
  const entries: TranscriptEntry[] = [];
  const lines = cleanedText.split('\n');
  const entryStartRegex = /\[\s*([\d:.]+)\s*]\s+Speaker\s+([AB]):\s*(.*)/i;
  let currentEntry: TranscriptEntry | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    const match = trimmedLine.match(entryStartRegex);

    if (match) {
      if (currentEntry) entries.push(currentEntry);

      const [, timestampStr, speaker, text] = match;
      const timestamp = parseTimestamp(timestampStr);

      if (!isNaN(timestamp)) {
        currentEntry = {
          timestamp: timestamp,
          speaker: speaker.toUpperCase() as 'A' | 'B',
          text: text.trim(),
        };
      } else if (currentEntry) {
        currentEntry.text += `\n${trimmedLine}`;
      }
    } else if (currentEntry) {
      currentEntry.text += `\n${trimmedLine}`;
    }
  }

  if (currentEntry) entries.push(currentEntry);
  return entries.map((entry) => ({ ...entry, text: entry.text.trim() }));
};

/**
 * Parses transcript data from either a raw string or a structured JSON array.
 * @param input The raw transcript data (string or array).
 * @returns An array of TranscriptEntry objects.
 */
export const parseTranscript = (input: any): TranscriptEntry[] => {
  // 1. Handle Structured JSON Array (Preferred)
  if (Array.isArray(input)) {
    return input.map((item: any) => {
      // Robust Speaker Normalization
      let speaker: 'A' | 'B' = 'A'; // Default to A
      const rawSpeaker = String(item.speaker || '').toUpperCase().trim();
      
      // Map common labels to 'B' (Agent/Salesperson/Candidate)
      if (
        rawSpeaker === 'B' || 
        rawSpeaker.includes('SALES') || 
        rawSpeaker.includes('AGENT') || 
        rawSpeaker.includes('CANDIDATE') || 
        rawSpeaker.includes('PRESENTER')
      ) {
        speaker = 'B';
      }

      // Robust Timestamp Normalization
      let timestamp = 0;
      if (typeof item.timestamp === 'number') {
        timestamp = item.timestamp;
      } else if (typeof item.timestamp === 'string') {
        timestamp = parseTimestamp(item.timestamp);
      }
      if (isNaN(timestamp)) timestamp = 0;

      return {
        timestamp,
        speaker,
        text: String(item.text || '').trim(),
      };
    });
  }

  // 2. Handle String Input (Fallback)
  if (typeof input === 'string') {
    return parseTranscriptString(input);
  }

  // 3. Fallback for invalid input
  return [];
};