import React, { useEffect, useState } from 'react';
import CalenderInput from './calenderInput';
import CompleteBtn from './completeBtn';
import './BudgetModal.scss';

const BudgetModal = ({ isOpen, onClose }) => {
  const [budget, setBudget] = useState();

  const handleBudget = (e) => {
    setBudget(e.target.value);
  };

  const token = localStorage.getItem('token');
  useEffect(() => {
    fetch('API', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        date: '',
        budget: '',
      }),
    })
      .then((res) => res.json())
      .then((result) => result);
  }, [token]);

  return (
    <div className={`modal ${isOpen ? 'modal open' : 'modal'}`}>
      <div className="budgetInfo">
        <h2 className="budgetContentName">🗓️ 예산 등록</h2>
        <div className="budgetContentList">
          <CalenderInput text="일자" />
          <div className="budget">
            <label className="budgetName">금액</label>
            <input
              className="budgetInput"
              type="text"
              onChange={(e) => handleBudget(e)}
              value={budget}
            />
          </div>
        </div>
        <div className="btn">
          <CompleteBtn className="completeBtnContainer" />
          <button className="closeBtn" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
export default BudgetModal;
