import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SelectDropdown from './component/SelectDropdown';
import CalenderInput from './component/CalenderInput';
import CompleteBtn from './component/CompleteBtn';
import BudgetModal from './component/BudgetModal'; // 예산 모달 컴포넌트 import
import AllowanceModal from './component/AllowanceModal'; // 용돈 모달 컴포넌트 import
import './Setting.scss';
import { id } from 'date-fns/locale';

const Setting = () => {
  const [currentModal, setCurrentModal] = useState('');
  const [authCode, setAuthCode] = useState('');
  const [typeList, setTypeList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  // const [userList, setUserList] = useState([]);
  const [amount, setAmount] = useState();
  const [memo, setMemo] = useState('');
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [settingInfo, setSettingInfo] = useState({
    date: '',
    type: '',
    category: '',
    name: '',
    amount: '',
    memo: '',
  });

  const token = localStorage.getItem('token');

  const handleInfo = (name, value) => {
    // console.log(name, value);
    setSettingInfo({ ...settingInfo, [name]: value });
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleMemo = (e) => {
    setMemo(e.target.value);
  };

  const navigate = useNavigate();

  const handleDateChange = (date) => {
    const startYear = date.getFullYear();
    const startMonth = date.getMonth();
    const startDate = date.getDate();

    setSettingInfo({
      ...settingInfo,
      date: `${startYear}-${startMonth}-${startDate}`,
    });
    setStartDate(date);
  };

  const handleClick = () => {
    const endYear = endDate.getFullYear();
    const endMonth = endDate.getMonth();
    const startYear = startDate.getFullYear();
    const startMonth = startDate.getMonth() + 1;
    const startDay = startDate.getDate();

    fetch('http://10.58.52.92:8000/flow/fixed', {
      method: 'post',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        userId: id,
        type: settingInfo.type,
        category: settingInfo.category,
        memo: memo,
        amount: amount,
        startYear: startYear,
        startMonth: startMonth,
        startDate: startDay,
        endYear: endYear,
        endMonth: endMonth,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'POST_SUCCESS') {
          alert(' 내역 등록이 완료되었습니다! ');
          navigate('/Setting');
        } else alert('빈칸없이 작성해주세요! ');
      });
  };

  //구분, 항목, 대상 옵션 데이터를 받아오기
  useEffect(() => {
    // fetch('http://10.58.52.92:8000/flow-type', {
    fetch('/data/type.json', {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => setTypeList(result.type));

    // fetch('http://10.58.52.92:8000/family/user', {
    // fetch('/data/userList.json', {
    //   method: 'get',
    //   headers: {
    //     'content-type': 'application/json',
    //     Authorization: `Bearer ${token}`,
    //   },
    // })
    //   .then((res) => res.json())
    //   .then((result) => setUserList(result.familyUsers));

    // fetch('http://10.58.52.92:8000/category', {
    fetch('/data/category.json', {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => setCategoryList(result.category));
  }, []);

  //그룹관리 인증번호 받아오기
  useEffect(() => {
    fetch('/data/category.json', {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => setAuthCode(result.authCode));
  }, [token]);

  const filteredCategoryList = categoryList.filter(
    (category) => category.type === settingInfo.type,
  );

  // console.log(settingInfo);

  return (
    <div className="settingAll">
      <div className="settingTitle">
        <h1 className="settingTitleName">설정✏️</h1>
        <div className="settingInfo">
          <div className="settingFirstInfo">
            <h2 className="settingPwName">️🏷️ 그룹관리 인증번호 : </h2>
            <p className="settingPwNum">{authCode}</p>
          </div>
          <div className="infoContainer">
            <button
              className="budgetBtn"
              onClick={() => setCurrentModal('budget')}
            >
              예산등록하기
            </button>
            <BudgetModal
              className="BudgetModal"
              isOpen={currentModal === 'budget'}
              onClose={() => setCurrentModal('')}
            />
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
                  handleDateChange={handleDateChange}
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
                {/* <SelectDropdown
                  text="대상 선택"
                  options={userList}
                  handleSelect={(e) => handleInfo('name', e.target.value)}
                /> */}
                <div className="amountInput">
                  <label className="amountName">금액</label>
                  <input
                    className="amount"
                    type="text"
                    onChange={(e) => handleAmount(e)}
                    value={amount}
                  />
                </div>
                <div className="selectYearMonth">
                  <label className="selectName">반복 종료 년/월</label>
                  <DatePicker
                    className="yearMonth"
                    selected={endDate}
                    locale={ko}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    endDate={endDate}
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
                  onChange={(e) => handleMemo(e)}
                  value={memo}
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
