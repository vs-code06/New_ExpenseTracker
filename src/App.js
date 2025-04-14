// App.jsx
import React, { useState } from "react";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transaction";
import { FaWallet } from "react-icons/fa";
import "./App.css";
import BudgetPlanner from "./components/BudgetPlanner";
import Insights from "./components/Insights";
import Explore from "./components/Explore";

const App = () => {
  const [activeTab, setActiveTab] = useState("dashboard");

  const renderPage = () => {
    switch (activeTab) {
      case "transactions":
        return <Transactions />;
      case "Budget planner":
        return <BudgetPlanner />
      case "Insights":
        return <Insights />
      case "Explore":
          return <Explore />
      default:
        return <Dashboard setPage={setActiveTab} />;
    }
  };

  return (
    <div className="dashboard">
      <header className="navbar">
        <div className="navbar-left">
          <FaWallet style={{ color: "blue" }} />
          <div className="logo">ExpenseFlow</div>
        </div>
        <nav className="nav-links">
          <button
            className={activeTab === "dashboard" ? "active" : ""}
            onClick={() => setActiveTab("dashboard")}
          >
            Dashboard
          </button>
          <button
            className={activeTab === "transactions" ? "active" : ""}
            onClick={() => setActiveTab("transactions")}
          >
            Transactions
          </button>

          <button 
          className={activeTab === "Budget planner" ? "active" : ""}
          onClick={() => setActiveTab("Budget planner")}
          >Budget Planner
          </button>

          <button 
          className={activeTab === "Insights" ? "active" : ""}
          onClick={() => setActiveTab("Insights")}
          >Insights</button>

          <button 
          className={activeTab === "Explore" ? "active" : ""}
          onClick={() => setActiveTab("Explore")}
          >Explore</button>

        </nav>
        <div className="navbar-right">
          <span className="notification"></span>
          <img
            src="https://i.pravatar.cc/40"
            alt="profile"
            className="avatar"
          />
        </div>
      </header>

      <main className="content">{renderPage()}</main>
    </div>
  );
};

export default App;