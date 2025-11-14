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
      if (!resp.ok || !data.ok)
        throw new Error(data.message || "Error al obtener conductores");

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
      if (!resp.ok || !data.ok)
        throw new Error(data.message || "Error al guardar conductor");

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
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error(data.message);

      await cargarConductores();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  return (
    <div className="page page-centered">
      <div className="page-header">
        <h2>Conductores</h2>
        <h3>{editandoId ? "Editar Conductor" : "Crear Conductor"}</h3>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="form-card">
        <form onSubmit={handleSubmit}>
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

          <label className="label-small">Vencimiento de la Licencia</label>
          <input
            type="date"
            value={fechaVenc}
            onChange={(e) => setFechaVenc(e.target.value)}
            required
          />

          <div className="form-actions">
            <button type="submit">
              {editandoId ? "Guardar cambios" : "Crear"}
            </button>

            {editandoId && (
              <button
                type="button"
                className="btn-cancel"
                onClick={limpiarFormulario}
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {conductores.length === 0 ? (
        <p>No hay conductores cargados.</p>
      ) : (
        <div className="table-card">
          <table>
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
                    <button className="btn btn-edit" onClick={() => cargarEnFormulario(c)}>
                      Editar
                    </button>

                    <button
                      className="btn btn-delete"
                      onClick={() => eliminarConductor(c.id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Conductores;
