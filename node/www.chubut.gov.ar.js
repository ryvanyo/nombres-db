// URL: http://www.chubut.gov.ar/apps/nombres/html/femeninos/
var nombres = [];
function parseTable() {
    document.querySelectorAll('table tbody>tr').forEach(function(tr, i){
        nombres.push({
            "nombre" : tr.children[0].innerText.trim(),
            "sexo" : "hombre"
        });
        nombres.push({
            "nombre" : tr.children[3].innerText.trim(),
            "sexo" : "hombre"
        });
    });
    console.log(JSON.stringify(nombres));
    // ws.send(JSON.stringify(nombres));
    // request();
}

function request(){
    if (nombres.length == 0) {
        // console.log("Finalizado");
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
    console.log(e.data);
};