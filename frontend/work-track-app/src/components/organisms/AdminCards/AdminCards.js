import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./AdminCards.css";

import CustomButtons from "../../atoms/Buttons/CustomButtons";

const AdminCards = () => {
  const { t } = useTranslation();
  const cardData = [
    {
      title: t("projects"),
      description: t("projects_description"),
      buttonText: t("projects_button"),
      path: "/projects",
    },
    {
      title: t("tasks"),
      description: t("tasks_description"),
      buttonText: t("projects_button"),
      path: "/tasks",
    },
    {
      title: t("workers"),
      description: t("workers_description"),
      buttonText: t("workers_button"),
      path: "/workers",
    },
    {
      title: t("work_hours"),
      description: t("workHours_description"),
      buttonText: t("workHours_button"),
      path: "/adminWorkHours",
    },
    {
      title: t("messages"),
      description: t("messages_description"),
      buttonText: t("messages_button"),
      path: "/messages",
    },
  ];

  return (
    <div className="card_container">
      {cardData.map((card, index) => (
        <div key={index} className="admin_cards">
          <h2 className="card_headings">{card.title}</h2>
          <p className="card_paragraf">{card.description}</p>
          <Link to={card.path}>
            <CustomButtons text={card.buttonText} variant="default" />
          </Link>
        </div>
      ))}
    </div>
  );
};

export default AdminCards;
