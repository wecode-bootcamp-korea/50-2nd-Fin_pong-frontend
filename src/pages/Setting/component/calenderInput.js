import React, { useState } from 'react';
import { ko } from 'date-fns/esm/locale';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import './calenderInput.scss';
// CSS Modules, react-datepicker-cssmodules.css
// import 'react-datepicker/dist/react-datepicker-cssmodules.css';

const CalenderInput = ({ text }) => {
  const [startDate, setStartDate] = useState(new Date());

  return (
    <div className="calenderInput">
      <label className="selectName">{text}</label>
      <DatePicker
        className="calender"
        showIcon
        locale={ko}
        dateFormat="yyyy년 MM월 dd일"
        selected={startDate}
        onChange={(date) => setStartDate(date)}
      />
    </div>
  );
};
export default CalenderInput;
