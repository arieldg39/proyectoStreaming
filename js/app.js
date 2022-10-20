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


const iconPlay = document.getElementById("iconPlay");
const iconNext = document.getElementById("iconNext");
const duracionSong = document.getElementById("duracionSong");
const inicioSong = document.getElementById("inicioSong");
const barrarProgress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");
let cards = document.getElementById('cards');

let formCreate = document.getElementById('createNewTema');
let formLogin = document.getElementById('modalLogin');


var secondPlay=0;
let listado="";
let lists;
let opcion;
var actualSong=0;
let totalSong=0;
var users=[];
let temas = [];
let idVideoDelete = '';
let usuario = '';

$(function() {
    $('[data-toggle="popover"]').popover()
})

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
function contador(){
	inicioSong.textContent=secondsToString(secondPlay);    
    secondPlay++;
}
/** -------------------------------------------------------------------------------- */
const barraTiempoSong = (event) =>{
    const {duration, currentTime} = event.srcElement;
    const percent = (currentTime / duration) * 100;
    barrarProgress.style.width = percent+"%";    
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
    // Play Audio!      
    for (let i = 0; i < totalSong; i++) {
        const element = songLists.song[i];           
        if (id==element.id) {      
            actualSong=id;     
            audio.src=element.carpeta;                        
            barrarProgress.style.width="0%";
            secondPlay=0;
            inicioSong.textContent="00:00";
            nameSong.textContent=element.titulo;  
            nameSinger.textContent=element.interprete;          
            inicioSong.textContent="00:00";
            duracionSong.textContent="/"+secondsToString(element.duracion);
            barraPlay.classList.remove("hide");
            cover.src="../img/TheCovelarge.jpg";                        
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
    if (actualSong < totalSong) {
        actualSong++;        
        playSong(actualSong);
    } else {
        playSong(0);
    }
}
/** -------------------------------------------------------------------------------- */
const btnbackward = () => {    
    if (actualSong > 0) {        
        actualSong--;
        playSong(actualSong);
    } else {
        totalSong--;
        playSong(totalSong);
    }
}
/** -------------------------------------------------------------------------------- */
/** -------------------------------------------------------------------------------- */
const mostrarCanciones = (cancionesAMostrar) => {
    let tarjeta;
    const tarjetas = [];
    if(usuario.tipo === 'admin') {
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
        }
}

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
    console.log(id);
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
    let videolike = temas.find((video) => video.id === idLike);
    console.log(videolike);
    videolike.meGusta = videolike.meGusta + 1;
    console.log(videolike.meGusta);
    localStorage.setItem('temas', JSON.stringify(temas));
    mostrarCanciones(temas);
}


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

const logearse = () => {
    $("#modalLogin").modal('show');
};

formLogin.addEventListener('submit',(e)=>{
    e.preventDefault();
    const usersLo = JSON.parse(localStorage.getItem('users'));    
    const userFound = usersLo.find((bus)=> bus.correo === e.target[0].value && bus.clave === e.target[1].value);    
    if(userFound) {
        $("#modalLogin").modal('hide');
        usuario = userFound;
        loadListSonmg(usuario);
    }
    else
    {
        swal("Error de Login!", "Los datos ingresados no son correctos!!!", "error");
    }
});

/** -------------------------------------------------------------------------------- */
const main = async () => {                  
        const response = await fetch('../js/song.txt'); 
        const playlists= await response.json();
        localStorage.setItem('temas', JSON.stringify(playlists));
        mostrarCanciones(playlists);
        songLists = playlists;
        totalSong = Object.keys(playlists).length;                           
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
            tipo:'admin'
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


formRegister.addEventListener('submit' , (e) =>{
    e.preventDefault();
    users =JSON.parse(localStorage.getItem('users'));
    let newUser = {
        nombre:e.target[0].value,
        correo:e.target[1].value,
        clave: e.target[2].value,
        tipo:'user'
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

//main();
audio.addEventListener('timeupdate',barraTiempoSong);
audio.addEventListener("ended", () => btnNextSong())

