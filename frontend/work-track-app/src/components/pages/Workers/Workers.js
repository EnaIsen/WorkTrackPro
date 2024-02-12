// ADMIN WORKERS

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import AdminHeader from "../../organisms/AdminHeader/AdminHeader";
import CustomButtons from "../../atoms/Buttons/CustomButtons";
import AddWorkerForma from "./AddWorkerForma/AddWorkerForma";
import EditWorkerForm from "./EditWorkerForm/EditWorkerForm";

import "./Workers.css";

const Workers = () => {
  const { t } = useTranslation();
  const [workers, setWorkers] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/workers")
      .then((workers) => setWorkers(workers.data))
      .catch((err) => console.log(err));
    console.log(workers.data);
  }, []);
  console.log(workers);

  const deleteWorker = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/workers/delete/${id}`);
      const updateWorkers = workers.filter(
        (workers) => workers.id_worker !== id
      );
      setWorkers(updateWorkers);
    } catch (error) {
      console.log("Radnik nije izbrisan: ", error);
    }
  };
  return (
    <>
      <AdminHeader />
      <div className="table_workers_container">
        <h1> {t("all_workers")} </h1>
        <table className="table_workers">
          <thead className="table_head_workers">
            <tr className="table_row_workers">
              <th className="table_header_workers"> {t("id_worker")} </th>
              <th className="table_header_workers"> {t("worker_name_1")}</th>
              <th className="table_header_workers">{t("worker_lastname_1")}</th>
              <th className="table_header_workers"> {t("worker_email_1")} </th>
            </tr>
          </thead>
          <tbody>
            {workers.map((worker) => (
              <tr key={worker.id_worker}>
                <td className="table_data_workers"> {worker.id_worker}</td>
                <td className="table_data_workers"> {worker.worker_name}</td>
                <td className="table_data_workers">{worker.worker_lastname}</td>
                <td className="table_data_workers"> {worker.worker_email}</td>
                <td>
                  <CustomButtons
                    onClick={() => deleteWorker(worker.id_worker)}
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
                  <EditWorkerForm worker={worker} setWorkers={setWorkers} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="add_worker_container">
        <div className="form_container_3">
          <AddWorkerForma setWorkers={setWorkers} />
        </div>
      </div>
    </>
  );
};

export default Workers;
