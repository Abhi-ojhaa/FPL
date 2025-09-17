import React from "react";
import "./PlayerDetailModal.css";

export default function PlayerDetailModal({ player, onClose }) {
  if (!player) return null;

  return (
    <div className="player-modal-overlay" onClick={onClose}>
      <div className="player-modal" onClick={e => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{player.web_name || player.name}</h2>
        <img src={player.photo_url || player.photoCode} alt={player.web_name || player.name} style={{width:100}} />
        <div><b>Nation:</b> {player.nation}</div>
        <div><b>Position:</b> {player.position}</div>
        <div><b>Age:</b> {player.age}</div>
        <div><b>Matches Played:</b> {player.matches_played}</div>
        <div><b>Starts:</b> {player.starts}</div>
        <div><b>Minutes Played:</b> {player.minutes_played}</div>
        <div><b>Goals:</b> {player.goals}</div>
        <div><b>Assists:</b> {player.assists}</div>
        <div><b>Yellow Cards:</b> {player.yellow_cards}</div>
        <div><b>Red Cards:</b> {player.red_cards}</div>
        <div><b>Cost:</b> £{player.cost}m</div>
      </div>
    </div>
  );
}