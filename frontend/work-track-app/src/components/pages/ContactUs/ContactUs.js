import React from "react";
import { useTranslation } from "react-i18next";

import Header from "../../organisms/Header/Header";
import Footer from "../../organisms/Footer/Footer";

import "./ContactUs.css";

const ContactUs = () => {
  const { t } = useTranslation();

  return (
    <>
      <Header />
      <div className="container_userProfile">
        <div className="container_user_profile">
          <div className="right_2">
            <div className="container_user">
              <h1 className="heading_contactUs">{t("contact_us")}</h1>
              <hr className="mt-0 mb-4" />
              <div className="pt-1">
                <div className="mb-3">
                  <label className="label_name">
                    {t("your_name")}
                    <input type="text" name="worker_name" />
                  </label>
                </div>
                <div className="mb-3">
                  <label className="label_name">
                    {t("your_email")}
                    <input type="text" name="worker_name" />
                  </label>
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="label_name">
                    {t("your_message")}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className="larger-textarea"
                    required
                  ></textarea>
                </div>
              </div>

              <div className="button_area">
                <button className="button_close">{t("send")}</button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ContactUs;
