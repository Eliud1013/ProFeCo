const express = require("express");
const router = express.Router();
const profecoServices = require("../services/profeco.services");
const marktetExists = require("../middlewares/marketExists");

// TODO: Implementar middleware para comprobar que el tipo de cuenta es profeco
// Implementar Login para profeco
router.post("/multar/:mercadoId", marktetExists, async (req, res) => {
  const { mercadoId } = req.params;
  const cantidad = req.body.multa;
  const mensaje = req.body.mensaje || null;
  if (!cantidad) {
    res.status(400).send("No se ha proporcionado una cantidad");
  } else {
    const multado = await profecoServices.multarTienda(
      mercadoId,
      cantidad,
      mensaje
    );
    res.json(multado);
  }
});

module.exports = router;
