// FAQ.js

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "../../organisms/Header/Header";
import Footer from "../../organisms/Footer/Footer";
import "./FAQ.css";

const FAQ = () => {
  const { t } = useTranslation();
  const [expandedItem, setExpandedItem] = useState(null);

  const faqData = [
    { question: t("faq_question_1"), answer: t("faq_answer_1") },
    { question: t("faq_question_2"), answer: t("faq_answer_2") },
    { question: t("faq_question_3"), answer: t("faq_answer_3") },
    { question: t("faq_question_4"), answer: t("faq_answer_4") },
    { question: t("faq_question_5"), answer: t("faq_answer_5") },
  ];

  const toggleAnswer = (index) => {
    setExpandedItem(expandedItem === index ? null : index);
  };

  return (
    <>
      <Header />
      <div className="faq-container">
        <div className="faq-header">
          <h1>{t("faq_1")}</h1>
        </div>

        {faqData.map((faq, index) => (
          <div className="faq-item" key={index}>
            <div
              className={`faq-question ${
                expandedItem === index ? "active" : ""
              }`}
              onClick={() => toggleAnswer(index)}
            >
              {faq.question}
            </div>
            <div
              className={`faq-answer ${expandedItem === index ? "show" : ""}`}
            >
              {faq.answer}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </>
  );
};

export default FAQ;
