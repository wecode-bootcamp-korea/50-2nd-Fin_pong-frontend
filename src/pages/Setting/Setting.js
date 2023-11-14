import React from 'react';
import './Setting.scss';

const Setting = () => {
  return (
    <div className="setting">
      <h1 className="title">설정 ✏️</h1>
      <div className="groupNumberFrame">
        <h2 className="groupText">🔖 그룹관리 인증번호 : </h2>
        <input className="groupInput" type="text" />
      </div>
      <div className="fixedIncomeFrame"></div>
    </div>
  );
};

export default Setting;
