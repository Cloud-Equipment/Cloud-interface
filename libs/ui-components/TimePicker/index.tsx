import React from 'react';

import dayjs, { Dayjs } from 'dayjs';
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker';
import cx from 'classnames';

interface ITimePickerProps extends TimePickerProps<Dayjs | any> {
  label: string | React.ReactElement;
  containerClass?: string;
  className?: string;
}

const TimePickerComponent: React.FC<ITimePickerProps> = ({
  label,
  className,
  containerClass,
  ...rest
}) => {
  return (
    <div
      className={cx(
        { 'flex flex-col gap-1': !!label },
        { [`${containerClass}`]: !!containerClass },
        ''
      )}
    >
      <label className="block font-manrope text-[1rem] capitalize font-normal leading-[1.25rem] text-secondary-500">
        {label}
      </label>
      <TimePicker
        defaultValue={dayjs(new Date())}
        className={cx(
          'py-2.5 pr-2 pl-3 rounded-lg focus:outline-none w-full border h-12 [&_input]:h-4',
          className
        )}
        {...rest}
      />
    </div>
  );
};

export default TimePickerComponent;
