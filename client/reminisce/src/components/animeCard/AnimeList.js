import React from "react";
import AnimeCard from "./AnimeCard";
import "./AnimeList.scss";

const AnimeList = ({ data }) => {
  return (
    <div className="anime__list">
      {data
        ?.filter((data) => data.score > 6)
        .map((image, index) => (
          <AnimeCard
            synopsis={image.synopsis}
            name={image.title}
            key={index}
            image={image.images.jpg.image_url}
          />
        ))}
    </div>
  );
};

export default AnimeList;
