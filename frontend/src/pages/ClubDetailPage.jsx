import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import './ClubDetailPage.css';
import PlayerCard from "./PlayerCard";
import PlayerDetailModal from '../components/PlayerDetailModal';
import { clubBackgrounds } from '../clubColors';

function mapPlayerToCard(player, fallbackPos) {
  const photo_url = player.photoCode
    ? `https://resources.premierleague.com/premierleague/photos/players/110x140/p${player.photoCode.replace('.jpg','')}.png`
    : "https://via.placeholder.com/80";
  return {
    id: player.id,
    position: player.position || fallbackPos || "",
    photo_url,
    web_name: player.name || "Player",
    ovr: (player.goals || 0) + (player.assists || 0),
    nation: player.nation,
    age: player.age,
    matches_played: player.matches_played,
    starts: player.starts,
    minutes_played: player.minutes_played,
    goals: player.goals,
    assists: player.assists,
    yellow_cards: player.yellow_cards,
    red_cards: player.red_cards,
    cost: player.cost,
    photoCode: player.photoCode,
    pac: player.pac, sho: player.sho, pas: player.pas, dri: player.dri, def: player.def, phy: player.phy,
  };
}

function SubstitutesBar({ subs, onPlayerClick }) {
  return (
    <div className="subs-bar-grid">
      {subs.map((player) => (
        <PlayerCard key={player.id} player={player} onClick={() => onPlayerClick(player)} />
      ))}
    </div>
  );
}

export default function ClubDetailPage() {
  const { clubId } = useParams();
  const [rosterData, setRosterData] = useState(null);
  const [formation, setFormation] = useState({ FW: [], MF: [], DF: [], GK: [] });
  const [subs, setSubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedPlayer, setSelectedPlayer] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    fetch(`http://localhost:8080/api/v1/clubs/${clubId}`)
      .then(res => {
        if (!res.ok) throw new Error(`Could not fetch roster for club ID ${clubId}`);
        return res.json();
      })
      .then(data => {
        setRosterData(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, [clubId]);

  useEffect(() => {
    if (!rosterData || !rosterData.roster) return;

    const roster = rosterData.roster;
    const startingFW = (roster.FW || []).slice(0, 3).map(p => mapPlayerToCard(p, "FW"));
    const startingMF = (roster.MF || []).slice(0, 3).map(p => mapPlayerToCard(p, "MF"));
    const startingDF = (roster.DF || []).slice(0, 4).map(p => mapPlayerToCard(p, "DF"));
    const startingGK = (roster.GK || []).slice(0, 1).map(p => mapPlayerToCard(p, "GK"));

    const startingIds = [
      ...startingFW, ...startingMF, ...startingDF, ...startingGK
    ].map(p => p.id);

    const allPlayers = [
      ...(roster.FW || []),
      ...(roster.MF || []),
      ...(roster.DF || []),
      ...(roster.GK || []),
    ];
    const subsList = allPlayers.filter(p => !startingIds.includes(p.id)).map(p => mapPlayerToCard(p));
    setSubs(subsList);

    setFormation({ FW: startingFW, MF: startingMF, DF: startingDF, GK: startingGK });
  }, [rosterData]);

  const clubObj = rosterData?.clubName && clubBackgrounds[rosterData.clubName]
    ? clubBackgrounds[rosterData.clubName]
    : { gradient: "linear-gradient(135deg, #f8f8f8 60%, #e9e9e9 100%)", accent: "#FFD700" };

  const clubBg = clubObj.gradient;
  const accentColor = clubObj.accent || "#FFD700";

  useEffect(() => {
    document.documentElement.style.setProperty('--club-bg', clubBg);
    document.documentElement.style.setProperty('--club-accent', accentColor);
    return () => {
      document.documentElement.style.removeProperty('--club-bg');
      document.documentElement.style.removeProperty('--club-accent');
    };
  }, [clubBg, accentColor]);

  const mid = Math.ceil(subs.length / 2);
  const subsLeft = subs.slice(0, mid);
  const subsRight = subs.slice(mid);

  if (isLoading) return <div className="loading-message">Loading Roster...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;
  if (!rosterData) return <div>No roster data found.</div>;

  return (
    <>
      <div className="club-bg-animated" />
      <div className="detail-container">
        <Link to="/clubs" className="back-button elegant-back-btn">
          <span aria-hidden="true" style={{marginRight:6}}>←</span>
          Back to All Clubs
        </Link>
        <h2
          className="club-roster-heading"
          style={{
            marginBottom: "2.3rem",
            color: `var(--club-accent, #FFD700)`,
            textShadow:
              "0 2px 12px rgba(0,0,0,0.08), 0 1px 0 #fff, 0 0 16px var(--club-accent, #FFD700)",
            borderBottom: `3px solid var(--club-accent, #FFD700)`,
            display: "block",
            paddingBottom: 10,
            fontWeight: 900,
            letterSpacing: "2px",
            textAlign: "center"
          }}
        >
          {rosterData.clubName} Roster
        </h2>
        <div className="squad-and-subs-3col">
          <div className="subs-section">
            <div className="subs-label">Substitutes</div>
            <SubstitutesBar subs={subsLeft} onPlayerClick={setSelectedPlayer} />
          </div>
          <div className="squad-section">
            <div className="formation-433">
              <div className="team-row">
                {formation.FW.map(player => (
                  <PlayerCard key={player.id} player={player} onClick={() => setSelectedPlayer(player)} />
                ))}
              </div>
              <div className="team-row">
                {formation.MF.map(player => (
                  <PlayerCard key={player.id} player={player} onClick={() => setSelectedPlayer(player)} />
                ))}
              </div>
              <div className="team-row">
                {formation.DF.map(player => (
                  <PlayerCard key={player.id} player={player} onClick={() => setSelectedPlayer(player)} />
                ))}
              </div>
              <div className="team-row team-row-gk">
                {formation.GK.map(player => (
                  <PlayerCard key={player.id} player={player} onClick={() => setSelectedPlayer(player)} />
                ))}
              </div>
            </div>
          </div>
          <div className="subs-section">
            <div className="subs-label">Substitutes</div>
            <SubstitutesBar subs={subsRight} onPlayerClick={setSelectedPlayer} />
          </div>
        </div>
        {selectedPlayer && (
          <PlayerDetailModal player={selectedPlayer} onClose={() => setSelectedPlayer(null)} />
        )}
      </div>
    </>
  );
}