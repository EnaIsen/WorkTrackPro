import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import Header from "../../organisms/Header/Header";
import SideBarMenu from "../SideBarMenu/SideBarMenu";
import CustomButtons from "../../atoms/Buttons/CustomButtons";
import MenadzerHours from "../MenadzerHours/MenadzerHours";
import Footer from "../../organisms/Footer/Footer";

import "./UserWorkHours.css";

const hoursFormaInfo = {
  id_project: "",
  hours_worked: "",
  date_worked: "",
};

const formatDate = (dateString) => {
  const dateObject = new Date(dateString);
  const options = { day: "2-digit", month: "2-digit", year: "numeric" };
  return dateObject.toLocaleDateString("hr-HR", options);
};

const UserWorkHours = () => {
  const { t } = useTranslation();
  const [projects, setProjects] = useState([]);
  const [hours, setHours] = useState([]);
  const [userHoursForm, setUserHoursForm] = useState(hoursFormaInfo);
  const { id_project, hours_worked, date_worked } = userHoursForm;

  const korisnik = JSON.parse(localStorage.getItem("korisnik"));
  const idKorisnik = korisnik.id_worker;
  const isMenadzer = korisnik.worker_status === "Menadzer";

  const handleUserHours = async () => {
    const { data } = await axios.get("http://localhost:5000/user/workHours", {
      params: {
        id_worker: idKorisnik,
      },
    });
    setHours(data);
  };

  const handleUserProjects = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/user/userProjects/all",
      {
        params: {
          id_worker: idKorisnik,
        },
      }
    );
    setProjects(data);
  };

  useEffect(() => {
    handleUserHours();
  }, []);

  useEffect(() => {
    handleUserProjects();
  }, []);

  const handleUserHoursForm = async () => {
    const { data } = await axios.post(
      "http://localhost:5000/user/userHours/add",
      {
        id_worker: idKorisnik,
        id_project,
        hours_worked,
        date_worked,
      }
    );
    setHours((userHours) => [...userHours, data.newUserHours]);
  };

  const handleUserHoursFormChange = (e) => {
    const { name, value } = e.target;
    setUserHoursForm({
      ...userHoursForm,
      [name]: value,
    });
  };

  return (
    <>
      <Header />
      <div className="main_user_projects_container">
        <SideBarMenu />
        <div className="content_container">
          {isMenadzer ? (
            <>
              <div className="menadzer_table">
                <MenadzerHours />
              </div>
            </>
          ) : (
            <>
              <div className="right_5">
                <div className="container_form_3">
                  <h1>{t("enter_work_hours")}</h1>
                  <div className="work_hours_form">
                    <div className="form_group_1">
                      <label>
                        {t("project_name")}
                        <select
                          name="id_project"
                          onChange={handleUserHoursFormChange}
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
                    </div>

                    <div className="form_group_1">
                      <label>
                        {t("number_work_hours")}
                        <input
                          type="number"
                          className="form_input_1"
                          name="hours_worked"
                          onChange={handleUserHoursFormChange}
                        />
                      </label>
                    </div>

                    <div className="form_group_1">
                      <label>
                        {t("date")}
                        <input
                          type="date"
                          className="form_input_1"
                          name="date_worked"
                          onChange={handleUserHoursFormChange}
                        />
                      </label>
                    </div>

                    <CustomButtons
                      text={t("enter_work_hours")}
                      onClick={handleUserHoursForm}
                      variant="default"
                      className="button_workHours"
                    />
                  </div>
                </div>
              </div>

              <div className="table_container">
                <table className="table_projects">
                  <thead className="user_table_head_projects">
                    <tr className="table_row_projects">
                      <th className="user_table_header_projects">
                        {t("id_hours")}
                      </th>
                      <th className="user_table_header_projects">
                        {t("worker_name_1")}
                      </th>
                      <th className="user_table_header_projects">
                        {t("project_name")}
                      </th>
                      <th className="user_table_header_projects">
                        {t("work_hours")}
                      </th>
                      <th className="user_table_header_projects">
                        {t("date")}
                      </th>
                    </tr>
                  </thead>
                  <tbody className="table_body_messages">
                    {hours.map((hour) => (
                      <tr key={hour.id_hours}>
                        <td className="table_data_user">{hour.id_hours}</td>
                        <td className="table_data_user">{hour.worker_name}</td>
                        <td className="table_data_user">{hour.project_name}</td>
                        <td className="table_data_user">{hour.hours_worked}</td>
                        <td className="table_data_user">
                          {formatDate(hour.date_worked)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
      <br />
      <Footer />
    </>
  );
};

export default UserWorkHours;
