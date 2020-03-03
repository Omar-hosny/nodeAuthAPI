const express = require("express");
const router = express.Router();

const verify = require("./verifyToken");

router.get("/", verify, (req, res) => {
  res.json({
    posts: "This is first post in private access route"
  });
});

module.exports = router;
