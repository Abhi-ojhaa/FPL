import React from 'react';
import './ClubCard.css';

function ClubCard({ club }) {
  return (
    <div className="club-card">
      {}
      <div className="club-card-header">
        <div className="club-card-rating">{club.rating ?? '--'}</div>
        <div className="club-card-position">{club.position ?? ''}</div>
        <div className="club-card-badge">
          {club.logoUrl && <img src={club.logoUrl} alt={club.name + " badge"} />}
        </div>
      </div>
      {}
      <div className="club-card-name">{club.name}</div>
      {}
      <div className="club-card-stats">
        <p><strong>Wins:</strong> <span>{club.wins}</span></p>
        <p><strong>Draws:</strong> <span>{club.draws}</span></p>
        <p><strong>Losses:</strong> <span>{club.losses}</span></p>
        <p><strong>Points:</strong> <span>{club.points}</span></p>
      </div>
    </div>
  );
}

export default ClubCard;