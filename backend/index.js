const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { conectarDB } = require("./database");

const vehiculosRoutes = require("./src/routes/vehiculosRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "API TP3 funcionando",
  });
});

app.use("/vehiculos", vehiculosRoutes);

async function startServer() {
  await conectarDB();

  app.listen(PORT, () => {
    console.log(`🚀 Servidor TP3 escuchando en el puerto ${PORT}`);
  });
}

startServer();
