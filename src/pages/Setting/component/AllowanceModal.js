import React, { useEffect, useState } from 'react';
import { splitDate } from '../../../utils/convert';
import SelectDropdown from './SelectDropdown';
import CalenderInput from './CalenderInput';
import CompleteBtn from './CompleteBtn';
import './AllowanceModal.scss';

const AllowanceModal = ({ isOpen, onClose }) => {
  const [userList, setUserList] = useState([]);
  const [allowance, setAllowance] = useState();
  const [startDate, setStartDate] = useState(new Date());
  const [settingInfo, setSettingInfo] = useState({
    date: '',
    name: '',
    allowance: '',
  });

  const token = localStorage.getItem('token');

  const handleInfo = (name, value) => {
    setSettingInfo({ ...settingInfo, [name]: value });
  };

  const handleAllowance = (e) => {
    setAllowance(e.target.value);
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

  const handleClick = () => {
    fetch('http://10.58.52.92:8000/allowance', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        year: year,
        month: month,
        allowance: allowance,
      }),
    })
      .then((res) => res.json())
      .then((result) => result);
  };

  useEffect(() => {
    fetch('http://10.58.52.92:8000/family/user', {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => setUserList(result.familyUsers));
  }, []);

  return (
    <div className={`modal ${isOpen ? 'open' : ''}`}>
      <div className="allowanceInfo">
        <h2 className="allowanceContentName">🗓️ 용돈 등록</h2>
        <div className="allowanceContentList">
          <CalenderInput text="일자" handleDateChange={handleDateChange} />
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
          <CompleteBtn className="completeBtnContainer" onClick={handleClick} />
          <button className="closeBtn" onClick={onClose}>
            닫기
          </button>
        </div>
      </div>
    </div>
  );
};
export default AllowanceModal;
