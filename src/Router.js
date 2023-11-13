import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MenuBar from './components/MenuBar/MenuBar';
import DashBoard from './pages/DashBoard/DashBoard';

const Router = () => {
  return (
    <BrowserRouter>
      <MenuBar />
      <Routes>
        <Route path="/" element={<DashBoard />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
