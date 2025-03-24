import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/Reservations/Cart.css"; // Import CSS

const Cart = () => {
  const [cart, setCart] = useState([]);
  // const [totalPrice, setTotalPrice] = useState(0);
  const [amount, setAmount] = useState(0); // Thêm state cho amount

  const navigate = useNavigate();
  const { id: reservationId  } = useParams();// Lấy ID từ URL

  useEffect(() => {
    console.log("Reservation ID:", reservationId);
    axios
        .get(`http://localhost:5190/api/Reservations/${reservationId}`)
        .then((response) => {
            console.log("API response:", response.data);
            const amountValue = response.data.amount;
            setAmount(amountValue); // Cập nhật amount vào state
            // Đặt dữ liệu vào mảng nếu chỉ nhận được một object
            const updatedCart = [{
                ...response.data,
                totalCost: response.data.price * (response.data.quantity || 1) * (response.data.numberOfPersons || 1),
            }];
            
            setCart(updatedCart);
            // calculateTotalPrice(updatedCart);
        })
        .catch((error) => console.error("Error fetching cart data:", error));
}, [reservationId]);

  

  // const calculateTotalPrice = (updatedCart) => {
  //   const total = updatedCart.reduce((sum, item) => sum + item.totalCost, 0);
  //   setTotalPrice(total);
  // };

  // const handleQuantityChange = (id, quantity) => {
  //   const updatedCart = cart.map((item) =>
  //     item.id === id
  //       ? { ...item, quantity, totalCost: item.price * quantity * item.numberOfPersons }
  //       : item
  //   );
  //   setCart(updatedCart);
  //   // calculateTotalPrice(updatedCart);
  // };

  // const handlePersonChange = (id, numberOfPersons) => {
  //   const updatedCart = cart.map((item) =>
  //     item.id === id
  //       ? { ...item, numberOfPersons, totalCost: item.price * item.quantity * numberOfPersons }
  //       : item
  //   );
  //   setCart(updatedCart);
  //   calculateTotalPrice(updatedCart);
  // };

  // const handleRemoveService = (id) => {
  //   const updatedCart = cart.filter((item) => item.id !== id);
  //   setCart(updatedCart);
  //   calculateTotalPrice(updatedCart);
  // };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed": return "badge bg-success";
      case "Confirmed": return "badge bg-primary";
      case "Pending": return "badge bg-warning text-dark";
      case "Cancelled": return "badge bg-secondary";
      default: return "badge bg-light text-dark";
    }
  };
  

  const handleCheckout = () => {
    axios
      .put(`http://localhost:5190/api/Reservations/${reservationId}/confirm`)
      .then((response) => {
        console.log(response.data.message); 
        alert("Reservation confirmed successfully!");
        navigate("/reservation");// Chuyển hướng sau khi xác nhận thành công
      })
      .catch((error) => {
        console.error("Error confirming reservation:", error);
        alert("Failed to confirm reservation.");
      });
  };
  

  return (
    <div className="cart-page">
      <h1>Your Reservation Cart</h1>
      <div className="cart-container">
        <table className="cart-table">
          <thead>
            <tr>
              <th>Child's Name</th>
              <th>Date</th>
              <th>Time</th>
              <th>Doctor</th>
              <th>Status</th>
              <th>Price</th>
              <th>Service Name</th>
              {/* <th>Actions</th> */}
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id}>
                <td>{item.childName}</td>
                <td>{new Date(item.reservationDate).toLocaleDateString()}</td>
                <td>{new Date(item.reservationDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                <td>{item.doctor || "N/A"}</td>
                    <td>
                      <span className={getStatusBadge(item.status)}>
                        {item.status}
                      </span>
                    </td>
                <td>{item.amount} vnd</td>
                <td>{item.serviceName}</td>
                {/* <td>
                  <button
                    onClick={() => handleRemoveService(item.id)}
                    className="delete-btn"
                  >
                    Remove
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>

        <div className="cart-summary">
          <h2>Total Reservation Price: ${amount}</h2>
          <div className="cart-actions">
            {/* <button onClick={() => navigate("/services")} className="btn choose-more">
              Choose More Service
            </button> */}
            <button onClick={handleCheckout} className="btn btn-secondary checkout">
              Check Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
