import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import axios from "axios";
import Anime from "../animeCard/Anime";
import "./SearchEngine.scss";

export const SearchEngine = () => {
  const [data, setData] = useState(null);
  const [userInput, setUserInput] = useState("");
  const baseURL = "http://localhost:8001/anime/";

  const getAnime = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${baseURL}${userInput}`);
      setData(response?.data?.data);
      console.log(response?.data?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleInput = (e) => {
    setUserInput(e.target.value);
  };

  return (
    <div className="search">
      <form className="search__form" onSubmit={getAnime}>
        <TextField onChange={handleInput} label="search anime"></TextField>
        <Button type="submit" variant="contained">
          Click for anime
        </Button>
      </form>
      <Anime data={data} />
    </div>
  );
};
