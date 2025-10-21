import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Home from "./pages/Home";
import Category from "./pages/Category";
import About from "./pages/About";
import "./index.css";

export default function App() {
  return (
      <div className="app flex">
        <Sidebar />
        <div className="main-content flex-1">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/category/:name" element={<Category />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
  );
}


