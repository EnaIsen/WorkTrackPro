// ADMIN WORK HOURS

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import AdminHeader from "../../organisms/AdminHeader/AdminHeader";
import CustomButtons from "../../atoms/Buttons/CustomButtons";

const AdminWorkHours = () => {
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

  const deleteHours = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/admin/workHours/delete/${id}`);
      const updateHours = hours.filter((hours) => hours.id_hours !== id);
      setHours(updateHours);
    } catch (error) {
      console.log("Radni sat nije izbrisan!", error);
    }
  };

  return (
    <>
      <AdminHeader />
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
                <td>
                  <CustomButtons
                    onClick={() => deleteHours(hour?.id_hours)}
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
    </>
  );
};

export default AdminWorkHours;
