import React, { Fragment } from "react";
import { useTranslation } from "react-i18next";

import "./About.css";

const About = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <div className="middle-container">
        <br />
        <h1 className="heading-middle">{t("title_about")}</h1>
        <br />
        <p>{t("text_about")}</p>
        <br />
        <br />
        <hr className="line-divider" />
      </div>
    </Fragment>
  );
};

export default About;
