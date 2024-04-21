const express = require("express");
const { generatenewShortUrl, getAnalytics } = require("../controllers/url");

const router = express.Router();

router.post("/", generatenewShortUrl);
router.get("/analytics/:shortId", getAnalytics);

module.exports = router;
