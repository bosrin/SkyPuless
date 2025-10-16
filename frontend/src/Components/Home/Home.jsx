import React, { useState, useEffect } from "react";
import "./Home.css";
import Dashboard from "../Dashboard/Dashboard";

const Home = () => {
  const [searchCity, setSearchCity] = useState("Dhaka");
  const [inputCity, setInputCity] = useState("");
  const [theme, setTheme] = useState("light");

  // Sync theme from body class (set by Navbar)
  useEffect(() => {
    const currentTheme = document.body.className || "light";
    setTheme(currentTheme);

    // Optional: Listen for theme changes in real-time
    const observer = new MutationObserver(() => {
      setTheme(document.body.className);
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const handleSearch = () => {
    if (inputCity.trim()) {
      setSearchCity(inputCity.trim());
      setInputCity("");
    }
  };

  return (
    <main id="home" className={`home ${theme}`}>
      <header className="home__header">
        <h1 className="home__title">
          Welcome to <span className="home__highlight">SkyPules</span> 🌦️☁️
        </h1>
        <p className="home__subtitle">
          Check live weather in your city or upazila!
        </p>

        <div className="home__search">
          <input
            type="text"
            placeholder="Enter city/upazila..."
            value={inputCity}
            onChange={(e) => setInputCity(e.target.value)}
            className="home__input"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button onClick={handleSearch} className="home__button">
            Search
          </button>
        </div>
      </header>

      <section className="home__dashboard">
        <Dashboard city={searchCity} />
      </section>
    </main>
  );
};

export default Home;
