import React, { useState } from 'react';
import './UserSignUp.scss';
// import DropDown from './Dropdown';

const UserDetail = () => {
  const [userInfo, setUserInfo] = useState({
    userNameme: '',
    userPhoneNumber: '',
    userBirthDate: '',
    userAuth: '',
  });

  // const handleSubmit = () => {
  //   fetch(api
  //     , {
  //     method: 'POST',
  //     headers: {
  //       'Content-type': 'application/json',
  //     },
  //     body: JSON.stringify(userInfo),
  //   })
  //     .then((res) => res.json())
  //     .then((response) => {
  //       if (response.message === 'SIGN_IN_COMPLETED') {
  //         alert('환영합니다!');
  //       } else {
  //         alert('빠진 정보가 있는지 확인해보세요!');
  //       }
  //     });
  // };

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
        <input className="userName" placeholder="이름" type="text" />
        <input className="userPhoneNumber" placeholder="전화번호" type="text" />
        <input className="userBirthDate" placeholder="생년월일" type="text" />
        <select className="userAuth">
          {FAMILY_MEMBER.map((family) => (
            <option key={family.id} value={family.family}>
              {family.family}
            </option>
          ))}
        </select>
      </div>
      <div className="buttonSignUp">
        <button onClick={handleInputChange}>회원 등록 완료</button>
      </div>
    </div>
  );
};

export default UserDetail;
