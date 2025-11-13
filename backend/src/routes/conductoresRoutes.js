const express = require("express");
const {
  listarConductores,
  obtenerConductorController,
  crearConductorController,
  actualizarConductorController,
  eliminarConductorController,
} = require("../controllers/conductoresController");

const {
  validarCrearConductor,
  validarActualizarConductor,
  validarIdConductor,
} = require("../middlewares/conductoresValidations");

const validarCampos = require("../middlewares/validarCampos");

const router = express.Router();

//GET conductores
router.get("/", listarConductores);

//GET /conductores id
router.get("/:id", validarIdConductor, validarCampos, obtenerConductorController);

//POST /conductores
router.post("/", validarCrearConductor, validarCampos, crearConductorController);

//PUT /conductores id
router.put("/:id", validarActualizarConductor, validarCampos, actualizarConductorController);

//DELETE /conductores id
router.delete("/:id", validarIdConductor, validarCampos, eliminarConductorController);


module.exports = router;
