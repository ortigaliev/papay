
const express = require('express');
const router = express.Router();

router.get("/", function (req,res) {
  res.send("Home sahifadasiz");
});

router.get("/menu", (req, res) => {
  res.send("Menu sahifadasiz");
});

router.get("/community", (req, res) => {
  res.send("JAmiyat sahifadasiz");
});

module.exports = router;