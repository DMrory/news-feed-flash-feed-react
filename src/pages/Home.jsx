import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import NewsCard from "../components/NewsCard";
import LoadingSkeleton from "../components/LoadingSkeleton";
import { generateNews } from "../utils/generateNews";
import "./Home.css";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [category, setCategory] = useState("technology");
  const [lastUpdated, setLastUpdated] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false); // 🌟 animation flag

  const NEWS_API_KEY = import.meta.env.VITE_NEWS_API_KEY;
  const API_URL = "https://newsapi.org/v2/top-headlines";

  const categories = [
    "technology",
    "business",
    "sports",
    "health",
    "science",
    "entertainment",
    "world",
  ];

  // 📰 Fetch news with fallback + timestamp
  const fetchNews = useCallback(
    async (selectedCategory, showRefresh = false) => {
      try {
        if (showRefresh) setIsRefreshing(true);
        setLoading(!showRefresh); // Don't show skeleton on auto-refresh
        setError(null);

        let liveArticles = [];

        if (NEWS_API_KEY) {
          const { data } = await axios.get(API_URL, {
            params: {
              country: "us",
              category: selectedCategory,
              pageSize: 20,
              apiKey: NEWS_API_KEY,
            },
          });

          if (data.status === "ok" && data.articles.length > 0) {
            liveArticles = data.articles
              .filter((a) => a.urlToImage)
              .map((a, i) => ({
                id: a.url || i,
                title: a.title || "Untitled Article",
                content:
                  a.description ||
                  a.content ||
                  "Click to read the full story.",
                category:
                  selectedCategory.charAt(0).toUpperCase() +
                  selectedCategory.slice(1),
                image: a.urlToImage,
                time: new Date(a.publishedAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                }),
                source: a.source?.name || "Unknown Source",
                url: a.url || "#",
              }));
          }
        }

        if (liveArticles.length === 0) {
          console.warn("⚠️ Using mock data as fallback...");
          liveArticles = Array.from({ length: 8 }, generateNews).filter(
            (n) => n.category.toLowerCase() === selectedCategory.toLowerCase()
          );
        }

        // Remove duplicates
        const seen = new Set();
        const unique = liveArticles.filter((a) => {
          if (seen.has(a.title)) return false;
          seen.add(a.title);
          return true;
        });

        const shuffled = unique.sort(() => 0.5 - Math.random());
        setArticles(shuffled.slice(0, 8));

        // 🕒 Update timestamp
        setLastUpdated(
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      } catch (err) {
        console.error("❌ News fetch failed:", err);
        setError("Unable to load live news. Showing sample headlines instead.");

        const mock = Array.from({ length: 8 }, generateNews);
        setArticles(mock);

        setLastUpdated(
          new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })
        );
      } finally {
        setLoading(false);
        setTimeout(() => setIsRefreshing(false), 1000); // ⏳ end pulse after 1s
      }
    },
    [NEWS_API_KEY]
  );

  // 🔁 Initial + on category change
  useEffect(() => {
    fetchNews(category);
  }, [category, fetchNews]);

  // ⏰ Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(() => {
      fetchNews(category, true);
    }, 5 * 60 * 1000); // 5 minutes
    return () => clearInterval(interval);
  }, [category, fetchNews]);

  return (
    <div className="home-container">
      {/* 🧭 Category Bar */}
      <div className="category-bar">
        <h1 className="category-bar-title">
          📰 {category.charAt(0).toUpperCase() + category.slice(1)} Headlines
        </h1>

        <div className="category-buttons">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={cat === category ? "active" : ""}
            >
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* 🕒 Timestamp + Pulse */}
      {lastUpdated && (
        <p
          className={`last-updated ${isRefreshing ? "pulse" : ""}`}
          title="Auto-refreshes every 5 minutes"
        >
          Last updated at <strong>{lastUpdated}</strong>
        </p>
      )}

      {/* 📰 Feed */}
      {loading ? (
        <LoadingSkeleton />
      ) : error ? (
        <p className="status-text warning">{error}</p>
      ) : articles.length === 0 ? (
        <p className="status-text">No articles found for this category.</p>
      ) : (
        <div className="news-grid">
          {articles.map((news) => (
            <NewsCard key={news.id} news={news} />
          ))}
        </div>
      )}
    </div>
  );
}

