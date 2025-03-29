import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HackathonWebsite from './Hackathon';
import ProblemStatements from './ProblemStatements';
import Timer from './Timer';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HackathonWebsite />} />
        <Route path="/problem-statements" element={<ProblemStatements />} />
        <Route path="/timer" element={<Timer />} />
      </Routes>
    </Router>
  );
};

export default App;