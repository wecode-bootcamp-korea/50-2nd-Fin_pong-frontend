import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuWrapper from './components/MenuWrapper/MenuWrapper';
import Main from './pages/Main/Main';
import Login from './pages/Login/Login';
import Setting from './pages/Setting/Setting';
import UserSignUp from './pages/UserSignUp/UserSignUp';
import Auth from './pages/Auth/Auth';

const Router = () => {
  return (
    <BrowserRouter>
      <MenuWrapper>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/Setting" element={<Setting />} />
          <Route path="/user-signup" element={<UserSignUp />} />
          <Route path="/users/auth" element={<Auth />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </MenuWrapper>
    </BrowserRouter>
  );
};

export default Router;
