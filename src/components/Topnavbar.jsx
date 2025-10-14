import React from 'react'
import { Link } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Weather from '../pages/Weather';
import News from '../pages/News';
import Sports from '../pages/Sports';
import More from '../pages/More';



export default function Topnavbar() {
  return (
    <div className='topnav-layout'>
        <aside className='topnav'>
            <h1 className='logo'>News Feed</h1>
            <nav>
                <ul>
                <li><Link to="/weather">Weather</Link></li>
                <li><Link to="/news">News</Link></li>
                <li><Link to="/sports">Sports</Link></li>
                <li><Link to="/more">more</Link></li>
            </ul>
        </nav>
        </aside>
        <main className='main-content'>
            <Routes>
                <Route path="/weather" element={<Weather />} />
                <Route path="/news" element={<News />} />
                <Route path="/sports" element={<Sports />} />
                <Route path="/more" element={<More />} />
            </Routes>
        </main>
    </div>
  );
}
