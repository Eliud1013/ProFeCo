require("dotenv").config();
const mariadb = require("mariadb");
const pool = mariadb.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB,
  connectionLimit: 5,
});

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
      "SELECT * FROM Clientes WHERE email = ? AND password = ? ",
      [email, password]
    );
    return res;
  } catch (error) {
    console.log(error);
  }
}

async function register(clienteId, name, username, password, email, genre) {
  try {
    let conn = await getConnection();
    const res = await conn.query(
      "INSERT INTO Clientes (clienteId, name, username, password, email, genre) VALUES (?,?,?,?,?,?)",
      [clienteId, name, username, password, email, genre]
    );

    return res;
  } catch (error) {
    return error;
  }
}

module.exports = { register, login };
