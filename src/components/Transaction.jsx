import React from 'react';
import './Transaction.css';
import { FaSearch, FaEdit, FaTrash } from 'react-icons/fa';

const transactions = [
  {
    date: 'Apr 10, 2025',
    category: 'Food',
    tagColor: 'blue',
    description: 'Lunch at Subway',
    amount: -12.99,
  },
  {
    date: 'Apr 09, 2025',
    category: 'Income',
    tagColor: 'green',
    description: 'Freelance Payment',
    amount: 850,
  },
  {
    date: 'Apr 08, 2025',
    category: 'Transport',
    tagColor: 'purple',
    description: 'Uber Ride',
    amount: -24.5,
  },
];

export default function Transactions() {
  return (
    <div className="content">
      <h2>Transactions</h2>

      <div className="filters">
        <div className="search-box">
          <FaSearch />
          <input type="text" placeholder="Search transactions..." />
        </div>
        <select>
          <option>All Categories</option>
        </select>
        <input type="text" placeholder="dd/mm/yyyy" />
        <select>
          <option>Amount Range</option>
        </select>
      </div>

      <div className="transactions-table">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Category</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((tx, index) => (
              <tr key={index}>
                <td>{tx.date}</td>
                <td>
                  <span className={`tag ${tx.tagColor.toLowerCase()}`}>
                    {tx.category}
                  </span>
                </td>
                <td>{tx.description}</td>
                <td className={tx.amount >= 0 ? 'green' : 'red'}>
                  {tx.amount >= 0 ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                </td>
                <td className="actions">
                  <FaEdit />
                  <FaTrash />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
