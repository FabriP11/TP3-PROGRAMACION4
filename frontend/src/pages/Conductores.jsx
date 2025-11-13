import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";

function Conductores() {
  const { token } = useAuth();
  const [conductores, setConductores] = useState([]);
  const [error, setError] = useState("");

  // Formulario
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [licencia, setLicencia] = useState("");
  const [fechaVenc, setFechaVenc] = useState("");

  async function cargarConductores() {
    try {
      const resp = await fetch("http://localhost:3000/conductores", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error(data.message);

      setConductores(data.data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if (token) cargarConductores();
  }, [token]);

  async function handleCrear(e) {
    e.preventDefault();
    setError("");

    try {
      const resp = await fetch("http://localhost:3000/conductores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre,
          apellido,
          dni,
          licencia,
          fecha_vencimiento_licencia: fechaVenc,
        }),
      });

      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error(data.message);

      await cargarConductores();

      setNombre("");
      setApellido("");
      setDni("");
      setLicencia("");
      setFechaVenc("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>Conductores</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Crear conductor</h3>
      <form onSubmit={handleCrear} style={{ marginBottom: "20px" }}>
        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
        <input
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
        <input
          placeholder="DNI"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
          required
        />
        <input
          placeholder="Licencia"
          value={licencia}
          onChange={(e) => setLicencia(e.target.value)}
          required
        />
        <input
          type="date"
          value={fechaVenc}
          onChange={(e) => setFechaVenc(e.target.value)}
          required
        />
        <button type="submit">Crear</button>
      </form>

      {conductores.length === 0 ? (
        <p>No hay conductores cargados.</p>
      ) : (
        <table border="1" cellPadding="4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>DNI</th>
              <th>Licencia</th>
              <th>Vencimiento</th>
            </tr>
          </thead>
          <tbody>
            {conductores.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.nombre}</td>
                <td>{c.apellido}</td>
                <td>{c.dni}</td>
                <td>{c.licencia}</td>
                <td>{c.fecha_vencimiento_licencia?.slice(0, 10)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Conductores;

