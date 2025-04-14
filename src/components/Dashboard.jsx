import React from "react";
import {
  FaCreditCard,
  FaWallet,
  FaExchangeAlt,
  FaPiggyBank,
  FaShoppingCart,
  FaTaxi,
  FaUniversity,
  FaPlus,
} from "react-icons/fa";
import { defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import "./Dashboard.css";
defaults.responsive = true;

const Dashboard = ({ setPage }) => {
  const data = [
    { name: 'Mon', expense: 240 },
    { name: 'Tue', expense: 221 },
    { name: 'Wed', expense: 229 },
    { name: 'Thu', expense: 200 },
    { name: 'Fri', expense: 218 },
    { name: 'Sat', expense: 250 },
    { name: 'Sun', expense: 270 },
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
            $2,847.95 <span className="small-change">+2.5%</span>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span>Budget Remaining</span>
            <FaWallet style={{ color: "green" }} />
          </div>
          <div className="card-amount green">
            $1,152.05 <span className="small-change">28%</span>
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
            47 <span className="small-change">this month</span>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <span>Savings</span>
            <FaPiggyBank style={{ color: "red" }} />
          </div>
          <div className="card-amount green">
            $5,240.00 <span className="small-change">+12%</span>
          </div>
        </div>
      </div>

      <div className="expense-trends">
        <div className="trends-header">
          <h3>Expense Trends</h3>
          <div className="tabs">
            <button className="active">Week</button>
            <button>Month</button>
            <button>Year</button>
          </div>
        </div>
        <div className="chart-container">
          <Line 
            data={{
              labels: data.map((ele) => ele.name),
              datasets: [
                {
                  label: "Expense",
                  data: data.map((ele) => ele.expense),
                }
              ]
            }}/>
        </div>
      </div>

      <div className="recent-transactions">
        <div className="transactions-header">
          <h3>Recent Transactions</h3>
          <button className="view-all-btn" onClick={() => setPage("transactions")}>View All</button>
        </div>
        <ul>
          <li>
            <FaShoppingCart className="icon blue" />
            <div className="transaction-details">
              <p>Grocery Shopping</p>
              <small>Today, 2:30 PM</small>
            </div>
            <span className="amount red">- $84.50</span>
          </li>
          <li>
            <FaTaxi className="icon purple" />
            <div className="transaction-details">
              <p>Uber Ride</p>
              <small>Today, 1:15 PM</small>
            </div>
            <span className="amount red">- $12.80</span>
          </li>
          <li>
            <FaUniversity className="icon green" />
            <div className="transaction-details">
              <p>Salary Deposit</p>
              <small>Yesterday</small>
            </div>
            <span className="amount green">+ $3,250.00</span>
          </li>
        </ul>
      </div>

      <button className="fab">
        <FaPlus />
      </button>
    </>
  );
};

export default Dashboard;