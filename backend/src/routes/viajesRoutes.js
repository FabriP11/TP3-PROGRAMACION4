const express = require("express");
const {
  listarViajes,
  obtenerViajeController,
  crearViajeController,
  actualizarViajeController,
  eliminarViajeController,
} = require("../controllers/viajesController");

const {
  validarCrearViaje,
  validarActualizarViaje,
  validarIdViaje,
} = require("../middlewares/viajesValidations");

const validarCampos = require("../middlewares/validarCampos");
const { protegerRuta } = require("../middlewares/authMiddleware");

const router = express.Router();
router.use(protegerRuta);

//GET /viajes
router.get("/", listarViajes);

//GET /viajes id
router.get("/:id", validarIdViaje, validarCampos, obtenerViajeController);

//POST /viajes
router.post("/", validarCrearViaje, validarCampos, crearViajeController);

//PUT /viajes id
router.put("/:id", validarActualizarViaje, validarCampos, actualizarViajeController);

//DELETE /viajes id
router.delete("/:id", validarIdViaje, validarCampos, eliminarViajeController);

module.exports = router;
