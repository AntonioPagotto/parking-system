

/*slider*/

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