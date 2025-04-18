// components/Profile.jsx
import React from "react";
import "./Profile.css";
import { FaEdit, FaSignOutAlt, FaWallet, FaExchangeAlt, FaPiggyBank } from "react-icons/fa";
import { ExpenseData } from "./ExpenseData";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const totalExpenses = ExpenseData.filter((item) => item.amount < 0)
    .reduce((sum, item) => sum + item.amount, 0);

  const totalIncome = ExpenseData.filter((item) => item.amount > 0)
    .reduce((sum, item) => sum + item.amount, 0);

  const totalTransactions = ExpenseData.length;

  const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/"); 
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <img
          src="https://i.pravatar.cc/100"
          alt="Profile"
          className="profile-avatar"
        />
        <h2>Alex Johnson</h2>
        <p className="email">alex@example.com</p>
        <button className="edit-btn"><FaEdit /> Edit Profile</button>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <FaExchangeAlt className="stat-icon" />
          <p>Total Transactions</p>
          <h3>{totalTransactions}</h3>
        </div>
        <div className="stat-card">
          <FaPiggyBank className="stat-icon" />
          <p>Total Savings</p>
          <h3>${(totalIncome + totalExpenses).toFixed(2)}</h3>
        </div>
        <div className="stat-card">
          <FaWallet className="stat-icon" />
          <p>Total Expenses</p>
          <h3>${Math.abs(totalExpenses).toFixed(2)}</h3>
        </div>
      </div>

      <div className="logout-section">
        <button className="logout-btn" onClick={handleLogout}>
          <FaSignOutAlt /> Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
