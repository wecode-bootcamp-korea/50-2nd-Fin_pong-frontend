import React, { useEffect, useState } from 'react';
import SelectDropdown from './SelectDropdown';
import CalenderInput from './calenderInput';
import CompleteBtn from './completeBtn';
import './AllowanceModal.scss';

const AllowanceModal = ({ isOpen, onClose }) => {
  const [userList, setUserList] = useState([]);
  const [allowance, setAllowance] = useState();
  const token = localStorage.getItem('token');
  const [settingInfo, setSettingInfo] = useState({
    date: '',
    name: '',
    allowance: '',
  });

  const handleInfo = (name, value) => {
    setSettingInfo({ ...settingInfo, [name]: value });
  };

  const handleAllowance = (e) => {
    setAllowance(e.target.value);
  };

  useEffect(() => {
    fetch('/data/userList.json', {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => setUserList(result.familyUsers));
  }, [token]);

  return (
    <div className={`modal ${isOpen ? 'modal open' : 'modal'}`}>
      <div className="allowanceInfo">
        <h2 className="allowanceContentName">🗓️ 용돈 등록</h2>
        <div className="allowanceContentList">
          <CalenderInput text="일자" />
          <SelectDropdown
            text="대상 선택"
            name="name"
            options={userList}
            handleSelect={(e) => handleInfo('name', e.target.value)}
          />
          <div className="allowance">
            <label className="allowanceName">금액</label>
            <input
              className="allowanceInput"
              type="text"
              onChange={(e) => handleAllowance(e)}
              value={allowance}
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
export default AllowanceModal;
