import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function SiteDetailsModal({ show, handleClose, site }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Site Details</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {site ? (
          <div>
            <p><strong>Location:</strong> {site.location}</p>
            <p><strong>Site Manager:</strong> {site.manager}</p>
            <p><strong>Mobile:</strong> {site.mobile}</p>
          </div>
        ) : (
          <p>No site selected</p>
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
