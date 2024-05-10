require("dotenv").config();
const { v4: uuidv4 } = require("uuid");
const mercadoDB = require("../store/mercados.db");
const jwt = require("jsonwebtoken");

async function publicarOferta(productId, mercadoId, precioOferta) {
  const id = uuidv4().split("-")[0];
  const ofertaId = `OFFER_${id}`;
  if (typeof precioOferta != "number") {
    return { published: false, message: "Precio invalido" };
  } else {
    const published = await mercadoDB.publicarOferta(
      ofertaId,
      productId,
      mercadoId,
      precioOferta
    );

    if (published.affectedRows == 1) {
      return { published: true, message: "La oferta ha sido almacenada" };
    } else {
      return { published: false, message: "Ha ocurrido un error" };
    }
  }
}

async function getFines(cookie) {
  try {
    let token = cookie.split("=")[1];
    let data = jwt.verify(token, process.env.SECRET);
    const mercadoId = data.mercadoId;
    const multas = await mercadoDB.getFines(mercadoId);

    return multas;
  } catch (error) {
    res.status(400).send("Invalid token format");
  }
}
async function obtenerRatings(mercadoId) {
  const ratings = await mercadoDB.obtenerRatings(mercadoId);
  return ratings;
}

module.exports = { publicarOferta, obtenerRatings, getFines };
