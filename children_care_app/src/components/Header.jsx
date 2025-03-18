import React from "react";
import "../styles/Home.css"; // Style riêng cho Header

const Header = () => {
  return (
    <header className="header">
      <div className="logo">Children Care</div>
      <nav className="nav">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
        <a href="/about">About</a>
      </nav>
    </header>
  );
};

export default Header;