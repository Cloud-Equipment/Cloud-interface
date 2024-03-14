import React, { useEffect } from 'react';
import { Input } from '@cloud-equipment/ui-components';
import { useForm } from 'react-hook-form';
import * as Assets from '@cloud-equipment/assets';
import { useDispatch, useSelector } from 'react-redux';
import queries from '../services';
import { setLoading, clearLoading } from '@cloud-equipment/shared_store';
import { useLocation } from 'react-router-dom';

const ChangePassword = () => {
  const dispatch = useDispatch();
  const accountType = useSelector(
    (state: { account: { accountType: 0 | 1 } }) => state.account.accountType
  );
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  // Read query parameters
  const email = searchParams.get('email');

  const { register, handleSubmit, getValues } = useForm();
  const { mutateFn, isLoading } = queries.useChangePassword(accountType);

  const onSubmit = () => {
    mutateFn({ email, ...(getValues() as any) }, () => {
      alert('its done');
    });
  };

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading());
    } else {
      dispatch(clearLoading());
    }
  }, [isLoading]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="Authform">
      <img src={Assets.Images.Auth.WavingHand} alt="" />

      <h2 className="font-semibold text-2xl md:text-3xl mt-2">
        Create New Password
      </h2>

      <p className="text-greyText2 text-sm mt-3 mb-5">
        Please provide your desired password.
      </p>

      <Input
        label="Password"
        placeholder="**********"
        type="password"
        {...register('password', {
          required: 'Password is required',
        })}
      />

      <div className="my-3"></div>

      <Input
        label="Confirm Password"
        placeholder="**********"
        type="password"
        {...register('confirmPassword', {
          required: 'Password Confirmation is required',
        })}
      />

      <button className="submit-button mt-10">Create Password</button>
    </form>
  );
};

export default ChangePassword;
