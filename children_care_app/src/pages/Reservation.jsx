import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import { Toast } from "bootstrap"; //
import "../styles/Reservations/Reservation.css";

const Reservation = () => {
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const toastRef = useRef(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await axios.get("http://localhost:5190/api/Reservations");
        setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case "Completed": return "badge bg-success";
      case "Confirmed": return "badge bg-primary";
      case "Pending": return "badge bg-warning text-dark";
      case "Cancelled": return "badge bg-secondary";
      default: return "badge bg-light text-dark";
    }
  };



    // Hiển thị thông báo Toast
    const showToast = (message, isSuccess = true) => {
      const toastElement = toastRef.current;
      if (!toastElement) {
        console.error("Toast element not found!");
        return;
      }
      const toast = new Toast(toastElement); 

      const toastBody = toastElement.querySelector(".toast-body");
      toastBody.textContent = message;
  
      if (isSuccess) {
        toastElement.classList.remove("text-bg-danger");
        toastElement.classList.add("text-bg-success");
      } else {
        toastElement.classList.remove("text-bg-success");
        toastElement.classList.add("text-bg-danger");
      }
  
      toast.show();
    };


   // Hàm xóa đặt lịch
   const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc muốn hủy đơn đặt lịch này không?");
    if (confirmDelete) {
      try {
        await axios.delete(`http://localhost:5190/api/Reservations/${id}`);
        // setReservations(reservations.filter((reservation) => reservation.id !== id));
        const updatedReservations = reservations.map((reservation) =>
          reservation.id === id
            ? { ...reservation, status: "Cancelled" } // Cập nhật trạng thái thay vì xóa
            : reservation
        );
        setReservations(updatedReservations);
        showToast("Delete successfully!", true);
      } catch (error) {
        console.error("Lỗi khi xóa đặt lịch:", error);
        showToast("Delete successfully!", false);
      }
    }
  };


  return (
    <div className="reservation-page">
      <section className="reservation-content">
        <h1>Book an Appointment</h1>
        <p>Schedule a check-up for your child with our easy-to-use reservation system.</p>
        <button onClick={() => navigate("/createReservation")} className="reserve-button">
          Reserve Now
        </button>

        <div className="reservation-list mt-4">
          <h2>Your Reservations</h2>
          {reservations.length === 0 ? (
            <p>No reservations yet.</p>
          ) : (
            <table className="table table-striped table-hover">
              <thead>
                <tr>
                  <th>#</th> 
                  <th>Child's Name</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Doctor</th>
                  <th>Status</th>
                  <th>Actions</th>
                  <th>Payment</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation, index) => (
                  <tr key={reservation.id}>
                    <td>{index + 1}</td>
                    <td>{reservation.childName}</td>
                    <td>{new Date(reservation.reservationDate).toLocaleDateString()}</td>
                    <td>{new Date(reservation.reservationDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                    <td>{reservation.doctor || "N/A"}</td>
                    <td>
                      <span className={getStatusBadge(reservation.status)}>
                        {reservation.status}
                      </span>
                    </td>
                    <td>
                    
                      <Link   to={`/editReservation/${reservation.id}`} className="btn btn-info btn-sm me-2">
                        Edit
                      </Link>
                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(reservation.id)}>Delete</button>
                    </td>
                    <td>
                      {reservation.status === "Pending" && (
                          <Link   to={`/reservationCart/${reservation.id}`} className="btn btn-warning btn-sm">
                            Payment
                          </Link>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <div className="toast-container position-fixed top-0 end-0 p-3" style={{ zIndex: 1055 }}>
  <div 
    ref={toastRef} 
    className="toast align-items-center text-bg-success border-0" 
    role="alert" 
    aria-live="assertive" 
    aria-atomic="true"
  >
    <div className="d-flex">
      <div className="toast-body">Thông báo sẽ hiển thị ở đây...</div>
      <button 
        type="button" 
        className="btn-close me-2 m-auto" 
        data-bs-dismiss="toast" 
        aria-label="Close"
      ></button>
    </div>
  </div>
</div>
        </div>
      </section>
    </div>
  );
};

export default Reservation;
