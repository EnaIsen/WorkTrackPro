import React from "react";
import { useTranslation } from "react-i18next";

import Header from "../Header/Header";
import Footer from "../Footer/Footer";

const AboutMe = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className="middle-container">
        <br />
        <h1 className="heading-middle">{t("about_me")}</h1>
        <hr className="line-divider" />
        <br />
        <p>{t("text_about_me")}</p>
        <br />
        <br />
        <hr className="line-divider" />
      </div>
      <Footer />
    </>
  );
};

export default AboutMe;
