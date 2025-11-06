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

module.exports = {
  obtenerVehiculos,
  crearVehiculo,
};