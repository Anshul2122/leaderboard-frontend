import React from "react";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import UserPointHistory from "./pages/UserPointHistory";
import Mainpage from './pages/Mainpage';
import { Toaster } from "react-hot-toast";
function App() {
  

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mainpage />} />
        <Route path="/user/:id" element={<UserPointHistory/>} />
      </Routes>
      <Toaster  position="top-center" />
    </Router>

  )
}

export default App
