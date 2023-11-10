// Sidebar.js
import React from "react";
import SidebarContent from "./SidebarContent";
import CartProducts from "./CartProducts";
//import './side.css';

function Sidebar() {
  return (
    <div className="sidebar">
      <SidebarContent />
      <CartProducts
        cartData={cartData}
        removeFromCart={removeFromCart}
        updateQuantity={updateQuantity}
      />
    </div>
  );
}

export default Sidebar;
