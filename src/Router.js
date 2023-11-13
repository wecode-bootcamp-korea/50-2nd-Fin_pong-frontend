import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './pages/Main/Main';
import MenuBar from './pages/MenuBar/MenuBar';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/menubar" element={<MenuBar />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
