const express = require("express");
const app = express();
const clientesRoutes = require("./routes/clientes.routes");
const mercadosRoutes = require("./routes/mercados.routes");
const clientesAuthRoutes = require("./routes/auth/clientes.auth.routes");
const mercadosAuthRoutes = require("./routes/auth/mercados.auth.routes");

app.use(express.json());
app.use("/api/clientes/", clientesRoutes);
app.use("/api/mercados/", mercadosRoutes);
app.use("/api/auth/clientes/", clientesAuthRoutes);
app.use("/api/auth/mercados/", mercadosAuthRoutes);

app.listen(3000, console.log("Server running"));
