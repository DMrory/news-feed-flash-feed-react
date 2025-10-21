import React from "react";

export default function NewsCard({ news }) {
  return (
    <div className="border-b border-gray-200 py-4">
      <h2 className="text-lg font-semibold">{news.title}</h2>
      <p className="text-sm text-gray-600 mb-1">{news.category}</p>
      <p className="text-gray-800">{news.content}</p>
      <small className="text-gray-500">{news.time}</small>
    </div>
  );
}
