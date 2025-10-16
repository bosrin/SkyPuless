import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Components/Home/Home";
import About from "./Components/About/About";
import News from "./Components/News/News";
import Settings from "./Components/Settings/Settings";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import HelpSupport from "./Components/HelpSupport/HelpSupport"; 

function App() {
  const [user, setUser] = useState(null); // Global user state

  return (
    <Router>
      {/* Navbar always visible */}
      <Navbar user={user} setUser={setUser} />

      {/* App Routes */}
      <Routes>
        {/* Public Route */}
        <Route path="/" element={<Home />} />

        {/* Protected Routes */}
        <Route
          path="/about"
          element={
            <ProtectedRoute user={user}>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/news"
          element={
            <ProtectedRoute user={user}>
              <News />
            </ProtectedRoute>
          }
        />
        <Route
          path="/settings"
          element={
            <ProtectedRoute user={user}>
              <Settings />
            </ProtectedRoute>
          }
        />

       
        <Route path="/help" element={<HelpSupport />} />
      </Routes>
    </Router>
  );
}

export default App;
