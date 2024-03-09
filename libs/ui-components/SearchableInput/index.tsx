import { Autocomplete, MenuItem, TextField } from '@mui/material';
import React from 'react';
import * as Assets from '@cloud-equipment/assets';

interface SearchableInputProps {
  options: any[];
  label: string;
  containerClass?: string;
  inputValue: string; // value displayed in the input field.. especially when prefilling the form (state handled from parent)
  onInputChange: (value: string) => void; // emit event to parent when the user types into the field
  onOptionSelect: (selectedOption: any) => void; // emit to parent when user selects an option from dropdown
  optionLabelKey: string; // property to check for as the displayed value of an option
}

const SearchableInput = ({
  options,
  label,
  onInputChange,
  inputValue,
  onOptionSelect,
  optionLabelKey,
  containerClass,
}: SearchableInputProps) => {
  return (
    <div className={`form-input-label-holder ${containerClass}`}>
      <label>{label}</label>
      <Autocomplete
        freeSolo
        options={options ?? []}
        // onInputChange={(event, newInputValue) => {
        //   setPatientName(newInputValue);
        // }}
        onInputChange={(event, newInputValue) => {
          onInputChange(newInputValue);
        }}
        // onChange={(event, selectedOption) => {
        //   handleSelectedPatientFromSearch(selectedOption as unknown as any);
        // }}
        onChange={(event, selectedOption) => {
          onOptionSelect(selectedOption);
        }}
        renderInput={(params: any) => (
          <TextField
            {...params}
            InputProps={{
              ...params.InputProps,
            }}
          />
        )}
        getOptionLabel={(option) => {
          return option[optionLabelKey];
        }}
        renderOption={(props, option: any) => (
          <MenuItem {...props}>
            <div className="rounded flex items-center space-x-5 px-3 py-2">
              <img
                src={Assets.Icons.DummyUser}
                className="w-10 rounded-[10px]"
                alt=""
              />

              <div>
                <p className="font-semibold text-sm">
                  {option[optionLabelKey]}
                </p>
                <p className="text-xs mt-2">
                  {option.patientFacilityCode?.substr(0, 5)} .{' '}
                  {option.patientAge} Years
                </p>
              </div>
            </div>
          </MenuItem>
        )}
      />
    </div>
  );
};

export default SearchableInput;
