import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";

function Vehiculos() {
  const { token } = useAuth();
  const [vehiculos, setVehiculos] = useState([]);
  const [error, setError] = useState("");

  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [patente, setPatente] = useState("");
  const [anio, setAnio] = useState("");
  const [capacidad, setCapacidad] = useState("");
  const [editandoId, setEditandoId] = useState(null);

  async function cargarVehiculos() {
    try {
      const resp = await fetch("http://localhost:3000/vehiculos", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await resp.json();
      if (!resp.ok || !data.ok)
        throw new Error(data.message || "Error al obtener vehículos");

      setVehiculos(data.data);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  useEffect(() => {
    if (token) cargarVehiculos();
  }, [token]);

  function limpiarFormulario() {
    setMarca("");
    setModelo("");
    setPatente("");
    setAnio("");
    setCapacidad("");
    setEditandoId(null);
  }

  function cargarEnFormulario(v) {
    setEditandoId(v.id);
    setMarca(v.marca);
    setModelo(v.modelo);
    setPatente(v.patente);
    setAnio(v.anio);
    setCapacidad(v.capacidad_carga);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    const payload = {
      marca,
      modelo,
      patente,
      anio: Number(anio),
      capacidad_carga: Number(capacidad),
    };

    const url = editandoId
      ? `http://localhost:3000/vehiculos/${editandoId}`
      : "http://localhost:3000/vehiculos";

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
        throw new Error(data.message || "Error al guardar vehículo");

      await cargarVehiculos();
      limpiarFormulario();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  async function eliminarVehiculo(id) {
    if (!window.confirm("¿Eliminar este vehículo?")) return;

    try {
      const resp = await fetch(`http://localhost:3000/vehiculos/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error(data.message);

      await cargarVehiculos();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  return (
    <div className="page page-centered">
      <div className="page-header">
        <h2>Vehículos</h2>
        <h3>{editandoId ? "Editar Vehículo" : "Crear Vehículo"}</h3>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="form-card">
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            required
          />

          <input
            placeholder="Modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            required
          />

          <input
            placeholder="Patente"
            value={patente}
            onChange={(e) => setPatente(e.target.value)}
            required
          />

          <input
            placeholder="Año"
            type="number"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            required
          />

          <input
            placeholder="Capacidad de carga"
            type="number"
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
            required
          />

          <div className="form-actions">
            <button type="submit">
              {editandoId ? "Guardar cambios" : "Crear"}
            </button>

            {editandoId && (
              <button
                type="button"
                onClick={limpiarFormulario}
                className="btn-cancel"
              >
                Cancelar
              </button>
            )}
          </div>
        </form>
      </div>

      {vehiculos.length === 0 ? (
        <p>No hay vehículos cargados.</p>
      ) : (
        <div className="table-card">
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Marca</th>
                <th>Modelo</th>
                <th>Patente</th>
                <th>Año</th>
                <th>Capacidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {vehiculos.map((v) => (
                <tr key={v.id}>
                  <td>{v.id}</td>
                  <td>{v.marca}</td>
                  <td>{v.modelo}</td>
                  <td>{v.patente}</td>
                  <td>{v.anio}</td>
                  <td>{v.capacidad_carga}</td>
                  <td>
                    <button
                      className="btn btn-edit"
                      onClick={() => cargarEnFormulario(v)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-delete"
                      onClick={() => eliminarVehiculo(v.id)}
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

export default Vehiculos;

