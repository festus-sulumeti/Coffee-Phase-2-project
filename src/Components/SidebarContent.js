// SidebarContent.js
import React from "react";
import NavLinks from "./NavLinks";
import CartProducts from "./CartProducts";
import { useCart } from "./CartContext"; // Import useCart from the CartContext

function SidebarContent() {
  const { cartData, removeFromCart, updateQuantity } = useCart(); // Use the useCart hook

  return (
    <div className="sidebar-content">
      <h2>
        Walisa Coffee Shop <i className="uil uil-coffee"></i>
      </h2>
      <div>
        <NavLinks />
      </div>

      <p>Discover our finest coffee collection</p>

      {/* View Cart */}
      <div className="view-cart">
        <CartProducts
          cartData={cartData}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
      </div>

      {/* User Profile (Assuming user authentication) */}
      <div className="user-profile">
        <img src="user_profile_image_url" alt="User Profile" />
        <p>Welcome, User123!</p>
      </div>

      {/* Promotions */}
      <div className="promotions">
        <h3>Current Promotions</h3>
        <p>Buy one get one free on Fridays!</p>
      </div>

      {/* Quick Links */}
      <div className="quick-links">
        <h3>Reviews</h3>
        <ul>
          <li>
            <a href="#contact">Contact Us</a>
          </li>
          <li>
            <a href="#reviews">Customer Reviews</a>
          </li>
          {/* Add more quick links as needed */}
        </ul>
      </div>

      {/* Newsletter Signup */}
      <div className="newsletter">
        <h3>Subscribe to Our Newsletter</h3>
        <form>
          <label>Email:</label>
          <input type="email" placeholder="Enter your email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>

      {/* Event Calendar */}
      <div className="event-calendar">
        <h3>Upcoming Events</h3>
        {/* Add your event details and calendar here */}
      </div>

      {/* Social Media Links */}
      <div className="social-media">
        <h3>Connect with Us</h3>
        <div className="social-icons">
          {/* Add your social media icons and links */}
          <a href="facebook_link" target="_blank" rel="noopener noreferrer">
            <i className="uil uil-facebook-f"></i>
          </a>
          <a href="twitter_link" target="_blank" rel="noopener noreferrer">
            <i className="uil uil-twitter"></i>
          </a>
          <a href="instagram_link" target="_blank" rel="noopener noreferrer">
            <i className="uil uil-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default SidebarContent;
