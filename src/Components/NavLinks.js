// NavLinks.js
import React from 'react';
import { NavLink } from 'react-router-dom';

function NavLinks() {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          App
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav">
            <li className="nav-item">
              <NavLink
                to={"/CoffeeList"}
                className="nav-link active"
                aria-current="page"
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink to={"/ContactUs"} className="nav-link active">
                Contact us
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                to={"/AdminPage"}
                className="nav-link active"
                aria-current="page"
              >
                AdminPage
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default NavLinks;
