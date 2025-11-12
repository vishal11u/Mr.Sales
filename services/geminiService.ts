import { GoogleGenAI, Part, Type } from "@google/genai";
import { ANALYSIS_PROMPT, ANALYSIS_SCHEMA } from '../utils/analysisUtils';

const fileToGenerativePart = async (file: File): Promise<Part> => {
    const base64EncodedData = await new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = (error) => reject(error);
        reader.readAsDataURL(file);
    });

    return {
        inlineData: {
            mimeType: file.type,
            data: base64EncodedData,
        },
    };
};

export const analyzeAudioStream = async (
    audioFile: File,
    onProgress: (text: string) => void
): Promise<string> => {
    onProgress('Initializing AI model...');
    // FIX: Initialize GoogleGenAI with named apiKey parameter
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    onProgress('Preparing audio file for analysis...');
    const audioPart = await fileToGenerativePart(audioFile);

    const contents = { parts: [audioPart, { text: ANALYSIS_PROMPT }] };

    onProgress('Starting analysis... This may take a few moments as the model processes the audio.');
    
    // FIX: Use gemini-2.5-pro for complex text tasks
    const responseStream = await ai.models.generateContentStream({
        model: 'gemini-2.5-pro',
        contents: contents,
        config: {
            responseMimeType: 'application/json',
            responseSchema: ANALYSIS_SCHEMA,
        },
    });

    let fullResponse = '';
    onProgress('Receiving analysis data...\n\n');
    for await (const chunk of responseStream) {
        // FIX: Use chunk.text to get text output
        const chunkText = chunk.text;
        if(chunkText) {
            fullResponse += chunkText;
            onProgress(fullResponse); // This will update the TranscriptionProgress component
        }
    }
    
    if (!fullResponse) {
        throw new Error('Received an empty response from the AI model.');
    }

    onProgress('Analysis complete.');
    return fullResponse;
};
