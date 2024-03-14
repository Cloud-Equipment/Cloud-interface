import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import ForgotPasswordOptionsButton from '../Components/ForgotPasswordOptionsButton';
import { PasswordResetOptionEnum } from '../Models';
import { useForm } from 'react-hook-form';
import { Input } from '@cloud-equipment/ui-components';
import queries from '../services';
import { useDispatch, useSelector } from 'react-redux';
import { clearLoading, setLoading } from '@cloud-equipment/shared_store';

enum PageView {
  OPTIONS,
  FORM,
}

const ForgotPassword = () => {
  const dispatch = useDispatch();
  const accountType = useSelector(
    (state: { account: { accountType: 0 | 1 } }) => state.account.accountType
  );
  const { register, handleSubmit, getValues } = useForm();
  const { mutateFn, isLoading } = queries.useForgotPassword(accountType);

  const [view, setView] = useState<PageView>(PageView.OPTIONS);

  const [option, setOption] = useState<PasswordResetOptionEnum | null>(null);
  const handleOptionClick = (_option: PasswordResetOptionEnum) => {
    setOption(_option);
  };

  const handleProceedClick = () => {
    setView(PageView.FORM);
  };

  useEffect(() => {
    if (isLoading) {
      dispatch(setLoading());
    } else {
      dispatch(clearLoading());
    }
  }, [isLoading]);

  const onSubmit = () => {
    mutateFn(
      option === PasswordResetOptionEnum.EMAIL
        ? { email: getValues().email }
        : { phone: getValues().phone },
      () => {}
    );
  };

  return (
    <>
      {view === PageView.OPTIONS ? (
        <div className="Authform">
          <h2 className="font-semibold text-2xl md:text-3xl">
            Forgot Password
          </h2>

          <p className="text-greyText2 text-sm mt-3">
            Select which contact details should we use to reset your password
          </p>

          <ForgotPasswordOptionsButton
            onClick={() => {
              handleOptionClick(PasswordResetOptionEnum.EMAIL);
            }}
            optionType={PasswordResetOptionEnum.EMAIL}
            isActive={option === PasswordResetOptionEnum.EMAIL}
          />

          <ForgotPasswordOptionsButton
            onClick={() => {
              handleOptionClick(PasswordResetOptionEnum.SMS);
            }}
            optionType={PasswordResetOptionEnum.SMS}
            isActive={option === PasswordResetOptionEnum.SMS}
          />

          <button
            onClick={handleProceedClick}
            disabled={!option}
            className="submit-button mt-10"
          >
            Proceed
          </button>

          <p className="text-center mt-5">
            I have remembered my password?{' '}
            <NavLink to="/auth/login" className="text-greenText">
              Login
            </NavLink>
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="Authform">
          <h2 className="font-semibold text-2xl md:text-3xl mb-4">
            Forgot Password
          </h2>

          <Input
            label="Email Address"
            placeholder="mail@company.com"
            type="email"
            {...register('email', {
              required: 'Email is required',
            })}
          />

          <button className="submit-button mt-10">Send OTP</button>
        </form>
      )}
    </>
  );
};

export default ForgotPassword;
