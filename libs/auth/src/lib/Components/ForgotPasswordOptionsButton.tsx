import React from 'react';
import { PasswordResetOptionEnum } from '../Models';
import * as Assets from '@cloud-equipment/assets';

const ForgotPasswordOptionsButton = ({
  optionType,
  isActive,
  onClick,
}: {
  optionType: PasswordResetOptionEnum;
  isActive: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className={`border border-solid rounded-xl flex px-3 py-2 gap-3 mt-4 ${
        isActive ? 'border-greenText' : 'border-borderLine'
      }`}
    >
      <div className="flex rounded-full items-center justify-center bg-lightGreen w-[60px] h-[60px] ">
        <img
          src={
            optionType === PasswordResetOptionEnum.EMAIL
              ? Assets.Icons.Auth.MessageIcon
              : Assets.Icons.Auth.SmsIcon
          }
          alt=""
        />
      </div>

      <div className="flex-1 text-left">
        <p className="text-sm text-greyText">
          {optionType === PasswordResetOptionEnum.EMAIL
            ? 'Via Email'
            : 'Via SMS'}
        </p>

        <p className="text-blackText">
          {optionType === PasswordResetOptionEnum.EMAIL
            ? "You're to provide the email linked to this account"
            : "You're to provide the phone number linked to this account"}
        </p>
      </div>
    </button>
  );
};

export default ForgotPasswordOptionsButton;
