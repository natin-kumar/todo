import React from "react";
import { useDrag } from 'react-dnd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEllipsisH,
  faList,
  faMessage,
  faPaperclip,
} from "@fortawesome/free-solid-svg-icons";
import "./TaskCard.css"
import useDarkModeStore from "../../utils/useDarkModeStore";
const TaskCard = ({props}) => {
  console.log(props)
  const {date,description,progress,status,subtask,taskId,title,user}=props;
  const [{ isDragging }, dragRef] = useDrag(() => ({
    type: 'Task',
    item: { id:taskId,fromStatus:status },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));
  console.log(isDragging,"dragging")
  const { darkMode } = useDarkModeStore();

  return (
    // {<div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 w-full max-w-md">
    //   {/* Header */}
    //   <div className="flex justify-between items-start mb-4">
    //     <div>
    //       <h3 className="text-lg font-semibold text-gray-800">
    //         Create brand guideline
    //       </h3>
    //       <p className="text-sm text-gray-500">Oreo branding project</p>
    //     </div>
    //     <FontAwesomeIcon
    //       icon={faEllipsisH}
    //       className="text-gray-400 hover:text-gray-600 cursor-pointer"
    //     />
    //   </div>

    //   {/* Progress Section */}
    //   <div className="mb-4">
    //     <div className="flex justify-between items-center text-gray-500 text-sm mb-2">
    //       <div className="flex items-center gap-2">
    //         <FontAwesomeIcon icon={faList} />
    //         <span>Progress</span>
    //       </div>
    //       <span className="font-medium text-gray-800">7/10</span>
    //     </div>
    //     <div className="w-full bg-gray-200 h-2 rounded-full">
    //       <div
    //         className="bg-orange-500 h-2 rounded-full"
    //         style={{ width: "70%" }}
    //       ></div>
    //     </div>
    //   </div>

    //   {/* Date Section */}

    //   {/* Footer */}
    //   <div className="flex justify-between items-center text-gray-500 text-sm">
    //     <div className="flex items-center gap-2">
    //       <span className="bg-gray-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full">
    //         13 Nov 2022
    //       </span>
    //     </div>
    //     <div className="flex gap-2">
    //       <div className="flex items-center gap-2">
    //         <FontAwesomeIcon
    //           icon={faMessage}
    //           className=" hover:text-gray-600 cursor-pointer"
    //         />
    //         <span>2</span>
    //       </div>
    //       <div className="flex items-center gap-2">
    //         <FontAwesomeIcon
    //           icon={faPaperclip}
    //           className=" hover:text-gray-600 cursor-pointer"
    //         />
    //         <span>13</span>
    //       </div>
    //     </div>
    //   </div>
    // </div>}
    <div className={`task-card ${darkMode ? "dark-mode" : ""}`} ref={dragRef} style={{ opacity: isDragging ? 0.5 : 1 }}>
  <div className="task-card-header">
    <div>
      <h3 className={`task-card-title ${darkMode ? "dark-mode" : ""}`}>{title}</h3>
      <p className={`task-card-subtitle ${darkMode ? "dark-mode" : ""}`}>{description}</p>
    </div>
    <FontAwesomeIcon icon={faEllipsisH} className="task-card-icon" />
  </div>

  <div className="progress-section">
    <div className="progress-details">
      <div>
        <FontAwesomeIcon icon={faList} />
        <span>Progress</span>
      </div>
      <span className="progress-value">{progress}/10</span>
    </div>
    <div className="progress-bar">
      <div className="progress-bar-fill" style={{ width: `${progress * 10}%`,backgroundColor: progress === 10 ? "green" :""  }} ></div>
    </div>
  </div>

  <div className="task-card-footer">
    <div className={`date-badge ${darkMode ? "dark-mode" : ""}`}>{date}</div>
    <div className="icon-group">
      <div className="icon-item">
        <FontAwesomeIcon icon={faMessage} />
        <span>2</span>
      </div>
      <div className="icon-item">
        <FontAwesomeIcon icon={faPaperclip} />
        <span>13</span>
      </div>
    </div>
  </div>
</div>

  );
};

export default TaskCard;
