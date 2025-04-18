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
import { Line } from "react-chartjs-2";
import { defaults } from "chart.js/auto";
import { ExpenseData } from "./ExpenseData";
import "./Dashboard.css";
import { useNavigate } from "react-router-dom"; 

defaults.responsive = true;

const Dashboard = () => {
  const navigate = useNavigate()
  const totalExpenses = ExpenseData
    .filter((item) => item.amount < 0)
    .reduce((sum, item) => sum + item.amount, 0);

  const totalIncome = ExpenseData
    .filter((item) => item.amount > 0)
    .reduce((sum, item) => sum + item.amount, 0);

  const budgetRemaining = ExpenseData
    .reduce((sum, item) => sum + item.budget, 0);

  const weeklyExpensesData = [
    { name: "Mon", expense: 240 },
    { name: "Tue", expense: 221 },
    { name: "Wed", expense: 229 },
    { name: "Thu", expense: 200 },
    { name: "Fri", expense: 218 },
    { name: "Sat", expense: 250 },
    { name: "Sun", expense: 270 },
  ];

  const recentTransactions = ExpenseData.slice(0, 3);

  return (
    <>
      <div className="greeting">
        <h2>Good morning, Alex!</h2>
        <p>Your financial summary for today</p>
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
            {ExpenseData.filter(item => item.amount !== 0).length}
            <span className="small-change"> this month</span>
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
              labels: weeklyExpensesData.map(day => day.name),
              datasets: [
                {
                  label: "Expense",
                  data: weeklyExpensesData.map(day => day.expense),
                  borderColor: "#4b7bec",
                  backgroundColor: "rgba(75, 123, 236, 0.2)",
                  tension: 0.4,
                  fill: true,
                },
              ],
            }}
            options={{
              plugins: {
                legend: { display: false },
              },
              scales: {
                y: {
                  beginAtZero: true,
                },
              },
            }}
          />
        </div>
      </div>

      <div className="recent-transactions">
        <div className="transactions-header">
          <h3>Recent Transactions</h3>
          <button className="view-all-btn"  onClick={() => navigate("/transactions")}>
            View All
          </button>
        </div>
        <ul>
          {recentTransactions.map((tx) => (
            <li key={tx.id}>
              {tx.amount < 0 ? (
                <FaShoppingCart className="icon blue" />
              ) : tx.category === "Income" ? (
                <FaUniversity />
              ) : (
                <FaTaxi />
              )}
              <div className="transaction-details">
                <p>{tx.title}</p>
                <small>{tx.date}</small>
              </div>
              <span className={`amount ${tx.amount < 0 ? "red" : "green"}`}>
                {tx.amount < 0 ? "-" : "+"}${Math.abs(tx.amount).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
      </div>
      <footer className="dashboard-footer">
        <p>© 2025 ExpenseFlow. Built with 💙 to help you master your money.</p>
        <p>Track smarter. Spend wiser. Save better.</p>
      </footer>

    </>
  );
};

export default Dashboard;
