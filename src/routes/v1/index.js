const express = require("express");
const router = express.Router();

router.use("/", (req, res) => {
  res.send("homepage");
});

module.exports = router;
