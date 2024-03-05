import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Authentication from './pages/Authentication';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/authentication" element={<Authentication />} />
        {/* add other page routes when ready */}
      </Routes>
    </Router>
  );
};

export default App;
