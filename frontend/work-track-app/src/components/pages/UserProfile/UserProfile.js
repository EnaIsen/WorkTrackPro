import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useTranslation } from "react-i18next";

import "./UserProfile.css";

const UserProfile = () => {
  const { t } = useTranslation();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const korisnik = JSON.parse(localStorage.getItem("korisnik"));

  const idKorisnik = korisnik.id_worker;

  const userProfileInfo = {
    worker_name: korisnik.worker_name,
    worker_lastname: korisnik.worker_lastname,
    worker_email: korisnik.worker_email,
    worker_password: korisnik.worker_password,
  };

  const [userProfile, setUserProfile] = useState(userProfileInfo);

  const { worker_name, worker_lastname, worker_email, worker_password } =
    userProfile;

  const handleUserProfileChange = (e) => {
    const { name, value } = e.target;
    setUserProfile({
      ...userProfile,
      [name]: value,
    });
  };

  const handleUserProfilEdit = async () => {
    const { data } = await axios.put(
      "http://localhost:5000/user/userProfile/edit",
      {
        id_worker: idKorisnik,
        worker_name,
        worker_lastname,
        worker_email,
      }
    );
    console.log(data, "userProfil");
    localStorage.setItem("korisnik", JSON.stringify(data));
  };

  const handleUserProfilPasswordEdit = async () => {
    const { data } = await axios.put(
      "http://localhost:5000/user/userProfile/editPassword",
      {
        id_worker: idKorisnik,
        worker_password,
      }
    );
  };

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

  return (
    <div className="container_userProfile">
      <div className="container_user_profile">
        <div className="change_color">
          <div className="left_2">
            <img
              src="account_image_1.png"
              alt="Slika"
              className="my-5"
              style={{ width: "100px", borderRadius: "50%" }}
            />
          </div>
          <button className="button_edit" onClick={handleOpenPopup}>
            {t("change_password")}
          </button>
        </div>
        <div className="right_2">
          <div className="container_user">
            <h6>{t("worker_information")}</h6>
            <hr className="mt-0 mb-4" />
            <div className="pt-1">
              <div className="mb-3">
                <label>
                  {t("worker_name")}
                  <input
                    type="text"
                    value={worker_name}
                    name="worker_name"
                    onChange={handleUserProfileChange}
                  />
                </label>
              </div>
              <div className="mb-3">
                <label>
                  {t("worker_lastname")}
                  <input
                    type="text"
                    value={worker_lastname}
                    name="worker_lastname"
                    onChange={handleUserProfileChange}
                  />
                </label>
              </div>
              <div className="mb-3">
                <label>
                  {t("worker_email")}
                  <input
                    type="email"
                    value={worker_email}
                    name="worker_email"
                    onChange={handleUserProfileChange}
                  />
                </label>
              </div>
            </div>

            <div className="button_area">
              <Link to="/userProjects">
                <button className="button_close">{t("close")}</button>
              </Link>
              <button onClick={handleUserProfilEdit} className="button_close">
                {t("save")}
              </button>
            </div>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="popup_container">
          <div className="popup">
            <label>
              {t("new_password_1")}
              <input
                type="password"
                name="worker_password"
                onChange={handleUserProfileChange}
              />
            </label>
            <button
              className="button_close"
              onClick={handleUserProfilPasswordEdit}
            >
              {t("save")}
            </button>
            <button className="button_close" onClick={handleClosePopup}>
              {t("close")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserProfile;
