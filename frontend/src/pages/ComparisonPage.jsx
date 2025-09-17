import React, { useState, useEffect } from 'react';
import './ComparisonPage.css';
import {
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip,
} from 'recharts';

const statKeys = [
  { label: 'Goals', key: 'goalsScored' },
  { label: 'Assists', key: 'assists' },
  { label: 'Minutes', key: 'minutes' },
  { label: 'Total Points', key: 'totalPoints' },
];

function ComparisonPage() {
  const [allPlayers, setAllPlayers] = useState([]);
  const [playerA, setPlayerA] = useState(null);
  const [playerB, setPlayerB] = useState(null);
  const [showSelect, setShowSelect] = useState(null);
  const [comparisonData, setComparisonData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8080/api/v1/player')
      .then(res => res.json())
      .then(data => {
        const sortedPlayers = data.sort((a, b) => a.name.localeCompare(b.name));
        setAllPlayers(sortedPlayers);
      });
  }, []);

  const handleSelect = (which, id) => {
    const player = allPlayers.find(p => p.id === parseInt(id));
    if (which === 'A') setPlayerA(player);
    else setPlayerB(player);
    setShowSelect(null);
    setComparisonData(null);
  };

  const handleRemove = which => {
    if (which === 'A') setPlayerA(null);
    else setPlayerB(null);
    setComparisonData(null);
  };

  const handleCompare = () => {
    if (!playerA || !playerB) return;
    setIsLoading(true);
    setComparisonData(null);
    setError(null);

    const url = `http://localhost:8080/api/v1/player/compare?playerA=${playerA.name}&playerB=${playerB.name}`;
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch comparison data. Check player names.');
        return res.json();
      })
      .then(data => {
        setComparisonData(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  const getRadarData = () => {
    if (!comparisonData) return [];
    return statKeys.map(({ label, key }) => ({
      stat: label,
      [comparisonData.playerA.webName || comparisonData.playerA.name]: Number(comparisonData.playerA[key]) || 0,
      [comparisonData.playerB.webName || comparisonData.playerB.name]: Number(comparisonData.playerB[key]) || 0,
    }));
  };

  return (
    <div className="modern-bg">
      <div className="modern-compare-wrapper">
        <h2 className="modern-title">Player Comparison</h2>
        <div className="modern-cards-row">
          <PlayerCardModern
            player={playerA}
            onAdd={() => setShowSelect('A')}
            onRemove={() => handleRemove('A')}
            highlight="A"
            isActive={showSelect === 'A'}
            allPlayers={allPlayers}
            onSelect={id => handleSelect('A', id)}
          />
          <div className="modern-vs-burst">
            <span className="modern-vs-text">VS</span>
          </div>
          <PlayerCardModern
            player={playerB}
            onAdd={() => setShowSelect('B')}
            onRemove={() => handleRemove('B')}
            highlight="B"
            isActive={showSelect === 'B'}
            allPlayers={allPlayers}
            onSelect={id => handleSelect('B', id)}
          />
        </div>
        <button
          className="modern-compare-btn"
          onClick={handleCompare}
          disabled={!playerA || !playerB || isLoading}
        >
          {isLoading ? 'Comparing...' : 'Compare'}
        </button>
        {error && <div className="modern-error">{error}</div>}
        {comparisonData && (
          <div className="modern-stats-compare-row">
            <StatCols
              player={comparisonData.playerA}
              opponent={comparisonData.playerB}
              type="A"
            />
            <div className="modern-stats-sep" />
            <StatCols
              player={comparisonData.playerB}
              opponent={comparisonData.playerA}
              type="B"
            />
          </div>
        )}
        {comparisonData && (
          <div className="modern-radar-section">
            <h3>Interactive Stat Radar</h3>
            <ResponsiveContainer width="100%" height={320}>
              <RadarChart data={getRadarData()} outerRadius="75%">
                <PolarGrid stroke="#b6dbff88" />
                <PolarAngleAxis dataKey="stat" stroke="#00315b" />
                <PolarRadiusAxis stroke="#b6dbff88" />
                <Radar
                  name={comparisonData.playerA.webName || comparisonData.playerA.name}
                  dataKey={comparisonData.playerA.webName || comparisonData.playerA.name}
                  stroke="#1fa2ff"
                  fill="#1fa2ff"
                  fillOpacity={0.38}
                />
                <Radar
                  name={comparisonData.playerB.webName || comparisonData.playerB.name}
                  dataKey={comparisonData.playerB.webName || comparisonData.playerB.name}
                  stroke="#e55a5a"
                  fill="#e55a5a"
                  fillOpacity={0.28}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}

function PlayerCardModern({
  player, onAdd, onRemove, highlight, isActive, allPlayers, onSelect,
}) {
  return (
    <div className={`modern-card ${highlight ? "highlight-" + highlight : ""}`}>
      {player ? (
        <>
          <button className="modern-remove-btn" onClick={onRemove}>
            ×
          </button>
          <div className="modern-player-avatar">
            <span role="img" aria-label="avatar">⚽</span>
          </div>
          <div className="modern-player-name">{player.webName || player.name}</div>
          <div className="modern-player-info">
            {player.position && <span>{player.position}</span>}
            {player.team && <span>{player.team}</span>}
          </div>
        </>
      ) : (
        <div className="modern-card-empty">
          <button className="modern-add-btn" onClick={onAdd}>
            +
          </button>
          {isActive && (
            <select
              className="modern-card-select"
              onChange={e => onSelect(e.target.value)}
              defaultValue=""
            >
              <option value="" disabled>Select player</option>
              {allPlayers.map(p => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>
          )}
        </div>
      )}
    </div>
  );
}

function StatCols({ player, opponent, type }) {
  return (
    <div className="modern-stats-col">
      <div className="modern-stats-title">{player.webName || player.name}</div>
      {statKeys.map(({ label, key }) => {
        const val = Number(player[key]) || 0;
        const opp = Number(opponent[key]) || 0;
        const isWin = val > opp;
        const progress = (val + opp) > 0 ? (val / (val + opp)) * 100 : 50;
        return (
          <div className="modern-stat-row" key={key}>
            <span className="modern-stat-label">{label}</span>
            <div className="modern-stat-bar-bg">
              <div
                className={`modern-stat-bar modern-bar-${type}${isWin ? " win" : ""}`}
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className={`modern-stat-value${isWin ? " win" : ""}`}>{val}</span>
          </div>
        );
      })}
    </div>
  );
}

export default ComparisonPage;