function HomePage() {
  return (
    <div className="page" style={{ textAlign: "center" }}>
      <h1 style={{ fontSize: "3rem", marginTop: "40px" }}>
        TP3 – Programación IV
      </h1>

      <p style={{ fontSize: "1.4rem", marginTop: "10px", opacity: 0.8 }}>
        Sistema de gestión de vehículos, conductores y viajes.
      </p>

      <p style={{ fontSize: "1rem", marginTop: "10px", opacity: 0.8 }}>
        Ponce, Fabricio Nicolas - 39.701.035 - Legajo 7437
      </p>

      <div style={{ marginTop: "40px" }}>
        <a href="/login" className="btn btn-primary" style={{ marginRight: "15px" }}>
          Iniciar sesión
        </a>

        <a href="/registro" className="btn btn-secondary">
          Registrarme
        </a>
      </div>
    </div>
  );
}

export default HomePage;
