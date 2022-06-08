import React from "react";
import AnimeList from "./AnimeList";
import "./Anime.scss";

const Anime = ({ data }) => {
  return (
    <div className="anime">
      <AnimeList data={data} />
    </div>
  );
};

export default Anime;
