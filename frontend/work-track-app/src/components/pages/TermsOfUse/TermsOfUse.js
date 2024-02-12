import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Header from "../../organisms/Header/Header";
import Footer from "../../organisms/Footer/Footer";

import "./TermsOfUse.css";

const TermsOfUse = () => {
  const { t } = useTranslation();
  const [expandedSection, setExpandedSection] = useState(null);

  const termsData = [
    { section: t("terms_section_1"), content: t("terms_content_1") },
    { section: t("terms_section_2"), content: t("terms_content_2") },
    { section: t("terms_section_3"), content: t("terms_content_3") },
    { section: t("terms_section_4"), content: t("terms_content_4") },
    { section: t("terms_section_5"), content: t("terms_content_5") },
    { section: t("terms_section_6"), content: t("terms_content_6") },
    { section: t("terms_section_7"), content: t("terms_content_7") },
    { section: t("terms_section_8"), content: t("terms_content_8") },
  ];

  const toggleContent = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <>
      <Header />
      <div className="terms-container">
        <br />
        <h1 className="heading-terms">{t("terms_of_use")}</h1>
        {termsData.map((item, index) => (
          <div key={index}>
            <h3
              className={`section-container ${
                expandedSection === index ? "active" : ""
              }`}
              onClick={() => toggleContent(index)}
            >
              {item.section}
            </h3>
            <p
              className={`content-container ${
                expandedSection === index ? "show" : ""
              }`}
            >
              {item.content}
            </p>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default TermsOfUse;
