import React from "react";
import WelcomeScreen from "./components/WelcomeScreen";
import UsersData from "./components/UsersData";
import CompaniesData from "./components/CompaniesData";

export const AdminWelcomeScreen = () => {
  return <WelcomeScreen />;
};
export const AdminUsersData = ({ data }: any) => {
  return <UsersData users={data} />;
};
export const AdminCompaniesData = ({ data }: any) => {
  return <CompaniesData companies={data} />;
};
