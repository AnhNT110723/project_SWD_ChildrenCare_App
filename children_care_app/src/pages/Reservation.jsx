import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "../styles/Reservations/Reservation.css";



const Reservation = () => {
  
  const navigate = useNavigate();
    // Dữ liệu mẫu cho danh sách đơn đặt lịch
    const [reservations, setReservations] = useState([
      { id: 1, childName: "Anna", date: "2025-03-20", time: "10:00 AM", doctor: "Dr. Smith" },
      { id: 2, childName: "Ben", date: "2025-03-21", time: "02:00 PM", doctor: "Dr. Jones" },
      { id: 3, childName: "Clara", date: "2025-03-22", time: "09:30 AM", doctor: "Dr. Lee" },
    ]);
  return (
    <div className="reservation-page">

<section className="reservation-content">
        <h1>Book an Appointment</h1>
        <p>
          Schedule a check-up for your child with our easy-to-use reservation
          system.
        </p>
        <button onClick={() => navigate("/createReservation")} className="reserve-button">Reserve Now</button>
        
        {/* Danh sách đơn đặt lịch */}
        <div className="reservation-list">
          <h2>Your Reservations</h2>
          {reservations.length === 0 ? (
            <p>No reservations yet.</p>
          ) : (
            <table className="reservation-table">
              <thead>
                <tr>
                  <th>Child's Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Doctor</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td>{reservation.childName}</td>
                    <td>{reservation.date}</td>
                    <td>{reservation.time}</td>
                    <td>{reservation.doctor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </div>
  );
};

export default Reservation;