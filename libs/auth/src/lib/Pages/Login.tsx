import React from 'react';
import * as Assets from '@cloud-equipment/assets';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { environment } from '@cloud-equipment/environments';
import { toast } from 'react-toastify';
import * as jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../Store/actions';
import { setLoading, clearLoading } from '@cloud-equipment/shared_store';
import { IUser } from '@cloud-equipment/models';
import api from '@cloud-equipment/api';

const Login = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    dispatch(setLoading());
    api
      .post(`${environment.baseUrl}/user-manager/account/login`, data)
      .then((response) => {
        if (response.data.success) {
          toast.success(response.data.msg);

          const token = response.data.data.token;

          try {
            const decoded = jwtDecode.jwtDecode(token) as unknown as IUser;
            // Set the decoded payload in the state
            console.log(decoded);
            dispatch(
              loginSuccess({
                ...decoded,
                userType:
                  decoded[
                    'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
                  ],
              })
            );

            localStorage.setItem('token', token);
          } catch (error) {
            // console.error("Error decoding JWT:", error.message);
          }
          navigate('/');
        }
      })
      .finally(() => {
        dispatch(clearLoading());
      });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="Authform">
      <img src={Assets.Images.Auth.WavingHand} alt="" />

      <h2 className="font-semibold text-2xl md:text-3xl mt-2">Welcome back!</h2>

      <p className="text-greyText2 text-sm mt-3">
        Please login to access your account.
      </p>

      <div className="auth-input-label-holder mt-10">
        <label>Email Address</label>
        <input
          {...register('email')}
          placeholder="mail@company.com"
          className="ce-input"
        />
      </div>

      <div className="auth-input-label-holder mt-10">
        <label>Password</label>
        <input {...register('password')} type="password" className="ce-input" />
      </div>

      <NavLink to="." className="text-greenText">
        Forgot Password?
      </NavLink>

      <button className="submit-button mt-10">Log In</button>

      <p className="text-center mt-5">
        Don't have an account?{' '}
        <NavLink to="." className="text-greenText">
          Contact support
        </NavLink>{' '}
      </p>
    </form>
  );
};

export default Login;
