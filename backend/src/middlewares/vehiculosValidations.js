const { body, param } = require("express-validator");

const validarCrearVehiculo = [
  body("marca").notEmpty().withMessage("La marca es obligatoria"),
  body("modelo").notEmpty().withMessage("El modelo es obligatorio"),
  body("patente").notEmpty().withMessage("La patente es obligatoria"),
  body("anio")
    .isInt({ min: 1900, max: 2100 })
    .withMessage("El anio debe ser un número válido"),
  body("capacidad_carga")
    .isFloat({ gt: 0 })
    .withMessage("La capacidad de carga tiene que ser un número mayor a 0"),
];

const validarIdVehiculo = [
  param("id").isInt({ gt: 0 }).withMessage("El id debe ser un número entero positivo"),
];

const validarActualizarVehiculo = [
  ...validarIdVehiculo,
  body("marca").notEmpty().withMessage("La marca es obligatoria"),
  body("modelo").notEmpty().withMessage("El modelo es obligatorio"),
  body("patente").notEmpty().withMessage("La patente es obligatoria"),
  body("anio")
    .isInt({ min: 1900, max: 2100 })
    .withMessage("El anio debe ser un número válido"),
  body("capacidad_carga")
    .isFloat({ gt: 0 })
    .withMessage("La capacidad de carga tiene que ser un número mayor a 0"),
];

module.exports = {
  validarCrearVehiculo,
  validarActualizarVehiculo,
  validarIdVehiculo,
};
