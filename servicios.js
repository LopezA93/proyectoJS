const servicios = $("#btnServicios");

servicios.click(() => {
    $("#resultado").remove();
    $("#operaciones").remove();
    $("#eleccion").remove();
    $("#opiniones").hide();
    $("#servicios").show();
    DOMServicios();
})

function DOMServicios() {
    let divServicios= document.getElementById("servicios");
    let contenido= `
    <div class="row">
            <h4> Servicios</h4>
            <h6>Estamos abiertos lunes a domingos, de 17:00hs a 05:00hs</h6>
            <p>En nuestro bar podes disfrutar de una noche como nunca has vivido. <br>
            Ademas podes:</p>
            <ul>
                <li>Festejar tu cumpleaños</li>
                <li>Festejos de fin de años para empresas</li>
                <li>Contratar nuestro servicio de venta de bebidas</li>
                
            </ul>
            <p>Para más informacion, contactate con nosotros haciendo click <a href="https://wa.me/5493512405823" target="_blank">aquí</a>
            </p>
        
        </div>
        
    
    `
    divServicios.innerHTML=contenido

}