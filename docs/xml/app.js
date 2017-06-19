var http_request = false;

function makeRequest(url) {


    http_request = false;

    if (window.XMLHttpRequest) { // Mozilla, Safari,...
        http_request = new XMLHttpRequest();
        if (http_request.overrideMimeType) {
            // http_request.overrideMimeType('text/plain');
            http_request.overrideMimeType('application/xml');
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
    http_request.send();

}

function alertContents() {
    if (http_request.readyState == 4) {
        if (http_request.status == 200) {

            var ul = document.getElementById('lista-canciones');
            // Pregunto si es 0, porque si se aplasta más de una vez, la lista
            // se vuelve a agregar con cada clic que se da en el enlace
            if (ul.childNodes.length == 0) {
                xmlDoc = http_request.responseXML;
                canciones = xmlDoc.getElementsByTagName('cancion');

                for (let i = 0; i < canciones.length; i++) {

                    let li = document.createElement('li');
                    tituloCancion = canciones[i].getAttribute('titulo');
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
        makeRequest('datos.xml');
    }
}
