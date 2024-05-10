const express = require("express");
const router = express.Router();
const profecoAuthServices = require("../../services/auth/profeco.auth.services");
const jwt = require("../../utils/jwt");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ logged: false, message: "Faltan campos" });
  } else {
    const logged = await profecoAuthServices.login(email, password);
    console.log(logged);
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

module.exports = router;
