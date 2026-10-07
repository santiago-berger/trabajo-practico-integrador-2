import { Link } from 'react-router'
import { useForm } from "../hooks/useForm"

export const LoginPage = () => {

    // crea el estado con los dos campos que pide el login del backend
    // solo se usan formState y handleInputChange
    const {formState, handleInputChange} = useForm({
        username: "", password: ""
    })

    // evita que el formulario recargue la pagina al enviarse
    const handleSubmit = (event) => {
        event.preventDefault()
    }

    return (

        // ejecuta handleSubmit al hacer clic en el botón o apretar Enter
        // value sale del estado y onChange lo actualiza en cada tecla
        // el name coincide con la clave del objeto para que handleInputChange sepa que campo cambiar
        <form onSubmit={handleSubmit} className="mx-auto mt-10 flex max-w-sm flex-col gap-3 p-4">
            <h1 className="text-2xl font-bold">Iniciar sesión</h1>

            <input name="username" placeholder="Usuario" value={formState.username} onChange={handleInputChange} className="rounded border p-2"/>
            <input name="password" type="password" placeholder="Contraseña" value={formState.password} onChange={handleInputChange} className="rounded border p-2"/>

            <button className="cursor-pointer rounded bg-blue-600 p-2 text-white">Ingresar</button>

            <Link to="/register" className="text-blue-600">¿No tenés cuenta? Registrate</Link>
        </form>  
    )
}