// URL: http://www.gob.gba.gov.ar/html/gobierno/nombres/femeninos/a.htm
var nombres = [];
function parseTable() {
    console.log("parseTable");
    document.querySelectorAll('blockquote+table tbody>tr').forEach(function(tr, i){
        if(i==0) return;
        nombres.push({
            "nombre" : tr.children[0].innerText.trim(),
            "sexo" : "hombre"
        });
    });
    // console.log(JSON.stringify(nombres));
    ws.send(JSON.stringify(nombres));
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