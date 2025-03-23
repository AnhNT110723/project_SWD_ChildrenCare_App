import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Container, Card, Spinner } from "react-bootstrap";

const EditMedical = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState({ patientName: "", medicine: "", quantity: "", doctor: "" });
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        axios
            .get(`http://localhost:5190/api/MedicalPrescription/${id}`)
            .then((response) => {
                setForm(response.data);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                alert("Unable to fetch prescription data.");
                navigate("/MedicalList");
            });
    }, [id, navigate]);

    const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            await axios.put(`http://localhost:5190/api/MedicalPrescription/${id}`, form);
            navigate("/MedicalList");
        } catch (error) {
            console.error("Update error:", error);
            alert("An error occurred while updating the prescription.");
        } finally {
            setIsSubmitting(false);
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

    return (
        <Container className="mt-4">
            <Card className="shadow">
                <Card.Header className="text-center">Update Prescription</Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Patient</Form.Label>
                            <Form.Control
                                type="text"
                                name="patientName"
                                value={form.patientName}
                                onChange={handleChange}
                                required
                                placeholder="Enter patient's name"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Medicine</Form.Label>
                            <Form.Control
                                type="text"
                                name="medicine"
                                value={form.medicine}
                                onChange={handleChange}
                                required
                                placeholder="Enter medicine name"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Quantity</Form.Label>
                            <Form.Control
                                type="number"
                                name="quantity"
                                value={form.quantity}
                                onChange={handleChange}
                                required
                                placeholder="Enter quantity"
                            />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Doctor</Form.Label>
                            <Form.Control
                                type="text"
                                name="doctor"
                                value={form.doctor}
                                onChange={handleChange}
                                required
                                placeholder="Enter doctor's name"
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
                            <Button variant="success" type="submit" disabled={isSubmitting}>
                                {isSubmitting ? (
                                    <>
                                        <Spinner
                                            as="span"
                                            animation="border"
                                            size="sm"
                                            role="status"
                                            aria-hidden="true"
                                        />
                                        {" "}Updating...
                                    </>
                                ) : (
                                    "Update"
                                )}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default EditMedical;
