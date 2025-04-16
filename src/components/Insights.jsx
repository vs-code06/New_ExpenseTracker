import React, { useState } from "react";
import { FaChartLine, FaSyncAlt, FaFileAlt } from "react-icons/fa";
import { ExpenseData } from "./ExpenseData";
import "./Insights.css";
import { Line, Pie } from "react-chartjs-2";

const Insights = () => {
  const [selectedRange, setSelectedRange] = useState("30");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter transactions by selected time range
  const filterByTime = (transactions) => {
    const today = new Date();
    return transactions.filter((txn) => {
      const txnDate = new Date(txn.date);
      const daysDiff = (today - txnDate) / (1000 * 60 * 60 * 24);

      if (selectedRange === "7") return daysDiff <= 7;
      if (selectedRange === "month") return txnDate.getMonth() === today.getMonth();

      return daysDiff <= 30;
    });
  };

  // Filter for only expense transactions in selected category
  const filteredExpenses = filterByTime(
    ExpenseData.filter((item) => {
      return item.amount < 0 && (selectedCategory === "All" || item.category === selectedCategory);
    })
  );

  // Count total and frequency for each category
  const categoryTotals = {};
  const categoryCounts = {};
  filteredExpenses.forEach((txn) => {
    const cat = txn.category;
    const amount = Math.abs(txn.amount);

    if (!categoryTotals[cat]) {
      categoryTotals[cat] = 0;
      categoryCounts[cat] = 0;
    }

    categoryTotals[cat] += amount;
    categoryCounts[cat] += 1;
  });

  // Get highest spending category
  let highestSpendingCategory = "";
  let maxAmount = 0;
  for (const cat in categoryTotals) {
    if (categoryTotals[cat] > maxAmount) {
      maxAmount = categoryTotals[cat];
      highestSpendingCategory = cat;
    }
  }

  // Get most frequent category
  let mostFrequentCategory = "";
  let maxCount = 0;
  for (const cat in categoryCounts) {
    if (categoryCounts[cat] > maxCount) {
      maxCount = categoryCounts[cat];
      mostFrequentCategory = cat;
    }
  }

  // Calculate average daily spend
  let totalSpend = 0;
  let earliestDate = new Date();
  filteredExpenses.forEach((txn) => {
    totalSpend += Math.abs(txn.amount);
    const txnDate = new Date(txn.date);
    if (txnDate < earliestDate) earliestDate = txnDate;
  });

  const daysSpan = (new Date() - earliestDate) / (1000 * 60 * 60 * 24);
  const avgDailySpend = daysSpan > 0 ? (totalSpend / daysSpan).toFixed(2) : totalSpend.toFixed(2);

  // Prepare pie chart data from all data (not filtered)
  const categoryPieTotals = {};
  ExpenseData.forEach((txn) => {
    if (!categoryPieTotals[txn.category]) {
      categoryPieTotals[txn.category] = 0;
    }
    categoryPieTotals[txn.category] += txn.amount;
  });

  const pieChartData = Object.entries(categoryPieTotals)
    .filter(([_, total]) => total !== 0)
    .map(([category, total]) => ({ category, total }));

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
            {[...new Set(ExpenseData.map((txn) => txn.category))].map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="insight-metrics">
        <div className="metric-card">
          <div className="metric-title">Highest Spending Category</div>
          <h3>{highestSpendingCategory || "N/A"}</h3>
          <p className="metric-value blue">
            ${categoryTotals[highestSpendingCategory]?.toFixed(2) || "0.00"}
          </p>
          <FaChartLine className="metric-icon" />
        </div>

        <div className="metric-card">
          <div className="metric-title">Most Frequent Category</div>
          <h3>{mostFrequentCategory || "N/A"}</h3>
          <p className="metric-value link">
            {categoryCounts[mostFrequentCategory] || 0} transactions
          </p>
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
                labels: ExpenseData.map((item) => item.budget > 0 ? item.title : null),
                datasets: [
                  {
                    label: "Budget",
                    data: ExpenseData.map((item) => item.budget > 0 ? item.budget : null),
                    backgroundColor: "rgba(75,192,192,0.4)",
                    borderColor: "rgba(75,192,192,1)",
                    borderWidth: 1
                  }
                ]
              }}
            />
          </div>
        </div>

        <div className="chart-box pie-chart">
          <h4>Spending by Category</h4>
          <div className="chart-placeholder">
            <Pie
              data={{
                labels: pieChartData.map((item) => item.category),
                datasets: [
                  {
                    label: "Total",
                    data: pieChartData.map((item) => item.total),
                    backgroundColor: [
                      "#FF6384",
                      "#36A2EB",
                      "#FFCE56",
                      "#8e44ad",
                      "#2ecc71",
                      "#f39c12",
                    ]
                  }
                ]
              }}
            />
          </div>
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
