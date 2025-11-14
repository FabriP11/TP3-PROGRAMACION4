/*Crear base de datos*/
CREATE DATABASE IF NOT EXISTS tp3_programacion4;
USE tp3_programacion4;

/*Tabla de usuarios*/
CREATE TABLE IF NOT EXISTS usuarios (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  creado_en TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

/*Tabla de vehículos*/
CREATE TABLE IF NOT EXISTS vehiculos (
  id INT AUTO_INCREMENT PRIMARY KEY,
  marca VARCHAR(100) NOT NULL,
  modelo VARCHAR(100) NOT NULL,
  patente VARCHAR(20) NOT NULL UNIQUE,
  anio INT NOT NULL,
  capacidad_carga DECIMAL(10,2) NOT NULL
);

/*Tabla de conductores*/
CREATE TABLE IF NOT EXISTS conductores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  apellido VARCHAR(100) NOT NULL,
  dni VARCHAR(20) NOT NULL UNIQUE,
  licencia VARCHAR(50) NOT NULL,
  fecha_vencimiento_licencia DATE NOT NULL
);

/*Tabla de viajes*/
CREATE TABLE IF NOT EXISTS viajes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  vehiculo_id INT NOT NULL,
  conductor_id INT NOT NULL,
  fecha_salida DATETIME NOT NULL,
  fecha_llegada DATETIME NOT NULL,
  origen VARCHAR(150) NOT NULL,
  destino VARCHAR(150) NOT NULL,
  kilometros DECIMAL(10,2) NOT NULL,
  observaciones TEXT,
  CONSTRAINT fk_viajes_vehiculo
    FOREIGN KEY (vehiculo_id) REFERENCES vehiculos(id),
  CONSTRAINT fk_viajes_conductor
    FOREIGN KEY (conductor_id) REFERENCES conductores(id)
);

SHOW TABLES;
SELECT * FROM usuarios;
SELECT * FROM vehiculos;
SELECT * FROM conductores;