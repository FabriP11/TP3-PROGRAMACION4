import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Registro() {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setMensaje("");
    setCargando(true);

    try {
      const resp = await fetch("http://localhost:3000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, email, password }),
      });

      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error(data.message);

      setMensaje("Usuario registrado correctamente.");
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="page">
      <header className="page-header">
        <h2>Registro</h2>
      </header>

      <main className="page-content">
        <div className="card" style={{ maxWidth: "480px", margin: "0 auto" }}>
          
          <div className="card-header" style={{ textAlign: "center" }}>
            <h3 className="card-title">Crear Nueva Cuenta</h3>
          </div>

          <div className="card-body">
            {error && <p className="error-text">{error}</p>}
            {mensaje && <p className="success-text">{mensaje}</p>}

            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%"
              }}
            >
              
              <div style={{ width: "80%", marginBottom: "15px" }}>
                <label>Nombre</label>
                <input
                  type="text"
                  placeholder="Tu nombre"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  style={{ width: "100%" }}
                />
              </div>

              <div style={{ width: "80%", marginBottom: "15px" }}>
                <label>Email</label>
                <input
                  type="email"
                  placeholder="tu@correo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{ width: "100%" }}
                />
              </div>

              <div style={{ width: "80%", marginBottom: "15px" }}>
                <label>Contraseña</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  style={{ width: "100%" }}
                />
              </div>

              <div style={{ textAlign: "center" }}>
                <button className="btn btn-primary" type="submit">
                  {cargando ? "Registrando..." : "Registrarme"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Registro;

