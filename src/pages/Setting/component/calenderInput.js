import React, { useState } from 'react';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './calenderInput.scss';

const CalenderInput = ({ text }) => {
  const [startDate, setStartDate] = useState(new Date());

  const handleDateChangeWrapper = (date) => {
    setStartDate(date);
    handleDateChangeWrapper(date);
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
