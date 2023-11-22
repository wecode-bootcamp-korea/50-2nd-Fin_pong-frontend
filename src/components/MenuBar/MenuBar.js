import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuBar.scss';

const MenuBar = () => {
  // 페이지 이동
  const navigate = useNavigate();
  // 사용자 이름, 권한 상태 지정
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');

  // 로고 클릭시 메인페이지로 이동
  const goToMain = () => {
    navigate('/');
  };

  const token = localStorage.getItem('token');

  // 로그아웃
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userName');
    localStorage.removeItem('userRole');
    alert('로그아웃 되었습니다.');
    navigate('/login');
  };

  // 버튼 데이터
  const BUTTONS = [
    { text: 'Home', onClick: () => navigate('/') },
    { text: '가계부 조회', onClick: () => navigate('/table') },
    { text: '가계부 설정', onClick: () => navigate('/setting') },
    { text: '금융상품 안내', onClick: () => {} },
    { text: '개인정보 수정', onClick: () => {} },
    { text: '로그아웃', onClick: logout, isRed: true },
  ];
  // 사용자 정보(이름, 권한)
  useEffect(() => {
    fetch('http://10.58.52.143:8000/users/info', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserName(data.userName);
        setUserRole(data.userRole === 1 ? '관리자' : '참여자');
      })
      .catch((error) => {
        console.error('로그인 정보를 불러오는 중 에러:', error);
      });
  }, []);

  return (
    <div className="menuBarFrame">
      <div className="logoFrame">
        <img
          className="wonBookLogo"
          src="/../images/OneBook_Logo_Small.png"
          alt="WonBook 로고"
          onClick={goToMain}
        />
      </div>
      <div className="userInfoFrame">
        <p className="nameText">{userName}</p>
        <p className="adminText">{userRole}</p>
      </div>
      <div className="menuBarButtonFrame">
        <ul>
          {BUTTONS.map((button, index) => (
            <li key={index} className="buttonList">
              <button
                className={`menuBarButton${button.isRed ? ' red' : ''}`}
                onClick={button.onClick}
              >
                {button.text}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MenuBar;
