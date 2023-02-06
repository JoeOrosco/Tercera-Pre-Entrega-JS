/*
 -> El codigo donde se simula una reservacion de habitaciones, en este caso cuenta con un maximo de 8 habitaciones a reservar. 
*/

const contenedor = document.querySelector('#contenedor')
const contenedorCarrito = document.querySelector('#contenedor-carrito')
const reservaContendor = document.querySelector('.reservaContenedor')
const cantidadNoches = document.querySelector('.cantidad-noches')
const precioTotal = document.querySelector('.itemCartTotal')
const confimarReserva = document.querySelector('.btnConfirmar')
let reservas =  []

contenedor.addEventListener('click', (e) => {
    // console.log(e.target.id)
    if (e.target.classList.contains('btn-reserva')) {
        pintarReservaCarrito(e.target.id)
    }
})

contenedorCarrito.addEventListener('click', (e) => {
    e.stopPropagation()
    if (e.target.classList.contains('delete')) {
        eliminarReserva(e.target.id)
    }
})

/* 
 -> En el boton CONFIRMAR que se muestra, al hacerle click este al usuario le permitira empezar otra ves por si quiere hacer otra reserva.
 -> Por ahora no puse niguna alerta de la calse de librerias que vimos la clase anterio, pienso hacerlo para el proyecto final. 
*/
confimarReserva.addEventListener('click', (e) =>{
    console.log(e.target)
    contenedorCarrito.innerHTML = ''
    reservas.length = 0
    guardarReserva(reservas)
    actualizarTotalesCarrito()
})

/*
 -> En pintarReservaCarrito si el usuario reserva una de las habitaciones se se sumara en Mi Reserva en la pagina llegando al maximo de 8,
 porque son 8 las habitacones, sin embargo si el usuario hace muchas reservaciones en la misma habitacion se le sumara la cantidad dentro de Mi Reserva (cantidad/noches),
 donde se ve el nombre de habitacino, cantidad/noches, precio y X de opcion para eliminar una reserva.
*/

const pintarReservaCarrito = (id) => {

    const existe = reservas.some((reserva) => reserva.id == id)
    if (existe) {
        const reserva = reservas.find((reserva) => reserva.id == id)
        reserva.cantidad++
        const cantidad = document.querySelector(`#reserva-${reserva.id}`)
        cantidad.innerText = reserva.cantidad

    } else {
        const reserva = habitaciones.find((habitacion) => habitacion.id == id)
        reservas.push(reserva)

        const contenedorCarrito = document.querySelector('#contenedor-carrito')
        const tr = document.createElement('tr')
        tr.classList.add('mi-reserva-carrito', 'my-3')
        tr.innerHTML = `
            <td class="table-habitaciones">
                <p class="title text-light">${reserva.nombre}</p>
            </td>
            <td class="table-cantidad">
                <p class="text-white text-center" id="reserva-${reserva.id}">1</p>
            </td>
            <td class="table-precio">
                <p class="text-light text-center">$${reserva.precio}</p>
            </td>
            <td class="table-cantidad">
                <button id="${reserva.id}" class="delete btn btn-danger text-center">x</button>
            </td> 
            <hr>
        `
        contenedorCarrito.appendChild(tr)
    }

    actualizarTotalesCarrito()
    guardarReserva(reservas)
}


function actualizarTotalesCarrito(){
    reservaContendor.textContent = reservas.length
    precioTotal.innerText = reservas.reduce((acc, reserva) => acc + reserva.cantidad * reserva.precio * reserva.noches, 0) // reserva.noches
}

const pintarHabitaciones = (habitaciones) => {

    habitaciones.forEach((habitacion) => {
        const div = document.createElement('div')
        div.classList.add('col', 'd-flex', 'justify-content-center', 'mb-4')
        div.innerHTML = `
            <div class="col d-flex justify-content-center mb-4">
                <div class="card shadow mb-1 bg-dark rounded" style="width: 20rem;">
                    <h5 class="card-title pt-2 text-center text-warning">${habitacion.nombre}</h5>
                    <img src="${habitacion.img}" class="card-img-top" alt="...">
                    <div class="card-body text-center">
                        <p class="card-text text-white description">
                            ${habitacion.descripcion} <br>
                            ${habitacion.capacidad} <br>
                            Museo, Plaza, Jardines <br>
                            Tv Pantalla Plana, WIFI <br>
                            Atencion a la habitacion las 24hrs.
                        </p>
                        <h5 class="text-danger">A Partir de: <span>$${habitacion.precio} la noche </span></h5>
                        <button id="${habitacion.id}" class="btn-reserva btn btn-warning button">Revervar</button>
                    </div>
                </div>
            </div>
        `
        contenedor.appendChild(div)
    })

}

pintarHabitaciones(habitaciones)

function eliminarReserva(id) {
    const habitacionId = id
    reservas = reservas.filter((habitacion) => habitacion.id != habitacionId)
    pintarCarrito(reservas)
    actualizarTotalesCarrito()
    guardarReserva(reservas)

}

function pintarCarrito(reservas){
    contenedorCarrito.innerHTML = ''
    reservas.forEach((reserva) => {
        const tr = document.createElement('tr')
        tr.classList.add('mi-reserva-carrito', 'my-3')
        tr.innerHTML = `
            <td class="table-habitaciones">
                <p class="title text-light">${reserva.nombre}</p>
            </td>
            <td class="table-cantidad">
                <p class="text-white text-center" id="reserva-${reserva.id}">1</p>
                </td>
            <td class="table-precio">
                <p class="text-light text-center">$${reserva.precio}</p>
            </td>
            <td class="table-cantidad">
                <button id="${reserva.id}" class="delete btn btn-danger">x</button>
            </td> 
        `
        contenedorCarrito.appendChild(tr)
    })  
}

function guardarReserva(reservas) {
    localStorage.setItem("habitacion", JSON.stringify(reservas))
}

function obtenerReservas(){
    if(localStorage.getItem("habitacion")){
        reservas = JSON.parse(localStorage.getItem("habitacion"))
        pintarCarrito(reservas)
        actualizarTotalesCarrito()
    }
}

obtenerReservas()

