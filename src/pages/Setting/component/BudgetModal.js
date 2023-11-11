import React from 'react';
// import { useNavigate } from 'react-router-dom';
import SelectDropdown from './SelectDropdown';
import CompleteBtn from './completeBtn';
import './BudgetModal.scss';

const BudgetModal = ({ isOpen, onClose }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="budgetInfo">
        <h2 className="budgetContentName">🗓️ 예산 등록</h2>
        <div className="budgetContentList">
          <SelectDropdown text="일자" />
          <div className="budget">
            <label className="budgetName">금액</label>
            <input className="budgetInput" />
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
