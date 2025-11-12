import { TranscriptEntry } from '../types';

/**
 * Parses transcript text in the format: `[timestamp] Speaker A/B: text`
 * and handles multi-line text for a single speaker entry.
 * It's designed to be robust against extra whitespace and preamble/postamble from the model.
 * @param text The full transcript string from the model.
 * @returns An array of TranscriptEntry objects.
 */
export const parseTranscript = (text: string): TranscriptEntry[] => {
  const entries: TranscriptEntry[] = [];
  const lines = text.split('\n');

  // Regex to identify the start of a new speaker entry, made more flexible with spacing and case-insensitivity.
  const entryStartRegex = /\[\s*(\d+\.?\d*)\s*]\s+Speaker\s+([AB]):\s*(.*)/i;
  
  let currentEntry: TranscriptEntry | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue; // Skip empty lines

    const match = trimmedLine.match(entryStartRegex);
    
    if (match) {
      // If a new speaker entry starts, push the previous one (if it exists)
      if (currentEntry) {
        entries.push(currentEntry);
      }
      
      // Start a new entry
      const [, timestampStr, speaker, text] = match;
      currentEntry = {
        timestamp: parseFloat(timestampStr),
        speaker: speaker.toUpperCase() as 'A' | 'B',
        text: text.trim(),
      };
    } else if (currentEntry) {
      // If it's a continuation of the previous text, append it.
      currentEntry.text += `\n${trimmedLine}`;
    }
    // If a line doesn't match and there's no currentEntry, we just ignore it.
    // This effectively skips any preamble like "Here is the transcript:".
  }

  // Add the last entry if it exists
  if (currentEntry) {
    entries.push(currentEntry);
  }

  // Final trim on all text entries
  return entries.map(entry => ({...entry, text: entry.text.trim()}));
};