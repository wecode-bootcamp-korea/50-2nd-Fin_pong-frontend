import React from 'react';
import { useNavigate } from 'react-router-dom';
import wonBookLogo1 from './onebooklogo_preview_rev_1.png';
import adminImage from './adminImage.png';
import './MenuBar.scss';

const MenuBar = () => {
  // 페이지 이동
  const navigate = useNavigate();
  // 메인 페이지
  const goToMain = () => {
    navigate('./');
  };
  // 설정 페이지
  const goToSetting = () => {
    navigate('./setting');
  };
  // 가계부 페이지
  const goToTable = () => {
    navigate('./table');
  };
  return (
    <div className="menuBarFrame">
      <div className="logoFrame">
        <img className="wonBookLogo" src={wonBookLogo1}></img>
      </div>
      <div className="userInfoFrame">
        <img className="adminImage" src={adminImage}></img>
        <p className="nameText">김성호님</p>
        <p className="adminText">Administrator</p>
      </div>
      <div className="menuBarButtonFrame">
        <ul>
          <li className="buttonList">
            <button className="menuBarButton" onClick={goToMain}>
              Main
            </button>
          </li>
          <li className="buttonList">
            <button className="menuBarButton" onClick={goToTable}>
              가계부
            </button>
          </li>
          <li className="buttonList">
            <button className="menuBarButton">커뮤니티</button>
          </li>
          <li className="buttonList">
            <button className="menuBarButton">상품 안내(가입)</button>
          </li>
          <li className="buttonList">
            <button className="menuBarButton" onClick={goToSetting}>
              설정
            </button>
          </li>
          <li className="buttonList">
            <button className="menuBarButton red">로그아웃</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuBar;
