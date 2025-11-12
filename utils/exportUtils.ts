// FIX: Removed file content markers that were causing parsing errors.
import { CoachingCardData, SentimentDataPoint, TranscriptEntry, AnalysisResult } from '../types';

const createCsvContent = (data: Record<string, any>[]): string => {
  if (data.length === 0) return '';
  
  const headers = Object.keys(data[0]);
  const headerRow = headers.map(header => `"${header.replace(/"/g, '""')}"`).join(',');
  
  const rows = data.map(row =>
    headers.map(header => {
      let cell = row[header] === undefined || row[header] === null ? '' : String(row[header]);
      if (/[",\n\r]/.test(cell)) {
        cell = `"${cell.replace(/"/g, '""')}"`;
      }
      return cell;
    }).join(',')
  );
  
  return [headerRow, ...rows].join('\n');
};

const triggerDownload = (content: string, filename: string, mimeType: string) => {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export const exportTranscriptToCsv = (data: TranscriptEntry[]) => {
    const formattedData = data.map(d => ({
        timestamp: d.timestamp,
        speaker: d.speaker === 'A' ? 'Customer' : 'Salesperson',
        text: d.text
    }));
    const csvContent = createCsvContent(formattedData);
    triggerDownload(csvContent, 'transcript.csv', 'text/csv;charset=utf-8;');
};

export const exportSentimentToCsv = (data: SentimentDataPoint[]) => {
    const csvContent = createCsvContent(data);
    triggerDownload(csvContent, 'sentiment_analysis.csv', 'text/csv;charset=utf-8;');
};

export const exportCoachingCardToText = (data: AnalysisResult, comment: string) => {
    let content = 'Sales Coach AI - Full Analysis Summary\n';
    content += '======================================\n\n';
    
    // Coaching Card
    content += 'AI Coaching Card:\n';
    content += '-----------------\n';
    content += 'Strengths:\n';
    data.coachingCard.strengths.forEach(s => content += `- ${s}\n`);
    content += '\nOpportunities:\n';
    data.coachingCard.opportunities.forEach(o => content += `- ${o}\n`);
    content += '\n\n';

    // Next Steps
    content += 'Actionable Next Steps:\n';
    content += '----------------------\n';
    data.nextSteps.forEach(step => content += `- ${step}\n`);
    content += '\n\n';

    // AI Insights
    if(data.aiInsights) {
        content += 'AI Insights:\n';
        content += '------------\n';
        content += `Summary: ${data.aiInsights.summary}\n\n`;
        content += 'Key Points:\n';
        data.aiInsights.keyPoints.forEach(p => content += `- ${p}\n`);
        content += `\nSuggested Role-Play: ${data.aiInsights.rolePlaySuggestion}\n`;
        content += '\n\n';
    }

    // Vocal Delivery
    if (data.vocalDelivery) {
        content += 'Vocal Delivery Analysis:\n';
        content += '------------------------\n';
        content += `Pace: ${data.vocalDelivery.pace}\n`;
        content += `Clarity: ${data.vocalDelivery.clarity}\n`;
        content += `Tone: ${data.vocalDelivery.tone.classification} (${data.vocalDelivery.tone.impact})\n`;
        if (data.vocalDelivery.fillerWords.length > 0) {
            content += 'Filler Words Detected:\n';
            data.vocalDelivery.fillerWords.forEach(fw => content += `- ${fw.word}: ${fw.count} time(s)\n`);
        }
        content += '\n\n';
    }

    // Keyword Tracker
    if (data.keywordAnalysis && data.keywordAnalysis.length > 0) {
        content += 'Keyword Tracker:\n';
        content += '----------------\n';
        data.keywordAnalysis.forEach(kw => {
            content += `- "${kw.keyword}": Salesperson (${kw.salespersonMentions}), Customer (${kw.customerMentions})\n`
        });
        content += '\n\n';
    }
    
    // Manager Comments
    if(comment) {
        content += "Manager's Comments:\n";
        content += '-------------------\n';
        content += comment + '\n';
    }

    triggerDownload(content, 'analysis_summary.txt', 'text/plain;charset=utf-8;');
};
