var conta = 1,
    bandera_continuar = true,
    auth = "f25fc51eacf11d76791736424cd182d44350c74d",
    base_url = "https://api.nrfcloud.com/v1/messages?pageLimit=100",
    request_obj = {
        headers: {
            Authorization : "Bearer " + auth    
        }
    };

console.log(new Date());

fetch(base_url, request_obj)
    .then(response => response.json())
    .then(function(data){ request(data); });

function request(data){
    if (!bandera_continuar) return;
    console.log(conta++, data);
    if (data.pageNextToken) {
        fetch(base_url+'&pageNextToken='+data.pageNextToken, request_obj)
            .then(response => response.json())
            .then(function(data){ request(data); });
    } else {
        console.log(new Date());
    }
}

/**
https://api.nrfcloud.com/v1/messages?inclusiveStart=2018-08-22T00:00:00.000Z&exclusiveEnd=2099-08-29T00:00:00.000Z&pageNextToken=MTYyOTIxODY0OTAxNnxiMDFkNWUxYy0yZTRmLTQzZjUtOGY1OC00YmY1NzQ3ODQ1YzY=&pageLimit=100

https://api.nrfcloud.com/v1/messages?pageLimit=100
 */