import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Form,
  Modal,
  Container,
  Row,
  Col,
  Badge,
  Spinner,
} from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";
import Footer from "../components/Footer";

// Dữ liệu mẫu
const mockPayments = [
  {
    id: 1,
    reservationId: 1001,
    amount: 2500000,
    paymentMethod: "CREDIT_CARD",
    status: "COMPLETED",
    createdAt: "2024-03-20T08:30:00Z"
  },
  {
    id: 2,
    reservationId: 1002,
    amount: 1800000,
    paymentMethod: "BANK_TRANSFER",
    status: "PENDING",
    createdAt: "2024-03-20T09:15:00Z"
  },
  {
    id: 3,
    reservationId: 1003,
    amount: 3200000,
    paymentMethod: "CREDIT_CARD",
    status: "COMPLETED",
    createdAt: "2024-03-20T10:00:00Z"
  },
  {
    id: 4,
    reservationId: 1004,
    amount: 1500000,
    paymentMethod: "CASH",
    status: "COMPLETED",
    createdAt: "2024-03-20T11:30:00Z"
  },
  {
    id: 5,
    reservationId: 1005,
    amount: 2800000,
    paymentMethod: "DEBIT_CARD",
    status: "FAILED",
    createdAt: "2024-03-20T13:45:00Z"
  },
  {
    id: 6,
    reservationId: 1006,
    amount: 2100000,
    paymentMethod: "BANK_TRANSFER",
    status: "PENDING",
    createdAt: "2024-03-20T14:20:00Z"
  },
  {
    id: 7,
    reservationId: 1007,
    amount: 1900000,
    paymentMethod: "CREDIT_CARD",
    status: "COMPLETED",
    createdAt: "2024-03-20T15:10:00Z"
  },
  {
    id: 8,
    reservationId: 1008,
    amount: 3500000,
    paymentMethod: "DEBIT_CARD",
    status: "COMPLETED",
    createdAt: "2024-03-20T16:00:00Z"
  }
];

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    reservationId: "",
    amount: "",
    paymentMethod: "CREDIT_CARD",
    status: "PENDING"
  });

  // Fetch payments - sử dụng dữ liệu mẫu
  const fetchPayments = async () => {
    try {
      setLoading(true);
      // Giả lập delay của API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setPayments(mockPayments);
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast.error("Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // Handle form submission với dữ liệu mẫu
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Giả lập delay của API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      const payload = {
        ...formData,
        amount: parseFloat(formData.amount),
        reservationId: parseInt(formData.reservationId),
        id: editMode ? formData.id : mockPayments.length + 1,
        createdAt: new Date().toISOString()
      };

      if (editMode) {
        const updatedPayments = payments.map(p => 
          p.id === payload.id ? payload : p
        );
        setPayments(updatedPayments);
        toast.success("Payment updated successfully");
      } else {
        setPayments([...payments, payload]);
        toast.success("Payment created successfully");
      }
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error("Error submitting payment:", error);
      toast.error("Operation failed");
    } finally {
      setLoading(false);
    }
  };

  // Handle payment deletion với dữ liệu mẫu
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      try {
        setLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        const filteredPayments = payments.filter(p => p.id !== id);
        setPayments(filteredPayments);
        toast.success("Payment deleted successfully");
      } catch (error) {
        console.error("Error deleting payment:", error);
        toast.error("Failed to delete payment");
      } finally {
        setLoading(false);
      }
    }
  };

  // Handle edit button click
  const handleEdit = (payment) => {
    setFormData({
      ...payment,
      amount: payment.amount.toString(),
      reservationId: payment.reservationId.toString()
    });
    setEditMode(true);
    setShowModal(true);
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      reservationId: "",
      amount: "",
      paymentMethod: "CREDIT_CARD",
      status: "PENDING"
    });
    setEditMode(false);
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "COMPLETED":
        return "success";
      case "PENDING":
        return "warning";
      case "FAILED":
        return "danger";
      default:
        return "secondary";
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(amount);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <div className="flex-grow-1">
        <Container className="py-4">
          <Row className="mb-4">
            <Col>
              <h2 className="text-primary">Payment Management</h2>
            </Col>
            <Col className="text-end">
              <Button style={{backgroundColor: '#4CAF50', borderColor: '#4CAF50'}}
                onClick={() => {
                  resetForm();  
                  setShowModal(true);
                }}
              >
                <i className="fas fa-plus me-2"></i>Add New Payment
              </Button>
            </Col>
          </Row>

          {/* Payment Table */}
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" role="status" variant="primary">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <div className="bg-white rounded shadow-sm">
              <Table responsive striped bordered hover className="mb-0">
                <thead className="bg-light">
                  <tr>
                    <th className="text-center">ID</th>
                    <th>Reservation ID</th>
                    <th>Amount</th>
                    <th>Payment Method</th>
                    <th className="text-center">Status</th>
                    <th>Created At</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.length === 0 ? (
                    <tr>
                      <td colSpan="7" className="text-center py-4">
                        <i className="fas fa-inbox me-2"></i>No payments found
                      </td>
                    </tr>
                  ) : (
                    payments.map((payment) => (
                      <tr key={payment.id}>
                        <td className="text-center">{payment.id}</td>
                        <td>{payment.reservationId}</td>
                        <td className="text-end">{formatCurrency(payment.amount)}</td>
                        <td>{payment.paymentMethod.replace(/_/g, ' ')}</td>
                        <td className="text-center">
                          <Badge bg={getStatusBadgeVariant(payment.status)} pill>
                            {payment.status}
                          </Badge>
                        </td>
                        <td>{new Date(payment.createdAt).toLocaleString('vi-VN')}</td>
                        <td className="text-center">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            className="me-2"
                            onClick={() => handleEdit(payment)}
                          >
                            <i className="fas fa-edit">Edit</i>
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => handleDelete(payment.id)}
                          >
                            <i className="fas fa-trash">Delete</i>
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </Table>
            </div>
          )}

          {/* Payment Form Modal */}
          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton className="bg-light">
              <Modal.Title>{editMode ? "Edit Payment" : "Add New Payment"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Reservation ID</Form.Label>
                  <Form.Control
                    type="number"
                    value={formData.reservationId}
                    onChange={(e) =>
                      setFormData({ ...formData, reservationId: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Amount (VND)</Form.Label>
                  <Form.Control
                    type="number"
                    step="1000"
                    min="0"
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Select
                    value={formData.paymentMethod}
                    onChange={(e) =>
                      setFormData({ ...formData, paymentMethod: e.target.value })
                    }
                  >
                    <option value="CREDIT_CARD">Credit Card</option>
                    <option value="DEBIT_CARD">Debit Card</option>
                    <option value="BANK_TRANSFER">Bank Transfer</option>
                    <option value="CASH">Cash</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Status</Form.Label>
                  <Form.Select
                    value={formData.status}
                    onChange={(e) =>
                      setFormData({ ...formData, status: e.target.value })
                    }
                  >
                    <option value="PENDING">Pending</option>
                    <option value="COMPLETED">Completed</option>
                    <option value="FAILED">Failed</option>
                  </Form.Select>
                </Form.Group>

                <div className="text-end">
                  <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" disabled={loading}>
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Loading...
                      </>
                    ) : (
                      editMode ? "Update" : "Create"
                    )}
                  </Button>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        </Container>
      </div>
     
    </div>
  );
};

export default Payment;