const { body, param } = require("express-validator");

const validarCrearViaje = [
  body("vehiculo_id")
    .isInt({ gt: 0 })
    .withMessage("vehiculo_id tiene que ser un id numérico"),
  body("conductor_id")
    .isInt({ gt: 0 })
    .withMessage("conductor_id tiene que ser un id numérico"),
  body("fecha_salida")
    .isISO8601()
    .withMessage("fecha_salida tiene que ser una fecha válida"),
  body("fecha_llegada")
    .isISO8601()
    .withMessage("fecha_llegada tiene que ser una fecha válida"),
  body("origen").notEmpty().withMessage("El origen es obligatorio"),
  body("destino").notEmpty().withMessage("El destino es obligatorio"),
  body("kilometros")
    .isFloat({ gt: 0 })
    .withMessage("Los kilómetros tienen que ser un número mayor a 0"),
];

const validarIdViaje = [
  param("id").isInt({ gt: 0 }).withMessage("El id tiene que ser un número entero positivo"),
];

const validarActualizarViaje = [
  ...validarIdViaje,
  ...validarCrearViaje,
];

module.exports = {
  validarCrearViaje,
  validarActualizarViaje,
  validarIdViaje,
};
