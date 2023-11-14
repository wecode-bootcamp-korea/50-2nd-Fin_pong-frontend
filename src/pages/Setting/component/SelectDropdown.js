import React from 'react';
import './SelectDropdown.scss';

const Dropdown = ({ text, options, name, handleSelect }) => {
  return (
    <div className="selectDropdown">
      <label className="selectName">{text}</label>
      <select className="selectContent" onChange={handleSelect}>
        <option value="">Select an option</option>
        {options?.map((option) => (
          <option key={option} value={option}>
            {option[name]}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
