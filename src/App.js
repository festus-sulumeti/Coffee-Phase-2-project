// App.js
import React, { useState } from 'react';
import './App.css';
import CoffeeList from './Components/CoffeeList';
import SearchBar from './Components/SearchBar';
import Sidebar from './Components/Sidebar';

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cartData, setCartData] = useState([]);

  const addToCart = (coffee) => {
    setCartData([...cartData, { ...coffee, quantity: 1 }]);
  };

  const removeFromCart = (productToRemove) => {
    setCartData(cartData.filter((product) => product.id !== productToRemove.id));
  };

  const updateQuantity = (product, quantityChange) => {
    const updatedCart = cartData.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: item.quantity + quantityChange };
      }
      return item;
    });
    setCartData(updatedCart);
  };

  return (
    <div className="container">
      <div className="main-content">
        <header>
          <h1>
            <i className="uil uil-coffee"></i>Walisa React Coffee Shop<i className="uil uil-coffee"></i>
          </h1>
        </header>
        <SearchBar onSearch={setSearchTerm} />
        {/* Pass the addToCart function to CoffeeList */}
        <CoffeeList searchTerm={searchTerm} addToCart={addToCart} />
      </div>
      <Sidebar cartData={cartData} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
    </div>
  );
}

export default App;
