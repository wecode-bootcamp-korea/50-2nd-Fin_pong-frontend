import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import wonBookLogo1 from './onebooklogo_preview_rev_1.png';
import './MenuBar.scss';

const MenuBar = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  // 토큰
  const token =
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Imp3azIzNDVAbmF2ZXIuY29tIiwiaWQiOjEsImlhdCI6MTcwMDIxNjc5NX0.e2jdqf0UD-W8J7VmiEpgO18WgyDEkydWC50DZmWHRvM';

  const BUTTONS = [
    { text: 'Main', onClick: () => navigate('/') },
    { text: '가계부', onClick: () => navigate('/table') },
    { text: '커뮤니티', onClick: () => {} },
    { text: '상품 안내(가입)', onClick: () => {} },
    { text: '설정', onClick: () => navigate('/setting') },
    { text: '로그아웃', onClick: () => {}, isRed: true },
  ];
  // 사용자 정보(이름, 권한)
  useEffect(() => {
    fetch('http://10.58.52.143:8000/users/info', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
        authorization: token,
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
        <img className="wonBookLogo" src={wonBookLogo1} alt="WonBook 로고" />
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
                className={`menuBarButton${button.isRed ? ' red' : ''}`} // 빨간색 클래스 추가
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
