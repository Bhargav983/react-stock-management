import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserDetails({ user }) {
  // If no user is passed, return null or a fallback UI
  if (!user) {
    return <p>No user details available</p>; // You can customize this message
  }

  return (
    <div>
      <div className="mb-3">
        <strong>Name:</strong> {user.name}
      </div>
      <div className="mb-3">
        <strong>Email:</strong> {user.email}
      </div>
      <div className="mb-3">
        <strong>Role:</strong> {user.role}
      </div>
      <div className="mb-3">
        <strong>ID:</strong> {user.id}
      </div>
    </div>
  );
}
