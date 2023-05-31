///Elementos del dom
///Formulario inicio de sesion

const formSesion = document.getElementById("formInicioSesion");
const mailSesion = document.getElementById("mailSesion");
const contraSesion = document.getElementById("contraSesion");
const btnIniciarSesion = document.getElementById("btnInicioSesion");
const btnCrearCuenta = document.getElementById("btnCrearCuenta");

///Formulario de registro

const formRegistro = document.getElementById("formRegistro");
const mailRegistro = document.getElementById("mailRegistro");
const contraRegistro = document.getElementById("contraseñaRegistro");
const confirmarContra = document.getElementById("confirmarContraseña")
const btnIniciarSesionRegistro = document.getElementById("btnInicioSesionRegistro");
const btnRegistro = document.getElementById("btnRegistro");

///Eventos click de los botones form inicio Sesion
btnCrearCuenta.addEventListener("click",function () {
    formActivo(formSesion,formRegistro);
})

///Eventos click de los botones del registro

btnRegistro.addEventListener("click", function () {
    crearCuenta();
})

btnIniciarSesionRegistro.addEventListener("click", function () {
    formActivo(formRegistro, formSesion);
})

/// cambiar displays form de registro o inicio
const formActivo = (formularioActivo, formularioInactivo) => {
    formularioActivo.classList.remove("formActivo");
    formularioInactivo.classList.add("formActivo");
}

/// funcion crear cuenta
const cuentas = [];
const crearCuenta = () => {
    localStorage.removeItem("cuentas");
    let cuenta1 = new cuenta (mailRegistro.value,contraRegistro.value);
    cuentas.push(cuenta1);
    localStorage.setItem("cuentas", JSON.stringify(cuentas));
    alert("su cuenta fue creada satisfactoriamente");
    location.reload();
}

///Funciones de validacion 
///variables validacion
let mailValidado;
let contraseñaCorrecto;
let repetirContraseñaValidacion;
const validacionMail = () => {
    let regexMail = /^[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]+$/;
    let mailValido = regexMail.test(mailRegistro.value);
    if (!mailValido) {
        mailRegistro.classList.add("noValid");
        mailValidado = false;
    }else {
        mailRegistro.classList.remove("noValid");
        mailValidado = true;
    }
}

const validacionContraseña = () => {
    let regexContraseña = /^(?=.*[A-Z]).{8,16}$/;
    let contraseñaValida = regexContraseña.test(contraRegistro.value);
    if (!contraseñaValida) {
        contraRegistro.classList.add("noValid");
        contraseñaCorrecto = false;
    }else {
        contraRegistro.classList.remove("noValid");
        contraseñaCorrecto = true;
    }
}

const validacionConfirmarContraseña = () => {
    if (confirmarContra.value === contraRegistro.value) {
        confirmarContra.classList.remove("noValid");
        repetirContraseñaValidacion = true;
    }else {
        confirmarContra.classList.add("noValid");
        repetirContraseñaValidacion = false;
    }
}
/// Eventos de validacion

mailRegistro.addEventListener("change", function (){
    validacionMail();
})
contraRegistro.addEventListener("change", function () {
    validacionContraseña();
})
confirmarContra.addEventListener("change", function () {
    validacionConfirmarContraseña();
})