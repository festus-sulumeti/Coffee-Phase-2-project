// NavLinks.js
import React from 'react';
import { Link } from 'react-router-dom';

function NavLinks() {
  return (
    <div className="wrapper">
      <div className="wrrapper">
        {/* Navigation Links */}
        <Link to="/Home" target="_blank" rel="noopener noreferrer">
          Home
        </Link>
        <Link to="/Menu" target="_blank" rel="noopener noreferrer">
          Menu
        </Link>
        <Link to="/AboutUs" target="_blank" rel="noopener noreferrer">
          About Us
        </Link>
        
      </div>
    </div>
  );
}

export default NavLinks;
