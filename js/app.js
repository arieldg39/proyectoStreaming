const song =[
    {
        "id":"1",
        "titulo":"In The Air Tonight (Radio Edit) ft. Delacey",
        "interprete":"Alex Midi",
        "duracion":227,
        "carpeta":"../audio/Alex Midi - In The Air Tonight (Radio Edit) ft. Delacey.mp3",
        "meGusta":0,
        "categoria":"",
        "cover":"../img/alexmidi.jpg",
    },
    {
        "id":"2",
        "titulo":"Bronceado",
        "interprete":"Marama",
        "duracion":154,
        "carpeta":"../audio/Bronceado.mp3",
        "meGusta":0,
        "categoria":"",
        "cover":"../img/marama.jpg"
    },
    {
        "id":"3",
        "titulo":"Blame ft. John Newman",
        "interprete":"Calvin Harris",
        "duracion":154,
        "carpeta":"../audio/Calvin Harris - Blame ft. John Newman.mp3",
        "meGusta":0,
        "categoria":"",
        "cover":"../img/calvinharrisblame.jpg"
    },
    {
        "id":"4",
        "titulo":"Robarte un Beso",
        "interprete":"Carlos Vives - Sebastian Yatra",
        "duracion":181,
        "carpeta":"../audio/Carlos Vives Sebastian Yatra - Robarte un Beso.mp3",
        "meGusta":0,"categoria":"",
        "cover":"../img/Robarte_un_Beso.jpg"
    },
    {
        "id":"5",
        "titulo":"Para Enamorarte",
        "interprete":"CNCO",
        "duracion":181,
        "carpeta":"../audio/CNCO   Para Enamorarte.mp3",
        "meGusta":0,
        "categoria":"",
        "cover":"../img/ParaEnamorarte.jpg"
        },
    {
        "id":"6",
        "titulo":"Adventure Of A Lifetime",
        "interprete":"Coldplay",
        "duracion":181,
        "carpeta":"../audio/Coldplay - Adventure Of A Lifetime.mp3",
        "meGusta":0,
        "categoria":"",
        "cover":"../img/aventure.jpg"
    },
    {
        "id":"7",
        "titulo":"Mama Said",
        "interprete":"Lukas Graham",
        "duracion":208,
        "carpeta":"../audio/Lukas Graham - Mama Said [OFFICIAL MUSIC VIDEO].mp3",
        "meGusta":0,
        "categoria":"",
        "cover":"../img/lukas_graham_mama_said.jpg"
    },
    {
        "id":"8",
        "titulo":"In the air tonight (live)",
        "interprete":"Phil Collins",
        "duracion":408,
        "carpeta":"../audio/Phil Collins - In the air tonight (live)",
        "meGusta":0,
        "categoria":"",
        "cover":"../img/collings.jpg"
    },
    {
        "id":"9",
        "titulo":"Amor Con Hielo",
        "interprete":"Morat",
        "duracion":408,
        "carpeta":"../audio/Morat - Amor Con Hielo.mp3",
        "meGusta":0,
        "categoria":"",
        "cover":"../img/morat_amor_con_hielo.jpg"
    },
    {
        "id":"10",
        "titulo":"Like a Stone",
        "interprete":"Audioslave",
        "duracion":408,
        "carpeta":"../audio/Audioslave - Like a Stone.mp3",
        "meGusta":0,
        "categoria":"",
        "cover":"../img/audioslave.jpg"
    },
    {
        "id":"11",
        "titulo":"Dark Necessities.mp3",
        "interprete":"Red Hoychili Peppers",
        "duracion":408,
        "carpeta":"../audio/Red Hoychili Peppers - Dark Necessities.mp3",
        "meGusta":0,
        "categoria":"",
        "cover":"../img/darknecessities.jpg"
    }  
    ,
    {
        "id":"12",
        "titulo":"Perfect.mp3",
        "interprete":"Ed sheeran",
        "duracion":408,
        "carpeta":"../audio/Ed sheeran - Perfect.mp3",
        "meGusta":0,
        "categoria":"",
        "cover":"../img/ed_sheeran_perfect.jpg"
    }
]


const listSong = document.getElementById("listSong");
const cover = document.getElementById("cover");
const audio = document.getElementById("audio");
const nameSong = document.getElementById("nameSong");
const nameSinger = document.getElementById("nameSinger");
const progress = document.getElementById("progress");
const barraPlay = document.getElementById("barraPlay");
const nameUser = document.getElementById("nameUser");

const btnPlay = document.getElementById("btnPlay");
const btnNext = document.getElementById("btnNext");
const btnBack = document.getElementById("btnBack");
const btnSilenciar = document.getElementById("btnSilenciar");
const btnRepetir = document.getElementById("btnRepetir");
const btnAleatorio = document.getElementById("btnAleatorio");


const iconPlay = document.getElementById("iconPlay");
const iconNext = document.getElementById("iconNext");
const duracionSong = document.getElementById("duracionSong");
const inicioSong = document.getElementById("inicioSong");
const barrarProgress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
const sidebarLista = document.getElementById("sidebarLista");
let cards = document.getElementById('cards');

let formCreate = document.getElementById('createNewTema');
let formLogin = document.getElementById('modalLogin');

const nav = document.getElementById('sideVar');
const btnHome = document.getElementById('btnHome');
const toggle_btn = document.getElementById('toggle-btn');

const menuUsuario = document.getElementById('menuUsuario');


var secondPlay=0;
let listsSong;
let opcion;
var actualSong=0;
let totalSong=0;
var users=[];
let temas = [];
let idVideoDelete = '';
let usuario = '';
var repSong=false;
var randonSong=false;


$(".sidebarLista").hide();


$(function() {
    $('[data-toggle="popover"]').popover()
})
/** -------------------------------------------------------------------------------- */
toggle_btn.onclick = function() {
    nav.classList.toggle('hide');
    cards.classList.toggle('expand');
}
/** -------------------------------------------------------------------------------- */
progressContainer.addEventListener('click',setProgress);
/** -------------------------------------------------------------------------------- */

btnSilenciar.addEventListener('click',()=>{    
    if(audio.muted) {
        audio.muted = false;
        btnSilenciar.classList.remove("bi-volume-mute");
        btnSilenciar.classList.add("bi-volume-up");
    }else{
        audio.muted = true;                
        btnSilenciar.classList.remove("bi-volume-up");
        btnSilenciar.classList.add("bi-volume-mute");
    }
});
/** -------------------------------------------------------------------------------- */
function secondsToString(seconds) {
    hour = Math.floor(seconds / 3600);
    hour = (hour < 10)? '0' + hour : hour;
    minute = Math.floor((seconds / 60) % 60);
    minute = (minute < 10)? '0' + minute : minute;
    second = seconds % 60;
    second = (second < 10)? '0' + second : second;
    if(hour==="00"){
        return minute + ':' + second;
    }else{
        return hour + ':' + minute + ':' + second;
    }
} 
/** -------------------------------------------------------------------------------- */
const updateControls = () =>{
    if(opcion==="play"){                          
        iconPlay.classList.remove("bi-play");
        iconPlay.classList.add("bi-pause");
                
    }else{
        iconPlay.classList.remove("bi-pause");
        iconPlay.classList.add("bi-play"); 
    }
}
/** -------------------------------------------------------------------------------- */
const barraTiempoSong = (event) =>{
    const {duration, currentTime} = event.srcElement;
    const percent = (currentTime / duration) * 100;
    barrarProgress.style.width = percent+"%";   
    const seg = parseInt(currentTime);
    inicioSong.textContent=secondsToString(seg);  
}
/** -------------------------------------------------------------------------------- */
function setProgress(event) {
    const totalWidth = this.offsetWidth
    const progressWidth = event.offsetX
    const current = (progressWidth / totalWidth) * audio.duration
    audio.currentTime = current
}
/** -------------------------------------------------------------------------------- */
const playSong = (id) =>{    
    for (const tema of listsSong) {        
        if (id==tema.id) {      
            actualSong=id;     
            audio.src=tema.carpeta;                        
            barrarProgress.style.width="0%";
            secondPlay=0;
            inicioSong.textContent="00:00";
            nameSong.textContent=tema.titulo;  
            nameSinger.textContent=tema.interprete;          
            inicioSong.textContent="00:00";
            duracionSong.textContent="/"+secondsToString(tema.duracion);
            barraPlay.classList.remove("hide");
            cover.src=tema.cover;
            audio.play();             
            opcion="play";
            updateControls();    
            //setInterval('contador()',1000);
            break;
        } 
    }
}
/** -------------------------------------------------------------------------------- */
const btnplaySong = () => {        
    if(opcion==="play"){                 
        audio.pause(); 
        opcion="pause";
        clearInterval();
        updateControls();
    }else{        
        audio.play();
        opcion="play";
        updateControls();
        
    } 
}
/** -------------------------------------------------------------------------------- */
const btnNextSong = () => {    
    if(randonSong===true) {
        aleatorioSong();
    } else {
        if(repSong===true) {
            playSong(actualSong);
        }
        else{
            if (actualSong < totalSong) {
                actualSong++;        
                playSong(actualSong);
            } else {
                playSong(0);
            }
        }
    }
}
/** -------------------------------------------------------------------------------- */
const btnbackward = () => {  
    if(repSong===true)  {
        playSong(actualSong);
    }
    else{
        if (actualSong > 0) {        
            actualSong--;
            playSong(actualSong);
        } else {
            totalSong--;
            playSong(totalSong);
        }
    }
}
/** -------------------------------------------------------------------------------- */
const repetirSong = () => {    
    if(repSong===false)
    {
        btnRepetir.style.color = "white";
        repSong=true;
    }
    else
    {
        btnRepetir.style.color = "grey";
        repSong=false;
    }
}
/** -------------------------------------------------------------------------------- */

const aleatorioSong = () => {
    if(randonSong===true){        
        var id = Math.floor(Math.random() * 12) + 1;        
        playSong(id) 
    } else {
        btnAleatorio.style.color="grey";        
    }

/* const mostrarCanciones = (cancionesAMostrar) => {
    let tarjeta;
    const tarjetas = [];
    if(usuario.tipo === 'admin') {
        for (const tema of cancionesAMostrar) {
            tarjeta = `
            <div class="card" style="width: 16rem ;" onclick="playSong('${tema.id},${tema.carpeta}')">
            <img src="../img/avatars/users1.png" alt="" style="max-height: 10rem;">   
                <div class="card-body">
                    <ul>
                        <li><a class="cardText">Nombre: ${tema.titulo}</a></li>
                        <li><a class="cardTextSecond">Autor: ${tema.interprete}</a></li>
                        <li><p class="cardTextSecond">descripción: ${tema.descripcion}</p></li>
                        <li><button class="btn btn-outline-primary meGusta" onclick="like(${tema.id})">
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-emoji-heart-eyes-fill" viewBox="0 0 16 16">
                        <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434zm6.559 5.448a.5.5 0 0 1 .548.736A4.498 4.498 0 0 1 7.965 13a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242.63 0 1.46-.118 2.152-.242a26.58 26.58 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zm-.07-5.448c1.397-.864 3.543 1.838-.953 3.434-3.067-3.554.19-4.858.952-3.434z"/>
                        </svg>
                        Me Gusta - ${tema.meGusta}</button></li>
                    </ul>
                        <button class="btn btn-danger" onclick="ModaleliminarVideo('${tema.id}', '${tema.titulo}')">Eliminar</button>
                </div>
            </div>
            `;
            tarjetas.push(tarjeta);
        }
        cards.innerHTML= tarjetas.join(' ');
        const botonIngresar = document.getElementById('botonIngresar');
        botonIngresar.innerHTML = '<button class="btn btn-dark" onclick="nuevoTema()">Insertar nuevo video</button>'
        
        
        }if (usuario.tipo === 'user') {
            for (const tema of cancionesAMostrar) {
                tarjeta = `
                <div class="card" style="width: 16rem ;" onclick="playSong('${tema.id}')">
                <img src="../img/avatars/users1.png" alt="" style="max-height: 10rem;">   
                    <div class="card-body">
                        <ul>
                            <li><a class="cardText">Nombre: ${tema.titulo}</a></li>
                            <li><a class="cardTextSecond">Autor: ${tema.interprete}</a></li>
                            <li><p class="cardTextSecond">descripción: ${tema.descripcion}</p></li>
                            <li><button class="btn btn-outline-primary meGusta" onclick="like(${tema.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-emoji-heart-eyes-fill" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434zm6.559 5.448a.5.5 0 0 1 .548.736A4.498 4.498 0 0 1 7.965 13a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242.63 0 1.46-.118 2.152-.242a26.58 26.58 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zm-.07-5.448c1.397-.864 3.543 1.838-.953 3.434-3.067-3.554.19-4.858.952-3.434z"/>
                            </svg>
                            Me Gusta - ${tema.meGusta}</button></li>
                        </ul>
                    </div>
                </div>
                `;
                tarjetas.push(tarjeta);
            }
            cards.innerHTML= tarjetas.join(' ');          
            const botonIngresar = document.getElementById('botonIngresar');
            botonIngresar.innerHTML = '';
        } else {
            for (const tema of cancionesAMostrar) {
                tarjeta = `
                <div class="card" style="width: 16rem ;" onclick="logearse()">
                <img src="../img/avatars/users1.png" alt="" style="max-height: 10rem;">   
                    <div class="card-body">
                        <ul>
                            <li><a class="cardText">Nombre: ${tema.titulo}</a></li>
                            <li><a class="cardTextSecond">Autor: ${tema.interprete}</a></li>
                            <li><p class="cardTextSecond">descripción: ${tema.descripcion}</p></li>
                            <li><button class="btn btn-outline-primary meGusta"(${tema.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-emoji-heart-eyes-fill" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zM4.756 4.566c.763-1.424 4.02-.12.952 3.434-4.496-1.596-2.35-4.298-.952-3.434zm6.559 5.448a.5.5 0 0 1 .548.736A4.498 4.498 0 0 1 7.965 13a4.498 4.498 0 0 1-3.898-2.25.5.5 0 0 1 .548-.736h.005l.017.005.067.015.252.055c.215.046.515.108.857.169.693.124 1.522.242 2.152.242.63 0 1.46-.118 2.152-.242a26.58 26.58 0 0 0 1.109-.224l.067-.015.017-.004.005-.002zm-.07-5.448c1.397-.864 3.543 1.838-.953 3.434-3.067-3.554.19-4.858.952-3.434z"/>
                            </svg>
                            Me Gusta - ${tema.meGusta}</button></li>
                        </ul>
                    </div>
                </div>
                `;
                tarjetas.push(tarjeta);
            }
            cards.innerHTML= tarjetas.join(' ');          
            const botonIngresar = document.getElementById('botonIngresar');
            botonIngresar.innerHTML = '';
        } */

}
/** -------------------------------------------------------------------------------- */
const nuevoTema = () => {    
    $('#createNewTema').modal('show');
    
}

formCreate.addEventListener('submit' , (e) =>{
    e.preventDefault();
    let newTema = {
        titulo: e.target[0].value,
        interprete: e.target[1].value,
        carpeta: e.target[2].value,
        descripcion: e.target[3].value,
        duracion: e.target[4].value,
        meGusta: 0,
        id: generateId(),

    }
    let temasStorage = localStorage.getItem('temas');
    if(!temasStorage) {
        localStorage.setItem('temas', JSON.stringify([newVideo]));
    }else {
        temas.push(newTema);
        console.log(temas);
        localStorage.setItem('temas', JSON.stringify(temas));
    }
    temas = JSON.parse(localStorage.getItem('temas'));
    mostrarCanciones(temas);
    document.getElementById('formCreate').reset();
    $('#createNewTema').modal('hide');
});

const generateId = function () {
    return '_' + Math.random().toString(36).substr(2, 9);
};


const ModaleliminarVideo = (id, nombre) => {
    const deleteModal = document.getElementById('modalBodyEliminar');
    console.log(deleteModal);
    deleteModal.innerHTML = 
    `<b>
        Si elimina a esta cancion perdera su información de forma permanente 
        <br>
        <br> 
        Esta seguro que desea eliminar el tema ${nombre} 
    </b>`;
    idVideoDelete = id;
    $('#deleteVideoModal').modal('show');
};

const deleteVideo = () => {
    temas = JSON.parse(localStorage.getItem('temas'));
    let newVideos = temas.filter((video) => video.id != idVideoDelete);
    localStorage.setItem('temas', JSON.stringify(newVideos)); 
    console.log(newVideos);
    mostrarCanciones(newVideos);
    $('#deleteVideoModal').modal('hide');
}

const like = (idLike) => {
    temas = JSON.parse(localStorage.getItem('temas'));
    users =JSON.parse(localStorage.getItem('users'));
    const userFound = users.find((user) => user.correo === usuario.correo)
    userFound.listaMeGustas.push(`${idLike}`)
    usuario = userFound;
    console.log(usuario);
    localStorage.setItem("users", JSON.stringify(users));
    let temalike = temas.find((tema) => tema.id == idLike);
    temalike.meGusta = temalike.meGusta + 1;
    console.log(temalike.meGusta);
    localStorage.setItem('temas', JSON.stringify(temas));
    mostrarCanciones(temas);
}

const likes = (idLike) => {
    console.log(`${idLike}`);


} 



const createLista = () => {
    users =JSON.parse(localStorage.getItem('users'));
    temas = JSON.parse(localStorage.getItem('temas'));
    const userFound = users.find((user) => user.correo === usuario.correo)
    let tarjeta;
    const tarjetas = [];
    let listaDeNombres= [];
    let contenedorCards = document.getElementById('contenedorCards');
    console.log(contenedorCards);
    for (const tema of temas) {
        tarjeta = `
            <div class="card" style="width: 16rem ;">
            <img src="${tema.cover}" alt="Imagen del Album de la Cancion" style="max-height: 15rem;">   
                <div class="card-body">
                    <ul>
                        <li><a class="cardText">Nombre: ${tema.titulo}</a></li>
                        <li><a class="cardTextSecond">Autor: ${tema.interprete}</a></li>
                        <li><p class="cardTextSecond">descripción: ${tema.descripcion}</p></li>
                    </ul>
                    <button type="button" class="btn btn-secondary" onclick="addListaReproducciones('${tema.id}')"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                    </svg> Agregar a lista de resproducciones</button>
                </div>
            </div>
            `;
            tarjetas.push(tarjeta);
        }
        cards.innerHTML= tarjetas.join(' ');
        let user = users.find((user)=>user.correo === usuario.correo);
        usuario = user;
        for (let i = 0; i < usuario.lista.length; i++) {
            const Recorrido = temas.map((tema) => {
                if (tema.id === usuario.lista[i]) {
                    let temaelegido = `<li>${tema.titulo}</li>`
                    listaDeNombres.push(temaelegido);
                }
            });
        }
            let tuLista = `
                    <div class="ListaSeleccionada">
                        <h4>Tu lista seleccionada</h4>
                        <ol>
                            ${listaDeNombres.join(' ')}
                        </ol>
                        <button class="btn btn-danger" onclick="eliminarLista()">Eliminar lista</button>        
                    </div>
                `
    sidebarLista.innerHTML = tuLista;    
    $(".sidebarLista").show();
    }

    const addListaReproducciones = (addId) => {
        users = JSON.parse(localStorage.getItem('users'));
        console.log(usuario);
        let userFound = users.find((user) => user.correo === usuario.correo);
        console.log(userFound);
        userFound.lista.push(`${addId}`);
        console.log(users);
        localStorage.setItem("users", JSON.stringify(users));
        createLista();
    }


    const mostrarMiLista = () => {
        $(".sidebarLista").hide();
        users = JSON.parse(localStorage.getItem('users'));
        temas = JSON.parse(localStorage.getItem('temas'));
        let listaPropia = [];
        let tarjeta;
        const tarjetas = [];
        let user = users.find((user)=>user.correo === usuario.correo);
        usuario = user;
        for (let i = 0; i < usuario.lista.length; i++) {
            element = usuario.lista[i];
            const Recorrido = temas.map((tema) => {
                if (tema.id === usuario.lista[i]) {
                    listaPropia.push(tema);
                }
            });
        }
        console.log(listaPropia);
        for (const tema of listaPropia) {
            tarjeta = `
                <div class="card" style="width: 16rem ;" onclick="playSong('${tema.id}')">
                <img src="${tema.cover}" alt="Imagen del Album de la Cancion" style="max-height: 15rem;">   
                    <div class="card-body">
                        <ul>
                            <li><a class="cardText">Nombre: ${tema.titulo}</a></li>
                            <li><a class="cardTextSecond">Autor: ${tema.interprete}</a></li>
                            <li><p class="cardTextSecond">descripción: ${tema.descripcion}</p></li>
                        </ul>
                    </div>
                </div>
                `;
                tarjetas.push(tarjeta);
            }
            cards.innerHTML= tarjetas.join(' ');
    }

    const eliminarLista = () => {
        users = JSON.parse(localStorage.getItem('users'));
        let user = users.find((user)=>user.correo === usuario.correo);
        user.lista = [];
        localStorage.setItem("users", JSON.stringify(users));
        createLista();
    }

    const buscar = (filtro) => {
        temas = JSON.parse(localStorage.getItem('temas'));
        const temasFiltrados = temas.filter((tema) => 
        (tema?.titulo?.toLowerCase()?.includes(filtro?.toLowerCase()))
        ||
        (tema?.interprete?.toLowerCase()?.includes(filtro?.toLowerCase()))
        );
        mostrarCanciones(temasFiltrados);
    
    };


/** -------------------------------------------------------------------------------- */
const loadListSonmg = (user) =>{
    nameUser.textContent = user.nombre;
    temas = JSON.parse(localStorage.getItem('temas'));
    mostrarCanciones(temas);
    document.getElementById("formLogin").reset();
}
/** -------------------------------------------------------------------------------- */
const cerrarSesion = () =>{
   /*  mainContaneir.innerHTML=""; */ 
    nameUser.textContent='';    
    barraPlay.classList.add('hide');    
}
/** -------------------------------------------------------------------------------- */
const logearse = () => {
    $("#modalLogin").modal('show');
};
/** -------------------------------------------------------------------------------- */
const mostrarCanciones = (cancionesAMostrar) => {
    let tarjeta;
    let habilitacionLike = "";
    cards.innerHTML="";
    let tarjetas = [];    
    listsSong = cancionesAMostrar;
    //console.log(tarjetas);    
    if(usuario.tipo === 'admin') {
        for (const tema of cancionesAMostrar) {
            document.getElementById("formLogin").reset();
            nameUser.textContent = usuario.nombre;
            menuUsuario.setAttribute("disabled",false);
            tarjeta = `
            <div class="col mt-5 mb-1">
                <div class="card" style="width: 16rem;">
                <img style="max-height: 12rem;" src="${tema.cover}" alt="Imagen del Album de la Cancion"  onclick="playSong('${tema.id}')">   
                    <div class="card-body">
                        <ul class="textInfo">
                            <li><a class="cardText">${tema.titulo}</a></li>
                            <li><a class="cardTextSecond">Autor: ${tema.interprete}</a></li>
                            <li><p class="cardTextSecond">descripción: ${tema.descripcion}</p></li>
                            <li><button class="btn btn-outline-primary meGusta" onclick="like('${tema.id}')">
                                <i class="bi bi-emoji-heart-eyes-fill"></i>                                    
                                Me Gusta - ${tema.meGusta}</button>
                            </li>
                        </ul>
                            <button class="btn btn-danger" onclick="ModaleliminarVideo('${tema.id}', '${tema.titulo}')">Eliminar</button>
                    </div>
                </div>
            </div>
            `;
            tarjetas.push(tarjeta);
        }
        cards.innerHTML= tarjetas.join(' ');
        const botonIngresar = document.getElementById('botonIngresar');
        botonIngresar.innerHTML = '<button class="btn btn-dark" onclick="nuevoTema()">Insertar nuevo video</button>'       
        }
        else 
        {
            if (usuario.tipo === 'user') {
                for (const tema of cancionesAMostrar) {
                    document.getElementById("formLogin").reset();
                    nameUser.textContent = usuario.nombre;
                    menuUsuario.setAttribute("disabled",false);
                    habilitacionLike = "";
                    for (const idLike of usuario.listaMeGustas) {
                        if (idLike === tema.id) {
                            habilitacionLike = "disabled";
                        }
                    }
                    tarjeta = `
                    <div class="col mt-5 mb-1">
                        <div class="card" style="width: 16rem ;" onclick="playSong('${tema.id}')">
                        <img src="${tema.cover}" alt="Imagen del Album de la Cancion" style="max-height: 15rem;">   
                            <div class="card-body">
                                <ul class="textInfo">
                                    <li><a class="cardText">${tema.titulo}</a></li>
                                    <li><a class="cardTextSecond">Autor: ${tema.interprete}</a></li>
                                    <li><p class="cardTextSecond">descripción: ${tema.descripcion}</p></li>
                                    <li><button ${habilitacionLike} class="btn btn-outline-primary meGusta" onclick="like('${tema.id}')">
                                        <i class="bi bi-emoji-heart-eyes-fill"></i>                                    
                                        Me Gusta - ${tema.meGusta}</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    `;
                    tarjetas.push(tarjeta);
                }
                cards.innerHTML= tarjetas.join(' ');          
                const botonIngresar = document.getElementById('botonIngresar');
                botonIngresar.innerHTML = '';
            } else {
                for (const tema of cancionesAMostrar) {
                    tarjeta = `
                    <div class="col mt-5 mb-1">   
                        <div class="card bg-transparent" onclick="logearse()">
                        <img src="${tema.cover}" alt="Imagen del Album de la Cancion" style="max-height: 10rem;">   
                            <div class="card-body">
                                <ul class="textInfo">
                                    <li><a class="cardText">${tema.titulo}</a></li>
                                    <li><a class="cardTextSecond">Autor: ${tema.interprete}</a></li>
                                    <li><p class="cardTextSecond">descripción: ${tema.descripcion}</p></li>
                                    <li><button disabled class="btn btn-outline-primary meGusta" onclick="like(${tema.id})">
                                        <i class="bi bi-emoji-heart-eyes-fill"> </i>                                    
                                        Me Gusta - ${tema.meGusta}</button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    `;
                    tarjetas.push(tarjeta);
                }
        }
            cards.innerHTML= tarjetas.join(' ');          
            const botonIngresar = document.getElementById('botonIngresar');
            botonIngresar.innerHTML = '';
        }
}
/** -------------------------------------------------------------------------------- */
const main =  () => {
        temas =JSON.parse(localStorage.getItem('temas'));                          
        if (!temas) {
            localStorage.setItem('temas', JSON.stringify(song));
        }
        mostrarCanciones(temas);        
        totalSong = song.length;  
        menuUsuario.setAttribute("disabled",true);
        btnHome.setAttribute("cursor","not-allowed");
}
/** -------------------------------------------------------------------------------- */
const iniciarUsers = () =>{        
    users =JSON.parse(localStorage.getItem('users'));    
    if(!users) { 
        users=[];        
        const user = {
            nombre:'admin',
            correo:'administrador@gmail.com',
            clave: '1234',
            tipo:'admin',
            lista: [],
            listaMeGustas: []
        };               
        users.push(user);
        localStorage.setItem("users", JSON.stringify(users));        
    }
    main();
}

const register = () => {
    $("#modalLogin").modal('hide');
    $('#register').modal('show');
};
/**--------------------------------------------------------------------------------------------------------------- */
formLogin.addEventListener('submit',(e)=>{
    e.preventDefault();
    const usersLo = JSON.parse(localStorage.getItem('users'));    
    const userFound = usersLo.find((bus)=> bus.correo === e.target[0].value && bus.clave === e.target[1].value);    
    if(userFound) {
        $("#modalLogin").modal('hide');
        usuario = userFound;
        temas = JSON.parse(localStorage.getItem('temas'));
        if(!temas){
            localStorage.setItem('temas', JSON.stringify(song));
        }
        mostrarCanciones(temas);        
        totalSong = song.length;  
    }
    else
    {
        swal("Error de Login!", "Los datos ingresados no son correctos!!!", "error");
    }
});
/**--------------------------------------------------------------------------------------------------------------- */
formRegister.addEventListener('submit' , (e) =>{
    e.preventDefault();
    users =JSON.parse(localStorage.getItem('users'));
    let newUser = {
        nombre:e.target[0].value,
        correo:e.target[1].value,
        clave: e.target[2].value,
        tipo:'user',
        lista: [],
        listaMeGustas: []
    };
    const buscarUser = users.find((bus)=> bus.correo === e.target[1].value);  
    if(!buscarUser){
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    document.getElementById('formRegister').reset();
    $('#register').modal('hide');
    swal("¡Bien!", "El usuario se ha registrado con exito!!! :)", "success");
    $("#modalLogin").modal('hide');
    } else {
        swal("No es posible ingresar ese usuario", "Ingrese otro e- mail", "error");
    }
});

iniciarUsers()

audio.addEventListener('timeupdate',barraTiempoSong);

audio.addEventListener("ended", () => btnNextSong())

btnRepetir.addEventListener('click',repetirSong);

btnAleatorio.addEventListener('click',(e) =>{
    e.preventDefault();
    if(randonSong===false) {
        btnAleatorio.style.color="white";
        randonSong=true;
        repSong=true;
        repetirSong();     
        aleatorioSong();
    } else {
        randonSong=false;        
        btnAleatorio.style.color="grey";
    }
});


