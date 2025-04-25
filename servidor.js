var express = require("express");
var app = express();
var cors = require("cors");
/* es una característica de seguridad del navegador que restringe cómo los recursos en una página web pueden ser
 solicitados desde otro dominio fuera del dominio desde el cual se sirvió el recurso. */

app.use("/appCliente", express.static("cliente")); 
app.use(express.json()); 
app.use(cors());
var datosServidor = require('./datos.js');
var rutas = datosServidor.rutas;
var sanitarios = datosServidor.sanitarios;
var etapas = datosServidor.etapas;
var peregrinos = datosServidor.peregrinos;
var viajes = datosServidor.viajes;
var jornadas = datosServidor.jornadas;
var mensajes = datosServidor.mensajes;

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor escuchando en http://localhost:3000');
});

// Primer Api, que sala un array de rutas
app.get("/api/rutas", function(req, res){
    res.status(200).json(rutas);
});

// Segundo Api, que devuelve un array de todas las etapas de una ruta
app.get("/api/rutas/:id/etapas", function(req, res) {
    var idRuta = parseInt(req.params.id); // Convertir ID a número
    var etapasRuta = etapas.filter(etapa => etapa.ruta === idRuta); // Filtrar las etapas por ID de la ruta

    if (etapasRuta.length > 0) {
        res.status(200).json(etapasRuta); // Devolver las etapas de la ruta
    } else {
        res.status(404).json({ error: "Ruta no encontrada" }); // Ruta no encontrada
    }
});

// Api para el Login - entrar(); recibe el login y la contraseña del sanitario y devuelve el ID del sanitario
app.post("/api/sanitarios/login", function (req, res) {
    var san = {
        login: req.body.login, // Antes: usuario
        password: req.body.password 
    };
    console.log("Recibiendo datos en /api/sanitarios/login:", req.body);
    for (var sanitario of sanitarios) {
        if (sanitario.login === san.login && sanitario.password === san.password) {
            return res.status(200).json({ id: sanitario.id}); // Retornar el ID y salir de la función
            
        }
    }

    // Si no se encuentra el usuario, enviar un error 403
    res.status(403).json({ error: "Usuario o contraseña incorrectos" });
});

// Crea un nuevo sanitario - guardar()
app.post("/api/sanitarios", function (req, res) {
    console.log(" Recibiendo datos en /api/sanitarios:", req.body);

    var loginNuevo = req.body.login; // Obtener el nuevo login del cuerpo de la solicitud
    var loginRepetido = sanitarios.filter(s => s.login === loginNuevo);

    if (loginRepetido.length > 0) {
        console.log("Error: El login ya está en uso por otro sanitario.");
        return res.status(400).json({ error: "El login ya está en uso por otro sanitario." });
    }

    var nuevoSanitario = {
        id: sanitarios.length + 1, // Asigna un ID único
        nombre: req.body.nombre,
        apellidos: req.body.apellidos,
        login: req.body.login,
        password: req.body.password
    };    
    // Agregar al array de sanitarios
    sanitarios.push(nuevoSanitario);
    console.log(" Nuevo sanitario registrado:", nuevoSanitario);

    res.status(201).json({ mensaje: "Registro exitoso", id: nuevoSanitario.id });
});

// editarDatos()
app.put("/api/sanitarios/:id", function (req, res) {
    var idSanitario = parseInt(req.params.id); // Convertir ID a número
    console.log(`Recibiendo solicitud de actualización para el sanitario con ID: ${idSanitario}`);

    var loginNuevo = req.body.login; // Obtener el nuevo login del cuerpo de la solicitud
    var loginRepetido = sanitarios.filter(s => s.login === loginNuevo);

    if (loginRepetido.length > 0) {
        console.log("Error: El login ya está en uso por otro sanitario.");
        return res.status(400).json({ error: "El login ya está en uso por otro sanitario." });
    }

    var sanitario = sanitarios.find(s => s.id === idSanitario);

    // Actualizar los datos del sanitario
    sanitario.nombre = req.body.nombre || sanitario.nombre;
    sanitario.apellidos = req.body.apellidos || sanitario.apellidos;
    sanitario.login = req.body.login || sanitario.login;
    sanitario.password = req.body.password || sanitario.password;

    console.log("Datos actualizados correctamente:", sanitario);
    res.status(200).json({ mensaje: "Datos actualizados correctamente" });
});

// Api para obtener los datos de un sanitario por ID (sin devolver la contraseña)
app.get("/api/sanitarios/:id", function (req, res) {
    var idSanitario = parseInt(req.params.id); // Convertir ID a número
    var sanitario = sanitarios.find(s => s.id === idSanitario); // Encontrar el sanitario por ID

    if (sanitario) {
        // Crear un objeto sin la contraseña
        var sanitarioSinPassword = {
            id: sanitario.id,
            nombre: sanitario.nombre,
            apellidos: sanitario.apellidos,
            login: sanitario.login
        };
        res.status(200).json(sanitarioSinPassword); // Devolver el objeto sin la contraseña
    } else {
        res.status(404).json({ error: "Sanitario no encontrado" }); // Sanitario no encontrado
    }
});

// Api para obtener los datos de un peregrino por ID (sin  el código de acceso)
app.get("/api/peregrinos/:id", function (req, res) {
    var idPeregrino = parseInt(req.params.id); // Convertir ID a número
    var peregrino = peregrinos.find(p => p.id === idPeregrino); // Encontrar el peregrino por ID

    if (peregrino) {
        // Crear un objeto sin el código de acceso
        var peregrinoSinCodigoAcceso = {
            id: peregrino.id,
            nombre: peregrino.nombre,
            apellido: peregrino.apellidos,
            genero: peregrino.genero,
            fecha_nacimiento: peregrino.fecha_nacimiento,
            peso: peregrino.peso,
            altura: peregrino.altura
            // Agrega aquí otros campos que quieras devolver
        };
        res.status(200).json(peregrinoSinCodigoAcceso); // Devolver el objeto sin el código de acceso
    } else {
        res.status(404).json({ error: "Peregrino no encontrado" }); // Peregrino no encontrado
    }
});

// Api para obtener todos los viajes activos (sin fecha de finalización)
// http://localhost:3000/api/viajes-activos?ruta=3
app.get("/api/viajes-activos", function (req, res) {
    var idRuta = req.query.ruta ? parseInt(req.query.ruta) : null; // Obtener el parámetro de consulta 'ruta' y convertirlo a número si existe
    var viajesActivos;

    if (idRuta) {
        // Filtrar viajes activos por ruta
        viajesActivos = viajes.filter(v => v.ruta === idRuta && v.fecha_fin === null);
    } else {
        // Obtener todos los viajes activos (sin fecha de finalización)
        viajesActivos = viajes.filter(v => v.fecha_fin === null);
    }

    res.status(200).json(viajesActivos); // Devolver el array de viajes activos
});

//Obtine los datos de un viaje
app.get("/api/viajes/:id", function (req, res) {
    var idViaje = parseInt(req.params.id);
    var viaje = viajes.find(v => v.id === idViaje);
    if (!viaje) {
        console.log(" Error: Viaje no encontrado");
        return res.status(404).json({ error: "Viaje no encontrado" });
    }

    console.log("Viaje encontrado:", viaje);
    res.status(200).json(viaje);
});

// Api para obtener las jornadas de un viaje
app.get("/api/viajes/:id/jornadas", function (req, res) {
    var idViaje = parseInt(req.params.id); // Convertir ID a número
    var viaje = viajes.find(v => v.id === idViaje); // Encontrar el viaje por ID

    if (viaje) {
        var jornadasViaje = jornadas.filter(j => j.viaje === idViaje); // Filtrar las jornadas por ID de viaje
        res.status(200).json(jornadasViaje); // Devolver las jornadas del viaje
    } else {
        res.status(404).json({ error: "Viaje no encontrado" }); // Viaje no encontrado
    }
});

// Api para obtener los mensajes de un viaje
app.get("/api/viajes/:id/mensajes", function (req, res) {
    var idViaje = parseInt(req.params.id); // Convertir ID a número
    var viaje = viajes.find(v => v.id === idViaje); // Encontrar el viaje por ID

    if (viaje) {
        var mensajesViaje = mensajes.filter(m => m.viaje === idViaje); // Filtrar los mensajes por ID de viaje
        res.status(200).json(mensajesViaje); // Devolver los mensajes del viaje
    } else {
        res.status(404).json({ error: "Viaje no encontrado" }); // Viaje no encontrado
    }
});

// Api para crear un nuevo mensaje para un viaje
app.post("/api/viajes/:id/mensaje", function (req, res) {
    var idViaje = parseInt(req.params.id); // Convertir ID a número
    var viaje = viajes.find(v => v.id === idViaje); // Encontrar el viaje por ID

    if (!viaje) {
        return res.status(404).json({ error: "Viaje no encontrado" }); // Viaje no encontrado
    }

    var nuevoMensaje = {
        id: mensajes.length + 1, // Asignar un ID único
        idViaje: idViaje,
        texto: req.body.texto,
        etapa: req.body.etapa || null,
        sanitario: req.body.sanitario,
        fecha: new Date() // Asignar la fecha actual
    };

    mensajes.push(nuevoMensaje); // Agregar el nuevo mensaje al array de mensajes
    console.log("Nuevo mensaje creado:", nuevoMensaje);

    res.status(201).json({ mensaje: "Mensaje creado exitosamente", id: nuevoMensaje.id });
});

// Api para borrar un mensaje específico
app.delete("/api/mensajes/:id", function (req, res) {
    var idMensaje = parseInt(req.params.id); // Convertir ID a número
    var mensajeIndex = mensajes.findIndex(m => m.id === idMensaje); // Encontrar el índice del mensaje por ID

    if (mensajeIndex !== -1) {
        var mensajeBorrado = mensajes.splice(mensajeIndex, 1); // Borrar el mensaje del array
        console.log("Mensaje borrado:", mensajeBorrado);
        res.status(200).json({ mensaje: "Mensaje borrado exitosamente" });
    } else {
        res.status(404).json({ error: "Mensaje no encontrado" }); // Mensaje no encontrado
    }
});
