import React, { useState, useEffect } from 'react';
import './Transaction.css';
import { FaSearch, FaTrash } from 'react-icons/fa';
import { ExpenseData } from './ExpenseData';

export default function Transactions() {
  const [transactions, setTransactions] = useState(ExpenseData);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setTransactions(ExpenseData);
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = (id) => {
    const updatedTransactions = transactions.filter((tx) => tx.id !== id);
    setTransactions(updatedTransactions);
  };

  const filteredTransactions = transactions.filter((tx) =>
    tx.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="content">
      <h2>Transactions</h2>

      <div className="filters">
        <div className="search-box">
          <FaSearch />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={handleSearch}
          />
        </div>
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
            {filteredTransactions.map((tx) => (
              <tr key={tx.id}>
                <td>{tx.date}</td>
                <td>
                  <span className={`tag ${tx.category.toLowerCase()}`}>
                    {tx.category}
                  </span>
                </td>
                <td>{tx.title}</td>
                <td className={tx.amount >= 0 ? 'green' : 'red'}>
                  {tx.amount >= 0 ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                </td>
                <td className="actions">
                  <FaTrash onClick={() => handleDelete(tx.id)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
