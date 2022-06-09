const axios = require("axios");

exports.getAnime = async (req, res) => {
  try {
    const response = await axios.get(
      `https://api.jikan.moe/v4/anime?q=${req.params.search}&sfw`
    );
    res.status(200).json(response.data);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
