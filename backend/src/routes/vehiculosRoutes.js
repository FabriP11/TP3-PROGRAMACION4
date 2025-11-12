const express = require("express");
const {
  listarVehiculos,
  crearVehiculoController,
  obtenerVehiculoController,
  actualizarVehiculoController,
  eliminarVehiculoController,
} = require("../controllers/vehiculosController");

const router = express.Router();

//GET vehiculos
router.get("/", listarVehiculos);

//GET /vehiculos  id
router.get("/:id", obtenerVehiculoController);

//POST vehiculos
router.post("/", crearVehiculoController);

//PUT /vehiculos  id
router.put("/:id", actualizarVehiculoController);

//DELETE /vehiculos  id
router.delete("/:id", eliminarVehiculoController);

module.exports = router;
