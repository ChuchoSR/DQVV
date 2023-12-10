// Reemplaza 'YOUR_API_KEY' con tu clave API
const apiKey = 'AIzaSyA_d3qidBx7-N5v_j8_Wv1__LUjpPaFXz8';

// Reemplaza 'CHANNEL_ID' con el ID de tu canal de YouTube
const channelId = 'UCwdPa9D5SkZOizmcuGYaELQ';

// Función para cargar episodios
function cargarEpisodios(apiUrl) {
    // Hacer la solicitud a la API
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Procesar la respuesta y cargar episodios
            const episodiosContainer = document.getElementById('episodios-container');

            // Iterar sobre los videos y agregar episodios al contenedor
            data.items.forEach(video => {
                const capitulo = obtenerNumeroCapitulo(video.snippet.title);
                const titulo = video.snippet.title;
                const imagen = video.snippet.thumbnails.medium.url;
                const videoId = video.id.videoId;

                const episodioHTML = `
                    <div class="left-container">
                        <h2 class="titulo-episodio titulo">${titulo}</h2>
                        <p>${video.snippet.description}</p>
                    </div>
                    <div class="right-container">
                        <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
                            <img class="img-episodio" src="${imagen}" alt="${titulo}">
                        </a>
                    </div>
                `;

                episodiosContainer.innerHTML += episodioHTML;
            });
        })
        .catch(error => {
            console.error('Error al recuperar datos:', error);
        });
}

// Función para obtener el número de capítulo desde el título del video
function obtenerNumeroCapitulo(titulo) {
    // Aquí implementa la lógica para extraer el número de capítulo desde el título
    // Puedes usar expresiones regulares u otros métodos según el formato de tus títulos
    // Ejemplo simple: asumimos que el número de capítulo está al final del título
    const match = titulo.match(/(\d+)$/);
    return match ? match[1] : 'N/A';
}

// Llamar a la función para cargar episodios cuando la página se cargue
window.onload = function () {
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&maxResults=5&order=date&key=${apiKey}`;
    cargarEpisodios(apiUrl);
};


