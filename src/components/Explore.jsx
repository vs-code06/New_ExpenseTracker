import React from "react";
import "./Explore.css";
import { FaChartLine, FaRedoAlt, FaBullseye, FaEdit, FaTrash } from "react-icons/fa";

const Explore = () => {
  return (
    <div className="explore-container">
      <h2>Explore</h2>
      <p className="para">Search and filter your data with precision</p>

      <input
        className="search-bar"
        type="text"
        placeholder="Search transactions..."
      />

      <div className="filters-section separated-filters">

        <div className="filter-card">
          <label>Date Range</label>
          <div className="date-inputs">
            <input type="date" />
            <input type="date" />
          </div>
        </div>

        <div className="filter-card">
          <label>Category</label>
          <select>
            <option>All Categories</option>
            <option>Food</option>
            <option>Transport</option>
            <option>Bills</option>
          </select>
        </div>

        <div className="filter-card">
          <label>Amount Range</label>
          <div className="range-inputs">
            <input type="number" placeholder="Min" />
            <input type="number" placeholder="Max" />
          </div>
        </div>

        <div className="filter-card">
          <label>Transaction Type</label>
          <div className="transaction-type">
            <button className="active">Income</button>
            <button>Expense</button>
          </div>
        </div>

      </div>

      <div className="transaction-table">
        <div className="table-row table-header">
          <span>Date</span>
          <span>Description</span>
          <span>Category</span>
          <span>Amount</span>
          <span>Tags</span>
          <span>Actions</span>
        </div>
        <div className="table-row">
          <span>Jan 15, 2025</span>
          <span>Grocery Shopping</span>
          <span>Food & Dining</span>
          <span>$85.50</span>
          <span><span className="tag">Monthly</span></span>
          <span className="actions">
            <FaEdit className="edit-icon" />
            <FaTrash className="delete-icon" />
          </span>
        </div>
      </div>

      <h3 className="suggestion-title">Smart Suggestions</h3>
      <div className="suggestions">
        <div className="suggestion-card">
          <FaChartLine className="s-icon blue" />
          <div>
            <p>Unusual spending in Food category</p>
            <small>20% increase from last week</small>
          </div>
        </div>
        <div className="suggestion-card">
          <FaRedoAlt className="s-icon green" />
          <div>
            <p>Recurring Payment Due</p>
            <small>Netflix subscription in 3 days</small>
          </div>
        </div>
        <div className="suggestion-card">
          <FaBullseye className="s-icon purple" />
          <div>
            <p>Savings Goal Progress</p>
            <small>You're 80% towards your monthly goal</small>
          </div>
        </div>
      </div>

      <div className="bottom-actions">
        <button className="export">Export</button>
        <button className="save-filter">Save Filter</button>
      </div>
    </div>
  );
};

export default Explore;
