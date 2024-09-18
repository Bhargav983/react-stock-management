import React from 'react';
import { Modal, Button } from 'react-bootstrap'; // Import Bootstrap components
import UserDetails from './UserDetails'; // Import the UserDetails component

export default function UserDetailsModal({ show, handleClose, user }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>User Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {user ? <UserDetails user={user} /> : <p>No user details available</p>}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
