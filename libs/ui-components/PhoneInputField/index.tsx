import React from 'react';
import { Control, Controller } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import cx from 'classnames';
import './phone.scss';

interface PhoneInputProps {
  control: any;
  name: string;
  defaultValue?: string;
  label?: string;
  containerClass?: string;
  readonly?: boolean;
}

const PhoneInputField = ({
  control,
  name,
  defaultValue,
  label,
  containerClass,
  readonly = false,
}: PhoneInputProps) => {
  return (
    <div
      className={cx(
        { 'flex flex-col gap-1': !!label },
        { [`${containerClass}`]: !!containerClass }
      )}
    >
      {label ? (
        <label
          className={cx(
            'block font-manrope text-sm capitalize font-medium leading-[1.25rem] text-secondary-500'
          )}
        >
          {label}
        </label>
      ) : null}
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        disabled={readonly}
        render={({ field }) => (
          <PhoneInput
            {...field}
            country={'ng'}
            placeholder="+23492929292"
            inputProps={{
              name: name,
              required: true,
              value: field.value?.startsWith('+')
                ? field.value
                : field.value
                ? `+${field.value}`
                : field.value,
            }}
          />
        )}
      />
      {/* {!!error && <p className="text-red-500 text-sm">{error?.message}</p>} */}
    </div>
  );
};

export default PhoneInputField;
