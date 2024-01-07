import React, { useState, useRef } from "react";
import AsyncSelect from "react-select/async";
import axios from "axios";
import { BASE_URL } from "../data/data";
import DummyUserImg from "../Assets/IconAndLogo/dummy-user.webp";

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
      border: "1px solid rgba(99, 119, 138, 0.5)",
      outline: "none",
    }),
    menu: (provided, state) => ({
      ...provided,
    }),
  };

  const selectRef = useRef(null);

  //   const handleMenuClose = () => {
  //     // Clear the input value when the menu is closed
  //     selectRef.current.select.setValue(null);
  //     if (selectRef.current) {
  //       alert("wler");
  //     }
  //   };

  const formatOptionLabel = (option) => (
    <div style={{ display: "flex", alignItems: "center" }}>
      <img
        src={DummyUserImg}
        alt={option.patientNme}
        style={{
          borderRadius: "10px",
          marginRight: "8px",
          width: "50px",
          height: "50px",
        }}
      />
      <div>
        <p style={{ fontWeight: 700, marginBottom: 0 }}>{option.patientName}</p>
        <p style={{ marginBottom: 0 }}>
          <span>{option.patientUniqueID}</span>
          &emsp;
          <span>{option.patientAge} Years</span>
        </p>
      </div>
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
      placeholder="Search Patient Name"
      styles={customStyles}
      className="react-select"
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
