import React from 'react';
import MenuBar from '../MenuBar/MenuBar';
import './MenuWrapper.scss';

const MenuWrapper = ({ children }) => {
  return (
    <div className="menuWrapper">
      <MenuBar />
      <main className="mainContent">{children}</main>
    </div>
  );
};

export default MenuWrapper;
