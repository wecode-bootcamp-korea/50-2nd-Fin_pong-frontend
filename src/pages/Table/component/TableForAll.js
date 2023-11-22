import React, { useState, useEffect } from 'react';
import './Table.scss';

const Table = () => {
  const CATEGORIES = ['생활비', '공과금', '기타'];

  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    amount: '',
    category: '',
    type: '지출',
    payer: '',
  });
  // const TOKEN =
  //   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRocmVlc2xAZ21haWwuY29tIiwiaWF0IjoxNzAwMTI4ODExLCJleHAiOjE3MDg3Njg4MTF9.a8jm42FaiAwRdy_hkOFgXo8iNh10kZzEDbg_EjkKNBg';
  // useEffect(() => {
  //   fetch(`http://10.58.52.109:8000/flow`, {
  //     method: 'GET',
  //     headers: {
  //       authorization: `Bearer ${TOKEN}`,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setTransactions(data.transactions);
  //     });
  // }, []);

  useEffect(() => {
    fetch('/data/bookSample.json')
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data.flows);
      });
  }, [transactions]);

  const handleInputChange = (e) => {
    setNewTransaction({
      ...newTransaction,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddTransaction = () => {
    setTransactions([...transactions, newTransaction]);
    setNewTransaction({
      date: '',
      amount: '',
      category: '',
      type: '지출',
      payer: '',
    });
  };

  return (
    <div>
      <table className="transaction-table">
        <thead>
          <tr>
            <th>날짜</th>
            <th>금액</th>
            <th>카테고리</th>
            <th>수입/지출</th>
            <th>지출자</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="date"
                name="date"
                value={newTransaction.date}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <input
                type="text"
                name="amount"
                value={newTransaction.amount}
                onChange={handleInputChange}
              />
            </td>
            <td>
              <select
                name="category"
                value={newTransaction.category}
                onChange={handleInputChange}
              >
                {CATEGORIES.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <select
                name="type"
                value={newTransaction.type}
                onChange={handleInputChange}
              >
                <option value="지출">지출</option>
                <option value="수입">수입</option>
              </select>
            </td>
            <td>
              <input
                type="text"
                name="payer"
                value={newTransaction.payer}
                onChange={handleInputChange}
              />
            </td>
          </tr>
          {transactions.map((transaction, index) => (
            <tr key={index}>
              <td>{transaction.date}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.category}</td>
              <td>{transaction.type}</td>
              <td>{transaction.payer}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button type="button" onClick={handleAddTransaction}>
        추가
      </button>
    </div>
  );
};

export default Table;
