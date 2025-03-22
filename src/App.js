import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HackathonWebsite from './Hackathon';
import ProblemStatements from './ProblemStatements';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HackathonWebsite />} />
        <Route path="/problem-statements" element={<ProblemStatements />} />
      </Routes>
    </Router>
  );
};

export default App;