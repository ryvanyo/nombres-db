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

function updatePagination(doc){
    if ( jQuery('ul.pagination', doc).length==0 ) {
        return;
    }
    paginas = Array.prototype.slice.call(document.querySelectorAll('ul.pagination li>a'));
    jQuery('ul.pagination li>a', document).each(function(index, el){ 
        
    });
    paginas.unshift(letras[0]);
}

function init(){
    letras = Array.prototype.slice.call(document.querySelectorAll('ul.letters li>a'));
    letras.forEach(function(letra, index){
        if (index==0) return;
        jQuery.get(letra.href, function(resp){

        });
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

var base_url = "https://www.conmishijos.com/nombres/ninas/",
    letras = [],
    paginas = [],
    i_letras = 0,
    i_paginas = 0,
    ws = new WebSocket('ws://localhost:9898/');

init();

// ws.onopen = function(){
//     request();
// };

// ws.onmessage = function(e) {
//     if (e.data=="OK") {
//         request();
//     } else {
//         console.log(e.data);
//     }
// };