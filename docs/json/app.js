var http_request = false;

function makeRequest(url) {


    http_request = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            http_request.overrideMimeType('application/json');
            // Ver nota sobre esta linea al final
        }
    } else if (window.ActiveXObject) { // IE
        try {
            http_request = new ActiveXObject("Msxml2.XMLHTTP");
        } catch (e) {
            try {
                http_request = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (e) {}
        }
    }

    if (!http_request) {
        alert('Falla :( No es posible crear una instancia XMLHTTP');
        return false;
    }
    http_request.onreadystatechange = alertContents;
    http_request.open('GET', url, true);
    http_request.send(null);

}

function alertContents() {
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {
            
            var ul = document.getElementById('lista-canciones');
            var canciones = JSON.parse(http_request.responseText);

            // Solo debe cargar una vez la lista de canciones
            if (ul.childNodes.length == 0) {
                for (let i = 0; i < canciones.length; i++) {

                    let li = document.createElement('li');
                    tituloCancion = canciones[i]['titulo'];
                    nodoTexto = document.createTextNode(tituloCancion);
                    li.appendChild(nodoTexto);
                    ul.appendChild(li);

                }
            }

        } else {
            alert('Hubo problemas con la petición.');
        }
    }
}

window.onload = function() {
    var link = document.getElementById('requerimiento');
    link.onclick = function() {
        makeRequest('datos.json');
    }
}
