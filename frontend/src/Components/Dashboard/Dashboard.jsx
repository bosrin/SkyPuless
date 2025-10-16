import React, { useState, useEffect } from "react";
import "./Dashboard.css";

const Dashboard = ({ city }) => {
  const API_KEY = "97bfa96f153a4b679fc124940251110";
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [hourly, setHourly] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!city) return;

    const fetchWeather = async () => {
      setLoading(true);
      setError("");
      try {
        // Fetch current weather + 7-day forecast
        const res = await fetch(
          `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${city}&days=7&aqi=no&alerts=no`
        );
        if (!res.ok) throw new Error("Failed to fetch weather data.");
        const data = await res.json();
        setWeather(data);
        setForecast(data.forecast.forecastday); // 7-day forecast
        setHourly(data.forecast.forecastday[0].hour); // today's hourly forecast
      } catch (err) {
        console.error(err);
        setError("Unable to fetch weather data. Please try again.");
        setWeather(null);
        setForecast([]);
        setHourly([]);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
  }, [city]);

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="dashboard">
      <h2 className="dashboard__title">Live Weather in {city || "Your City"}</h2>

      {loading && <p className="dashboard__loading">Loading weather data...</p>}
      {error && <p className="dashboard__error">{error}</p>}

      {weather && !loading && !error && (
        <>
          {/* Current Weather */}
          <div className="weather-card">
            <div className="weather-header">
              <h3>
                {weather.location.name}, {weather.location.country}
              </h3>
              <p>{new Date(weather.location.localtime).toDateString()}</p>
              <p>{weather.current.condition.text}</p>
            </div>

            <div className="weather-main">
              <img
                src={weather.current.condition.icon}
                alt={weather.current.condition.text}
                className="weather-icon"
              />
              <div className="temp-info">
                <h2>{weather.current.temp_c}°C</h2>
                <p>Feels like {weather.current.feelslike_c}°C</p>
              </div>
            </div>

            <div className="weather-stats">
              <p>Humidity: {weather.current.humidity}%</p>
              <p>Wind: {weather.current.wind_kph} km/h</p>
              <p>Precipitation: {weather.current.precip_mm} mm</p>
            </div>
          </div>

          {/* Hourly Forecast */}
          <h3 className="forecast-title">Hourly Forecast</h3>
          <div className="hourly-forecast">
            {hourly.map((hour) => (
              <div key={hour.time} className="hour-card">
                <p>{formatTime(hour.time)}</p>
                <img
                  src={hour.condition.icon}
                  alt={hour.condition.text}
                  className="hour-icon"
                />
                <p>{hour.temp_c}°C</p>
              </div>
            ))}
          </div>

          {/* 7-Day Forecast */}
          <h3 className="forecast-title">7-Day Forecast</h3>
          <div className="forecast-container">
            {forecast.map((day) => (
              <div key={day.date} className="forecast-card">
                <p className="forecast-date">{day.date}</p>
                <img
                  src={day.day.condition.icon}
                  alt={day.day.condition.text}
                  className="forecast-icon"
                />
                <p>{day.day.condition.text}</p>
                <p>Max: {day.day.maxtemp_c}°C | Min: {day.day.mintemp_c}°C</p>
                <p>Humidity: {day.day.avghumidity}%</p>
                <p>Precipitation: {day.day.totalprecip_mm} mm</p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
