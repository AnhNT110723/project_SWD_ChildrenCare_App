import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import "../styles/SliderDetails.css"; // Import CSS


// Cấu hình Modal
Modal.setAppElement("#root");

const SliderDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [slider, setSlider] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [formData, setFormData] = useState({ title: "", image: "", backlink: "", status: false });
    const token = localStorage.getItem("token");

    useEffect(() => {
        axios
            .get(`http://localhost:5190/api/sliders/${id}`
            // , {
             //   headers: { Authorization: `Bearer ${token}` },
            //}
            )
            .then((response) => {
                setSlider(response.data);
                setFormData({
                    title: response.data.title,
                    image: response.data.image,
                    backlink: response.data.backlink,
                    status: response.data.status,
                });
            })
            .catch((error) => console.error("Error fetching slider:", error));
    }, [id]);

    const handleUpdate = () => {
        setIsModalOpen(true); // Mở modal thay vì prompt/confirm
    };

    const handleSave = () => {
        axios
            .put(`http://localhost:5190/api/sliders/${id}`, formData
            // , {
            //     headers: { Authorization: `Bearer ${token}` },
            // }
            )
            .then((response) => {
                setSlider(response.data);
                setIsModalOpen(false);
                alert("Slider updated successfully.");
            })
            .catch((error) => console.error("Error updating slider:", error));
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this slider?")) { // Giữ confirm cho delete tạm thời
            axios
                .delete(`http://localhost:5190/api/sliders/${id}`
                // , {
                //     headers: { Authorization: `Bearer ${token}` },
                // }
                )
                .then(() => {
                    alert("Slider deleted.");
                    navigate("/sliders");
                })
                .catch((error) => console.error("Error deleting slider:", error));
        }
    };

    if (!slider) return <p>Loading...</p>;

    return (
        <div className="slider-details">
            <h2>Slider Details</h2>
            <div className="details-container">
                <p><strong>ID:</strong> {slider.id}</p>
                <p><strong>Title:</strong> {slider.title}</p>
                <p><strong>Image:</strong> <img src={slider.image} alt={slider.title} width="100" /></p>
                <p><strong>Backlink:</strong> {slider.backlink}</p>
                <p><strong>Status:</strong> {slider.status ? "Active" : "Inactive"}</p>
                <button onClick={handleUpdate}>Edit</button>
                <button onClick={handleDelete}>Delete</button>
                <button onClick={() => navigate("/sliders")}>Back to List</button>
            </div>

            {/* Modal cho Edit */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={{
                    content: { top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: "400px" }
                }}
            >
                <h3>Edit Slider</h3>
                <label>
                    Title:
                    <input
                        type="text"
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                </label>
                <label>
                    Image URL:
                    <input
                        type="text"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    />
                </label>
                <label>
                    Backlink:
                    <input
                        type="text"
                        value={formData.backlink}
                        onChange={(e) => setFormData({ ...formData, backlink: e.target.value })}
                    />
                </label>
                <label>
                    Status:
                    <input
                        type="checkbox"
                        checked={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.checked })}
                    />
                </label>
                <button onClick={handleSave}>Save</button>
                <button onClick={() => setIsModalOpen(false)}>Cancel</button>
            </Modal>
        </div>
    );
};

export default SliderDetails;