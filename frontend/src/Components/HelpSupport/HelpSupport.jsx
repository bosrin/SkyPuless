import React, { useState } from "react";
import { LifeBuoy, Mail, BookOpen, Send } from "lucide-react";
import "./HelpSupport.css";

const HelpPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Form submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:5000/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to send feedback");
      }

      const data = await res.json();
      console.log("✅ Server Response:", data.message);

      setSubmitted(true);
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      console.error("❌ Error sending feedback:", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="help-container">
      <h1 className="help-title">
        <LifeBuoy size={30} /> Help & Support
      </h1>
      <p className="help-subtitle">
        Find answers, get help, or contact our support team.
      </p>

      {/* FAQ Section */}
      <section className="help-section">
        <h2><BookOpen size={20} /> Frequently Asked Questions</h2>
        <ul className="faq-list">
          <li>
            <strong>🌤️ How can I check the weather?</strong><br />
            Type your city or upazila name in the search bar and press “Search” to view live weather.
          </li>
          <li>
            <strong>🌗 How can I change the theme?</strong><br />
            Click the 🌞 / 🌙 icon on the Navbar to toggle between light and dark themes.
          </li>
          <li>
            <strong>👤 How do I sign in?</strong><br />
            Open the Profile menu and click “Sign In,” then enter your name to log in.
          </li>
          <li>
            <strong>🌧️ What if weather data doesn’t load?</strong><br />
            Please check your internet connection or try again later.
          </li>
        </ul>
      </section>

      {/* Contact Support Section */}
      <section className="help-section">
        <h2><Mail size={20} /> Contact Support</h2>
        {!submitted ? (
          <form className="help-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message..."
              value={formData.message}
              onChange={handleChange}
              rows="4"
              required
            />
            <button type="submit" className="help-submit" disabled={loading}>
              {loading ? "Sending..." : <><Send size={16} /> Send Message</>}
            </button>
            {error && <p className="error-text">❌ {error}</p>}
          </form>
        ) : (
          <p className="thankyou-text">
            ✅ Thank you for your message! Our team will get back to you soon.
          </p>
        )}
      </section>

      {/* User Guide Section */}
      <section className="help-section">
        <h2><BookOpen size={20} /> User Guide</h2>
        <ol className="guide-list">
          <li>🔎 Go to the Home page and type your city/upazila in the search bar.</li>
          <li>📊 View live weather, temperature, and forecasts on the Dashboard.</li>
          <li>⚙️ Change the theme (Light/Dark) from the Navbar.</li>
          <li>👤 Use the Profile menu to Sign In or Sign Out.</li>
        </ol>
      </section>
    </main>
  );
};

export default HelpPage;
