const { getDB } = require("../../database");

//Obtener todos los viajes
async function obtenerViajes() {
  const db = getDB();
  const [rows] = await db.query(`
    SELECT v.*, 
           vehiculos.marca, vehiculos.modelo, vehiculos.patente,
           conductores.nombre AS nombre_conductor, conductores.apellido AS apellido_conductor
    FROM viajes v
    JOIN vehiculos ON v.vehiculo_id = vehiculos.id
    JOIN conductores ON v.conductor_id = conductores.id
  `);
  return rows;
}

//Obtener viaje por id
async function obtenerViajePorId(id) {
  const db = getDB();
  const [rows] = await db.query(
    `SELECT v.*, 
            vehiculos.marca, vehiculos.modelo, vehiculos.patente,
            conductores.nombre AS nombre_conductor, conductores.apellido AS apellido_conductor
     FROM viajes v
     JOIN vehiculos ON v.vehiculo_id = vehiculos.id
     JOIN conductores ON v.conductor_id = conductores.id
     WHERE v.id = ?`,
    [id]
  );
  return rows[0] || null;
}

//Crear viaje
async function crearViaje({
  vehiculo_id,
  conductor_id,
  fecha_salida,
  fecha_llegada,
  origen,
  destino,
  kilometros,
  observaciones,
}) {
  const db = getDB();
  const [result] = await db.query(
    `INSERT INTO viajes 
     (vehiculo_id, conductor_id, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [vehiculo_id, conductor_id, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones]
  );

  const [rows] = await db.query("SELECT * FROM viajes WHERE id = ?", [result.insertId]);
  return rows[0];
}

//Actualizar viaje
async function actualizarViaje(
  id,
  { vehiculo_id, conductor_id, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones }
) {
  const db = getDB();

  await db.query(
    `UPDATE viajes
     SET vehiculo_id = ?, 
         conductor_id = ?, 
         fecha_salida = ?, 
         fecha_llegada = ?, 
         origen = ?, 
         destino = ?, 
         kilometros = ?, 
         observaciones = ?
     WHERE id = ?`,
    [vehiculo_id, conductor_id, fecha_salida, fecha_llegada, origen, destino, kilometros, observaciones, id]
  );

  const [rows] = await db.query("SELECT * FROM viajes WHERE id = ?", [id]);
  return rows[0] || null;
}

//Eliminar viaje
async function eliminarViaje(id) {
  const db = getDB();
  const [result] = await db.query("DELETE FROM viajes WHERE id = ?", [id]);
  return result.affectedRows > 0;
}

module.exports = {
  obtenerViajes,
  obtenerViajePorId,
  crearViaje,
  actualizarViaje,
  eliminarViaje,
};
