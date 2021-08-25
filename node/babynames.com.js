javascript:void((function(d){ 
    var nombres="";
    document.querySelectorAll('ul.searchresults li').forEach(function(li){
        nombres+=li.innerText.trim()+"\n";
    });
    var ta=document.createElement('textarea'); 
    document.body.appendChild(ta);
    ta.style.position="fixed";
    ta.style.top="0px";
    ta.style.left="0px";
    ta.style.height="300px";
    ta.value=nombres;
    ta.focus();
    ta.setSelectionRange(0, ta.value.length);
    document.execCommand("copy");
})(document));