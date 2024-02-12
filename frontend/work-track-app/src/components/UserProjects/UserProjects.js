import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import Header from "../organisms/Header/Header";
import SideBarMenu from "../pages/SideBarMenu/SideBarMenu";
import Footer from "../organisms/Footer/Footer";
import AddProjectForma from "../pages/Projects/AddProjectForma/AddProjectForma";
import AddWorkerProjects from "../pages/WorkerProjects/AddWorkerProjects/AddWorkerProjects";

import "./UserProjects.css";

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

const UserProjects = () => {
  const { t } = useTranslation();
  const [userProjects, setUserProjects] = useState([]);
  const [projects, setProjects] = useState([]);
  const [workersProjects, setWorkersProjects] = useState([]);

  const korisnik = JSON.parse(localStorage.getItem("korisnik"));
  const idKorisnik = korisnik.id_worker;
  const isMenadzer = korisnik.worker_status == "Menadzer" ? true : false;

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/projects")
      .then((projects) => setProjects(projects.data))
      .catch((err) => console.log(err));
  }, []);

  const handleUserProjects = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/user/userProjects/all",
      {
        params: {
          id_worker: idKorisnik,
        },
      }
    );
    setUserProjects(data);
  };

  const handleWorkersProjects = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/admin/workersProjects"
    );
    setWorkersProjects(data);
  };

  useEffect(() => {
    handleWorkersProjects();
  }, []);

  useEffect(() => {
    handleUserProjects();
  }, []);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return dateObject.toLocaleDateString("hr-HR", options);
  };

  const projectTable = (projectList) => (
    <table className="table_projects">
      <thead className="user_table_head_projects">
        <tr className="table_row_projects">
          <th className="user_table_header_projects">{t("id_project")}</th>
          <th className="user_table_header_projects">{t("name_project")}</th>
          <th className="user_table_header_projects">{t("details_project")}</th>
          <th className="user_table_header_projects">{t("start_date")}</th>
          <th className="user_table_header_projects">{t("end_date")}</th>
          <th className="user_table_header_projects">{t("status")}</th>
        </tr>
      </thead>
      <tbody>
        {projectList.map((userProject) => (
          <tr key={userProject.id_project}>
            <td className="table_data_user">{userProject.id_project} </td>
            <td className="table_data_user">{userProject.project_name} </td>
            <td className="table_data_user">{userProject.project_details}</td>
            <td className="table_data_user">
              {formatDate(userProject.project_start)}{" "}
            </td>
            <td className="table_data_user">
              {formatDate(userProject.project_end)}{" "}
            </td>
            <td
              className={`table_data_user ${getStatusColor(
                userProject.project_status
              )}`}
            >
              {userProject.project_status}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      <Header />
      <div className="main_user_projects_container_1">
        <SideBarMenu />
        <div className="content_projects_container">
          {isMenadzer && (
            <>
              <h1> {t("all_projects")} </h1>
              <div className="add_forma_project_container">
                <AddProjectForma
                  projects={projects}
                  setProjects={setProjects}
                  className="add_forma_project"
                />
              </div>

              {projectTable(projects)}
              <br />
              <div className="add_forma_project_container">
                <AddWorkerProjects setWorkersProjects={setWorkersProjects} />
              </div>

              <br />
            </>
          )}
          <h1> {t("my_projects")} </h1>

          {projectTable(userProjects)}
          <br />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UserProjects;
