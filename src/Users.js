import React, { useMemo, useState, useCallback } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserDetailsModal from './UserDetailsModal';
import AddUserModal from './AddUserModal';
import EditUserModal from './EditUserModal';
import DeleteUserModal from './DeleteUserModal';
import DataTable from './DataTable';
import useFetchUsers from './useFetchUsers';
import UserTableColumns from './UserTableColumns';
import DeleteUserHandler from './DeleteUserHandler';

export default function Users() {
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { users, loading, error, fetchUsers } = useFetchUsers(); // Custom hook to fetch users

  // Use useCallback to avoid unnecessary re-renders
  const handleViewUser = useCallback((user) => {
    setSelectedUser(user);
    setShowModal(true);
  }, []);

  const handleAddUser = useCallback(async () => {
    try {
      fetchUsers(); // Refresh users list after adding a new user
    } catch (err) {
      console.error('Error adding user:', err);
    }
  }, [fetchUsers]);

  const handleEditUserSuccess = useCallback(async () => {
    try {
      await fetchUsers(); // Fetch updated users list after editing
      setShowEditModal(false); // Close the edit modal
    } catch (err) {
      console.error('Error fetching updated users:', err);
    }
  }, [fetchUsers]);

  const handleEditUser = useCallback((user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  }, []);

  const handleDeleteUser = useCallback((user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  }, []);

  const handleDeleteSuccess = useCallback(() => {
    setShowDeleteModal(false);
    fetchUsers();
  }, [fetchUsers]);

  const handleCloseModal = () => setShowModal(false);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const columns = useMemo(
    () => UserTableColumns({ handleViewUser, handleEditUser, handleDeleteUser }),
    [handleViewUser, handleEditUser, handleDeleteUser]
  );

  return (
    <div className="container mt-1">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <h2>Users</h2>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + Add New User
        </button>
      </div>

      {/* Error and Loading State */}
      {loading && <p>Loading users...</p>}
      {error && <p className="text-danger">{error}</p>}

      {/* User Details Modal */}
      <UserDetailsModal show={showModal} handleClose={handleCloseModal} user={selectedUser} />

      {/* Add User Modal */}
      <AddUserModal show={showAddModal} handleClose={handleCloseAddModal} handleAddUser={handleAddUser} />

      {/* Edit User Modal */}
      <EditUserModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        initialData={selectedUser}
        handleEditUser={handleEditUserSuccess} // Trigger the refresh here after success
      />

      {/* Delete User Modal */}
      <DeleteUserModal show={showDeleteModal} handleClose={handleCloseDeleteModal} user={selectedUser}>
        <DeleteUserHandler userId={selectedUser?.id} onDeleteSuccess={handleDeleteSuccess} />
      </DeleteUserModal>

      {/* DataTable Component */}
      {users.length > 0 && <DataTable columns={columns} data={users} />}
    </div>
  );
}
