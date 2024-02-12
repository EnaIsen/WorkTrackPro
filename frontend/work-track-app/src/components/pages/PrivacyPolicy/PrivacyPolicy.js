import React, { useState } from "react";
import { useTranslation } from "react-i18next";

import Header from "../../organisms/Header/Header";
import Footer from "../../organisms/Footer/Footer";

import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  const { t } = useTranslation();
  const [expandedSection, setExpandedSection] = useState(null);

  const privacyPolicyContent = [
    { section: t("privacy_section_1"), content: t("privacy_content_1") },
    { section: t("privacy_section_2"), content: t("privacy_content_2") },
    { section: t("privacy_section_3"), content: t("privacy_content_3") },
    { section: t("privacy_section_4"), content: t("privacy_content_4") },
    { section: t("privacy_section_5"), content: t("privacy_content_5") },
    { section: t("privacy_section_6"), content: t("privacy_content_6") },
    { section: t("privacy_section_7"), content: t("privacy_content_7") },
  ];

  const toggleContent = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <>
      <Header />
      <div className="privacy-container">
        <h1 className="heading-privacy">{t("privacy_policy")}</h1>
        {privacyPolicyContent.map((item, index) => (
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

export default PrivacyPolicy;
