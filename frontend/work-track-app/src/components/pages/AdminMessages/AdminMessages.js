// ADMIN MESSAGES

import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

import AdminHeader from "../../organisms/AdminHeader/AdminHeader";
import CustomButtons from "../../atoms/Buttons/CustomButtons";

import "./AdminMessages.css";

const AdminMessages = () => {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/message/allMessages")
      .then((response) => setMessages(response.data))
      .catch((err) => console.log(err));
  }, []);

  const deleteMessage = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/message/messages/delete/${id}`);
      const updateMessage = messages.filter(
        (messages) => messages.id_message !== id
      );
      setMessages(updateMessage);
    } catch (error) {
      console.log("Poruka nije izbrisana!", error);
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="table-container">
        <h1> {t("messages_heading")} </h1>
        <table className="table_projects">
          <thead className="table_head_projects">
            <tr className="table_row_projects">
              <th className="table_header_projects">{t("id_message")}</th>
              <th className="table_header_projects">{t("sender_name")}</th>
              <th className="table_header_projects">{t("recipient_name")}</th>
              <th className="table_header_projects">{t("message_content")}</th>
            </tr>
          </thead>
          <tbody className="table_body_messages">
            {messages.map((message) => (
              <tr key={message.id_message}>
                <td className="table_data">{message.id_message}</td>
                <td className="table_data">{message.sender_name}</td>
                <td className="table_data">{message.receiver_name}</td>
                <td className="table_data">{message.text_message}</td>
                <td>
                  <CustomButtons
                    onClick={() => deleteMessage(message?.id_message)}
                    text={t("delete")}
                    variant="delete"
                    style={{
                      borderRadius: "0px",
                      width: "80px",
                      marginLeft: "20px",
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default AdminMessages;
