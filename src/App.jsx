
import './App.css'

import { Outlet } from 'react-router-dom';
import React from 'react';
import Navbar from './components/Navbar';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <h2>Movies</h2>
      <Outlet />
    </div>
  );
}

export default App
