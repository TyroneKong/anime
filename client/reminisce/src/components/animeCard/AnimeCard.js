import React from "react";
import "./AnimeCard.scss";

const AnimeCard = ({ image, name, synopsis }) => {
  return (
    <div className="anime__card">
      <div className="anime__card-inner">
        <div className="anime__card-front">
          <img className="anime__image" src={image} alt="anime" />
          <h2 className="anime__image-title">{name}</h2>
        </div>

        <div className="anime__card-back">
          <p className="anime__card-synopsis">{synopsis}</p>
        </div>
      </div>
    </div>
  );
};

export default AnimeCard;
