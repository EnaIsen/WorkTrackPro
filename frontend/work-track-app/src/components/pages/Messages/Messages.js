import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import Header from "../../organisms/Header/Header";
import SideBarMenu from "../SideBarMenu/SideBarMenu";
import Footer from "../../organisms/Footer/Footer";

import "./Messages.css";

const Messages = () => {
  const { t } = useTranslation();
  const [userMessages, setUserMessages] = useState([]);

  const korisnik = JSON.parse(localStorage.getItem("korisnik"));
  const idKorisnik = korisnik.id_worker;

  const handleUserMessages = async () => {
    const { data } = await axios.get(
      "http://localhost:5000/user/userMessages/all",
      {
        params: {
          id_worker: idKorisnik,
        },
      }
    );
    setUserMessages(data);
    console.log(data, "ovdje");
  };

  useEffect(() => {
    handleUserMessages();
  }, []);

  return (
    <>
      <Header />
      <div className="main_user_projects_container">
        <SideBarMenu />
        <div className="content_projects_container">
          <h1> {t("all_messages")} </h1>
          <ul className="messages_ul">
            {userMessages.map((message) => (
              <li key={message.id_message} className="messages_li">
                <p>
                  {t("sent_by")}: {message.sender_name}
                </p>
                <p>
                  {t("received_by")}: {message.receiver_name}
                </p>
                <p>
                  {t("message")}: {message.text_message}
                </p>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Messages;
