import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import NewsCard from "../components/NewsCard";
import Loader from "../components/Loader";
import { generateNews } from "../utils/generateNews";

export default function Category() {
  const { name } = useParams();
  const [newsFeed, setNewsFeed] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    const timeout = setTimeout(() => {
      const categoryNews = Array.from({ length: 6 }, () =>
        generateNews()
      ).filter((item) => item.category.toLowerCase() === name.toLowerCase());
      
      setNewsFeed(categoryNews.length ? categoryNews : Array.from({ length: 6 }, () => generateNews()));
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [name]);

  if (loading) return <Loader />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">{name.toUpperCase()} News</h1>
      {newsFeed.map((item) => (
        <NewsCard key={item.id} news={item} />
      ))}
    </div>
  );
}
