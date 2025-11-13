const express = require("express");
const {
  listarViajes,
  obtenerViajeController,
  crearViajeController,
  actualizarViajeController,
  eliminarViajeController,
} = require("../controllers/viajesController");

const router = express.Router();

router.get("/", listarViajes);
router.get("/:id", obtenerViajeController);
router.post("/", crearViajeController);
router.put("/:id", actualizarViajeController);
router.delete("/:id", eliminarViajeController);

module.exports = router;
