'use client';
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useIMEFull } from '../utils/useIMEFull';

export default function GraphCard() {
  const [data, setData] = useState<{ time: string; value: number }[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => [
        ...prev.slice(-9),
        { time: new Date().toLocaleTimeString(), value: -3 + Math.random() * 0.1 },
      ]);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-900 rounded-2xl shadow-lg p-4 w-full max-w-xl border border-gray-700">
      <h2 className="text-center text-xl mb-2">⚡ IME Activation (−dS/dt)</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={[-3.05, -2.95]} />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}