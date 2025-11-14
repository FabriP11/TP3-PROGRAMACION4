import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";
import "./App.css";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Vehiculos from "./pages/Vehiculos";
import Conductores from "./pages/Conductores";
import Viajes from "./pages/Viajes";

function App() {
  const { token, usuario, logout } = useAuth();

  return (
    <div className="app-root">
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/">Inicio</Link>

          {token && (
            <>
              <Link to="/vehiculos">Vehículos</Link>
              <Link to="/conductores">Conductores</Link>
              <Link to="/viajes">Viajes</Link>
            </>
          )}

          {!token && (
            <>
              <Link to="/login">Login</Link>
              <Link to="/registro">Registro</Link>
            </>
          )}
        </div>

        {token && (
          <div className="navbar-right">
            <span className="navbar-user">
              {usuario ? `Hola, ${usuario.nombre}` : ""}
            </span>
            <button className="btn btn-logout" onClick={logout}>
              Salir
            </button>
          </div>
        )}
      </nav>

      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          <Route
            path="/vehiculos"
            element={token ? <Vehiculos /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/conductores"
            element={token ? <Conductores /> : <Navigate to="/login" replace />}
          />
          <Route
            path="/viajes"
            element={token ? <Viajes /> : <Navigate to="/login" replace />}
          />

          <Route path="*" element={<h2>Página no encontrada</h2>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
