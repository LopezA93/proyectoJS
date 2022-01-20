/* Adherir DOM a variables*/


let botonReservar = $(`#reservar`);


/* RESERVAS*/
/* Cargar Cliente */
class Cliente {
    constructor(nombre, telefono, direccion) {
        this.nombre = nombre,
            this.direccion = direccion;
        this.telefono = telefono;

    }

}

botonReservar.click(() => {
    divForm.remove();

    $("#eleccion").prepend(`<form id="formReserva"> <label for="formControlInput" class="form-label">Nombre Completo</label>
    <input type="text" class="form-control" id="nombreReserva"required  placeholder="Ingrese su nombre">
    <label for="formControlInput" required class="form-label">Teléfono</label>
<input type="number" class="form-control" id="telefonoReserva" placeholder="Ingrese su teléfono">
<label for="formControlInput" class="form-label">Cantidad de personas</label>
<input type="number" class="form-control" required id="cantidadReserva" placeholder="Ingrese cantidad de su reserva">
<label for="formControlInput" class="form-label">Fecha de reserva</label>
<input type="date" class="form-control" required min="2022-01-24"id=fechaReserva placeholder="Ingrese fecha de su reserva">
<label for="formControlInput" class="form-label">Hora de reserva</label>
<input type="time" class="form-control"  placeholder="Ingrese horario de su reserva">
<button type="submit" class="btn btn-primary mt-3" id="enviarReserva">Enviar</button>
</form>`);
    $("#enviarReserva").click(() => {
        const nombreReserva = $("#nombreReserva").val();
        const telefonoReserva = $("#telefonoReserva").val();

        const cantidadReserva = $("#cantidadReserva").val();
        const fechaReserva = $("#fechaReserva").val();
        const clienteReserva = new Cliente(nombreReserva, telefonoReserva);
        console.log(clienteReserva);
        if ((nombreReserva == "") || (telefonoReserva == "") || (cantidadReserva == "") || (fechaReserva == "")) {
            alert("Complete los datos requeridos");

        } else if (cantidadReserva < 100) {
            $("#eleccion").remove();
            $("#resultado").prepend(`<p> Gracias ${nombreReserva}, su reserva se ha registrado con exito </p>`);
            

        } else {
            $("#eleccion").remove();
            $("#resultado").prepend(`<p>Disculpe, la cantidad de personas ingresadas supera la cantidad disponible</p>`);
            
        }






    })
})


