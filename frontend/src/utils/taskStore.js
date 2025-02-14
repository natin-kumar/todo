import { create } from "zustand";
import todoData from "../mockData/todoCardData.json"
// Load initial data from localStorage OR fallback to JSON
const getInitialTasks = () => {
  const storedTasks = localStorage.getItem("tasks");
  return storedTasks ? JSON.parse(storedTasks) : todoData;
};
console.log(getInitialTasks(),"taskslog");
const useTaskStore = create((set) => ({
  tasks: getInitialTasks(), // Load tasks

  moveTask: (taskId, newStatus) =>
    set((state) => {
      const updatedTasks = state.tasks.map((task) =>
        task.taskId === taskId ? { ...task, status: newStatus } : task
      );
      
      localStorage.setItem("tasks", JSON.stringify(updatedTasks)); // Save to localStorage

      return { tasks: updatedTasks };
    }),
}));

export default useTaskStore;
