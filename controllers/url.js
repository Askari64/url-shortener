const shortid = require("shortid");
const URL = require("../models/url");

async function generatenewShortUrl(req, res) {
  const body = req.body;
  if (!body) return res.status(400).json({ error: "url is required" });
  const shortID = shortid();

  await URL.create({
    shortid: shortID,
    redirectUrl: body.url,
    visithistory: [],
  });

  return res.json({ id: shortID });
}

async function getAnalytics(req, res) {
  const shortid = req.params.shortId;
  const result = await URL.findOne({ shortid });
  return res.json({
    totalClicks: result.visithistory.length,
    analytics: result.visithistory,
  });
}

module.exports = {
  generatenewShortUrl,
  getAnalytics,
};
