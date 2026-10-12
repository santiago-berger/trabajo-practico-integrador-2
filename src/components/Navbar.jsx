import { useState } from "react";
import { Link, useNavigate } from "react-router";

export const Navbar = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    setIsLoading(true);

    try {
      await fetch("http://localhost:3000/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch {
      console.error("No se pudo conectar con el servidor");
    } finally {
      localStorage.removeItem("isLogged");
      navigate("/login");
    }
  };

  return (
    <nav className="flex justify-between bg-blue-600 p-4 text-white">
      <Link to="/">Inicio</Link>
      <button
        onClick={handleLogout}
        disabled={isLoading}
        className="cursor-pointer"
      >
        {isLoading ? "Saliendo..." : "Cerrar sesión"}
      </button>
    </nav>
  );
};
