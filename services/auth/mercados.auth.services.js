const { v4: uuidv4 } = require("uuid");
const mercadosDB = require("../../store/mercados.db.js");

async function login(email, password) {
  const logged = await mercadosDB.login(email, password);
  if (logged.length == 0) {
    return false;
  } else {
    return logged;
  }
}

async function register(mercado, username, password, email) {
  const registered = await mercadosDB.register(
    uuidv4(),
    mercado,
    username,
    password,
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
