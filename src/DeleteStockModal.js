import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function DeleteStockModal({ show, handleClose, handleDelete, stock }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Stock</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {stock ? (
          <p>
            Are you sure you want to delete <strong>{stock.name}</strong>?
          </p>
        ) : (
          <p>No stock selected</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        <Button variant="danger" onClick={() => handleDelete(stock.id)}>
          Yes, Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
