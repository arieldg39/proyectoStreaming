const song =[
    {
        "id":1,
        "titulo":"In The Air Tonight (Radio Edit) ft. Delacey",
        "interprete":"Alex Midi",
        "duracion":227,
        "carpeta":"../audio/Alex Midi - In The Air Tonight (Radio Edit) ft. Delacey.mp3",
        "meGusta":0,
        "categoria":"",
        "cover":"../img/alexmidi.jpg"
    },
    {
        "id":2,
        "titulo":"Bronceado",
        "interprete":"Marama",
        "duracion":154,
        "carpeta":"../audio/Bronceado.mp3",
        "meGusta":0,
        "categoria":"",
        "cover":"../img/marama.jpg"
    },
    {
        "id":3,
        "titulo":"Blame ft. John Newman",
        "interprete":"Calvin Harris",
        "duracion":154,
        "carpeta":"../audio/Calvin Harris - Blame ft. John Newman.mp3",
        "meGusta":0,
        "categoria":"",
        "cover":"../img/calvinharrisblame.jpg"
    },
    {
        "id":4,
        "titulo":"Robarte un Beso",
        "interprete":"Carlos Vives - Sebastian Yatra",
        "duracion":181,
        "carpeta":"../audio/Carlos Vives Sebastian Yatra - Robarte un Beso.mp3",
        "meGusta":0,"categoria":"",
        "cover":"../img/Robarte_un_Beso.jpg"
    },
    {
        "id":5,
        "titulo":"Para Enamorarte",
        "interprete":"CNCO",
        "duracion":181,
        "carpeta":"../audio/CNCO   Para Enamorarte.mp3",
        "meGusta":0,
        "categoria":"",
        "cover":"../img/ParaEnamorarte.jpg"
        },
    {
        "id":6,
        "titulo":"Adventure Of A Lifetime",
        "interprete":"Coldplay",
        "duracion":181,
        "carpeta":"../audio/Coldplay - Adventure Of A Lifetime.mp3",
        "meGusta":0,
        "categoria":"",
        "cover":"../img/aventure.jpg"
    },
    {
        "id":7,
        "titulo":"Mama Said",
        "interprete":"Lukas Graham",
        "duracion":208,
        "carpeta":"../audio/Lukas Graham - Mama Said [OFFICIAL MUSIC VIDEO].mp3",
        "meGusta":0,
        "categoria":"",
        "cover":"../img/lukas_graham_mama_said.jpg"
    },
    {
        "id":8,
        "titulo":"In the air tonight (live)",
        "interprete":"Phil Collins",
        "duracion":408,
        "carpeta":"../audio/Phil Collins - In the air tonight (live)",
        "meGusta":0,
        "categoria":"",
        "cover":"../img/collings.jpg"
    },
    {
        "id":9,
        "titulo":"Amor Con Hielo",
        "interprete":"Morat",
        "duracion":408,
        "carpeta":"../audio/Morat - Amor Con Hielo.mp3",
        "meGusta":0,
        "categoria":"",
        "cover":"../img/morat_amor_con_hielo.jpg"
    },
    {
        "id":10,
        "titulo":"Like a Stone",
        "interprete":"Audioslave",
        "duracion":408,
        "carpeta":"../audio/Audioslave - Like a Stone.mp3",
        "meGusta":0,
        "categoria":"",
        "cover":"../img/audioslave.jpg"
    },
    {
        "id":11,
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
        "id":12,
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
/** -------------------------------------------------------------------------------- */
const logearse = () => {
    $("#modalLogin").modal('show');
};
/** -------------------------------------------------------------------------------- */
const mostrarCanciones = (cancionesAMostrar) => {
    let tarjeta;
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
                            <li><button class="btn btn-outline-primary meGusta" onclick="like(${tema.id})">
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
                    tarjeta = `
                    <div class="col mt-5 mb-1">
                        <div class="card" style="width: 16rem ;" onclick="playSong('${tema.id}')">
                        <img src="${tema.cover}" alt="Imagen del Album de la Cancion" style="max-height: 15rem;">   
                            <div class="card-body">
                                <ul class="textInfo">
                                    <li><a class="cardText">${tema.titulo}</a></li>
                                    <li><a class="cardTextSecond">Autor: ${tema.interprete}</a></li>
                                    <li><p class="cardTextSecond">descripción: ${tema.descripcion}</p></li>
                                    <li><button class="btn btn-outline-primary meGusta" onclick="like(${tema.id})">
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
                                    <li><button class="btn btn-outline-primary meGusta" onclick="like(${tema.id})">
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
        localStorage.setItem('temas', JSON.stringify(song));
        mostrarCanciones(song);        
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
/**--------------------------------------------------------------------------------------------------------------- */
formLogin.addEventListener('submit',(e)=>{
    e.preventDefault();
    const usersLo = JSON.parse(localStorage.getItem('users'));    
    const userFound = usersLo.find((bus)=> bus.correo === e.target[0].value && bus.clave === e.target[1].value);    
    if(userFound) {
        $("#modalLogin").modal('hide');
        usuario = userFound;
        localStorage.setItem('temas', JSON.stringify(song));
        mostrarCanciones(song);        
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


