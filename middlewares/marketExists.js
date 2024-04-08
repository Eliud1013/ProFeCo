const jwt = require("jsonwebtoken");
const { marktetExists } = require("../store/mercados.db");

module.exports = async function (req, res, next) {
  const mercadoId = req.params.mercadoId;
  const exists = await marktetExists(mercadoId);
  const count = Object.values(exists[0])[0];

  if (count < 1n) {
    res
      .status(400)
      .send("No se ha encontrado un mercado con el id proporcionado.");
  } else {
    next();
  }
};
