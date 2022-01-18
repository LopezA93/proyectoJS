const btnOpiniones = $("#btnOpiniones");
let opiniones = [];
$.ajax({
  url: "./opinionesClientes.json",
  dataType: "json",
  success: (respuesta) => {
    opiniones = respuesta;
  },
});



btnOpiniones.click(() => {
  $("#resultado").remove();
  $("#operaciones").remove();
  $("#eleccion").remove();
  $("#servicios").hide();
  $("#opiniones").show();
  creamosDOMdeOpiniones()
})

/*creamos el DOM de opiniones*/


function creamosDOMdeOpiniones() {
  let divOpiniones = document.getElementById("opiniones");

  
  

  divOpiniones.innerHTML = "";
  opiniones.forEach((opinion) => {
    $("#opiniones").prepend(` 
    <div class="card divOpinion mx-auto">
      <div class="card-header">
        Calificación: ${opinion.calificacion}
      </div>
      <div class="card-body">
        <h5 class="card-title">${opinion.nombre}</h5>
        <p class="card-text">${opinion.comentario}.</p>
        
      </div>
      <div class="card-footer text-muted">
        ${opinion.tiempo}
      </div>
    </div>`)
  })
  $("#opiniones").prepend("<h4> Opiniones de nuestros clientes </h4>")
  $("#opiniones").append(`
<button type="button" class="btn btn-success mt-3 mx-auto " id="btnEnviarOpinion" onClick="enviarOpinion()">Envianos tu opinión</button>`)
}
function enviarOpinion() {
  let divOpiniones = document.getElementById("opiniones");
  divOpiniones.innerHTML = "";
  let formOpinion = ` <form id="formOpinion"> 
  <label for="formControlInput" class="form-label">Nombre Completo</label>
  <input type="text" class="form-control" id="nombreOpinion" placeholder="Ingrese su nombre y apellido" required>
  <label for="formControlInput" class="form-label">Ingrese su calificación</label>
  <div class="form-check">
  <input class="form-check-input" type="radio" name="radioDefault" id="formRadioDefault" checked="">
  <label class="form-check-label" for="formRadioDefault">Excelente</label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="radioDefault" id="formRadioChecked" >
  <label class="form-check-label" for="formRadioChecked">Muy Bueno</label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="radioDefault" id="formRadioChecked" >
  <label class="form-check-label" for="formRadioChecked">Regular</label>
</div>
<div class="form-check">
  <input class="form-check-input" type="radio" name="radioDefault" id="formRadioChecked" >
  <label class="form-check-label" for="formRadioChecked">Malo</label>
</div>


<label for="formControlInput" class="form-label">Ingrese su correo electronico</label>
<input type="email" class="form-control" i placeholder="Ingrese su e-mail" required>

<div class="form-floating">
  <textarea id= "comentariosForm"class="form-control" required placeholder="Deje su comentario aquí" id="floatingTextarea" style="height: 100px"></textarea>
  <label for="floatingTextarea">Comentarios</label>
</div>
<button type="submit" class="btn btn-primary mt-3" id="enviarOpinion" onClick="enviarForm()">Enviar</button>
</form>`

  divOpiniones.innerHTML = formOpinion;



}

function enviarForm() {

  let divOpiniones = document.getElementById("opiniones");
  let nombreOpinion = document.getElementById("nombreOpinion").value;
  let textAreaForm = document.getElementById("comentariosForm").value;
  if ((nombreOpinion == "") && (textAreaForm == "")) {
    alert("Complete los datos requeridos");
  } else {
    divOpiniones.innerHTML = "";

    let contenido = `<h4> Muchas gracias ${nombreOpinion}, su calificacion ha sido enviada, pronto se verá cargada en el sistema.</h4>`
    divOpiniones.innerHTML = contenido;
  }


}