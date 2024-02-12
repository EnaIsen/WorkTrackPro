import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./AdminHeader.css";

import TranslationComponent from "../../pages/TranslationComponent/TranslationComponent";

const AdminHomePage = () => {
  const { t } = useTranslation();
  return (
    <>
      <header className="header_admin">
        <div className="logo_admin">
          <img src="logo_final.png" alt="Logo" />
        </div>
        <div className="admin_link">
          <Link to="/admin" className="admin_links">
            <span className="admin_text"> {t("home")} </span>
          </Link>
          <Link to="/messages" className="admin_links">
            <span className="admin_text"> {t("messages")} </span>
          </Link>
          <Link to="/projects" className="admin_links">
            <span className="admin_text"> {t("projects")} </span>
          </Link>

          <Link to="/tasks" className="admin_links">
            <span className="admin_text"> {t("tasks")} </span>
          </Link>

          <Link to="/workers" className="admin_links">
            <span className="admin_text"> {t("workers")} </span>
          </Link>
          <Link to="/adminWorkHours" className="admin_links">
            <span className="admin_text"> {t("work_hours")} </span>
          </Link>
        </div>
        <TranslationComponent />
      </header>
    </>
  );
};

export default AdminHomePage;
