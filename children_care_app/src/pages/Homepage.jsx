import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/Homepage.css"; // Import CSS

const Homepage = () => {
  const [homeData, setHomeData] = useState({
    sliders: [],
    hotPosts: [],
    featuredServices: [],
    latestPosts: [],
  });

  useEffect(() => {
    axios
      .get("http://localhost:5190/api/home")
      .then((response) => {
        console.log("API Response:", response.data); // In dữ liệu nhận được
        setHomeData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching home data:", error);
      });
  }, []);

  return (
    <div className="homepage">
      <main className="main-content">
        {/* Sliders Section */}
        <section className="sliders">
          <h2>Featured Sliders</h2>
          <div className="slider-container">
            {homeData.sliders.map((slider) => (
              <a
                key={slider.id}
                href={slider.backlink}
                target="_blank"
                rel="noopener noreferrer"
                className="slider-item"
              >
                <img src={slider.image} alt={slider.title} />
                <h3>{slider.title}</h3>
              </a>
            ))}
          </div>
        </section>

        {/* Hot Posts Section */}
        <section className="hot-posts">
          <h2>Hot Posts</h2>
          <div className="posts-container">
            {homeData.hotPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="post-card">
                <img src={post.thumbnail || "placeholder.jpg"} alt={post.title} />
                <h3>{post.title}</h3>
                <p>{post.briefInfo}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Featured Services Section */}
        <section className="featured-services">
          <h2>Featured Services</h2>
          <div className="services-container">
            {homeData.featuredServices.map((service) => (
              <Link key={service.id} to={`/service/${service.id}`} className="service-card">
                <img src={service.thumbnail || "placeholder.jpg"} alt={service.name} />
                <h3>{service.name}</h3>
                <p>{service.briefInfo}</p>
                <p>
                  Price: ${service.salePrice ? service.salePrice : service.price}
                  {service.salePrice && (
                    <span className="original-price">${service.price}</span>
                  )}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Sidebar */}
        <aside className="sidebar">
          <h2>Latest Posts</h2>
          <div className="latest-posts">
            {homeData.latestPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.id}`} className="latest-post">
                <img src={post.thumbnail || "placeholder.jpg"} alt={post.title} />
                <div className="post-info">
                  <h4>{post.title}</h4>
                  <p>{post.briefInfo}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className="static-links">
            <h3>Contact Us</h3>
            <p>Email: info@childcare.com</p>
            <p>Phone: 123-456-7890</p>
            <Link to="/about">About Us</Link>
          </div>
        </aside>
      </main>
    </div>
  );
};

export default Homepage;