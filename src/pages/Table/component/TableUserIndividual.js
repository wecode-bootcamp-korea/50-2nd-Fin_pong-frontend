import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import Table from './Table';

const TableUserIndividual = (props) => {
  const CATEGORIES = ['생활비', '공과금', '기타'];

  return (
    <div className="tableUserIndividual">
      <table className="transaction-table">
        <thead>
          <tr>
            <th>날짜</th>
            <th>구분</th>
            <th>카테고리</th>
            <th>금액</th>
            <th>지출자</th>
            <th>메모</th>
          </tr>
        </thead>

        <tbody>
          {props.transactionList.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.date}</td>
              <td>{transaction.flowType}</td>
              <td>{transaction.category}</td>
              <td>{transaction.amount}</td>
              <td>{transaction.userName}</td>
              <td>{transaction.memo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUserIndividual;
