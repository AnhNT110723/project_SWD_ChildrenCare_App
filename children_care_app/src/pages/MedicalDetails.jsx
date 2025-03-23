import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { Container, Card, Button, Spinner, Alert } from "react-bootstrap";

const MedicalDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [prescription, setPrescription] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios
            .get(`http://localhost:5190/api/MedicalPrescription/${id}`)
            .then((response) => {
                setPrescription(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                setError("Unable to load prescription details.");
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return (
            <Container className="text-center mt-4">
                <Spinner animation="border" variant="primary" />
                <p>Loading data...</p>
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

    if (!prescription) {
        return (
            <Container className="mt-4">
                <Alert variant="warning">Prescription not found!</Alert>
            </Container>
        );
    }

    return (
        <Container className="mt-4">
            <Card className="shadow">
                <Card.Header className="text-center">Prescription Details</Card.Header>
                <Card.Body>
                    <p><strong>Patient:</strong> {prescription.patientName}</p>
                    <p><strong>Medicine:</strong> {prescription.medicine}</p>
                    <p><strong>Quantity:</strong> {prescription.quantity}</p>
                    <p><strong>Doctor:</strong> {prescription.doctor}</p>
                    <div className="d-flex justify-content-end">
                        <Button variant="primary" onClick={() => navigate("/MedicalList")}>
                            Back to list
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default MedicalDetails;
