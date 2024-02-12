// kontrola pristupa određenim dijelovima aplikacije.

import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  const korisnik = JSON.parse(localStorage.getItem("korisnik"));
  console.log(korisnik, "korisnik");
  const korisnikCheck = korisnik === (undefined || null) ? false : true;
  console.log(korisnikCheck, "check");
  return korisnikCheck ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
