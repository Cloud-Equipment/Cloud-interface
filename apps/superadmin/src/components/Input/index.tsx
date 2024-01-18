import { forwardRef } from 'react';

import cx from 'classnames';
import { FieldError, UseFormRegister } from 'react-hook-form';

interface InputProps<T extends object>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClass?: string;
  register?: UseFormRegister<T>;
  error?: FieldError;
}

const FormInput = forwardRef<HTMLInputElement, InputProps<any>>(
  ({ className, label, id, containerClass, ...rest }, ref) => {
    return (
      <div
        className={cx(
          { 'flex flex-col gap-3': !!label },
          { [`${containerClass}`]: !!containerClass },
          'mt-3'
        )}
      >
        {label ? (
          <label
            htmlFor={id}
            className="block font-inter text-xs capitalize font-normal leading-[1.25rem] text-neutral-600"
          >
            {label}
          </label>
        ) : null}
        <input
          ref={ref}
          className={cx(
            'py-2.5 pr-2 pl-3 rounded-lg focus:outline-none w-full h-12 border',
            className
          )}
          id={id}
          {...rest}
        />
      </div>
    );
  }
);

export default FormInput;
