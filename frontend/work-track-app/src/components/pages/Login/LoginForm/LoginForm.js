import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

import "../LoginForm/LoginForm.css";

import TranslationComponent from "../../TranslationComponent/TranslationComponent";

const logInInfo = {
  email: "",
  lozinka: "",
};

const LoginForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [logIn, setLogIn] = useState(logInInfo);
  const [poruka, setPoruka] = useState("");

  useEffect(() => {
    if (localStorage.getItem("korisnik")) {
      navigate("/userProjects");
    }
  }, []);

  const { email, lozinka } = logIn;

  const handleLogIn = async () => {
    const { data } = await axios.post("http://localhost:5000/login", {
      email,
      lozinka,
    });
    setPoruka(data.poruka);
    console.log(data.korisnik, "korisnik");
    if (data.potvrda) {
      localStorage.setItem("korisnik", JSON.stringify(data.korisnik));
      navigate("/userProjects");
    }
  };

  const handleLogInChange = (e) => {
    const { name, value } = e.target;
    setLogIn({
      ...logIn,
      [name]: value,
    });
  };

  return (
    <div className="container_login">
      <div className="container_login_form">
        <div className="left">
          <div className="container_form">
            <h1>{t("welcome_back")}</h1>
            <input
              type="email"
              placeholder={t("email")}
              name="email"
              required
              className="input_login"
              onChange={handleLogInChange}
            />
            <input
              type="password"
              placeholder={t("password")}
              name="lozinka"
              required
              className="input_login"
              onChange={handleLogInChange}
            />
            <button className="login_button" onClick={() => handleLogIn()}>
              {t("log_in")}
            </button>
            {poruka ? poruka : ""}
          </div>
        </div>

        <div className="right">
          <div className="translate_part">
            <TranslationComponent className="icon_changeColor_1" />
          </div>
          <h1 className="heading_login"> {t("account")}</h1>
          <Link to="/signup">
            <button className="signup_button_1">{t("sign_up")}</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
