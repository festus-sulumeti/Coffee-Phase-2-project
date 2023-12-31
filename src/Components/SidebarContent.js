// SidebarContent.js
import React, { useState, useEffect } from "react";
import NavLinks from "./NavLinks";
import CartProducts from "./CartProducts";
import { useCart } from "./CartContext"; // Import useCart from the CartContext
import Calendar from 'react-calendar';


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
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isCustomerSupportOpen, setCustomerSupportOpen] = useState(false);
  const [isLoyaltyProgramOpen, setLoyaltyProgramOpen] = useState(false);
  const [isCollaborationsOpen, setCollaborationsOpen] = useState(false);


  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);

    // The logic for handling the selected date
    console.log(`Selected date: ${date.toDateString()}`);
    
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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribe button clicked!');
  };

  const openCustomerSupport = () => {
    setCustomerSupportOpen(true);
    setLoyaltyProgramOpen(false);
  };

  const openLoyaltyProgram = () => {
    setLoyaltyProgramOpen(true);
    setCustomerSupportOpen(false);
  };

  const closeSections = () => {
    setCollaborationsOpen(false);
    setCustomerSupportOpen(false);
    setLoyaltyProgramOpen(false);
  };
  
 

  const openCollaborations = () => {
    setCollaborationsOpen(true);
    setCustomerSupportOpen(false);
    setLoyaltyProgramOpen(false);
  };



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
      <hr />

      <div className="discover-coffee">
        
        <h3>☕ Discover Our Finest Coffee Collection</h3>
        <p className="collection-description">
          Elevate your coffee experience with our carefully curated selection of premium coffee beans.
          From rich and bold to light and aromatic, we have the perfect brew for every coffee lover.
          Explore the world of flavors at Walisa Coffee Shop.
        </p>
        <img
          src="https://i.pinimg.com/236x/7b/13/bf/7b13bf8d94300f5bf919b2d11abde1fe.jpg"
          alt="Coffee Beans"
          className="secondary-coffee-image"
        />
        <p className="create">
          Immerse yourself in the artistry of our coffee beans. Each sip is a journey, a symphony of
          flavors that dance on your palate. Our beans are a celebration of craftsmanship, cultivated
          with passion and roasted to perfection. At Walisa Coffee Shop, every cup tells a story.
        </p>
      </div>

      {/* View Cart */}
      <div className="view-cart">
        <CartProducts
          cartData={cartData}
          removeFromCart={removeFromCart}
          updateQuantity={updateQuantity}
        />
      </div>
      <hr />

      <div className="promotions">
        <h3>🌟 Special Offers</h3>
        <div className="promotion-details">
            <img
              src="https://i.pinimg.com/236x/99/96/5c/99965c23c053d8e6ee6b08bc8036afe5.jpg"
              alt="Special Offer"
              className="promotion-image"
            />
            <p className="offer-title">Buy one, get one FREE!</p>
            <p className="offer-description">
              Enjoy our exquisite coffee collection every Friday. Purchase one coffee, and get another
              one for free! It's a perfect way to share the joy of coffee with a friend.
            </p>
        </div>
      </div>

      {/* Membership or Loyalty Program */}
      <div className="section loyalty-program">
        <h3 onClick={openLoyaltyProgram}>🌟 Loyalty Program</h3>
        {isLoyaltyProgramOpen && (
          <div className="section-details">
            <p>Join our Loyalty Program and enjoy exclusive benefits:</p>
            <ul>
              <li>Points for every purchase</li>
              <li>Special discounts</li>
              <li>Early access to new products</li>
              <li>
                <button>Sign Up Now</button>
              </li>
            </ul>
          </div>
        )}
      </div>
      
      {/* Collaborations or Partnerships */}
      <div className="section collaborations">
        <h3 onClick={openCollaborations}>🤝 Collaborations & Partnerships</h3>
        {isCollaborationsOpen && (
          <div className="section-details">
            <p>Explore our exciting collaborations and partnerships:</p>
            <ul>
              <li>
                <strong>Brand X:</strong> Discover unique coffee blends in collaboration with Brand X.
              </li>
              <li>
                <strong>Local Artisans:</strong> Proud partners with local artisans providing handmade coffee accessories.
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Customer Support */}
      <div className="section customer-support">
        <h3 onClick={openCustomerSupport}>🛠️ Customer Support</h3>
        {isCustomerSupportOpen && (
          <div className="section-details">
            <p>Have a question? Check our FAQs or reach out to us:</p>
            <ul>
              <li>Email: support@walisacoffee.com</li>
              <li>Phone: +(254) 7456-7890</li>
              <li>
                <button>Live Chat</button>
              </li>
            </ul>
          </div>
        )}
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
          <h3>📬 Subscribe to Our Newsletter</h3>
          <p className="newsletter-description">
            Stay updated with our latest coffee blends, promotions, and events. Subscribe to our
            newsletter for a daily dose of coffee inspiration!
          </p>
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">Email:</label>
            <div className="input-container">
              <input type="email" id="email" name="email" placeholder="Enter your email" required />
              <button type="submit">Subscribe</button>
            </div>
          </form>
       </div>
      {/* Event Calendar */}
    {/* Event Calendar */}
    <div className="event-calendar">
      <h3>📅 Upcoming Events</h3>
      <div className="event-details">
        <div className="event-card">
          <div className="paper">
             <Calendar onChange={handleDateChange} value={selectedDate} />
          </div>
           
            
            <div className="event-info">
              <h4>Artisan Coffee Tasting</h4>
              <p className="event-date">Date: December 15, 2023</p>
              <p className="event-description">
                Join us for an exquisite coffee tasting experience featuring our latest artisan blends.
                Discover the nuances of each cup and immerse yourself in the world of coffee craftsmanship.
              </p>
          </div>
        </div>
        {/* Add more event cards as needed */}
      </div>
    </div>


      {/* Social Media Links */}
      <div className="social-media">
        <h3>Connect with Us</h3>
        <div className="social-icons">
          {/* Add your social media icons and links */}
          <a href="#facebook" rel="noopener noreferrer">
            <i className="uil uil-facebook-f"></i>
          </a>
          <a href="#twitter"  rel="noopener noreferrer">
            <i className="uil uil-twitter"></i>
          </a>
          <a href="#instagram" rel="noopener noreferrer">
            <i className="uil uil-instagram"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default SidebarContent;

