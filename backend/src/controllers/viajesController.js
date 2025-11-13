const {
  obtenerViajes,
  obtenerViajePorId,
  crearViaje,
  actualizarViaje,
  eliminarViaje,
} = require("../models/viajeModel");

//GET /viajes
async function listarViajes(req, res) {
  try {
    const viajes = await obtenerViajes();
    res.json({ ok: true, data: viajes });
  } catch (error) {
    console.error("Error al listar viajes:", error);
    res.status(500).json({ ok: false, message: "Error interno al obtener los viajes" });
  }
}

//GET /viajes id
async function obtenerViajeController(req, res) {
  try {
    const { id } = req.params;
    const viaje = await obtenerViajePorId(id);

    if (!viaje) {
      return res.status(404).json({ ok: false, message: "Viaje no encontrado" });
    }

    res.json({ ok: true, data: viaje });
  } catch (error) {
    console.error("Error al obtener viaje:", error);
    res.status(500).json({ ok: false, message: "Error interno al obtener el viaje" });
  }
}

//POST /viajes
async function crearViajeController(req, res) {
  try {
    const {
      vehiculo_id,
      conductor_id,
      fecha_salida,
      fecha_llegada,
      origen,
      destino,
      kilometros,
      observaciones,
    } = req.body;

    if (
      !vehiculo_id ||
      !conductor_id ||
      !fecha_salida ||
      !fecha_llegada ||
      !origen ||
      !destino ||
      !kilometros
    ) {
      return res.status(400).json({ ok: false, message: "Campos obligatorios faltantes" });
    }

    const nuevo = await crearViaje({
      vehiculo_id,
      conductor_id,
      fecha_salida,
      fecha_llegada,
      origen,
      destino,
      kilometros,
      observaciones: observaciones || null,
    });

    res.status(201).json({ ok: true, data: nuevo });
  } catch (error) {
    console.error("Error al crear viaje:", error);
    res.status(500).json({ ok: false, message: "Error interno al crear el viaje" });
  }
}

//PUT /viajes id
async function actualizarViajeController(req, res) {
  try {
    const { id } = req.params;
    const {
      vehiculo_id,
      conductor_id,
      fecha_salida,
      fecha_llegada,
      origen,
      destino,
      kilometros,
      observaciones,
    } = req.body;

    const existente = await obtenerViajePorId(id);
    if (!existente) {
      return res.status(404).json({ ok: false, message: "Viaje no encontrado" });
    }

    const actualizado = await actualizarViaje(id, {
      vehiculo_id,
      conductor_id,
      fecha_salida,
      fecha_llegada,
      origen,
      destino,
      kilometros,
      observaciones,
    });

    res.json({ ok: true, data: actualizado });
  } catch (error) {
    console.error("Error al actualizar viaje:", error);
    res.status(500).json({ ok: false, message: "Error interno al actualizar el viaje" });
  }
}

//DELETE /viajes id
async function eliminarViajeController(req, res) {
  try {
    const { id } = req.params;
    const eliminado = await eliminarViaje(id);

    if (!eliminado) {
      return res.status(404).json({ ok: false, message: "Viaje no encontrado" });
    }

    res.json({ ok: true, message: "Viaje eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar viaje:", error);
    res.status(500).json({ ok: false, message: "Error interno al eliminar el viaje" });
  }
}

module.exports = {
  listarViajes,
  obtenerViajeController,
  crearViajeController,
  actualizarViajeController,
  eliminarViajeController,
};
