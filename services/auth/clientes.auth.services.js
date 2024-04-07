const { v4: uuidv4 } = require("uuid");

const clientesDB = require("../../store/clientes.db");

async function login(email, password) {
  const logged = await clientesDB.login(email, password);
  if (logged.length == 0) {
    return false;
  } else {
    return logged;
  }
}

async function register(name, username, password, email, genre) {
  const registered = await clientesDB.register(
    uuidv4(),
    name,
    username,
    password,
    email,
    genre
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
      message: "El usuario ha sido registrado",
    };
  }
  return message;
}

module.exports = { login, register };
