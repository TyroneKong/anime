import React from "react";
import { SearchEngine } from "../components/searchEngine/SearchEngine";
import "./PersonalisedPage.scss";

export const PersonalisedPage = ({ user }) => {
  return (
    <div className="personalised">
      <h1 className="personalised__title">Anime Search Page</h1>
      <h2 className="personalised__greeting">Welcome {user.first_name}</h2>
      <SearchEngine />
    </div>
  );
};
