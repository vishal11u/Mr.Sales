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
    try {
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
            throw new Error('Received an empty response from the AI model. This could be due to a content filter or an issue with the audio file.');
        }

        onProgress('Analysis complete.');
        return fullResponse;
    } catch (error: any) {
        console.error('Error during analysis:', error);

        // Check for network errors (often don't have a response object)
        if (!navigator.onLine || (error.message && error.message.toLowerCase().includes('network'))) {
            throw new Error('Network error. Please check your internet connection and try again.');
        }

        const errorMessage = error.toString().toLowerCase();

        // Check for specific API error messages or codes.
        if (errorMessage.includes('429') || errorMessage.includes('rate limit')) {
             throw new Error('The service is currently busy due to high demand (rate limited). Please wait a moment and try again.');
        }
        
        if (errorMessage.includes('api key not valid')) {
            throw new Error('Invalid API key. Please ensure your API key is correctly configured.');
        }
        
        // For Gemini, content filtering can result in an empty response or a specific error.
        if (errorMessage.includes('safety') || errorMessage.includes('finish_reason: "safety"')) {
            throw new Error('The audio could not be processed due to the content safety filter. Please try a different audio file.');
        }
        
        if (errorMessage.includes('500') || errorMessage.includes('internal error')) {
            throw new Error('An internal server error occurred with the AI service. Please try again later.');
        }

        // Generic fallback for other API errors
        throw new Error(`An API error occurred: ${error.message || 'Please try again later.'}`);
    }
};
