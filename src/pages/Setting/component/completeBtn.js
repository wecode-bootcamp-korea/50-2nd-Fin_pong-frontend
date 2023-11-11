import React from 'react';
import { useNavigate } from 'react-router-dom';
import './completeBtn.scss';

const CompleteBtn = () => {
  const navigate = useNavigate();

  fetch('설정 API', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      type: '',
      category: '',
      memo: '',
      amount: '',
      date: '',
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.message === 'login success') {
        alert(' 내역 등록이 완료되었습니다! ');
        navigate('/Setting');
      } else {
        alert(' 필수항목을 모두 입력해주세요! ');
      }
    });

  return (
    <div className="submitBtn">
      <button className="completeBtn">완료</button>
    </div>
  );
};

export default CompleteBtn;
