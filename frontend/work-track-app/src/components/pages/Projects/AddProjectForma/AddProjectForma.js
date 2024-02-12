// ADMIN ADD PROJECT FORM

import React, { useState } from "react";
import { VscClose } from "react-icons/vsc";
import { useTranslation } from "react-i18next";
import axios from "axios";

import CustomButtons from "../../../atoms/Buttons/CustomButtons";

import "./AddProjectForma.css";

const projectFormaInfo = {
  p_name: "",
  p_details: "",
  p_start: "",
  p_end: "",
  p_status: "TODO",
};

const AddProjectForma = ({ projects, setProjects }) => {
  const { t } = useTranslation();
  const [projectForm, setProjectForm] = useState(projectFormaInfo);
  const [porukaForm, setPorukaForm] = useState("");
  const [isModalFormOpen, setIsModalFormOpen] = useState(false);
  const { p_name, p_details, p_start, p_end, p_status } = projectForm;

  const handleProjectForm = async () => {
    const { data } = await axios.post(
      "http://localhost:5000/admin/projects/add",
      {
        p_name,
        p_details,
        p_start,
        p_end,
        p_status,
      }
    );
    setProjects((projects) => [...projects, data.newProject]);
    setPorukaForm(data.porukaForm);
    console.log(data);
    setIsModalFormOpen(false);
  };

  const handleProjectFormChange = (e) => {
    const { name, value } = e.target;
    setProjectForm({
      ...projectForm,
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
        text={t("add_new_project")}
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
              {t("project_name")}
              <input
                type="text"
                name="p_name"
                onChange={handleProjectFormChange}
              />
            </label>
            <label>
              {t("project_description")}
              <input
                type="text"
                name="p_details"
                onChange={handleProjectFormChange}
              />
            </label>
            <label>
              {t("start_date")}
              <input
                type="date"
                name="p_start"
                onChange={handleProjectFormChange}
              />
            </label>
            <label>
              {t("end_date")}
              <input
                type="date"
                name="p_end"
                onChange={handleProjectFormChange}
              />
            </label>
            <label>
              {t("project_status")}
              <select
                name="p_status"
                onChange={handleProjectFormChange}
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

export default AddProjectForma;
