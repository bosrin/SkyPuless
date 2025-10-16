import React, { useState, useEffect } from "react";
import { Sun, Moon, Menu, X, Bell } from "lucide-react";
import { Link } from "react-router-dom";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import "./Navbar.css";

const Navbar = ({ user, setUser }) => {
  const [theme, setTheme] = useState("light");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.body.className = nextTheme;
    localStorage.setItem("theme", nextTheme);
  };

  const handleNotification = () => alert("No new notifications!");

  return (
    <header className={`navbar ${theme}`}>
      <div className="navbar__container">
        <div className="navbar__left">
          <div className="logo">🌤️ SkyPulse 🌦️</div>
          <ul className="navbar__links">
            {/* Show all links */}
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/news">News</Link></li>
            {/* <li><Link to="/settings">Settings</Link></li> */}
          </ul>
        </div>

        <div className="navbar__right">
          <button className="icon-btn" onClick={handleNotification}><Bell size={18} /></button>
          <button className="icon-btn" onClick={toggleTheme}>
            {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          <ProfileMenu user={user} setUser={setUser} />

          <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className={`mobile-menu ${theme}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/news" onClick={() => setMenuOpen(false)}>News</Link>
          <Link to="/settings" onClick={() => setMenuOpen(false)}>Settings</Link>
        </div>
      )}
    </header>
  );
};


export default Navbar;
