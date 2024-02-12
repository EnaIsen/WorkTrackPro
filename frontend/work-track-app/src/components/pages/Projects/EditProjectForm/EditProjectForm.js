// ADMIN EDIT PROJECT FORM

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { VscClose } from "react-icons/vsc";
import axios from "axios";

import CustomButtons from "../../../atoms/Buttons/CustomButtons";

import "./EditProjectForm.css";

const EditProjectForm = ({ project, setProjects }) => {
  const { t } = useTranslation();
  const [isModalEditProjectOpen, setIsModalEditProjectOpen] = useState(false);

  const openEditProjectModal = () => {
    setIsModalEditProjectOpen(true);
  };

  const closeEditProjectModal = () => {
    setIsModalEditProjectOpen(false);
  };

  const projectFormaInfo = {
    p_name: project.project_name,
    p_details: project.project_details,
    p_start: project.project_start,
    p_end: project.project_end,
    p_status: project.project_status,
  };

  const [projectForm, setProjectForm] = useState(projectFormaInfo);
  const { p_name, p_details, p_start, p_end, p_status } = projectForm;

  const handleProjectFormChange = (e) => {
    const { name, value } = e.target;
    setProjectForm({
      ...projectForm,
      [name]: value,
    });
  };

  const handleProjectForm = async () => {
    const { data } = await axios.put(
      "http://localhost:5000/admin/projects/edit",
      {
        id: project.id_project,
        p_name,
        p_details,
        p_start,
        p_end,
        p_status,
      }
    );

    setProjects((prevProjects) => {
      return prevProjects.map((proj) =>
        proj.id_project === data.id_project ? data : proj
      );
    });
    setIsModalEditProjectOpen(false);
  };

  return (
    <>
      <CustomButtons
        text={t("edit_project")}
        variant="save"
        onClick={openEditProjectModal}
        style={{
          borderRadius: "0px",
          width: "180px",
        }}
      />
      {isModalEditProjectOpen && (
        <div className="modal_edit_project_form">
          <div className="modal_edit_project_content">
            <span className="close" onClick={closeEditProjectModal}>
              <VscClose />
            </span>
            <label>
              {t("edit_project_name")}
              <input
                type="text"
                name="p_name"
                onChange={handleProjectFormChange}
                defaultValue={project.project_name}
              />
            </label>
            <label>
              {t("edit_project_description")}
              <input
                type="text"
                name="p_details"
                onChange={handleProjectFormChange}
                defaultValue={project.project_details}
              />
            </label>
            <label>
              {t("edit_start_date")}
              <input
                type="date"
                name="p_start"
                onChange={handleProjectFormChange}
                defaultValue={project.project_start}
              />
            </label>
            <label>
              {t("edit_end_date")}
              <input
                type="date"
                name="p_end"
                onChange={handleProjectFormChange}
                defaultValue={project.project_end}
              />
            </label>
            <label>
              {t("edit_project_status")}
              <select
                name="p_status"
                onChange={handleProjectFormChange}
                defaultValue={project.project_status}
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
              onClick={handleProjectForm}
              style={{ marginTop: "10px", marginLeft: "10px" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EditProjectForm;
