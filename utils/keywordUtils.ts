import { TranscriptEntry, Keyword, KeywordAnalysis } from '../types';

export const analyzeKeywords = (transcript: TranscriptEntry[], keywords: Keyword[]): KeywordAnalysis[] => {
  if (keywords.length === 0) {
    return [];
  }

  const keywordMap: Record<string, { salespersonMentions: number; customerMentions: number }> = {};

  keywords.forEach(kw => {
    keywordMap[kw.text.toLowerCase()] = { salespersonMentions: 0, customerMentions: 0 };
  });

  transcript.forEach(entry => {
    const text = entry.text.toLowerCase();
    
    keywords.forEach(kw => {
      const keywordLower = kw.text.toLowerCase();
      // Use a simple regex to count whole word occurrences to avoid matching substrings
      const regex = new RegExp(`\\b${keywordLower}\\b`, 'g');
      const matches = text.match(regex);
      
      if (matches) {
        if (entry.speaker === 'B') {
          keywordMap[keywordLower].salespersonMentions += matches.length;
        } else {
          keywordMap[keywordLower].customerMentions += matches.length;
        }
      }
    });
  });

  return keywords.map(kw => ({
    keyword: kw.text,
    salespersonMentions: keywordMap[kw.text.toLowerCase()].salespersonMentions,
    customerMentions: keywordMap[kw.text.toLowerCase()].customerMentions,
  }));
};
