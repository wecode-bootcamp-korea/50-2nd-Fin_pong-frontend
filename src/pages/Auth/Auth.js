import React from 'react';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const codeKakao = new URL(window.location.href).searchParams.get('code');

  const navigate = useNavigate();

  fetch('http://10.58.52.156:3000/users/auth', {
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