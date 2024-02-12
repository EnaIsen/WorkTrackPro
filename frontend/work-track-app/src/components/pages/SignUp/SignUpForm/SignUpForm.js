import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";

import CustomButtons from "../../../atoms/Buttons/CustomButtons";
import TranslationComponent from "../../TranslationComponent/TranslationComponent";

import "./SignUpForm.css";

// postavlja se početno stanje za podatke forme.
const signUpInfo = {
  ime: "",
  prezime: "",
  email: "",
  lozinka: "",
};

const SignUpForm = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [signUp, setSignUp] = useState(signUpInfo);
  const [poruka, setPoruka] = useState("");
  const { ime, prezime, email, lozinka } = signUp;

  useEffect(() => {
    if (localStorage.getItem("korisnik")) {
      navigate("/userProjects");
    }
  }, []);

  const handleSignup = async () => {
    const { data } = await axios.post("http://localhost:5000/signup", {
      ime,
      prezime,
      email,
      lozinka,
    });
    setPoruka(data.poruka);
    if (data.potvrda) {
      navigate("/login");
    }
    console.log(data);
  };

  const handleSignUpChange = (e) => {
    const { name, value } = e.target;
    setSignUp({
      ...signUp,
      [name]: value,
    });
  };

  return (
    <div className="container_signup">
      <div className="container_signup_form">
        <div className="left_1">
          <div>
            <TranslationComponent />
          </div>
          <h1 className="heading_signup">{t("account_1")} </h1>

          <Link to="/login">
            <CustomButtons
              text={t("log_in")}
              variant="default"
              className="login_button_1"
            />
          </Link>
        </div>
        <div className="right_1">
          <div className="container_form_1">
            <h1>{t("create_account")}</h1>
            <input
              type="text"
              placeholder={t("firstname")}
              name="ime"
              className="input_signup"
              onChange={handleSignUpChange}
            />
            <input
              type="text"
              placeholder={t("lastname")}
              name="prezime"
              className="input_signup"
              onChange={handleSignUpChange}
            />
            <input
              type="email"
              placeholder={t("email")}
              name="email"
              className="input_signup"
              onChange={handleSignUpChange}
            />
            <input
              type="password"
              placeholder={t("password")}
              name="lozinka"
              className="input_signup"
              onChange={handleSignUpChange}
            />
            <CustomButtons
              text={t("sign_up")}
              variant="default"
              style={{ marginBottom: "10px" }}
              onClick={() => handleSignup()}
            />
            {poruka ? poruka : ""}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
