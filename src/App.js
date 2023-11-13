import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";
import CoffeeList from "./Components/CoffeeList";
import SearchBar from "./Components/SearchBar";
import Sidebar from "./Components/Sidebar";

import ContactUs from "./pages/ContactUs";
import AdminPage from "./pages/AdminPage";

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

  //app.js contact us
  //where our messages will be stored
  const [userMessage, setUserMessage] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [usersDetails, setUserDetails] = useState([]);
  //fetching data from db.json that will be viewed by the admin .. we will send this data as a prop to the admin page
  //url for the fetch
  const contactsUrl = "http://localhost:4000/user";

  useEffect(() => {
    fetch(contactsUrl)
      .then((res) => res.json())
      .then((data) => setUserDetails(data))
      .catch((err) => console.log("error fetching the messages", err));
  });

  //console.log(usersDetails);

  //handling change of inputs when users adds information or comments
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    //updating userMessage with values user inputs
    setUserMessage({ ...userMessage, [name]: value });
  };

  // will be passed as a prop to the page where submition will be done so that when user submits messages they will be posted to our json
  //creating a post request
  const handleSubmit = (e) => {
    //preventing default behaviour of the browser during submition
    e.preventDefault();
    // Create a new message object from userMessage
    //postting user inputs to db.json
    fetch(contactsUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userMessage),
    })
      .then((res) => res.json())
      .then((user) => {
        // Updating userMessage as an object
        setUserMessage({
          name: "",
          email: "",
          message: "",
        });
        //alerting the user that their messages have been sent
        alert("Message sent successfully");
      })
      .catch((err) => console.log("error posting the user", err));
  };
  // console.log(userMessage);

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
                <CoffeeList searchTerm={searchTerm} addToCart={addToCart} />
              }
            />
            <Route
              path="/CoffeeList"
              element={
                <CoffeeList searchTerm={searchTerm} addToCart={addToCart} />
              }
            />
            <Route
              path="/ContactUs"
              element={
                <ContactUs
                  userMessage={userMessage}
                  handleInputChange={handleInputChange}
                  handleSubmit={handleSubmit}
                />
              }
            />
            <Route
              path="/AdminPage"
              element={<AdminPage usersDetails={usersDetails} />}
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
