/* Array productos */
let productos = [];
$.ajax({
    url: "./productos.json",
    dataType: "json",
    success: (respuesta) => {
        productos = respuesta;
    },
});

/************************************ */
$("document").ready(function () {
    console.log("Ya esta listo el DOM");


});


// guarda local productos
const guardaLocal = (clave, valor) => {

    localStorage.setItem(clave, JSON.stringify(valor))


};

/* Adherir DOM a variables*/
let divForm = $(`#operaciones`);
let botonComprar = $(`#comprar`);
let botonReservar = $(`#reservar`);
let total = 0

/* RESERVAS*/
/* Cargar Cliente */
class Cliente {
    constructor(nombre, direccion, telefono) {
        this.nombre = nombre,
            this.direccion = direccion;
        this.telefono = telefono;

    }

}

botonReservar.click(() => {
    divForm.remove();

    $("#eleccion").prepend(`<form id="formReserva"> <label for="formControlInput" class="form-label">Nombre Completo</label>
    <input type="text" class="form-control" id="nombreReserva" placeholder="Ingrese su nombre">
    <label for="formControlInput" class="form-label">Teléfono</label>
<input type="number" class="form-control" id="telefonoReserva" placeholder="Ingrese su teléfono">
<label for="formControlInput" class="form-label">Cantidad de personas</label>
<input type="number" class="form-control" id="cantidadReserva" placeholder="Ingrese cantidad de su reserva">
<label for="formControlInput" class="form-label">Fecha de reserva</label>
<input type="date" class="form-control" id="cantidadReserva" placeholder="Ingrese fecha de su reserva">
<label for="formControlInput" class="form-label">Hora de reserva</label>
<input type="time" class="form-control" id="cantidadReserva" placeholder="Ingrese horario de su reserva">
<button type="button" class="btn btn-primary mt-3" id="enviarReserva">Enviar</button>
</form>`);
    $("#enviarReserva").click(() => {
        const nombreReserva = $("#nombreReserva").val();
        const telefonoReserva = $("#telefonoReserva").val();
        const clienteReserva = new Cliente(nombreReserva, telefonoReserva);
        const cantidadReserva = $("#cantidadReserva").val();
        console.log(clienteReserva);
        $("#eleccion").remove();
        if (cantidadReserva < 100) {
            $("#resultado").prepend(`<p> Gracias ${nombreReserva}, su reserva se ha registrado con exito </p>`);

        } else {
            $("#resultado").prepend(`<p>Disculpe, la cantidad de personas ingresadas supera la cantidad disponible</p>`);
        }





    })
})







///////////////////////////////////


////////////////////////////////////









let carrito = [];



/*Creamos en el DOM el carrito */
$("#carrito").prepend(`

<h4> Carrito </h4>

<div id="itemsAgregados"> </div>
<h4 id="totalCarrito"> El total es $ <span id="precioTotal" > ${total} </span> </h4>
<div id="botonesCarrito"> 
<button type="button" class="btn btn-success mt-3" id="pagarCarrito">Pagar</button>
<button type="button" class="btn btn-danger mt-3" id="cerrarCarrito">Cerrar</button>
<button type="button" class="btn btn-secondary mt-3" id="calcularCarrito">Calcular total</button>


</div>

`);
/*FUNCIONES CARRO*/
let btnIconoCarro = $("#iconoCarro");
let divCarrito = $("#carrito");
btnIconoCarro.click(() => {
    if (divCarrito.is(":visible")) {
        divCarrito.fadeOut();
    } else {
        divCarrito.fadeIn()
    }


    cerrarCarro();
    calcularTotal();

});
/*cerramos Carrito*/
function cerrarCarro() {
    $("#cerrarCarrito").click(() => {
        $("#carrito").fadeOut();

    })
}
/*calculamos el total de la compra*/
function calcularTotal() {
    $("#calcularCarrito").click(() => {
        let divTotal = document.getElementById("precioTotal");

        total = 0;
        carrito.forEach((item) => {

            total = total + item.precio * item.cantidad;
        })
        console.log(`el total es de $${total}`);
        divTotal.textContent = total;


        if ($("#carrito").is(":visible")) {
            divCarrito.fadeIn();

        }



    })


}


/*Agrego productos al html */

botonComprar.click(() => {
    divForm.remove();
    $("#eleccion").addClass("row")
    productos.forEach((producto) => {
        $("#eleccion").prepend(` 
        <div class="card m-4" style="width: 18rem;">
        <img src="${producto.img}" class="card-img-top imgBebida" alt="imgbebida">
        <div class="card-body">
          <h5 class="card-title">${producto.tipoBebida}</h5>
          <p class="card-text">Precio $ <span class="itemPrecio">${producto.precio}</span>.</p>
          <button type="button" class="btn btn-success mt-3 btnID" id="agregarCarro${producto.id}" data-id="${producto.id}">Agregar al carro</button>
        </div>
      </div>
      `)
        /* funcion al hacer Click en Btn Agregar Carro */
        let agregarCarro = $(`#agregarCarro${producto.id}`);
        agregarCarro.click(() => {
            $("#carrito").fadeIn();
            agregarItemsCarro(event);
            

        })


    })



})



// /*Creo funcion guardar Local Storage producto seleccionado*/

let renderLS = function () {
    guardaLocal(`producto`, carrito);

}


// // agregarCarro.click(function (e) {
// //     e.preventDefault();
//     // agregarItemsCarro();
//     // renderLS();
//     // verLocalStore();


// // })

// let verLocalStore = function () {
//     let verItemsGuardados = JSON.parse(localStorage.getItem(`producto`));
//     console.log(verItemsGuardados);
//     return verItemsGuardados;
// }






/*agregamos al carro los items seleccionados*/
function agregarItemsCarro(event) {

    let button = event.target;
    const item = button.closest('.card');
    const itemTitle = item.querySelector('.card-title').textContent;
    const itemPrice = item.querySelector(".itemPrecio").textContent;
    const itemImg = item.querySelector(".imgBebida").src

    let newItem = {
        bebida: itemTitle,
        precio: itemPrice,
        img: itemImg,
        id: document.querySelector(".btnID").dataType,
        cantidad: 1
    }
    carrito.push(newItem);
    console.log(carrito);
    renderizarCarro();
    renderLS();
    sumaCantidadAlClickCarro();
    
    function renderizarCarro() {
   
        $("#itemsAgregados").prepend(`<div id="carritoProd${newItem.id}" class= "items">
                 <img src="${newItem.img}" class="img-fluid w-25" </img> <p> ${newItem.bebida} $ <span id="precioCarro${newItem.id}">${newItem.precio}</span> </p>
                 <input type="number"  id="cantidad" placeholder="Ingrese cantidad" value=${newItem.cantidad}>
                <button type="button" class="btn btn-danger mt-3" id="quitarItem">x</button>
                </div>`);
    
        // eliminarItemCarro();
    
    
    }
    // cerrarCarro();
    // calcularTotal();
    
}
function dibujarCarroLS () {
    if(JSON.parse(localStorage.getItem(`producto`))){
        carrito=JSON.parse(localStorage.getItem(`producto`));
        console.log(carrito);
        for(i=0; i<carrito.length; i++){
        
            $("#itemsAgregados").prepend(`<div id="carritoProd${carrito[i].id}" class= "items">
                 <img src="${carrito[i].img}" class="img-fluid w-25" </img> <p> ${carrito[i].bebida} $ <span id="precioCarro${carrito[i].id}">${carrito[i].precio}</span> </p>
                 <input type="number"  id="cantidad" placeholder="Ingrese cantidad" value=${carrito[i].cantidad}>
                <button type="button" class="btn btn-danger mt-3" id="quitarItem">x</button>
                </div>`);
            } 
    }
}
dibujarCarroLS();

/* sumamos cantidad al hacer click de nuevo en agregar carro*/
// function sumaCantidadAlClickCarro() {
//     let item= target.closest(".card");
//     let itemTitle = item.querySelector('.card-title').textContent;
//     for (i = 0; i < carrito.length; i++) {
//         if (carrito[i].bebida.trim() === itemTitle.trim()) {
//             carrito[i].cantidad++;
//             let inputCantidad = document.getElementById("cantidad");
//             inputCantidad.value++;

//             return null;
//         }
//     }
// }








// /* Quitamos item del carro*/
// function eliminarItemCarro() {
//     $(`#quitarItem`).click(() => {

//         for (i = 0; i < carrito.length; i++) {
//             if (carrito[i].id === newItem.id) {
//                 carrito.splice(i, 1)
//                 console.log(carrito);
//                 renderLS();
//                 $(`#carritoProd${newItem.id}`).remove();
//                 return null;

//             }
//         }

//     })
// }