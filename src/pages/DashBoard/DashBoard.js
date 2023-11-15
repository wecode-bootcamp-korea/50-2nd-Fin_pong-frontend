import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import close from './close.svg';
import './DashBoard.scss';
import { useNavigate } from 'react-router-dom';

const DashBoard = () => {
  // 모달창 노출 여부 확인
  const [currentModal, setCurrentModal] = useState('');
  // 완료 버튼 활성화, 비활성화 여부 확인
  const [isCompleteEnabled, setIsCompleteEnabled] = useState(false);
  // 선택된 메뉴 상태 저장
  const [checkedMenu, setCheckedMenu] = useState('');
  // 인증번호 입력값 상태 추가
  const [verificationCode, setVerificationCode] = useState('');
  // 필수 입력 값 여부 확인
  const [inputValues, setInputValues] = useState(INITIAL_INPUT_VALUES);
  // 모달창 닫기
  const closeModal = () => {
    setCurrentModal('');
    resetInputStates();
  };
  // 입력 값 초기화
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
    if (fieldName === 'verifiInput') {
      // 인증번호 입력값 업데이트
      setVerificationCode(value);
      // 참여하기 체크박스가 활성화되면서 인증번호를 입력되면 완료 버튼 활성화
      const isVerificationCodeValid =
        checkedMenu === 'partic' && value.length === 6;
      setIsCompleteEnabled(isVerificationCodeValid);
    } else {
      // 다른 필드의 입력값 업데이트
      setInputValues({ ...inputValues, [fieldName]: value });

      // 완료 버튼 활성화 여부 업데이트
      const { divide, category, day, price, memo } = {
        ...inputValues,
        [fieldName]: value,
      };
      setIsCompleteEnabled(divide && category && day && price && memo);
    }
  };
  // 생성하기 체크박스 클릭 : 설정 페이지 이동
  const navigate = useNavigate();
  const goToSetting = () => {
    navigate('./setting');
  };

  return (
    <>
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
        >
          <button className="closeBtn" onClick={closeModal}>
            <img src={close} alt="닫기버튼" />
          </button>
          <div className="mainFrame">
            <div
              className={`partic${checkedMenu === 'partic' ? ' selected' : ''}`}
            >
              <input
                className="clickBox"
                type="checkbox"
                onChange={() => setCheckedMenu('partic')}
                checked={checkedMenu === 'partic'}
              />
              <p className="clickText">참여하기</p>
              <span className="womanEmoji" role="img" aria-label="Emoji">
                💁🏻‍♀️
              </span>
              <input
                className="verifiInput"
                type="text"
                placeholder="계정인증번호를 입력해주세요"
                maxLength={6}
                disabled={checkedMenu !== 'partic'}
                onChange={(event) =>
                  handleInputChange('verifiInput', event.target.value)
                }
              />
            </div>
            <div
              className={`creating${
                checkedMenu === 'creating' ? ' selected' : ''
              }`}
            >
              <input
                className="clickBox"
                type="checkbox"
                onChange={() => setCheckedMenu('creating')}
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
              className={'completeButton'}
              disabled={!isCompleteEnabled}
              onClick={goToSetting}
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
        >
          <button className="closeBtn" onClick={closeModal}>
            <img src={close} alt="닫기버튼" />
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
            <select
              className="selectBox"
              value={inputValues.day}
              onChange={(event) => handleInputChange('day', event.target.value)}
            >
              {DAY_LIST.map((day, index) => (
                <option key={index}>{day}</option>
              ))}
            </select>
            <input
              type="text"
              className="priceInput"
              placeholder="금액을 입력해주세요"
              value={inputValues.price}
              onChange={(event) =>
                handleInputChange('price', event.target.value)
              }
            />
          </div>
          <div className="memoTextMain">
            <p className="memoText">메모</p>
          </div>
          <div className="divideFrame">
            <input
              className="memoInput"
              type="text"
              placeholder="25자 내외로 작성해주세요"
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
            <button className="completeButton" disabled={!isCompleteEnabled}>
              완료
            </button>
          </div>
        </Modal>
      </div>
      <div className="dashboardMainGraph">
        <div className="graphChart">
          <p className="monthText">1년 지출/수입 비교</p>
        </div>
        <div className="graphChart">
          <p className="monthText">월별-카테고리별 현황(%)</p>
        </div>
      </div>
    </>
  );
};

export default DashBoard;

const DIVIDE_LIST = ['-', '수입', '지출'];
const CATEGORY_LIST = ['-', '생활비', '식비', '고정비', '기타'];
const YEAR_LIST = Array.from({ length: 20 }, (_, i) => `${i + 2020}년`);
const MONTH_LIST = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
const DAY_LIST = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);
const INITIAL_INPUT_VALUES = {
  divide: '',
  category: '',
  day: '',
  price: '',
  memo: '',
};
