import React, { ReactElement } from 'react';

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
    'bg-white hover:opacity-85 border-primary-100 hover:border-primary-100 text-primary-100 !rounded-md',
  tertiary: '',
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
      {...props}
      // className={cx(
      //   `border px-6 py-3 rounded-md font-manrope font-semibold text-sm justify-center items-center shadow-buttonShadow`,
      //   // icon || iconAfter ? 'flex gap-1.5' : '',
      //   variants[variant],
      //   className
      // )}
      className={`px-6 py-3 font-manrope !rounded-md font-semibold text-sm justify-center items-center shadow-buttonShadow ${
        variants[variant]
      } ${className} ${icon || iconAfter ? 'flex gap-2' : ''}`}
    >
      {icon ? <img alt="" src={icon} /> : null}
      {label}
      {iconAfter ? <img alt="" src={iconAfter} /> : null}
    </button>
  );
};

export default Button;
