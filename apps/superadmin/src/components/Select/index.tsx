import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import cx from 'classnames';
import { MenuItem, Select } from '@mui/material';

interface SelectProps<T extends string>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  containerClass?: string;
  options?: { [key: string]: string }[];
  field?: ControllerRenderProps<FieldValues, T>;
}

const SelectDropdown: React.FC<any> = <T extends string>({
  className,
  label,
  id,
  containerClass,
  options = [],
  field,
  placeholder,
  ...rest
}: SelectProps<T>) => {
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
      <Select
        className={cx(
          'py-2.5 pr-2 pl-3 rounded-lg focus:outline-none w-full h-12 border',
          className
        )}
        {...field}
      >
        <MenuItem value={0} disabled>
          {placeholder}
        </MenuItem>
        {options.map((x, i) => (
          <MenuItem key={i} value={x.categoryId}>
            {x.categoryName}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default SelectDropdown;
