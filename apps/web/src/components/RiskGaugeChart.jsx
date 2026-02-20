import React from 'react';
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from 'recharts';

const RiskGaugeChart = ({ riskScore, riskLevel }) => {
  // Normalize risk score to 0-100 scale
  const normalizedScore = Math.min(100, (riskScore / 15) * 100);
  
  const data = [
    {
      name: 'Risk',
      value: normalizedScore,
      fill: riskLevel === 'Low' ? '#10B981' : riskLevel === 'Medium' ? '#F59E0B' : '#EF4444'
    }
  ];

  const getRiskColor = () => {
    if (riskLevel === 'Low') return 'text-green-600';
    if (riskLevel === 'Medium') return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="relative">
      <ResponsiveContainer width="100%" height={300}>
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="60%"
          outerRadius="90%"
          data={data}
          startAngle={180}
          endAngle={0}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
          <RadialBar
            background
            dataKey="value"
            cornerRadius={10}
            fill={data[0].fill}
          />
        </RadialBarChart>
      </ResponsiveContainer>
      
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <p className={`text-4xl font-bold ${getRiskColor()}`}>{riskLevel}</p>
        <p className="text-sm text-gray-600 mt-1">Risk Level</p>
        <p className="text-2xl font-semibold text-gray-700 mt-2">{riskScore}/15</p>
      </div>
    </div>
  );
};

export default RiskGaugeChart;