import React from "react";
import {
  FaChartLine,
  FaSyncAlt,
  FaFileAlt
} from "react-icons/fa";
import "./Insights.css";

const Insights = () => {
  return (
    <div className="insights-container">
      <div className="insights-header">
        <h2>Insights</h2>
        <p>Visualize your spending trends and financial patterns</p>
        <div className="filters">
          <select>
            <option>Last 30 Days</option>
            <option>Last 7 Days</option>
            <option>This Month</option>
          </select>
          <select>
            <option>All Categories</option>
            <option>Food</option>
            <option>Transport</option>
            <option>Utilities</option>
          </select>
        </div>
      </div>

      <div className="insight-metrics">
        <div className="metric-card">
          <div className="metric-title">Highest Spending Category</div>
          <h3>Food & Dining</h3>
          <p className="metric-value blue">$856.42</p>
          <FaChartLine className="metric-icon" />
        </div>

        <div className="metric-card">
          <div className="metric-title">Most Frequent Category</div>
          <h3>Transport</h3>
          <p className="metric-value link">32 transactions</p>
          <FaSyncAlt className="metric-icon" />
        </div>

        <div className="metric-card">
          <div className="metric-title">Average Daily Spend</div>
          <h3>$42.50</h3>
          <p className="green">↓ 12% vs last month</p>
          <FaFileAlt className="metric-icon" />
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-box line-chart">
          <h4>Monthly Spending Trend</h4>
          <div className="chart-placeholder">[Line Chart Here]</div>
        </div>
        <div className="chart-box pie-chart">
          <h4>Spending by Category</h4>
          <div className="chart-placeholder">[Pie Chart Here]</div>
        </div>
      </div>

      <div className="top-categories">
        <h4>Top Expense Categories</h4>
        <div className="category-row">
          <div className="category-name">Food & Dining</div>
          <div className="category-bar">
            <div className="fill" style={{ width: "80%" }}></div>
          </div>
          <div className="amount">$856.42</div>
        </div>
        <div className="category-row">
          <div className="category-name">Transport</div>
          <div className="category-bar">
            <div className="fill" style={{ width: "70%" }}></div>
          </div>
          <div className="amount">$645.20</div>
        </div>
        <div className="category-row">
          <div className="category-name">Bills</div>
          <div className="category-bar">
            <div className="fill" style={{ width: "55%" }}></div>
          </div>
          <div className="amount">$512.75</div>
        </div>
      </div>
    </div>
  );
};

export default Insights;
