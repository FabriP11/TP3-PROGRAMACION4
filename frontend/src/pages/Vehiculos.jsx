import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";

function Vehiculos() {
  const { token } = useAuth();
  const [vehiculos, setVehiculos] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargarVehiculos() {
      try {
        const resp = await fetch("http://localhost:3000/vehiculos", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await resp.json();

        if (!resp.ok || !data.ok) {
          throw new Error(data.message || "Error al obtener vehículos");
        }

        setVehiculos(data.data);
      } catch (err) {
        console.error(err);
        setError(err.message);
      }
    }

    if (token) {
      cargarVehiculos();
    }
  }, [token]);

  return (
    <div>
      <h2>Vehículos</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

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
