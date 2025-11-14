import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setCargando(true);

    try {
      const resp = await fetch("http://localhost:3000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error(data.message);

      login(data.token, data.usuario);
      navigate("/vehiculos");
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
        <h2>Login</h2>
      </header>

      <main className="page-content">
        <div className="card" style={{ maxWidth: "420px", margin: "0 auto" }}>
          
          <div className="card-header" style={{ textAlign: "center" }}>
            <h3 className="card-title">Ingresar al Sistema</h3>
          </div>

          <div className="card-body">

            {error && <p className="error-text">{error}</p>}

            <form
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center", 
                width: "100%"
              }}
            >
              <div style={{ width: "80%" }}>
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

              <div style={{ width: "80%", marginTop: "15px" }}>
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

              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <button className="btn btn-primary" type="submit">
                  {cargando ? "Ingresando..." : "Ingresar"}
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Login;
