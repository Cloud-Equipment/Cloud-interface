import { ControllerRenderProps, FieldValues } from 'react-hook-form';
import cx from 'classnames';
import { MenuItem, Select, FormControl, InputLabel } from '@mui/material';

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
}: SelectProps<T>) => {
  return (
    <div
      className={cx(
        { 'flex flex-col gap-1 justify-between': !!label },
        { [`${containerClass}`]: !!containerClass }
        // 'mt-3'
      )}
    >
      {label ? (
        <label
          htmlFor={id}
          className="block font-manrope text-sm capitalize font-medium leading-[1.25rem] text-secondary-500"
        >
          {label}
        </label>
      ) : null}

      <Select
        className={cx(
          'py-2.5 pr-2 pl-3 rounded-lg focus:outline-none w-full h-12 border',
          className
        )}
        inputProps={{ 'aria-label': 'Without label' }}
        {...field}
      >
        <MenuItem disabled value={0}>
          <em>{placeholder}</em>
        </MenuItem>
        {options.map((x, i) => (
          // REFACTOR: Change this to value and label
          <MenuItem key={i} value={x.categoryId}>
            {x.categoryName}
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default SelectDropdown;
