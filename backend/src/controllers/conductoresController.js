const {
  obtenerConductores,
  crearConductor,
  obtenerConductorPorId,
  actualizarConductor,
  eliminarConductor,
} = require("../models/conductorModel");

//GET /conductores
async function listarConductores(req, res) {
  try {
    const conductores = await obtenerConductores();
    res.json({ ok: true, data: conductores });
  } catch (error) {
    console.error("Error al listar conductores:", error);
    res.status(500).json({ ok: false, message: "Error interno al obtener los conductores" });
  }
}

//GET /conductores id
async function obtenerConductorController(req, res) {
  try {
    const { id } = req.params;
    const conductor = await obtenerConductorPorId(id);

    if (!conductor) {
      return res.status(404).json({ ok: false, message: "Conductor no encontrado" });
    }

    res.json({ ok: true, data: conductor });
  } catch (error) {
    console.error("Error al obtener conductor:", error);
    res.status(500).json({ ok: false, message: "Error interno al obtener el conductor" });
  }
}

//POST /conductores
async function crearConductorController(req, res) {
  try {
    const { nombre, apellido, dni, licencia, fecha_vencimiento_licencia } = req.body;

    if (!nombre || !apellido || !dni || !licencia || !fecha_vencimiento_licencia) {
      return res.status(400).json({ ok: false, message: "Todos los campos son obligatorios" });
    }

    const nuevo = await crearConductor({
      nombre,
      apellido,
      dni,
      licencia,
      fecha_vencimiento_licencia,
    });

    res.status(201).json({ ok: true, data: nuevo });
  } catch (error) {
    console.error("Error al crear conductor:", error);
    res.status(500).json({ ok: false, message: "Error interno al crear el conductor" });
  }
}

//PUT /conductores id
async function actualizarConductorController(req, res) {
  try {
    const { id } = req.params;
    const { nombre, apellido, dni, licencia, fecha_vencimiento_licencia } = req.body;

    const existente = await obtenerConductorPorId(id);
    if (!existente) {
      return res.status(404).json({ ok: false, message: "Conductor no encontrado" });
    }

    const actualizado = await actualizarConductor(id, {
      nombre,
      apellido,
      dni,
      licencia,
      fecha_vencimiento_licencia,
    });

    res.json({ ok: true, data: actualizado });
  } catch (error) {
    console.error("Error al actualizar conductor:", error);
    res.status(500).json({ ok: false, message: "Error interno al actualizar el conductor" });
  }
}

//DELETE /conductores id
async function eliminarConductorController(req, res) {
  try {
    const { id } = req.params;
    const eliminado = await eliminarConductor(id);

    if (!eliminado) {
      return res.status(404).json({ ok: false, message: "Conductor no encontrado" });
    }

    res.json({ ok: true, message: "Conductor eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar conductor:", error);
    res.status(500).json({ ok: false, message: "Error interno al eliminar el conductor" });
  }
}

module.exports = {
  listarConductores,
  obtenerConductorController,
  crearConductorController,
  actualizarConductorController,
  eliminarConductorController,
};
