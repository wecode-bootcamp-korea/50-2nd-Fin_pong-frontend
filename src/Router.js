import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuWrapper from './components/MenuWrapper/MenuWrapper';
import DashBoard from './pages/DashBoard/DashBoard';
import Login from './pages/Login/Login';
import Setting from './pages/Setting/Setting';
import Table from './pages/Table/Table';
import UserDetail from './pages/UserDetail/UserDetail';

const Router = () => {
  return (
    <BrowserRouter>
      <MenuWrapper>
        <Routes>
          <Route path="/" element={<DashBoard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/table" element={<Table />} />
          <Route path="/user-detail" element={<UserDetail />} />
        </Routes>
      </MenuWrapper>
    </BrowserRouter>
  );
};

export default Router;
