import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default function DeleteSiteModal({ show, handleClose, site, children }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete Site</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {site ? (
          <p>
            Are you sure you want to delete the site at <strong>{site.location}</strong> managed by <strong>{site.manager}</strong>?
          </p>
        ) : (
          <p>No site selected</p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          No
        </Button>
        {/* We will render the DeleteSiteHandler button here as children */}
        {children}
      </Modal.Footer>
    </Modal>
  );
}
