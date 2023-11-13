// SidebarContent.js
import React, { useState, useEffect } from "react";
import NavLinks from "./NavLinks";
import CartProducts from "./CartProducts";
import { useCart } from "./CartContext"; // Import useCart from the CartContext


function timeDifference(current, previous) {
  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = current - previous;

  if (elapsed < msPerMinute) {
    return Math.round(elapsed / 1000) + " seconds ago";
  } else if (elapsed < msPerHour) {
    return Math.round(elapsed / msPerMinute) + " minutes ago";
  } else if (elapsed < msPerDay) {
    return Math.round(elapsed / msPerHour) + " hours ago";
  } else if (elapsed < msPerMonth) {
    return "approximately " + Math.round(elapsed / msPerDay) + " days ago";
  } else if (elapsed < msPerYear) {
    return "approximately " + Math.round(elapsed / msPerMonth) + " months ago";
  } else {
    return "approximately " + Math.round(elapsed / msPerYear) + " years ago";
  }
}

function SidebarContent() {
  const { cartData, removeFromCart, updateQuantity } = useCart(); // Use the useCart hook
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', comment: '', rating: 0, profilePic: '' });
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({ ...prevReview, [name]: value }));
  };

  const handleRatingChange = (newRating) => {
    setNewReview((prevReview) => ({ ...prevReview, rating: newRating }));
  };

  const handleAddReview = () => {
    const currentTime = new Date().getTime(); // Get the current time
    setReviews([...reviews, { ...newReview, time: currentTime, replies: [] }]);
    setNewReview({ name: '', comment: '', rating: 0, profilePic: '' });
  };

  const handleReply = (index) => {
    setReplyingTo(index);
  };

  const handleAddReply = (reviewIndex) => {
    const currentTime = new Date().getTime(); // Get the current time
    const updatedReviews = [...reviews];
    updatedReviews[reviewIndex].replies = [
      ...(updatedReviews[reviewIndex].replies || []),
      { text: replyText, author: 'User123', time: currentTime }, // Assuming a fixed author for simplicity
    ];

    setReviews(updatedReviews);
    setReplyText('');
    setReplyingTo(null);
  };

  useEffect(() => {
    // Update time difference every minute
    const interval = setInterval(() => {
      setReviews((prevReviews) =>
        prevReviews.map((review) => ({
          ...review,
          timeAgo: timeDifference(new Date().getTime(), review.time),
          replies: review.replies.map((reply) => ({
            ...reply,
            timeAgo: timeDifference(new Date().getTime(), reply.time),
          })),
        }))
      );
    }, 60000); // 60000 milliseconds = 1 minute

    return () => clearInterval(interval);
  }, [reviews]);

  return (
    <div className="sidebar-content">
      {/* User Profile (Assuming user authentication) */}
      
      <div className="user-profile">
        <div className={`user-icon ${isDropdownOpen ? 'active' : ''}`} onClick={toggleDropdown}>
          <i className="uil uil-user-circle"></i>
          
          <i className={`uil uil-angle-down dropdown-icon ${isDropdownOpen ? 'rotate' : ''}`}></i>
        </div>
        {isDropdownOpen && (
          <div className="dropdown-content">
            <div className="dropdown-option" onClick={() => console.log('View Profile')}>
              <i className="uil uil-user"></i>
              <span>View Profile</span>
            </div>
            <div className="dropdown-option" onClick={() => console.log('Settings')}>
              <i className="uil uil-cog"></i>
              <span>Settings</span>
            </div>
            <div className="dropdown-option" onClick={() => console.log('Help')}>
              <i className="uil uil-question-circle"></i>
              <span>Help</span>
            </div>
            <div className="dropdown-option" onClick={() => console.log('Logout')}>
              <i className="uil uil-sign-out-alt"></i>
              <span>Logout</span>
            </div>
          </div>
        )}
      </div>
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

      
      {/* Promotions */}
      {/* <div className="promotions">
        <h3>Current Promotions</h3>
        <p>Buy one get one free on Fridays!</p>
      </div> */}

      <div className="promotions">
        <h3>🌟 Special Offers</h3>
        <div className="promotion-details">
            <p className="offer-title">Buy one, get one FREE!</p>
            <p className="offer-description">
              Enjoy our exquisite coffee collection every Friday. Purchase one coffee, and get another
              one for free! It's a perfect way to share the joy of coffee with a friend.
            </p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="quick-links">
        <h3>Reviews</h3>
        <ul>
          <div>
            {/* Review Section */}
            <div className="review-section">
              <h4>Add Your Review</h4>
              {/* An input for the profile picture */}
              <input
                type="text"
                placeholder="Profile Picture URL"
                name="profilePic"
                value={newReview.profilePic}
                onChange={handleInputChange}
              />
              <div className="horizontal-inputs">
              <input
                type="text"
                placeholder="Your Name"
                name="name"
                value={newReview.name}
                onChange={handleInputChange}
              />
              <textarea
                placeholder="Your Comment"
                name="comment"
                value={newReview.comment}
                onChange={handleInputChange}
              />
              </div>
              <div>
                <span>Rating:</span>
                {/* Display stars horizontally */}
                <div className="star-rating">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <span
                      key={index}
                      className={`star ${index < newReview.rating ? 'filled' : ''}`}
                      onClick={() => handleRatingChange(index + 1)}
                    >
                      &#9733;
                    </span>
                  ))}
                </div>
              </div>
              <button onClick={handleAddReview}>Add Review</button>
            </div>
            {/* Display Reviews */}
            <div className="reviews-list">
              {reviews.map((review, reviewIndex) => (
                <div key={reviewIndex} className="review-item">
                  <div>
                    <img
                      src={review.profilePic}
                      alt={`Profile Pic of ${review.name}`}
                      className="profile-pic"
                    />
                  </div>
                  <div>{review.name}</div>
                  <div>{review.timeAgo}</div>
                  <div>{review.comment}</div>
                  <div>
                    {/* Display stars horizontally */}
                    <div className="star-rating">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`star ${i < review.rating ? 'filled' : ''}`}
                        >
                          &#9733;
                        </span>
                      ))}
                    </div>
                  </div>
                  {/* Reply Section */}
                  <div className="reply-section">
                    <button onClick={() => handleReply(reviewIndex)}>
                      {replyingTo === reviewIndex ? 'Cancel Reply' : 'Reply'}
                    </button>
                    {replyingTo === reviewIndex && (
                      <>
                        <textarea
                          placeholder="Your Reply"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                        />
                        <button onClick={() => handleAddReply(reviewIndex)}>Add Reply</button>
                      </>
                    )}
                  </div>
                  {/* Display Replies */}
                  {review.replies &&
                    review.replies.map((reply, replyIndex) => (
                      <div key={replyIndex} className="reply-item">
                        <div>{reply.author}</div>
                        <div>{reply.timeAgo}</div>
                        <div>{reply.text}</div>
                      </div>
                    ))}
                </div>
              ))}
            </div>
          </div>
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

