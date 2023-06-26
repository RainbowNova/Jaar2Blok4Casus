document.addEventListener('DOMContentLoaded', () => {
});

var game1 = document.getElementById('game1');
var game2 = document.getElementById('game2');
var game3 = document.getElementById('game3');

function removegame1(){
    recalculate1();
    game1.remove();
}

function removegame2(){
    recalculate2();
    game2.remove();
}

function removegame3(){
    recalculate3();
    game3.remove();
}

function recalculate1(){
    var prijs = parseFloat(document.getElementById("price-game-1").innerHTML);
    var totaal = parseFloat(document.getElementById("total-id").innerHTML);
    var grand = Math.round(totaal - (prijs * 1.05));
    document.getElementById("total-id").innerHTML = grand;
}

function recalculate2(){
    var prijs = parseFloat(document.getElementById("price-game-2").innerHTML);
    var totaal = parseFloat(document.getElementById("total-id").innerHTML);
    var grand = Math.round(totaal - (prijs * 1.05));
    document.getElementById("total-id").innerHTML = grand;
}

function recalculate3(){
    var prijs = parseFloat(document.getElementById("price-game-3").innerHTML);
    var totaal = parseFloat(document.getElementById("total-id").innerHTML);
    var grand = Math.round(totaal - (prijs * 1.05));
    document.getElementById("total-id").innerHTML = grand;
}


