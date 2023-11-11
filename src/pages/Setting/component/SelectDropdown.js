import React from 'react';
import './SelectDropdown.scss';

const Dropdown = ({ text }) => {
  return (
    <div className="selectDropdown">
      <label className="selectName">{text}</label>
      <select className="selectContent" />
    </div>
  );
};

export default Dropdown;
