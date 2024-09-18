import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import axios from 'axios';

export default function AddUserModal({ show, handleClose, handleAddUser }) {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    role: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userCounter, setUserCounter] = useState(0); // State to store user counter

  const auth = getAuth(); // Initialize Firebase auth

  // Fetch the current user counter from Firebase when the modal is loaded
  useEffect(() => {
    const fetchUserCounter = async () => {
      try {
        const response = await axios.get('https://test1-52d71-default-rtdb.firebaseio.com/counters/usersCounter.json');
        setUserCounter(response.data || 0); // If no counter, default to 0
      } catch (err) {
        console.error('Error fetching user counter:', err);
      }
    };

    fetchUserCounter();
  }, []);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    setLoading(true);
    setError(null);

    try {
      // Step 1: Register the user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Step 2: Store the user's additional details in Firebase Realtime Database
      const userData = {
        uid: user.uid,
        name: formData.name,
        mobile: formData.mobile,
        email: formData.email,
        role: formData.role,
      };

      // Step 3: Post the data to the Firebase Realtime Database
      await axios.post('https://test1-52d71-default-rtdb.firebaseio.com/users.json', userData);

      // Step 4: Increment the user counter and update it in Firebase
      const newUserCounter = userCounter + 1;
      await axios.put('https://test1-52d71-default-rtdb.firebaseio.com/counters/usersCounter.json', newUserCounter);
      setUserCounter(newUserCounter); // Update local counter

      // Step 5: Update parent state and reset the form
      handleAddUser();
      setFormData({ name: '', mobile: '', email: '', role: '', password: '' });
      handleClose(); // Close the modal
    } catch (error) {
      setError('Failed to register user. Please try again.');
      console.error('Error registering user:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Add New Admin</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <p className="text-danger">{error}</p>}
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter name"
              name="name"
              value={formData.name}
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

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter role"
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100" disabled={loading}>
            {loading ? 'Registering...' : 'Add Admin'}
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}
