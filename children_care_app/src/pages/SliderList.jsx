import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/SliderList.css"; // Import CSS


const SliderList = () => {
    const [sliders, setSliders] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [search, setSearch] = useState("");
    //const token = localStorage.getItem("token");

    useEffect(() => {
        fetchSliders();
    }, [page, search]);

    const fetchSliders = () => {
        axios
            .get(`http://localhost:5190/api/sliders?page=${page}&search=${search}`, 
                // {
                //     headers: { Authorization: `Bearer ${token}` },
                // } phan quyen
            )
            .then((response) => {
                setSliders(response.data.sliders);
                setTotalPages(Math.ceil(response.data.totalItems / response.data.pageSize));
            })
            .catch((error) => console.error("Error fetching sliders:", error));
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this slider?")) {
            axios
                .delete(`http://localhost:5190/api/sliders/${id}`
                    // , {
                    //     headers: { Authorization: `Bearer ${token}` },
                    // } phan quyen
                )
                .then(() => {
                    setSliders(sliders.filter(s => s.id !== id));
                })
                .catch((error) => console.error("Error deleting slider:", error));
        }
    };

    const handleAdd = () => {
        const newSlider = {
            title: prompt("Enter slider title:"),
            image: prompt("Enter image URL:"),
            backlink: prompt("Enter backlink:"),
            status: true
        };
        axios
            .post("http://localhost:5190/api/sliders", newSlider
                // , {
                //     headers: { Authorization: `Bearer ${token}` },
                // } phan quyen
            )
            .then((response) => setSliders([...sliders, response.data]))
            .catch((error) => console.error("Error adding slider:", error));
    };

    return (
        <div className="slider-list">
            <h2>Slider List</h2>
            <input
                type="text"
                placeholder="Search sliders..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button onClick={handleAdd}>Add Slider</button>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Thumbnail</th>
                        <th>Title</th>
                        <th>Backlink</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sliders.map((slider) => (
                        <tr key={slider.id}>
                            <td>{slider.id}</td>
                            <td><img src={slider.image} alt={slider.title} width="50" /></td>
                            <td>{slider.title}</td>
                            <td>{slider.backlink}</td>
                            <td>{slider.status ? "Active" : "Inactive"}</td>
                            <td>
                                <Link to={`/slider/${slider.id}`}>Edit</Link>
                                <button onClick={() => handleDelete(slider.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                <button onClick={() => setPage(page - 1)} disabled={page === 1}>Previous</button>
                <span>Page {page} of {totalPages}</span>
                <button onClick={() => setPage(page + 1)} disabled={page === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default SliderList;