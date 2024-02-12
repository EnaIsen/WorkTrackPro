// ADMIN TASKS

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import AdminHeader from "../../organisms/AdminHeader/AdminHeader";
import CustomButtons from "../../atoms/Buttons/CustomButtons";
import EditTaskForm from "./EditTaskForm/EditTaskForm";
import AddTaskForm from "./AddTaskForm/AddTaskForm";

const getStatusColor = (status) => {
  switch (status) {
    case "TODO":
      return "status-todo";
    case "In Progress":
      return "status-in-progress";
    case "DONE":
      return "status-done";
    case "In Review":
      return "status-in-review";
    default:
      return "";
  }
};

const Tasks = () => {
  const { t } = useTranslation();
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/tasks")
      .then((tasks) => setTasks(tasks.data))
      .catch((err) => console.log(err));
  }, [setTasks]);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/tasks/delete/${id}`);
      const updateTask = tasks.filter((tasks) => tasks.id_task !== id);
      setTasks(updateTask);
    } catch (error) {
      console.log("Zadatak nije izbrisan!", error);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="table-container">
        <h1> {t("tasks_heading")} </h1>
        <table className="table_projects">
          <thead className="table_head_projects">
            <tr className="table_row_projects">
              <th className="table_header_projects">{t("id_task")}</th>
              <th className="table_header_projects">{t("task_name")}</th>
              <th className="table_header_projects">{t("task_description")}</th>
              <th className="table_header_projects">{t("task_status")}</th>
              <th className="table_header_projects">{t("project_name")}</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task?.id_task}>
                <td className="table_data">{task?.id_task}</td>
                <td className="table_data">{task?.task_name}</td>
                <td className="table_data">{task?.task_details}</td>
                <td
                  className={`table_data ${getStatusColor(task?.task_status)}`}
                >
                  {task?.task_status}
                </td>
                <td className="table_data">{task?.project_name}</td>
                <td>
                  <CustomButtons
                    onClick={() => deleteTask(task?.id_task)}
                    text={t("delete")}
                    variant="delete"
                    style={{
                      borderRadius: "0px",
                      width: "80px",
                      marginLeft: "20px",
                    }}
                  />
                </td>
                <td>
                  <EditTaskForm task={task} setTasks={setTasks} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="task_forma_container">
        <div className="form_container_3">
          <AddTaskForm setTasks={setTasks} />
        </div>
      </div>
    </>
  );
};

export default Tasks;
