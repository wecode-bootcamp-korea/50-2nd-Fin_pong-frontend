import React from 'react';
import KakaoLogin from './KakaoLogin/KakaoLogin';

import './Login.scss';

const Login = () => {
  return (
    <div className="Login">
      <div className="loginWrapper">
        <KakaoLogin />
      </div>
    </div>
  );
};
export default Login;
