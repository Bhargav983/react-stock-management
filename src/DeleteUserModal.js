  import React from 'react';
  import { Modal, Button } from 'react-bootstrap';

  export default function DeleteUserModal({ show, handleClose, user, children }) {
    return (
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Delete User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {user ? (
            <p>
              Are you sure you want to delete <strong>{user.name}</strong>?
            </p>
          ) : (
            <p>No user selected</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          {/* We will render the DeleteUserHandler button here as children */}
          {children}
        </Modal.Footer>
      </Modal>
    );
  }
