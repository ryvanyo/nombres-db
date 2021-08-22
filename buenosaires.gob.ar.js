// URL: https://buenosaires.gob.ar/areas/registrocivil/nombres/busqueda/imprimir.php
// browser crawler script
var nombres = [];
function parseTable() {
    var rows = document.querySelectorAll('table.contenido tbody tr');
    rows.forEach(function(tr){
        var sexo = "";
        if (tr.children[1].innerText.trim()=="M") {
            sexo = "mujer";
        } else {
            sexo = "hombre";
        }
        var data = {
            nombre : tr.children[0].innerText.trim(),
            sexo : sexo
        };
        nombres.push(data);
    });
    // ws.send(JSON.stringify(nombres));
    // request();
}

function request(){
    if (nombres.length == 0) {
        console.log("Finalizado");
        return;
    }
    var data = nombres.shift();
    ws.send(JSON.stringify(data));
}

var ws = new WebSocket('ws://localhost:9898/');

ws.onopen = function(){
    parseTable();
};

ws.onmessage = function(e) {
    if (e.data=="OK") {
        request();
    } else {
        console.log(e.data);
        request();
    }
};