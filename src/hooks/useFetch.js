import { useEffect, useState } from "react"

// custom hook que hace un get a la url que recibe, sirviendo para cualquier endpoint
export const useFetch = (url) => {

    // data guarda la respuesta del backend, empieza en null porque todavia no llego nada
    const [data, setData] = useState(null);
    // isLoading indica si la peticion esta en curso, empieza en true
    const [isLoading, setLoading] = useState(true);
    // error guarda el mensaje si ocurre algo falla, empieza en null porque todavia no hubo un error
    const [error, setError] = useState(null)

    // funcion que hace la petición al backend
    // es async para poder esperar la respuesta con await, y esta afuera del useEffect para que el efecto solo se encargue de llamarla
    // al empezar activa la carga y borra el error de una peticion anterior
    const fetchData = async () => {
        setLoading(true)
        setError(null)

        try {

            // hace la peticion con el metodo get para leer los datos, y envia la cookie con el jwt
            const response = await fetch(
                url,
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (response.status === 401) throw new Error("No se inicio sesion o la sesion expiro");

            if (response.status === 403) throw new Error("No tiene permiso para ver esto");

            if (!response.ok) throw new Error("Error en el servidor");

            // convierte la respuesta en un objeto de js y guarda el mensaje
            setData(await response.json())
 
        } catch (err) {

            setError(err.message)

        } finally {

            // se ejecuta siempre, apagando la carga haya salido bien o mal
            setLoading(false)
        }
    }

    // ejecutar codigo despues de que el componente se dibuja en pantalla
    // 
    useEffect(() => {
        // el callback es la funcion que se ejecuta, llama a fetchData
        // no es async porque useEffect espera que el callback no devuelva nada, y una funcion async siempre devuelve una promesa
        // eslint-disable-next-line react-hooks/set-state-in-effect
        fetchData()

        // el array de dependencias le dice a react cuando volver a ejecutar el efecto
        // se ejecuta una vez al montar el componente y despues solo si cambia url
        // si el array estuviera vacio se ejecuta una sola vez
        // sin array se ejecutaria despues de cada render
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [url])

    // el hook entrega sus 3 estados en un objeto, asi la pagina que lo usa sabe que mostrar en cada momento
    // el indicador de carga mientras isLoading es true, el mensaje si hay error o la lista guardada en data
    return {data, isLoading, error}

};