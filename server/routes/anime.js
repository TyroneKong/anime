const express = require("express");
const router = express.Router();
const axios = require("axios");
const { verifyToken } = require("../auth");
const animeController = require("../controllers/anime");
// get anime

router.get("/anime/:search", animeController.getAnime);

module.exports = router;
