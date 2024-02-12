import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import i18next from "i18next";

import uk_flag from "../../../assets/images/uk_flag.png";
import bhs_flag from "../../../assets/images/bhs_flag.png";

import TranslateIcon from "@mui/icons-material/Translate";

import "./TranslationComponent.css";

const TranslationComponent = () => {
  const { t } = useTranslation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const languages = [
    {
      code: "en",
      name: t("name"),
      country_code: "en",
    },
    {
      code: "bhs",
      name: t("name_1"),
      country_code: "bhs",
    },
  ];

  const handleButtonClick = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleCloseMenu = () => {
    setDropdownOpen(false);
  };

  const handleLanguageChange = (language) => {
    i18next.changeLanguage(language.code);
    setDropdownOpen(false);
  };

  return (
    <div className="translate_container">
      <TranslateIcon onClick={handleButtonClick} className="icon_color" />
      {isDropdownOpen && (
        <ul className="menu-dropdown">
          <div onClick={handleCloseMenu} className="menu-overlay" />
          <div className="menu-options">
            {languages.map(({ code, name, country_code }) => (
              <li key={country_code}>
                <button
                  className="menu-item_1"
                  onClick={() =>
                    handleLanguageChange({ code, name, country_code })
                  }
                  style={{ border: "none", backgroundColor: "transparent" }}
                >
                  {country_code === "en" && (
                    <img
                      src={uk_flag}
                      alt="UK Flag"
                      width="50"
                      height="50"
                      className="menu-item-icon"
                    />
                  )}
                  {country_code === "bhs" && (
                    <img
                      src={bhs_flag}
                      alt="BHS Flag"
                      width="50"
                      height="50"
                      className="menu-item-icon"
                    />
                  )}
                  {name}
                </button>
              </li>
            ))}
          </div>
        </ul>
      )}
    </div>
  );
};

export default TranslationComponent;
