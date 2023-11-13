import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuBar from './components/MenuBar/MenuBar';
import DashBoard from './pages/DashBoard/DashBoard';
import Nav from './components/Nav/Nav';
import Login from './pages/Login/Login';
import Setting from './pages/Setting/Setting';
import Table from './pages/Table/Table';
import UserDetail from './pages/UserDetail/UserDetail';

const Router = () => {
  return (
    <BrowserRouter>
      <MenuBar />
      <Routes>
        <Route path="/" element={<DashBoard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="/table" element={<Table />} />
        <Route path="/user-detail" element={<UserDetail />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
