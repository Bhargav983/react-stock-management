import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

export default function EditStockModal({ show, handleClose, handleEditStock, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
  });

  // Pre-fill the form with the initial stock data when modal opens
  useEffect(() => {
    if (initialData) {
      setFormData(initialData); // Populate the form with the initial stock data
    }
  }, [initialData]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    handleEditStock(formData); // Pass the updated stock data to the parent component
    handleClose(); // Close modal after saving
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Stock</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Stock Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter stock name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter quantity"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            Save Changes
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
