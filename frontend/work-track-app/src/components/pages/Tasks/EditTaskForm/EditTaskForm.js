// ADMIN EDIT TASK

import React, { useState } from "react";
import { VscClose } from "react-icons/vsc";
import { useTranslation } from "react-i18next";
import axios from "axios";

import CustomButtons from "../../../atoms/Buttons/CustomButtons";

import "./EditTaskForm.css";

const EditTaskForm = ({ task, setTasks }) => {
  const { t } = useTranslation();
  const [isModalEditTaskOpen, setIsModalEditTaskOpen] = useState(false);

  const openEditTaskModal = () => {
    setIsModalEditTaskOpen(true);
  };

  const closeEditTaskModal = () => {
    setIsModalEditTaskOpen(false);
  };
  const taskFormaInfo = {
    t_name: task?.task_name,
    t_details: task?.task_details,
    t_status: task?.task_status,
  };
  const [taskForm, setTaskForm] = useState(taskFormaInfo);
  const { t_name, t_details, t_status, id } = taskForm;

  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;
    setTaskForm({
      ...taskForm,
      [name]: value,
    });
  };
  const handleTaskForm = async () => {
    const { data } = await axios.put("http://localhost:5000/admin/tasks/edit", {
      id: task?.id_task,
      t_name,
      t_details,
      t_status,
    });
    console.log(data);

    setTasks((prevTasks) => {
      return prevTasks.map((tas) =>
        tas.id_task === data.id_task ? data : tas
      );
    });
    setIsModalEditTaskOpen(false);
  };
  return (
    <>
      <CustomButtons
        text={t("edit_task")}
        variant="save"
        onClick={openEditTaskModal}
        style={{
          borderRadius: "0px",
          width: "180px",
        }}
      />
      {isModalEditTaskOpen && (
        <div className="modal_edit_task_form">
          <div className="modal_edit_task_content">
            <span className="close" onClick={closeEditTaskModal}>
              <VscClose />
            </span>
            <label>
              {t("edit_task_name")}
              <input
                type="text"
                name="t_name"
                onChange={handleTaskFormChange}
                defaultValue={task?.task_name}
              />
            </label>
            <label>
              {t("edit_task_description")}
              <input
                type="text"
                name="t_details"
                onChange={handleTaskFormChange}
                defaultValue={task?.task_details}
              />
            </label>
            <label>
              {t("edit_task_status")}
              <select
                name="t_status"
                onChange={handleTaskFormChange}
                defaultValue={task?.task_status}
                className="custom-select"
              >
                <option value="TODO">TODO</option>
                <option value="In Progress">In Progress</option>
                <option value="In Review">In Review</option>
                <option value="Done">Done</option>
              </select>
            </label>
            <CustomButtons
              text={t("save")}
              variant="save"
              onClick={handleTaskForm}
              style={{ marginTop: "10px", marginLeft: "150px" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EditTaskForm;
