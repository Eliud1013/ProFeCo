const express = require("express");
const router = express.Router();

router.post("/multar/:idTienda", (req, res) => {
  res.send("multar");
});

module.exports = router;
