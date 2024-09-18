import React from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import icons

export default function SiteTableColumns({ handleViewSite, handleEditSite, handleDeleteSite }) {
  // Memoized columns for the sites table
  const columns = [
    { Header: 'ID', accessor: 'id' },
    { Header: 'Location', accessor: 'location' },
    { Header: 'Site Manager', accessor: 'manager' },
    { Header: 'Mobile', accessor: 'mobile' },
    {
      Header: 'Actions',
      Cell: ({ row }) => (
        <div className="text-center">
          <button
            className="btn btn-sm btn-info me-2"
            onClick={() => handleViewSite(row.original)} // Pass site data on click
          >
            <FaEye /> {/* View Icon */}
          </button>
          <button
            className="btn btn-sm btn-warning me-2"
            onClick={() => handleEditSite(row.original)} // Handle edit click
          >
            <FaEdit /> {/* Edit Icon */}
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => handleDeleteSite(row.original)} // Handle delete click
          >
            <FaTrashAlt /> {/* Delete Icon */}
          </button>
        </div>
      ),
    },
  ];

  return columns;
}
