import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserSignUp.scss';
// import DropDown from './Dropdown';

const UserDetail = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    userName: '',
    userPhoneNumber: '',
    userBirthDate: '',
    userAuth: '',
  });

  const handleSubmit = () => {
    fetch('http://10.58.52.208:3000/users/update', {
      method: 'POST',
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
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const FAMILY_MEMBER = [
    { id: 1, family: '부모' },
    { id: 2, family: '자녀' },
  ];

  return (
    <div className="UserDetail">
      <div className="userDetailWrapperText">
        <h1>추가 정보 등록하기</h1>
      </div>
      <div className="userNameWrapper">
        <input
          className="userName"
          name="userName"
          placeholder="이름"
          type="text"
          onChance={handleInputChange}
        />
        <input
          className="userPhoneNumber"
          name="userPhoneNumber"
          placeholder="전화번호"
          type="text"
          onChance={handleInputChange}
        />
        <input
          className="userBirthDate"
          name="userBirthDate"
          placeholder="생년월일"
          type="text"
          onChance={handleInputChange}
        />
        <select className="userAuth">
          {FAMILY_MEMBER.map((family) => (
            <option
              key={family.id}
              value={family.family}
              name="userAuth"
              onChance={handleInputChange}
            >
              {family.family}
            </option>
          ))}
        </select>
      </div>
      <div className="buttonSignUp">
        <button onClick={handleSubmit}>회원 등록 완료</button>
      </div>
    </div>
  );
};

export default UserDetail;
