const express = require("express");
const router = express.Router();

router.get("/ratings", (req, res) => {
  res.send("Ratings");
});

router.get("/multas", (req, res) => {
  res.send("Multas");
});

router.post("/subirPrecio/:idProducto", (req, res) => {
  res.send("calificar");
});

module.exports = router;
