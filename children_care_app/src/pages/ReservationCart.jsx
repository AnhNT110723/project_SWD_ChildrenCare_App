import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Reservations/Cart.css"; // Import CSS

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:5190/api/cart")
      .then((response) => {
        const updatedCart = response.data.map((service) => ({
          ...service,
          totalCost: service.price * service.quantity * service.numberOfPersons,
        }));
        setCart(updatedCart);
        calculateTotalPrice(updatedCart);
      })
      .catch((error) => console.error("Error fetching cart data:", error));
  }, []);

  const calculateTotalPrice = (updatedCart) => {
    const total = updatedCart.reduce((sum, item) => sum + item.totalCost, 0);
    setTotalPrice(total);
  };

  const handleQuantityChange = (id, quantity) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, quantity, totalCost: item.price * quantity * item.numberOfPersons } : item
    );
    setCart(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  const handlePersonChange = (id, numberOfPersons) => {
    const updatedCart = cart.map((item) =>
      item.id === id ? { ...item, numberOfPersons, totalCost: item.price * item.quantity * numberOfPersons } : item
    );
    setCart(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  const handleRemoveService = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    calculateTotalPrice(updatedCart);
  };

  return (
    <div className="cart-page">
      <h1>Your Reservation Cart</h1>
      <div className="cart-container">
        <div className="cart-items">
          {cart.map((item) => (
            <div key={item.id} className="cart-item">
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <div className="quantity-control">
                <label>Quantity:</label>
                <input
                  type="number"
                  value={item.quantity}
                  min="1"
                  onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                />
              </div>
              <div className="person-control">
                <label>Persons:</label>
                <input
                  type="number"
                  value={item.numberOfPersons}
                  min="1"
                  onChange={(e) => handlePersonChange(item.id, parseInt(e.target.value))}
                />
              </div>
              <p>Total Cost: ${item.totalCost}</p>
              <button onClick={() => handleRemoveService(item.id)} className="delete-btn">Remove</button>
            </div>
          ))}
        </div>

        <div className="cart-summary">
          <h2>Total Reservation Price: ${totalPrice}</h2>
          <div className="cart-actions">
            <button onClick={() => navigate("/services")} className="btn choose-more">Choose More Service</button>
            <button onClick={() => navigate("/reservation-contact")} className="btn checkout">Check Out</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
