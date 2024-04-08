const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();
const checkAuth = require("../middlewares/checkAuth");
const productExists = require("../middlewares/productExists");
const mercadosServices = require("../services/mercados.services");

router.get("/ratings", (req, res) => {
  res.send("Ratings");
});

router.get("/multas", (req, res) => {
  res.send("Multas");
});

router.post("/subirPrecio/:idProducto", (req, res) => {
  res.send("calificar");
});

router.post(
  "/ofertas/:productId",
  checkAuth,
  productExists,
  async (req, res) => {
    const productId = req.params.productId;
    const { precioOferta } = req.body || null;

    if (!/PROD[0-9]{3,3}/.test(productId)) {
      res.status(400).send("Invalid product id");
    } else if (!precioOferta) {
      res.status(400).send("Falta precio oferta");
    } else {
      let token = req.headers.cookie.split("=")[1];
      let data = jwt.verify(token, process.env.SECRET);
      const published = await mercadosServices.publicarOferta(
        data.mercadoId,
        productId,
        precioOferta
      );
      if (published.published) {
        res.status(201).json(published);
      } else {
        res.status(500).json(published);
      }
    }
  }
);

module.exports = router;
