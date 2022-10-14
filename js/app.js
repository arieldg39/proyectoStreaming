const listSong = document.getElementById("listSong");
const cover = document.getElementById("cover");
const audio = document.getElementById("audio");
const nameSong = document.getElementById("nameSong");
const nameSinger = document.getElementById("nameSinger");
const progress = document.getElementById("progress");
const barraPlay = document.getElementById("barraPlay");

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


var secondPlay=0;
let listado="";
let lists;
let opcion;
var actualSong=0;
let totalSong=0;

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
            nameSong.textContent=element.title;  
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
        playSong(0);
    }
}
/** -------------------------------------------------------------------------------- */
const main = async () => {
    // Get #1 track on trending
    /*const response = await fetch('https://discoveryprovider.audius.co/v1/tracks/trending?app_name=ExampleApp', {
        'mode': 'cors',
        'headers': {
            'Access-Control-Allow-Origin': '*',
        }
    });*/
    const response = await fetch('../js/song.txt'); 
    const playlists= await response.json();    
    //console.log(playlists);
    songLists = playlists;
    totalSong = Object.keys(playlists.song).length;
    console.log(totalSong);
    //const topTrack = playlists.data[1];    
    for (let i = 0; i < totalSong; i++) {
        const element = playlists.song[i];
        if (i==0) {
            listado=`<div class="col mt-5">         
                        <div class="card bg-transparent">
                            <img src="../img/TheCovelarge.jpg" class="card-img-top imgcover" alt="...">        
                            <div class="card-body text-center">                        
                                <p class="card-text text-xl-center" style="font-size: 18px; font-weight: bold;">${element.title}</p>
                                <p class="text-start text-opacity-100" >Artista: ${element.interprete}</p>
                                <p class="text-start text-opacity-100" >Duración ${secondsToString(element.duracion)}</p>
                                <div class="d-flex justify-content-center align-content-between">
                                <button class="btn btn-primary" onclick="playSong('${element.id}')"><i class="bi bi-play"></i> Play</button>
                                </div>
                            </div>          
                        </div>
                    </div>`;
        }else{
            listado+=`<div class="col mt-5">         
                        <div class="card">
                            <img src="./img/avatars/users1.png" class="card-img-top imgcover" alt="...">        
                            <div class="card-body text-center">                        
                                <p class="card-text text-xl-center" style="font-size: 18px; font-weight: bold;">${element.title}</p>
                                <p class="text-start text-opacity-100" >Genero: ${element.interprete}</p>
                                <p class="text-start text-opacity-100" >Duración ${secondsToString(element.duracion)}</p>
                                <div class="d-flex justify-content-center align-content-between">
                                <button class="btn btn-primary" onclick="playSong('${element.id}')"><i class="bi bi-play"></i> Play</button>
                                </div>
                            </div>          
                        </div>
                    </div>`;
        }        
    }    
    mainContaneir.innerHTML=listado;    
    //cover.innerHTML = topTrack.user.cover_photo.640x;
    // Display result
    //document.body.innerHTML = `<pre>${JSON.stringify(playlists, null, 2)}</pre>`;
    
    // Play Audio!
    //new Audio(`https://discoveryprovider.audius.co/v1/tracks/${topTrack.id}/stream?app_name=ExampleApp`).play()
}
/** -------------------------------------------------------------------------------- */
main();

audio.addEventListener('timeupdate',barraTiempoSong);
audio.addEventListener("ended", () => btnNextSong())

