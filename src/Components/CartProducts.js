import React from "react";
import Button from "react-bootstrap/Button";
import { useCart } from "./CartContext";

function CartProducts({ cartData, removeFromCart, updateQuantity }) {
  const { clearCart } = useCart();
  // Check if the cart is empty, and display a message if it is
  if (!cartData || cartData.length === 0) {
    return (
      <div>
        <p>Your cart is empty.</p>
      </div>
    );
  }
  const handleCheckout = () => {
    if (cartData.length > 0) {
      alert(
        "Thank you for your order! We are processing it and we'll notify you shortly."
      );
      clearCart();
    } else {
      alert("Your cart is empty. Add items before checking out.");
    }
  };

  // Calculate the total price for all items in the cart
  const totalCartPrice = cartData.reduce((total, product) => {
    return total + product.price * product.quantity;
  }, 0);

  return (
    <div>
      <table className="cart-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterate through the items in the cart and display them in a table */}
          {cartData.map((product) => (
            <tr key={product.id}>
              <td>
                <div className="cart-product-info">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="cart-product-image"
                  />
                  <h4>{product.name}</h4>
                </div>
              </td>
              <td>
                <div className="cart-product-quantity">
                  {/* Buttons to increment and decrement the quantity of items in the cart */}
                  <button
                    className="quantity-button"
                    onClick={() => updateQuantity(product, -1)}
                  >
                    -
                  </button>
                  {product.quantity}
                  <button
                    className="quantity-button"
                    onClick={() => updateQuantity(product, 1)}
                  >
                    +
                  </button>
                </div>
              </td>
              <td>
                Price: ksh.{(product.price * product.quantity).toFixed(2)}
              </td>
              <td>
                {/* Button to remove the item from the cart */}
                <Button
                  variant="danger"
                  className="cart-product-button"
                  onClick={() => removeFromCart(product)}
                >
                  Remove
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="total-price">
        Total Price: ksh {totalCartPrice.toFixed(2)}
      </div>
      <Button
        variant="success"
        className="checkout-button"
        onClick={handleCheckout}
      >
        Checkout
      </Button>
    </div>
  );
}

export default CartProducts;
