// CoffeeList.js
import React from "react";
import coffeeData from "../db.json";
import { useCart } from "./CartContext"; // Import useCart from the CartContext

function CoffeeList({ searchTerm }) {
  const { addToCart } = useCart(); // Use the useCart hook

  const filteredCoffee = coffeeData.coffee.filter((coffee) =>
    coffee.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="coffee-list" id="coffee-list">
      {filteredCoffee.map((coffee) => (
        <div className="coffee-item" key={coffee.id}>
          <img src={coffee.image} alt={coffee.title} />
          <h3>{coffee.title}</h3>
          <p>ksh. {coffee.price}</p>
          <p>{coffee.description}</p>
          <button
            className="add-to-cart-button"
            onClick={() => addToCart(coffee)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}

export default CoffeeList;
