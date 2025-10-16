import React, { useState, useEffect } from "react";
import "./News.css";
import { AlertTriangle, CloudRain, Sun, Wind } from "lucide-react";

// Utility to get "time ago"
const timeAgo = (dateStr) => {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - date) / 1000); // seconds

  if (diff < 60) return `${diff} sec ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hr ago`;
  return `${Math.floor(diff / 86400)} day(s) ago`;
};

const News = () => {
  const [newsList, setNewsList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      // Simulated API fetch
      const data = [
        {
          title: "Severe Thunderstorm Warning in Dhaka",
          description:
            "Heavy rains and thunderstorms expected today. Stay indoors and avoid travel if possible.",
          type: "alert",
          date: "2025-10-11T08:30:00",
        },
        {
          title: "Sunny Weather in Chittagong",
          description:
            "Clear skies and sunny conditions expected throughout the day. Perfect weather for outdoor activities.",
          type: "sunny",
          date: "2025-10-11T07:00:00",
        },
        {
          title: "Windy Conditions in Sylhet",
          description:
            "Expect strong gusts of wind up to 40 km/h in Sylhet region. Secure loose objects outdoors.",
          type: "wind",
          date: "2025-10-11T06:45:00",
        },
        {
          title: "Rain Alert in Barishal",
          description:
            "Light to moderate rain expected, carry umbrellas if going outside. Possible waterlogging in low areas.",
          type: "rain",
          date: "2025-10-11T05:20:00",
        },
      ];
      setNewsList(data);
      setLoading(false);
    };

    fetchNews();
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case "alert":
        return <AlertTriangle size={28} color="#ff4d4f" />;
      case "rain":
        return <CloudRain size={28} color="#1890ff" />;
      case "sunny":
        return <Sun size={28} color="#fadb14" />;
      case "wind":
        return <Wind size={28} color="#73d13d" />;
      default:
        return <Sun size={28} />;
    }
  };

  const getBadge = (type) => {
    switch (type) {
      case "alert":
        return "Alert";
      case "rain":
        return "Rain";
      case "sunny":
        return "Sunny";
      case "wind":
        return "Windy";
      default:
        return "Info";
    }
  };

  return (
    <section className="news-section">
      <h2 className="news-title">Weather News & Alerts</h2>

      {loading ? (
        <p className="news-empty">Loading news...</p>
      ) : newsList.length === 0 ? (
        <p className="news-empty">No news available at the moment.</p>
      ) : (
        <div className="news-grid">
          {newsList.map((news, index) => (
            <div
              key={index}
              className="news-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="news-icon">{getIcon(news.type)}</div>
              <div className="news-content">
                <span className={`news-badge ${news.type}`}>{getBadge(news.type)}</span>
                <h3 className="news-heading">{news.title}</h3>
                <p className="news-desc">{news.description}</p>
                <p className="news-date">{timeAgo(news.date)}</p>
                <a href="#" className="news-readmore">Read More →</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default News;
