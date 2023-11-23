import React, { useEffect, useState } from 'react';
import './TransactionModifyModal.scss';

const TransactionModifyModal = ({
  isOpen,
  onClose,
  transaction,
  setTransactions,
}) => {
  // const [transactionInfo, setTransactionInfo] = useState({
  //   date: new Date(),
  //   userName: '',
  //   allowance: '',
  // });
  // const handleTransactionInfo = (name, value) => {
  //   setTransactionInfo({ ...transactionInfo, [name]: value });
  // };
  // API 수정
  // const handleModify = () => {
  //   fetch('http://your-backend-url.com/data', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(transactionInfo),
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.message === 'POST_SUCCESS') {
  //         alert(' 내역 등록이 완료되었습니다! ');
  //         setTransactions((prev) =>
  //           prev.map((t) =>
  //             t.id === transaction.id ? { ...t, ...transactionInfo } : t,
  //           ),
  //         );
  //         onClose();
  //       } else alert('다시 확인해주세요! ');
  //     });
  // };
  // useEffect(() => {
  // setTransactionInfo({
  // date: new Date(${transaction.year}-${transaction.month}-${transaction.date}),
  // userName: transaction.userName,
  // allowance: transaction.amount,
  // });
  // }, [transaction]);
};

export default TransactionModifyModal;
