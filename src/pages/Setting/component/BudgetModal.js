import React, { useState } from 'react';
import { splitDate } from '../../../utils/convert';
import CalenderInput from './CalenderInput';
import CompleteBtn from './CompleteBtn';
import './BudgetModal.scss';

const BudgetModal = ({ isOpen, onClose }) => {
  const [budget, setBudget] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [settingInfo, setSettingInfo] = useState({
    date: '',
    budget: '',
  });

  const handleBudget = (e) => {
    setBudget(e.target.value);
  };

  const { year, month } = splitDate(new Date());
  const handleDateChange = (date) => {
    const startYear = date.getFullYear();
    const startMonth = date.getMonth();

    setSettingInfo({
      ...settingInfo,
      date: `${startYear}-${startMonth}-${startDate}`,
    });
    setStartDate(date);
  };

  const token = localStorage.getItem('token');

  const handleClick = () => {
    fetch('http://10.58.52.92:8000/budget', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        year: year,
        month: month,
        budget: budget,
      }),
    })
      .then((res) => res.json())
      .then((result) => result);
  };

  return (
    <div className={`modal${isOpen ? ' open' : ''}`}>
      <div className="budgetInfo">
        <h2 className="budgetContentName">🗓️ 예산 등록</h2>
        <div className="budgetContentList">
          <CalenderInput text="일자" handleDateChange={handleDateChange} />
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
          <CompleteBtn className="completeBtnContainer" onClick={handleClick} />
          <button className="closeBtn" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
export default BudgetModal;
