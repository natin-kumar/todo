import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus,
  faAngleDown,
  faAngleUp,
  faSun,
  faMoon,
} from "@fortawesome/free-solid-svg-icons";

const SubList = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="mb-4">
      <div
        className="flex items-center justify-between cursor-pointer mb-2"
        onClick={toggleOpen}
      >
        <span className="font-semibold">{title}</span>
        <FontAwesomeIcon icon={isOpen ? faAngleUp : faAngleDown} />
      </div>
      {isOpen && (
        <ul className="pl-4 space-y-1">
          {items.map((item, index) => (
            <li key={index} className="hover:bg-gray-100 p-1 rounded">
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const Sidebar = () => {
  const [openTasks, setOpenTasks] = useState(true);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    document.body.className = darkMode ? "bg-gray-900 text-white" : "bg-white text-black";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  const projects = ["Design system", "User flow", "UX research"];
  const tasks = ["To do (4)", "In progress (4)", "Done (3)"];

  return (
    <div className={`w-64 p-4 shadow-lg h-screen ${darkMode ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      <h1 className="text-xl font-bold mb-4">Projects</h1>
      <SubList title="All projects (3)" items={projects} />

      <div className="mb-4">
        <div
          onClick={() => setOpenTasks(!openTasks)}
          className="flex items-center justify-between cursor-pointer"
        >
          <span className="font-semibold">Tasks</span>
          <FontAwesomeIcon icon={openTasks ? faAngleUp : faAngleDown} />
        </div>
        {openTasks && <SubList title="All tasks (11)" items={tasks} />}
      </div>

      {/* Theme Toggle */}
      <div className="mt-6">
        <div
          className="flex items-center space-x-2 mb-2 cursor-pointer"
          onClick={toggleTheme}
        >
          <FontAwesomeIcon icon={darkMode ? faMoon : faSun} />
          <span>{darkMode ? "Dark Mode" : "Light Mode"}</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
