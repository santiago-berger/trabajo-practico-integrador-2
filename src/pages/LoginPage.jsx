import { Link, useNavigate } from 'react-router'
import { useForm } from "../hooks/useForm"
import { useState } from 'react'

export const LoginPage = () => {

    // crea el estado con los dos campos que pide el login del backend
    // solo se usan formState y handleInputChange
    const {formState, handleInputChange} = useForm({
        username: "", password: ""
    })

    const [errors, setErrors] = useState([])

    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()

    // se ejecuta al enviar el formulario, evita que la página se recargue
    // manda los datos al backend y segun la respuesta guarda la sesion o muestra los errores
    const handleSubmit = async (event) => {

        event.preventDefault()
        
        setIsLoading(true)

        setErrors([])

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formState),
        })

        const data = await response.json()

        if (response.ok) {
            localStorage.setItem("isLogged", "true")
            navigate("/")
        } else if (response.status === 400) {
            setErrors(data.errors)
        } else if (response.status === 401) {
            setErrors(["Usuario o contraseña incorrectos"])
        } else if (response.status === 403) {
            setErrors(["No tenés permisos para ingresar"])
        } else {
            setErrors(["Error en el servidor, intentá más tarde"])
        }
        } catch {
            setErrors(["No se pudo conectar con el servidor"])
        } finally {
            setIsLoading(false)
        }
    }

    return (

        // ejecuta handleSubmit al hacer clic en el botón o apretar Enter
        // value sale del estado y onChange lo actualiza en cada tecla
        // el name coincide con la clave del objeto para que handleInputChange sepa que campo cambiar
        <form onSubmit={handleSubmit} className="mx-auto mt-10 flex max-w-sm flex-col gap-3 p-4">
            <h1 className="text-2xl font-bold">Iniciar sesión</h1>

            {errors.map((error) => (
                <p key={error} className="text-red-600">{error}</p>
            ))}

            <input name="username" placeholder="Usuario" value={formState.username} onChange={handleInputChange} className="rounded border p-2"/>
            <input name="password" type="password" placeholder="Contraseña" value={formState.password} onChange={handleInputChange} className="rounded border p-2"/>

            <button disabled={isLoading} className="cursor-pointer rounded bg-blue-600 p-2 text-white disabled:opacity-50">{isLoading ? 'Cargando...' : 'Ingresar'}</button>

            <Link to="/register" className="text-blue-600">¿No tenés cuenta? Registrate</Link>
        </form>  
    )
}