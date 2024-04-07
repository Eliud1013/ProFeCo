const express = require("express");
const router = express.Router();
const clientesAuthServices = require("../../services/clientes/clientes.auth.services");
const jwt = require("../../utils/jwt");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ logged: false, message: "Faltan campos" });
  } else {
    const logged = await clientesAuthServices.login(email, password);
    if (logged) {
      const token = jwt.generateToken(logged);
      res.status(200).cookie("authToken", token, { httpOnly: true }).json({
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
  const { name, username, password, email, genre } = req.body;
  if (!name || !username || !password || !email || !genre) {
    res.status(400).json({ logged: false, message: "Faltan campos" });
  } else {
    const registered = await clientesAuthServices.register(
      name,
      username,
      password,
      email,
      genre
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
