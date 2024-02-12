import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import Header from "../../organisms/Header/Header";
import SideBarMenu from "../SideBarMenu/SideBarMenu";
import Footer from "../../organisms/Footer/Footer";
import AddTaskForma from "../Tasks/AddTaskForm/AddTaskForm";

import "./UserTasks.css";

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

const UserTasks = () => {
  const { t } = useTranslation();
  const [userTasks, setUserTasks] = useState([]);
  const [tasks, setTasks] = useState([]);

  const korisnik = JSON.parse(localStorage.getItem("korisnik"));
  const idKorisnik = korisnik.id_worker;
  const isMenadzer = korisnik.worker_status == "Menadzer" ? true : false;

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/tasks")
      .then((tasks) => setTasks(tasks.data))
      .catch((err) => console.log(err));
  }, []);

  console.log(userTasks, "userTask");

  const handleUserTasks = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/user/userTasks/all",
      {
        params: {
          id_worker: idKorisnik,
        },
      }
    );
    setUserTasks(data);
  };

  useEffect(() => {
    handleUserTasks();
  }, []);

  console.log(userTasks, "userTask");

  const taskTable = (taskList) => (
    <table className="table_projects">
      <thead className="user_table_head_projects">
        <tr className="table_row_projects">
          <th className="user_table_header_projects"> {t("id_task")} </th>
          <th className="user_table_header_projects"> {t("name_task")} </th>
          <th className="user_table_header_projects"> {t("details_task")} </th>
          <th className="user_table_header_projects">{t("status_task")}</th>
          <th className="user_table_header_projects"> {t("name_project")} </th>
        </tr>
      </thead>
      <tbody>
        {taskList.map((userTask) => (
          <tr kex={userTask.id_task}>
            <td className="table_data_user"> {userTask.id_task} </td>
            <td className="table_data_user"> {userTask.task_name} </td>
            <td className="table_data_user"> {userTask.task_details} </td>
            <td
              className={`table_data_user ${getStatusColor(
                userTask.task_status
              )}`}
            >
              {userTask.task_status}
            </td>
            <td className="table_data_user"> {userTask.project_name} </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <Header />
      <div className="main_user_projects_container_2">
        <SideBarMenu />
        <div className="content_projects_container">
          {isMenadzer && (
            <>
              <h1> {t("all_tasks")} </h1>
              <div className="tasks_add_form_container">
                <AddTaskForma tasks={tasks} setTasks={setTasks} />
              </div>
              {taskTable(tasks)}

              <br />
            </>
          )}
          <h1> {t("my_tasks")}</h1>

          {taskTable(userTasks)}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserTasks;
