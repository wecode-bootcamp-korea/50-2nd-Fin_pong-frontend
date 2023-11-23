import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import Modal from 'react-modal';
import GraphBarChart from './GraphBarChart';
import GraphCircularChart from './GraphCircularChart';
import ko from 'date-fns/locale/ko';
import './Main.scss';
import API from '../../config';

const INITIAL_INPUT_VALUES = {
  divide: '', // 구분
  category: '', // 카테고리
  day: '', // 일(일자)
  price: '', // 금액
  memo: '', // 메모
};

const Main = () => {
  // 모달창 노출 여부 확인
  const [currentModal, setCurrentModal] = useState('');
  // 완료 버튼 활성화, 비활성화 여부 확인
  const [isCompleteEnabled, setIsCompleteEnabled] = useState(false);
  // 선택된 메뉴 상태 저장
  const [checkedMenu, setCheckedMenu] = useState('');
  // 인증번호 입력값 상태 추가
  const [verifycationCode, setVerifycationCode] = useState('');
  // 필수 입력 값 여부 확인
  const [inputValues, setInputValues] = useState(INITIAL_INPUT_VALUES);
  // 1년 수입/지출 비교
  const [yearlyData, setYearlyData] = useState(null);
  // 월별 - 카테고리 현황(%)
  const [monthlyData, setMonthlyData] = useState(null);

  const { divide, category, day, price, memo } = inputValues;
  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth() + 1;

  // 모달창 닫기
  const closeModal = () => {
    setCurrentModal('');
    resetInputStates();
  };
  // 입력 값 초기화(모달창 닫았을때)
  const resetInputStates = () => {
    setCheckedMenu('');
    setInputValues(INITIAL_INPUT_VALUES);
    setIsCompleteEnabled(false);
  };

  // 생성하기 체크박스가 활성화되면 완료 버튼 활성화
  useEffect(() => {
    setIsCompleteEnabled(checkedMenu === 'creating');
  }, [checkedMenu]);

  // input, selectBox 값 변경 여부
  const handleInputChange = (fieldName, value) => {
    if (fieldName === 'verifyInput') {
      // 인증번호 입력값 업데이트
      setVerifycationCode(value);
      // 참여하기 체크박스가 활성화되면서 인증번호를 입력되면 완료 버튼 활성화
      const isVerifycationCodeValid =
        checkedMenu === 'partic' && value.length === 8;

      setIsCompleteEnabled(isVerifycationCodeValid);
    } else {
      // 다른 필드의 입력값 업데이트
      const updatedInputValues = { ...inputValues, [fieldName]: value };
      setInputValues(updatedInputValues);
      // 완료 버튼 활성화 여부 업데이트
      const { divide, category, day, price, memo } = updatedInputValues;
      setIsCompleteEnabled(divide && category && day && price && memo);
      // 체크박스 클릭시 비활성화
      if (
        (fieldName === 'partic' && checkedMenu === 'partic') ||
        (fieldName === 'creating' && checkedMenu === 'creating')
      ) {
        resetInputStates();
      }
    }
  };
  // 페이지 이동
  const navigate = useNavigate();
  // 토큰
  const TOKEN = localStorage.getItem('TOKEN');

  // 가계부 참여하기
  const goToJoin = () => {
    fetch(API.MainJoin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ auth_code: verifycationCode }),
    })
      .then((res) => res.json())
      // .catch((error) => console.error(error))
      .then((data) => {
        if (data.message === 'JOIN_SUCCESS') {
          alert('가계부 참여가 완료되었습니다.');
        } else {
          alert('인증번호를 다시 한번 확인해주세요.');
        }
      });
  };

  // 가계부 생성하기
  const goToCreating = () => {
    fetch(API.MainCreate, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((response) => response.json())
      // .catch((error) => console.error(error))
      .then((data) => {
        if (data.message === 'AUTH_CODE_CREATED_SUCCESS') {
          alert('설정 페이지로 이동합니다.');
          navigate('/setting');
        } else if (data.message === 'INTERNAL_SERVER_ERROR') {
          alert('생성에 실패했습니다. 다시 시도해주세요.');
        }
      });
  };

  // 개인 수입/지출 등록하기 (모달창)
  const goToIncomeExpend = () => {
    fetch(API.MainFlow, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json;charset=utf-8',
        authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        type: divide,
        category: category,
        memo: memo,
        amount: price,
        year: day.getFullYear(),
        month: day.getMonth() + 1,
        date: day.getDate(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message === 'POST_SUCCESS') {
          alert('등록이 완료되었습니다.');
        } else {
          alert('등록에 실패했습니다. 다시 한번 확인해주세요');
        }
      });
  };

  // 차트(막대, 원형)
  useEffect(() => {
    // 1년 수입/지출(막대그래프)
    fetch(`${API.MainBarChart}?rule=year&year=${currentYear}&unit=family`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: `Bearer ${TOKEN}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setYearlyData(data);
      })
      .catch((error) =>
        console.error('1년 수입/지출 데이터를 가져오는 중 에러:', error),
      );
    // 월별 - 카테고리별(원형차트)
    fetch(
      `${API.MainPieChart}?rule=category&year=${currentYear}&month=${currentMonth}&unit=family`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: `Bearer ${TOKEN}`,
        },
      },
    )
      .then((response) => response.json())
      .then((data) => {
        setMonthlyData(data);
      })
      .catch((error) =>
        console.error('월별-카테고리별 현황 데이터를 가져오는 중 에러:', error),
      );
  }, []);

  // 완료 버튼 클릭시 실행되는 함수
  const handleComplete = () => {
    // 생성하기
    if (checkedMenu === 'creating') {
      goToCreating();
      // 참여하기
    } else if (checkedMenu === 'partic') {
      goToJoin();
    }
  };
  // 월별 - 카테고리별 현황 클릭 -> table 페이지 이동
  const goToTable = () => {
    navigate('/table');
  };

  return (
    <div className="dashboardAll">
      <div className="dashboard">
        <button
          className="actionButton"
          onClick={() => setCurrentModal('참여')}
        >
          참여 & 생성하기
        </button>
        <Modal
          isOpen={currentModal === '참여'}
          overlayClassName="overlay"
          className="modal"
          ariaHideApp={false}
        >
          <button className="closeBtn" onClick={closeModal}>
            <img src="/../images/close.svg" alt="닫기버튼" />
          </button>
          <div className="mainFrame">
            <div
              className={`partic${checkedMenu === 'partic' ? ' selected' : ''}`}
              onClick={() => {
                if (checkedMenu === 'partic') {
                  setCheckedMenu('');
                } else {
                  setCheckedMenu('partic');
                }
              }}
            >
              <input
                className="clickBox"
                type="checkbox"
                checked={checkedMenu === 'partic'}
                readOnly
              />
              <p className="clickText">참여하기</p>
              <span className="womanEmoji" role="img" aria-label="Emoji">
                💁🏻‍♀️
              </span>
              <input
                className="verifyInput"
                type="text"
                placeholder="인증번호를 입력해주세요"
                maxLength={8}
                disabled={checkedMenu !== 'partic'}
                onClick={(event) => event.stopPropagation()}
                onChange={(event) =>
                  handleInputChange('verifyInput', event.target.value)
                }
              />
            </div>
            <div
              className={`creating${
                checkedMenu === 'creating' ? ' selected' : ''
              }`}
              onClick={() => {
                if (checkedMenu === 'creating') {
                  setCheckedMenu('');
                } else {
                  setCheckedMenu('creating');
                }
              }}
            >
              <input
                className="clickBox"
                type="checkbox"
                checked={checkedMenu === 'creating'}
              />
              <p className="creatingText">생성하기</p>
              <span className="manEmoji" role="img" aria-label="Emoji">
                🙋🏻‍♂️
              </span>
              <p className="settingText">설정페이지로 이동합니다.</p>
            </div>
          </div>
          <div className="buttonFrame">
            <button
              className="completeButton"
              disabled={!isCompleteEnabled}
              onClick={handleComplete}
            >
              완료
            </button>
          </div>
        </Modal>
        <button
          className="actionButton"
          onClick={() => setCurrentModal('수입')}
        >
          수입/지출 등록하기
        </button>
        <Modal
          isOpen={currentModal === '수입'}
          overlayClassName="overlay"
          className="modal"
          ariaHideApp={false}
        >
          <button className="closeBtn" onClick={closeModal}>
            <img src="/../images/close.svg" alt="닫기버튼" />
          </button>
          <div className="requiredTextMain">
            <p className="divideText">구분</p>
            <p className="categoryText">카테고리</p>
          </div>
          <div className="divideFrame">
            <select
              className="selectBox"
              value={inputValues.divide}
              onChange={(event) =>
                handleInputChange('divide', event.target.value)
              }
            >
              {DIVIDE_LIST.map((divide, index) => (
                <option key={index}>{divide}</option>
              ))}
            </select>
            <select
              className="selectBox"
              value={inputValues.category}
              onChange={(event) =>
                handleInputChange('category', event.target.value)
              }
            >
              {CATEGORY_LIST.map((category, index) => (
                <option key={index}>{category}</option>
              ))}
            </select>
          </div>
          <div className="requiredTextMain">
            <p className="dayText">일자</p>
            <p className="priceText">금액</p>
          </div>
          <div className="divideFrame">
            <DatePicker
              className="selectBox"
              selected={inputValues.day}
              onChange={(date) => handleInputChange('day', date)}
              selectsEnd
              dateFormat="yyyy년MM월dd일"
              locale={ko}
            />
            <input
              type="text"
              className="priceInput"
              placeholder="금액을 입력해주세요"
              value={inputValues.price}
              onChange={(event) => {
                const onlyNumbers = event.target.value.replace(/[^0-9]/g, '');
                handleInputChange('price', onlyNumbers);
              }}
            />
          </div>
          <div className="memoTextMain">
            <p className="memoText">메모</p>
          </div>
          <div className="divideFrame">
            <input
              className="memoInput"
              type="text"
              maxLength={25}
              placeholder="25자 내로 작성해주세요"
              value={inputValues.memo}
              onChange={(event) =>
                handleInputChange('memo', event.target.value)
              }
            />
          </div>
          <div className="yearTextMain">
            <p className="yearText">반복 종료 년/월</p>
            <p className="optionalText">선택 입력</p>
          </div>
          <div className="divideFrame">
            <select className="selectBox">
              {YEAR_LIST.map((year, index) => (
                <option key={index}>{year}</option>
              ))}
            </select>
            <select className="selectBox">
              {MONTH_LIST.map((month, index) => (
                <option key={index}>{month}</option>
              ))}
            </select>
          </div>
          <div className="buttonFrame">
            <button
              className="completeButton"
              disabled={!isCompleteEnabled}
              onClick={goToIncomeExpend}
            >
              완료
            </button>
          </div>
        </Modal>
      </div>
      <div className="dashboardContainer">
        <div className="graphMain">
          <div className="graphBarChart">
            <p className="yearText">1년 수입/지출 비교</p>
            {yearlyData && <GraphBarChart data={yearlyData} />}
            {/* <GraphBarChart data={yearlyData} /> */}
          </div>
          <div className="graphCirculChart" onClick={goToTable}>
            <p className="monthText">월별-카테고리별 현황(%)</p>
            {monthlyData && <GraphCircularChart data={monthlyData} />}
          </div>
        </div>
        <div className="graphPersonal">
          {[1, 2, 3, 4].map((item, index) => (
            <div className="graphPersonalChart" key={index} onClick={goToTable}>
              <p className="personalText">개인별 사용현황(%)</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Main;

const DIVIDE_LIST = ['Select an Option', '수입', '지출'];
const CATEGORY_LIST = ['Select an Option', '생활비', '식비', '고정비', '기타'];
const YEAR_LIST = Array.from({ length: 20 }, (_, i) => `${i + 2020}년`);
const MONTH_LIST = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
