import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import queries from '../services';
import { useSelector } from 'react-redux';

const PasswordReset = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const accountType = useSelector(
    (state: { account: { accountType: 0 | 1 } }) => state.account.accountType
  );

  // Read query parameters
  const email = searchParams.get('email');
  const token = searchParams.get('token');

  const { useValidateToken } = queries;
  const { isLoading, isSuccess } = useValidateToken(
    accountType,
    email as string,
    token as string
  );

  return <div></div>;
};

export default PasswordReset;
