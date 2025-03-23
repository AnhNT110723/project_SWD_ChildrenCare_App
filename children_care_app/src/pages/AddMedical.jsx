import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Form, Button, Container, Card, Spinner } from "react-bootstrap";

const AddMedical = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({ patientName: "", medicine: "", quantity: "", doctor: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.post("http://localhost:5190/api/MedicalPrescription", form);
            navigate("/MedicalList");
        } catch (error) {
            console.error("Error adding prescription:", error);
            alert("An error occurred while adding the prescription.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Container className="mt-4">
            <Card className="shadow">
                <Card.Header className="text-center">Add Prescription</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Patient</Form.Label>
                            <Form.Control
                                type="text"
                                name="patientName"
                                placeholder="Enter patient's name"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Medicine</Form.Label>
                            <Form.Control
                                type="text"
                                name="medicine"
                                placeholder="Enter medicine name"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                placeholder="Enter quantity"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Doctor</Form.Label>
                            <Form.Control
                                type="text"
                                name="doctor"
                                placeholder="Enter doctor's name"
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>

                        <div className="d-flex justify-content-end">
                            <Button
                                variant="secondary"
                                onClick={() => navigate("/MedicalList")}
                                className="me-2"
                            >
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        {" "}Adding...
                                    </>
                                ) : (
                                    "Add"
                                )}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default AddMedical;
