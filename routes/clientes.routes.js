const express = require("express");
const router = express.Router();
const clientesServices = require("../services/clientes.services");

router.get("/ofertas", async (req, res) => {
  //Obtener todas las ofertas
  const ofertas = await clientesServices.obtenerOfertas();

  res.json(ofertas);
});

router.post("/reportarInconsistencia", (req, res) => {
  res.send("Reportar inconsistencia");
});

router.post("/calificar", (req, res) => {
  res.send("calificar");
});

module.exports = router;
