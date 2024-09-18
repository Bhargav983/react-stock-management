import React, { useState } from 'react';
import axios from 'axios';

export default function EditUserHandler({ initialData, onEditSuccess, onClose }) {
  const [formData, setFormData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      // Update the user in Firebase Realtime Database
      await axios.put(`https://test1-52d71-default-rtdb.firebaseio.com/users/${formData.id}.json`, formData);
      onEditSuccess(); // Notify parent of success
      onClose(); // Close the modal
    } catch (err) {
      console.error('Error updating user:', err);
      setError('Failed to update user. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {error && <p className="text-danger">{error}</p>}
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          type="text"
          name="name"
          className="form-control"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          className="form-control"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Role</label>
        <input
          type="text"
          name="role"
          className="form-control"
          value={formData.role}
          onChange={handleChange}
          required
        />
      </div>
      <button type="submit" className="btn btn-primary w-100" disabled={loading}>
        {loading ? 'Saving...' : 'Save Changes'}
      </button>
    </form>
  );
}
