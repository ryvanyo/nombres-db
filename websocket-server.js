const http = require('http');
const WebSocketServer = require('websocket').server;
var cola = [];

const server = http.createServer();
server.listen(9898);
console.log("Escuchando en puerto 9898");

const wsServer = new WebSocketServer({
    httpServer: server
});

wsServer.on('request', function(request) {
    const connection = request.accept(null, request.origin);

    connection.on('message', function(message) {
        // console.log('Received Message:', message.utf8Data);
        // connection.sendUTF('Mensaje recibido: ' + message.utf8Data);
        // console.log('message recibido: ', message.utf8Data);
        var data = JSON.parse(message.utf8Data);

        if (Array.isArray(data)) {
            data.forEach(function(o){
                if (typeof o.nombre=="string" && typeof o.sexo=="string") {
                    var row = {
                        nombre : o.nombre,
                        sexo : o.sexo,
                        details : ''
                    };
                    if (typeof o.details=='object') {
                        row.details = JSON.stringify(o.details);
                    }
                    if (typeof o.details=='string') {
                        row.details = o.details;
                    }
                    // insert(o.nombre, o.sexo, connection);
                    cola.push(row);
                }
            });
        } else {
            if (typeof data.nombre=="string" && typeof data.sexo=="string") {
                // insert(data.nombre, data.sexo, connection);
                var row = {
                    nombre : data.nombre,
                    sexo : data.sexo,
                    details : ''
                };
                if (typeof data.details=='object') {
                    row.details = JSON.stringify(data.details);
                }
                if (typeof data.details=='string') {
                    row.details = data.details;
                }
                cola.push(row);
            }
        }
        processCola(connection);
        // connection.send("OK");
    });
    connection.on('close', function(reasonCode, description) {
        // console.log('Client has disconnected.');
    });
});

function processCola(connection){
    if (cola.length==0) {
        connection.send("OK");
        return;
    }

    var o = cola.shift();
    insert(o.nombre, o.sexo, o.details, connection);
}

// sqlite
// ==================================
const sqlite3 = require('sqlite3');

// Conexión a la base de datos
const db = new sqlite3.Database('./nombres.db', function(err){
    if (err) {
        console.log(err.message);
    }
    console.log('Conectado a la base de datos: ./nombres.db');
});

// Creacion de la tabla usuario
sql_create = "CREATE TABLE IF NOT EXISTS nombres('name' TEXT, 'sexo' TEXT, 'details' TEXT, PRIMARY KEY('name'))";
db.exec(sql_create, function(err){
    console.log('Tabla nombres creada');
});

// Insertar datos
function insert(name, sexo, details, cn){
    var sql_insert = "INSERT INTO nombres('name', 'sexo', 'details') VALUES(?, ?, ?)";

    db.run(sql_insert, [name, sexo, details], function(err){
        if (err) {
            if (err.message=='SQLITE_CONSTRAINT: UNIQUE constraint failed: nombres.name') {
                var msg = 'Error : ' + name + ' ya está guardado';
                cn.send(msg);
                console.log(msg);
            } else {
                cn.send('Error : ' + err.message);
            }
        }
        cn.send('Insertado: ' + name);
        console.log('Insertado: ' + name);
        processCola(cn);
    });
}

// Cerrar la conexion a la base de datos
// db.close((err) => {
//     if (err) {
//         console.error(err.message);
//     }
//     console.log('Conexión a la base de datos cerrada.');
// });