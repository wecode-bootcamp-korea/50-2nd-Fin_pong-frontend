import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import API from '../../config';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { code } = useParams();

  const searchParams = new URLSearchParams(location.search);
  const codeKakao = searchParams.get('code');

  fetch(API.UserSignUp, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      codeKakao,
    }),
  })
    .then((res) => res.json())
    .then((response) => {
      localStorage.setItem('TOKEN', response.token);
      if (response.needsAdditionalInfo === true) {
        navigate('/user-signup');
      } else {
        navigate('/');
      }
    });

  return null;
};
export default Auth;
