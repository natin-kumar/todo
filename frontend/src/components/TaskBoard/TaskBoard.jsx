import React,{useState} from "react";
import { useDrop } from 'react-dnd';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCirclePlus
} from "@fortawesome/free-solid-svg-icons";
import useDarkModeStore from "../../utils/useDarkModeStore";
import TaskCard from "../TaskCard/TaskCard";
import NewTask from "../NewTask.jsx/NewTask";
import "./TaskBoard.css"
import useTaskStore from "../../utils/taskStore";
const TaskBoard = ({heading}) => {
  
  const { tasks, moveTask } = useTaskStore(); 
  const [droppedItems, setDroppedItems] = useState([]);
  const [newTask,setNewTask]= useState(false);
  const [{ isOver }, dropRef] = useDrop(() => ({
    accept: "Task",
    drop: (draggedItem) => {
      console.log("Dropped Task ID:", draggedItem.id); // Log task ID
      console.log("Dropped to Heading:", heading); // Log the board heading
      moveTask(draggedItem.id, heading); // Move task globally
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  console.log(NewTask);
  const addNewTask=()=>{
      setNewTask(true);
  }
  const { darkMode } = useDarkModeStore();
  console.log(darkMode,"dark")
  console.log(droppedItems,"droppedItems");
  return (
    // <div className="bg-white border border-gray-200 rounded-lg shadow-md p-4 w-full max-w-md flex flex-col space-y-4">
    //   {/*header */}
    //   <div >
    //     <div className="flex justify-between items-center text-gray-500 text-sm mb-2">
    //         <span>In Progress (4)</span>
    //       <div className=" flex items-center gap-2 text-gray-400 hover:text-gray-800 cursor-pointer">
    //         <FontAwesomeIcon icon={faCirclePlus}
    //         className="text-gray-600"/>
    //         <span className="font-medium text-gray-600">Add New Task</span>
    //       </div>
    //     </div>
    //   </div>
    //   {/* <div className=""> */}
    //   <TaskCard/>
    //   <TaskCard/>
    //   <TaskCard/>
    //   {/* </div> */}
    // </div>
    <div
    className={`task-board ${darkMode ? "dark-mode" : ""}`}
    ref={dropRef}
    style={{ backgroundColor: isOver ? "#f0f0f0" : undefined,overflowY:newTask?"hidden":"" }} // Let dark mode control background
  >
    <div className="task-board-header">
      <span>{heading}</span>
      <div className="add-task" onClick={()=>{addNewTask()}}>
        <FontAwesomeIcon icon={faCirclePlus} className="add-icon" />
        <span>Add New Task</span>
      </div>
    </div>
    {newTask&&<NewTask props={heading} fun={setNewTask}/>}
    <div className="task-board-tasks">
      {/* Filter tasks before mapping to avoid unnecessary checks */}
      {tasks.filter((task) => task.status === heading).map((task) => (
          <TaskCard key={task.taskId} props={task} />
        ))}
  
      {droppedItems.map((item, index) => {
        console .log(item,index,"console")
        return   <TaskCard key={index} props={item} />
})}
    </div>
  </div>
  

  );
};
export default TaskBoard;