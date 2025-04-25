//El fichero datos.js está compuesto por todos los arrays necesarios para el funcionamiento de la app, estos arrays se exportaran cuando sean necesarios.
//La variable rutas es un array compuesto por todas las rutas posibles que pueden hacer los peregrinos

var rutas = [
  { "id": 1, "nombre": "Camino Francés", "distancia": 764 },
  { "id": 2, "nombre": "Camino del Norte", "distancia": 825 },
  { "id": 3, "nombre": "Camino Primitivo", "distancia": 321 }
];

var etapas = [
  { "ruta": 1, "orden": 1, "origen": "Saint-Jean-Pied-de-Port", "destino": "Roncesvalles", "dificultad": 7, "desnivel": 1200, "distancia": 25 },
  { "ruta": 1, "orden": 2, "origen": "Roncesvalles", "destino": "Zubiri", "dificultad": 5, "desnivel": 500, "distancia": 22 },
  { "ruta": 2, "orden": 1, "origen": "Irún", "destino": "San Sebastián", "dificultad": 6, "desnivel": 300, "distancia": 28 },
  { "ruta": 3, "orden": 1, "origen": "Oviedo", "destino": "Grado", "dificultad": 6, "desnivel": 400, "distancia": 25 }
];

var sanitarios = [
  { "id": 1, "nombre": "Juan", "apellidos": "Pérez García", "login": "juan.perez", "password": "12345" },
  { "id": 2, "nombre": "Ana", "apellidos": "Martínez López", "login": "ana.martinez", "password": "67890" },
  { "id": 3, "nombre": "Carlos", "apellidos": "Sánchez Díaz", "login": "carlos.sanchez", "password": "abcde" }
];

var peregrinos = [
  { "id": 1, "nombre": "Pedro", "apellidos": "González Ruiz", "fecha_nacimiento": "1985-04-12", "genero": "H", "altura": 175, "peso": 70, "codigo_acceso": "PGR19850412" },
  { "id": 2, "nombre": "María", "apellidos": "López Pérez", "fecha_nacimiento": "1990-08-25", "genero": "M", "altura": 160, "peso": 55, "codigo_acceso": "MLP19900825" },
  { "id": 3, "nombre": "Juan", "apellidos": "Martínez Sánchez", "fecha_nacimiento": "1978-02-03", "genero": "H", "altura": 180, "peso": 80, "codigo_acceso": "JMS19780203" },
];

var viajes = [
  { "id": 1, "peregrino": 2, "ruta": 1, "fecha_inicio": "2025-03-01T00:00:00Z", "fecha_fin": null, "etapa_origen": 1, "etapa_destino": 1 },
  { "id": 2, "peregrino": 1, "ruta": 3, "fecha_inicio": "2025-04-05T00:00:00Z", "fecha_fin": null, "etapa_origen": 2, "etapa_destino": 2 },
  { "id": 3, "peregrino": 2, "ruta": 1, "fecha_inicio": "2025-05-15T00:00:00Z", "fecha_fin": "2025-05-25T00:00:00Z", "etapa_origen": 1, "etapa_destino": 3 },
  { "id": 4, "peregrino": 3, "ruta": 2, "fecha_inicio": "2025-05-15T00:00:00Z", "fecha_fin": null, "etapa_origen": 1, "etapa_destino":2 },
  { "id": 5, "peregrino": 2, "ruta": 1, "fecha_inicio": "2025-05-15T00:00:00Z", "fecha_fin": "2025-05-25T00:00:00Z", "etapa_origen": 1, "etapa_destino": 3 },
  { "id": 6, "peregrino": 1, "ruta": 3, "fecha_inicio": "2025-05-15T00:00:00Z", "fecha_fin": null, "etapa_origen": 1, "etapa_destino": 3 }

];

var jornadas = [
  { "viaje": 1, "etapa": 1, "fecha_inicio": "2025-03-01T08:00:00Z", "fecha_fin": "2025-03-01T12:00:00Z" },
  { "viaje": 1, "etapa": 2, "fecha_inicio": "2025-03-02T09:00:00Z", "fecha_fin": "2025-03-02T13:00:00Z" },
  { "viaje": 2, "etapa": 1, "fecha_inicio": "2025-04-05T07:30:00Z", "fecha_fin": "2025-04-05T11:45:00Z" },
  { "viaje": 3, "etapa": 3, "fecha_inicio": "2026-04-05T07:30:00Z", "fecha_fin": "2025-06-05T11:45:00Z" },
  { "viaje": 3, "etapa": 3, "fecha_inicio": "2025-04-06T07:30:00Z", "fecha_fin": "2025-04-05T11:45:00Z" }

];

var mensajes = [
  { "id": 1, "sanitario": null, "viaje": 1, "texto": "Llegué a la primera etapa", "fecha": "2025-03-01T12:30:00Z", "etapa": 1 },
  { "id": 2, "sanitario": 1, "viaje": 1, "texto": "Recuerda hidratarte", "fecha": "2025-03-01T13:00:00Z", "etapa": 1 },
  { "id": 3, "sanitario": null, "viaje": 4, "texto": "Iniciando nueva etapa", "fecha": "2025-04-05T07:00:00Z", "etapa": 1 },
  { "id": 4, "sanitario": 2, "viaje": 3, "texto": "Iniciando nueva etapa", "fecha": "2025-04-05T07:00:00Z", "etapa": 1 },
  { "id": 5, "sanitario": null, "viaje": 3, "texto": "Iniciando nueva etapa", "fecha": "2025-04-05T07:00:00Z", "etapa": 1 },
  { "id": 6, "sanitario": 3, "viaje": 2, "texto": "Duerme y Descansa", "fecha": "2025-04-05T07:00:00Z", "etapa": 2 }


];

// Exportar los datos
module.exports = {
  rutas: rutas,
  etapas: etapas,
  sanitarios: sanitarios,
  peregrinos: peregrinos,
  viajes: viajes,
  jornadas: jornadas,
  mensajes:mensajes
};