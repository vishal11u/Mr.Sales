import { AnalysisResult } from '../types';

export const SAMPLE_AUDIO_URL = 'https://storage.googleapis.com/aistudio-hosting/sales-coach-sample.wav';

export const SAMPLE_ANALYSIS_RESULT: AnalysisResult = {
  transcript: [
    { timestamp: 2.5, speaker: 'B', text: "Hi Sarah, thanks for taking the time to chat today. I'm excited to show you how our new CRM platform, 'ConnectSphere', can help streamline your team's workflow." },
    { timestamp: 9.8, speaker: 'A', text: "Hey Alex. Yeah, we're definitely looking for something new. Our current system is a bit clunky, especially with remote team members." },
    { timestamp: 16.1, speaker: 'B', text: "I hear that a lot. What are the biggest challenges you're facing with collaboration and keeping track of deals?" },
    { timestamp: 22.4, speaker: 'A', text: "Mainly reporting. It's tough to get a clear picture of our pipeline. And sharing notes on a client is a nightmare. Things get lost in email threads." },
    { timestamp: 29.9, speaker: 'B', text: "That's exactly what ConnectSphere is designed to solve. We have a unified dashboard and collaborative note-taking on every client profile. It could save your team hours each week." },
    { timestamp: 37.5, speaker: 'A', text: "That sounds promising. What does the pricing structure look like? We're a team of about 15." },
    { timestamp: 43.2, speaker: 'B', text: "For a team your size, our 'Pro' plan would be the best fit. It includes all the features we just discussed. I can send over a detailed pricing sheet after our call." },
    { timestamp: 50.1, speaker: 'A', text: "Okay, that would be great. I'd also be interested to see how it compares to a competitor, SalesForce." },
    { timestamp: 55.8, speaker: 'B', text: "Absolutely. We can definitely set up a more in-depth demo next week to go through a side-by-side comparison and answer any more questions you have." }
  ],
  sentimentData: [
    { timestamp: 0, customerSentiment: 0.2, salespersonSentiment: 0.5 },
    { timestamp: 15, customerSentiment: 0.3, salespersonSentiment: 0.6 },
    { timestamp: 30, customerSentiment: 0.4, salespersonSentiment: 0.7 },
    { timestamp: 45, customerSentiment: 0.1, salespersonSentiment: 0.5 },
    { timestamp: 60, customerSentiment: 0.3, salespersonSentiment: 0.6 }
  ],
  coachingCard: {
    strengths: [
        "Great job opening the call with a clear purpose and benefit statement.",
        "Effectively used an open-ended question to understand the customer's primary pain point early on.",
        "Maintained a confident and professional tone throughout the call."
    ],
    opportunities: [
        "When discussing pricing, try to pivot back to the value and ROI to better justify the cost before just offering to send a sheet.",
        "When a competitor is mentioned, briefly highlight a key differentiator of your product before agreeing to a later comparison.",
        "Consider asking more clarifying questions about their team's specific remote work challenges to tailor the pitch even more."
    ]
  },
  nextSteps: [
    "Prepare a follow-up email summarizing the discussion and highlighting the ROI of ConnectSphere.",
    "Schedule a team demo for next week to showcase the collaboration and reporting features.",
    "Create a brief, one-page comparison chart against SalesForce focusing on your key advantages."
  ],
  aiInsights: {
    summary: "The call was a successful initial discovery session. The salesperson (Alex) effectively identified the customer's (Sarah) main challenge with her current CRM, particularly regarding reporting and remote collaboration. The conversation covered key features and touched on pricing, with a clear path towards a follow-up demo.",
    keyPoints: [
        "Customer's primary pain point is managing a remote sales team with a 'clunky' CRM.",
        "Key features of interest are collaborative note-taking and pipeline reporting.",
        "Initial discussion on budget and pricing tier occurred.",
        "Customer explicitly mentioned competitor SalesForce."
    ],
    rolePlaySuggestion: "Practice responding to the statement: 'That pricing seems a bit high compared to what we're paying now.' Focus on reinforcing the value proposition and ROI before offering any discounts."
  },
  vocalDelivery: {
    pace: "Conversational and clear",
    clarity: "Excellent",
    tone: { classification: "Confident and engaging", impact: "Helped build rapport and trust with the customer." },
    fillerWords: [{ word: "um", count: 2 }, { word: "so", count: 4 }]
  },
  keywordAnalysis: [
    { keyword: "pricing", salespersonMentions: 2, customerMentions: 1 },
    { keyword: "feature", salespersonMentions: 5, customerMentions: 2 },
    { keyword: "competitor", salespersonMentions: 0, customerMentions: 1 },
    { keyword: "timeline", salespersonMentions: 1, customerMentions: 0 },
    { keyword: "budget", salespersonMentions: 0, customerMentions: 0 },
    { keyword: "contract", salespersonMentions: 0, customerMentions: 0 },
    { keyword: "discount", salespersonMentions: 0, customerMentions: 0 }
  ]
};
