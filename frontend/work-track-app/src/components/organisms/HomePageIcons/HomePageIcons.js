import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../App";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFolderOpen,
  faTasks,
  faFileAlt,
  faClock,
  faExclamationTriangle,
  faHandshake,
} from "@fortawesome/free-solid-svg-icons";

import "./HomePageIcons.css";

const HomePageIcons = () => {
  const { t } = useTranslation();
  const { theme } = useContext(ThemeContext);

  const homePageIconsData = [
    {
      title: t("projects"),
      icon: faFolderOpen,
      backgroundColor: theme === "dark" ? "#607d8b" : "#001f3f",
    },
    {
      title: t("tasks"),
      icon: faTasks,
      backgroundColor: theme === "dark" ? "#bb86fc" : "#39cccc",
    },
    {
      title: t("problems"),
      icon: faFileAlt,
      backgroundColor: theme === "dark" ? "#607d8b" : "#001f3f",
    },
    {
      title: t("risk"),
      icon: faExclamationTriangle,
      backgroundColor: theme === "dark" ? "#bb86fc" : "#39cccc",
    },
    {
      title: t("time"),
      icon: faClock,
      backgroundColor: theme === "dark" ? "#607d8b" : "#001f3f",
    },
    {
      title: t("collaboration"),
      icon: faHandshake,
      backgroundColor: theme === "dark" ? "#bb86fc" : "#39cccc",
    },
  ];

  return (
    <div className="icons_container">
      {homePageIconsData.map((card, index) => (
        <div
          key={index}
          className="icon_cards"
          style={{ backgroundColor: card.backgroundColor }}
        >
          <FontAwesomeIcon icon={card.icon} size="3x" color="#fff" />
          <h2 className="icon_headings">{card.title}</h2>
        </div>
      ))}
    </div>
  );
};

export default HomePageIcons;
