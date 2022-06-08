const express = require("express");
const router = express.Router();
const axios = require("axios");

// get anime

router.get("/anime/:search", (req, res) => {
  axios
    .get(`https://api.jikan.moe/v4/anime?q=${req.params.search}&sfw`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
});

module.exports = router;
