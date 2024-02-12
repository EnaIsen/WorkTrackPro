// ADMIN Worker Projects

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import CustomButtons from "../../atoms/Buttons/CustomButtons";
import AddWorkerProjects from "./AddWorkerProjects/AddWorkerProjects";

import "./WorkerProjects.css";

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

const WorkerProjects = () => {
  const { t } = useTranslation();
  const [workersProjects, setWorkersProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/workersProjects")
      .then((workersProjects) => setWorkersProjects(workersProjects.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteWorkersProjects = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/admin/workersProjects/delete/${id}`
      );
      const updateWorkersProjects = workersProjects.filter(
        (workersProjects) => workersProjects.id_rp !== id
      );
      setWorkersProjects(updateWorkersProjects);
    } catch (error) {
      console.log("Radnik sa projekta nije izbrisan: ", error);
    }
  };

  return (
    <>
      <div className="table-container">
        <h1> {t("worker_projects_heading")} </h1>
        <table className="table_projects">
          <thead className="table_head_projects">
            <tr>
              <th className="table_header_projects"> {t("id")} </th>
              <th className="table_header_projects"> {t("worker_name_1")} </th>
              <th className="table_header_projects">
                {" "}
                {t("worker_lastname_1")}
              </th>
              <th className="table_header_projects"> {t("project_name")} </th>
              <th className="table_header_projects"> {t("project_status")} </th>
            </tr>
          </thead>
          <tbody>
            {workersProjects.map((workerProject) => (
              <tr key={workerProject.id_rp}>
                <td className="table_data">{workerProject.id_rp}</td>
                <td className="table_data">{workerProject.worker_name}</td>
                <td className="table_data">{workerProject.worker_lastname}</td>
                <td className="table_data">{workerProject.project_name}</td>
                <td
                  className={`table_data ${getStatusColor(
                    workerProject.project_status
                  )}`}
                >
                  {workerProject.project_status}
                </td>
                <td>
                  <CustomButtons
                    onClick={() => deleteWorkersProjects(workerProject.id_rp)}
                    text={t("delete")}
                    variant="delete"
                    style={{
                      borderRadius: "0px",
                      width: "80px",
                      marginLeft: "20px",
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="worker_project_forma_container">
        <div className="form_container_4">
          <AddWorkerProjects setWorkersProjects={setWorkersProjects} />
        </div>
      </div>
    </>
  );
};

export default WorkerProjects;
