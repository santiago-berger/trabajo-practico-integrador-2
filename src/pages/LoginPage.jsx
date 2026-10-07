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
        <form onSubmit={handleSubmit}>
            <h1>Iniciar sesión</h1>

            <input name="username" placeholder="Usuario" value={formState.username} onChange={handleInputChange}/>
            <input name="password" type="password" placeholder="Contraseña" value={formState.password} onChange={handleInputChange}/>

            <button>Ingresar</button>

            <Link to="/register">¿No tenés cuenta? Registrate</Link>
        </form>  
    )
}