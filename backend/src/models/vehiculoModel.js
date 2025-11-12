const { getDB } = require("../../database");

async function obtenerVehiculos() {
  const db = getDB();
  const [rows] = await db.query("SELECT * FROM vehiculos");
  return rows;
}

async function crearVehiculo({ marca, modelo, patente, anio, capacidad_carga }) {
  const db = getDB();
  const [result] = await db.query(
    `INSERT INTO vehiculos (marca, modelo, patente, anio, capacidad_carga)
     VALUES (?, ?, ?, ?, ?)`,
    [marca, modelo, patente, anio, capacidad_carga]
  );

  const [rows] = await db.query("SELECT * FROM vehiculos WHERE id = ?", [result.insertId]);
  return rows[0];
}

async function obtenerVehiculoPorId(id) {
  const db = getDB();
  const [rows] = await db.query("SELECT * FROM vehiculos WHERE id = ?", [id]);
  return rows[0] || null;
}

async function actualizarVehiculo(id, { marca, modelo, patente, anio, capacidad_carga }) {
  const db = getDB();

  await db.query(
    `UPDATE vehiculos
     SET marca = ?, modelo = ?, patente = ?, anio = ?, capacidad_carga = ?
     WHERE id = ?`,
    [marca, modelo, patente, anio, capacidad_carga, id]
  );

  const [rows] = await db.query("SELECT * FROM vehiculos WHERE id = ?", [id]);
  return rows[0] || null;
}

async function eliminarVehiculo(id) {
  const db = getDB();
  const [result] = await db.query("DELETE FROM vehiculos WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = {
  obtenerVehiculos,
  crearVehiculo,
  obtenerVehiculoPorId,
  actualizarVehiculo,
  eliminarVehiculo,
};