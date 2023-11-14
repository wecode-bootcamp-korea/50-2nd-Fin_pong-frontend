import React, { useState, useEffect } from 'react';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import SelectDropdown from './component/SelectDropdown';
import CalenderInput from './component/calenderInput';
import CompleteBtn from './component/completeBtn';
import BudgetModal from './component/BudgetModal'; // 예산 모달 컴포넌트 import
import AllowanceModal from './component/AllowanceModal'; // 용돈 모달 컴포넌트 import
import './Setting.scss';

const Setting = () => {
  const [budgetModalOpen, setBudgetModalOpen] = useState(false);
  const [allowanceModalOpen, setAllowanceModalOpen] = useState(false);
  const [authCode, setAuthCode] = useState('');
  const [typeList, setTypeList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [userList, setUserList] = useState([]);
  const [amount, setAmount] = useState();
  const [memo, setMemo] = useState('');
  const [endDate, setEndDate] = useState(new Date());
  const [filteredCategoryList, setFilteredCategoryList] = useState([]);
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
    setSettingInfo({ ...settingInfo, [name]: value });
  };

  const handleAmount = (e) => {
    setAmount(e.target.value);
  };

  const handleMemo = (e) => {
    setMemo(e.target.value);
  };

  const toggleBudgetModal = () => {
    setBudgetModalOpen((prev) => !prev);
  };

  const toggleAllowanceModal = () => {
    setAllowanceModalOpen((prev) => !prev);
  };

  const handleSort = () => {
    if (!settingInfo.type) {
      //'구분 값을 선택하지 않았다면'
      alert('구분을 먼저 선택해 주세요!');
      // 안 열리게 막아주면 더 좋음.
      return;
    }

    const filteredCategories = categoryList.filter(
      (category) => category.type === settingInfo.type,
    );

    setCategoryList(filteredCategories);
  };

  // 항목을 state에 저장하는 로직!

  //구분, 대상 옵션 데이터를 받아오기
  useEffect(() => {
    fetch('/data/type.json', {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => setTypeList(result.type));

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

  //항목 데이터 받아오기
  useEffect(() => {
    if (!settingInfo.type) return;

    fetch('/data/category.json', {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => setFilteredCategoryList(result.category));
  }, [settingInfo.type, token]);

  //그룹관리 인증번호 받아오기
  useEffect(() => {
    fetch('/data/category.json', {
      method: 'get',
      headers: {
        'content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((result) => setAuthCode(result.authCode));
  }, [token]);

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
            <button className="budgetBtn" onClick={toggleBudgetModal}>
              예산등록하기
            </button>
            <BudgetModal
              className="BudgetModal"
              isOpen={budgetModalOpen}
              onClose={toggleBudgetModal}
            />
            <button className="allowanceBtn" onClick={toggleAllowanceModal}>
              용돈 등록하기
            </button>
            <AllowanceModal
              className="AllowanceModal"
              isOpen={allowanceModalOpen}
              onClose={toggleAllowanceModal}
            />
          </div>
          <div className="settingSecondInfo">
            <h2 className="settingContentName">🗓️ 고정 수입&지출 내역 등록</h2>
            <div className="fixContentList">
              <div className="contentListDate">
                <CalenderInput text="일자" />
                <SelectDropdown
                  text="구분"
                  name="type"
                  options={typeList}
                  handleSelect={(e) => handleInfo('type', e.target.value)}
                />
                <SelectDropdown
                  text="항목"
                  name="category"
                  options={filteredCategoryList}
                  handleSelect={(e) => handleInfo('category', e.target.value)}
                  onClick={handleSort}
                />
              </div>
              <div className="contentListSort">
                <SelectDropdown
                  text="대상 선택"
                  name="name"
                  options={userList}
                  handleSelect={(e) => handleInfo('name', e.target.value)}
                />
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
                  <label className="selectName">
                    반복 종료 년/월(선택사항)
                  </label>
                  <DatePicker
                    className="yearMonth"
                    selected={endDate}
                    locale={ko}
                    onChange={(date) => setEndDate(date)}
                    selectsEnd
                    endDate={endDate}
                    dateFormat="yyyy/MM"
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
            <CompleteBtn className="completeBtnContainer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
