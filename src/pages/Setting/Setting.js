import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import { ko } from 'date-fns/esm/locale';
import 'react-datepicker/dist/react-datepicker.css';
import SelectDropdown from './component/SelectDropdown';
import CalenderInput from './component/CalenderInput';
import CompleteBtn from './component/CompleteBtn';
import BudgetModal from './component/BudgetModal'; // 예산 모달 컴포넌트 import
import AllowanceModal from './component/AllowanceModal'; // 용돈 모달 컴포넌트 import
import { splitDate } from '../../utils/convert';
import API from '../../config';
import './Setting.scss';

const Setting = () => {
  const [currentModal, setCurrentModal] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [typeList, setTypeList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [settingInfo, setSettingInfo] = useState({
    startDate: new Date(),
    endDate: new Date(),
    type: '',
    category: '',
    name: '',
    amount: '',
    memo: '',
  });
  const navigate = useNavigate();

  const TOKEN = localStorage.getItem('TOKEN');

  const handleInfo = (name, value) => {
    setSettingInfo({ ...settingInfo, [name]: value });
  };

  const handleClick = () => {
    const {
      year: startYear,
      month: startMonth,
      date: startDate,
    } = splitDate(new Date(settingInfo.startDate));
    const { year: endYear, month: endMonth } = splitDate(
      new Date(settingInfo.endDate),
    );

    if (
      endYear < startYear ||
      (endYear === startYear && endMonth < startMonth)
    ) {
      alert('일자를 확인해 주세요!');
      return;
    }

    fetch(API.SettingFixed, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        type: settingInfo.type,
        category: settingInfo.category,
        memo: settingInfo.memo,
        amount: settingInfo.amount,
        startYear: startYear,
        startMonth: startMonth,
        startDate: startDate,
        endYear: endYear,
        endMonth: endMonth,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'POST_SUCCESS') {
          alert(' 내역 등록이 완료되었습니다! ');
          navigate('/setting');
        } else alert('다시 확인해주세요! ');
      });
  };

  //구분, 항목, 대상 옵션 데이터를 받아오기
  useEffect(() => {
    fetch(API.SettingFlowType, {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((result) => setTypeList(result.types));
  }, []);

  useEffect(() => {
    if (!settingInfo.type) return;

    fetch(`${API.SettingCategory}?type=${settingInfo.type}`, {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((result) => setCategoryList(result.category));
  }, [settingInfo.type]);

  //그룹관리 인증번호 받아오기
  useEffect(() => {
    fetch(API.SettingAuthCode, {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((res) => res.json())
      .then((result) => setAuthCode(result.authCode));
  }, [TOKEN]);

  const filteredCategoryList = categoryList.filter(
    (category) => category.type === settingInfo.type,
  );

  return (
    <div className="settingAll">
      <div className="settingTitle">
        <h1 className="settingTitleName">설정✏️</h1>
        <div className="settingInfo">
          <div className="settingFirstInfo">
            <h2 className="settingPwName">️🏷️ 그룹 관리 인증번호 : </h2>
            <p className="settingPwNum">{authCode}</p>
          </div>
          <div className="infoContainer">
            <button
              className="budgetBtn"
              onClick={() => setCurrentModal('budget')}
            >
              예산 등록하기
            </button>
            <div className="modal">
              <BudgetModal
                className="BudgetModal"
                isOpen={currentModal === 'budget'}
                onClose={() => setCurrentModal('')}
              />
            </div>

            <button
              className="allowanceBtn"
              onClick={() => setCurrentModal('allowance')}
            >
              용돈 등록하기
            </button>
            <AllowanceModal
              className="AllowanceModal"
              isOpen={currentModal === 'allowance'}
              onClose={() => setCurrentModal('')}
            />
          </div>
          <div className="settingSecondInfo">
            <h2 className="settingContentName">🗓️ 고정 수입&지출 내역 등록</h2>
            <div className="fixContentList">
              <div className="contentListDate">
                <CalenderInput
                  text="일자"
                  handleDateChange={(date) => handleInfo('startDate', date)}
                  date={settingInfo.startDate}
                />
                <SelectDropdown
                  text="구분"
                  options={typeList}
                  handleSelect={(e) => handleInfo('type', e.target.value)}
                />
                <SelectDropdown
                  text="항목"
                  options={filteredCategoryList}
                  handleSelect={(e) => handleInfo('category', e.target.value)}
                  disabled={!settingInfo.type}
                />
              </div>
              <div className="contentListSort">
                <div className="amountInput">
                  <label className="amountName">금액</label>
                  <input
                    className="amount"
                    type="text"
                    onChange={(e) => handleInfo('amount', e.target.value)}
                    value={settingInfo.amount}
                  />
                </div>
                <div className="selectYearMonth">
                  <label className="selectName">반복 종료 년/월</label>
                  <DatePicker
                    className="yearMonth"
                    selected={settingInfo.endDate || new Date()}
                    locale={ko}
                    onChange={(date) => {
                      handleInfo('endDate', date);
                    }}
                    selectsEnd
                    dateFormat="yyyy년MM월"
                    showMonthYearPicker
                  />
                </div>
              </div>
              <div className="memoInput">
                <label className="memoName">메모</label>
                <input
                  className="memo"
                  type="text"
                  maxLength="25"
                  placeholder="25자 내로 작성해주세요."
                  onChange={(e) => handleInfo('memo', e.target.value)}
                  value={settingInfo.memo}
                />
              </div>
            </div>
            <CompleteBtn
              className="completeBtnContainer"
              onClick={handleClick}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
