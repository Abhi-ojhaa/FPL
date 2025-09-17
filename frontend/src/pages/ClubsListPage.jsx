import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClubCard from '../components/ClubCard';

function ClubsListPage() {
  const [clubs, setClubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8080/api/v1/clubs")
      .then(res => {
        if (!res.ok) throw new Error("Network response was not ok. Is the backend running?");
        return res.json();
      })
      .then(data => {
        setClubs(data);
        setIsLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div className="loading-message">Loading Clubs...</div>;
  if (error) return <div className="error-message"><strong>Error:</strong> {error}</div>;

  return (
    <div>
      <h2>Premier League Clubs</h2>
      <div className="club-list">
        {clubs.map(club => (
          <Link to={`/clubs/${club.id}`} key={club.id} className="club-link">
            <ClubCard club={club} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ClubsListPage;
