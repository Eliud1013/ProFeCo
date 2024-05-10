require("dotenv").config();
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();
const marktetExists = require("../middlewares/marketExists");

const clientesServices = require("../services/clientes.services");
/* Middleware para comprobar si una oferta existe antes de hacer el reporte */
const { ofertaExiste } = require("../services/clientes.services");
const checkAuth = require("../middlewares/checkClientAuth");

router.get("/ofertas", checkAuth, async (req, res) => {
  //Obtener todas las ofertas
  const idProducto = req.query.producto || "";
  const idMercado = req.query.mercado || "";

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

router.get("/mercados", async (req, res) => {
  res.json(await clientesServices.getMarkets());
});
router.post(
  "/calificar/:mercadoId",
  checkAuth,
  marktetExists,
  async (req, res) => {
    const mercadoId = req.params.mercadoId;
    const { calificacion, comentario } = req.body;
    let token = req.headers.cookie.split("=")[1];
    let clienteId = jwt.verify(token, process.env.SECRET).clienteId;
    if (!calificacion || !comentario) {
      res.status(400).send("Faltan campos");
    } else if (calificacion > 5) {
      res.status(400).send("La calificacion debe estar en el rango 0-5");
    } else {
      const calificado = await clientesServices.calificarMercado(
        clienteId,
        mercadoId,
        calificacion,
        comentario
      );
      res.status(calificado.status).json({ calificado: calificado.calificado });
    }
  }
);

module.exports = router;
