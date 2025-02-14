import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faBell,
  faCalendarDays,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useDarkModeStore from "../../utils/useDarkModeStore";
import "./Header.css";

const Header = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false); // Toggle DatePicker popup
  const { darkMode } = useDarkModeStore();

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false); // Close DatePicker after selection
  };

  return (
    <div className={`header-container ${darkMode ? "dark-mode" : ""}`}>
      <h1 className="welcome-text" style={{color:darkMode?"white":""}}>Welcome back, Vincent 👋</h1>
      <div className="header-icons">
        <FontAwesomeIcon icon={faMagnifyingGlass} className="icon" />
        <div className="calendar-container">
          <FontAwesomeIcon
            icon={faCalendarDays}
            className="icon calendar-icon"
            onClick={() => setShowDatePicker(!showDatePicker)} // Toggle DatePicker
          />
          {showDatePicker && (
            <div className="datepicker-popup">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd MMM yyyy"
                inline
              />
            </div>
          )}
          {selectedDate && (
            <span className="selected-date">
              {selectedDate.toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
              })}
            </span>
          )}
        </div>
        <FontAwesomeIcon icon={faBell} className="icon" />
      </div>
    </div>
  );
};

export default Header;
