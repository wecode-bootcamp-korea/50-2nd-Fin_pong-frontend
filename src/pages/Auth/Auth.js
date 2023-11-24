import { useNavigate, useSearchParams } from 'react-router-dom';
import API from '../../config';

const Auth = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const codeKakao = searchParams.get('code');

  fetch(API.UserAuth, {
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
