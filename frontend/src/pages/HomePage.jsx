import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';
import goldSmokeBg from '../assets/6465007.jpg';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="golden-bg">
      {}
      <div
        className="golden-bg-image"
        style={{
          backgroundImage: `url(${goldSmokeBg})`,
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1,
        }}
      />
      {}
      <main className="golden-hero">
        <div className="golden-hero-content">
          <h1 className="golden-hero-title">
            Run Your<br />
            Fantasy League<br />
            Like A Pro <span className="golden-hero-emoji" role="img" aria-label="football">⚽</span>
          </h1>
          <p className="golden-hero-desc">
            The easiest way to manage your FPL mini-league. Set up a league page, invite friends, view advanced stats,<br />
            track fixtures, and get personalized suggestions—all in one hub.
          </p>
          <button className="golden-hero-btn" onClick={() => navigate('/get-started')}>Get Started</button>
        </div>
      </main>
    </div>
  );
}