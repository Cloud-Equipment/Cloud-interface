import cx from 'classnames';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClass?: string;
}

const FormInput: React.FC<InputProps> = ({
  className,
  label,
  id,
  containerClass,
  ...rest
}) => {
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
        className={cx(
          'py-2.5 pr-2 pl-3 rounded-lg focus:outline-none w-full h-12 border',
          className
        )}
        id={id}
        {...rest}
      />
    </div>
  );
};

export default FormInput;
