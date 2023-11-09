import React, { useState } from 'react';
import './App.css';
import CoffeeList from './Components/CoffeeList';
import SearchBar from './Components/SearchBar';
import Sidebar from './Components/Sidebar';

function App() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="container">
      <div className="main-content">
        <header>
          <h1>
            <i className="uil uil-coffee"></i>Walisa React Coffee Shop<i className="uil uil-coffee"></i>
          </h1>
        </header>
        <SearchBar onSearch={setSearchTerm} />
        <CoffeeList searchTerm={searchTerm} />
      </div>
      <Sidebar />
    </div>
  );
}

export default App;