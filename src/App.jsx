
import './App.css'
import { Link, Outlet } from 'react-router-dom';
import React from 'react';


function App() {
  return (
    <div className="App">
      <nav id='navbar'>
        <h2>
          <Link to="/">Movies</Link>
        </h2>
        <Link to="/movies/1">Movies</Link>
        <Link to="/search">Search</Link>
      </nav>
      <h2>Movies</h2>
      <Outlet />
    </div>
  );
}

export default App
