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
      <div className="fixedIncomeFrame">
        <p className="fixedIncomeText">🗓️ 고정 수입 & 지출 내역 등록</p>
      </div>
    </div>
  );
};

export default Setting;
