require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const cookie = req.headers.cookie || "";
  if (cookie.split("=")[0] != "auth") {
    res.status(400).send("Missing auth token");
  } else {
    try {
      let token = cookie.split("=")[1];
      let data = jwt.verify(token, process.env.SECRET);
      if (data.roll == "mercado") {
        next();
      } else {
        res.status(400).send("Necesitas una cuenta de supermercado");
      }
    } catch (error) {
      res.status(400).send("Invalid token format");
    }
  }
};
