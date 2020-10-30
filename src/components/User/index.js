import React from "react";
import Main from "./components/Dashboard";
import NewCompany from "./components/CreateCompany";
import Config from "./components/Settings";

export const Dashboard = () => <Main />;

export const CreateCompany = () => <NewCompany />;

export const Settings = ({ user }) => <Config user={user} />;
