import React from 'react';
import { Modal } from 'react-bootstrap';
import EditUserHandler from './EditUserHandler'; // Import the EditUserHandler component

export default function EditUserModal({ show, handleClose, initialData, handleEditUser }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Pass initial data and success handler to EditUserHandler */}
        <EditUserHandler initialData={initialData} onEditSuccess={handleEditUser} onClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
}
