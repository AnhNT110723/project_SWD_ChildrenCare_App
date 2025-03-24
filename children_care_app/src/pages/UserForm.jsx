import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Form, Button, Container } from "react-bootstrap";

const UserForm = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ fullName: "", email: "", role: "Customer" });
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5190/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` }
            }).then((response) => setFormData(response.data))
              .catch((error) => console.error("Lỗi lấy dữ liệu user:", error));
        }
    }, [id]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
            console.log("Dữ liệu gửi lên:", formData);  // Kiểm tra dữ liệu trước khi gửi
        const request = id 
            ? axios.put(`http://localhost:5190/api/admin/users/${id}`, formData, { headers: { Authorization: `Bearer ${token}` } })
            : axios.post(`http://localhost:5190/api/admin/users`, formData, { headers: { Authorization: `Bearer ${token}` } });

        request
            .then(() => navigate("/admin/users"))
            .catch((error) => console.error("Lỗi khi lưu user:", error));
    };

    return (
        <Container className="mt-4">
            <h2>{id ? "Chỉnh sửa" : "Thêm mới"} Người Dùng</h2>
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Tên</Form.Label>
                    <Form.Control type="text" name="fullName" value={formData.fullName} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" name="email" value={formData.email} onChange={handleChange} required />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Vai Trò</Form.Label>
                    <Form.Select name="role" value={formData.role} onChange={handleChange}>
                        <option value="Customer">Customer</option>
                        <option value="Staff">Staff</option>
                        <option value="Manager">Manager</option>
                        <option value="Admin">Admin</option>
                    </Form.Select>
                </Form.Group>

                <Button variant="success" type="submit">{id ? "Lưu thay đổi" : "Thêm mới"}</Button>
            </Form>
        </Container>
    );
};

export default UserForm;
