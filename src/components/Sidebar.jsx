import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const categories = ["World", "Politics", "Business", "Tech", "Sports", "Entertainment"];

  return (
    <>
     
      <button className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
        ☰
      </button>

      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <h2 className="sidebar-title">Categories</h2>
        <ul className="sidebar-list">
          {categories.map((cat) => (
            <li key={cat} onClick={() => setIsOpen(false)}>
              <Link to={`/category/${cat.toLowerCase()}`}>{cat}</Link>
            </li>
          ))}
        </ul>
        <div className="sidebar-footer">
          <Link to="/about" onClick={() => setIsOpen(false)}>About</Link>
        </div>
      </aside>
    </>
  );
}

