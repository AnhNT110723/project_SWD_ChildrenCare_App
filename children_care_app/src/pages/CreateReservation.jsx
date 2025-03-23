import React, { useEffect, useState } from "react";
import "../styles/Reservations/CreateReservation.css";
import axios from "axios";

const CreateReservation = () => {
  const [formData, setFormData] = useState({
    childName: "",
    date: "",
    time: "",
    numberOfPeople: 1,
    serviceId: ""  // Sử dụng select option
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

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
    fetchServices();
  }, []);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        await axios.post("http://localhost:5190/api/reservations", {
            customerId: 3,
            serviceId: formData.serviceId,
            childName: formData.childName,
            date: formData.date,      // Dạng "2025-03-30"
            time: formData.time       // Dạng "10:00"
        });
      alert("Reservation created successfully!");
    } catch (error) {
      console.error("Error creating reservation:", error);
      alert("Failed to create reservation. Please try again.");
    }
  };

  return (
    <div className="reservation-page">
      <h1>Create Reservation</h1>
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateReservation;
