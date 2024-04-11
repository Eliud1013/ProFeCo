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

async function login(email, password) {
  try {
    let conn = await getConnection();
    const res = await conn.query(
      "SELECT * FROM Mercados WHERE email = ? AND password = ? ",
      [email, password]
    );
    return res;
  } catch (error) {
    console.log("[X] Mercados_db: " + error);
  } finally {
    if (conn) conn.release();
  }
}

async function register(mercadoId, mercado, username, password, email) {
  try {
    let conn = await getConnection();
    const res = await conn.query(
      "INSERT INTO Mercados (mercadoId, mercado, adminUser, password, email) VALUES (?,?,?,?,?)",
      [mercadoId, mercado, username, password, email]
    );

    return res;
  } catch (error) {
    return error;
  } finally {
    if (conn) conn.release();
  }
}
async function checkProductExists(productId) {
  try {
    let conn = await getConnection();
    const res = await conn.query(
      "SELECT COUNT(*) FROM Productos WHERE ProductoId = ?",
      [productId]
    );
    return res;
  } catch (error) {
    return error;
  } finally {
    if (conn) conn.release();
  }
}
async function publicarOferta(ofertaId, productId, mercadoId, precioOferta) {
  try {
    let conn = await getConnection();
    const res = await conn.query(
      "INSERT INTO Ofertas(ofertaId,mercadoId,productoId,precioOferta) VALUES (?,?,?,?)",
      [ofertaId, productId, mercadoId, precioOferta]
    );
    return res;
  } catch (error) {
    return error;
  } finally {
    if (conn) conn.release();
  }
}
async function offerExists(productoId, mercadoId) {
  try {
    let conn = await getConnection();
    const res = await conn.query(
      "SELECT COUNT(*) FROM Ofertas WHERE productoId = ? AND mercadoId = ?",
      [productoId, mercadoId]
    );
    return res;
  } catch (error) {
    return error;
  } finally {
    if (conn) conn.release();
  }
}

async function marktetExists(mercadoId) {
  try {
    let conn = await getConnection();
    const res = await conn.query(
      "SELECT COUNT(*) FROM Mercados WHERE mercadoId = ?",
      [mercadoId]
    );
    return res;
  } catch (error) {
    return error;
  } finally {
    if (conn) conn.release();
  }
}
async function obtenerRatings(mercadoId) {
  try {
    let conn = await getConnection();
    const res = await conn.query(
      "SELECT * FROM Calificaciones WHERE mercadoId = ?",
      [mercadoId]
    );
    return res;
  } catch (error) {
    return error;
  } finally {
    if (conn) conn.release();
  }
}

module.exports = {
  register,
  login,
  checkProductExists,
  publicarOferta,
  offerExists,
  marktetExists,
  obtenerRatings,
};
