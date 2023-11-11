import React, { useState } from 'react';
import SelectDropdown from './component/SelectDropdown';
import CompleteBtn from './component/completeBtn';
import BudgetModal from './component/BudgetModal'; // 예산 모달 컴포넌트 import
import AllowanceModal from './component/AllowanceModal'; // 용돈 모달 컴포넌트 import
import './Setting.scss';

const Setting = () => {
  const [budgetModalOpen, setBudgetModalOpen] = useState(false);
  const [allowanceModalOpen, setAllowanceModalOpen] = useState(false);

  const openBudgetModal = () => setBudgetModalOpen(true);
  const closeBudgetModal = () => setBudgetModalOpen(false);

  const openAllowanceModal = () => setAllowanceModalOpen(true);
  const closeAllowanceModal = () => setAllowanceModalOpen(false);

  return (
    <div className="settingAll">
      <div className="settingTitle">
        <h1 className="settingTitleName">설정✏️</h1>
        <div className="settingInfo">
          <div className="settingFirstInfo">
            <h2 className="settingPwName">️🏷️ 그룹관리 인증번호 : </h2>
            <p className="settingPwNum">sdfadsfasdf1234</p>
          </div>
          <div className="infoContainer">
            <button className="budgetBtn" onClick={openBudgetModal}>
              예산등록하기
            </button>
            <BudgetModal
              className="BudgetModal"
              isOpen={budgetModalOpen}
              onClose={closeBudgetModal}
            />
            <button className="allowanceBtn" onClick={openAllowanceModal}>
              용돈 등록하기
            </button>
            <AllowanceModal
              className="AllowanceModal"
              isOpen={allowanceModalOpen}
              onClose={closeAllowanceModal}
            />
          </div>
          <div className="settingSecondInfo">
            <h2 className="settingContentName">🗓️ 고정 수입&지출 내역 등록</h2>
            <div className="fixContentList">
              <div className="contentListDate">
                <SelectDropdown text="일자" />
                <SelectDropdown text="구분" />
              </div>
              <div className="contentListSort">
                <SelectDropdown text="항목" />
                <SelectDropdown text="대상 선택" />
              </div>
              <div className="contentListAmount">
                <div className="amountInput">
                  <label className="amountName">금액</label>
                  <input className="amount" />
                </div>
                <SelectDropdown text="반복 종료 년(선택사항)" />
                <SelectDropdown text="반복 종료 월(선택사항)" />
              </div>
              <div className="memoInput">
                <label className="memoName">메모</label>
                <input
                  className="memo"
                  placeholder="25자 내외로 작성해주세요."
                />
              </div>
            </div>
            <CompleteBtn className="completeBtnContainer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
