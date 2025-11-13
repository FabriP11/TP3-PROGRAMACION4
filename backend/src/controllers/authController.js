const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {
  buscarUsuarioPorEmail,
  crearUsuario,
} = require("../models/usuarioModel");

//POST /auth/register
async function registrarUsuario(req, res) {
  try {
    const { nombre, email, password } = req.body;

    if (!nombre || !email || !password) {
      return res.status(400).json({
        ok: false,
        message: "Nombre, email y contraseña son obligatorios",
      });
    }

    const existente = await buscarUsuarioPorEmail(email);
    if (existente) {
      return res.status(400).json({
        ok: false,
        message: "Ya existe un usuario registrado con este email",
      });
    }

    const passwordHash = await bcrypt.hash(password, 10);

    const nuevoUsuario = await crearUsuario({
      nombre,
      email,
      passwordHash,
    });

    res.status(201).json({
      ok: true,
      message: "Usuario registrado correctamente",
      data: nuevoUsuario,
    });
  } catch (error) {
    console.error("Error en registrarUsuario:", error);
    res.status(500).json({
      ok: false,
      message: "Error interno al registrar usuario",
    });
  }
}

//POST /auth/login
async function loginUsuario(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        ok: false,
        message: "El email y contraseña son obligatorios",
      });
    }

    const usuario = await buscarUsuarioPorEmail(email);
    if (!usuario) {
      return res.status(401).json({
        ok: false,
        message: "Credenciales inválidas",
      });
    }

    const passwordValida = await bcrypt.compare(password, usuario.password_hash);
    if (!passwordValida) {
      return res.status(401).json({
        ok: false,
        message: "Credenciales inválidas",
      });
    }

    const payload = {
      id: usuario.id,
      email: usuario.email,
      nombre: usuario.nombre,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "4h",
    });

    res.json({
      ok: true,
      message: "Login exitoso",
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
      },
    });
  } catch (error) {
    console.error("Error en loginUsuario:", error);
    res.status(500).json({
      ok: false,
      message: "Error interno al iniciar sesión",
    });
  }
}

module.exports = {
  registrarUsuario,
  loginUsuario,
};
