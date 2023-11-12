import React from 'react';

// import KakaoLogin from 'react-kakao-login';
import './KakaoLogin.scss';

const KakaoLogin = () => {
  const KAKAO_REST_API_KEY = process.env.KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = process.env.KAKAO_REDIRECT_URI;

  const Kakao_Oauth_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  const kakaoLoginHandler = () => {
    window.location.href = { Kakao_Oauth_URI };
  };
  // const code = new URL(window.location.href).searchParams.get('code');

  return (
    <button type="button" onClick={kakaoLoginHandler}>
      카카오톡 로그인
    </button>
  );
};
export default KakaoLogin;
