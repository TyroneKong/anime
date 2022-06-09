const axios = require("axios");

exports.getAnime = (req, res) => {
  axios
    .get(`https://api.jikan.moe/v4/anime?q=${req.params.search}&sfw`)
    .then((response) => {
      res.status(200).json(response.data);
    })
    .catch((error) => {
      res.status(400).json(error);
    });
};
