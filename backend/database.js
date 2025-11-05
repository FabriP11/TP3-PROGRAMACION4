const mysql = require("mysql2/promise");

let pool = null;

async function conectarDB() {
  try {
    pool = await mysql.createPool({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
    });

    await pool.query("SELECT 1");
    console.log("Conexión exitosa");
  } catch (error) {
    console.error("Error al conectar:", error.message);
    process.exit(1);
  }
}

function getDB() {
  if (!pool) {
    throw new Error("La conexión a la base de datos no está inicializada. Llamá a conectarDB() antes.");
  }
  return pool;
}

module.exports = {
  conectarDB,
  getDB,
};
