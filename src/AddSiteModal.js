import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import axios from 'axios';

export default function AddSiteModal({ show, handleClose, handleAddSite }) {
  const [formData, setFormData] = useState({
    location: '',
    manager: '',
    mobile: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [siteCounter, setSiteCounter] = useState(0); // State to store site counter

  // Fetch the current site counter from Firebase when the modal is loaded
  useEffect(() => {
    const fetchSiteCounter = async () => {
      try {
        const response = await axios.get('https://test1-52d71-default-rtdb.firebaseio.com/counters/sitesCounter.json');
        setSiteCounter(response.data || 0); // If no counter, default to 0
      } catch (err) {
        console.error('Error fetching site counter:', err);
      }
    };

    fetchSiteCounter();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Step 1: Add site details to Firebase
      await axios.post('https://test1-52d71-default-rtdb.firebaseio.com/sites.json', formData);

      // Step 2: Increment the site counter and update it in Firebase
      const newSiteCounter = siteCounter + 1;
      await axios.put('https://test1-52d71-default-rtdb.firebaseio.com/counters/sitesCounter.json', newSiteCounter);
      setSiteCounter(newSiteCounter); // Update local counter

      // Step 3: Update parent state and reset the form
      handleAddSite();
      setFormData({ location: '', manager: '', mobile: '' });
      handleClose();
    } catch (error) {
      setError('Failed to add site. Please try again.');
      console.error('Error adding site:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Site</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter site location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Site Manager</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter site manager"
              name="manager"
              value={formData.manager}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mobile</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter mobile number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100" disabled={loading}>
            {loading ? 'Adding...' : 'Add Site'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
