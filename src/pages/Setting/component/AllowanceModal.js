import React from 'react';
// import { useNavigate } from 'react-router-dom';
import SelectDropdown from './SelectDropdown';
import CompleteBtn from './completeBtn';
import './AllowanceModal.scss';

const AllowanceModal = ({ isOpen, onClose }) => {
  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="allowanceInfo">
        <h2 className="allowanceContentName">🗓️ 용돈 등록</h2>
        <div className="allowanceContentList">
          <SelectDropdown text="일자" />
          <div className="allowance">
            <label className="allowanceName">금액</label>
            <input className="allowanceInput" />
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
export default AllowanceModal;
