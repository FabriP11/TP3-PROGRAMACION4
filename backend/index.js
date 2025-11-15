const express = require("express");
const cors = require("cors");
require("dotenv").config();
const { conectarDB } = require("./database");

const vehiculosRoutes = require("./src/routes/vehiculosRoutes");
const conductoresRoutes = require("./src/routes/conductoresRoutes");
const viajesRoutes = require("./src/routes/viajesRoutes");
const authRoutes = require("./src/routes/authRoutes");
const { inicializarPassport, protegerRuta } = require("./src/middlewares/authMiddleware");


const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

inicializarPassport(app);

app.get("/", (req, res) => {
  res.json({
    ok: true,
    message: "API TP3 funcionando",
  });
});

app.use("/auth", authRoutes);

app.use("/vehiculos", protegerRuta, vehiculosRoutes);
app.use("/conductores", protegerRuta, conductoresRoutes);
app.use("/viajes", protegerRuta, viajesRoutes);

async function startServer() {
  await conectarDB();

  app.listen(PORT, () => {
    console.log(`🚀 Servidor TP3 escuchando en el puerto ${PORT}`);
  });
}

startServer();
