// componentes de react-router para manejar la navegacion entre paginas
// BrowserRouter usa la url del navegador para saber que pagina mostrar
// Routes agrupa todas las rutas y elige cual mostrar segun la url actual
// Route define una ruta, que url le corresponde a que componente
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

// paginas de la aplicacion, cada una se muestra en una ruta distinta
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { RegisterPage } from "../pages/RegisterPage";
import { PublicRoutes } from "./PublicRoutes";
import { PrivateRoutes } from "./PrivateRoutes";

// componente que define todas las rutas de la aplicacion
// se usa una sola vez, en el punto de entrada, para envolver toda la app
export const AppRouter = () => {
  return (
    // BrowserRouter tiene que envolver todo lo que use navegacion
    // gracias a el, los Link cambian la url sin recargar la pagina y react solo cambia el componente que se ve
    <BrowserRouter>
      {/* Routes mira la url actual y dibuja solo el Route cuyo path coincide */}
      <Routes>
        <Route element={<PublicRoutes />}>
          {/* path es la url y element es el componente que se dibuja cuando la url coincide */}
          {/* en /login se muestra el formulario de inicio de sesion */}
          <Route path="/login" element={<LoginPage />} />

          {/* en /register se muestra el formulario de registro */}
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          {/* en / que es la pagina principal, se muestra la Navbar arriba y la HomePage abajo */}
          <Route
            path="/"
            element={
              <>
                <HomePage />
              </>
            }
          />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};
