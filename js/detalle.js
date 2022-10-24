temas = JSON.parse(localStorage.getItem("temas"));
console.log(temas);
contenedor = document.getElementById("contenedor");
let id = window.location.hash.substr(1)
console.log(id);
const tema = temas.find((tema) => `${tema.id}` === `${id}`)
console.log(tema);
let detalle = `
    <div>
        <img class="img" src="${tema.cover}" alt="">
    </div>
    <div>
        <ul>
            <li>Titulo: ${tema.titulo} </li>
            <li>Interprete: ${tema.interprete} </li>
            <li>Duración: ${tema.duracion} </li>
            <li>Categoria: ${tema.categoria} </li>
            <li>Me gustas: ${tema.meGusta} </li>
        </ul>
    </div>
`
contenedor.innerHTML= detalle;

const volver = () => {
    window.location= `../index.html`

}


