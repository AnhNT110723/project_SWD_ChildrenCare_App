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

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    amount: "",
    paymentMethod: "Momo",
    status: "Pending"
  });
  const [amountError, setAmountError] = useState("");

  const fetchPayments = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:5190/api/payment');
      setPayments(response.data);
    } catch (error) {
      console.error("Error fetching payments:", error);
      toast.error("Failed to fetch payments: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const validateAmount = (value) => {
    if (value === "") return "Amount is required";
    const numValue = Number(value);
    if (isNaN(numValue)) {
      return "Amount must be a number";
    }
    if (numValue < 0) {
      return "Amount cannot be negative";
    }
    return "";
  };

  const handleAmountChange = (e) => {
    const value = e.target.value;
    const error = validateAmount(value);
    setAmountError(error);
    setFormData({ ...formData, amount: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amountValidation = validateAmount(formData.amount);
    if (amountValidation) {
      setAmountError(amountValidation);
      return;
    }

    try {
      setLoading(true);
      const payload = {
        amount: parseFloat(formData.amount),
        paymentMethod: formData.paymentMethod,
        status: formData.status,
      };

      console.log("Payload gửi lên API:", payload); // Log payload để kiểm tra

      if (editMode) {
        await axios.put(`http://localhost:5190/api/payment/${formData.id}`, payload);
        toast.success("Payment updated successfully");
      } else {
        await axios.post('http://localhost:5190/api/payment', payload);
        toast.success("Payment created successfully");
      }
      
      setShowModal(false);
      resetForm();
      fetchPayments();
    } catch (error) {
      console.error("Error submitting payment:", error);
      const errorMessage = error.response?.data?.message || error.response?.data || error.message;
      toast.error(`Operation failed: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this payment?")) {
      try {
        setLoading(true);
        await axios.delete(`http://localhost:5190/api/payment/${id}`);
        toast.success("Payment deleted successfully");
        fetchPayments();
      } catch (error) {
        console.error("Error deleting payment:", error);
        toast.error("Failed to delete payment: " + (error.response?.data?.message || error.message));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleEdit = (payment) => {
    setFormData({
      ...payment,
      amount: payment.amount.toString(),
    });
    setEditMode(true);
    setShowModal(true);
    setAmountError("");
  };

  const resetForm = () => {
    setFormData({
      amount: "",
      paymentMethod: "Momo",
      status: "Pending"
    });
    setEditMode(false);
    setAmountError("");
  };

  const getStatusBadgeVariant = (status) => {
    switch (status) {
      case "Paid":
        return "success";
      case "Pending":
        return "warning";
      case "Failed":
        return "danger";
      default:
        return "secondary";
    }
  };

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

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton className="bg-light">
              <Modal.Title>{editMode ? "Edit Payment" : "Add New Payment"}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Amount (VND)</Form.Label>
                  <Form.Control
                    type="number"
                    min="0"
                    value={formData.amount}
                    onChange={handleAmountChange}
                    required
                    isInvalid={!!amountError}
                  />
                  <Form.Control.Feedback type="invalid">
                    {amountError}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Select
                    value={formData.paymentMethod}
                    onChange={(e) =>
                      setFormData({ ...formData, paymentMethod: e.target.value })
                    }
                  >
                    <option value="Momo">Momo</option>
                    <option value="VNPay">VNPay</option>
                    <option value="PayPal">PayPal</option>
                    <option value="Stripe">Stripe</option>
                    <option value="Cash">Cash</option>
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
                    <option value="Pending">Pending</option>
                    <option value="Paid">Paid</option>
                    <option value="Failed">Failed</option>
                  </Form.Select>
                </Form.Group>

                <div className="text-end">
                  <Button variant="secondary" className="me-2" onClick={() => setShowModal(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" type="submit" disabled={loading || !!amountError}>
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