import {datos} from "./validacion-formulario.js"

const api = 'https://tareas-f45f6-default-rtdb.firebaseio.com/'

//Registrar dato
function enviarDatos() {
    fetch(`${api}/tareas.json`, {
        method: 'POST', // or 'PUT' sin esta propiedad, el valor por defecto sería el GET
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos), //Tipo de datos enviados
      })
      .then((response) => response.json()) //Recojer la respuesta con promesa
      .then(respuestaJson=>{ //Tomar la respuesta y realizar una accion, la primera respuesta esta en un formato ilegible, por lo cual es necesario realizar un segundo then para operar los datos
        console.log('respuestaJson', respuestaJson)
      })
}

export {enviarDatos}