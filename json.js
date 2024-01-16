var root = document.getElementById("root");
let tabla = document.getElementById("tabla");


var result = fetch("https://memin.io/public/api/users")
    .then(result => {

        return result.json()
    }).then(data => {
        data.forEach(element => {
            // CREO LA FILA
            let fila = document.createElement("tr");
            tabla.appendChild(fila);

            let IDcell = document.createElement("td")
            IDcell.innerHTML = element.id;
            fila.appendChild(IDcell);

            let nombre = document.createElement("td");
            nombre.innerText = element.name;
            fila.appendChild(nombre);

            let correo = document.createElement("td");
            correo.innerHTML = element.email;
            fila.appendChild(correo);

            // BOTONES EN OTRA CELDA 
            let botones = document.createElement("td");
            fila.appendChild(botones)

            let button = document.createElement("button");
            button.classList.add("btn", "btn-danger");
            button.setAttribute("type", "button");
            button.innerText = "Eliminar";
            button.addEventListener("click",function(){Eliminar(element.id)})


            let button_actualizar = document.createElement("button");
            button_actualizar.classList.add("btn", "btn-warning");
            button_actualizar.innerText = "Actualizar";
            button_actualizar.setAttribute("onclick", "pasandoInputs()")
            button_actualizar.addEventListener("click",function(){pasandoInputs(element.id,element.name, element.email,element.password)})


            let button_detalles = document.createElement("button");
            button_detalles.classList.add("btn", "btn-info");
            button.setAttribute("id","botonDetalles")
            button_detalles.innerText = "Ver detalles";
            button_detalles.addEventListener("click",function(){abrirMODAL(element.id)})

            botones.appendChild(button);
            botones.appendChild(button_actualizar);
            botones.appendChild(button_detalles);
        })

    });

//////////////FUNCION ELIMINAR
function Eliminar(userID) {
    console.log("Vamos a eliminar a ", userID);
    fetch(`https://memin.io/public/api/users/${userID}`, { method: 'DELETE', headers: { "content-type": "application/json" } }
    )
        .then(response => {
            return response.json()
        })   
}
////////////////// FUNCION EDITAR Y CREAR///////////
function editar() {
    let userID = localStorage.getItem("ID");
    console.log(userID);

    let nombre = document.getElementById("name").value;
    let gmail = document.getElementById("gmail").value;
    let password = document.getElementById("contraseña").value;

    let actualizar ={
        "name": nombre,
        "email":gmail,
        "password": password
    }

    fetch(`https://memin.io/public/api/users/${userID}`, { method: 'PUT', headers: { "content-type": "application/json" }, body:JSON.stringify(actualizar)})
            .then(response => {
                return response.json()
            }) .then(data=>{console.log(data);})

}

function pasandoInputs(userID,nombre , gmail , password){
    localStorage.setItem("ID",userID)
    

    let nombreInput = document.getElementById("name");
    nombreInput.value = nombre;  
    let gmailInput = document.getElementById("gmail");
    gmailInput.value = gmail;
    let contrasena= document.getElementById("contraseña");
    contrasena.value=password;


}



///////////////////// MODAL / ////////////
function abrirMODAL(userID){
    //////FUNCION ABRIR EL MODAL
    let modal = document.getElementById("myModal");
    modal.style.display = 'block';
    
    var span = document.getElementsByClassName("close")[0]; // Accede al primer elemento de la colección
    span.onclick = function() {
        modal.style.display = "none";
    }
    
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    fetch(`https://memin.io/public/api/users/${userID}`, { method: 'GET', headers: { "content-type": "application/json" } }
    )
    .then(response => {return response.json()
    }).then(data=>{
        console.log("ENTRANDO A VER DETALLES");
        let idTD = document.getElementById("id");
        idTD.innerHTML = userID;
        
        let nombreTD =document.getElementById("NOMBRE");
        nombreTD.innerHTML = data.name;

        let gmailTD=document.getElementById("GMAIL");
        gmailTD.innerHTML=data.email;

        let contra= document.getElementById("CONSTRASEÑA");
        contra.innerHTML=data.password;

        let verificacion=document.getElementById("VERIFICAIONCORREO");
        verificacion.innerHTML=data.email_verified_at;

        let creacion=document.getElementById("FECHADECREACION");
        creacion.innerHTML=data.created_at;

        let Actualizacion=document.getElementById("FECHACTUALIZACION");
        Actualizacion.innerHTML=data.updated_at;

        let token = document.getElementById("TOKEN");
        token.innerHTML=data.remember_token;

    })
}


/// BUSCADOR ///
// let tablaBusca;
// let columna; 
// let busca = document.getElementById("buscador");
// busca.addEventListener("keyup",e=>{
//     fetch(`https://memin.io/public/api/v2/users/search/${e.target.value}`, { method: 'GET', headers: { "content-type": "application/json" } }
//     ).then(response => {return response.json();
//     }).then(data=>{
//         data.forEach(dato => {
            
//             let columna = document.getElementById("columna");

//             tablaBusca = document.createElement("table");
//             tablaBusca.setAttribute("id","contenidoTabla")
//             tablaBusca.classList.add("table")
//             columna.appendChild(tablaBusca);
    
//             let fila = document.createElement("tr");
//             fila.setAttribute("id","cadaUnaDeLasFilas")
//             tablaBusca.appendChild(fila);
    
//             let CELDAnombre = document.createElement("td");
//             CELDAnombre.innerHTML = dato.name;
//             fila.appendChild(CELDAnombre);
    
//             /* let CELDAcorreo = document.createElement("td");
//             CELDAcorreo.innerHTML=dato.email
//             fila.appendChild(CELDAcorreo); */
//             //tablaBusca.style.display="none"
//         })
//     })
// })
// if(busca.value == ""){
//     console.log("no ahi nada");

//     let filasInTable = document.getElementById("contenidoTabla");
//     columna.innerHTML = ""
//    // filasInTable.remove();
// }
// window.onload = function() {
//     document.getElementById("buscador").value = "";}


let columna; 
let busca = document.getElementById("buscador");
let filasInTable = document.getElementById("contenidoTabla");

if (filasInTable) filasInTable.parentElement.removeChild(filasInTable);

busca.addEventListener("keyup", e => {
    if (busca.value !== "") {
        fetch(`https://memin.io/public/api/v2/users/search/${e.target.value}`, { method: 'GET', headers: { "content-type": "application/json" } })
            .then(response => { return response.json(); })
            .then(data => {
                tablaBusca = document.createElement("table");
                tablaBusca.setAttribute("id", "contenidoTabla")
                tablaBusca.classList.add("table")
                columna.appendChild(tablaBusca);

                data.forEach(dato => {
                    let fila = document.createElement("tr");
                    fila.setAttribute("id", "cadaUnaDeLasFilas")
                    tablaBusca.appendChild(fila);

                    let CELDAnombre = document.createElement("td");
                    CELDAnombre.innerHTML = dato.name;
                    fila.appendChild(CELDAnombre);

                    /* let CELDAcorreo = document.createElement("td");
                    CELDAcorreo.innerHTML=dato.email
                    fila.appendChild(CELDAcorreo); */
                })
            })
    }
})

columna = document.getElementById("columna");
window.onload = function () {
    document.getElementById("buscador").value = "";
}