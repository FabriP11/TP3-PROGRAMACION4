import { useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";

function Viajes() {
  const { token } = useAuth();
  const [viajes, setViajes] = useState([]);
  const [error, setError] = useState("");

  // Para futuros combos (opcional)
  const [vehiculos, setVehiculos] = useState([]);
  const [conductores, setConductores] = useState([]);

  // Form
  const [vehiculoId, setVehiculoId] = useState("");
  const [conductorId, setConductorId] = useState("");
  const [fechaSalida, setFechaSalida] = useState("");
  const [fechaLlegada, setFechaLlegada] = useState("");
  const [origen, setOrigen] = useState("");
  const [destino, setDestino] = useState("");
  const [km, setKm] = useState("");
  const [obs, setObs] = useState("");

  async function cargarViajes() {
    try {
      const resp = await fetch("http://localhost:3000/viajes", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error(data.message);

      setViajes(data.data);
    } catch (err) {
      setError(err.message);
    }
  }

  async function cargarVehiculosYConductores() {
    try {
      const [respV, respC] = await Promise.all([
        fetch("http://localhost:3000/vehiculos", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
        fetch("http://localhost:3000/conductores", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }),
      ]);

      const dataV = await respV.json();
      const dataC = await respC.json();

      if (!respV.ok || !dataV.ok) throw new Error(dataV.message);
      if (!respC.ok || !dataC.ok) throw new Error(dataC.message);

      setVehiculos(dataV.data);
      setConductores(dataC.data);
    } catch (err) {
      setError(err.message);
    }
  }

  useEffect(() => {
    if (token) {
      cargarViajes();
      cargarVehiculosYConductores();
    }
  }, [token]);

  async function handleCrear(e) {
    e.preventDefault();
    setError("");

    try {
      const resp = await fetch("http://localhost:3000/viajes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          vehiculo_id: Number(vehiculoId),
          conductor_id: Number(conductorId),
          fecha_salida: fechaSalida,
          fecha_llegada: fechaLlegada,
          origen,
          destino,
          kilometros: Number(km),
          observaciones: obs,
        }),
      });

      const data = await resp.json();
      if (!resp.ok || !data.ok) throw new Error(data.message);

      await cargarViajes();

      setVehiculoId("");
      setConductorId("");
      setFechaSalida("");
      setFechaLlegada("");
      setOrigen("");
      setDestino("");
      setKm("");
      setObs("");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <div>
      <h2>Viajes</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}

      <h3>Crear viaje</h3>
      <form onSubmit={handleCrear} style={{ marginBottom: "20px" }}>
        <div>
          <label>Vehículo</label>
          <select
            value={vehiculoId}
            onChange={(e) => setVehiculoId(e.target.value)}
            required
          >
            <option value="">Seleccioná un vehículo</option>
            {vehiculos.map((v) => (
              <option key={v.id} value={v.id}>
                {v.id} - {v.marca} {v.modelo} ({v.patente})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Conductor</label>
          <select
            value={conductorId}
            onChange={(e) => setConductorId(e.target.value)}
            required
          >
            <option value="">Seleccioná un conductor</option>
            {conductores.map((c) => (
              <option key={c.id} value={c.id}>
                {c.id} - {c.nombre} {c.apellido}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Fecha salida</label>
          <input
            type="datetime-local"
            value={fechaSalida}
            onChange={(e) => setFechaSalida(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Fecha llegada</label>
          <input
            type="datetime-local"
            value={fechaLlegada}
            onChange={(e) => setFechaLlegada(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Origen</label>
          <input
            value={origen}
            onChange={(e) => setOrigen(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Destino</label>
          <input
            value={destino}
            onChange={(e) => setDestino(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Kilómetros</label>
          <input
            type="number"
            value={km}
            onChange={(e) => setKm(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Observaciones</label>
          <textarea
            value={obs}
            onChange={(e) => setObs(e.target.value)}
          />
        </div>

        <button type="submit">Crear viaje</button>
      </form>

      {viajes.length === 0 ? (
        <p>No hay viajes cargados.</p>
      ) : (
        <table border="1" cellPadding="4">
          <thead>
            <tr>
              <th>ID</th>
              <th>Vehículo</th>
              <th>Conductor</th>
              <th>Salida</th>
              <th>Llegada</th>
              <th>Origen</th>
              <th>Destino</th>
              <th>Kms</th>
              <th>Obs</th>
            </tr>
          </thead>
          <tbody>
            {viajes.map((v) => (
              <tr key={v.id}>
                <td>{v.id}</td>
                <td>{v.vehiculo_id}</td>
                <td>{v.conductor_id}</td>
                <td>{v.fecha_salida}</td>
                <td>{v.fecha_llegada}</td>
                <td>{v.origen}</td>
                <td>{v.destino}</td>
                <td>{v.kilometros}</td>
                <td>{v.observaciones}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Viajes;
