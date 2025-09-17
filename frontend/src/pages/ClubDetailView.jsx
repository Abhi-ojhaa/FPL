import React, { useState, useEffect } from 'react';
import './ClubDetailView.css'; 

function ClubDetailView(props) {
  const { clubId, onBackClick } = props;
  const [rosterData, setRosterData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!clubId) return;

    const apiUrl = `http://localhost:8080/api/v1/clubs/${clubId}`;
    setIsLoading(true);
    setError(null);
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) throw new Error("Failed to fetch club roster.");
        return response.json();
      })
      .then(data => {
        setRosterData(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  }, [clubId]);

  useEffect(() => {
    if (rosterData) console.log('rosterData:', rosterData);
  }, [rosterData]);

  // Guard: Don't render if clubId is not valid.
  if (!clubId) return <div className="detail-container">No club selected.</div>;
  if (isLoading) return <div className="detail-container">Loading roster...</div>;
  if (error) return <div className="detail-container error"><strong>Error:</strong> {error}</div>;
  if (!rosterData || !rosterData.roster) return <div className="detail-container">No roster data available for this club.</div>;

  return (
    <div className="detail-container">
      <button className="back-button" onClick={onBackClick}>
        &larr; Back to All Clubs
      </button>

      <h2>{rosterData.clubName} Roster</h2>
      
      <div className="roster-grid">
        {Object.keys(rosterData.roster).sort().map(position => (
          <div key={position} className="position-group">
            <h4>{position}</h4>
            <ul className="player-list">
              {rosterData.roster[position].length === 0 ? (
                <li style={{padding: '6px 0', color: '#888'}}>No players in this position.</li>
              ) : (
                rosterData.roster[position].map(player => (
                  // Use the correct field for player name below:
                  <li key={player.id}>
                    {player.name || player.playerName || JSON.stringify(player)}
                  </li>
                ))
              )}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ClubDetailView;