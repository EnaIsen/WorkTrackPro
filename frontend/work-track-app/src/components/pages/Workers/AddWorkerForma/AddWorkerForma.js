// ADMIN ADD WORKER FORM

import React, { useState } from "react";
import { VscClose } from "react-icons/vsc";
import { useTranslation } from "react-i18next";
import axios from "axios";

import CustomButtons from "../../../atoms/Buttons/CustomButtons";

import "./AddWorkerForma.css";

const workerFormaInfo = {
  w_name: "",
  w_lastname: "",
  w_email: "",
};

const AddWorkerForma = ({ workers, setWorkers }) => {
  const { t } = useTranslation();
  const [workerForma, setWorkerForma] = useState(workerFormaInfo);
  const [porukaWorker, setPorukaWorker] = useState("");

  const handleWorkerForm = async () => {
    console.log(w_name, w_lastname, w_email, "aaaa");
    const { data } = await axios.post(
      "http://localhost:5000/admin/workers/add",
      {
        w_name,
        w_lastname,
        w_email,
      }
    );
    setWorkers((workers) => [...workers, data.newWorker]);
    setPorukaWorker(data.porukaWorker);
    setIsModalAddWorkerOpen(false);
  };

  const [isModalAddWorkerOpen, setIsModalAddWorkerOpen] = useState(false);
  const { w_name, w_lastname, w_email } = workerForma;

  const handleWorkerFormChange = (e) => {
    const { name, value } = e.target;
    setWorkerForma({
      ...workerForma,
      [name]: value,
    });
  };

  const openAddWorkerModal = () => {
    setIsModalAddWorkerOpen(true);
  };

  const closeAddWorkerModal = () => {
    setIsModalAddWorkerOpen(false);
  };

  return (
    <>
      <CustomButtons
        text={t("add_new_worker")}
        variant="default"
        onClick={openAddWorkerModal}
        style={{
          borderRadius: "0px",
          width: "250px",
          height: "50px",
          marginLeft: "20%",
        }}
      />

      {isModalAddWorkerOpen && (
        <div className="modal_add_worker_form">
          <div className="modal_add_worker_content">
            <span className="close" onClick={closeAddWorkerModal}>
              <VscClose />
            </span>
            <label>
              {t("worker_name_1")}
              <input
                type="text"
                name="w_name"
                onChange={handleWorkerFormChange}
              />
            </label>
            <label>
              {t("worker_lastname_1")}
              <input
                type="text"
                name="w_lastname"
                onChange={handleWorkerFormChange}
              />
            </label>
            <label>
              {t("worker_email_1")}
              <input
                type="text"
                name="w_email"
                onChange={handleWorkerFormChange}
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

export default AddWorkerForma;
