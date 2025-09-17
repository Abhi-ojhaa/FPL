import React, { useState } from "react";
import PlayerCard from "../components/PlayerCard";
import SubstitutesBar from "../components/SubstitutesBar";
import "../components/PlayerCard.css";

const starters = [
  {
    id: 101,
    position: "FW",
    photo_url: "https://via.placeholder.com/80",
    web_name: "Player 1",
    ovr: 90, pac: 85, sho: 88, pas: 80, dri: 90, def: 40, phy: 75,
  },
];
const initialSubs = [
  {
    id: 201,
    position: "MF",
    photo_url: "https://via.placeholder.com/80",
    web_name: "Sub 1",
    ovr: 82, pac: 75, sho: 70, pas: 78, dri: 80, def: 68, phy: 70,
  },
  {
    id: 202,
    position: "DF",
    photo_url: "https://via.placeholder.com/80",
    web_name: "Sub 2",
    ovr: 80, pac: 65, sho: 55, pas: 70, dri: 66, def: 80, phy: 78,
  },
  {
    id: 203,
    position: "FW",
    photo_url: "https://via.placeholder.com/80",
    web_name: "Sub 3",
    ovr: 79, pac: 82, sho: 77, pas: 68, dri: 74, def: 40, phy: 72,
  },
];

export default function TeamPage() {
  const [subs, setSubs] = useState(initialSubs);

  return (
    <div className="squad-bg" style={{ display: "flex", gap: "32px", padding: "32px" }}>
      <div>
        <h1>Arsenal Roster</h1>
        <div className="formation">
          <div style={{ display: "flex", gap: "16px" }}>
            {starters.map((player) => (
              <PlayerCard key={player.id} player={player} />
            ))}
          </div>
        </div>
      </div>
      <SubstitutesBar subs={subs} setSubs={setSubs} />
    </div>
  );
}