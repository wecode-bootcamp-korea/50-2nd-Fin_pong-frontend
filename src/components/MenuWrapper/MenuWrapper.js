import React from 'react';
import { useLocation } from 'react-router-dom';
import MenuBar from '../MenuBar/MenuBar';
import './MenuWrapper.scss';

const EXCEPTIONAL_PATH = ['/login', '/users/auth', '/Setting'];

const MenuWrapper = ({ children }) => {
  const { pathname } = useLocation();

  const isExceptionalPath = EXCEPTIONAL_PATH.some(
    (path) => path === pathname.toLocaleLowerCase(),
  );

  return (
    <div className="menuWrapper">
      {!isExceptionalPath && <MenuBar />}
      <main className="mainContent">{children}</main>
    </div>
  );
};

export default MenuWrapper;
