import { useFetch } from "../hooks/useFetch"

export const HomePage = () => {

    // usa el custom hook para pedir los articulos y toma data, isLoading y error
    const {data, isLoading, error} = useFetch("http://localhost:3000/api/articles");

    // mientras se espera la respuesta muestra el indicador de carga
    if (isLoading) return <p className="p-4">Cargando articulos...</p>

    // si algo fallo muestra el mensaje de error
    if (error) return <p className="p-4 text-red-600">{error}</p>

    // si no hay articulos publicados muestra un mensaje
    if (data.lenght === 0) return <p className="p-4">No hay artículos publicados</p>


    // data es el array de articulos que devolvio el backend
    // map lo recorre de principio a fin y por cada elemento ejecuta la funcion que se le pasa
    // en cada vuelta, el articulo actual queda en la variable article
    // lo que devuelve la funcion, que es el jsx de la tarjeta, se junta en un array nuevo, y React dibuja ese array como una lista de tarjetas
    return (
        <div className="grid gap-4 p-4 md:grid-cols-2">
            {data.map((article) => (
                <article key={article.id} className="rounded border p-4">

                    <h2 className="text-xl font-bold">{article.title}</h2>

                    <p>{article.excerpt ?? "Sin resumen"}</p>

                    <p className="text-sm text-gray-500">Autor: {article.autor?.username}</p>

                </article>
            ))}
        </div>
        
    );
    // cada elemento de una lista necesita una key unica para que React pueda identificarlo
    // cuando la lista cambia React compara las keys para saber que tarjeta es cual y actualizar solo lo necesario
    // se usa el id del registro porque es unico y nunca cambia
    // el indice del array no sirve porque si un articulo se borra o cambia de lugar, los indices de los demás se corren y React puede confundir una tarjeta con otra
    // sin key React muestra una advertencia en la consola

};