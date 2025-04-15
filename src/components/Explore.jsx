import React, { useState } from "react";
import "./Explore.css";
import { FaTrash, FaChartLine, FaRedoAlt, FaBullseye } from "react-icons/fa";
import { ExpenseData } from "./ExpenseData";

const Explore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [typeFilter, setTypeFilter] = useState("All");
  const [minAmount, setMinAmount] = useState("");
  const [maxAmount, setMaxAmount] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [transactions, setTransactions] = useState(ExpenseData);

  const filteredTransactions = transactions.filter((txn) => {
    const titleMatch = txn.title.toLowerCase().includes(searchTerm.toLowerCase());
    const categoryMatch = categoryFilter === "All Categories" || txn.category === categoryFilter;
    const typeMatch =
      typeFilter === "All" ||
      (typeFilter === "Income" && txn.amount > 0) ||
      (typeFilter === "Expense" && txn.amount < 0);
    const minAmountMatch = minAmount === "" || Math.abs(txn.amount) >= parseFloat(minAmount);
    const maxAmountMatch = maxAmount === "" || Math.abs(txn.amount) <= parseFloat(maxAmount);
    const dateMatch =
      (!startDate || new Date(txn.date) >= new Date(startDate)) &&
      (!endDate || new Date(txn.date) <= new Date(endDate));

    return titleMatch && categoryMatch && typeMatch && minAmountMatch && maxAmountMatch && dateMatch;
  });

  const handleDelete = (id) => {
    setTransactions((prev) => prev.filter((txn) => txn.id !== id));
  };

  return (
    <div className="explore-container">
      <h2>Explore</h2>
      <p className="para">Search and filter your data with precision</p>

      <input
        className="search-bar"
        type="text"
        placeholder="Search transactions..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="filters-section separated-filters">
        <div className="filter-card">
          <label>Date Range</label>
          <div className="date-inputs">
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
          </div>
        </div>

        <div className="filter-card">
          <label>Category</label>
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
            <option>All Categories</option>
            {[...new Set(ExpenseData.map((t) => t.category))].map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="filter-card">
          <label>Amount Range</label>
          <div className="range-inputs">
            <input
              type="number"
              placeholder="Min"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
            />
            <input
              type="number"
              placeholder="Max"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-card">
          <label>Transaction Type</label>
          <div className="transaction-type">
            <button className={typeFilter === "Income" ? "active" : ""} onClick={() => setTypeFilter("Income")}>Income</button>
            <button className={typeFilter === "Expense" ? "active" : ""} onClick={() => setTypeFilter("Expense")}>Expense</button>
            <button className={typeFilter === "All" ? "active" : ""} onClick={() => setTypeFilter("All")}>All</button>
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
        {filteredTransactions.map((txn) => (
          <div className="table-row" key={txn.id}>
            <span>{new Date(txn.date).toLocaleDateString()}</span>
            <span>{txn.title}</span>
            <span>{txn.category}</span>
            <span style={{color:txn.amount > 0 ? "#10b981":"red"}}>{txn.amount < 0 ? "-" : ""}${Math.abs(txn.amount)}</span>
            <span>
              <span className="tag">{txn.amount < 0 ? "Expense" : "Income"}</span>
            </span>
            <span className="actions">
              <FaTrash className="delete-icon" onClick={() => handleDelete(txn.id)} />
            </span>
          </div>
        ))}
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