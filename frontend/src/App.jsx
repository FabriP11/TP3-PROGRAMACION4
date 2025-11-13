import { Routes, Route, Link, Navigate } from "react-router-dom";
import { useAuth } from "./context/useAuth";

import Login from "./pages/Login";
import Registro from "./pages/Registro";
import Vehiculos from "./pages/Vehiculos";
import Conductores from "./pages/Conductores";
import Viajes from "./pages/Viajes";

function App() {
  const { token, usuario, logout } = useAuth();

  return (
    <div>
      {/* Navbar simple */}
      <nav style={{ padding: "10px", borderBottom: "1px solid #ccc", marginBottom: "20px" }}>
        <Link to="/" style={{ marginRight: "10px" }}>
          Inicio
        </Link>
        {token && (
          <>
            <Link to="/vehiculos" style={{ marginRight: "10px" }}>
              Vehículos
            </Link>
            <Link to="/conductores" style={{ marginRight: "10px" }}>
              Conductores
            </Link>
            <Link to="/viajes" style={{ marginRight: "10px" }}>
              Viajes
            </Link>
          </>
        )}
        {!token && (
          <>
            <Link to="/login" style={{ marginRight: "10px" }}>
              Login
            </Link>
            <Link to="/registro">Registro</Link>
          </>
        )}

        {token && (
          <span style={{ float: "right" }}>
            {usuario ? `Hola, ${usuario.nombre}` : ""}{" "}
            <button onClick={logout}>Salir</button>
          </span>
        )}
      </nav>

      <Routes>
        <Route path="/" element={<h1>TP3 - Programación IV</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        {/* Rutas protegidas: si no hay token, redirige a login */}
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
  );
}

export default App;

