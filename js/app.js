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

let formCreate = document.getElementById('createNewVideo');
let formLogin = document.getElementById('modalLogin');


var secondPlay=0;
let listado="";
let lists;
let opcion;
var actualSong=0;
let totalSong=0;
var users=[];
let videos = [];
let idVideoDelete = '';

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
const mostrarVideos = (videosAMostrar) => {
    const tarjetas = [];
    for (const video of videosAMostrar) {
        const tarjeta = `
        <div class="card" style="width: 18rem;">
        <img src="${video.raiz}" alt="">
            <div class="card-body">
                <ul>
                    <li><a class="cardText">Nombre: ${video.nombre}</a></li>
                    <li><a class="cardTextSecond">Autor: ${video.autor}</a></li>
                    <li><p class="cardTextSecond">descripción: ${video.descripcion}</p></li>
                </ul>
                    <button class="btn btn-danger" onclick="ModaleliminarVideo('${video.id}', '${video.nombre}')">Eliminar</button>
            </div>
        </div>
        `
        tarjetas.push(tarjeta);
    }
    cards.innerHTML= tarjetas.join(' ');
}

const nuevoVideo = () => {    
    $('#createNewVideo').modal('show');
    //$('#modalLogin').modal('show'); 
}

formCreate.addEventListener('submit' , (e) =>{
    e.preventDefault();
    let newVideo = {
        nombre: e.target[0].value,
        autor: e.target[1].value,
        raiz: e.target[2].value,
        descripcion: e.target[3].value,
        meGusta: 0,
        noMeGusta: 0,
        id: generateId(),

    }
    let videosStorage = localStorage.getItem('videos');
    console.log(videosStorage);
    if(!videosStorage) {
        localStorage.setItem('videos', JSON.stringify([newVideo]));
    }else {
        videos.push(newVideo);
        console.log(videos);
        localStorage.setItem('videos', JSON.stringify(videos));
    }
    videos = JSON.parse(localStorage.getItem('videos'));
    mostrarVideos(videos);
    document.getElementById('formCreate').reset();
    $('#createNewVideo').modal('hide');
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
        Si elimina a este video perdera su información de forma permanente 
        <br>
        <br> 
        Esta seguro que desea eliminar al Video ${nombre} 
    </b>`;
    idVideoDelete = id;
    $('#deleteVideoModal').modal('show');
};

const deleteVideo = () => {
    videos = JSON.parse(localStorage.getItem('videos'));
    let newVideos = videos.filter((video) => video.id != idVideoDelete);
    localStorage.setItem('videos', JSON.stringify(newVideos)); 
    console.log(newVideos);
    mostrarVideos(newVideos);
    $('#deleteVideoModal').modal('hide');
}

/*videos = JSON.parse(localStorage.getItem('videos'));
if(!videos) {
    cards.innerHTML = 'NO HAY VIDEOS PARA MOSTRAR';
}else {
    mostrarVideos(videos);
}*/
/** -------------------------------------------------------------------------------- */
const loadListSonmg = (user) =>{
    if(user.tipo == "admin")
    {     
        nameUser.textContent = user.nombre;
        for (let i = 0; i < totalSong; i++) {
            const element = songLists.song[i];            
            if (i==0) {
                listado=`<div class="col mt-5">         
                            <div class="card bg-transparent" onclick="playSong('${element.id}')">
                                <img src="../img/TheCovelarge.jpg" class="card-img-top imgcover" alt="...">        
                                <div class="card-body text-center">                        
                                    <p class="card-text text-xl-center" style="font-size: 18px; font-weight: bold;">${element.titulo}</p>
                                    <p class="text-start text-opacity-100" >Artista: ${element.interprete}</p>
                                    <p class="text-start text-opacity-100" >Duración ${secondsToString(element.duracion)}</p>
                                    <div class="d-flex justify-content-center align-content-between">
                                    
                                    </div>
                                </div>          
                            </div>
                        </div>`;
            }else{
                listado+=`<div class="col mt-5">         
                            <div class="card bg-transparent" onclick="playSong('${element.id}')">
                                <img src="./img/avatars/users1.png" class="card-img-top imgcover" alt="...">        
                                <div class="card-body text-center">                        
                                    <p class="card-text text-xl-center" style="font-size: 18px; font-weight: bold;">${element.titulo}</p>
                                    <p class="text-start text-opacity-100" >Genero: ${element.interprete}</p>
                                    <p class="text-start text-opacity-100" >Duración ${secondsToString(element.duracion)}</p>
                                    <div class="d-flex justify-content-center align-content-between">                                    
                                    </div>
                                </div>          
                            </div>
                        </div>`;
            }        
        }    
        mainContaneir.innerHTML=listado; 
    }else{

    }
    document.getElementById("formLogin").reset();
}
/** -------------------------------------------------------------------------------- */
const cerrarSesion = () =>{
    mainContaneir.innerHTML=""; 
    nameUser.textContent='';    
    barraPlay.classList.add('hide');    
    $("#modalLogin").modal('show');
}
/** -------------------------------------------------------------------------------- */
const main = async () => {                  
        const response = await fetch('../js/song.txt'); 
        const playlists= await response.json();            
        songLists = playlists;
        totalSong = Object.keys(playlists.song).length;                
        $("#modalLogin").modal('show');               
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


iniciarUsers()

//main();
audio.addEventListener('timeupdate',barraTiempoSong);
audio.addEventListener("ended", () => btnNextSong())

formLogin.addEventListener('submit',(e)=>{
    e.preventDefault();
    const usersLo = JSON.parse(localStorage.getItem('users'));    
    const userFound = usersLo.find((bus)=> bus.correo === e.target[0].value && bus.clave === e.target[1].value);    
    if(userFound) {
        $("#modalLogin").modal('hide');
        loadListSonmg(userFound);
    }
    else
    {
        swal("Error de Login!", "Los datos ingresados no son correctos!!!", "error");
    }
});


