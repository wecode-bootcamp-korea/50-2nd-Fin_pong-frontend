// 1. 버튼 다섯개 만들기
// 2. default로 userAll 테이블이 보이도록 설정
// 2-1.fetch로 모든 정보를 받아와서 props로 보내주기
// 3. 각 유저 버튼이 눌렸을 때 그 유저 테이블이 보이도록 설정
// 4. 테이블 각 row에서 수정, 삭제 할 수 있도록 설정
// 5. (부가) 테이블 페이지에서 등록할 수 있는 버튼 추가
// 6.
import React, { useState, useEffect } from 'react';
import AccountBook from './component/AccountBook';
import TransactionModifyModal from './component/TransactionModifyModal';

const Table = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  // const TOKEN = localStorage.getItem('TOKEN');
  const TOKEN = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InNpeHNsQGdtYWlsLmNvbSIsImlhdCI6MTcwMDY0NjMzMCwiZXhwIjo4NjQwMDE3MDA2NDYzMzB9.2O2PmUUJYAX3kG3_JYhfrXYhhv8CnilM5sx_qnDRu-g`;

  useEffect(() => {
    fetch('http:/43.202.56.239:8000/flow', {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTransactions(data.flows));
    console.log(transactions);
  }, []);

  const deleteTransaction = (id) => {
    fetch(`http:/43.202.56.239:8000/flow/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        authorization: `Bearer ${TOKEN}`,
      },
    })
      .then(() => {
        setTransactions(
          transactions.filter((transaction) => transaction.id !== id),
        );
      })
      .catch((error) => console.error('Error:', error));
  };

  const openModal = (transaction) => {
    setSelectedTransaction(transaction);
  };

  const closeModal = () => {
    setSelectedTransaction(null);
  };

  return (
    <div>
      <h2>가계부</h2>
      <AccountBook
        transactions={transactions}
        deleteTransaction={deleteTransaction}
        openModal={openModal}
      />
      {selectedTransaction && (
        <TransactionModifyModal
          isOpen={!!selectedTransaction}
          onClose={closeModal}
          transaction={selectedTransaction}
          setTransactions={setTransactions}
        />
      )}
    </div>
  );
};

export default Table;
