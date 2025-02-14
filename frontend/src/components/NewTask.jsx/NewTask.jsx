import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faX
} from "@fortawesome/free-solid-svg-icons";
import { v4 as uuidv4 } from 'uuid';
import "./NewTask.css";
import useDarkModeStore from "../../utils/useDarkModeStore";

const NewTask = ({props,fun}) => {
    console.log(props,fun,"newtasksComp");
    const schema = Yup.object().shape({
        taskId: Yup.string().required(),
        title: Yup.string().required("Title is required"),
        description: Yup.string().required("Description is required"),
        status: Yup.string().oneOf(["Todo", "In-Progress", "Done"], "Invalid status").required(),
        subtask: Yup.number()
          .typeError("Subtask must be a number")
          .min(1, "At least 1 subtask required")
          .required("Subtask is required"),
        progress: Yup.number()
          .typeError("Progress must be a number")
          .min(0, "Minimum progress is 0")
          .max(10, "Maximum progress is 10")
          .required("Progress is required"),
        date: Yup.date().required("Date is required"),
        userId: Yup.string().required("User ID is required"),
      });
      const { darkMode } = useDarkModeStore();

      const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm({
        resolver: yupResolver(schema),
      });
      const onSubmit = (data) => {
        console.log("Task Submitted:", data);
      };

    return (
        <form className={`new-task-form ${darkMode ? "dark-mode" : ""}`} onSubmit={handleSubmit(onSubmit)}>
            {/* <div className="form-group">
                <label htmlFor="taskId" className="form-label">Task ID: </label>
                <input type="text" id="taskId" className="form-input" readOnly value={uuidv4()} {...register("taskId")} />
        {errors.taskId && <p>{errors.taskId.message}</p>}
            </div> */}
            <div className="form-group" style={{display:"flex"}}>
                <div>
                <label htmlFor="title" className="form-label">Title: </label>
                <input type="text" id="title" className="form-input" {...register("title")} />
                {errors.title && <p>{errors.title.message}</p>}

                </div>
                <FontAwesomeIcon icon={faX} onClick={()=>{
                    fun(false)
                }}/>
            </div>
            <div className="form-group">
                <label htmlFor="desc" className="form-label">Description: </label>
                <input type="text" id="desc" className="form-input" {...register("description")} />
                {errors.description && <p>{errors.description.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="status" className="form-label">Status: </label>
                <select id="status" className="form-input" defaultValue={props.heading} {...register("status")}>
          <option value="Todo">Todo</option>
          <option value="In-Progress">In-Progress</option>
          <option value="Done">Done</option>
        </select>
        {errors.status && <p>{errors.status.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="subtask" className="form-label">Subtask: </label>
                <input type="number" id="subtask" className="form-input" {...register("subtask")} />
        {errors.subtask && <p>{errors.subtask.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="progress" className="form-label">Progress: </label>
                <input type="number" id="progress" className="form-input" min={0} max={10} {...register("progress")} />
        {errors.progress && <p>{errors.progress.message}</p>}
            </div>
            <div className="form-group">
                <label htmlFor="date" className="form-label">Date: </label>
                <input type="date" id="date" className="form-input" {...register("date")} />
        {errors.date && <p>{errors.date.message}</p>}
            </div>
            {/* <div className="form-group">
                <label htmlFor="userId" className="form-label">User ID: </label>
                <input type="text" id="userId" className="form-input"{...register("userId")} />
        {errors.userId && <p>{errors.userId.message}</p>}
            </div> */}
            <button type="submit" className="submit-btn">Submit</button>
        </form>
    );
}

export default NewTask;
