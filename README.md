# Clarity AI

**AI-Powered Conversation Analysis to Unlock Your Potential.**

Clarity AI is a modern web application designed to help professionals improve their performance by providing deep, AI-driven analysis of their conversations. Simply select your context (Sales Call, Job Interview, etc.), upload an audio recording, and our application will generate a comprehensive, interactive dashboard filled with actionable insights, a full transcript, sentiment analysis, and personalized coaching feedback.

![Clarity AI Landing Page](https://storage.googleapis.com/aistudio-hosting/sales-coach-og.png)

## ✨ Key Features

- **Multi-Context Analysis:** Get tailored feedback for different scenarios:
    - **Sales Calls:** Sharpen your pitch and closing techniques.
    - **Job Interviews:** Practice your answers and boost your confidence.
    - **Customer Support:** Enhance empathy and problem-solving skills.
    - **Presentations:** Improve your delivery and audience engagement.
- **Custom Keyword Tracking:** Add your own keywords (like product names, competitors, or technical jargon) and remove defaults to get a perfectly tailored analysis.
- **Sample Analysis:** See the power of the dashboard with a pre-loaded sample analysis without needing to upload your own file.
- **Privacy by Design:** Your audio files and analysis results are processed in-memory and are **never stored** on our servers, ensuring complete confidentiality.
- **AI Coaching Card:** Get personalized feedback on your strengths and opportunities for improvement relevant to your chosen context.
- **Full Call Transcript:** A complete, time-stamped, and speaker-diarized transcript that highlights the current speaker as the audio plays.
- **Sentiment Analysis Graph:** Visualize the emotional tone of both speakers throughout the conversation on an interactive chart.
- **Vocal Delivery Metrics:** Analyze your pace, clarity, tone, and usage of filler words.
- **Actionable Next Steps:** Receive a clear, concise list of actions to take to improve.
- **Customizable Dashboard:** Toggle the visibility of any analysis panel to focus on what matters most to you.
- **Export & Share:** Easily export the full analysis summary for review and collaboration.

## 🚀 How It Works

The application provides a seamless three-step process to transform your raw conversations into actionable intelligence.

1.  **Select Your Context:** Choose the type of conversation you want to analyze (e.g., Sales Call, Job Interview). This tells the AI what to look for.
2.  **Customize Keywords (Optional):** Add or remove keywords to fine-tune the analysis to your specific needs.
3.  **Upload Your Audio:** Drag and drop an audio file (MP3, WAV, M4A, etc.).
4.  **Receive Your Dashboard:** Our system securely sends the audio to the **Google Gemini API** with a context-specific prompt. The AI performs a multi-faceted analysis and streams the results back to a comprehensive, interactive dashboard in your browser.

## 🛠️ Technology Stack

- **Frontend:**
  - **React:** For building the user interface.
  - **TypeScript:** For type-safe JavaScript.
  - **Tailwind CSS:** For styling the application with a modern, utility-first approach.
- **Core AI Service:**
  - **Google Gemini API (`gemini-2.5-pro`):** Used for its advanced multimodal capabilities, processing the audio input and generating a structured JSON output based on a dynamic, detailed prompt and schema.
- **Libraries & Tools:**
  - **Esbuild (via environment):** The project is structured to be run in an environment that uses esbuild for fast, module-based development.

## 🤖 Core AI Logic

The intelligence of this application is powered by a single, sophisticated call to the Gemini API.

- **Dynamic Prompting:** The request combines the **audio file** with a **dynamically generated text prompt** (`utils/analysisUtils.ts`) that instructs the AI on exactly how to analyze the conversation based on the user-selected context.
- **Structured JSON Output:** We enforce a strict JSON schema (`responseSchema`) in the API call. This ensures the AI's response is always in a predictable format that the application can parse to populate the various dashboard components, making the system robust and scalable.
- **Streaming Response:** We use `generateContentStream` to provide real-time feedback to the user during the analysis process, enhancing the user experience.

This approach allows for complex, multi-layered analysis tailored to various professional scenarios from a single API interaction.

## 🔒 Privacy-First by Design

We understand the sensitive nature of your conversations. This application was built with privacy as a core principle:

-   **No Data Storage:** We do **not** store your audio files or the generated analysis results on our servers. All processing is ephemeral and happens during your active session.
-   **In-Memory Processing:** Audio files are sent to the AI service for analysis and are not written to disk on our servers.
-   **Client-Side Results:** The complete analysis is sent directly back to your browser and is gone when you close the tab or start a new analysis.

Your data is your own. Our service acts as a temporary processor to provide insights, not as a storage provider.

## 📁 Project Structure

The project is organized into logical directories to maintain clean and scalable code.

```
/
├── components/         # Reusable React components
│   ├── icons/          # SVG icon components
│   └── pages/          # Static page components (Privacy, Terms)
├── services/           # Services for external API calls (geminiService.ts)
├── types.ts            # Core TypeScript type definitions
├── utils/              # Helper functions (parsing, exporting, etc.)
├── App.tsx             # Main application component with state management
├── index.html          # The entry point of the application
├── index.tsx           # Renders the React application
└── README.md           # You are here!
```