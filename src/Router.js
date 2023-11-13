import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Nav from './components/Nav/Nav';
import Main from './pages/Main/Main';
import MenuBar from './pages/MenuBar/MenuBar';
import Login from './pages/Login/Login';
import Setting from './pages/Setting/Setting';
import Table from './pages/Table/Table';
import UserDetail from './pages/UserDetail/UserDetail';

const Router = () => {
  return (
    <BrowserRouter>
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/menubar" element={<MenuBar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
