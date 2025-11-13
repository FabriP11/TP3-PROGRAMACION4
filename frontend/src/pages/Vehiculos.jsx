import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";

function Vehiculos() {
  const { token } = useAuth();
  const [vehiculos, setVehiculos] = useState([]);
  const [error, setError] = useState("");

  // Formulario de alta y edición
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
      if (!resp.ok || !data.ok) throw new Error(data.message || "Error al obtener vehículos");

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

  function cargarEnFormulario(vehiculo) {
    setEditandoId(vehiculo.id);
    setMarca(vehiculo.marca);
    setModelo(vehiculo.modelo);
    setPatente(vehiculo.patente);
    setAnio(vehiculo.anio);
    setCapacidad(vehiculo.capacidad_carga);
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
      if (!resp.ok || !data.ok) throw new Error(data.message || "Error al guardar vehículo");

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
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error(data.message || "Error al eliminar vehículo");

      await cargarVehiculos();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>Vehículos</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>{editandoId ? "Editar vehículo" : "Crear vehículo"}</h3>

      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div>
          <input
            placeholder="Marca"
            value={marca}
            onChange={(e) => setMarca(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            placeholder="Modelo"
            value={modelo}
            onChange={(e) => setModelo(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            placeholder="Patente"
            value={patente}
            onChange={(e) => setPatente(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            placeholder="Año"
            type="number"
            value={anio}
            onChange={(e) => setAnio(e.target.value)}
            required
          />
        </div>
        <div>
          <input
            placeholder="Capacidad de carga"
            type="number"
            value={capacidad}
            onChange={(e) => setCapacidad(e.target.value)}
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

      {vehiculos.length === 0 ? (
        <p>No hay vehículos cargados.</p>
      ) : (
        <table border="1" cellPadding="4">
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
                  <button onClick={() => cargarEnFormulario(v)}>Editar</button>
                  <button onClick={() => eliminarVehiculo(v.id)} style={{ marginLeft: "5px" }}>
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

export default Vehiculos;
