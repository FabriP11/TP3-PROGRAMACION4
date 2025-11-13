const { getDB } = require("../../database");

//Buscar usuario por email
async function buscarUsuarioPorEmail(email) {
  const db = getDB();
  const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [email]);
  return rows[0] || null;
}

//Buscar usuario por id
async function buscarUsuarioPorId(id) {
  const db = getDB();
  const [rows] = await db.query("SELECT * FROM usuarios WHERE id = ?", [id]);
  return rows[0] || null;
}

//Crear usuario nuevo
async function crearUsuario({ nombre, email, passwordHash }) {
  const db = getDB();
  const [result] = await db.query(
    `INSERT INTO usuarios (nombre, email, password_hash)
     VALUES (?, ?, ?)`,
    [nombre, email, passwordHash]
  );

  const [rows] = await db.query("SELECT id, nombre, email, creado_en FROM usuarios WHERE id = ?", [
    result.insertId,
  ]);
  return rows[0];
}

module.exports = {
  buscarUsuarioPorEmail,
  buscarUsuarioPorId,
  crearUsuario,
};
