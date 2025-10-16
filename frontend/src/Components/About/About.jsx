
import React from "react";
import "./About.css"; 
const About = () => {
  const featuresList = [
    {
      title: "Live Weather Updates",
      description:
        "Provides real-time, accurate forecasts for your selected city, including temperature, humidity, wind speed, and precipitation.",
    },
    {
      title: "Hourly & 7-Day Forecast",
      description:
        "View upcoming hourly changes or a detailed 7-day outlook to plan your week ahead with ease.",
    },
    {
      title: "City Search & Geolocation",
      description:
        "Search for any city worldwide or use your current location to instantly see weather updates.",
    },
    {
      title: "Dynamic UI & Weather Adaptation",
      description:
        "The interface adapts to weather types with dynamic colors and icons, making it visually intuitive.",
    },
    {
      title: "Interactive Charts",
      description:
        "Advanced features include precipitation charts, temperature trend graphs, and interactive forecast cards.",
    },
    {
      title: "Responsive & Modern Design",
      description:
        "Fully responsive for mobile, tablet, and desktop, with clean typography, spacing, and modern styling.",
    },
    {
      title: "Dark Mode & Animations",
      description:
        "Enhances user experience with dark mode and animated weather icons for a sleek, professional feel.",
    },
  ];

  return (
    <section className="features-section">
      <h2 className="features-title">Dashboard Features</h2>
      <p className="features-intro">
        Our Weather Dashboard combines accuracy, interactivity, and modern design to deliver a professional user experience.
      </p>
      <div className="features-grid">
        {featuresList.map((feature, index) => (
          <div key={index} className="feature-card">
            <h3 className="feature-card-title">{feature.title}</h3>
            <p className="feature-card-desc">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default About;
