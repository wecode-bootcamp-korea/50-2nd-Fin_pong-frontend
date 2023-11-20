import React from 'react';
import { useLocation } from 'react-router-dom';
import MenuBar from '../MenuBar/MenuBar';
import './MenuWrapper.scss';

const MenuWrapper = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  // 로그인 페이지인 경우에는 MenuBar를 렌더링하지 않습니다.
  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="menuWrapper">
      <MenuBar />
      <main className="mainContent">{children}</main>
    </div>
  );
};

export default MenuWrapper;
