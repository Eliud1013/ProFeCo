const express = require("express");
const router = express.Router();

router.get("/ofertas", (req, res) => {
  res.send("Ofertas");
});

router.post("/reportarInconsistencia", (req, res) => {
  res.send("Reportar inconsistencia");
});

router.post("/calificar", (req, res) => {
  res.send("calificar");
});

module.exports = router;
