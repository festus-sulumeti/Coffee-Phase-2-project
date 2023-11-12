import React, { useState } from 'react';
import coffeeData from '../db.json';


function CoffeeList({ searchTerm }) {
  const [selectedItems, setSelectedItems] = useState([]);
  const [showCartPopup, setShowCartPopup] = useState(false);

  // Function to add a coffee item to the cart
  const addToCart = (coffee) => {
    setSelectedItems([...selectedItems, coffee]);
    setShowCartPopup(true);

    // Automatically hide the cart popup after 3 seconds
    setTimeout(() => {
      setShowCartPopup(false);
    }, 3000);
  };

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
                <button className="add-to-cart-button" onClick={() => addToCart(coffee)}>
                    Add to Cart
                </button>
        </div>
      ))}
      
    </div>
  );
}

export default CoffeeList;
