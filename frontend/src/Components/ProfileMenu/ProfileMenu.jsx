import React, { useState, useRef, useEffect } from "react";
import {
  User,
  ChevronDown,
  LogOut,
  LogIn,
  Settings,
  Grid,
  LifeBuoy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./ProfileMenu.css";

const ProfileMenu = ({ user, setUser }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Sign in
  const handleSignIn = () => {
    const name = prompt("Enter your name to log in:");
    if (name && name.trim() !== "") {
      setUser({ name: name.trim() });
      navigate("/"); // লগইনের পর হোমে নিয়ে যাবে
    }
  };

  // Sign out
  const handleSignOut = () => {
    setUser(null);
    navigate("/");
  };

  // Navigation handlers
  const goToDashboard = () => {
    navigate("/"); // ✅ এখন ড্যাশবোর্ডে ক্লিক করলে হোম পেজে নিয়ে যাবে
    setOpen(false);
  };

  const goToSettings = () => {
    navigate("/settings");
    setOpen(false);
  };

  const goToHelp = () => {
    navigate("/help");
    setOpen(false);
  };

  return (
    <div className="profile-menu" ref={menuRef}>
      <button className="profile-btn" onClick={() => setOpen(!open)}>
        <User size={18} /> {user ? user.name : "Guest"} <ChevronDown size={14} />
      </button>

      {open && (
        <div className="dropdown-menu">
          {user ? (
            <>
              <div className="dropdown-header">
                <User size={22} /> <span>Hi, {user.name}!</span>
              </div>

              <ul className="dropdown-links">
                <li onClick={goToDashboard}>
                  <Grid size={16} /> Dashboard
                </li>
                <li onClick={goToSettings}>
                  <Settings size={16} /> Settings
                </li>
                <li onClick={goToHelp}>
                  <LifeBuoy size={16} /> Help & Support
                </li>
              </ul>

              <div className="dropdown-footer">
                <button className="signout-btn" onClick={handleSignOut}>
                  <LogOut size={16} /> Sign Out
                </button>
              </div>
            </>
          ) : (
            <div className="dropdown-login">
              <p>You are not logged in.</p>
              <button className="login-btn" onClick={handleSignIn}>
                <LogIn size={16} /> Sign In
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProfileMenu;
