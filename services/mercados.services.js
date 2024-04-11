const { v4: uuidv4 } = require("uuid");
const mercadoDB = require("../store/mercados.db");

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
async function obtenerRatings(mercadoId) {
  const ratings = await mercadoDB.obtenerRatings(mercadoId);
  return ratings;
}

module.exports = { publicarOferta, obtenerRatings };
