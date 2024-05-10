const express = require("express");
const router = express.Router();
const profecoServices = require("../services/profeco.services");
const marktetExists = require("../middlewares/marketExists");
const checkProfecoAuth = require("../middlewares/checkProfecoAuth");

// TODO: Implementar middleware para comprobar que el tipo de cuenta es profeco
// Implementar Login para profeco
router.post(
  "/multar/:mercadoId",
  checkProfecoAuth,
  marktetExists,
  async (req, res) => {
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
  }
);

router.get("/inconsistencias", checkProfecoAuth, async (req, res) => {
  const inconsistencias = await profecoServices.obtenerInconsistencias();
  res.json(inconsistencias);
});

router.get(
  "/inconsistencias/:mercadoId",
  checkProfecoAuth,
  marktetExists,
  async (req, res) => {
    const { mercadoId } = req.params;
    if (!mercadoId) {
      res.status(400);
    } else {
      const inconsistencias = await profecoServices.obtenerInconsistenciasM(
        mercadoId
      );
      res.json(inconsistencias);
    }
  }
);

module.exports = router;
