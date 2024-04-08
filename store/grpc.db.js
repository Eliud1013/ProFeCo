require("dotenv").config();
const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  connectionLimit: 5,
});
let conn;

async function getConnection() {
  return new Promise((resolve, reject) => {
    console.log(
      "[+] Connecting to DB: " +
        JSON.stringify({ host: process.env.DB_HOST, user: process.env.DB_USER })
    );
    try {
      resolve(pool.getConnection());
    } catch (error) {
      reject(error);
    }
  });
}

async function obtenerOfertas() {
  try {
    let conn = await getConnection();
    const res = await conn.query("SELECT * FROM Ofertas ");
    const objetoOfertas = {
      ofertas: res.map((oferta) => ({
        ofertaId: oferta.ofertaId,
        mercadoId: oferta.mercadoId,
        productoId: oferta.productoId,
        precioOferta: oferta.precioOferta,
      })),
    };

    return objetoOfertas;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release();
  }
}
async function ofertaExiste(ofertaId) {
  try {
    let conn = await getConnection();
    const res = await conn.query("SELECT * FROM Ofertas WHERE ofertaId = ?", [
      ofertaId,
    ]);

    return res;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release();
  }
}

module.exports = { obtenerOfertas, ofertaExiste };
