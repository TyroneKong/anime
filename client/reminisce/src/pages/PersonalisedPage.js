import React from "react";
import { SearchEngine } from "../components/searchEngine/SearchEngine";
import "./PersonalisedPage.scss";
import Logout from "./Logout";

export const PersonalisedPage = ({ user, setValidUser, validUser }) => {
  return (
    <div className="personalised">
      <Logout setValidUser={setValidUser} validUser={validUser} />
      <h1 className="personalised__title">Anime Search</h1>
      <h2 className="personalised__greeting">Welcome {user.first_name}</h2>
      <SearchEngine />
    </div>
  );
};
