import React from "react";

import "../styles/Reservation.css";

const Reservation = () => {
  return (
    <div className="reservation-page">

      <section className="reservation-content">
        <h1>Book an Appointment</h1>
        <p>
          Schedule a check-up for your child with our easy-to-use reservation
          system.
        </p>
        {/* Thêm form đặt lịch ở đây sau */}
        <button className="reserve-button">Reserve Now</button>
      </section>
    </div>
  );
};

export default Reservation;