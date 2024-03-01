import React from 'react';
import AuthLayout from './Layout/AuthLayout';
import { AuthRouting } from './AuthRouting';

const Auth = () => {
  return (
    <AuthLayout>
      <AuthRouting />
    </AuthLayout>
  );
};

export default Auth;
