import React, { useState, useMemo } from 'react';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa'; // Import icons
import DataTable from './DataTable'; // Reusable DataTable component
import AddStockModal from './AddStockModal'; // Add Stock Modal
import EditStockModal from './EditStockModal'; // Edit Stock Modal
import DeleteStockModal from './DeleteStockModal'; // Delete Stock Modal
import StockDetailsModal from './StockDetailsModal'; // Stock Details Modal

export default function Stock() {
  const [selectedStock, setSelectedStock] = useState(null); // State for the selected stock
  const [showAddModal, setShowAddModal] = useState(false); // State for showing the add stock modal
  const [showEditModal, setShowEditModal] = useState(false); // State for showing the edit stock modal
  const [showDeleteModal, setShowDeleteModal] = useState(false); // State for showing the delete stock modal
  const [showDetailsModal, setShowDetailsModal] = useState(false); // State for showing the stock details modal
  const [stockItems, setStockItems] = useState([
    { id: 1, name: 'Cement', quantity: '500 bags', price: '5000' },
    { id: 2, name: 'Bricks', quantity: '1000 units', price: '2000' },
    { id: 3, name: 'Paint Buckets', quantity: '200 buckets', price: '3000' },
    { id: 4, name: 'Sand', quantity: '50 tons', price: '4000' },
  ]); // Initial dummy data for stock

  // Memoized columns for the stock table
  const columns = useMemo(
    () => [
      { Header: 'ID', accessor: 'id' },
      { Header: 'Name', accessor: 'name' },
      { Header: 'Quantity', accessor: 'quantity' },
      { Header: 'Price', accessor: 'price' },
      {
        Header: 'Actions',
        Cell: ({ row }) => (
          <div className="text-center">
            <button
              className="btn btn-sm btn-info me-2"
              onClick={() => handleViewStock(row.original)} // Pass stock data on click
            >
              <FaEye /> {/* View Icon */}
            </button>
            <button
              className="btn btn-sm btn-warning me-2"
              onClick={() => handleEditStock(row.original)} // Handle edit click
            >
              <FaEdit /> {/* Edit Icon */}
            </button>
            <button
              className="btn btn-sm btn-danger"
              onClick={() => handleDeleteStock(row.original)} // Handle delete click
            >
              <FaTrashAlt /> {/* Delete Icon */}
            </button>
          </div>
        ),
      },
    ],
    []
  );

  // Handle viewing the stock details
  const handleViewStock = (stock) => {
    setSelectedStock(stock); // Set the selected stock for viewing
    setShowDetailsModal(true); // Show the details modal
  };

  // Handle adding a new stock item
  const handleAddStock = (newStock) => {
    const newStockId = stockItems.length + 1; // Generate new stock ID
    setStockItems([...stockItems, { ...newStock, id: newStockId }]); // Add new stock to the list
  };

  // Handle editing an existing stock item
  const handleEditStock = (stock) => {
    setSelectedStock(stock); // Set the selected stock for editing
    setShowEditModal(true); // Show the edit stock modal
  };

  // Handle updating the stock after editing
  const handleSaveEditStock = (updatedStock) => {
    setStockItems(stockItems.map((item) => (item.id === updatedStock.id ? updatedStock : item))); // Update the stock list
    setShowEditModal(false); // Close the modal after saving
  };

  // Handle deleting a stock item
  const handleDeleteStock = (stock) => {
    setSelectedStock(stock); // Set the selected stock for deletion
    setShowDeleteModal(true); // Show the delete confirmation modal
  };

  // Handle confirming the deletion of a stock item
  const handleConfirmDelete = (stockId) => {
    setStockItems(stockItems.filter((item) => item.id !== stockId)); // Remove stock from the list
    setShowDeleteModal(false); // Close the modal after deletion
  };

  const handleCloseAddModal = () => setShowAddModal(false); // Close the add modal
  const handleCloseEditModal = () => setShowEditModal(false); // Close the edit modal
  const handleCloseDeleteModal = () => setShowDeleteModal(false); // Close the delete modal
  const handleCloseDetailsModal = () => setShowDetailsModal(false); // Close the details modal

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Stock</h2>
        <button className="btn btn-primary" onClick={() => setShowAddModal(true)}>
          + Add New Stock
        </button>
      </div>

      {/* Add Stock Modal */}
      <AddStockModal show={showAddModal} handleClose={handleCloseAddModal} handleAddStock={handleAddStock} />

      {/* Edit Stock Modal */}
      <EditStockModal
        show={showEditModal}
        handleClose={handleCloseEditModal}
        handleEditStock={handleSaveEditStock}
        initialData={selectedStock}
      />

      {/* Delete Stock Modal */}
      <DeleteStockModal
        show={showDeleteModal}
        handleClose={handleCloseDeleteModal}
        handleDelete={handleConfirmDelete}
        stock={selectedStock}
      />

      {/* Stock Details Modal */}
      <StockDetailsModal show={showDetailsModal} handleClose={handleCloseDetailsModal} stock={selectedStock} />

      {/* DataTable Component */}
      <DataTable columns={columns} data={stockItems} />
    </div>
  );
}
