import {enviarDatos} from "./app.js"

const BTN_CLOSE = document.getElementById("close");
const BTN_RESET = document.getElementById("btnReset");
let titulo = document.getElementById("titulo");
let progreso = document.getElementById("progreso");
let Dificultad = document.getElementById("dificultad");
let descripcion = document.getElementById("descripcion");
const alert = document.getElementById("alert");

var datos = {}

//Clic sobre el boton agregar para validar formulario
btnAgregar.onclick = validarFormulario

//Funcion para la validacion del formulario
function validarFormulario() {
    let formularioCorrecto = validaciones() //Si todos los inputs tienen informacion correctoa, resultado sera true, sino algun input tiene informacion incorrecto, resultado sera false

    console.log(formularioCorrecto, formularioCorrecto === 1);
    //Si el formulario es correcto, mostrar el sweet alert 
    if (formularioCorrecto === 2) {
        datos={
            "titulo": titulo.value,
            "progreso": progreso.value,
            "dificultad": dificultad.value,
            "descripcion": descripcion.value
        }
        mostrarAlerta('alert-success', 'Registro Guardado');
        BTN_CLOSE.click();
        enviarDatos();
    }
    
    
}


//Function, mostrar la notificacion
function mostrarAlerta(clase, mensaje){
    alert.classList.add(clase);
    alert.classList.remove(clase=='alert-success' ? 'alert-danger' : 'alert-success');
    alert.classList.remove("transparente");
    alert.classList.remove("d-none");
    alert.innerHTML = mensaje;

    setTimeout(() => {
        alert.classList.add("transparente");
    }, 2700);
    setTimeout(() => {
        alert.classList.add("d-none");
    }, 3000);

    //Resetar el formulario
    BTN_RESET.click();
    titulo.classList.remove("success");
    descripcion.classList.remove("success");
}
//Validacion de todos los campos del formulario
function validaciones(){
    let tituloValid = inputTextIsValid(titulo, 'txtErrorTitulo', 'Ingrese almenos 4 caracteres'); // true / false
    let descripcionValid = inputTextIsValid(descripcion, 'txtErrorDescripcion', 'Ingrese almenos 4 caracteres');
    return tituloValid + descripcionValid;
}
//*********************************Validaciones de los inputs */

//Validacion del input Titulo
function inputTextIsValid(input, idTxtError, descError){
    let validar= false //Controlador para verificar si el input es correcto o no
    const TXT_ERROR = document.getElementById(idTxtError) //Mensaje de error

    //Si el input es correcto, tiene +4 digitos
    if(/.+.+.+./.test(input.value)) {
        input.classList.remove("error");
        TXT_ERROR.classList.add("d-none");
        input.classList.add("success");
        validar = true;
    } else { //Si el input no tiene 13 digitos
        input.classList.remove("success");
        input.classList.add("error");
        input.focus();
        TXT_ERROR.classList.remove("d-none");
        TXT_ERROR.innerHTML = descError;
        validar=false;
    }

    return validar; //Retornar el valor de la validacuion
}

//Cunando se esta sobre el input
titulo.addEventListener("keyup", () => {
    inputTextIsValid(titulo, 'txtErrorTitulo', 'Ingrese almenos 4 caracteres');
});

descripcion.addEventListener("keyup", () => {
    inputTextIsValid(descripcion, 'txtErrorDescripcion', 'Ingrese almenos 4 caracteres');
});
//*********************************Fin Validaciones de los inputs */


export {datos, mostrarAlerta}