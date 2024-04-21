const express = require("express");
const { connectToMongoDB } = require("./connection");
const urlRoute = require("./routes/url");
const URL = require("./models/url");
const app = express();
const PORT = 8001;

connectToMongoDB("mongodb://127.0.0.1:27017/url-shortener").then(() =>
  console.log("🟢 Connected to MongoDB")
);

app.use(express.json());
app.get("/:shortId", async (req, res) => {
  const shortId = req.params.shortId;
  const entry = await URL.findOneAndUpdate(
    {
      shortid: shortId
    },
    {
      $push: {
        visithistory: {
          timestamp: Date.now(),
        },
      },
    }
  );
  res.redirect(entry.redirectUrl);
});
app.use("/url", urlRoute);

app.listen(PORT, () => console.log(`🟢 Server Started on ${PORT}`));
