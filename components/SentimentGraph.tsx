
import React, { useState, useEffect, useRef } from 'react';
import { SentimentDataPoint } from '../types';
import { ChartBarIcon } from './icons/ChartBarIcon';
import { Tooltip } from './Tooltip';
import { InfoIcon } from './icons/InfoIcon';

// FIX: Define SentimentGraphProps interface
interface SentimentGraphProps {
  data: SentimentDataPoint[];
  currentTime: number;
  duration: number;
}

// Helper functions for creating a smooth curve using a cardinal spline
const cardinalSpline = (p0, p1, p2, p3, tension = 1) => {
    const c1x = p1.x + ((p2.x - p0.x) / 6) * tension;
    const c1y = p1.y + ((p2.y - p0.y) / 6) * tension;
    const c2x = p2.x - ((p3.x - p1.x) / 6) * tension;
    const c2y = p2.y - ((p3.y - p1.y) / 6) * tension;
    return { c1: { x: c1x, y: c1y }, c2: { x: c2x, y: c2y } };
};

const createSmoothPath = (points: {x: number, y: number}[]) => {
    if (points.length < 2) return '';
    let path = `M ${points[0].x},${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
        const p0 = points[i === 0 ? 0 : i - 1];
        const p1 = points[i];
        const p2 = points[i + 1];
        const p3 = points[i + 2 > points.length - 1 ? points.length - 1 : i + 2];
        const { c1, c2 } = cardinalSpline(p0, p1, p2, p3, 1);
        path += ` C ${c1.x},${c1.y} ${c2.x},${c2.y} ${p2.x},${p2.y}`;
    }
    return path;
};

const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds) || !isFinite(timeInSeconds)) {
        return '00:00';
    }
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
};

export const SentimentGraph: React.FC<SentimentGraphProps> = ({ data, currentTime, duration }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hoverInfo, setHoverInfo] = useState<{ x: number; timestamp: number; customerY: number; salespersonY: number; } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    // Set initial theme
    setIsDarkMode(document.documentElement.classList.contains('dark'));
    // Observe theme changes
    const observer = new MutationObserver(() => {
        setIsDarkMode(document.documentElement.classList.contains('dark'));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  if (!data || data.length < 2) {
    return (
      <div className="bg-base-200 dark:bg-dark-base-200 rounded-lg shadow-lg p-6 border border-base-300 dark:border-dark-base-300">
        <h2 className="text-xl font-bold mb-4">Sentiment Analysis</h2>
        <p className="text-content-200 dark:text-dark-content-200">Not enough data to display sentiment graph.</p>
      </div>
    );
  }

  // FIX: Sort data by timestamp to ensure the line is drawn correctly.
  const sortedData = [...data].sort((a, b) => a.timestamp - b.timestamp);

  const width = 800;
  const height = 250;
  const padding = 40;
  
  const colors = {
    grid: isDarkMode ? '#2c2c2c' : '#e9ecef',
    text: isDarkMode ? '#9ca3af' : '#6c757d',
    progress: isDarkMode ? '#f9a8d4' : '#ec4899',
    cardBg: isDarkMode ? '#1e1e1e' : '#ffffff',
    customer: '#10b981',
    salesperson: '#3b82f6',
  };

  const maxTime = duration > 0 ? duration : Math.max(...sortedData.map(d => d.timestamp), 1);
  const scaleX = (t: number) => (t / maxTime) * (width - padding * 2) + padding;
  const scaleY = (s: number) => (height - padding * 2) * (1 - (s + 1) / 2) + padding;

  const inverseScaleY = (y: number): number => {
    const chartHeight = height - padding * 2;
    // Formula derived from reversing the scaleY function
    const scaledValue = 1 - (y - padding) / chartHeight;
    return (scaledValue * 2) - 1;
  };

  const customerPoints = sortedData.map(d => ({ x: scaleX(d.timestamp), y: scaleY(d.customerSentiment) }));
  const salespersonPoints = sortedData.map(d => ({ x: scaleX(d.timestamp), y: scaleY(d.salespersonSentiment) }));

  const customerPath = createSmoothPath(customerPoints);
  const salespersonPath = createSmoothPath(salespersonPoints);

  // FIX: Use the neutral line as the baseline for a more intuitive area fill.
  const neutralY = height / 2;
  const customerAreaPath = `${customerPath} L ${customerPoints[customerPoints.length - 1].x},${neutralY} L ${customerPoints[0].x},${neutralY} Z`;
  const salespersonAreaPath = `${salespersonPath} L ${salespersonPoints[salespersonPoints.length - 1].x},${neutralY} L ${salespersonPoints[0].x},${neutralY} Z`;

  const progressX = scaleX(currentTime);

  const findYatX = (x: number, points: {x: number, y: number}[]) => {
      if (points.length === 0) return 0;
      if (x <= points[0].x) return points[0].y;
      if (x >= points[points.length - 1].x) return points[points.length-1].y;

      let p1, p2;
      for (let i = 1; i < points.length; i++) {
        if (points[i].x >= x) {
          p1 = points[i-1];
          p2 = points[i];
          break;
        }
      }

      if (!p1 || !p2) return points[points.length-1].y;

      const t = (p2.x - p1.x) === 0 ? 0 : (x - p1.x) / (p2.x - p1.x);
      return p1.y + t * (p2.y - p1.y);
  };

  const currentCustomerY = findYatX(progressX, customerPoints);
  const currentSalespersonY = findYatX(progressX, salespersonPoints);

  const handleMouseMove = (event: React.MouseEvent<SVGSVGElement>) => {
    if (!svgRef.current || sortedData.length < 2) return;
    const svg = svgRef.current;
    const rect = svg.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const svgX = (mouseX / rect.width) * width;

    if (svgX < padding || svgX > width - padding) {
      if (hoverInfo) setHoverInfo(null);
      return;
    }

    const time = ((svgX - padding) / (width - padding * 2)) * maxTime;
    const customerY = findYatX(svgX, customerPoints);
    const salespersonY = findYatX(svgX, salespersonPoints);

    setHoverInfo({
      x: svgX,
      timestamp: time,
      customerY,
      salespersonY,
    });
  };

  const handleMouseLeave = () => {
    setHoverInfo(null);
  };

  return (
    <div className="bg-base-200 dark:bg-dark-base-200 rounded-lg shadow-lg p-6 border border-base-300 dark:border-dark-base-300">
      <div className="flex items-center space-x-2 mb-4">
        <h2 className="flex items-center text-xl font-bold text-content-100 dark:text-dark-content-100">
          <ChartBarIcon className="w-6 h-6 mr-3" />
          <span>Sentiment Over Time</span>
        </h2>
        <Tooltip text="Visualizes the emotional tone of the conversation. Positive scores indicate positive language, negative scores indicate negative language.">
          <InfoIcon className="w-4 h-4 text-content-200 dark:text-dark-content-200" />
        </Tooltip>
      </div>
      <div className="relative">
        {hoverInfo && (
          <div
            className="absolute top-0 transform -translate-x-1/2 p-2 bg-base-200 dark:bg-dark-base-300 rounded-md shadow-lg text-xs pointer-events-none z-10 border border-base-300 dark:border-dark-base-300"
            style={{
              left: `${(hoverInfo.x / width) * 100}%`,
              top: '10px'
            }}
          >
            <div className="font-mono mb-1 text-center text-content-100 dark:text-dark-content-100">{formatTime(hoverInfo.timestamp)}</div>
            <div className="flex items-center text-content-200 dark:text-dark-content-200 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
              <span>Cust: {inverseScaleY(hoverInfo.customerY).toFixed(2)}</span>
            </div>
            <div className="flex items-center text-content-200 dark:text-dark-content-200 whitespace-nowrap">
              <span className="w-2 h-2 rounded-full bg-blue-500 mr-2"></span>
              <span>Sales: {inverseScaleY(hoverInfo.salespersonY).toFixed(2)}</span>
            </div>
          </div>
        )}
        <svg
          ref={svgRef}
          viewBox={`0 0 ${width} ${height}`}
          className="w-full"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Grid lines */}
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke={colors.grid} />
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke={colors.grid} />
          <line x1={padding} y1={height/2} x2={width - padding} y2={height/2} stroke={colors.grid} strokeDasharray="4"/>
          <line x1={padding} y1={padding} x2={width-padding} y2={padding} stroke={colors.grid} strokeDasharray="4"/>
          
          {/* Y-axis labels */}
          <text x={padding - 10} y={padding + 5} textAnchor="end" fill={colors.text} fontSize="10">Positive</text>
          <text x={padding - 10} y={height/2 + 5} textAnchor="end" fill={colors.text} fontSize="10">Neutral</text>
          <text x={padding - 10} y={height-padding + 5} textAnchor="end" fill={colors.text} fontSize="10">Negative</text>
          
          {/* FIX: Use solid fill with opacity to improve visualization and handle overlaps. */}
          <path d={customerAreaPath} fill={colors.customer} fillOpacity="0.3" />
          <path d={salespersonAreaPath} fill={colors.salesperson} fillOpacity="0.3" />

          {/* Data paths */}
          <path d={customerPath} stroke={colors.customer} fill="none" strokeWidth="2.5" strokeLinecap="round" />
          <path d={salespersonPath} stroke={colors.salesperson} fill="none" strokeWidth="2.5" strokeLinecap="round" />

          {/* Progress Indicator */}
          {duration > 0 && (
            <g>
              <line x1={progressX} y1={padding} x2={progressX} y2={height - padding} stroke={colors.progress} strokeWidth="1.5" />
              <circle cx={progressX} cy={currentCustomerY} r="4" fill={colors.customer} stroke={colors.cardBg} strokeWidth="2"/>
              <circle cx={progressX} cy={currentSalespersonY} r="4" fill={colors.salesperson} stroke={colors.cardBg} strokeWidth="2"/>
            </g>
          )}

          {/* Hover Indicator */}
          {hoverInfo && (
            <g className="pointer-events-none">
              <line x1={hoverInfo.x} y1={padding} x2={hoverInfo.x} y2={height - padding} stroke={colors.progress} strokeWidth="1" strokeDasharray="2,2"/>
              <circle cx={hoverInfo.x} cy={hoverInfo.customerY} r="5" fill={colors.customer} stroke={colors.cardBg} strokeWidth="2"/>
              <circle cx={hoverInfo.x} cy={hoverInfo.salespersonY} r="5" fill={colors.salesperson} stroke={colors.cardBg} strokeWidth="2"/>
            </g>
          )}
        </svg>
      </div>
      <div className="flex justify-end space-x-4 mt-2 text-xs text-content-200 dark:text-dark-content-200">
          <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-emerald-500 mr-2"></span>
              <span>Customer</span>
          </div>
          <div className="flex items-center">
              <span className="w-3 h-3 rounded-full bg-blue-500 mr-2"></span>
              <span>Salesperson</span>
          </div>
      </div>
    </div>
  );
};
