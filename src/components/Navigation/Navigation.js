import React, { Component } from "react";
import { CompanyBar, GuestBar, AdminBar, UserBar } from "./components/AppBar";

export default class Navigation extends Component {
  onClick = () => {
    let r = window.confirm("Cerrar Sesion?");
    if (r) {
      localStorage.removeItem("token");
      localStorage.removeItem("email");
      window.location.reload();
    }
  };

  render() {
    const { user, company } = this.props;

    if (user.role === "GUEST") {
      return <GuestBar />;
    } else if (user.role === "USER") {
      return <UserBar user={user} logout={this.onClick} />;
    } else if (user.role === "COMPANY") {
      return <CompanyBar company={company} logout={this.onClick} />;
    } else if (user.role === "ADMIN") {
      return <AdminBar logout={this.onClick} />;
    }
  }
}
