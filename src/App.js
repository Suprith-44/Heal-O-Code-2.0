import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HackathonWebsite from './Hackathon';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HackathonWebsite />} />
      </Routes>
    </Router>
  );
};

export default App;