import React from 'react';
import { useState, useEffect } from 'react';
import Modal from 'react-modal';
import close from './close.svg';
import './Main.scss';

const Main = () => {
  // 모달창 노출 여부 확인
  const [isModalOpen, setIsModalOpen] = useState('');
  // 완료 버튼 활성화, 비활성화 여부 확인
  const [isCompleteEnabled, setIsCompleteEnabled] = useState(false);
  // 참여하기 체크박스 체크시 입력창 활성화 여부 확인
  const [isParticChecked, setIsParticChecked] = useState(false);
  // 생성하기 체크박스 체크시 입력창 활성화 여부 확인
  const [isCreatingChecked, setIsCreatingChecked] = useState(false);
  // 인증번호 입력값 상태 추가
  const [verificationCode, setVerificationCode] = useState('');
  // particFrame 스타일 변경 여부 확인
  const [particFrameStyle, setParticFrameStyle] = useState({
    border: '2px solid #7777',
  });
  // creatingFrame 스타일 변경 여부 확인
  const [creatingFrameStyle, setCreatingFrameStyle] = useState({
    border: '2px solid #7777',
  });
  // 필수 입력 값 여부 확인
  const [inputValues, setInputValues] = useState({
    divide: '',
    category: '',
    day: '',
    price: '',
    memo: '',
  });
  // 모달창 닫기
  const closeModal = () => {
    setIsModalOpen(false);
  };
  // 생성하기 체크박스가 활성화되면 완료 버튼 활성화
  useEffect(() => {
    setIsCompleteEnabled(isCreatingChecked);
  }, [isCreatingChecked]);

  // input, selectBox 값 변경 여부
  const handleInputChange = (fieldName, value) => {
    if (fieldName === 'verifiInput') {
      // 인증번호 입력값 업데이트
      setVerificationCode(value);
      // 참여하기 체크박스가 활성화되면서 인증번호를 입력되면 완료 버튼 활성화
      const isVerificationCodeValid = isParticChecked && value.length === 6;
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

  // 체크박스 비활성화/활성화 여부
  const handleCheckboxChange = (checkboxType) => {
    if (checkboxType === 'partic') {
      setIsParticChecked((prevIsChecked) => !prevIsChecked);
      setParticFrameStyle({
        border: !isParticChecked ? '2px solid #028174' : '2px solid #7777',
      });
      setCreatingFrameStyle({ border: '2px solid #7777' });
      // 생성하기 체크박스가 활성화된 상태에서 참여하기 체크박스를 선택하면 자동으로 해제
      if (isCreatingChecked) {
        setIsCreatingChecked(false);
      }
    } else if (checkboxType === 'creating') {
      setIsCreatingChecked((prevIsChecked) => !prevIsChecked);
      setParticFrameStyle({ border: '2px solid #7777' });
      setCreatingFrameStyle({
        border: !isCreatingChecked ? '2px solid #028174' : '2px solid #7777',
      });
      // 참여하기 체크박스가 활성화된 상태에서 생성하기 체크박스를 선택하면 자동으로 해제
      if (isParticChecked) {
        setIsParticChecked(false);
      }
    }
  };

  return (
    <div className="buttonClick">
      <button className="createdBtn" onClick={() => setIsModalOpen('참여')}>
        참여 & 생성하기
      </button>
      <Modal
        isOpen={isModalOpen === '참여' || isModalOpen === '생성'}
        overlayClassName="overlay"
        className="modal"
      >
        <div className="helloTextFrame">
          <h1 className="helloText">안녕하세요:)</h1>
          <p className="wantMenuText">원하시는 메뉴를 선택해주세요.😊</p>
        </div>
        <button className="closeBtn" onClick={closeModal}>
          <img src={close} alt="닫기버튼" />
        </button>
        <div className="mainFrame">
          <div className="partic" style={particFrameStyle}>
            <input
              className="clickBox"
              type="checkbox"
              onChange={() => handleCheckboxChange('partic')}
              checked={isParticChecked}
            ></input>
            <p className="clickText">참여하기</p>
            <span className="womanEmoji" role="img" aria-label="Emoji">
              💁🏻‍♀️
            </span>
            <input
              className="verifiInput"
              type="text"
              placeholder="계정인증번호를 입력해주세요"
              maxLength={6}
              disabled={!isParticChecked}
              onChange={(event) =>
                handleInputChange('verifiInput', event.target.value)
              }
            ></input>
          </div>
          <div className="creating" style={creatingFrameStyle}>
            <input
              className="clickBox"
              type="checkbox"
              onChange={() => handleCheckboxChange('creating')}
              checked={isCreatingChecked}
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
            className={isCompleteEnabled ? 'complieteButton' : 'disableButton'}
          >
            완료
          </button>
        </div>
      </Modal>
      <button className="recordBtn" onClick={() => setIsModalOpen('수입')}>
        수입/지출 등록하기
      </button>
      <Modal
        isOpen={isModalOpen === '수입'}
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
            className="incomeSelectBox"
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
            className="categorySelectBox"
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
            className="daySelectBox"
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
            onChange={(event) => handleInputChange('price', event.target.value)}
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
            onChange={(event) => handleInputChange('memo', event.target.value)}
          />
        </div>
        <div className="yearTextMain">
          <p className="yearText">반복 종료 년/월</p>
          <p className="optionalText">선택 입력</p>
        </div>
        <div className="divideFrame">
          <select className="yearSelectBox">
            {YEAR_LIST.map((year, index) => (
              <option key={index}>{year}</option>
            ))}
          </select>
          <select className="monthSelectBox">
            {MONTH_LIST.map((month, index) => (
              <option key={index}>{month}</option>
            ))}
          </select>
        </div>
        <div className="buttonFrame">
          <button
            className={isCompleteEnabled ? 'complieteBtn' : 'disabledBtn'}
          >
            완료
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Main;

const DIVIDE_LIST = ['-', '수입', '지출'];
const CATEGORY_LIST = ['-', '생활비', '식비', '고정비', '기타'];
const YEAR_LIST = Array.from({ length: 20 }, (_, i) => `${i + 2020}년`);
const MONTH_LIST = Array.from({ length: 12 }, (_, i) => `${i + 1}월`);
const DAY_LIST = Array.from({ length: 31 }, (_, i) => `${i + 1}일`);
