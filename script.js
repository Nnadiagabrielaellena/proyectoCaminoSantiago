// Inicializar el mapa de Leaflet
var map = L.map('map').setView([42.8, -8.5], 6); // Coordenadas de España

// Cargar el mapa base (usamos OpenStreetMap)
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Marcadores de ejemplo de las etapas
var etapa1 = L.marker([42.937, -1.710]).addTo(map).bindPopup("<b>Saint-Jean-Pied-de-Port</b><br>Inicio del Camino");
var etapa2 = L.marker([42.975, -1.653]).addTo(map).bindPopup("<b>Roncesvalles</b><br>Primera etapa");
var etapa3 = L.marker([42.484, -2.446]).addTo(map).bindPopup("<b>Pamplona</b><br>Etapa 2");

// Puntos de interés adicionales
var puntosDeInteres = [
    { name: "Iglesia de Santiago", lat: 42.938, lon: -1.711, description: "Una iglesia histórica en el corazón de Saint-Jean-Pied-de-Port." },
    { name: "Albergue El Camino", lat: 42.975, lon: -1.650, description: "Un acogedor albergue para peregrinos." },
    { name: "Fuente de Roncesvalles", lat: 42.980, lon: -1.660, description: "Fuente natural para reabastecer agua." },
];

// Añadir puntos de interés al mapa
puntosDeInteres.forEach(function(punto) {
    L.marker([punto.lat, punto.lon]).addTo(map)
        .bindPopup("<b>" + punto.name + "</b><br>" + punto.description);
});

// Función para mostrar la etapa seleccionada
function mostrarEtapa(etapa) {
    if (etapa === 1) {
        map.setView([42.937, -1.710], 10); // Centra en la etapa 1
    } else if (etapa === 2) {
        map.setView([42.975, -1.653], 10); // Centra en la etapa 2
    } else if (etapa === 3) {
        map.setView([42.484, -2.446], 10); // Centra en la etapa 3
    }
    // Actualizar la lista de alojamientos (solo ejemplo)
    mostrarAlojamientos(etapa);
}

// Función para mostrar distancia
function mostrarDistancia() {
    const etapa = document.getElementById('etapa').value;
    const distancia = document.getElementById('distancia');
    if (etapa === "1") {
        distancia.textContent = "Distancia: 25 km";
    } else if (etapa === "2") {
        distancia.textContent = "Distancia: 40 km";
    } else if (etapa === "3") {
        distancia.textContent = "Distancia: 60 km";
    } else if (etapa === "4") {
        distancia.textContent = "Distancia: 90 km";
    }
}

// Función para mostrar alojamientos
function mostrarAlojamientos(etapa) {
    let alojamientos = "";
    if (etapa === 1) {
        alojamientos = "<ul><li>Albergue El Camino</li><li>Hostal X</li></ul>";
    } else if (etapa === 2) {
        alojamientos = "<ul><li>Hostal A</li><li>Hotel B</li></ul>";
    } else if (etapa === 3) {
        alojamientos = "<ul><li>Albergue La Estrella</li><li>Hotel Camino</li></ul>";
    }
    document.getElementById('alojamientos-info').innerHTML = alojamientos;
}

// Función de tracking GPS
var userLocationMarker = null;

function startTracking() {
    if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function(position) {
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;

            // Mover el marcador de la ubicación
            if (!userLocationMarker) {
                userLocationMarker = L.marker([lat, lon]).addTo(map);
            } else {
                userLocationMarker.setLatLng([lat, lon]);
            }

            // Centrar el mapa en la ubicación actual
            map.setView([lat, lon], 14);
            document.getElementById('gpsStatus').textContent = "Tu ubicación: " + lat.toFixed(4) + ", " + lon.toFixed(4);
        }, function(error) {
            document.getElementById('gpsStatus').textContent = "Error obteniendo tu ubicación: " + error.message;
        });
    } else {
        alert("La geolocalización no está soportada por tu navegador.");
    }
}
