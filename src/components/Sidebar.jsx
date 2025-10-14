import { Link, Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import About from '../pages/About';
import News from '../pages/News';
import Politics from '../pages/Politics';

export default function Sidebar() {
  return (
    <div className="sidebar-layout">
      <aside className="sidebar">
        <h1 className="logo">Flash Feed</h1>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/news">News</Link></li>
            <li><Link to="/politics">Politics</Link></li>
          </ul>
        </nav>
      </aside>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/politics" element={<Politics />} />
        </Routes>
      </main>
    </div>
  );
}

