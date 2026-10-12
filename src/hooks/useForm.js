import { useState } from "react"

// custom hook reutilizable que recibe un objeto con los valores iniciales 
// sirve para cualquier formulario, tanto login como registro
export const useForm = (initialValues) => {

    // useState crea un estado y devuelve un array con dos elementos, que se separan con desestructuracion de arrays
    // formState es el valor actual del estado, es decir, el objeto con lo que tiene escrito cada campo en ese momento, es lo que se lee para mostrar en los inputs
    // setFormState es la funcion que cambia ese valor, no se puede modificar directamente, por lo que se llama a setFormState, y cada vez que se llama se vuelve a dibujar el componente con el valor nuevo
    // initialValues es el valor con el que comienza el estado la primera vez
    const [formState, setFormState] = useState(initialValues);

    // funcion que mantiene el estado igual a lo que el usuario ve escrito en pantalla
    // se conecta a cada input con onChange={handleInputChange}
    // cada vez que el usuario aprieta una tecla en ese input se llama a handleInputChange, se pasa el evento con los datos del cambio, la función guarda el texto nuevo en formState, y se vuelve a dibujar el input mostrando ese texto
    const handleInputChange = (event) => {

        // desestructuracion de objetos
        // saca dos propiedades del input y las guarda en variables con el mismo nombre
        // name es el atributo name del input y value es el texto que tiene escrito el input
        // event.target es el elemento html donde ocurrio el evento, o decir, el input en el que el usuario esta escribiendo, tiene sus atributos name, value, type
        const {name, value} = event.target

        // en lugar del objeto nuevo, se le pasa una funcion que recibe el estado actual que es prevState, y devuelve el nuevo, asi el estado siempre se actualiza a partir de su valor mas reciente
        setFormState((prevState) => ({

            // el operador spread copia todos los campos del estado anterior, para no perder lo que ya estaba escrito en los otros inputs
            ...prevState,

            // reemplaza solo el campo que cambio
            // los corchetes hacen que la clave sea el contenido de la variable name y no la palabra name
            // el name de cada input tiene que ser igual a la clave del objeto inicial
            [name]: value,

        }))
    }
 
    // vuelve el formulario a sus valores iniciales
    // el nuevo valor no depende del anterior
    const handleReset = () => {

        setFormState(initialValues);
    }

    // devuelve el estado y las dos funciones en un objeto para que cada pagina tome lo que necesita con desestructuracion
    return {formState, handleInputChange, handleReset}
}
