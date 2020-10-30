import React from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import UsersData from "./components/UsersData";
import CompaniesData from "./components/CompaniesData";

export const AdminWelcomeScreen = () => {
  return <WelcomeScreen />;
};
export const AdminUsersData = ({ data }) => {
  return <UsersData users={data} />;
};
export const AdminCompaniesData = ({ data }) => {
  return <CompaniesData companies={data} />;
};
