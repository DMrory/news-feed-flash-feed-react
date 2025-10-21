import React, { useEffect, useState } from "react";
import NewsCard from "../components/NewsCard";
import Navbar from "../components/Navbar";
import "./Home.css";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("trending");

  const API_KEY = import.meta.env.VITE_NEWS_API_KEY; 


  const fetchNews = async (endpoint) => {
    setLoading(true);
    try {
      const response = await fetch(endpoint);
      const data = await response.json();

      if (data.articles) {
        setArticles(data.articles);
        localStorage.setItem("flashfeed-news", JSON.stringify(data.articles));
      } else {
        setArticles([]);
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    const cached = localStorage.getItem("flashfeed-news");
    if (cached) {
      setArticles(JSON.parse(cached));
      setLoading(false);
    } else {
      fetchNews(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
      );
    }
  }, []);


  const handleSearch = (queryText) => {
    setQuery(queryText);
    if (queryText.trim() !== "") {
      fetchNews(
        `https://newsapi.org/v2/everything?q=${queryText}&sortBy=publishedAt&apiKey=${API_KEY}`
      );
    }
  };


  const handleCategorySelect = (selectedCategory) => {
    setCategory(selectedCategory);

    if (selectedCategory === "trending") {
      fetchNews(
        `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`
      );
    } else {
      fetchNews(
        `https://newsapi.org/v2/top-headlines?category=${selectedCategory}&country=us&apiKey=${API_KEY}`
      );
    }
  };

  return (
    <div className="home">
      <Navbar onSearch={handleSearch} onCategorySelect={handleCategorySelect} />

      <div className="content">
        {loading ? (
          <p className="loading">Loading latest news...</p>
        ) : articles.length > 0 ? (
          <div className="news-grid">
            {articles.map((article, index) => (
              <NewsCard key={index} article={article} />
            ))}
          </div>
        ) : (
          <p className="no-results">No news found. Try another search.</p>
        )}
      </div>
    </div>
  );
}


