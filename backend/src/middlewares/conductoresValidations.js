const { body, param } = require("express-validator");

const validarCrearConductor = [
  body("nombre").notEmpty().withMessage("El nombre es obligatorio"),
  body("apellido").notEmpty().withMessage("El apellido es obligatorio"),
  body("dni").notEmpty().withMessage("El DNI es obligatorio"),
  body("licencia").notEmpty().withMessage("La licencia es obligatoria"),
  body("fecha_vencimiento_licencia")
    .isISO8601()
    .withMessage("La fecha de vencimiento tiene que tener un formato válido (YYYY-MM-DD)"),
];

const validarIdConductor = [
  param("id").isInt({ gt: 0 }).withMessage("El id tiene que ser un número entero positivo"),
];

const validarActualizarConductor = [
  ...validarIdConductor,
  ...validarCrearConductor,
];

module.exports = {
  validarCrearConductor,
  validarActualizarConductor,
  validarIdConductor,
};
