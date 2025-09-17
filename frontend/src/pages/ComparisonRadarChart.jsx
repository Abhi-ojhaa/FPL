import React from 'react';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip
} from 'recharts';

export default function ComparisonRadarChart({ playerA, playerB }) {
  if (!playerA || !playerB) return null;

  // Prepare the data in the format required by recharts
  const data = [
    {
      stat: 'Goals',
      [playerA.webName]: playerA.goalsScored,
      [playerB.webName]: playerB.goalsScored,
    },
    {
      stat: 'Assists',
      [playerA.webName]: playerA.assists,
      [playerB.webName]: playerB.assists,
    },
    {
      stat: 'Minutes',
      [playerA.webName]: playerA.minutes,
      [playerB.webName]: playerB.minutes,
    },
    {
      stat: 'Total Points',
      [playerA.webName]: playerA.totalPoints,
      [playerB.webName]: playerB.totalPoints,
    },
  ];

  return (
    <div style={{ width: '100%', height: 400 }}>
      <ResponsiveContainer>
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="stat" />
          <PolarRadiusAxis />
          <Radar name={playerA.webName} dataKey={playerA.webName} stroke="#10b981" fill="#10b981" fillOpacity={0.5} />
          <Radar name={playerB.webName} dataKey={playerB.webName} stroke="#e55a5a" fill="#e55a5a" fillOpacity={0.5} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}