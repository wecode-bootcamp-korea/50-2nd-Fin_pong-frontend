import React from 'react';
import './KakaoLogin.scss';

const KakaoLogin = () => {
  const KAKAO_REST_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.REACT_APP_KAKAO_REDIRECT_URI;

  const Kakao_Oauth_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  // console.log(Kakao_Oauth_URI);
  const kakaoLoginHandler = () => {
    window.location.href = Kakao_Oauth_URI;
  };

  return (
    <img
      className="kakaoLoginBtn"
      src="/../images/kakao_login_large_narrow.png"
      onClick={kakaoLoginHandler}
      alt="kakao"
    />
  );
};
export default KakaoLogin;
