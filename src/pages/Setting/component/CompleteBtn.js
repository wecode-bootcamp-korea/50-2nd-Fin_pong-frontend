import React from 'react';
import './CompleteBtn.scss';

const CompleteBtn = ({ onClick }) => {
  return (
    <div className="submitBtn">
      <button className="completeBtn" onClick={onClick}>
        완료
      </button>
    </div>
  );
};

export default CompleteBtn;
