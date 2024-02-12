import React, { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home/Home";
import About from "./components/organisms/About/About";
import LoginPage from "./components/pages/Login/LoginPage";
import SignUpPage from "./components/pages/SignUp/SignUpPage";
import UserProfile from "./components/pages/UserProfile/UserProfile";
import AdminHomePage from "./components/pages/Admin/AdminHomePage/AdminHomePage";
import Projects from "./components/pages/Projects/Projects";
import Workers from "./components/pages/Workers/Workers";
import Tasks from "./components/pages/Tasks/Tasks";
import UserProjects from "./components/UserProjects/UserProjects";
import UserTasks from "./components/pages/UserTasks/UserTasks";
import PrivateRoutes from "./PrivateRoutes";
import Messages from "./components/pages/Messages/Messages";
import AdminMessages from "./components/pages/AdminMessages/AdminMessages";
import AdminWorkHours from "./components/pages/AdminWorkHours/AdminWorkHours";
import AboutMe from "./components/organisms/AboutMe/AboutMe";
import UserWorkHours from "./components/pages/UserWorkHours/UserWorkHours";
import FAQ from "./components/pages/FAQ/FAQ";
import PrivacyPolicy from "./components/pages/PrivacyPolicy/PrivacyPolicy";
import TermsOfUse from "./components/pages/TermsOfUse/TermsOfUse";
import ContactUs from "./components/pages/ContactUs/ContactUs";

import "./App.css";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((curr) => (curr === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div className="App" id={theme}>
        <Router>
          <Routes>
            <Route element={<PrivateRoutes />}>
              <Route path="/userProfile" element={<UserProfile />} />
              <Route path="/admin" element={<AdminHomePage />} />
              <Route path="/projects" element={<Projects />} />
              <Route path="/workers" element={<Workers />} />
              <Route path="/tasks" element={<Tasks />} />
              <Route path="/userProjects" element={<UserProjects />} />
              <Route path="/userTasks" element={<UserTasks />} />
              <Route path="/userMessages" element={<Messages />} />
              <Route path="/messages" element={<AdminMessages />} />
              <Route path="/workHours" element={<UserWorkHours />} />
              <Route path="/adminWorkHours" element={<AdminWorkHours />} />
            </Route>
            <Route index element={<Home toggleTheme={toggleTheme} />} />
            <Route path="/" element={<About />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/aboutMe" element={<AboutMe />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/privacyPolicy" element={<PrivacyPolicy />} />
            <Route path="/termsOfUse" element={<TermsOfUse />} />
            <Route path="/contactUs" element={<ContactUs />} />
          </Routes>
        </Router>
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
