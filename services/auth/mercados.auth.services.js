const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const mercadosDB = require("../../store/mercados.db.js");

async function login(email, password) {
  try {
    const data = await mercadosDB.getDataByEmail(email);
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

async function register(mercado, username, password, email) {
  const id = uuidv4().split("-")[0];
  const salt = bcrypt.genSaltSync(10);
  const password_hash = bcrypt.hashSync(password, salt);
  const mercadoId = `MERCADO_${id}`;
  const registered = await mercadosDB.register(
    mercadoId,
    mercado,
    username,
    password_hash,
    email
  );
  var message;
  if (registered.errno) {
    switch (registered.errno) {
      case 1062:
        console.log(registered);
        message = {
          registered: false,
          status: 409,
          message: "El correo ya esta registrado",
        };
        break;
    }
  } else {
    return {
      registered: true,
      status: 201,
      message: "El mercado ha sido registrado",
    };
  }
  return message;
}

module.exports = { login, register };
