import React, { useMemo, useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import SiteDetailsModal from './SiteDetailsModal';
import AddSiteModal from './AddSiteModal';
import EditSiteModal from './EditSiteModal';
import DeleteSiteModal from './DeleteSiteModal';
import DataTable from './DataTable';
import useFetchSites from './useFetchSites'; // Custom hook to fetch sites
import SiteTableColumns from './SiteTableColumns';
import DeleteSiteHandler from './DeleteSiteHandler';

export default function Sites() {
  const [selectedSite, setSelectedSite] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { sites, loading, error, fetchSites } = useFetchSites(); // Custom hook to fetch sites

  // Use useCallback to avoid unnecessary re-renders
  const handleViewSite = useCallback((site) => {
    setSelectedSite(site);
    setShowModal(true);
  }, []);

  const handleAddSite = useCallback(async () => {
    try {
      fetchSites(); // Refresh sites list after adding a new site
    } catch (err) {
      console.error('Error adding site:', err);
    }
  }, [fetchSites]);

  const handleEditSiteSuccess = useCallback(async () => {
    try {
      await fetchSites(); // Fetch updated sites list after editing
      setShowEditModal(false); // Close the edit modal
    } catch (err) {
      console.error('Error fetching updated sites:', err);
    }
  }, [fetchSites]);

  const handleEditSite = useCallback((site) => {
    setSelectedSite(site);
    setShowEditModal(true);
  }, []);

  const handleDeleteSite = useCallback((site) => {
    setSelectedSite(site);
    setShowDeleteModal(true);
  }, []);

  const handleDeleteSuccess = useCallback(() => {
    setShowDeleteModal(false);
    fetchSites(); // Refresh sites list after deletion
  }, [fetchSites]);

  const handleCloseModal = () => setShowModal(false);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const columns = useMemo(
    () => SiteTableColumns({ handleViewSite, handleEditSite, handleDeleteSite }),
    [handleViewSite, handleEditSite, handleDeleteSite]
  );

  return (
    <div className="container mt-1">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h2>Sites</h2>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + Add New Site
        </button>
      </div>

      {/* Error and Loading State */}
      {loading && <p>Loading sites...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* Site Details Modal */}
      <SiteDetailsModal show={showModal} handleClose={handleCloseModal} site={selectedSite} />

      {/* Add Site Modal */}
      <AddSiteModal show={showAddModal} handleClose={handleCloseAddModal} handleAddSite={handleAddSite} />

      {/* Edit Site Modal */}
      <EditSiteModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        initialData={selectedSite}
        handleEditSite={handleEditSiteSuccess} // Trigger the refresh here after success
      />

      {/* Delete Site Modal */}
      <DeleteSiteModal show={showDeleteModal} handleClose={handleCloseDeleteModal} site={selectedSite}>
        <DeleteSiteHandler siteId={selectedSite?.id} onDeleteSuccess={handleDeleteSuccess} />
      </DeleteSiteModal>

      {/* DataTable Component */}
      {sites.length > 0 && <DataTable columns={columns} data={sites} />}
    </div>
  );
}
