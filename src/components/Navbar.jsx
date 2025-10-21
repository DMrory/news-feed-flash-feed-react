import React, { useEffect, useState } from "react";
import "./Navbar.css";

export default function Navbar({ onSearch, onCategorySelect }) {
  const [time, setTime] = useState(new Date().toLocaleTimeString());
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("trending");

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchSubmit = () => {
    if (query.trim() !== "") {
      onSearch(query.trim());
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleSearchSubmit();
  };

  const handleCategoryChange = (e) => {
    const selected = e.target.value;
    setCategory(selected);
    onCategorySelect(selected);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="logo">📰 FlashFeed</h1>
      </div>

      
      <div className="navbar-center">
        <select
          className="category-select"
          value={category}
          onChange={handleCategoryChange}
        >
          <option value="trending"> Trending</option>
          <option value="world"> World</option>
          <option value="business">Business</option>
          <option value="technology">Technology</option>
          <option value="sports"> Sports</option>
          <option value="entertainment">Entertainment</option>
          <option value="health">Health</option>
          <option value="science"> Science</option>
        </select>

        <input
          type="text"
          placeholder="Search latest headlines..."
          value={query}
          onChange={handleSearchChange}
          onKeyDown={handleKeyDown}
          className="search-input"
        />

        <button className="send-btn" onClick={handleSearchSubmit}>
           Send
        </button>
      </div>

     
      <div className="navbar-right">
        <span className="time">{time}</span>
        <button className="refresh-btn" onClick={() => window.location.reload()}>
          ⟳ Refresh
        </button>
        <button
          className="clear-btn"
          onClick={() => {
            localStorage.removeItem("flashfeed-news");
            window.location.reload();
          }}
        >
        
        </button>
      </div>
    </nav>
  );
}


