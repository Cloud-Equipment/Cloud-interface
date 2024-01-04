import React, { useState, useRef } from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { BASE_URL } from "../data/data";

const SearchBox = ({ onSelect }) => {
  const customStyles = {
    option: (provided, state) => ({
      ...provided,
      display: "flex",
      alignItems: "center",
    }),
    control: (provided) => ({
      ...provided,
      borderRadius: "8px",
      width: "100%",
      maxWidth: "400px",
      border: "1px solid rgba(99, 119, 138, 0.5)",
      outline: "none",
    }),
  };

  const customOptionRenderer = (option) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={`url-to-your-image/${option.value}.jpg`}
        alt={option.label}
        style={{ marginRight: "8px", width: "24px", height: "24px" }}
      />
      {option.label}
    </div>
  );

  const selectRef = useRef(null);

//   const handleMenuClose = () => {
//     // Clear the input value when the menu is closed
//     selectRef.current.select.setValue(null);
//     if (selectRef.current) {
//       alert("wler");
//     }
//   };

  const formatOptionLabel = (option) => (
    // <div style={{ display: "flex" }}>
    //   <div>{label}</div>
    //   <div style={{ marginLeft: "10px", color: "#ccc" }}>
    //     {customAbbreviation}
    //   </div>
    // </div>
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={option.imagePath}
        alt={option.patientNme}
        style={{ marginRight: "8px", width: "24px", height: "24px" }}
      />
      {option.patientName}
    </div>
  );

  const searchPatientsByName = async (inputValue) => {
    if (!inputValue) return;
    const url = `${BASE_URL}/patient/getpatientbyname`;
    try {
      const response = await axios.get(url, {
        params: { patientName: inputValue },
      });

      if (response.data.success) {
        return response.data.data.map((patient) => ({
          ...patient,
          value: patient.patientUniqueID,
          label: patient.patientName,
        }));
      }
    } catch (error) {
      return [];
    }
  };

  return (
    <AsyncSelect
      cacheOptions
      defaultOptions
      isSearchable
      styles={customStyles}
      formatOptionLabel={formatOptionLabel}
      onChange={(selectedOption) => {
        onSelect(selectedOption);
      }}
      loadOptions={searchPatientsByName}
    //   onMenuClose={handleMenuClose}
    />
  );
};

export default SearchBox;
