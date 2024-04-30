const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const clientesDB = require("../../store/clientes.db");

async function login(email, password) {
  const data = await clientesDB.getDataByEmail(email);
  if (data.length == 0) {
    return false;
  } else {
    const logged = bcrypt.compareSync(password, data[0].password);
    if (logged) {
      return data;
    } else {
      return false;
    }
  }
}

async function register(name, username, password, email, genre) {
  const id = uuidv4().split("-")[0];
  const salt = bcrypt.genSaltSync(10);
  const password_hash = bcrypt.hashSync(password, salt);
  const clienteId = `CLIENTE_${id}`;
  const registered = await clientesDB.register(
    clienteId,
    name,
    username,
    password_hash,
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
