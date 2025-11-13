import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUser = localStorage.getItem("usuario");

    if (savedToken) setToken(savedToken);
    if (savedUser) setUsuario(JSON.parse(savedUser));
  }, []);

  function login(tokenRecibido, usuarioRecibido) {
    setToken(tokenRecibido);
    setUsuario(usuarioRecibido);
    localStorage.setItem("token", tokenRecibido);
    localStorage.setItem("usuario", JSON.stringify(usuarioRecibido));
  }

  function logout() {
    setToken(null);
    setUsuario(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  }

  return (
    <AuthContext.Provider value={{ token, usuario, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

