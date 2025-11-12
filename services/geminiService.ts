import { GoogleGenAI, Type } from "@google/genai";
import { TranscriptEntry, SentimentDataPoint, CoachingCardData } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const formatTranscriptForPrompt = (transcript: TranscriptEntry[]): string => {
  return transcript.map(entry => `Speaker ${entry.speaker} (${entry.timestamp}s): ${entry.text}`).join('\n');
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      const encoded = reader.result as string;
      // remove the "data:audio/mpeg;base64," part
      const base64 = encoded.split(',')[1];
      resolve(base64);
    };
    reader.onerror = error => reject(error);
  });
};

export const transcribeAudioStream = async (
  file: File,
  onChunk: (text: string) => void
): Promise<string> => {
  const model = 'gemini-2.5-flash';
  const base64Audio = await fileToBase64(file);

  const audioPart = {
    inlineData: {
      mimeType: file.type,
      data: base64Audio,
    },
  };

  const textPart = {
    text: `You are a highly accurate audio transcription and diarization service. Transcribe the provided audio of a sales call.
- Identify two speakers and label them as 'Speaker A' (customer) and 'Speaker B' (salesperson).
- For each utterance, provide a precise timestamp in seconds indicating when it starts.
- Format each utterance on a new line like this: \`[timestamp] Speaker A: text\`
- Do not include any other text, explanations, or formatting.`,
  };

  try {
    const responseStream = await ai.models.generateContentStream({
      model: model,
      contents: { parts: [textPart, audioPart] },
    });

    let fullTranscript = '';
    for await (const chunk of responseStream) {
      const chunkText = chunk.text;
      if (chunkText) {
        onChunk(chunkText);
        fullTranscript += chunkText;
      }
    }
    return fullTranscript;
  } catch (error) {
    console.error("Error transcribing audio:", error);
    throw new Error("Failed to transcribe audio file.");
  }
};


export const analyzeSentiment = async (transcript: TranscriptEntry[]): Promise<SentimentDataPoint[]> => {
  const model = 'gemini-2.5-pro';
  const formattedTranscript = formatTranscriptForPrompt(transcript);
  
  const prompt = `You are a sentiment analysis expert. Analyze the following diarized sales call transcript. For each conversational turn, provide a sentiment score for Speaker A (the customer) and Speaker B (the salesperson). The score must be a number between -1.0 (very negative) and 1.0 (very positive), with 0.0 being neutral.

Transcript:
${formattedTranscript}

Provide the output as a valid JSON array, where each object corresponds to a conversational turn.
`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              turn: { type: Type.INTEGER, description: "The conversational turn number, starting from 1." },
              'Customer (A)': { type: Type.NUMBER, description: "Sentiment score for Speaker A." },
              'Salesperson (B)': { type: Type.NUMBER, description: "Sentiment score for Speaker B." }
            },
            required: ['turn', 'Customer (A)', 'Salesperson (B)']
          }
        }
      }
    });

    const jsonText = response.text.trim();
    const result = JSON.parse(jsonText);
    return result as SentimentDataPoint[];
  } catch (error) {
    console.error("Error analyzing sentiment:", error);
    throw new Error("Failed to analyze sentiment from transcript.");
  }
};

export const generateCoachingCard = async (transcript: TranscriptEntry[]): Promise<CoachingCardData> => {
  const model = 'gemini-2.5-pro';
  const formattedTranscript = formatTranscriptForPrompt(transcript);

  const prompt = `You are an expert sales coach. Analyze the following sales call transcript between a salesperson (Speaker B) and a customer (Speaker A). Based on the conversation, identify exactly 3 strengths of the salesperson's approach and exactly 3 areas of missed opportunities for improvement. Be concise and actionable.

Transcript:
${formattedTranscript}

Provide the output in a valid JSON format.
`;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            strengths: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "An array of 3 strings detailing the salesperson's strengths."
            },
            opportunities: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "An array of 3 strings detailing missed opportunities."
            }
          },
          required: ['strengths', 'opportunities']
        }
      }
    });

    const jsonText = response.text.trim();
    return JSON.parse(jsonText) as CoachingCardData;
  } catch (error) {
    console.error("Error generating coaching card:", error);
    throw new Error("Failed to generate coaching feedback.");
  }
};
