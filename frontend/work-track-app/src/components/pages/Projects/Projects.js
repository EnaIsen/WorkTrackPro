// ADMIN PROJECTS

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import AdminHeader from "../../organisms/AdminHeader/AdminHeader";
import CustomButtons from "../../atoms/Buttons/CustomButtons";
import AddProjectForma from "./AddProjectForma/AddProjectForma";
import EditProjectForm from "./EditProjectForm/EditProjectForm";
import WorkerProjects from "../WorkerProjects/WorkerProjects";

import "./Projects.css";

// pomoćna funkcija za određivanje boje statusa na projektu
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

const Projects = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);

  // dobavljanje podataka oo projektima sa servera.
  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/projects")
      .then((projects) => setProjects(projects.data))
      .catch((err) => console.log(err));
  }, []);

  // pomoćna funkcija za formatiranje datuma
  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return dateObject.toLocaleDateString("hr-HR", options);
  };

  // pomoćna funkcija za brisanje projekata
  const deleteProject = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/projects/delete/${id}`);
      const updateProjects = projects.filter(
        (projects) => projects.id_project !== id
      );
      setProjects(updateProjects);
    } catch (error) {
      console.log("Projekat nije izbrisan: ", error);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="table-container">
        <h1> {t("projects_heading")} </h1>
        <table className="table_projects">
          <thead className="table_head_projects">
            <tr className="table_row_projects">
              <th className="table_header_projects">{t("id_project")}</th>
              <th className="table_header_projects">{t("project_name")}</th>
              <th className="table_header_projects">
                {t("project_description")}
              </th>
              <th className="table_header_projects">{t("start_date")}</th>
              <th className="table_header_projects">{t("end_date")}</th>
              <th className="table_header_projects"> {t("project_status")} </th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id_project}>
                <td className="table_data">{project.id_project}</td>
                <td className="table_data">{project.project_name}</td>
                <td className="table_data">{project.project_details}</td>
                <td className="table_data">
                  {formatDate(project.project_start)}
                </td>
                <td className="table_data">
                  {formatDate(project.project_end)}
                </td>
                <td
                  className={`table_data ${getStatusColor(
                    project.project_status
                  )}`}
                >
                  {project.project_status}
                </td>
                <td>
                  <CustomButtons
                    onClick={() => deleteProject(project.id_project)}
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
                  <EditProjectForm
                    project={project}
                    setProjects={setProjects}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="project_forma_container">
        <div className="form_container_2">
          <AddProjectForma setProjects={setProjects} />
        </div>
      </div>
      <div className="project_forma_container">
        <div>
          <WorkerProjects />
        </div>
      </div>
    </>
  );
};

export default Projects;
