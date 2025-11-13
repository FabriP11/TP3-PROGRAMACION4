const passport = require("passport");
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");
const { buscarUsuarioPorId } = require("../models/usuarioModel");

function configurarPassport() {
  const opciones = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  };

  const estrategia = new JwtStrategy(opciones, async (payload, done) => {
    try {
      const usuario = await buscarUsuarioPorId(payload.id);
      if (!usuario) {
        return done(null, false);
      }

      const usuarioLimpiado = {
        id: usuario.id,
        nombre: usuario.nombre,
        email: usuario.email,
      };

      return done(null, usuarioLimpiado);
    } catch (error) {
      return done(error, false);
    }
  });

  passport.use(estrategia);
}

function inicializarPassport(app) {
  configurarPassport();
  app.use(passport.initialize());
}

const protegerRuta = passport.authenticate("jwt", { session: false });

module.exports = {
  inicializarPassport,
  protegerRuta,
};
