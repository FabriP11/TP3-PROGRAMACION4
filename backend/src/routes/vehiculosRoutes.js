const express = require("express");
const {
  listarVehiculos,
  crearVehiculoController,
} = require("../controllers/vehiculosController");

const router = express.Router();

//GET vehiculos
router.get("/", listarVehiculos);

//POST vehiculos
router.post("/", crearVehiculoController);

module.exports = router;
