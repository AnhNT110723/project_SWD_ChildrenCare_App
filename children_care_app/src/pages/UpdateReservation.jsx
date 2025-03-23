import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Reservations/CreateReservation.css";
import axios from "axios";

const CreateReservation = () => {
  const { id } = useParams(); // Lấy ID từ URL
  const navigate = useNavigate();
  const [isEditMode, setIsEditMode] = useState(false); // Xác định chế độ edit

  const [formData, setFormData] = useState({
    childName: "",
    date: "",
    time: "",
    numberOfPeople: 1,
    serviceId: ""
  });

  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get("http://localhost:5190/api/services");
        setServices(response.data);
      } catch (error) {
        console.error("Error fetching services:", error);
        alert("Failed to load services. Please try again.");
      }
    };

    const fetchReservation = async () => {
      if (id) {
        setIsEditMode(true);
        try {
          const response = await axios.get(`http://localhost:5190/api/reservations/${id}`);
          const { childName, reservationDate, numberOfPeople, serviceId } = response.data;
          const [date, time] = reservationDate.split("T");

          setFormData({
            childName,
            date,
            time: time.substring(0, 5), // Lấy giờ phút
            numberOfPeople,
            serviceId
          });
        } catch (error) {
          console.error("Error fetching reservation:", error);
          alert("Failed to load reservation details.");
        }
      }
    };

    fetchServices();
    fetchReservation();
  }, [id]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await axios.put(`http://localhost:5190/api/reservations/${id}`, formData);
        alert("Reservation updated successfully!");
      } else {
        await axios.post("http://localhost:5190/api/reservations", {
          customerId: 3,
          serviceId: formData.serviceId,
          childName: formData.childName,
          date: formData.date,
          time: formData.time
        });
        alert("Reservation created successfully!");
      }
      navigate("/reservation"); // Quay lại trang danh sách
    } catch (error) {
      console.error("Error saving reservation:", error);
      alert("Failed to save reservation. Please try again.");
    }
  };

  return (
    <div className="reservation-page">
      <h1>{isEditMode ? "Edit Reservation" : "Create Reservation"}</h1>
      <form onSubmit={handleSubmit}>
        <label>Child's Name</label>
        <input
          type="text"
          name="childName"
          value={formData.childName}
          onChange={handleChange}
          required
        />

        <div className="input-group">
          <div>
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div>
            <label>Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <label>Number of People</label>
        <input
          type="number"
          name="numberOfPeople"
          value={formData.numberOfPeople}
          min="1"
          onChange={handleChange}
          required
        />

        <label>Service</label>
        <select
          name="serviceId"
          value={formData.serviceId}
          onChange={handleChange}
          required
        >
          <option value="">Select a service</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>
              {service.name}
            </option>
          ))}
        </select>

        <button type="submit">{isEditMode ? "Update" : "Submit"}</button>
      </form>
    </div>
  );
};

export default CreateReservation;
