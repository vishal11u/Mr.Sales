import { TranscriptEntry } from '../types';

/**
 * Parses a timestamp string (e.g., "5.2" or "00:05.2") into seconds.
 * @param timestampStr The timestamp string from the transcript.
 * @returns The total number of seconds.
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
 * Parses transcript text in the format: `[timestamp] Speaker A/B: text`
 * and handles multi-line text for a single speaker entry.
 * It's designed to be robust against extra whitespace, markdown, and varied timestamp formats.
 * @param text The full transcript string from the model.
 * @returns An array of TranscriptEntry objects.
 */
export const parseTranscript = (text: string): TranscriptEntry[] => {
  // Clean potential markdown code blocks that the model might add.
  const cleanedText = text.replace(/```/g, '').trim();

  const entries: TranscriptEntry[] = [];
  const lines = cleanedText.split('\n');

  // Regex to identify a new speaker entry.
  // It's flexible with timestamps (e.g., [5.2], [00:05.2], [ 5 ]) and speaker labels.
  const entryStartRegex = /\[\s*([\d:.]+)\s*]\s+Speaker\s+([AB]):\s*(.*)/i;

  let currentEntry: TranscriptEntry | null = null;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (!trimmedLine) continue;

    const match = trimmedLine.match(entryStartRegex);

    if (match) {
      if (currentEntry) {
        entries.push(currentEntry);
      }

      const [, timestampStr, speaker, text] = match;
      const timestamp = parseTimestamp(timestampStr);

      // Guard against NaN timestamps which can break the app
      if (!isNaN(timestamp)) {
        currentEntry = {
          timestamp: timestamp,
          speaker: speaker.toUpperCase() as 'A' | 'B',
          text: text.trim(),
        };
      } else {
        // If timestamp is invalid, we treat this line as a continuation of previous text
        // to avoid losing content, in case of a formatting glitch from the model.
        if (currentEntry) {
          currentEntry.text += `\n${trimmedLine}`;
        }
      }
    } else if (currentEntry) {
      // This is a continuation of the previous speaker's text.
      currentEntry.text += `\n${trimmedLine}`;
    }
    // If a line doesn't match and there's no currentEntry, we ignore it.
    // This effectively skips any preamble like "Here is the transcript:".
  }

  // Add the last entry if it exists
  if (currentEntry) {
    entries.push(currentEntry);
  }

  // Final trim on all text entries
  return entries.map((entry) => ({ ...entry, text: entry.text.trim() }));
};
