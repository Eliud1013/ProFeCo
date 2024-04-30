const express = require("express");

const fs = require("fs");
const app = express();
const clientesRoutes = require("./routes/clientes.routes");
const mercadosRoutes = require("./routes/mercados.routes");
const profecoRoutes = require("./routes/profeco.routes");
const clientesAuthRoutes = require("./routes/auth/clientes.auth.routes");
const mercadosAuthRoutes = require("./routes/auth/mercados.auth.routes");
const grpcServer = require("./grpc/server");
const colors = require("colors");

app.use(express.json());
app.use("/api/clientes/", clientesRoutes);
app.use("/api/mercados/", mercadosRoutes);
app.use("/api/profeco/", profecoRoutes);
app.use("/api/auth/clientes/", clientesAuthRoutes);
app.use("/api/auth/mercados/", mercadosAuthRoutes);
grpcServer();

app.listen(
  3000,
  console.log("[+]".green + " Express server running: 127.0.0.1:3000")
);
