// ADMIN EDIT WORKER FORM

import React, { useState } from "react";
import { VscClose } from "react-icons/vsc";
import { useTranslation } from "react-i18next";
import axios from "axios";

import CustomButtons from "../../../atoms/Buttons/CustomButtons";

import "./EditWorkerForm.css";

const EditWorkerForm = ({ worker, setWorkers }) => {
  const { t } = useTranslation();
  const [isModalEditWorkerOpen, setIsModalEditWorkerOpen] = useState(false);

  const openEditWorkerModal = () => {
    setIsModalEditWorkerOpen(true);
  };

  const closeEditWorkerModal = () => {
    setIsModalEditWorkerOpen(false);
  };

  const workerFormaInfo = {
    w_name: worker.worker_name,
    w_lastname: worker.worker_lastname,
    w_email: worker.worker_email,
  };

  const [workerForm, setWorkerForm] = useState(workerFormaInfo);
  const { w_name, w_lastname, w_email } = workerForm;

  const handleWorkerFormChange = (e) => {
    const { name, value } = e.target;
    setWorkerForm({
      ...workerForm,
      [name]: value,
    });
  };

  const handleWorkerForm = async () => {
    const { data } = await axios.put(
      "http://localhost:5000/admin/workers/edit",
      {
        id: worker.id_worker,
        w_name,
        w_lastname,
        w_email,
      }
    );
    setWorkers((prevWorkers) => {
      return prevWorkers.map((work) =>
        work.id_worker === data.id_worker ? data : work
      );
    });
    setIsModalEditWorkerOpen(false);
  };

  return (
    <>
      <CustomButtons
        text={t("edit_worker")}
        variant="save"
        onClick={openEditWorkerModal}
        style={{
          borderRadius: "0px",
          width: "180px",
        }}
      />
      {isModalEditWorkerOpen && (
        <div className="modal_edit_worker_form">
          <div className="modal_edit_worker_content">
            <span className="close" onClick={closeEditWorkerModal}>
              <VscClose />
            </span>
            <label>
              {t("edit_worker_name")}
              <input
                type="text"
                name="w_name"
                onChange={handleWorkerFormChange}
                defaultValue={worker.worker_name}
              />
            </label>
            <label>
              {t("edit_worker_lastname")}
              <input
                type="text"
                name="w_lastname"
                onChange={handleWorkerFormChange}
                defaultValue={worker.worker_lastname}
              />
            </label>
            <label>
              {t("edit_worker_email")}
              <input
                type="text"
                name="w_email"
                onChange={handleWorkerFormChange}
                defaultValue={worker.worker_email}
              />
            </label>
            <CustomButtons
              text={t("save")}
              variant="save"
              onClick={handleWorkerForm}
              style={{ marginTop: "10px", marginLeft: "10px" }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default EditWorkerForm;
