import React from "react";
import { useTranslation } from "react-i18next";

import "./Footer.css";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <>
      <div className="container">
        <div className="container_row">
          <p className="text_edit"> {t("information")}</p>
          <li className="div_edit">
            <a href="/" className="link_edit">
              {t("about")}
            </a>
          </li>
          <li className="div_edit">
            <a href="/aboutMe" className="link_edit">
              {t("about_me")}
            </a>
          </li>
          <li className="div_edit">
            <a href="/faq" className="link_edit">
              {t("faq")}
            </a>
          </li>
        </div>
        <div className="container_row">
          <p className="text_edit"> {t("important_links")} </p>
          <li className="div_edit">
            <a href="/signup" className="link_edit">
              {t("sign_up")}
            </a>
          </li>
          <li className="div_edit">
            <a href="/contactUs" className="link_edit">
              {t("contact_us")}
            </a>
          </li>
          <li className="div_edit">
            <a href="/termsOfUse" className="link_edit">
              {t("terms_of_use")}
            </a>
          </li>
          <li className="div_edit">
            <a href="/privacyPolicy" className="link_edit">
              {t("privacy_policy")}
            </a>
          </li>
        </div>
        <div className="container_row">
          <p className="text_edit"> {t("social_media")} </p>
          <li className="div_edit">
            <a href="https://www.facebook.com/enaisen" className="link_edit">
              {t("facebook")}
            </a>
          </li>
          <li className="div_edit">
            <a href="https://www.instagram.com/enaisen/" className="link_edit">
              {t("instagram")}
            </a>
          </li>
        </div>
      </div>
      <div className="copyright">
        <p className="copyright">{t("copy_right")}</p>
      </div>
    </>
  );
};

export default Footer;
