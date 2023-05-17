const precioDia = 13000;
const miliDia = 86400000;
const reservas = [];

/// Elementos del DOM
const nombre = document.getElementById("nombre");
const numero = document.getElementById("telefono");
const entradaInput = document.getElementById("fechaEntrada");
const salidaInput = document.getElementById("fechaSalida");
const precioTotal = document.getElementById("total");
const formReserva = document.getElementById("formReserva");

///variables para validacion
let nombreValido;
let numeroValido;
///acciones de la reserva
let botonReserva = document.getElementById("btn-reserva");
botonReserva.addEventListener("click", function (e) {
    e.preventDefault();
    if (nombreValido && numeroValido) {
    crearReserva();
    mostrarReservas();
    precioReserva();
    limpiarForm(formReserva);
    console.log(reservas);
    }else {
        alert("corrija los campos seleccionados")
    }
})
const crearReserva = () => {

    let entrada = new Date(entradaInput.value);
    let salida = new Date(salidaInput.value);

    const reserva1 = new Reserva(nombre.value, numero.value, entrada, salida);

    reservas.push(reserva1);
}

const limpiarForm = (form) => {
    form.reset();
}

const mostrarReservas = () => {
    let listaReservas = document.getElementById("listaReservas");

    for (let i = 0; i < reservas.length; i++) {

        let ReservaNombre = document.createElement("li");
        ReservaNombre.classList.add("datoReserva")
        ReservaNombre.innerHTML = "NOMBRE: " + reservas[i].nombre;
        listaReservas.appendChild(ReservaNombre);

        let ReservaNumero = document.createElement("li");
        ReservaNumero.classList.add("datoReserva")
        ReservaNumero.innerHTML = "NUMERO: " + reservas[i].numero;
        listaReservas.appendChild(ReservaNumero);

        let ReservaEntrada = document.createElement("li");
        ReservaEntrada.classList.add("datoReserva")
        ReservaEntrada.innerHTML = "ENTRADA : " + reservas[i].entrada;
        listaReservas.appendChild(ReservaEntrada);

        let ReservaSalida = document.createElement("li");
        ReservaSalida.classList.add("datoReserva")
        ReservaSalida.innerHTML = "SALIDA: " + reservas[i].salida;
        listaReservas.appendChild(ReservaSalida);

    }

    let botonesReservas = document.getElementById("botonesReservas");
    let borrarReservaBtn = document.createElement("button");
    borrarReservaBtn.innerHTML = "Eliminar Reserva";
    borrarReservaBtn.classList.add("eliminarReserva");
    botonesReservas.appendChild(borrarReservaBtn);
    borrarReservaBtn.addEventListener("click", function () {
        borrarReserva(0);
    })

    let confirmarReservaBtn = document.createElement("button");
    confirmarReservaBtn.innerHTML = "Confirmar Reserva";
    confirmarReservaBtn.classList.add("confirmarReserva");
    confirmarReservaBtn.addEventListener("click", function () {
        confirmarReserva();
    })
    botonesReservas.appendChild(confirmarReservaBtn);
}
const precioReserva = () => {
    let diferenciaFechas = reservas[0].salida - reservas[0].entrada;
    let diasReserva = diferenciaFechas / miliDia;
    let totalReserva = diasReserva * precioDia;
    precioTotal.innerHTML = "El precio total de su reserva es: $" + totalReserva;
}


const borrarReserva = (index) => {

    let confirmacionBorrarReserva = confirm("¿Seguro que desea eliminar su reserva?")
    if (confirmacionBorrarReserva) {
        reservas.splice(index, 1);
        listaReservas.innerHTML = "";
        botonesReservas.innerHTML = "";
        precioTotal.innerHTML = "";
    }

}

const confirmarReserva = () => {
    let confirmacionReserva = confirm("¿Seguro que desea confirmar esta reserva?");
    if (confirmacionReserva) {
        alert("¡Su reserva fue confirmada satisfactoriamente!")
        location.reload();
    }
}

///Funciones de validacion de inputs
nombre.addEventListener("change", function() {
    validarNombre();
});

numero.addEventListener("change", function () {
    validarNumero();
})

const validarNumero = () =>{
    let regexNumero = /^\+?\d{10,13}$/;
    let numeroTest = regexNumero.test(numero.value);
    if (!numeroTest) {
        numero.classList.add("noValid");
        numeroValido = false;
    }else {
        numero.classList.remove("noValid");
        numeroValido = true;
    }
}

const validarNombre = () => {

    let regexNombre = /^[a-zA-Z]+$/;
    let nombreTest = regexNombre.test(nombre.value);
    if (!nombreTest) {
        nombre.classList.add("noValid");
        nombreValido = false;
    }else {
        nombre.classList.remove("noValid");
        nombreValido = true;
    }

}

