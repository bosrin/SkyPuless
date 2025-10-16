
import React, { useState, useEffect } from "react";
import "./Settings.css";

const Settings = () => {
  // Theme & Appearance
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [fontSize, setFontSize] = useState(localStorage.getItem("fontSize") || "medium");

  // Units
  const [tempUnit, setTempUnit] = useState(localStorage.getItem("tempUnit") || "C");
  const [windUnit, setWindUnit] = useState(localStorage.getItem("windUnit") || "km/h");

  // Notifications
  const [alertsEnabled, setAlertsEnabled] = useState(
    localStorage.getItem("alertsEnabled") === "false" ? false : true
  );
  const [dailySummary, setDailySummary] = useState(
    localStorage.getItem("dailySummary") === "true" ? true : false
  );
  const [summaryTime, setSummaryTime] = useState(localStorage.getItem("summaryTime") || "08:00");

  // Language
  const [language, setLanguage] = useState(localStorage.getItem("language") || "English");

  // Location
  const [defaultCity, setDefaultCity] = useState(localStorage.getItem("defaultCity") || "Dhaka");
  const [autoDetect, setAutoDetect] = useState(
    localStorage.getItem("autoDetect") === "false" ? false : true
  );

  // Apply theme & font dynamically
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem("theme", theme);
    localStorage.setItem("fontSize", fontSize);
    document.body.style.fontSize =
      fontSize === "small" ? "14px" : fontSize === "medium" ? "16px" : "18px";
  }, [theme, fontSize]);

  // Save all settings to localStorage
  useEffect(() => {
    localStorage.setItem("tempUnit", tempUnit);
    localStorage.setItem("windUnit", windUnit);
    localStorage.setItem("alertsEnabled", alertsEnabled);
    localStorage.setItem("dailySummary", dailySummary);
    localStorage.setItem("summaryTime", summaryTime);
    localStorage.setItem("language", language);
    localStorage.setItem("defaultCity", defaultCity);
    localStorage.setItem("autoDetect", autoDetect);
  }, [
    tempUnit,
    windUnit,
    alertsEnabled,
    dailySummary,
    summaryTime,
    language,
    defaultCity,
    autoDetect,
  ]);

  // Reset to default
  const resetDefaults = () => {
    setTheme("light");
    setFontSize("medium");
    setTempUnit("C");
    setWindUnit("km/h");
    setAlertsEnabled(true);
    setDailySummary(false);
    setSummaryTime("08:00");
    setLanguage("English");
    setDefaultCity("Dhaka");
    setAutoDetect(true);
  };

  return (
    <section className="settings-section">
      <h2 className="settings-title">Dashboard Settings</h2>

      {/* Theme & Appearance */}
      <div className="settings-card">
        <h3>Theme & Appearance</h3>
        <div className="settings-option">
          <label>Dark Mode:</label>
          <input
            type="checkbox"
            checked={theme === "dark"}
            onChange={() => setTheme(theme === "light" ? "dark" : "light")}
          />
        </div>
        <div className="settings-option">
          <label>Font Size:</label>
          <select value={fontSize} onChange={(e) => setFontSize(e.target.value)}>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
          </select>
        </div>
      </div>

      {/* Units */}
      <div className="settings-card">
        <h3>Units & Measurement</h3>
        <div className="settings-option">
          <label>Temperature:</label>
          <select value={tempUnit} onChange={(e) => setTempUnit(e.target.value)}>
            <option value="C">Celsius (°C)</option>
            <option value="F">Fahrenheit (°F)</option>
            <option value="K">Kelvin (K)</option>
          </select>
          <span className="unit-preview">{tempUnit === "C" ? "25°C" : tempUnit === "F" ? "77°F" : "298K"}</span>
        </div>
        <div className="settings-option">
          <label>Wind Speed:</label>
          <select value={windUnit} onChange={(e) => setWindUnit(e.target.value)}>
            <option value="km/h">km/h</option>
            <option value="mph">mph</option>
            <option value="m/s">m/s</option>
          </select>
          <span className="unit-preview">{windUnit === "km/h" ? "10 km/h" : windUnit === "mph" ? "6 mph" : "2.7 m/s"}</span>
        </div>
      </div>

      {/* Notifications */}
      <div className="settings-card">
        <h3>Notifications</h3>
        <div className="settings-option">
          <label>Severe Weather Alerts:</label>
          <input
            type="checkbox"
            checked={alertsEnabled}
            onChange={() => setAlertsEnabled(!alertsEnabled)}
          />
        </div>
        <div className="settings-option">
          <label>Daily Summary:</label>
          <input
            type="checkbox"
            checked={dailySummary}
            onChange={() => setDailySummary(!dailySummary)}
          />
        </div>
        {dailySummary && (
          <div className="settings-option">
            <label>Summary Time:</label>
            <input
              type="time"
              value={summaryTime}
              onChange={(e) => setSummaryTime(e.target.value)}
            />
          </div>
        )}
      </div>

      {/* Language */}
      <div className="settings-card">
        <h3>Language</h3>
        <div className="settings-option">
          <label>Select Language:</label>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option>English</option>
            <option>Bangla</option>
            <option>Spanish</option>
            <option>French</option>
          </select>
        </div>
      </div>

      {/* Location */}
      <div className="settings-card">
        <h3>Location</h3>
        <div className="settings-option">
          <label>Default City:</label>
          <input
            type="text"
            value={defaultCity}
            onChange={(e) => setDefaultCity(e.target.value)}
          />
        </div>
        <div className="settings-option">
          <label>Auto-Detect Location:</label>
          <input
            type="checkbox"
            checked={autoDetect}
            onChange={() => setAutoDetect(!autoDetect)}
          />
        </div>
      </div>

      {/* Reset */}
      <div className="settings-card">
        <button className="settings-reset-btn" onClick={resetDefaults}>
          Reset to Defaults
        </button>
      </div>
    </section>
  );
};

export default Settings;
