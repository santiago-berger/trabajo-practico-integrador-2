// componente de react-router para navegar entre paginas sin recargar el navegador
import { Link, useNavigate } from "react-router";

import { useForm } from "../hooks/useForm";

import { useState } from "react";

// lista de campos del formulario, definida afuera del componente porque no cambia
// asi no se vuelve a crear en cada render y se evita repetir el mismo input
// cada objeto describe un input
// name es la clave del campo, tiene que coincidir con la clave del objeto inicial de useForm y con lo que espera el backend
// placeholder es lo que se ve dentro del input cuando esta vacio
// type es opcional, si no se pone se usa text
const fields = [
  { name: "username", placeholder: "Usuario" },
  // type email hace que el navegador valide que tenga formato de email al enviar el formulario
  { name: "email", placeholder: "Email", type: "email" },
  // type password oculta los caracteres que se escriben
  { name: "password", placeholder: "Contraseña", type: "password" },
  { name: "first_name", placeholder: "Nombre" },
  { name: "last_name", placeholder: "Apellido" },
];

// componente de la pagina de registro, se exporta para usarlo en las rutas
export const RegisterPage = () => {
  // se llama al hook con los valores iniciales, todos los campos empiezan vacios
  // con desestructuracion de objetos se toman solo las dos cosas que se necesitan
  // formState es el objeto con lo que tiene escrito cada campo
  // handleInputChange es la funcion que actualiza formState cada vez que el usuario escribe en un input
  const { formState, handleInputChange, handleReset } = useForm({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
  });

  const [errors, setErrors] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  // funcion que se ejecuta cuando se envia el formulario, ya sea con el boton o apretando enter en un input
  const handleSubmit = async (event) => {
    // por defecto un form html recarga la pagina al enviarse, preventDefault lo evita
    // asi la aplicacion de react no se reinicia y no se pierde el estado
    event.preventDefault();

    setIsLoading(true);

    setErrors([]);

    try {
      const response = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        handleReset();
        navigate("/login");
      } else if (response.status === 400) {
        setErrors(data.errors);
      } else if (response.status === 401 || response.status === 403) {
        setErrors(["No tenés permisos para registrarte"]);
      } else {
        setErrors(["Error en el servidor, intentá más tarde"]);
      }
    } catch {
      setErrors(["No se pudo conectar con el servidor"]);
    } finally {
      setIsLoading(false);
    }
  };

  // lo que devuelve el componente es el jsx que se dibuja en pantalla
  return (
    // onSubmit conecta el envio del formulario con handleSubmit
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-10 flex max-w-sm flex-col gap-3 p-4"
    >
      <h1 className="text-2xl font-bold">Registrarse</h1>

      {errors.map((error) => (
        <p key={error} className="text-red-600">
          {error}
        </p>
      ))}

      {/* map recorre el array fields y por cada campo devuelve un <input>, el resultado es un array de inputs que react dibuja uno abajo del otro */}
      {fields.map((field) => (
        <input
          // key es obligatorio cuando se renderiza una lista, react lo usa para identificar cada elemento entre renders
          // se usa name porque es unico en cada campo
          key={field.name}
          // name es lo que handleInputChange lee con event.target.name para saber que campo de formState actualizar
          name={field.name}
          // operador ?? si field.type es undefined o null se usa text
          type={field.type ?? "text"}
          placeholder={field.placeholder}
          // el valor que se muestra sale siempre de formState
          // formState[field.name] usa corchetes para leer la propiedad cuyo nombre esta en la variable
          value={formState[field.name]}
          // cada tecla dispara onChange, handleInputChange guarda el texto nuevo en formState y react vuelve a dibujar el input con ese valor
          onChange={handleInputChange}
          className="rounded border p-2"
        />
      ))}

      {/* un button dentro de un form es de tipo submit por defecto, al hacer click dispara onSubmit del form */}
      <button
        disabled={isLoading}
        className="cursor-pointer rounded bg-blue-600 p-2 text-white disabled:opacity-50"
      >
        {isLoading ? "Cargando..." : "Registrarme"}
      </button>

      {/* Link cambia la url a /login sin recargar la pagina, para el usuario que ya tiene cuenta */}
      <Link to="/login" className="text-blue-600">
        ¿Ya tenés cuenta? Iniciá sesión
      </Link>
    </form>
  );
};
