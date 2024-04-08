require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();

const clientesServices = require("../services/clientes.services");
/* Middleware para comprobar si una oferta existe antes de hacer el reporte */
const { ofertaExiste } = require("../services/clientes.services");
const checkAuth = require("../middlewares/checkClientAuth");

router.get("/ofertas", async (req, res) => {
  //Obtener todas las ofertas
  const ofertas = await clientesServices.obtenerOfertas();

  res.json(ofertas);
});

router.post(
  "/reportarInconsistencia/:ofertaId",
  checkAuth,
  ofertaExiste,
  async (req, res) => {
    const { ofertaId } = req.params;
    const { mensaje } = req.body;
    let token = req.headers.cookie.split("=")[1];
    let clienteId = jwt.verify(token, process.env.SECRET).clienteId;

    if (!ofertaId || !mensaje) {
      res.status(400).send("Faltan campos");
    } else {
      const reported = await clientesServices.reportarInconsistencia(
        ofertaId,
        clienteId,
        mensaje
      );
      res.send(reported);
    }
  }
);

router.post("/calificar", (req, res) => {
  res.send("calificar");
});

module.exports = router;
