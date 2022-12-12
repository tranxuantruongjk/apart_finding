import React from 'react';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';

const Auth = ({ authRoute }) => {
  let body;

  body = (
    <>
      {authRoute === 'login' && <LoginForm />}
      {authRoute === 'register' && <RegisterForm />}
    </>
  )

  return (
    <div className='container'>
      <div className='login mt-3'>
        {body}
      </div>
    </div>
  )
}

export default Auth;