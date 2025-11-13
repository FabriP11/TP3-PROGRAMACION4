const express = require("express");
const {
  listarVehiculos,
  crearVehiculoController,
  obtenerVehiculoController,
  actualizarVehiculoController,
  eliminarVehiculoController,
} = require("../controllers/vehiculosController");

const {
  validarCrearVehiculo,
  validarActualizarVehiculo,
  validarIdVehiculo,
} = require("../middlewares/vehiculosValidations");

const validarCampos = require("../middlewares/validarCampos");

const router = express.Router();

//GET /vehiculos
router.get("/", listarVehiculos);

//GET /vehiculos  id
router.get("/:id", validarIdVehiculo, validarCampos, obtenerVehiculoController);

//POST /vehiculos
router.post("/",  validarCrearVehiculo, validarCampos, crearVehiculoController);

//PUT /vehiculos  id
router.put("/:id", validarActualizarVehiculo, validarCampos, actualizarVehiculoController);

//DELETE /vehiculos  id
router.delete("/:id", validarIdVehiculo, validarCampos, eliminarVehiculoController);

module.exports = router;
