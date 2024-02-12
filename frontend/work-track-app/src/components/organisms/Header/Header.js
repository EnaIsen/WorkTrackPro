import React, { Fragment, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "../../../App";

import CustomButtons from "../../atoms/Buttons/CustomButtons";
import TranslationComponent from "../../pages/TranslationComponent/TranslationComponent";

import "./Header.css";

const Header = () => {
  const { t } = useTranslation();
  const isLoggedIn = localStorage.getItem("korisnik");
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen((prevOpen) => !prevOpen);
  };

  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <Fragment>
      <header className="header_main">
        <div className="logo_header">
          <img src="logo_final.png" alt="Logo" />
        </div>

        <div className="buttons">
          <CustomButtons
            text={theme === "light" ? "dark" : "light"}
            variant={`default theme-toggle-button ${
              theme === "dark" ? "dark-theme" : "light-theme"
            }`}
            onClick={toggleTheme}
          />
          {isLoggedIn ? (
            <>
              <div className="user-menu">
                <button onClick={handleToggleMenu} className="user-icon-button">
                  <FontAwesomeIcon icon={faUserCircle} className="user_icon" />
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">
                <CustomButtons
                  text={t("log_in")}
                  variant="default"
                  className="login_button_1"
                />
              </Link>
              <Link to="/signup">
                <CustomButtons text={t("sign_up")} variant="default" />
              </Link>
            </>
          )}
          <TranslationComponent />
        </div>
      </header>
    </Fragment>
  );
};

export default Header;
