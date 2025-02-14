import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight, faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import useDarkModeStore from "../../utils/useDarkModeStore";
import './Sidebar.css'
const Sidebar = () => {
  const { darkMode, toggleDarkMode } = useDarkModeStore();
  const [isOpen, setIsOpen] = useState(true); // Sidebar state

  useEffect(() => {
    document.body.className = darkMode ? "bg-gray-900 text-white" : "bg-white text-black";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const projects = ["Design system", "User flow", "UX research"];
  const tasks = ["All tasks (11)", "To do (4)", "In progress (4)", "Done (3)"];

  return (
    <div className="sidebar-container">
      {/* Sidebar Panel */}
      <div className={`sidebar ${isOpen ? "open" : "closed"} ${darkMode ? "dark" : "light"}`}>
        <h1 className="title">Projects</h1>
        <ul>
          {projects.map((project, index) => (
            <li key={index}>{project}</li>
          ))}
        </ul>

        <h2 className="title">Tasks</h2>
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>{task}</li>
          ))}
        </ul>

        {/* Theme Toggle */}
        <div className="theme-toggle" onClick={toggleDarkMode}>
          <FontAwesomeIcon icon={darkMode ? faMoon : faSun} />
          <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
        </div>
      </div>

      {/* Sidebar Toggle Button */}
      <button className="sidebar-toggle-btn" onClick={() => setIsOpen(!isOpen)}>
        <FontAwesomeIcon icon={isOpen ? faAngleLeft : faAngleRight} />
      </button>
    </div>
  );
};

export default Sidebar;
