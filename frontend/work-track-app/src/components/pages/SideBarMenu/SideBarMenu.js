import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoAnalyticsSharp, IoChatbubbleEllipsesOutline } from "react-icons/io5";
import { TbBrowserCheck } from "react-icons/tb";
import { IoMdTime } from "react-icons/io";
import { FaRegCircleUser } from "react-icons/fa6";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useTranslation } from "react-i18next";

import SidebarMenuItems from "./SideBarMenuItems/SideBarMenuItems";

import "./SideBarMenu.css";

const SideBarMenu = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  // funkcija koja se poziva prilikom odjavljivanja korisnika.
  // Briše informacije o korisniku iz lokalnog skladišta.
  const handleLogOut = () => {
    localStorage.removeItem("korisnik");
  };

  // koristi se kuka za provjeru je li korisnik prijavljen (jer informacije o korisniku postoje u lokalnom skladištu).
  // ako korisnik nije prijavljen preusmjerava se na stranicu za prijavu.
  useEffect(() => {
    if (!localStorage.getItem("korisnik")) {
      navigate("/login");
    }
  }, [handleLogOut]);

  return (
    <>
      <div className="sidebar">
        <SidebarMenuItems
          to="/userProjects"
          icon={<IoAnalyticsSharp />}
          label={t("projects")}
        />
        <SidebarMenuItems
          to="/userTasks"
          icon={<TbBrowserCheck />}
          label={t("tasks")}
        />
        <SidebarMenuItems
          to="/userMessages"
          icon={<IoChatbubbleEllipsesOutline />}
          label={t("messages")}
        />
        <SidebarMenuItems
          to="/workHours"
          icon={<IoMdTime />}
          label={t("hours")}
        />
        <SidebarMenuItems
          to="/userProfile"
          icon={<FaRegCircleUser />}
          label={t("user_profile")}
        />
        <SidebarMenuItems
          onClick={handleLogOut}
          icon={<RiLogoutBoxLine />}
          label={t("log_out")}
        />
      </div>
    </>
  );
};

export default SideBarMenu;
