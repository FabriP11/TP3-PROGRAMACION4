const {
  obtenerVehiculos,
  crearVehiculo,
} = require("../models/vehiculoModel");

//GET vehiculos
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

//POST vehiculos
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

module.exports = {
  listarVehiculos,
  crearVehiculoController,
};