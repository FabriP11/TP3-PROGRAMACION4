const { validationResult } = require("express-validator");

function validarCampos(req, res, next) {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.array().map((err) => ({
        campo: err.param,
        mensaje: err.msg,
      })),
    });
  }

  next();
}

module.exports = validarCampos;
