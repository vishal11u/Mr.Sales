
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { SentimentDataPoint } from '../types';

interface SentimentGraphProps {
  data: SentimentDataPoint[];
}

export const SentimentGraph: React.FC<SentimentGraphProps> = ({ data }) => {
  return (
    <div className="bg-base-200 rounded-lg shadow-lg p-6">
      <h2 className="text-xl font-bold mb-4 text-content-100">Sentiment Analysis</h2>
      <div className="h-64 w-full">
        <ResponsiveContainer>
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 20,
              left: -10,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" />
            <XAxis dataKey="turn" stroke="#9ca3af" label={{ value: 'Conversational Turn', position: 'insideBottom', offset: -5, fill: '#9ca3af' }} />
            <YAxis stroke="#9ca3af" domain={[-1, 1]} />
            <Tooltip
              contentStyle={{
                backgroundColor: '#374151',
                borderColor: '#4b5563',
              }}
            />
            <Legend wrapperStyle={{ color: '#f3f4f6' }} />
            <Line type="monotone" dataKey="Customer (A)" stroke="#34d399" activeDot={{ r: 8 }} />
            <Line type="monotone" dataKey="Salesperson (B)" stroke="#60a5fa" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
