import React, { useState } from "react";
import {
  FaPlus, FaUtensils, FaCar, FaBolt, FaFilm, FaHeart, FaShoppingBag, FaBook, FaEdit
} from "react-icons/fa";
import "./BudgetPlanner.css";
import { ExpenseData } from "./ExpenseData"; // adjust path as needed

const iconMap = {
  Food: <FaUtensils />,
  Transport: <FaCar />,
  Utilities: <FaBolt />,
  Entertainment: <FaFilm />,
  Health: <FaHeart />,
  Shopping: <FaShoppingBag />,
  Education: <FaBook />,
};

const colorMap = {
  Food: "#f97316",
  Transport: "#3b82f6",
  Utilities: "#ef4444",
  Entertainment: "#8b5cf6",
  Health: "#10b981",
  Shopping: "#eab308",
  Education: "#14b8a6",
};

const BudgetPlanner = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [newName, setNewName] = useState("");
  const [newBudget, setNewBudget] = useState("");
  const [newSpent, setNewSpent] = useState("");
  const [showBudgetPopup, setShowBudgetPopup] = useState(false);
  const [updatedBudget, setUpdatedBudget] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [customCategories, setCustomCategories] = useState([]);

  const grouped = {};
  ExpenseData.forEach(({ category, amount, budget }) => {
    if (!grouped[category]) {
      grouped[category] = { spent: 0, budgeted: 0 };
    }
    if (amount < 0) {
      grouped[category].spent += Math.abs(amount);
    }
    if (budget > 0) {
      grouped[category].budgeted = budget;
    }
  });

  const initialBudget = Object.values(grouped)
    .filter((group) => group.budgeted > 0)
    .reduce((sum, group) => sum + group.budgeted, 0);

  const [totalBudget, setTotalBudget] = useState(initialBudget);

  const mergedCategories = Object.keys(grouped)
    .filter((cat) => grouped[cat].budgeted > 0) // exclude income
    .map((cat) => ({
      name: cat,
      icon: iconMap[cat] || <FaEdit />,
      color: colorMap[cat] || "#10b981",
      budgeted: grouped[cat].budgeted,
      spent: grouped[cat].spent,
    }));

  const allCategories = [...mergedCategories, ...customCategories];
  const totalSpent = allCategories.reduce((sum, c) => sum + c.spent, 0);
  const remainingBudget = totalBudget - totalSpent;

  const addCategory = () => {
    if (!newName || isNaN(newBudget) || isNaN(newSpent)) return;

    const newCategory = {
      name: newName,
      icon: <FaEdit />,
      color: "#10b981",
      budgeted: parseFloat(newBudget),
      spent: parseFloat(newSpent),
    };

    if (editingIndex !== null) {
      const updated = [...customCategories];
      updated[editingIndex] = newCategory;
      setCustomCategories(updated);
    } else {
      setCustomCategories([...customCategories, newCategory]);
    }

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
        <p>April 2025</p>
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
          <h3 className={remainingBudget >= 0 ? "green" : "red"}>
            {remainingBudget < 0 ? `- $${Math.abs(remainingBudget).toFixed(2)}` : `$${remainingBudget.toFixed(2)}`}
          </h3>
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

        {allCategories.map((cat, index) => {
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
                {index >= mergedCategories.length && (
                  <FaEdit
                    className="edit-icon"
                    onClick={() => {
                      const customCat = customCategories[index - mergedCategories.length];
                      setShowPopup(true);
                      setNewName(customCat.name);
                      setNewBudget(customCat.budgeted);
                      setNewSpent(customCat.spent);
                      setEditingIndex(index - mergedCategories.length);
                    }}
                  />
                )}
              </div>
              <div className="card-details">
                <p>Budgeted: <strong>${cat.budgeted.toFixed(2)}</strong></p>
                <p>Spent: <strong>${cat.spent.toFixed(2)}</strong></p>
                <p>Remaining: <strong className={remainingColor}>
                  {remaining < 0 ? `- $${Math.abs(remaining).toFixed(2)}` : `$${remaining.toFixed(2)}`}
                </strong></p>
              </div>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${width}%`, background: cat.color }}
                ></div>
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
