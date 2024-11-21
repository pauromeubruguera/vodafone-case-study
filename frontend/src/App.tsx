import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Home';
import { Devices } from './pages/Devices';
import { Navbar } from './components/Navbar';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Navbar />
      <main id="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/devices" element={<Devices />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </main>
    </Router>
  );
};

export default App;
