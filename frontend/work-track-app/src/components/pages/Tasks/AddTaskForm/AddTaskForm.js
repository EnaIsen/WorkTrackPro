// ADMIN ADD TASK

import React, { useEffect, useState } from "react";
import { VscClose } from "react-icons/vsc";
import { useTranslation } from "react-i18next";
import axios from "axios";

import CustomButtons from "../../../atoms/Buttons/CustomButtons";

const AddTaskForma = ({ tasks, setTasks }) => {
  const { t } = useTranslation();
  const [porukaTask, setPorukaTask] = useState("");
  const [isModalFormOpen, setIsModalFormOpen] = useState(false);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/projects")
      .then((projects) => setProjects(projects.data))
      .catch((err) => console.log(err));
  }, []);

  const taskFormInfo = {
    t_name: "",
    t_details: "",
    t_status: "TODO",
    id: projects.length > 0 ? projects[0].id_project : "",
  };
  const [taskForm, setTaskForm] = useState(taskFormInfo);

  const { t_name, t_details, t_status, id } = taskForm;

  const handleTaskForm = async () => {
    const { data } = await axios.post("http://localhost:5000/admin/tasks/add", {
      t_name,
      t_details,
      t_status,
      id,
    });
    setTasks((tasks) => [...tasks, data.newTask]);
    setPorukaTask(data.porukaTask);
    setIsModalFormOpen(false);
  };

  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;
    setTaskForm({
      ...taskForm,
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
        text={t("add_new_task")}
        variant="default"
        onClick={openFormModal}
        className="button_add_task_admin"
        style={{
          borderRadius: "0px",
          width: "250px",
          height: "50px",
        }}
      />

      {isModalFormOpen && (
        <div className="modal_form">
          <div className="modal_contant">
            <span className="close" onClick={closeFormModal}>
              <VscClose />
            </span>
            <label>
              {t("task_name")}
              <input
                type="text"
                name="t_name"
                onChange={handleTaskFormChange}
              />
            </label>
            <label>
              {t("task_description")}
              <input
                type="text"
                name="t_details"
                onChange={handleTaskFormChange}
              />
            </label>
            <label>
              {t("task_status")}
              <select
                name="t_status"
                onChange={handleTaskFormChange}
                className="custom-select"
              >
                <option value="TODO">TODO</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="DONE">DONE</option>
              </select>
            </label>
            <label>
              {t("project_name")}
              <select
                name="id"
                onChange={handleTaskFormChange}
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
              onClick={handleTaskForm}
              style={{ marginTop: "10px", marginLeft: "10px" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AddTaskForma;
