import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ClubCard from '../components/ClubCard'; 

function ClubsPage() {
  const [clubs, setClubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:8080/api/v1/clubs")
      .then(response => {
        if (!response.ok) throw new Error("Network response was not ok. Is the backend server running?");
        return response.json();
      })
      .then(data => {
        setClubs(data);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setIsLoading(false);
      });
  }, []);

  const gridStyle = {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '32px',
    padding: '24px 0',
  };

  if (isLoading) {
    return <div className="loading-message">Loading...</div>;
  }
  if (error) {
    return <div className="error-message"><strong>Error:</strong> {error}</div>;
  }

  return (
    <div>
      <h2 style={{ textAlign: 'center', color: '#ffe082', marginTop: '2rem' }}>Premier League Clubs</h2>
      <div style={gridStyle}>
        {clubs.map(club => (
          <Link to={`/clubs/${club.id}`} key={club.id} style={{ textDecoration: 'none' }}>
            <ClubCard club={club} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ClubsPage;