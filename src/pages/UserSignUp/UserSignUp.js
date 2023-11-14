import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserSignUp.scss';

const UserSignUp = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: '',
    phoneNumber: '',
    birthdate: '',
  });
  const { name, phoneNumber, birthdate } = userInfo;
  const [isValid, setIsValid] = useState(false);
  const isInputValid = name && phoneNumber && birthdate;
  useEffect(() => {}, []);
  const handleSubmit = () => {
    if (!name || !phoneNumber || !birthdate) {
      alert('모든 정보를 입력해주세요!');
    } else if (phoneNumber.length !== 11) {
      alert('전화번호를 정확히 입력해주세요!');
    } else if (birthdate.length !== 8) {
      alert('생년월일을 정확히 입력해주세요!');
    } else {
      fetch('http://10.58.52.156:3000/users/update', {
        method: 'PUT',
        headers: {
          'Content-type': 'application/json',
          authorization: localStorage.getItem('TOKEN'),
        },
        body: JSON.stringify(userInfo),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.message === 'SIGN_IN_COMPLETED') {
            alert('환영합니다!');
            navigate('/');
          }
        });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <div className="UserDetail">
      <div className="userDetailWrapperText">
        <h1>추가 정보 등록하기</h1>
      </div>
      <div className="userInfoWrapper">
        <label for="userName">이름</label>
        <input
          className="userName"
          name="name"
          placeholder="이름"
          type="text"
          onChange={handleInputChange}
        />
        <label for="userPhoneNumber">전화번호</label>
        <input
          className="userPhoneNumber"
          name="phoneNumber"
          placeholder="숫자만 입력하세요(예: 01012345678)"
          type="text"
          onChange={handleInputChange}
        />
        <label for="userBirthDate">생년월일</label>
        <input
          className="userBirthDate"
          name="birthdate"
          placeholder="숫자만 입력하세요(예: 19990113)"
          type="text"
          onChange={handleInputChange}
        />
      </div>
      <div className="btn">
        <button
          className={`buttonSignUp ${isInputValid ? 'active' : 'disabled'}`}
          onClick={handleSubmit}
          // disabled={!isInputValid}
        >
          회원 등록 완료
        </button>
      </div>
    </div>
  );
};

export default UserSignUp;
