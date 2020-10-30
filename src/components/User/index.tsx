import React from "react";
import Main from "./components/Dashboard";
import NewCompany from "./components/CreateCompany";
import Config from "./components/Settings";

export const Dashboard = ({ user }: any) => <Main user={user} />;

export const CreateCompany = () => <NewCompany />;

export const Settings = ({ user }: any) => <Config user={user} />;
