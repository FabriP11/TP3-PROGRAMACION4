import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Vehiculos() {
  const { token } = useAuth();
  const [vehiculos, setVehiculos] = useState([]);
  const [error, setError] = useState("");

  const [marca, setMarca] = useState("");
  const [modelo, setModelo] = useState("");
  const [patente, setPatente] = useState("");
  const [anio, setAnio] = useState("");
  const [capacidad, setCapacidad] = useState("");

  async function cargarVehiculos() {
    try {
      const resp = await fetch("http://localhost:3000/vehiculos", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error(data.message);

      setVehiculos(data.data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if (token) cargarVehiculos();
  }, [token]);

  async function handleCrear(e) {
    e.preventDefault();
    setError("");

    try {
      const resp = await fetch("http://localhost:3000/vehiculos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          marca,
          modelo,
          patente,
          anio,
          capacidad_carga: capacidad,
        }),
      });

      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error(data.message);

      // Recargar lista  
      cargarVehiculos();

      // Resetear form
      setMarca("");
      setModelo("");
      setPatente("");
      setAnio("");
      setCapacidad("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>Vehículos</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Crear vehículo</h3>
      <form onSubmit={handleCrear} style={{ marginBottom: "20px" }}>
        <input placeholder="Marca" value={marca} onChange={(e)=>setMarca(e.target.value)} required />
        <input placeholder="Modelo" value={modelo} onChange={(e)=>setModelo(e.target.value)} required />
        <input placeholder="Patente" value={patente} onChange={(e)=>setPatente(e.target.value)} required />
        <input placeholder="Año" type="number" value={anio} onChange={(e)=>setAnio(e.target.value)} required />
        <input placeholder="Capacidad" type="number" value={capacidad} onChange={(e)=>setCapacidad(e.target.value)} required />
        <button type="submit">Crear</button>
      </form>

      {/* Tabla */}
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
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Vehiculos;
