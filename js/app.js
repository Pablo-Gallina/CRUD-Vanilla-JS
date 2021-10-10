import {datos, mostrarAlerta, titulo, progreso, dificultad, descripcion, ObtenerTarea, tarea} from "./validacion-formulario.js"

const API = 'https://tareas-f45f6-default-rtdb.firebaseio.com/';
const TAB_TAREAS = document.getElementById("tabla-tareas");

const BTN_MODAL = document.getElementById("btnModal");
let tareas = []; //Objeto para todas las tareas
let botonesEliminar = null;
let botonesEditar = null;

//Registrar dato "POST"
function enviarDatos(method) {
    //let datosRegistrar = method=='POST' ? datos : method=='PUT' ? tarea : '';
    let url = method=='POST' ? `${API}/tareas.json` : method=='PUT' ? `${API}/tareas/${tarea.id}.json` : '';
    fetch(url, {
        method: method, // or 'PUT' sin esta propiedad, el valor por defecto sería el GET
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
  const TAREAS_KEYS =  Object.keys(tareas)
  const TAREAS_VALUE = Object.values(tareas)
  const SIZE_ARRAY = TAREAS_KEYS.length;
  const TAREAS_DATA = []

  for (let i = 0; i < SIZE_ARRAY; i++) {
    TAREAS_DATA.push(
      {
        "id": TAREAS_KEYS[i],
        "data": TAREAS_VALUE[i]
      }
    )
  }

  const TAREAS_RENDER = TAREAS_DATA
     .map((tarea, index) => `
            <tr>
              <th scope="row">${index+1}</th>
              <td>${tarea.data.titulo}</td>

              <!-- Operador ternario para validar los estilos del badge -->
              <td><span class="badge rounded-pill 
                ${tarea.data.progreso=='Terminado' ? 'bg-verde' : tarea.data.progreso=='Sin empezar' ? 'bg-rojo' : tarea.data.progreso=='En curso' ? 'bg-amarillo' : '' } 
                pl-2 pr-2">${tarea.data.progreso}</span></td>

              <td><span class="badge rounded-pill 
              ${tarea.data.dificultad=='Facil' ? 'bg-amarillo' : tarea.data.dificultad=='Medio' ? 'bg-naranja' : tarea.data.dificultad=='Dificil' ? 'bg-rojo' : '' } 
              pl-2 pr-2">${tarea.data.dificultad}</span></td>

              <td>
                <a class="link" data-toggle="collapse" data-target="#demo-${index}">Leer mas...</a>

                <div id="demo-${index}" class="collapse">
                  ${tarea.data.descripcion}
                </div>
              </td>

              <td>
                <button type="button" data-indice=${tarea.id} class="btn btn-outline-warning editar mb-1">Editar</button>         
                <button type="button" data-indice=${tarea.id} class="btn btn-outline-danger eliminar mb-1">Eliminar</button>
              </td>
            </tr>
          `)
     .join("");
   TAB_TAREAS.innerHTML = TAREAS_RENDER;
   botonesEliminar = document.getElementsByClassName('eliminar');
   botonesEditar = document.getElementsByClassName('editar');
 
   Array.from(botonesEliminar).forEach(botonEliminar => {
     botonEliminar.onclick = sweetAlertDelete;
   });
   Array.from(botonesEditar).forEach(botonEditar => {
     botonEditar.onclick = ObtenerTarea;
   });
}

//Sweet alert
function sweetAlertDelete(e){
  Swal.fire({
    title: 'Estas seguro?',
    text: "El registro se eliminara permanentemente!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Si, Eliminar!'
  }).then((result) => {
    if (result.isConfirmed) {
      eliminarTarea(e);
    }
  })
}

//Eliminar una tarea "DELETE"
function eliminarTarea(e) {
  e.preventDefault(); //Capturar el evento
  const ID = e.target.dataset.indice
  console.log(e.target.dataset.indice);
  //DELETE {{URL}}/tareas/-MlROXUFQTjGrbVII8nJ.json
  fetch(`${API}/tareas/${ID}.json`, { //Mandarle el id segun el target dataset dado y la propiedad indice, esto lo trae la variable e
      method: 'DELETE',
    })
    .then((response) => response.json())
    .then(respuestaJson=>{
      console.log('respuestaJson', respuestaJson)
      cargarDatos(); //Refresacar la lista
      mostrarAlerta('alert-danger', 'Registro Eliminado');
    })
}



function setDatos(){
  console.log(tarea);
  //tarea.map(i=>console.log(i));
  //console.log(titulo.value = 'algo');
  titulo.value = tarea.data.titulo;
  progreso.value = tarea.data.progreso;
  dificultad.value = tarea.data.dificultad;
  descripcion.value = tarea.data.descripcion;
}


cargarDatos();
export {enviarDatos, API, setDatos}