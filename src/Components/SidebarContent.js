// SidebarContent.js
import React, { useState } from "react";
import NavLinks from "./NavLinks";
import CartProducts from "./CartProducts";
import { useCart } from "./CartContext"; // Import useCart from the CartContext

function SidebarContent() {
  const { cartData, removeFromCart, updateQuantity } = useCart(); // Use the useCart hook
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ name: '', comment: '', rating: 0, profilePic: '' });
  const [replyText, setReplyText] = useState('');
  const [replyingTo, setReplyingTo] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewReview((prevReview) => ({ ...prevReview, [name]: value }));
  };

  const handleRatingChange = (newRating) => {
    setNewReview((prevReview) => ({ ...prevReview, rating: newRating }));
  };

  const handleAddReview = () => {
    setReviews([...reviews, { ...newReview, replies: [] }]);
    setNewReview({ name: '', comment: '', rating: 0, profilePic: '' });
  };

  const handleReply = (index) => {
    setReplyingTo(index);
  };

  const handleAddReply = (reviewIndex) => {
    const updatedReviews = [...reviews];
    updatedReviews[reviewIndex].replies = [
      ...(updatedReviews[reviewIndex].replies || []),
      { text: replyText, author: 'User123' }, // Assuming a fixed author for simplicity
    ];
    setReviews(updatedReviews);
    setReplyText('');
    setReplyingTo(null);
  };

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

