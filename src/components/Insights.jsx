import React, { useState } from "react";
import {
  FaChartLine,
  FaSyncAlt,
  FaFileAlt
} from "react-icons/fa";
import { ExpenseData } from "./ExpenseData";
import "./Insights.css";
import { Line } from "react-chartjs-2";

const Insights = () => {
  const [selectedRange, setSelectedRange] = useState("30");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const filterByTime = (transactions) => {
    const today = new Date();
    return transactions.filter((txn) => {
      const txnDate = new Date(txn.date);
      const diffTime = (today - txnDate) / (1000 * 60 * 60 * 24);
      if (selectedRange === "7") return diffTime <= 7;
      if (selectedRange === "month") return txnDate.getMonth() === today.getMonth();
      return diffTime <= 30;
    });
  };

  const filteredExpenses = filterByTime(
    ExpenseData.filter((txn) => txn.amount < 0 && (selectedCategory === "All" || txn.category === selectedCategory))
  );

  const categoryTotals = {};
  const categoryCounts = {};
  filteredExpenses.forEach((txn) => {
    if (!categoryTotals[txn.category]) {
      categoryTotals[txn.category] = 0;
      categoryCounts[txn.category] = 0;
    }
    categoryTotals[txn.category] += Math.abs(txn.amount);
    categoryCounts[txn.category] += 1;
  });

  const highestSpendingCategory = Object.keys(categoryTotals).reduce(
    (max, cat) => (categoryTotals[cat] > (categoryTotals[max] || 0) ? cat : max),
    ""
  );

  const mostFrequentCategory = Object.keys(categoryCounts).reduce(
    (max, cat) => (categoryCounts[cat] > (categoryCounts[max] || 0) ? cat : max),
    ""
  );

  const totalSpend = filteredExpenses.reduce((sum, txn) => sum + Math.abs(txn.amount), 0);
  const earliestDate = filteredExpenses.reduce((earliest, txn) => new Date(txn.date) < earliest ? new Date(txn.date) : earliest, new Date());
  const daysSpan = (new Date() - earliestDate) / (1000 * 60 * 60 * 24);
  const avgDailySpend = daysSpan ? (totalSpend / daysSpan).toFixed(2) : totalSpend.toFixed(2);

  return (
    <div className="insights-container">
      <div className="insights-header">
        <h2>Insights</h2>
        <p>Visualize your spending trends and financial patterns</p>
        <div className="filters">
          <select value={selectedRange} onChange={(e) => setSelectedRange(e.target.value)}>
            <option value="30">Last 30 Days</option>
            <option value="7">Last 7 Days</option>
            <option value="month">This Month</option>
          </select>
          <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="All">All Categories</option>
            {[...new Set(ExpenseData.map(txn => txn.category))].map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="insight-metrics">
        <div className="metric-card">
          <div className="metric-title">Highest Spending Category</div>
          <h3>{highestSpendingCategory || "N/A"}</h3>
          <p className="metric-value blue">${categoryTotals[highestSpendingCategory]?.toFixed(2) || "0.00"}</p>
          <FaChartLine className="metric-icon" />
        </div>

        <div className="metric-card">
          <div className="metric-title">Most Frequent Category</div>
          <h3>{mostFrequentCategory || "N/A"}</h3>
          <p className="metric-value link">{categoryCounts[mostFrequentCategory] || 0} transactions</p>
          <FaSyncAlt className="metric-icon" />
        </div>

        <div className="metric-card">
          <div className="metric-title">Average Daily Spend</div>
          <h3>${avgDailySpend}</h3>
          <p className="green">vs last month</p>
          <FaFileAlt className="metric-icon" />
        </div>
      </div>

      <div className="charts-section">
        <div className="chart-box line-chart">
          <h4>Monthly Spending Trend</h4>
          <div className="chart-placeholder">
          <Line
            data={{
              labels: ExpenseData.map((ele) => ele.budget > 0 ? ele.title : null),
              datasets: [
                {
                  label: "Expense",
                  data: ExpenseData.map((ele) => ele.budget > 0 ? ele.budget : null)
                },
              ],
            }}
          />

          </div>
        </div>
        <div className="chart-box pie-chart">
          <h4>Spending by Category</h4>
          <div className="chart-placeholder">[Pie Chart Here]</div>
        </div>
      </div>

      <div className="top-categories">
        <h4>Top Expense Categories</h4>
        {Object.entries(categoryTotals)
          .sort((a, b) => b[1] - a[1])
          .map(([cat, total]) => (
            <div className="category-row" key={cat}>
              <div className="category-name">{cat}</div>
              <div className="category-bar">
                <div className="fill" style={{ width: `${(total / totalSpend) * 100}%` }}></div>
              </div>
              <div className="amount">${total.toFixed(2)}</div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default Insights;
