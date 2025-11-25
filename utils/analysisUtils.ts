
import { Type } from '@google/genai';
import { ConversationType } from '../types';

const PROMPT_CONFIGS: Record<ConversationType, any> = {
    sales: {
        title: "expert sales call analysis AI",
        speakerA: "Customer",
        speakerB: "Salesperson",
        goal: "analyze the provided audio of a sales call between a customer (Speaker A) and a salesperson (Speaker B).",
        coachingCardStrengths: "3-5 specific things the salesperson did well.",
        coachingCardOpportunities: "3-5 specific areas for improvement, with concrete suggestions.",
        nextStepsContext: "direct, actionable next steps for the salesperson to take based on the opportunities identified. These should be concrete calls to action (e.g., \"Practice asking open-ended questions about budget early in the call.\").",
        vocalDeliveryContext: "the salesperson's (Speaker B) vocal patterns.",
    },
    interview: {
        title: "expert job interview analysis AI",
        speakerA: "Interviewer",
        speakerB: "Candidate",
        goal: "analyze the provided audio of a job interview, focusing on the candidate's (Speaker B) performance.",
        coachingCardStrengths: "3-5 examples of strong answers, clear communication, or confident delivery. Note any effective use of structures like the STAR method.",
        coachingCardOpportunities: "3-5 areas where answers could be more concise, impactful, or better structured. Provide constructive advice.",
        nextStepsContext: "actionable steps for the candidate to improve their interview skills for next time.",
        vocalDeliveryContext: "the candidate's (Speaker B) vocal patterns, focusing on indicators of confidence and clarity.",
    },
    support: {
        title: "expert customer support call analysis AI",
        speakerA: "Customer",
        speakerB: "Support Agent",
        goal: "analyze the provided audio of a customer support call, focusing on the agent's (Speaker B) effectiveness.",
        coachingCardStrengths: "3-5 examples of excellent customer service, such as demonstrating empathy, clear problem-solving, and effective de-escalation.",
        coachingCardOpportunities: "3-5 areas for improvement, like asking better clarifying questions, showing more empathy, or improving product knowledge.",
        nextStepsContext: "actionable training steps for the support agent to improve their quality of service.",
        vocalDeliveryContext: "the support agent's (Speaker B) vocal patterns, focusing on tone (empathy, patience) and clarity.",
    },
    presentation: {
        title: "expert presentation and public speaking analysis AI",
        speakerA: "Audience",
        speakerB: "Presenter",
        goal: "analyze the provided audio of a presentation or speech given by the presenter (Speaker B). If an audience (Speaker A) is present, analyze their interactions as well.",
        coachingCardStrengths: "3-5 examples of what made the presentation effective, such as clear structure, engaging tone, or confident delivery.",
        coachingCardOpportunities: "3-5 areas for improvement, such as reducing filler words, improving pacing, or making key messages more impactful.",
        nextStepsContext: "actionable practice steps for the presenter to enhance their public speaking skills.",
        vocalDeliveryContext: "the presenter's (Speaker B) vocal patterns, focusing on pace, clarity, and vocal variety.",
    }
};

export const getAnalysisPrompt = (type: ConversationType, language: string = 'Auto-Detect'): string => {
    const config = PROMPT_CONFIGS[type];
    
    let languageInstruction = "The audio may be in any language. Detect the language automatically.";
    if (language !== 'Auto-Detect') {
        languageInstruction = `The audio is predominantly in ${language}.`;
    }

    return `
You are an ${config.title}. Your task is to ${config.goal}

${languageInstruction}

**Crucial Instructions for Multi-Language Support:**
1.  **Transcript:** Transcribe the conversation in the **original language detected** (e.g., if Hindi is spoken, write in Devanagari script; if Marathi, write in Marathi). Do not translate the transcript itself unless explicitly asked.
2.  **Analysis:** Provide the analysis (AI Insights, Coaching Card, Vocal Delivery, Next Steps) **strictly in English**. This allows the user to understand the feedback regardless of the source language.
3.  **Keywords:** If specific non-English terms are key to the analysis, cite them in the original language but explain them in English.

Provide a complete analysis in a single JSON object. Do not include any explanatory text or markdown before or after the JSON.

The analysis must include the following components:

1.  **transcript**: A verbatim transcript of the call. Each entry should have:
    *   'timestamp': The start time in seconds (e.g., 5.2).
    *   'speaker': 'A' for the ${config.speakerA}, 'B' for the ${config.speakerB}.
    *   'text': The transcribed text in the original language.

2.  **sentimentData**: An analysis of the sentiment for both speakers over time. Provide data points at regular intervals (e.g., every 15-30 seconds). Each data point should have:
    *   'timestamp': The time in seconds.
    *   'customerSentiment': A score from -1 (very negative) to 1 (very positive) for Speaker A.
    *   'salespersonSentiment': A score from -1 (very negative) to 1 (very positive) for Speaker B.

3.  **coachingCard**: Actionable feedback for Speaker B. This should contain:
    *   'strengths': A list of ${config.coachingCardStrengths}
    *   'opportunities': A list of ${config.coachingCardOpportunities}

4.  **nextSteps**: A list of 1-3 ${config.nextStepsContext}

5.  **aiInsights**: A high-level overview of the call. This should contain:
    *   'summary': A concise one-paragraph summary of the entire call.
    *   'keyPoints': A bulleted list of the most important topics, decisions, or action items discussed.
    *   'rolePlaySuggestion': A short, specific scenario for Speaker B to practice, based on a moment of opportunity from the call.

6.  **vocalDelivery**: An analysis of ${config.vocalDeliveryContext} This should include:
    *   'pace': A classification (e.g., "Slightly fast", "Conversational", "Calm and measured").
    *   'clarity': A classification (e.g., "Excellent", "Generally clear", "Could be improved").
    *   'tone': An object with 'classification' (e.g., "Confident and engaging", "Monotone", "Hesitant") and 'impact' (a brief explanation of how the tone affected the call).
    *   'fillerWords': A list of common filler words used by Speaker B and their counts (e.g., {"word": "um", "count": 5}). Only include words that were actually used.

Analyze the audio file and provide the JSON output.
`;
}


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
