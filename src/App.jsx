import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import UserPointHistory from "./pages/UserPointHistory";
import Mainpage from './pages/Mainpage';
function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/user/:id" element={<UserPointHistory/>} />
      </Routes>
    </Router>

  )
}

export default App
