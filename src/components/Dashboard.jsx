import React from "react";
import {
  FaCreditCard,
  FaWallet,
  FaExchangeAlt,
  FaPiggyBank,
  FaShoppingCart,
  FaTaxi,
  FaUniversity,
} from "react-icons/fa";
import { defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { ExpenseData } from "./ExpenseData"; // Import ExpenseData
import "./Dashboard.css";
defaults.responsive = true;

const Dashboard = ({ setPage }) => {
  const totalExpenses = ExpenseData.filter(item => item.amount < 0)
    .reduce((acc, item) => acc + item.amount, 0);

  const totalIncome = ExpenseData.filter(item => item.amount > 0)
    .reduce((acc, item) => acc + item.amount, 0);

  const budgetRemaining = ExpenseData.reduce((acc, item) => acc + item.budget, 0);
  const weeklyExpensesData = [
    { name: "Mon", expense: 240 },
    { name: "Tue", expense: 221 },
    { name: "Wed", expense: 229 },
    { name: "Thu", expense: 200 },
    { name: "Fri", expense: 218 },
    { name: "Sat", expense: 250 },
    { name: "Sun", expense: 270 },
  ];

  return (
    <>
      <div className="greeting">
        <h2>Good morning, Alex!</h2>
        <p>Here's your financial overview for today</p>
      </div>

      <div className="summary-cards">
        <div className="card">
          <div className="card-header">
            <span>Total Expenses</span>
            <FaCreditCard style={{ color: "blue" }} />
          </div>
          <div className="card-amount red">
            ${totalExpenses.toFixed(2)} <span className="small-change">+2.5%</span>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span>Budget Remaining</span>
            <FaWallet style={{ color: "green" }} />
          </div>
          <div className="card-amount green">
            ${budgetRemaining.toFixed(2)} <span className="small-change">28%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: "28%" }}></div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span>Transactions</span>
            <FaExchangeAlt style={{ color: "purple" }} />
          </div>
          <div className="card-amount">
            {ExpenseData.filter(item => item.amount !== 0).length}{" "}
            <span className="small-change">this month</span>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span>Savings</span>
            <FaPiggyBank style={{ color: "red" }} />
          </div>
          <div className="card-amount green">
            ${(totalIncome + totalExpenses).toFixed(2)} <span className="small-change">+12%</span>
          </div>
        </div>
      </div>

      <div className="expense-trends">
        <div className="trends-header">
          <h3>Expense Trends</h3>
          <div className="tabs">
            <button className="active">Week</button>
          </div>
        </div>
        <div className="chart-container">
          <Line
            data={{
              labels: weeklyExpensesData.map((ele) => ele.name),
              datasets: [
                {
                  label: "Expense",
                  data: weeklyExpensesData.map((ele) => ele.expense),
                },
              ],
            }}
          />
        </div>
      </div>

      <div className="recent-transactions">
        <div className="transactions-header">
          <h3>Recent Transactions</h3>
          <button className="view-all-btn" onClick={() => setPage("transactions")}>
            View All
          </button>
        </div>
        <ul>
          {ExpenseData.slice(0, 3).map((transaction) => (
            <li key={transaction.id}>
              {transaction.amount < 0 ? (
                <FaShoppingCart className="icon blue" />
              ) : transaction.category === "Income" ? (
                <FaUniversity  />
              ) : (
                <FaTaxi  />
              )}
              <div className="transaction-details">
                <p>{transaction.title}</p>
                <small>{transaction.date}</small>
              </div>
              <span className={`amount ${transaction.amount < 0 ? "red" : "green"}`}>
                {transaction.amount < 0 ? "-" : "+"} ${Math.abs(transaction.amount).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>

    </>
  );
};

export default Dashboard;
