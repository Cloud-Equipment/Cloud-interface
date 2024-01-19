import React from 'react';

import cx from 'classnames';

interface FormTextAreaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string | React.ReactElement;
  containerClass?: string;
}

const TextArea: React.FC<FormTextAreaProps> = ({
  label,
  className,
  containerClass,
  ...rest
}) => {
  return (
    <div
      className={cx(
        { 'flex flex-col': !!label },
        { [`${containerClass}`]: !!containerClass },
        'mt-3 gap-1'
      )}
    >
      <label className="block font-manrope text-[1rem] capitalize font-normal leading-[1.25rem] text-secondary-500">
        {label}
      </label>
      <textarea
        className={cx(
          'py-2.5 pr-2 pl-3 rounded-lg focus:outline-none w-full h-full border',
          className
        )}
        {...rest}
      />
    </div>
  );
};

export default TextArea;
