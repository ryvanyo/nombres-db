// browser crawler script
function parseTable(env) {
    var nombres = [];
    jQuery('[data-id=nombres] td.mujer', env).each(function(i, td){
        nombres.push({"nombre" : td.innerText.trim(), "sexo": "mujer"});
    });
    ws.send(JSON.stringify(nombres));
}

function getPage(url) {
    console.log("Get " + url);
    jQuery.get(url, function(resp){
        console.log("Parseando");
        parseTable(resp);
    });
}

function request(){
    if (i>max) {
        console.log("Finalizado");
        return;
    }

    var url = base_url + i;
    getPage(url);
    i++;
}

var base_url = "https://www.planetamama.com.ar/nombres-de-bebes/buscar/todos/sexo/mujer/origen/todos?page=",
    i = 0,
    max = 73,
    ws = new WebSocket('ws://localhost:9898/');

ws.onopen = function(){
    request();  
};

ws.onmessage = function(e) {
    if (e.data=="OK") {
        request();
    } else {
        console.log(e.data);
    }
};