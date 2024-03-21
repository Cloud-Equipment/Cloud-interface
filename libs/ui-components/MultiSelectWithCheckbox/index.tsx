import {
  Checkbox,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import React, { useEffect, useState } from 'react';

interface IOption {
  id: string;
  name: string;
  price: string;
}

interface MultiSelectProps {
  label: string;
  wrapperClass?: string;
  onSelectionChange?: (selected: string[]) => void;
  options: IOption[]; // would refactor this to be custom
}

const MultiSelectWithCheckbox = ({
  label,
  wrapperClass,
  onSelectionChange,
  options,
}: MultiSelectProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const handleChange = (event: SelectChangeEvent<typeof selectedItems>) => {
    const {
      target: { value },
    } = event;
    setSelectedItems(value as string[]);
  };

  const renderSelected = (selected: string[]) => {
    let ans = '';
    selected.forEach((x, index) => {
      ans = ans + (index ? ', ' : '') + options?.find((r) => r.id === x)?.name;
    });
    return ans;
  };

  useEffect(() => {
    onSelectionChange?.(selectedItems);
  }, [selectedItems]);

  return (
    <div className={`form-input-label-holder block`}>
      <label>{label}</label>
      <Select
        multiple
        value={selectedItems}
        onChange={(val: SelectChangeEvent<string[]>) => handleChange(val)}
        renderValue={renderSelected}
        fullWidth={true}
        style={{ marginTop: '0.5rem' }} // Set maximum width here
      >
        {options?.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            <Checkbox
              checked={
                selectedItems?.findIndex((x) => {
                  return x === option.id;
                }) > -1
              }
            />
            <ListItemText>{option.name}</ListItemText>
            <span>{option.price}</span>
          </MenuItem>
        ))}
      </Select>
    </div>
  );
};

export default MultiSelectWithCheckbox;
