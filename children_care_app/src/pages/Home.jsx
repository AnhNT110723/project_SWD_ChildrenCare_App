import React from "react";
import { Link } from "react-router-dom"; // Import Link
import "../styles/Home.css"; // File CSS riêng cho trang Home

const Home = () => {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Children Care</h1>
        <p>
          An online platform to track and care for your children’s health with
          ease. Supporting parents, medical staff, and managers for a healthier
          future.
        </p>
        <button className="cta-button">Get Started</button>
      </section>

      {/* Features Section */}
      <section className="features">
        <h2>Our Features</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3>For Guests</h3>
            <p>
              Explore our services and learn how we can help even if you're not
              registered yet.
            </p>
          </div>
          <Link to="/reservation" className="feature-item">
            <div>
              <h3>For Customers</h3>
              <p>Book appointments and track your child's health.</p>
            </div>
          </Link>
          <div className="feature-item">
            <h3>For Staff (Doctors & Nurses)</h3>
            <p>
              Manage patient check-ups, update health records, and provide
              expert care.
            </p>
          </div>
          <div className="feature-item">
            <h3>For Managers</h3>
            <p>
              Oversee medical center operations, staff activities, and service
              quality.
            </p>
          </div>
          <div className="feature-item">
            <h3>For Admins</h3>
            <p>
              Control the entire system, manage users, and ensure smooth
              operations.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
