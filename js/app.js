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
     .map((tarea, index) => `
            <tr>
              <th scope="row">${index+1}</th>
              <td>${tarea.titulo}</td>

              <!-- Operador ternario para validar los estilos del badge -->
              <td><span class="badge rounded-pill 
                ${tarea.progreso=='Terminado' ? 'bg-verde' : tarea.progreso=='Sin empezar' ? 'bg-rojo' : tarea.progreso=='En curso' ? 'bg-amarillo' : '' } 
                pl-2 pr-2">${tarea.progreso}</span></td>

              <td><span class="badge rounded-pill 
              ${tarea.dificultad=='Facil' ? 'bg-amarillo' : tarea.dificultad=='Medio' ? 'bg-naranja' : tarea.dificultad=='Dificil' ? 'bg-rojo' : '' } 
              pl-2 pr-2">${tarea.dificultad}</span></td>


              <td>
              
                ${tarea.descripcion}
              
              </td>              
            </tr>
          `)
     .join("");
   TAB_TAREAS.innerHTML = TAREAS_RENDER;
}

cargarDatos();
export {enviarDatos}