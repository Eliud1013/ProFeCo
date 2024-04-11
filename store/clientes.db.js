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
  let conn;

  try {
    conn = await getConnection();
    const res = await conn.query(
      "SELECT * FROM Clientes WHERE email = ? AND password = ? ",
      [email, password]
    );
    return res;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release();
  }
}

async function register(clienteId, name, username, password, email, genre) {
  let conn;
  try {
    conn = await getConnection();
    const res = await conn.query(
      "INSERT INTO Clientes (clienteId, name, username, password, email, genre) VALUES (?,?,?,?,?,?)",
      [clienteId, name, username, password, email, genre]
    );

    return res;
  } catch (error) {
    return error;
  } finally {
    if (conn) conn.release(); //release to pool
  }
}
async function reportarInconsistencia(
  inconsistenciaId,
  ofertaId,
  clienteId,
  mensaje
) {
  let conn;
  try {
    conn = await getConnection();
    const res = await conn.query(
      "INSERT INTO Inconsistencias (inconsistenciaId,ofertaId,clienteId,mensaje) VALUES (?,?,?,?)",
      [inconsistenciaId, ofertaId, clienteId, mensaje]
    );

    return res;
  } catch (error) {
    return error;
  } finally {
    if (conn) conn.release();
  }
}
async function calificarMercado(
  calificacionId,
  clienteId,
  mercadoId,
  calificacion,
  comentario
) {
  let conn;
  try {
    conn = await getConnection();
    const res = await conn.query(
      "INSERT INTO Calificaciones (calificacionId,clienteId,mercadoId,calificacion, comentario) VALUES (?,?,?,?,?)",
      [calificacionId, clienteId, mercadoId, calificacion, comentario]
    );

    return res;
  } catch (error) {
    return error;
  } finally {
    if (conn) conn.release();
  }
}

module.exports = { register, login, reportarInconsistencia, calificarMercado };
