import React from "react";
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./pages/Header";
import HomePage from "./pages/HomePage";
import ClubsPage from "./pages/ClubsPage";
import FixturesPage from "./pages/FixturesPage";
import ComparisonPage from "./pages/ComparisonPage";
import SuggestionPage from "./pages/SuggestionPage";
import ClubDetailPage from "./pages/ClubDetailPage"; 

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/clubs/:clubId" element={<ClubDetailPage />} /> {}
        <Route path="/fixtures" element={<FixturesPage />} />
        <Route path="/compare" element={<ComparisonPage />} />
        <Route path="/suggestions" element={<SuggestionPage />} />
      </Routes>
    </Router>
  );
}

export default App;