import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function StockDetailsModal({ show, handleClose, stock }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Stock Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {stock ? (
          <div>
            <p><strong>Stock Name:</strong> {stock.name}</p>
            <p><strong>Quantity:</strong> {stock.quantity}</p>
            <p><strong>Price:</strong> {stock.price}</p>
          </div>
        ) : (
          <p>No stock selected</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
