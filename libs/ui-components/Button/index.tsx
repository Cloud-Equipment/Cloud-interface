import React, { ReactElement } from 'react';

// import cx from 'classnames';
import { Loader } from '../index';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | ReactElement;
  variant?: 'primary' | 'neutral' | 'tertiary';
  icon?: string;
  iconAfter?: string;
  loading?: boolean;
}

const variants = {
  primary:
    'bg-primary-150 hover:opacity-85 border-primary-100 hover:border-primary-100 text-white !rounded-md',
  neutral:
    'bg-white hover:opacity-85 border border-primary-100 hover:border-primary-100 text-primary-100 !rounded-md',
  tertiary: 'bg-primary-200 hover:opacity-85 text-primary-150',
};

const Button: React.FC<ButtonProps> = ({
  label,
  className = '',
  variant = 'primary',
  icon,
  iconAfter,
  type = 'button',
  loading,
  ...props
}) => {
  return (
    <button
      disabled={loading}
      className={`px-6 py-3 font-manrope !rounded-md font-semibold text-sm justify-center items-center shadow-buttonShadow ${
        loading ? 'cursor-progress opacity-85' : ''
      } ${variants[variant]} ${className} ${
        icon || iconAfter || loading ? 'flex gap-2' : ''
      }`}
      {...props}
    >
      {loading ? <Loader /> : null}
      {icon ? <img alt="" src={icon} /> : null}
      {label}
      {iconAfter ? <img alt="" src={iconAfter} /> : null}
    </button>
  );
};

export default Button;
