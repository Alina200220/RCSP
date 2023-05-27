import React from 'react';

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Instruction from './Components/Instruction';
import Aparts from './Components/Aparts';
import Home from './Components/Home';

function App() {
  return (
    <div >
      <Router>
      <Routes>
        <Route exect path="/" element={<Home/>} />
        <Route exect path="/instruction" element={<Instruction />} />
        <Route exect path="/apartss" element={<Aparts/>} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
