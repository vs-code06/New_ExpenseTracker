import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useNavigate,
} from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Transactions from "./components/Transaction";
import BudgetPlanner from "./components/BudgetPlanner";
import Insights from "./components/Insights";
import Explore from "./components/Explore";
import Profile from "./components/Profile";
import { FaWallet, FaBars, FaTimes } from "react-icons/fa";
import "./App.css";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Router>
      <div className="dashboard">
        <Header menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
        <main className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/budget" element={<BudgetPlanner />} />
            <Route path="/insights" element={<Insights />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

const Header = ({ menuOpen, setMenuOpen }) => {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar-left">
        <FaWallet style={{ color: "blue" }} />
        <div className="logo" onClick={() => navigate("/")}>
          ExpenseFlow
        </div>
      </div>

      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </div>

      <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
        <NavLink to="/" end className={({ isActive }) => isActive ? "active" : ""} onClick={() => setMenuOpen(false)}>
          Dashboard
        </NavLink>
        <NavLink to="/transactions" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setMenuOpen(false)}>
          Transactions
        </NavLink>
        <NavLink to="/budget" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setMenuOpen(false)}>
          Budget Planner
        </NavLink>
        <NavLink to="/insights" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setMenuOpen(false)}>
          Insights
        </NavLink>
        <NavLink to="/explore" className={({ isActive }) => isActive ? "active" : ""} onClick={() => setMenuOpen(false)}>
          Explore
        </NavLink>
      </nav>

      <div className="navbar-right">
        <span className="notification"></span>
        <img
          src="https://i.pravatar.cc/40"
          alt="profile"
          className="avatar"
          onClick={() => navigate("/profile")}
        />
      </div>
    </header>
  );
};

export default App;
