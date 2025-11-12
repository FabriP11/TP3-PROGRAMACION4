const {
  obtenerVehiculos,
  crearVehiculo,
  obtenerVehiculoPorId,
  actualizarVehiculo,
  eliminarVehiculo,
} = require("../models/vehiculoModel");

async function listarVehiculos(req, res) {
  try {
    const vehiculos = await obtenerVehiculos();
    res.json({
      ok: true,
      data: vehiculos,
    });
  } catch (error) {
    console.error("Error al listar vehículos:", error);
    res.status(500).json({
      ok: false,
      message: "Error interno al obtener los vehículos",
    });
  }
}

async function crearVehiculoController(req, res) {
  try {
    const { marca, modelo, patente, anio, capacidad_carga } = req.body;

    if (!marca || !modelo || !patente || !anio || !capacidad_carga) {
      return res.status(400).json({
        ok: false,
        message: "Todos los campos son obligatorios",
      });
    }

    const nuevo = await crearVehiculo({
      marca,
      modelo,
      patente,
      anio,
      capacidad_carga,
    });

    res.status(201).json({
      ok: true,
      data: nuevo,
    });
  } catch (error) {
    console.error("Error al crear vehículo:", error);
    res.status(500).json({
      ok: false,
      message: "Error interno al crear el vehículo",
    });
  }
}

async function obtenerVehiculoController(req, res) {
  try {
    const { id } = req.params;
    const vehiculo = await obtenerVehiculoPorId(id);

    if (!vehiculo) {
      return res.status(404).json({
        ok: false,
        message: "Vehículo no encontrado",
      });
    }

    res.json({
      ok: true,
      data: vehiculo,
    });
  } catch (error) {
    console.error("Error al obtener vehículo:", error);
    res.status(500).json({
      ok: false,
      message: "Error interno al obtener el vehículo",
    });
  }
}

async function actualizarVehiculoController(req, res) {
  try {
    const { id } = req.params;
    const { marca, modelo, patente, anio, capacidad_carga } = req.body;

    const existente = await obtenerVehiculoPorId(id);
    if (!existente) {
      return res.status(404).json({
        ok: false,
        message: "Vehículo no encontrado",
      });
    }

    const actualizado = await actualizarVehiculo(id, {
      marca,
      modelo,
      patente,
      anio,
      capacidad_carga,
    });

    res.json({
      ok: true,
      data: actualizado,
    });
  } catch (error) {
    console.error("Error al actualizar vehículo:", error);
    res.status(500).json({
      ok: false,
      message: "Error interno al actualizar el vehículo",
    });
  }
}

async function eliminarVehiculoController(req, res) {
  try {
    const { id } = req.params;
    const eliminado = await eliminarVehiculo(id);

    if (!eliminado) {
      return res.status(404).json({
        ok: false,
        message: "Vehículo no encontrado",
      });
    }

    res.json({
      ok: true,
      message: "Vehículo eliminado correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar vehículo:", error);
    res.status(500).json({
      ok: false,
      message: "Error interno al eliminar el vehículo",
    });
  }
}

module.exports = {
  listarVehiculos,
  crearVehiculoController,
  obtenerVehiculoController,
  actualizarVehiculoController,
  eliminarVehiculoController,
};