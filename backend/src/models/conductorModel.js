const { getDB } = require("../../database");

//Obtener todos los conductores
async function obtenerConductores() {
  const db = getDB();
  const [rows] = await db.query("SELECT * FROM conductores");
  return rows;
}

//Crear un conductor
async function crearConductor({ nombre, apellido, dni, licencia, fecha_vencimiento_licencia }) {
  const db = getDB();
  const [result] = await db.query(
    `INSERT INTO conductores (nombre, apellido, dni, licencia, fecha_vencimiento_licencia)
     VALUES (?, ?, ?, ?, ?)`,
    [nombre, apellido, dni, licencia, fecha_vencimiento_licencia]
  );

  const [rows] = await db.query("SELECT * FROM conductores WHERE id = ?", [result.insertId]);
  return rows[0];
}

//Obtener un conductor por id
async function obtenerConductorPorId(id) {
  const db = getDB();
  const [rows] = await db.query("SELECT * FROM conductores WHERE id = ?", [id]);
  return rows[0] || null;
}

//Actualizar un conductor
async function actualizarConductor(id, { nombre, apellido, dni, licencia, fecha_vencimiento_licencia }) {
  const db = getDB();

  await db.query(
    `UPDATE conductores
     SET nombre = ?, apellido = ?, dni = ?, licencia = ?, fecha_vencimiento_licencia = ?
     WHERE id = ?`,
    [nombre, apellido, dni, licencia, fecha_vencimiento_licencia, id]
  );

  const [rows] = await db.query("SELECT * FROM conductores WHERE id = ?", [id]);
  return rows[0] || null;
}

//Eliminar conductor
async function eliminarConductor(id) {
  const db = getDB();
  const [result] = await db.query("DELETE FROM conductores WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = {
  obtenerConductores,
  crearConductor,
  obtenerConductorPorId,
  actualizarConductor,
  eliminarConductor,
};
