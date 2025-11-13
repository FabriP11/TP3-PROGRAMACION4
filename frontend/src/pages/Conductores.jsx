import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";

function Conductores() {
  const { token } = useAuth();
  const [conductores, setConductores] = useState([]);
  const [error, setError] = useState("");

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [dni, setDni] = useState("");
  const [licencia, setLicencia] = useState("");
  const [fechaVenc, setFechaVenc] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  async function cargarConductores() {
    try {
      const resp = await fetch("http://localhost:3000/conductores", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error(data.message || "Error al obtener conductores");

      setConductores(data.data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  useEffect(() => {
    if (token) cargarConductores();
  }, [token]);

  function limpiarFormulario() {
    setNombre("");
    setApellido("");
    setDni("");
    setLicencia("");
    setFechaVenc("");
    setEditandoId(null);
  }

  function cargarEnFormulario(c) {
    setEditandoId(c.id);
    setNombre(c.nombre);
    setApellido(c.apellido);
    setDni(c.dni);
    setLicencia(c.licencia);
    setFechaVenc(c.fecha_vencimiento_licencia?.slice(0, 10) || "");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const payload = {
      nombre,
      apellido,
      dni,
      licencia,
      fecha_vencimiento_licencia: fechaVenc,
    };

    const url = editandoId
      ? `http://localhost:3000/conductores/${editandoId}`
      : "http://localhost:3000/conductores";

    const method = editandoId ? "PUT" : "POST";

    try {
      const resp = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error(data.message || "Error al guardar conductor");

      await cargarConductores();
      limpiarFormulario();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  async function eliminarConductor(id) {
    if (!window.confirm("¿Eliminar este conductor?")) return;

    try {
      const resp = await fetch(`http://localhost:3000/conductores/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error(data.message || "Error al eliminar conductor");

      await cargarConductores();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>Conductores</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>{editandoId ? "Editar conductor" : "Crear conductor"}</h3>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div>
          <input
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            placeholder="DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            required
          />
        </div>

        <div>
          <input
            placeholder="Licencia"
            value={licencia}
            onChange={(e) => setLicencia(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Vencimiento licencia</label>
          <input
            type="date"
            value={fechaVenc}
            onChange={(e) => setFechaVenc(e.target.value)}
            required
          />
        </div>

        <button type="submit">
          {editandoId ? "Guardar cambios" : "Crear"}
        </button>
        {editandoId && (
          <button type="button" onClick={limpiarFormulario} style={{ marginLeft: "10px" }}>
            Cancelar
          </button>
        )}
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
              <th>Acciones</th>
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
                <td>
                  <button onClick={() => cargarEnFormulario(c)}>Editar</button>
                  <button
                    onClick={() => eliminarConductor(c.id)}
                    style={{ marginLeft: "5px" }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Conductores;
