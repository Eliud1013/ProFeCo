const jwt = require("jsonwebtoken");
const { offerExists } = require("../store/mercados.db");

module.exports = async function (req, res, next) {
  let token = req.headers.cookie.split("=")[1];
  let data = jwt.verify(token, process.env.SECRET);
  const productId = req.params.productId;
  const mercadoId = data.mercadoId;
  const exists = await offerExists(productId, mercadoId);
  console.log(exists);
  const count = Object.values(exists[0] || {})[0];
  console.log(count);
  if (count >= 1n) {
    res
      .status(400)
      .send("Tu tienda ya cuenta con una oferta para ese producto");
  } else {
    next();
  }
};
