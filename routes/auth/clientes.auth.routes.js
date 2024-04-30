const express = require("express");
const router = express.Router();
const clientesAuthServices = require("../../services/auth/clientes.auth.services");
const jwt = require("../../utils/jwt");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ logged: false, message: "Faltan campos" });
  } else {
    const logged = await clientesAuthServices.login(email, password);
    if (logged) {
      console.log("logged");
      const token = jwt.generateToken(logged);
      res.status(200).cookie("auth", token, { httpOnly: true }).json({
        logged: true,
        token: token,
      });
    } else {
      res.status(200).json({
        logged: false,
        message: "Credenciales invalidas",
      });
    }
  }
});

router.post("/register", async (req, res) => {
  const { name, username, password, email, gender } = req.body;
  if (!name || !username || !password || !email || !gender) {
    res.status(400).json({ logged: false, message: "Faltan campos" });
  } else if (gender != "H" && gender != "M") {
    console.log(gender);
    res.status(400).send("El genero puede ser H o M.");
  } else if (password.length > 128) {
    res.status(400).send("La contrasena tiene un limite de 128 caracteres");
  } else {
    const registered = await clientesAuthServices.register(
      name,
      username,
      password,
      email,
      gender
    );

    if (registered.registered) {
      res.status(registered.status).json({
        registered: true,
        message: registered.message,
      });
    } else {
      console.log(registered);
      res
        .status(registered.status)
        .json({ registered: false, message: registered.message });
    }
  }
});

module.exports = router;
