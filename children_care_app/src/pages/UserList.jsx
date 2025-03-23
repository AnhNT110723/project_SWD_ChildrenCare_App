import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Button, Form, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchUsers();
    }, [search]);

    const fetchUsers = () => {
        axios.get(`http://localhost:5190/api/admin/users?search=${search}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => setUsers(response.data))
        .catch((error) => console.error("Error fetching users:", error));
    };

    const handleDelete = (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này?")) {
            axios.delete(`http://localhost:5190/api/admin/users/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then(() => setUsers(users.filter(user => user.id !== id)))
            .catch((error) => console.error("Lỗi xóa người dùng:", error));
        }
    };

    return (
        <Container className="mt-4">
            <h2 className="mb-3">Quản lý Người Dùng</h2>
            <Form className="mb-3">
                <Form.Control
                    type="text"
                    placeholder="Tìm kiếm người dùng..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </Form>
            <Link to="/admin/user/add">
                <Button variant="primary" className="mb-3">Thêm Người Dùng</Button>
            </Link>
            <Table striped bordered hover>
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Tên</th>
                        <th>Email</th>
                        <th>Vai Trò</th>
                        <th>Hành động</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.fullName}</td>
                            <td>{user.email}</td>
                            <td>{user.role}</td>
                            <td>
                                <Link to={`/admin/user/${user.id}`}>
                                    <Button variant="warning" size="sm" className="me-2">Sửa</Button>
                                </Link>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(user.id)}>Xóa</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default UserList;
