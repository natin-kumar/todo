import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus
} from "@fortawesome/free-solid-svg-icons";
import TaskCard from "../TaskCard/TaskCard";
const TaskBoard = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 w-full max-w-md flex flex-col space-y-4">
      {/*header */}
      <div >
        <div className="flex justify-between items-center text-gray-500 text-sm mb-2">
            <span>In Progress (4)</span>
          <div className=" flex items-center gap-2 text-gray-400 hover:text-gray-800 cursor-pointer">
            <FontAwesomeIcon icon={faCirclePlus}
            className="text-gray-600"/>
            <span className="font-medium text-gray-600">Add New Task</span>
          </div>
        </div>
      </div>
      {/* <div className=""> */}
      <TaskCard/>
      <TaskCard/>
      <TaskCard/>
      {/* </div> */}
    </div>
  );
};
export default TaskBoard;