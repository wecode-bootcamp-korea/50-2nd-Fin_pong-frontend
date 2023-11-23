import React from 'react';
import './AccountBook.scss';

const AccountBook = ({ transactions, deleteTransaction }) => {
  const numWithComma = (a) => {
    if (a === undefined) {
      return '';
    }
    return a.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };

  return (
    <div className="AccountBook">
      <table className="tableWrapper">
        <thead className="columnHeader">
          <tr className="headerWrapper">
            <th>날짜</th>
            <th>구분</th>
            <th>카테고리</th>
            <th>금액</th>
            <th>지출자</th>
            <th>메모</th>
            <th>삭제</th>
          </tr>
        </thead>
        <tbody className="rowContent">
          {transactions.map((transaction, index) => (
            <tr key={index} className="bodyWrapper">
              <td>
                {transaction.year}년 {transaction.month}월 {transaction.date}일
              </td>
              <td
                className={
                  transaction.flowType === '지출' ? 'expense' : 'income'
                }
              >
                {transaction.flowType}
              </td>
              <td>{transaction.category}</td>
              <td>{numWithComma(transaction.amount)}</td>
              <td>{transaction.userName}</td>
              <td>{transaction.memo}</td>
              <td>
                <button onClick={() => deleteTransaction(index)}>삭제</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountBook;
