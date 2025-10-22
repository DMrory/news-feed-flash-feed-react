import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ onSearch, onCategorySelect }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("technology");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const categories = [
    "technology",
    "business",
    "sports",
    "entertainment",
    "health",
    "science",
  ];

  // 🔍 Handle search
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
      navigate("/"); // Redirect to home for search results
      setIsMenuOpen(false);
    }
  };

  // 🗂️ Handle category click
  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onCategorySelect(category);
    navigate(`/category/${category}`); // ✅ Always go to valid /category/:name
    setIsMenuOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo / Home Link */}
        <Link to="/" className="navbar-logo" onClick={() => setActiveCategory("technology")}>
          🗞️ NewsFeed
        </Link>

        {/* Mobile Menu Toggle */}
        <div
          className={`menu-toggle ${isMenuOpen ? "open" : ""}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        {/* Navigation Menu */}
        <div className={`nav-links ${isMenuOpen ? "show" : ""}`}>
          <ul className="category-list">
            {categories.map((category) => (
              <li
                key={category}
                className={activeCategory === category ? "active" : ""}
                onClick={() => handleCategoryClick(category)}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </li>
            ))}
          </ul>

          {/* Search Form */}
          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Search news..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>
    </nav>
  );
}

// ✅ PropTypes validation
Navbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onCategorySelect: PropTypes.func.isRequired,
};
