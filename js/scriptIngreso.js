function UsuarioLogin(id,usuario,contraseña){
    this.id = id;
    this.usuario = usuario;
    this.contraseña = contraseña;
}


const usuario1 = new UsuarioLogin(1,"Ariel","1234")
const usuario2 = new UsuarioLogin(2,"Ignacio","1234")
const usuario3 = new UsuarioLogin(3,"Natalia","1234")


function ingreso(){
    let usuarioIngresado
    let contraseñaIngresada 

    usuarioIngresado = document.getElementById("usuario").value
    
    contraseñaIngresada = document.getElementById("contraseña").value


    if (usuarioIngresado == usuario1.usuario && contraseñaIngresada == usuario1.contraseña || usuarioIngresado == usuario2.usuario && contraseñaIngresada == usuario2.contraseña || usuarioIngresado == usuario3.usuario && contraseñaIngresada == usuario3.contraseña){
        window.location="sistema.html"
        sessionStorage.setItem("usuario",usuarioIngresado)
    } else {
        Toastify({

            text: "Usuario o contraseña incorrecta. Vuelva a Intentar.",
            gravity: "bottom", 
            position: "center", 
            style: {
                background: "linear-gradient(to right, red , black)",
              },
            
            duration: 7000
            
            }).showToast(); 

    }
}

