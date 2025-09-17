import React, { useState, useEffect } from 'react';
import './FixturesPage.css';

function formatKickoff(time) {
  if (!time) return "TBD";
  const date = new Date(time);
  if (isNaN(date.getTime()) || date.getFullYear() < 2000) return "TBD";
  return date.toLocaleString('en-GB', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
    hour: '2-digit', minute: '2-digit'
  });
}

// Card component for each fixture
function FixtureCard({ fixture }) {
  return (
    <div className="fixture-card">
      <div className="fixture-kickoff">{formatKickoff(fixture.kickoffTime)}</div>
      <div className="fixture-teams">
        <span className="fixture-home">{fixture.homeTeamName}</span>
        <span className={`fixture-score${fixture.homeTeamScore !== null ? '' : ' fixture-tbd'}`}>
          {fixture.homeTeamScore !== null ? `${fixture.homeTeamScore} - ${fixture.awayTeamScore}` : 'vs'}
        </span>
        <span className="fixture-away">{fixture.awayTeamName}</span>
      </div>
    </div>
  );
}

export default function FixturesPage() {
  const [fixtures, setFixtures] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/fixtures")
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok. Is the backend running?");
        return res.json();
      })
      .then(data => {
        setFixtures(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div className="loading-message">Loading Fixtures...</div>;
  if (error) return <div className="error-message"><strong>Error:</strong> {error}</div>;

  return (
    <div className="fixtures-modern-container">
      <h2 className="fixtures-title">Full Season Fixture List</h2>
      <div className="fixtures-grid">
        {fixtures.length === 0
          ? <div className="no-fixtures">No fixtures available.</div>
          : fixtures.map((fixture, idx) => <FixtureCard key={idx} fixture={fixture} />)
        }
      </div>
    </div>
  );
}