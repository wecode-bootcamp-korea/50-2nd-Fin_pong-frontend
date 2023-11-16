import React, { useState } from 'react';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './CalenderInput.scss';

const CalenderInput = ({ text, handleDateChange, date }) => {
  const [startDate, setStartDate] = useState(date);

  const handleDateChangeWrapper = (date) => {
    setStartDate(date);
    handleDateChange(date);
  };

  return (
    <div className="calenderInput">
      <label className="selectName">{text}</label>
      <DatePicker
        className="calender"
        showIcon
        locale={ko}
        dateFormat="yyyy년 MM월 dd일"
        selected={startDate}
        onChange={handleDateChangeWrapper}
      />
    </div>
  );
};
export default CalenderInput;
