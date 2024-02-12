import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

const MenadzerHours = () => {
  const { t } = useTranslation();
  const [hours, setHours] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/admin/workHours")
      .then((response) => setHours(response.data))
      .catch((err) => console.log(err));
  }, []);

  const formatDate = (dateString) => {
    const dateObject = new Date(dateString);
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return dateObject.toLocaleDateString("hr-HR", options);
  };
  return (
    <>
      <div className="table-container">
        <h1>{t("workHours_heading")}</h1>
        <table className="table_projects">
          <thead className="table_head_projects">
            <tr className="table_row_projects">
              <th className="table_header_projects">{t("id_hours")}</th>
              <th className="table_header_projects">{t("worker_name_1")}</th>
              <th className="table_header_projects">{t("project_name")}</th>
              <th className="table_header_projects">{t("work_hours")}</th>
              <th className="table_header_projects">{t("date")}</th>
            </tr>
          </thead>
          <tbody className="table_body_messages">
            {hours.map((hour) => (
              <tr key={hour.id_hours}>
                <td className="table_data">{hour.id_hours}</td>
                <td className="table_data">{hour.worker_name}</td>
                <td className="table_data">{hour.project_name}</td>
                <td className="table_data">{hour.hours_worked}</td>
                <td className="table_data">{formatDate(hour.date_worked)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default MenadzerHours;
