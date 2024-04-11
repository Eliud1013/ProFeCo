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

/**CREATE TABLE Multas(
    multaId VARCHAR(52) PRIMARY KEY NOT NULL UNIQUE,
    tiendaId VARCHAR(52) NOT NULL,
    multa INT NOT NULL,
    fecha_multa DATETIME DEFAULT CURRENT_TIMESTAMP
) */
async function multar(multaId, tiendaId, multa, mensaje) {
  let conn;
  try {
    conn = await getConnection();
    let res;
    if (mensaje != null) {
      res = await conn.query(
        "INSERT INTO Multas(multaId,tiendaId,multa,mensaje)VALUES(?,?,?,?) ",
        [multaId, tiendaId, multa, mensaje]
      );
    } else {
      res = await conn.query(
        "INSERT INTO Multas(multaId,tiendaId,multa)VALUES(?,?,?) ",
        [multaId, tiendaId, multa]
      );
    }

    return res;
  } catch (error) {
    console.log(error);
  } finally {
    if (conn) conn.release();
  }
}

module.exports = { multar };
