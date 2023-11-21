import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { splitDate } from '../../../utils/convert';
import SelectDropdown from './SelectDropdown';
import CalenderInput from './CalenderInput';
import CompleteBtn from './CompleteBtn';
import './AllowanceModal.scss';

const AllowanceModal = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);
  const [settingInfo, setSettingInfo] = useState({
    date: new Date(),
    userName: '',
    allowance: '',
  });

  const token = localStorage.getItem('token');
  const { year, month, date } = splitDate(new Date(settingInfo.date));

  const handleInfo = (name, value) => {
    setSettingInfo({ ...settingInfo, [name]: value });
  };

  const handleClick = () => {
    fetch('http://10.58.52.147:8000/allowance', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        year: year,
        month: month,
        date: date,
        userName: settingInfo.userName,
        allowance: settingInfo.allowance,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === 'POST_SUCCESS') {
          alert(' 내역 등록이 완료되었습니다! ');
          navigate('/setting');
        } else alert('다시 확인해주세요! ');
      });
  };

  useEffect(() => {
    fetch('http://10.58.52.109:8000/family/user', {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => setUserList(result.familyUsers));
  }, []);

  return (
    <div className="allowanceModal">
      <div className={`${isOpen ? 'backDrop' : ''}`} />
      <div className={`modal ${isOpen ? 'open' : ''}`}>
        <div className="allowanceInfo">
          <h2 className="allowanceContentName">🗓️ 용돈 등록</h2>
          <div className="allowanceContentList">
            <CalenderInput
              text="일자"
              handleDateChange={(date) => handleInfo('date', date)}
              date={settingInfo.date}
            />
            <SelectDropdown
              text="대상 선택"
              name="userName"
              options={userList}
              handleSelect={(e) => handleInfo('userName', e.target.value)}
            />
            <div className="allowance">
              <label className="allowanceName">금액</label>
              <input
                className="allowanceInput"
                type="text"
                onChange={(e) => handleInfo('allowance', e.target.value)}
                value={settingInfo.allowance}
              />
            </div>
          </div>
          <div className="btn">
            <CompleteBtn
              className="completeBtnContainer"
              onClick={handleClick}
            />
            <button className="closeBtn" onClick={onClose}>
              닫기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllowanceModal;
