import React from 'react';
import './SelectDropdown.scss';

const SelectDropdown = ({ text, options, handleSelect, disabled }) => {
  return (
    <div className="selectDropdown">
      <label className="selectName">{text}</label>
      <select
        className="selectContent"
        onChange={handleSelect}
        disabled={disabled}
      >
        <option value="">Select an option</option>
        {options?.map(({ option }) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectDropdown;
