import React, { useState, useEffect } from 'react';
import AccountBook from './component/AccountBook';
import './Table.scss';

// 4. 테이블 각 row에서 수정, 삭제 할 수 있도록 설정
// 5. (부가) 테이블 페이지에서 등록할 수 있는 버튼 추가

const Table = () => {
  const [transactions, setTransactions] = useState([]);
  // const TOKEN = localStorage.getItem('TOKEN');
  const TOKEN = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp3azIzNDVAbmF2ZXIuY29tIiwiaWF0IjoxNzAwNjU1MjI5LCJleHAiOjg2NDAwMTcwMDY1NTIyOX0.CRdwvSjbRbNrstmfhF5jJg_HaGieL8wO-TH12JVfUUA`;
  const fetchTransactions = (user = '') => {
    fetch(`http://43.202.56.239:8000/flow?user=${user}`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setTransactions(data.flows);
      });
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  const handleButtonClick = (user) => {
    fetchTransactions(user);
  };

  const deleteTransaction = (id) => {
    fetch(`http://43.202.56.239:8000/flow/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${TOKEN}`,
      },
    }).then(() => {
      setTransactions(
        transactions.filter((transaction) => transaction.id !== id),
      );
    });
  };

  return (
    <div className="Table">
      <button className="btnForTableUser" onClick={() => handleButtonClick('')}>
        우리 가족
      </button>
      <button
        className="btnForTableUser"
        onClick={() => handleButtonClick('user1')}
      >
        유저 1
      </button>
      <button
        className="btnForTableUser"
        onClick={() => handleButtonClick('user2')}
      >
        유저 2
      </button>
      <button
        className="btnForTableUser"
        onClick={() => handleButtonClick('user3')}
      >
        유저 3
      </button>
      <button
        className="btnForTableUser"
        onClick={() => handleButtonClick('user4')}
      >
        유저 4
      </button>
      <AccountBook
        transactions={transactions}
        deleteTransaction={deleteTransaction}
      />
    </div>
  );
};

export default Table;
