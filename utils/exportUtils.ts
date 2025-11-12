import { CoachingCardData, SentimentDataPoint, TranscriptEntry } from '../types';

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

export const exportCoachingCardToText = (data: CoachingCardData) => {
    let content = 'Sales Coach AI - Coaching Summary\n';
    content += '==================================\n\n';
    
    content += 'Strengths:\n';
    content += '----------\n';
    data.strengths.forEach(s => content += `- ${s}\n`);
    
    content += '\nOpportunities:\n';
    content += '--------------\n';
    data.opportunities.forEach(o => content += `- ${o}\n`);

    triggerDownload(content, 'coaching_summary.txt', 'text/plain;charset=utf-8;');
};
