let cards = document.getElementById('cards');
let formCreate = document.getElementById('createNewVideo');
let videos = [];
let idVideoDelete = '';





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
    console.log('INSERTAR VIDEO');
    $('#createNewVideo').modal('show');
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

videos = JSON.parse(localStorage.getItem('videos'));
if(!videos) {
    cards.innerHTML = 'NO HAY VIDEOS PARA MOSTRAR';
}else {
    mostrarVideos(videos);
}