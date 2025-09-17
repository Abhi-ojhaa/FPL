import React from "react";
import "./PlayerCard.css";

export default function PlayerCard({ player, onClick }) {
  return (
    <div className="fifa-card" onClick={onClick} style={{ cursor: "pointer" }}>
      <div className="player-pos">{player.position}</div>
      <div className="fifa-card-img">
        <img src={player.photo_url} alt={player.web_name} />
      </div>
      <div className="fifa-card-info">
        <div className="player-name">{player.web_name}</div>
        <div className="player-stat-row">
          <span className="player-stat-label">OVR</span>
          <span className="player-stat-value">{player.ovr}</span>
        </div>
        <div className="player-stat-row">
          <span className="player-stat-label">PAC</span>
          <span className="player-stat-value">{player.pac ?? '--'}</span>
          <span className="player-stat-label">SHO</span>
          <span className="player-stat-value">{player.sho ?? '--'}</span>
        </div>
        <div className="player-stat-row">
          <span className="player-stat-label">PAS</span>
          <span className="player-stat-value">{player.pas ?? '--'}</span>
          <span className="player-stat-label">DRI</span>
          <span className="player-stat-value">{player.dri ?? '--'}</span>
        </div>
        <div className="player-stat-row">
          <span className="player-stat-label">DEF</span>
          <span className="player-stat-value">{player.def ?? '--'}</span>
          <span className="player-stat-label">PHY</span>
          <span className="player-stat-value">{player.phy ?? '--'}</span>
        </div>
      </div>
    </div>
  );
}