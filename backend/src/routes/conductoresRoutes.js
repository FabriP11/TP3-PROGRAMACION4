const express = require("express");
const {
  listarConductores,
  obtenerConductorController,
  crearConductorController,
  actualizarConductorController,
  eliminarConductorController,
} = require("../controllers/conductoresController");

const router = express.Router();

router.get("/", listarConductores);
router.get("/:id", obtenerConductorController);
router.post("/", crearConductorController);
router.put("/:id", actualizarConductorController);
router.delete("/:id", eliminarConductorController);

module.exports = router;
