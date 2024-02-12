// ADMIN WORKER-PROJECT ADD FORM

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { VscClose } from "react-icons/vsc";
import axios from "axios";

import CustomButtons from "../../../atoms/Buttons/CustomButtons";

const AddWorkerProjects = ({ workerProjects, setWorkersProjects }) => {
  const { t } = useTranslation();
  const [porukaWorkersProject, setPorukaWorkersProject] = useState("");
  const [isModalFormOpen, setIsModalFormOpen] = useState(false);
  const [projects, setProjects] = useState([]);
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/projects")
      .then((projects) => setProjects(projects.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/workers")
      .then((workers) => setWorkers(workers.data))
      .catch((err) => console.log(err));
  }, []);

  const workerProjectFormInfo = {
    id_worker: workers.length > 0 ? workers[0].id_project : "",
    id_project: projects.length > 0 ? projects[0].id_project : "",
  };

  const [workerProjectForm, setWorkerProjectForm] = useState(
    workerProjectFormInfo
  );

  const { id_worker, id_project } = workerProjectForm;

  const handleWorkerProjectForm = async () => {
    const { data } = await axios.post(
      "http://localhost:5000/admin/workersProjects/add",
      {
        id_worker,
        id_project,
      }
    );
    setWorkersProjects((workerProjects) => [
      ...workerProjects,
      data.newWorkerProject,
    ]);

    setPorukaWorkersProject(data.porukaWorkerProject);
    setIsModalFormOpen(false);
  };

  const handleWorkerProjectFormChange = (e) => {
    const { name, value } = e.target;
    setWorkerProjectForm({
      ...workerProjectForm,
      [name]: value,
    });
  };

  const openFormModal = () => {
    setIsModalFormOpen(true);
  };

  const closeFormModal = () => {
    setIsModalFormOpen(false);
  };

  return (
    <>
      <CustomButtons
        text={t("add_worker_project")}
        variant="default"
        onClick={openFormModal}
        style={{
          borderRadius: "0px",
          width: "250px",
          height: "50px",
          marginLeft: "20%",
        }}
      />

      {isModalFormOpen && (
        <div className="modal_form">
          <div className="modal_contant">
            <span className="close" onClick={closeFormModal}>
              <VscClose />
            </span>
            <label>
              {t("worker_name_1")}
              <select
                name="id_worker"
                onChange={handleWorkerProjectFormChange}
                className="custom-select"
                defaultValue=""
              >
                <option value="" disabled>
                  {t("select_worker")}
                </option>

                {workers.map((worker) => (
                  <option
                    value={worker.id_worker}
                    key={worker.id_worker}
                    defaultValue=""
                  >
                    {worker.worker_name}
                  </option>
                ))}
              </select>
            </label>

            <label>
              {t("project_name")}
              <select
                name="id_project"
                onChange={handleWorkerProjectFormChange}
                className="custom-select"
                defaultValue=""
              >
                <option value="" disabled>
                  {t("select_project")}
                </option>

                {projects.map((project) => (
                  <option
                    value={project.id_project}
                    key={project.id_project}
                    defaultValue=""
                  >
                    {project.project_name}
                  </option>
                ))}
              </select>
            </label>

            <CustomButtons
              text={t("save")}
              variant="save"
              onClick={handleWorkerProjectForm}
              style={{ marginTop: "10px", marginLeft: "10px" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AddWorkerProjects;
