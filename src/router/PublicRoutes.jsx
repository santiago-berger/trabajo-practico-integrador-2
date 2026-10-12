import { Navigate, Outlet } from "react-router";

export const PublicRoutes = () => {
  const isLogged = localStorage.getItem("isLogged") === "true";

  if (isLogged) return <Navigate to="/" />;

  return <Outlet />;
};
