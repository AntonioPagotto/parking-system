

//////////////////////////////[SLIDER]///////////////////////////////////

var mudou = false;
function initial() {
    setInterval(function mudar() {
        var bg = document.querySelector('.sld-item')
        if (mudou == false) {
            bg.style.backgroundImage = 'url("img/b2-sld.png")'
            mudou = true;
        } else {
            bg.style.backgroundImage = 'url("img/b1-sld.png")'
            mudou = false;
        }
    }, 3000);
}

//////////////////////////////////////////////////////////////////////////

function estacionar(e) {

    var cCliente = document.getElementById('cCliente').value
    var cModelo = document.getElementById('cModelo').value
    var cPlaca = document.getElementById('cPlaca').value
    var hEntrou = new Date();

    var carro = {
        cliente: cCliente,
        modelo: cModelo,
        placa: cPlaca,
        hora: hEntrou.getHours(),
        minutos: hEntrou.getMinutes()
    }

    if (cCliente === '' || cModelo === '' || cPlaca === '') {
        window.alert('[ERRO]Está faltando informações, preencha os campos corretamente!')
        return false
    }

    if (localStorage.getItem('patio') === null) { //se o patio estiver vazio ele cria a array estacionados e armazena "carro"
        var estacionados = []
        estacionados.push(carro)
        localStorage.setItem('patio', JSON.stringify(estacionados)) //passando para string e armazenando
    } else { //se o patio nao estiver vazio, ele armazena estacionados em 'patio'
        var estacionados = JSON.parse(localStorage.getItem('patio')) //voltando p obj para modifica-lo
        estacionados.push(carro) // aqui modificou
        localStorage.setItem('patio', JSON.stringify(estacionados)) //passando para string novamente p armazenar
        /* Porque virar string antes de armazenar? 
        os dados que serão gravados ali precisam ser convertidos para strings antes de serem gravados.
        Para fazer isso, basta usar o método JSON.stringify() antes de passar o valor para o setItem().*/
    }

    document.getElementById('formulario').reset()
    carregar();
    e.preventDefault();
}
function remover(placa) {
    var patio = JSON.parse(localStorage.getItem('patio'))


    
    for (var i = 0; i < patio.length; i++) {
        if (patio[i].placa == placa) {
            patio.splice(i, 1)
        }
    }
    localStorage.setItem('patio', JSON.stringify(patio))
    carregar();
}
function carregar() {
    var estacionados = JSON.parse(localStorage.getItem('patio')); //pegando a array no localstorage (convertendo p objt para modifica-lo)
    var patioResultado = document.getElementById('resultados');


    patioResultado.innerHTML = ''

    for (var i = 0; i < estacionados.length; i++) { //aqui ele irá repetir o FOR na quantidade de carros que tiver no *estacionados
        var cliente = estacionados[i].cliente;
        var modelo = estacionados[i].modelo;
        var placa = estacionados[i].placa;
        var hora = estacionados[i].hora;
        var minutos = estacionados[i].minutos;
        patioResultado.innerHTML += '<tr><td>' + cliente + '</td>' +
            '<td>' + modelo + '</td>' +
            '<td>' + placa + '</td>' +
            '<td>' + hora + ':' + minutos + '</td>' +
            '<td><input class="btn-remover" type="button" value="Remover" onclick="remover(\'' + placa + '\')"></td></tr>'
    }
}
