import {datos} from "./validacion-formulario.js"

const API = 'https://tareas-f45f6-default-rtdb.firebaseio.com/'
const TAB_TAREAS = document.getElementById("tabla-tareas");
let tareas = []

//Registrar dato "POST"
function enviarDatos() {
    fetch(`${API}/tareas.json`, {
        method: 'POST', // or 'PUT' sin esta propiedad, el valor por defecto sería el GET
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos), //Tipo de datos enviados
      })
      .then((response) => response.json()) //Recojer la respuesta con promesa
      .then(respuestaJson=>{ //Tomar la respuesta y realizar una accion, la primera respuesta esta en un formato ilegible, por lo cual es necesario realizar un segundo then para operar los datos
        console.log('respuestaJson', respuestaJson);
        cargarDatos();
      })
}

//Funcion para cargar los datos "GET"
function cargarDatos() {
  fetch(`${API}/tareas.json`)
  .then(res=>res.json())
  .then(resonseTareas=>{
    console.log('resonseTareas', resonseTareas);
    tareas = resonseTareas;
    setDatosTabla();
  })
}

//Funcion para cargar los datos a la tabla
function setDatosTabla(){
  const TAREAS_RENDER = Object.values(tareas)
     .map((tarea, indice) => `
            <tr>
              <th scope="row">${indice+1}</th>
              <td>${tarea.titulo}</td>
              <td>${tarea.progreso}</td>
              <td>${tarea.dificultad}</td>
              <td>${tarea.descripcion}</td>
            </tr>
          `)
     .join("");
   TAB_TAREAS.innerHTML = TAREAS_RENDER;
}

cargarDatos();
export {enviarDatos}