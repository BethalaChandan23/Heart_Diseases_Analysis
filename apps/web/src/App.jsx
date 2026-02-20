import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop.jsx';
import HomePage from './pages/HomePage.jsx';
import DrSharmaPage from './pages/DrSharmaPage.jsx';
import RameshPage from './pages/RameshPage.jsx';
import AnitaPage from './pages/AnitaPage.jsx';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dr-sharma" element={<DrSharmaPage />} />
        <Route path="/ramesh" element={<RameshPage />} />
        <Route path="/anita" element={<AnitaPage />} />
      </Routes>
    </Router>
  );
}

export default App;