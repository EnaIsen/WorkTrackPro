import React from "react";

import Footer from "../../organisms/Footer/Footer";
import Header from "../../organisms/Header/Header";
import About from "../../organisms/About/About";
import HomePageIcons from "../../organisms/HomePageIcons/HomePageIcons";

const Home = ({ toggleTheme }) => {
  return (
    <>
      <Header toggleTheme={toggleTheme} />
      <About />
      <HomePageIcons />
      <Footer />
    </>
  );
};

export default Home;
