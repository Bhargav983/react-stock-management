import React from 'react';
import { Modal } from 'react-bootstrap';
import EditSiteHandler from './EditSiteHandler'; // Import the EditSiteHandler component

export default function EditSiteModal({ show, handleClose, initialData, handleEditSite }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Site</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Pass initial data and success handler to EditSiteHandler */}
        <EditSiteHandler initialData={initialData} onEditSuccess={handleEditSite} onClose={handleClose} />
      </Modal.Body>
    </Modal>
  );
}
