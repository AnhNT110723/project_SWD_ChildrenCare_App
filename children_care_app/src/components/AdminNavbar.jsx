import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

const AdminNavbar = () => {
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/admin">Admin Panel</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/admin">Dashboard</Nav.Link>
                    <Nav.Link as={Link} to="/admin/users">Quản lý Người Dùng</Nav.Link>
                </Nav>
            </Container>
        </Navbar>
    );
};

export default AdminNavbar;
