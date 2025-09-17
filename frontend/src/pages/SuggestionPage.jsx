import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, CartesianGrid
} from 'recharts';
import './SuggestionPage.css';

function InteractiveTable({ suggestions }) {
  const [sortKey, setSortKey] = useState('goals');
  const [sortOrder, setSortOrder] = useState('desc');

  if (!suggestions?.length) return null;

  const handleSort = key => {
    if (sortKey === key) setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc');
    else {
      setSortKey(key);
      setSortOrder('desc');
    }
  };

  const sorted = [...suggestions].sort((a, b) => {
    let va = a[sortKey], vb = b[sortKey];
    if (typeof va === 'string') va = va.toLowerCase();
    if (typeof vb === 'string') vb = vb.toLowerCase();
    if (va < vb) return sortOrder === 'asc' ? -1 : 1;
    if (va > vb) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  return (
    <div className="suggestion-table-container">
      <table className="suggestion-table interactive-table">
        <thead>
          <tr>
            <th onClick={() => handleSort('name')}>Player</th>
            <th onClick={() => handleSort('club')}>Club</th>
            <th onClick={() => handleSort('position')}>Position</th>
            <th onClick={() => handleSort('cost')}>Price (£m)</th>
            <th onClick={() => handleSort('goals')}>Goals</th>
            <th onClick={() => handleSort('assists')}>Assists</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map(player => (
            <tr key={player.id}>
              <td>{player.name}</td>
              <td>{player.club?.name ?? 'N/A'}</td>
              <td>{player.position}</td>
              <td>{player.cost.toFixed(1)}</td>
              <td>{player.goals}</td>
              <td>{player.assists}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function SuggestionChart({ suggestions }) {
  if (!suggestions || suggestions.length === 0) return null;

  // Show top 10 by goals/assists
  const data = suggestions
    .slice(0, 10)
    .map(player => ({
      name: player.name,
      Goals: player.goals,
      Assists: player.assists,
      'Price (£m)': player.cost,
    }));

  return (
    <div className="suggestion-chart-container">
      <h3>Top 10 Suggestions: Goals & Assists</h3>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart data={data} margin={{ top: 12, right: 20, left: 0, bottom: 24 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" tick={{ fontSize: 12 }} angle={-23} textAnchor="end" interval={0} />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="Goals" fill="#10b981" />
          <Bar dataKey="Assists" fill="#3b82f6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

function SuggestionPage() {
  const [position, setPosition] = useState('MF');
  const [budget, setBudget] = useState('8.0');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searched, setSearched] = useState(false);
  const navigate = useNavigate();

  const handleSuggestionSearch = () => {
    if (!position || !budget || parseFloat(budget) <= 0) {
      alert('Please select a valid position and enter a valid budget.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setSearched(true);

    const url = `http://localhost:8080/api/v1/player/suggestions?position=${position}&budget=${budget}`;

    fetch(url)
      .then(res => {
        if (!res.ok) {
          throw new Error('Could not fetch suggestions. Please try again.');
        }
        return res.json();
      })
      .then(data => {
        setSuggestions(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  };

  return (
    <div className="suggestion-full-bg">
      <div className="suggestion-wrapper">
        <div className="suggestion-title">Player Suggestion Engine</div>
        <div className="suggestion-desc">
          Select a position and enter your max budget to find top-performing players.
        </div>
        <div className="suggestion-form">
          <select value={position} onChange={e => setPosition(e.target.value)}>
            <option value="FW">Forward (FW)</option>
            <option value="MF">Midfielder (MF)</option>
            <option value="DF">Defender (DF)</option>
            <option value="GK">Goalkeeper (GK)</option>
          </select>
          <input
            type="number"
            value={budget}
            onChange={e => setBudget(e.target.value)}
            placeholder="e.g., 8.5"
            min="0"
            step="0.1"
          />
          <button onClick={handleSuggestionSearch} disabled={isLoading}>
            {isLoading ? 'Searching...' : 'Find Players'}
          </button>
        </div>

        <div className="suggestion-results">
          {isLoading && <div className="loading-message">Finding best players...</div>}
          {error && <div className="error-message">{error}</div>}
          {!isLoading && !error && searched && suggestions.length === 0 && (
            <p style={{ textAlign: 'center', color: '#c53030', marginTop: 24 }}>
              No players found for this position and budget.
            </p>
          )}
          {suggestions.length > 0 && (
            <>
              <InteractiveTable suggestions={suggestions} />
              <SuggestionChart suggestions={suggestions} />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default SuggestionPage;