import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Button, Table, Container, Spinner, Alert } from "react-bootstrap";

const MedicalList = () => {
    const [prescriptions, setPrescriptions] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get("http://localhost:5190/api/MedicalPrescription")
            .then((response) => {
                setPrescriptions(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError("Unable to load prescription list.");
                setIsLoading(false);
            });
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this prescription?")) {
            try {
                await axios.delete(`http://localhost:5190/api/MedicalPrescription/${id}`);
                setPrescriptions(prescriptions.filter((p) => p.id !== id));
            } catch (error) {
                console.error("Error deleting prescription:", error);
                alert("An error occurred while deleting the prescription.");
            }
        }
    };

    if (isLoading) {
        return (
            <Container className="mt-4 text-center">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            </Container>
        );
    }

    if (error) {
        return (
            <Container className="mt-4">
                <Alert variant="danger">{error}</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <h2 className="text-center mb-4">Prescription List</h2>
            <div className="mb-3 text-end">
                <Link to="/AddMedical" className="btn btn-success">Add Prescription</Link>
            </div>
            <Table striped bordered hover responsive>
                <thead className="table-dark">
                    <tr>
                        <th>Patient</th>
                        <th>Medicine</th>
                        <th>Quantity</th>
                        <th>Doctor</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {prescriptions.map((item) => (
                        <tr key={item.id}>
                            <td>{item.patientName}</td>
                            <td>{item.medicine}</td>
                            <td>{item.quantity}</td>
                            <td>{item.doctor}</td>
                            <td>
                                <Link to={`/EditMedical/${item.id}`} className="btn btn-warning btn-sm me-2">Edit</Link>
                                <Button variant="danger" size="sm" className="me-2" onClick={() => handleDelete(item.id)}>Delete</Button>
                                <Link to={`/DetailsMedical/${item.id}`} className="btn btn-info btn-sm">Details</Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
};

export default MedicalList;
