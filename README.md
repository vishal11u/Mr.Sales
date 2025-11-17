# Sales Coach AI

**AI-Powered Sales Call Analysis to Unlock Your Team's Potential.**

Sales Coach AI is a modern web application designed to help sales professionals and managers improve their performance by providing deep, AI-driven analysis of their sales calls. Simply upload an audio recording, and our application will generate a comprehensive, interactive dashboard filled with actionable insights, a full transcript, sentiment analysis, and personalized coaching feedback.

![Sales Coach AI Landing Page](https://storage.googleapis.com/aistudio-hosting/sales-coach-og.png)

## ✨ Key Features

- **AI Coaching Card:** Get personalized feedback on your strengths and opportunities for improvement.
- **Full Call Transcript:** A complete, time-stamped, and speaker-diarized transcript of the entire conversation that highlights the current speaker as the audio plays.
- **Sentiment Analysis Graph:** Visualize the emotional tone of both the salesperson and the customer throughout the call on an interactive chart.
- **Vocal Delivery Metrics:** Analyze the salesperson's pace, clarity, tone, and usage of filler words.
- **Keyword Tracking:** Monitor how often key terms (like pricing, competitors, features) are mentioned by each speaker.
- **Actionable Next Steps:** Receive a clear, concise list of actions to take to improve and move the deal forward.
- **AI-Generated Insights:** Get a high-level summary, key discussion points, and even a role-play scenario for practice.
- **Customizable Dashboard:** Toggle the visibility of any analysis panel to focus on what matters most to you.
- **Export & Share:** Easily export the full analysis summary to a text file or specific data (like transcripts and sentiment) to CSV. A share feature is included for collaborative review.
- **Responsive Design:** A clean, modern interface with both light and dark modes, fully accessible on any device.
- **Onboarding Tour:** A guided tour for first-time users to quickly understand the application's capabilities.

## 🚀 How It Works

The application provides a seamless three-step process to transform your raw sales calls into actionable intelligence.

1.  **Upload Your Audio:** Click the upload area or drag and drop an audio file (MP3, WAV, M4A, etc.) of your sales call.
2.  **AI Analysis in Seconds:** Our system securely sends the audio to the **Google Gemini API**. A powerful prompt guides the model to perform a multi-faceted analysis, including transcription, diarization, sentiment tracking, and qualitative coaching assessment. The results are streamed back in real-time.
3.  **Receive Your Dashboard:** Once the analysis is complete, you are presented with a comprehensive, interactive dashboard. You can play the audio and see the transcript and sentiment graph update in real-time, review the coaching cards, and add your own comments.

## 🛠️ Technology Stack

- **Frontend:**
  - **React:** For building the user interface.
  - **TypeScript:** For type-safe JavaScript.
  - **Tailwind CSS:** For styling the application with a modern, utility-first approach.
- **Core AI Service:**
  - **Google Gemini API (`gemini-2.5-pro`):** Used for its advanced multimodal capabilities, processing the audio input and generating a structured JSON output based on a detailed prompt and schema.
- **Libraries & Tools:**
  - **Esbuild (via environment):** The project is structured to be run in an environment that uses esbuild for fast, module-based development.
  - **html2canvas:** (Included for future development) A library to enable screenshot-based exports.

## 🤖 Core AI Logic

The intelligence of this application is powered by a single, sophisticated call to the Gemini API.

- **`generateContentStream`:** We use the streaming API to provide real-time feedback to the user during the analysis process, showing the raw JSON as it's being generated.
- **Multimodal Prompting:** The request combines the **audio file** with a detailed **text prompt** (`utils/analysisUtils.ts`) that instructs the AI on exactly how to analyze the call.
- **Structured JSON Output:** We enforce a strict JSON schema (`responseSchema`) in the API call. This ensures the AI's response is always in a predictable format that the application can parse to populate the various dashboard components, eliminating the need for fragile string parsing on the frontend.

This approach makes the application robust and allows for complex, multi-layered analysis from a single API interaction.

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

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.