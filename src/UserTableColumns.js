import React from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import icons

export default function UserTableColumns({ handleViewUser, handleEditUser, handleDeleteUser }) {
  // Memoized columns for the table
  const columns = [
    // { Header: 'ID', accessor: 'id' },
    { Header: 'Name', accessor: 'name' },
    { Header: 'Mobile', accessor: 'mobile' }, // Mobile Column
    { Header: 'Email', accessor: 'email' },
    { Header: 'Role', accessor: 'role' },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div className="text-center">
          <button
            className="btn btn-sm btn-info me-2"
            onClick={() => handleViewUser(row.original)} // Pass user data on click
          >
            <FaEye /> {/* View Icon */}
          </button>
          <button
            className="btn btn-sm btn-warning me-2"
            onClick={() => handleEditUser(row.original)} // Handle edit click
          >
            <FaEdit /> {/* Edit Icon */}
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDeleteUser(row.original)} // Handle delete click
          >
            <FaTrashAlt /> {/* Delete Icon */}
          </button>
        </div>
      ),
    },
  ];

  return columns;
}
