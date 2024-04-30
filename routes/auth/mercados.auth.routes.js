const express = require("express");
const router = express.Router();
const mercadosAuthServices = require("../../services/auth/mercados.auth.services");
const jwt = require("../../utils/jwt");
const checkMercadosAuth = require("../../middlewares/checkMarketAuth");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ logged: false, message: "Faltan campos" });
  } else {
    const logged = await mercadosAuthServices.login(email, password);

    if (logged) {
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
  const { mercado, username, password, email } = req.body;
  if (!mercado || !username || !password || !email) {
    res.status(400).json({ logged: false, message: "Faltan campos" });
  } else {
    const registered = await mercadosAuthServices.register(
      mercado,
      username,
      password,
      email
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
