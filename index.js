const express = require("express");
const app = express();
const clientesRoutes = require("./routes/clientes.routes");
const mercadosRoutes = require("./routes/mercados.routes");

app.use(express.json());
app.use("/api/clientes/", clientesRoutes);
app.use("/api/mercados/mercadosRoutes", clientesRoutes);

app.listen(3000, console.log("Server running"));
