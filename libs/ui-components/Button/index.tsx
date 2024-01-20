import React, { ReactElement } from 'react';

// import cx from 'classnames';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string | ReactElement;
  variant?: 'primary' | 'neutral' | 'tertiary';
  icon?: string;
  iconAfter?: string;
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
  ...props
}) => {
  return (
    <button
      className={`px-6 py-3 font-manrope !rounded-md font-semibold text-sm justify-center items-center shadow-buttonShadow ${
        variants[variant]
      } ${className} ${icon || iconAfter ? 'flex gap-2' : ''}`}
      {...props}
    >
      {icon ? <img alt="" src={icon} /> : null}
      {label}
      {iconAfter ? <img alt="" src={iconAfter} /> : null}
    </button>
  );
};

export default Button;
