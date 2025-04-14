import React, { useState } from "react";
import { FaPlus, FaUtensils, FaCar, FaBolt, FaFilm, FaEdit } from "react-icons/fa";
import "./BudgetPlanner.css";

const initialCategories = [
  { name: "Food", icon: <FaUtensils />, budgeted: 800, spent: 650, color: "#f97316" },
  { name: "Transport", icon: <FaCar />, budgeted: 400, spent: 285, color: "#3b82f6" },
  { name: "Utilities", icon: <FaBolt />, budgeted: 300, spent: 310.5, color: "#ef4444" },
  { name: "Entertainment", icon: <FaFilm />, budgeted: 200, spent: 150, color: "#8b5cf6" },
];

const BudgetPlanner = () => {
  const [categories, setCategories] = useState(initialCategories);
  const [showPopup, setShowPopup] = useState(false);
  const [newName, setNewName] = useState("");
  const [newBudget, setNewBudget] = useState("");
  const [newSpent, setNewSpent] = useState("");
  const [totalBudget, setTotalBudget] = useState(0);
  const [showBudgetPopup, setShowBudgetPopup] = useState(false);
  const [updatedBudget, setUpdatedBudget] = useState("");
  const [editingIndex, setEditingIndex] = useState(null); 

  const totalSpent = categories.reduce((sum, c) => sum + c.spent, 0);
  const remainingBudget = totalBudget - totalSpent;

  const addCategory = () => {
    if (!newName || isNaN(newBudget) || isNaN(newSpent)) return;

    const updatedCategory = {
      name: newName,
      icon: <FaEdit />, 
      budgeted: parseFloat(newBudget),
      spent: parseFloat(newSpent),
      color: editingIndex !== null ? categories[editingIndex].color : "#10b981",
    };

    if (editingIndex !== null) {
      const updatedCategories = [...categories];
      updatedCategories[editingIndex] = {
        ...updatedCategories[editingIndex],
        ...updatedCategory,
      };
      setCategories(updatedCategories);
    } else {
      setCategories([...categories, updatedCategory]);
    }

    // Reset
    setNewName("");
    setNewBudget("");
    setNewSpent("");
    setEditingIndex(null);
    setShowPopup(false);
  };

  return (
    <div className="budget-container">
      <div className="budget-header">
        <h2>Budget Planner</h2>
        <p>March 2025</p>
      </div>

      <div className="budget-summary">
        <div className="summary-box">
          <p>Total Monthly Budget</p>
          <h3>${totalBudget.toFixed(2)}</h3>
        </div>
        <div className="summary-box">
          <p>Total Spent</p>
          <h3>${totalSpent.toFixed(2)}</h3>
        </div>
        <div className="summary-box">
          <p>Remaining Budget</p>
          <h3 className={remainingBudget > 0 ? "green" : "red"}>${remainingBudget.toFixed(2)}</h3>
        </div>
      </div>

      <div className="category-section">
        <div className="category-header">
          <h3>Budget Categories</h3>
          <button
            className="add-category"
            onClick={() => {
              setShowPopup(true);
              setNewName("");
              setNewBudget("");
              setNewSpent("");
              setEditingIndex(null);
            }}
          >
            <FaPlus /> Add Category
          </button>
        </div>

        {categories.map((cat, index) => {
          const remaining = cat.budgeted - cat.spent;
          const width = Math.min((cat.spent / cat.budgeted) * 100, 100);
          const remainingColor = remaining >= 0 ? "green" : "red";

          return (
            <div className="category-card" key={index}>
              <div className="card-header">
                <div className="left">
                  <span className="icon">{cat.icon}</span>
                  <strong>{cat.name}</strong>
                </div>
                <FaEdit
                  className="edit-icon"
                  onClick={() => {
                    setShowPopup(true);
                    setNewName(cat.name);
                    setNewBudget(cat.budgeted);
                    setNewSpent(cat.spent);
                    setEditingIndex(index);
                  }}
                />
              </div>
              <div className="card-details">
                <p>Budgeted: <strong>${cat.budgeted.toFixed(2)}</strong></p>
                <p>Spent: <strong>${cat.spent.toFixed(2)}</strong></p>
                <p>Remaining: <strong className={remainingColor}>
                  {remaining < 0 ? `- $${Math.abs(remaining).toFixed(2)}` : `$${remaining.toFixed(2)}`}
                </strong></p>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${width}%`, background: cat.color }}></div>
              </div>
            </div>
          );
        })}
      </div>

      <button className="fixed-update-btn" onClick={() => setShowBudgetPopup(true)}>
        Update Budget
      </button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>{editingIndex !== null ? "Edit Category" : "Add New Category"}</h3>
            <input
              type="text"
              placeholder="Category name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Budgeted amount"
              value={newBudget}
              onChange={(e) => setNewBudget(e.target.value)}
            />
            <input
              type="number"
              placeholder="Spent amount"
              value={newSpent}
              onChange={(e) => setNewSpent(e.target.value)}
            />
            <div className="popup-buttons">
              <button className="cancel-btn" onClick={() => {
                setShowPopup(false);
                setEditingIndex(null);
              }}>Cancel</button>
              <button className="confirm-btn" onClick={addCategory}>
                {editingIndex !== null ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {showBudgetPopup && (
        <div className="popup-overlay">
          <div className="popup-card">
            <h3>Update Total Monthly Budget</h3>
            <input
              type="number"
              placeholder="Enter new budget"
              value={updatedBudget}
              onChange={(e) => setUpdatedBudget(e.target.value)}
            />
            <div className="popup-buttons">
              <button className="cancel-btn" onClick={() => setShowBudgetPopup(false)}>Cancel</button>
              <button
                className="confirm-btn"
                onClick={() => {
                  if (!isNaN(updatedBudget) && updatedBudget !== "") {
                    setTotalBudget(parseFloat(updatedBudget));
                    setShowBudgetPopup(false);
                    setUpdatedBudget("");
                  }
                }}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetPlanner;
