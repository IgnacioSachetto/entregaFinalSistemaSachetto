
mostrarUsuario();

function mostrarUsuario(){
    let userPresentacion = document.getElementById("nombreUser")
    userPresentacion.innerText = sessionStorage.getItem("usuario")    
}

/*Mostrar SOCIOS*/
ocultacion();

if (localStorage.getItem('sociosNuevos')){
    socios = JSON.parse(localStorage.getItem('sociosNuevos'))
} else {
    socios = [ 
        {id:1, nombre:"Marcelo", apellido: "Martinez", deporte: "Futbol"},
        {id:2, nombre:"Joaquín", apellido: "Pereyra", deporte: "Basquet"},
        {id:3, nombre:"Ramiro", apellido:"Carrera", deporte: "Tenis"}
    ]
}


let sociosBasquet  = []
let sociosTenis  = []
let sociosFutbol  = []


for (let contP =0; contP<socios.length; contP++){
    switch(socios[contP].deporte){
        case "Basquet":
            sociosBasquet.push(socios[contP]);
            break;
        case "Futbol":
            sociosFutbol.push(socios[contP]);

            break;
        case "Tenis":
            sociosTenis.push(socios[contP]);
            break;
    }

}

let sociosTodos  = [...sociosBasquet,...sociosFutbol,...sociosTenis] /*SPREAD*/ 


let btnMostrarSocios = document.getElementById("mostrarSocios") 
btnMostrarSocios.addEventListener("click",respuestaMostrarSocios)
let bandera1 = 0

function respuestaMostrarSocios(){
    if(bandera1 <1){
        ocultacion();

        let tituloDeSeccion = document.getElementById("tituloSeccion")
        tituloDeSeccion.innerText = `\ ${"Usuarios"}`

        const button2 = document.getElementById('mostrarSocios')
        button2.disabled = true

        document.getElementById("tablaSocios").style.display = ''; 
    
        for (cont1 = 0 ; cont1 < socios.length ; cont1++){
            document.getElementById("tablaSocios").innerHTML += '<tbody><td>'+socios[cont1].id+'</td><td>'+socios[cont1].nombre+ '</td><td>'+ socios[cont1].apellido + '</td><td>'+ socios[cont1].deporte+ '</td></tbody>';
        }
    }
}


let btnAgregarProductos = document.getElementById("agregarSocios") 
btnAgregarProductos.addEventListener("click",respuestaClickAgregarSocios)

function respuestaClickAgregarSocios(){
    ocultacion();

    let tituloDeSeccion = document.getElementById("tituloSeccion")
    tituloDeSeccion.innerText = `\ ${"Agregar Socios"}`
    document.getElementById("nuevoSocio").style.display = ''; 
}

function agregarSocio(){
    bandera1 = 0
    ocultacion();
    
    socioIngresadoNombre = document.getElementById("socioIngresadoNombre").value
    socioIngresadoApellido = document.getElementById("socioIngresadoApellido").value
    socioIngresadoDeporte = document.getElementById("socioIngresadoDeporte").value

    let socio = {
        id:socios[socios.length - 1].id+1 , nombre: socioIngresadoNombre , apellido: socioIngresadoApellido , deporte: socioIngresadoDeporte
    }

    socios.push(socio)
    localStorage.setItem("sociosNuevos" ,JSON.stringify(socios));

    Toastify({
        text: "Socio Agregado",
        duration: 2000,
        destination: "https://github.com/apvarun/toastify-js",
        gravity: "bottom", 
        position: "center", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, green, green)",
        },
        onClick: function(){} 
      }).showToast();

      Toastify({
        text: "Recuerde actualizar la lista",
        duration: 5000,
        destination: "https://github.com/apvarun/toastify-js",
        gravity: "bottom", 
        position: "center", 
        stopOnFocus: true, 
        style: {
          background: "linear-gradient(to right, red, red)",
        },
        onClick: function(){} 
      }).showToast();

}


function mostrarPorDeporte(){
    ocultacion();
    let tituloDeSeccion = document.getElementById("tituloSeccion")
    tituloDeSeccion.innerText = `\ ${"Buscar Socios Por Deporte"}`
    document.getElementById("mostrarBusqueda").style.display = ''; 

    document.getElementById("mostrarCategorias").style.display = '';

    const button = document.getElementById('mostrarCategorias')
    button.disabled = true
    document.getElementById("productoIngresadoDeporte").style.display = ''; 
}

function busquedaPorDeporte(){
    document.getElementById("mostrarBusqueda").style.display = ''; 
    document.getElementById("listaPorDeporte").style.display = ''; 

    categoriaIngresada = document.getElementById("productoIngresadoDeporte").value


    switch (categoriaIngresada) {
        case "Futbol":
            desestructuracion(sociosFutbol)
            break;
        case "Basquet":
            desestructuracion(sociosBasquet)
            break;
        case "Tenis":
            desestructuracion(sociosTenis)
            break;
    
        case "Todos":
            desestructuracion(sociosTodos)
            break;
    }

}


function desestructuracion(arrayCategoria){
    const desestructurar = ( {id,nombre,apellido,deporte}) => {
        ocultacion();

        document.getElementById("listaPorDeporte").style.display = ''; 

        document.getElementById("productoIngresadoDeporte").style.display = 'none'; 
        document.getElementById("mostrarBusqueda").style.display = 'none'; 

        for (contCat = 0 ; contCat < desestructurar.length ; contCat++){
            document.getElementById("listaPorDeporte").innerHTML += '<tbody><td>'+id+ '</td><td>'+ nombre+ '</td><td>'+ apellido + '</td><td>'+ deporte+ '</td></tbody>';
        }

    }
    
    for (d = 0; d<arrayCategoria.length; d++){
        desestructurar(arrayCategoria[d])
    }





}

let bandera = 0

function mostrarDatosDeporte(){

    ocultacion();

    let tituloDeSeccion = document.getElementById("tituloSeccion")
    tituloDeSeccion.innerText = `\ ${"Datos Deportes"}`
    const lista = document.getElementById("listaDeportes")
    document.getElementById("listaDeportes").style.display = '';

    if(bandera<1){
        fetch('./listadoDeportes.json')

        .then( (res) => res.json())
        .then( (data) => {
    
            data.forEach((deporte) => {
                const li = document.createElement('li')
                li.innerHTML = `
                <div id="listadoDeportesDiv">
                    <p>ID Deporte: ${deporte.id}</p>
                    <p>Nombre: ${deporte.nombre}</p>
                    <p>Nombre Profesor: ${deporte.profesor}</p>
                    <p>Correo Profesor: ${deporte.correo}</p>
                    <p>Teléfono Profesor: ${deporte.numero}</p>

                </div>

                `
                lista.append(li)
            })
        })       
    }
   
    bandera = bandera +1;


}


function otraBusqueda(){
    window.location.reload()
    const button2 = document.getElementById('mostrarSocios')
    button2.disabled = false


}

function ocultacion(){

    document.getElementById("nuevoSocio").style.display = 'none'; 
    document.getElementById("tablaSocios").style.display = 'none'; 
    document.getElementById("listaPorDeporte").style.display = 'none'; 
    document.getElementById("productoIngresadoDeporte").style.display = 'none'; 
    document.getElementById("mostrarBusqueda").style.display = 'none'; 
    document.getElementById("listaDeportes").style.display = 'none';
    document.getElementById("mostrarResumen").style.display = 'none';

    

    
 
}


function mostrarInforme(){

    

      swal({
        title: "¿Desea generar su informe?",
        text: "Generará el reporte final del mes",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((willDelete) => {
        if (willDelete) {
          swal("Ha generado correctamente el reporte", {
            icon: "success",
          });
          ocultacion();
          document.getElementById("mostrarResumen").style.display = '';
          calcularTotalBasquet(sociosBasquet)
          calcularTotalFutbol(sociosFutbol)
          calcularTotalTenis(sociosTenis)
          calcularTotalTodos(sociosTodos)

        } else {
          swal("Cancelado");
        }
      });



}


function calcularTotalBasquet(sociosBasquet){
    let totalSociosBasquet = sociosBasquet.length
    let totalSociosB = document.getElementById("totalBasquet")
    totalSociosB.innerText = `\ ${totalSociosBasquet}`

    facturaBasquet(totalSociosBasquet) 

    return totalSociosBasquet
}

function calcularTotalFutbol(sociosFutbol){
    let totalSociosFutbol = sociosFutbol.length
    let totalSociosF = document.getElementById("totalFutbol")
    totalSociosF.innerText = `\ ${totalSociosFutbol}`

    facturarFutbol(totalSociosFutbol) 

    return totalSociosFutbol

}

function calcularTotalTenis(sociosTenis){
    let totalSociosTenis = sociosTenis.length
    let totalSociosT = document.getElementById("totalTenis")
    totalSociosT.innerText = `\ ${totalSociosTenis}`

    facturarTenis(totalSociosTenis) 

    return totalSociosTenis

}



function facturaBasquet(totalSociosBasquet){
    let facturacionBasquet = totalSociosBasquet * 1500
    let totalFacturarBasquet = document.getElementById("totalFacturarBasquet")
    totalFacturarBasquet.innerText = `\ ${facturacionBasquet}`

    return facturacionBasquet
}

function facturarFutbol(totalSociosFutbol){
    let facturacionFutbol = totalSociosFutbol * 500
    let totalFacturarFutbol = document.getElementById("totalFacturarFutbol")
    totalFacturarFutbol.innerText = `\ ${facturacionFutbol}`

    return facturacionFutbol
}

function facturarTenis(totalSociosTenis){
    let facturacionTenis = totalSociosTenis * 2500
    let totalFacturarTenis = document.getElementById("totalFacturarTenis")
    totalFacturarTenis.innerText = `\ ${facturacionTenis}`

    return facturacionTenis
}

function calcularTotalTodos(sociosTodos){
    let totalSociosTodos = sociosTodos.length
    let totalSociosAll = document.getElementById("totalTodos")
    totalSociosAll.innerText = `\ ${totalSociosTodos}`
    facturarTodosTotal()
}

function facturarTodosTotal(){

    let totalSociosTodosTotal = (calcularTotalBasquet(sociosBasquet) * 1500)+(calcularTotalFutbol(sociosFutbol) * 500)+ (calcularTotalTenis(sociosTenis) * 2500)

    let totalSociosAll = document.getElementById("totalFacturarTodos")
    totalSociosAll.innerText = `\ ${totalSociosTodosTotal}` 
}





