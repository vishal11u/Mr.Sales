// FIX: Removed file content markers that were causing parsing errors.
import { Type } from '@google/genai';

export const ANALYSIS_PROMPT = `
You are an expert sales call analysis AI. Your task is to analyze the provided audio of a sales call between a customer (Speaker A) and a salesperson (Speaker B).

Provide a complete analysis in a single JSON object. Do not include any explanatory text or markdown before or after the JSON.

The analysis must include the following components:

1.  **transcript**: A verbatim transcript of the call. Each entry should have:
    *   'timestamp': The start time in seconds (e.g., 5.2).
    *   'speaker': 'A' for the customer, 'B' for the salesperson.
    *   'text': The transcribed text.

2.  **sentimentData**: An analysis of the sentiment for both speakers over time. Provide data points at regular intervals (e.g., every 15-30 seconds). Each data point should have:
    *   'timestamp': The time in seconds.
    *   'customerSentiment': A score from -1 (very negative) to 1 (very positive).
    *   'salespersonSentiment': A score from -1 (very negative) to 1 (very positive).

3.  **coachingCard**: Actionable feedback for the salesperson. This should contain:
    *   'strengths': A list of 3-5 specific things the salesperson did well.
    *   'opportunities': A list of 3-5 specific areas for improvement, with concrete suggestions.

4.  **nextSteps**: A list of 1-3 direct, actionable next steps for the salesperson to take based on the opportunities identified. These should be concrete calls to action (e.g., "Practice asking open-ended questions about budget early in the call.").

5.  **aiInsights**: A high-level overview of the call. This should contain:
    *   'summary': A concise one-paragraph summary of the entire call.
    *   'keyPoints': A bulleted list of the most important topics, decisions, or action items discussed.
    *   'rolePlaySuggestion': A short, specific scenario for the salesperson to practice, based on a moment of opportunity from the call.

6.  **vocalDelivery**: An analysis of the salesperson's (Speaker B) vocal patterns. This should include:
    *   'pace': A classification (e.g., "Slightly fast", "Conversational", "Calm and measured").
    *   'clarity': A classification (e.g., "Excellent", "Generally clear", "Could be improved").
    *   'tone': An object with 'classification' (e.g., "Confident and engaging", "Monotone", "Hesitant") and 'impact' (a brief explanation of how the tone affected the call).
    *   'fillerWords': A list of common filler words used by the salesperson and their counts (e.g., {"word": "um", "count": 5}). Only include words that were actually used.

Analyze the audio file and provide the JSON output.
`;

export const ANALYSIS_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    transcript: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          timestamp: { type: Type.NUMBER, description: "Start time in seconds." },
          speaker: { type: Type.STRING, description: "'A' for customer, 'B' for salesperson." },
          text: { type: Type.STRING, description: "Verbatim text." },
        },
        required: ['timestamp', 'speaker', 'text'],
      },
    },
    sentimentData: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          timestamp: { type: Type.NUMBER },
          customerSentiment: { type: Type.NUMBER },
          salespersonSentiment: { type: Type.NUMBER },
        },
        required: ['timestamp', 'customerSentiment', 'salespersonSentiment'],
      },
    },
    coachingCard: {
      type: Type.OBJECT,
      properties: {
        strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
        opportunities: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ['strengths', 'opportunities'],
    },
    nextSteps: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: "A list of 1-3 direct, actionable next steps for the salesperson.",
    },
    aiInsights: {
      type: Type.OBJECT,
      properties: {
        summary: { type: Type.STRING },
        keyPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
        rolePlaySuggestion: { type: Type.STRING },
      },
      required: ['summary', 'keyPoints', 'rolePlaySuggestion'],
    },
    vocalDelivery: {
      type: Type.OBJECT,
      properties: {
        pace: { type: Type.STRING },
        clarity: { type: Type.STRING },
        tone: {
          type: Type.OBJECT,
          properties: {
            classification: { type: Type.STRING },
            impact: { type: Type.STRING },
          },
          required: ['classification', 'impact'],
        },
        fillerWords: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              word: { type: Type.STRING },
              count: { type: Type.INTEGER },
            },
            required: ['word', 'count'],
          },
        },
      },
      required: ['pace', 'clarity', 'tone', 'fillerWords'],
    },
  },
  required: ['transcript', 'sentimentData', 'coachingCard', 'nextSteps', 'aiInsights', 'vocalDelivery'],
};
