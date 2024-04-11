const mercadosDB = require("../store/mercados.db");

module.exports = async function (req, res, next) {
  const productId = req.params.productId;
  const countArr = await mercadosDB.checkProductExists(productId);
  const count = Object.values(countArr[0] || {})[0] || 0;
  console.log(count);
  if (count != 0n) {
    next();
  } else {
    res.status(404).send("El producto no existe");
  }
};
