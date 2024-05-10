const profecoDB = require(".././../store/profeco.db");
const bcrypt = require("bcrypt");

async function login(email, password) {
  try {
    const data = await profecoDB.getDataByEmail(email);
    if (data.length == 0) {
      console.log("return false");
      return false;
    } else {
      const logged = bcrypt.compareSync(password, data[0].password);
      if (logged) {
        return data;
      } else {
        return false;
      }
    }
  } catch (error) {
    console.log("[X] Mercados_auth_services: " + error);

    return { status: 500, errorMsj: "Error en el servidor" };
  }
}

module.exports = { login };
