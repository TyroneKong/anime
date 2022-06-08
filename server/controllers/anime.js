const axios = require("axios");

exports.getAnime = (req, res) => {
  axios.get(`https://api.jikan.moe/v4/?q=naruto&sfw`).then((response) => {
    console.log(response.data);
  });
};
