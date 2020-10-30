import React from "react";
import { CompanyBar, GuestBar, AdminBar, UserBar } from "./components/AppBar";

const Navigation = ({ user, company }: any) => {
  const onClick = () => {
    let r = window.confirm("Cerrar Sesion?");
    if (r) {
      localStorage.removeItem("token");
      localStorage.removeItem("userEmail");
      window.location.reload();
    }
  };

  if (user.role === "GUEST") {
    return <GuestBar />;
  } else if (user.role === "USER") {
    return <UserBar user={user} logout={onClick} />;
  } else if (user.role === "COMPANY") {
    return <CompanyBar company={company} logout={onClick} />;
  } else if (user.role === "ADMIN") {
    return <AdminBar logout={onClick} />;
  } else {
    return null;
  }
};

export default Navigation;
