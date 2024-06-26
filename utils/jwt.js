require("dotenv").config();
var jwt = require("jsonwebtoken");

function generateToken(userData) {
  userData = userData[0];
  console.log(userData);
  let data = { email: userData.email };
  if ("clienteId" in userData) {
    data = { ...data, clienteId: userData.clienteId, roll: "cliente" };
  } else if ("mercadoId" in userData) {
    data = { ...data, mercadoId: userData.mercadoId, roll: "mercado" };
  } else if ("profecoUsuarioId" in userData) {
    data = {
      ...data,
      profecoUserId: userData.profecoUserId,
      name: userData.name,
      username: userData.username,
      roll: "profeco",
    };
  }
  const token = jwt.sign(data, process.env.SECRET);
  return token;
}

module.exports = { generateToken };
