import React from 'react';
import wonBookLogo1 from './onebooklogo_preview_rev_1.png';
import adminImage from './adminImage.png';
import './MenuBar.scss';

const MenuBar = () => {
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
            <button className="mainButton">Main</button>
          </li>
          <li className="buttonList">
            <button className="accountButton">가계부</button>
          </li>
          <li className="buttonList">
            <button className="communityButton">커뮤니티</button>
          </li>
          <li className="buttonList">
            <button className="productInfoButton">상품 안내(가입)</button>
          </li>
          <li className="buttonList">
            <button className="settingButton">설정</button>
          </li>
          <li className="logoutList">
            <button className="logoutButton">로그아웃</button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default MenuBar;
