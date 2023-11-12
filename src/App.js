import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import CoffeeList from "./Components/CoffeeList";
import SearchBar from "./Components/SearchBar";
import Sidebar from "./Components/Sidebar";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import AboutUs from "./pages/AboutUs";

function App() {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartData, setCartData] = useState([]);

  const addToCart = (coffee) => {
    setCartData([...cartData, { ...coffee, quantity: 1 }]);
  };

  const removeFromCart = (productToRemove) => {
    setCartData(
      cartData.filter((product) => product.id !== productToRemove.id)
    );
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
    <Router>
      <div className="container">
        <div className="main-content">
          <header>
            <h1>
              <i className="uil uil-coffee"></i>Walisa React Coffee Shop
              <i className="uil uil-coffee"></i>
            </h1>
          </header>
          <SearchBar onSearch={setSearchTerm} />

          <Routes>
            <Route
              path="/"
              element={
                <>
                  {/* Pass the addToCart function to CoffeeList on all pages */}
                  <CoffeeList searchTerm={searchTerm} addToCart={addToCart} />
                </>
              }
            />
            <Route
              path="/Home"
              element={
                <>
                  <Home />
                </>
              }
            />
            <Route
              path="/Menu"
              element={
                <>
                  <Menu />
                </>
              }
            />
            <Route
              path="/AboutUs"
              element={
                <>
                  <AboutUs />
                </>
              }
            />
          </Routes>
        </div>
        <Sidebar
          cartData={cartData}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
      </div>
    </Router>
  );
}

export default App;
