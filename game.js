window.addEventListener('DOMContentLoaded', main);
// eventlisten keys and state

var canvas;
var ctx;
var score = 0;
var frameX = 8; //positionnement du sprite sur l'horizontal Initial 8
var frameY = 7; // positionnement du sprite sur la vertical Initial 7
var positionR = 0;
var presseDroite = false;
var presseGauche = false;
var presseHaut = false;
var pieceTableau = [];
var niveau0 = false;
var niveau1 = false;
var niveau2 = false;
var interval;

var sound = {};
sound.jump = new Audio();
sound.jump.src = 'asset/jump.wav';
sound.coin = new Audio();
sound.coin.src = 'asset/coin.wav';
sound.background = new Audio();
sound.background.src = 'asset/map.mp3';
sound.gameover = new Audio();
sound.gameover.src = 'asset/game_over.wav';
sound.win = new Audio();
sound.win.src = 'asset/win.wav';

var player = {
    sprite: new Image(),
    sx: 0, // position du sprite en X
    sy: 0, // position du sprite en Y
    sw: 28.7, // largeur du sprite
    sh: 39, // hauteur du sprite
    grandeBoiteX: 50, // position du masque par rapport au canvas en X// position initiel 50
    grandeBoiteY: 700, // position du masque par rapport au canvas en Y // position initial 700
    largeur: 25.7,
    hauteur: 34,
    dx: 0, // vecteur en X
    dy: 0, // vercteur en Y
    isJumping: false,
    isOnGround: false
}


var bg = {
    sprite: new Image(),
    x: 0,
    y: 0,
    w: 1200,
    h: 800,
}


var Object = function (spriteValeurX, spritePositionY, spriteValeurLargeur, spriteValeurHauteur, valeurX, valeurY, valeurLargeur, valeurHauteur) {
    this.sprite = new Image();
    this.spritePositionX = spriteValeurX;
    this.spritePositionY = spritePositionY;
    this.spriteLargeur = spriteValeurLargeur;
    this.spriteHauteur = spriteValeurHauteur;
    this.positionX = valeurX;
    this.positionY = valeurY;
    this.largeur = valeurLargeur;
    this.hauteur = valeurHauteur;

}



// création des élements sur parcours
var bloc1 = new Object(0, 115, 115, 90, 1115, 690, 80, 70);
var bloc2 = new Object(0, 115, 115, 90, 85, 580, 80, 70);
var plateau = new Object(12, 440, 153, 20, 785, 640, 300, 30);
var plateau1 = new Object(12, 440, 145, 20, 486, 640, 300, 30);
var plateau2 = new Object(12, 440, 145, 20, 186, 640, 300, 30);
var plateau3 = new Object(12, 440, 145, 20, -2, 640, 300, 30);
var egout = new Object(523, 452, 16, 20, 0, 535, 80, 110);
var passerelle = new Object(9, 435, 258, 30, 140, 478, 258, 30);
var passerelle2 = new Object(9, 435, 258, 30, 570, 478, 258, 30);
var nuage = new Object(190, 384, 160, 30, 980, 478, 220, 30);
var porte = new Object(360, 345, 49, 65, 1117, 381, 80, 100);
var logo = new Object(450, 423, 180, 50, 420, 80, 350, 100);
// Création enemie
var ennemi = new Object(148, 291, 33, 33, 460, 465, 55, 55);
var ennemi2 = new Object(148, 291, 33, 33, 880, 465, 55, 55);


// Création des etoiles
var etoile01 = new Object(352, 107, 16, 16, 150, 720, 20, 20);
etoile01.padding = 10;
etoile01.nombre = 5;

var etoile02 = new Object(352, 107, 16, 16, 350, 720, 20, 20);
etoile02.padding = 10;
etoile02.nombre = 5;

var etoile03 = new Object(352, 107, 16, 16, 550, 720, 20, 20);
etoile03.padding = 10;
etoile03.nombre = 5;

var etoile04 = new Object(352, 107, 16, 16, 750, 720, 20, 20);
etoile04.padding = 10;
etoile04.nombre = 5;

var etoile05 = new Object(352, 107, 16, 16, 950, 720, 20, 20);
etoile05.padding = 10;
etoile05.nombre = 5;

var etoile06 = new Object(352, 107, 16, 16, 830, 590, 20, 20);
etoile06.padding = 10;
etoile06.nombre = 5;

var etoile07 = new Object(352, 107, 16, 16, 530, 590, 20, 20);
etoile07.padding = 10;
etoile07.nombre = 5;

var etoile08 = new Object(352, 107, 16, 16, 230, 590, 20, 20);
etoile08.padding = 10;
etoile08.nombre = 5;

var etoile09 = new Object(352, 107, 16, 16, 410, 370, 20, 20);
etoile09.padding = 10;
etoile09.nombre = 5;

var etoile10 = new Object(352, 107, 16, 16, 830, 370, 20, 20);
etoile10.padding = 10;
etoile10.nombre = 5;


function main() {
    // console.log("Main function loading"); 
    sound.background.play();
    sound.background.loop = true;
    sound.background.volume = 0.4;
    document.getElementById('music').onclick = function () { // couper la musique  de fond
        sound.background.pause();
    }
  
 
    canvas = document.getElementById('canvas');
    document.getElementById('canvas').style['filter'] = 'blur(0rem)';
    document.getElementById('canvas').style['transition'] = '2s';
    ctx = canvas.getContext('2d');
   
    // init and load sprites
    player.sprite.src = './asset/luigi.png';
    bg.sprite.src = 'asset/wallpaper2.gif';
    bloc1.sprite.src = 'asset/objects.gif';
    bloc2.sprite.src = 'asset/objects.gif';
    plateau.sprite.src = 'asset/objects.gif';
    plateau1.sprite.src = 'asset/objects.gif';
    plateau2.sprite.src = 'asset/objects.gif';
    plateau3.sprite.src = 'asset/objects.gif';
    egout.sprite.src = 'asset/objects.gif';
    passerelle.sprite.src = 'asset/objects2.gif';
    passerelle2.sprite.src = 'asset/objects2.gif';
    nuage.sprite.src = 'asset/objects2.gif';
    porte.sprite.src = 'asset/objects2.gif';
    logo.sprite.src = 'asset/objects2.gif';

    ennemi.sprite.src = 'asset/objects2.gif';
    ennemi2.sprite.src = 'asset/objects2.gif';
    etoile01.sprite.src = 'asset/objects2.gif';
    etoile02.sprite.src = 'asset/objects2.gif';
    etoile03.sprite.src = 'asset/objects2.gif';
    etoile03.sprite.src = 'asset/objects2.gif';
    etoile04.sprite.src = 'asset/objects2.gif';
    etoile05.sprite.src = 'asset/objects2.gif';
    etoile06.sprite.src = 'asset/objects2.gif';
    etoile07.sprite.src = 'asset/objects2.gif';
    etoile08.sprite.src = 'asset/objects2.gif';
    etoile09.sprite.src = 'asset/objects2.gif';
    etoile10.sprite.src = 'asset/objects2.gif';

    document.getElementById('reset').onclick = function () { // reset le jeu
        document.location.reload();
    }

    interval = window.setInterval(function () {
        loop()
    }, 1000 / 60);
    // console.log("Main function loaded");
    if (window.innerHeight < 788) {
        document.getElementById('screen').style['display'] = 'block';
    }

    // function toto(){
    //     document.getElementById('bouton_screen').style['overflow-y'] = 'auto'
    // }
    document.getElementById('bouton_screen').addEventListener('click', function () {
        document.querySelector('body').style['overflow-y'] = 'scroll';
        document.getElementById('scroll').style['display'] = 'block';
        document.getElementById('screen').style['display'] = 'none';

        window.addEventListener('scroll',function(){
            document.getElementById('scroll').style['display'] = 'none';
        })
    })
}


//function game loop
function loop() {
   
    ctx.drawImage(bg.sprite, bg.x, bg.y, bg.w, bg.h); // background // draw bg
    gameOver();
    drawEtoiles()
    drawPlayer(); // appel le dessin du player
    drawBloc(); // ajoute les blocs et passerelles
    move(); // appel sur les deplacement du player
    detectionCollision(); // // appel au detection sur les bloc et parois     
    drawScore();
    drawEnnemi();
    dectectionEnnemi();
    drawCompetence();
    win();
    drawLogo();
}

//******************************************************************
// Gestion et cr&ation des pieces / Etoiles

var tableauEtoile01 = []; // Tableau qui stockera les pieces 
for (var c = 0; c < etoile01.nombre; c++) {
    tableauEtoile01[c] = [];
    tableauEtoile01[c] = {
        x: 0,
        y: 0,
        status: 1
    };
}

var tableauEtoile02 = [];
for (var j = 0; j < etoile02.nombre; j++) {
    tableauEtoile02[j] = [];
    tableauEtoile02[j] = {
        x: 0,
        y: 0,
        status: 1
    };
}
var tableauEtoile03 = [];
for (var j = 0; j < etoile03.nombre; j++) {
    tableauEtoile03[j] = [];
    tableauEtoile03[j] = {
        x: 0,
        y: 0,
        status: 1
    };
}
var tableauEtoile04 = [];
for (var j = 0; j < etoile04.nombre; j++) {
    tableauEtoile04[j] = [];
    tableauEtoile04[j] = {
        x: 0,
        y: 0,
        status: 1
    };
}
var tableauEtoile05 = [];
for (var j = 0; j < etoile05.nombre; j++) {
    tableauEtoile05[j] = [];
    tableauEtoile05[j] = {
        x: 0,
        y: 0,
        status: 1
    };
}
var tableauEtoile06 = [];
for (var j = 0; j < etoile06.nombre; j++) {
    tableauEtoile06[j] = [];
    tableauEtoile06[j] = {
        x: 0,
        y: 0,
        status: 1
    };
}
var tableauEtoile07 = [];
for (var j = 0; j < etoile07.nombre; j++) {
    tableauEtoile07[j] = [];
    tableauEtoile07[j] = {
        x: 0,
        y: 0,
        status: 1
    };
}
var tableauEtoile08 = [];
for (var j = 0; j < etoile08.nombre; j++) {
    tableauEtoile08[j] = [];
    tableauEtoile08[j] = {
        x: 0,
        y: 0,
        status: 1
    };
}
var tableauEtoile09 = [];
for (var j = 0; j < etoile09.nombre; j++) {
    tableauEtoile09[j] = [];
    tableauEtoile09[j] = {
        x: 0,
        y: 0,
        status: 1
    };
}
var tableauEtoile10 = [];
for (var j = 0; j < etoile10.nombre; j++) {
    tableauEtoile10[j] = [];
    tableauEtoile10[j] = {
        x: 0,
        y: 0,
        status: 1
    };
}

//******************************************************************
function drawEtoiles() {
    drawEtoile01();
    drawEtoile02();
    drawEtoile03();
    drawEtoile04();
    drawEtoile05();
    drawEtoile06();
    drawEtoile07();
    drawEtoile08();
    drawEtoile09();
    drawEtoile10();


    detectionEtoile01();
    detectionEtoile02();
    detectionEtoile03();
    detectionEtoile04();
    detectionEtoile05();
    detectionEtoile06();
    detectionEtoile07();
    detectionEtoile08();
    detectionEtoile09();
    detectionEtoile10();
}

function drawEtoile01() {
    for (var c = 0; c < etoile01.nombre; c++) {
        if (tableauEtoile01[c].status == 1) {
            var etoile01_X = (c * (etoile01.largeur + etoile01.padding)) + etoile01.positionX;
            var etoile01_Y = etoile01.positionY;
            tableauEtoile01[c].x = etoile01_X;
            tableauEtoile01[c].y = etoile01_Y;
            ctx.drawImage(etoile01.sprite, etoile01.spritePositionX, etoile01.spritePositionY, etoile01.spriteLargeur, etoile01.spriteHauteur, etoile01_X, etoile01_Y, etoile01.largeur, etoile01.hauteur);
        }
    }


}

function drawEtoile02() {
    for (var c = 0; c < etoile02.nombre; c++) {
        if (tableauEtoile02[c].status == 1) {
            var etoile02_X = (c * (etoile02.largeur + etoile02.padding)) + etoile02.positionX;
            var etoile02_Y = etoile02.positionY;
            tableauEtoile02[c].x = etoile02_X;
            tableauEtoile02[c].y = etoile02_Y;
            ctx.drawImage(etoile02.sprite, etoile02.spritePositionX, etoile02.spritePositionY, etoile02.spriteLargeur, etoile02.spriteHauteur, etoile02_X, etoile02_Y, etoile02.largeur, etoile02.hauteur);
        }
    }
}

function drawEtoile03() {
    for (var c = 0; c < etoile03.nombre; c++) {
        if (tableauEtoile03[c].status == 1) {
            var etoile03_X = (c * (etoile03.largeur + etoile03.padding)) + etoile03.positionX;
            var etoile03_Y = etoile03.positionY;
            tableauEtoile03[c].x = etoile03_X;
            tableauEtoile03[c].y = etoile03_Y;
            ctx.drawImage(etoile03.sprite, etoile03.spritePositionX, etoile03.spritePositionY, etoile03.spriteLargeur, etoile03.spriteHauteur, etoile03_X, etoile03_Y, etoile03.largeur, etoile03.hauteur);
        }
    }
}

function drawEtoile04() {
    for (var c = 0; c < etoile04.nombre; c++) {
        if (tableauEtoile04[c].status == 1) {
            var etoile04_X = (c * (etoile04.largeur + etoile04.padding)) + etoile04.positionX;
            var etoile04_Y = etoile04.positionY;
            tableauEtoile04[c].x = etoile04_X;
            tableauEtoile04[c].y = etoile04_Y;
            ctx.drawImage(etoile04.sprite, etoile04.spritePositionX, etoile04.spritePositionY, etoile04.spriteLargeur, etoile04.spriteHauteur, etoile04_X, etoile04_Y, etoile04.largeur, etoile04.hauteur);
        }
    }
}

function drawEtoile05() {
    for (var c = 0; c < etoile05.nombre; c++) {
        if (tableauEtoile05[c].status == 1) {
            var etoile05_X = (c * (etoile05.largeur + etoile05.padding)) + etoile05.positionX;
            var etoile05_Y = etoile05.positionY;
            tableauEtoile05[c].x = etoile05_X;
            tableauEtoile05[c].y = etoile05_Y;
            ctx.drawImage(etoile05.sprite, etoile05.spritePositionX, etoile05.spritePositionY, etoile05.spriteLargeur, etoile05.spriteHauteur, etoile05_X, etoile05_Y, etoile05.largeur, etoile05.hauteur);
        }
    }
}

function drawEtoile06() {
    for (var c = 0; c < etoile06.nombre; c++) {
        if (tableauEtoile06[c].status == 1) {
            var etoile06_X = (c * (etoile06.largeur + etoile06.padding)) + etoile06.positionX;
            var etoile06_Y = etoile06.positionY;
            tableauEtoile06[c].x = etoile06_X;
            tableauEtoile06[c].y = etoile06_Y;
            ctx.drawImage(etoile06.sprite, etoile06.spritePositionX, etoile06.spritePositionY, etoile06.spriteLargeur, etoile06.spriteHauteur, etoile06_X, etoile06_Y, etoile06.largeur, etoile06.hauteur);
        }
    }
}

function drawEtoile07() {
    for (var c = 0; c < etoile07.nombre; c++) {
        if (tableauEtoile07[c].status == 1) {
            var etoile07_X = (c * (etoile07.largeur + etoile07.padding)) + etoile07.positionX;
            var etoile07_Y = etoile07.positionY;
            tableauEtoile07[c].x = etoile07_X;
            tableauEtoile07[c].y = etoile07_Y;
            ctx.drawImage(etoile07.sprite, etoile07.spritePositionX, etoile07.spritePositionY, etoile07.spriteLargeur, etoile07.spriteHauteur, etoile07_X, etoile07_Y, etoile07.largeur, etoile07.hauteur);
        }
    }
}

function drawEtoile08() {
    for (var c = 0; c < etoile08.nombre; c++) {
        if (tableauEtoile08[c].status == 1) {
            var etoile08_X = (c * (etoile08.largeur + etoile08.padding)) + etoile08.positionX;
            var etoile08_Y = etoile08.positionY;
            tableauEtoile08[c].x = etoile08_X;
            tableauEtoile08[c].y = etoile08_Y;
            ctx.drawImage(etoile08.sprite, etoile08.spritePositionX, etoile08.spritePositionY, etoile08.spriteLargeur, etoile08.spriteHauteur, etoile08_X, etoile08_Y, etoile08.largeur, etoile08.hauteur);
        }
    }
}

function drawEtoile09() {
    for (var c = 0; c < etoile09.nombre; c++) {
        if (tableauEtoile09[c].status == 1) {
            var etoile09_X = (c * (etoile09.largeur + etoile09.padding)) + etoile09.positionX;
            var etoile09_Y = etoile09.positionY;
            tableauEtoile09[c].x = etoile09_X;
            tableauEtoile09[c].y = etoile09_Y;
            ctx.drawImage(etoile09.sprite, etoile09.spritePositionX, etoile09.spritePositionY, etoile09.spriteLargeur, etoile09.spriteHauteur, etoile09_X, etoile09_Y, etoile09.largeur, etoile09.hauteur);
        }
    }
}

function drawEtoile10() {
    for (var c = 0; c < etoile10.nombre; c++) {
        if (tableauEtoile10[c].status == 1) {
            var etoile10_X = (c * (etoile10.largeur + etoile10.padding)) + etoile10.positionX;
            var etoile10_Y = etoile10.positionY;
            tableauEtoile10[c].x = etoile10_X;
            tableauEtoile10[c].y = etoile10_Y;
            ctx.drawImage(etoile10.sprite, etoile10.spritePositionX, etoile10.spritePositionY, etoile10.spriteLargeur, etoile10.spriteHauteur, etoile10_X, etoile10_Y, etoile10.largeur, etoile10.hauteur);
        }
    }
}

function detectionEtoile01() {
    for (var c = 0; c < etoile01.nombre; c++) {
        var b = tableauEtoile01[c];
        if (b.status == 1 && niveau0) {
            if (player.grandeBoiteX + player.largeur > b.x - 10 && player.grandeBoiteX < b.x + etoile01.largeur - 10) {
                b.status = 0;
                score++;
                // sound.coin.play();
                var cloneSound = sound.coin.cloneNode(true);
                    cloneSound.play()
                    cloneSound.volume = 0.5;
            }
        }
    }

}

function detectionEtoile02() {
    for (var j = 0; j < etoile02.nombre; j++) {
        var d = tableauEtoile02[j];
        if (d.status == 1 && niveau0) {
            if (player.grandeBoiteX + player.largeur > d.x - 10 && player.grandeBoiteX < d.x + etoile02.largeur - 10) {
                d.status = 0;
                score++;
                var cloneSound = sound.coin.cloneNode(true);
                cloneSound.play()
                cloneSound.volume = 0.5;
            }
        }
    }
}

function detectionEtoile03() {
    for (var j = 0; j < etoile03.nombre; j++) {
        var d = tableauEtoile03[j];
        if (d.status == 1 && niveau0) {
            if (player.grandeBoiteX + player.largeur > d.x - 10 && player.grandeBoiteX < d.x + etoile03.largeur - 10) {
                d.status = 0;
                score++;
                var cloneSound = sound.coin.cloneNode(true);
                cloneSound.play()
                cloneSound.volume = 0.5;
            }
        }
    }
}

function detectionEtoile04() {
    for (var j = 0; j < etoile04.nombre; j++) {
        var d = tableauEtoile04[j];
        if (d.status == 1 && niveau0) {
            if (player.grandeBoiteX + player.largeur > d.x - 10 && player.grandeBoiteX < d.x + etoile04.largeur - 10) {
                d.status = 0;
                score++;
                var cloneSound = sound.coin.cloneNode(true);
                cloneSound.play()
                cloneSound.volume = 0.5;
            }
        }
    }
}

function detectionEtoile05() {
    for (var j = 0; j < etoile05.nombre; j++) {
        var d = tableauEtoile05[j];
        if (d.status == 1 && niveau0) {
            if (player.grandeBoiteX + player.largeur > d.x - 10 && player.grandeBoiteX < d.x + etoile05.largeur - 10) {
                d.status = 0;
                score++;
                var cloneSound = sound.coin.cloneNode(true);
                cloneSound.play()
                cloneSound.volume = 0.5;
            }
        }
    }
}

function detectionEtoile06() {
    for (var j = 0; j < etoile06.nombre; j++) {
        var d = tableauEtoile06[j];
        if (d.status == 1 && niveau1) {

            if (player.grandeBoiteX + player.largeur > d.x - 10 && player.grandeBoiteX < d.x + etoile06.largeur - 10 && player.grandeBoiteY < etoile06.positionY) {
                d.status = 0;
                score++;
                var cloneSound = sound.coin.cloneNode(true);
                cloneSound.play()
                cloneSound.volume = 0.5;
            }
        }
    }
}

function detectionEtoile07() {
    for (var j = 0; j < etoile07.nombre; j++) {
        var d = tableauEtoile07[j];
        if (d.status == 1 && niveau1) {
            if (player.grandeBoiteX + player.largeur > d.x - 10 && player.grandeBoiteX < d.x + etoile07.largeur - 10) {
                d.status = 0;
                score++;
                var cloneSound = sound.coin.cloneNode(true);
                cloneSound.play()
                cloneSound.volume = 0.5;
            }
        }
    }
}

function detectionEtoile08() {
    for (var j = 0; j < etoile08.nombre; j++) {
        var d = tableauEtoile08[j];
        if (d.status == 1 && niveau1) {
            if (player.grandeBoiteX + player.largeur > d.x - 10 && player.grandeBoiteX < d.x + etoile08.largeur - 10) {
                d.status = 0;
                score++;
                var cloneSound = sound.coin.cloneNode(true);
                cloneSound.play()
                cloneSound.volume = 0.5;
            }
        }
    }
}

function detectionEtoile09() {
    for (var j = 0; j < etoile09.nombre; j++) {
        var d = tableauEtoile09[j];
        if (d.status == 1 && niveau2) {
            if (player.grandeBoiteX + player.largeur > d.x - 10 && player.grandeBoiteX < d.x + etoile09.largeur - 10 && player.grandeBoiteY < etoile09.positionY + etoile09.hauteur) {
                d.status = 0;
                score++;
                var cloneSound = sound.coin.cloneNode(true);
                cloneSound.play()
                cloneSound.volume = 0.5;
            }
        }
    }
}

function detectionEtoile10() {
    for (var j = 0; j < etoile10.nombre; j++) {
        var d = tableauEtoile10[j];
        if (d.status == 1 && niveau2) {
            if (player.grandeBoiteX + player.largeur > d.x - 10 && player.grandeBoiteX < d.x + etoile10.largeur - 10 && player.grandeBoiteY < etoile10.positionY + etoile10.hauteur) {
                d.status = 0;
                score++;
                var cloneSound = sound.coin.cloneNode(true);
                cloneSound.play()
                cloneSound.volume = 0.5;
            }
        }
    }
}
//******************************************************************

//function (player) move
function move() {

    if (presseHaut && !player.isJumping && player.isOnGround) { // Evite le double saut avec player.isOnGround

        player.dy = -2;
        if (player.grandeBoiteY < positionR - 70) {
            sound.jump.play();
            presseHaut = false;
            player.isJumping = true;

        }
    } else {
        player.dy = 2; // gravité du player
        player.isOnGround = false;
    }

    player.grandeBoiteX += player.dx; // permet de se deplacer sur l'axe horizontal 
    player.grandeBoiteY += player.dy; // gere le saut et la gravité


    if (player.grandeBoiteY + player.hauteur > canvas.height - 60 && player.dy >= 0) { //pour se mettre au sol 
        player.grandeBoiteY = canvas.height - player.hauteur - 60;
        player.dy = 0;
        player.isJumping = false;
        player.isOnGround = true;
        niveau0 = true;
        positionR = player.grandeBoiteY; // positionR est la positionX du player au sol ou sur les blocs
    }

    if (presseDroite) {
        player.dx = 4;
        if (player.grandeBoiteX + player.largeur > canvas.width - 15) {
            player.dx = 0;
            isOnGround = false;
        }
    } else if (presseGauche) {
        player.dx = -4;
        if (player.grandeBoiteX < 0) {
            player.dx = 0;
        }
    } else {
        player.dx = 0;
    }
}

function drawEnnemi() {


    ctx.drawImage(ennemi.sprite, ennemi.spritePositionX, ennemi.spritePositionY, ennemi.spriteLargeur, ennemi.spriteHauteur, ennemi.positionX, ennemi.positionY, ennemi.largeur, ennemi.hauteur);
    ctx.drawImage(ennemi2.sprite, ennemi2.spritePositionX, ennemi2.spritePositionY, ennemi2.spriteLargeur, ennemi2.spriteHauteur, ennemi2.positionX, ennemi2.positionY, ennemi2.largeur, ennemi2.hauteur);
    // ctx.strokeRect(1000, 381, 55, 55);
}

function dectectionEnnemi() {

    if (player.grandeBoiteY + player.hauteur - 10 > ennemi.positionY && player.grandeBoiteX + player.largeur > ennemi.positionX && player.grandeBoiteX < ennemi.positionX + ennemi.largeur && player.grandeBoiteY + player.hauteur < ennemi.positionY + ennemi.hauteur) {
        return true
    }

    if (player.grandeBoiteY + player.hauteur - 10 > ennemi2.positionY && player.grandeBoiteX + player.largeur > ennemi2.positionX && player.grandeBoiteX < ennemi2.positionX + ennemi2.largeur && player.grandeBoiteY + player.hauteur < ennemi2.positionY + ennemi2.hauteur) {
        return true
    }
}



function gameOver() {
    if (dectectionEnnemi()) {
        sound.background.pause();
        sound.jump.pause();
        sound.coin.pause();
        sound.gameover.play();
        document.getElementById('canvas').style['filter'] = 'blur(0.5rem)';
        clearInterval(interval);
        document.getElementById('gameover').style['display'] = 'block';
    }
}


function win() { // dessine le score en haut a gauche

    if (player.grandeBoiteX + player.largeur > porte.positionX && player.grandeBoiteY + player.hauteur > porte.positionY && player.grandeBoiteY + player.hauteur < porte.positionY + porte.hauteur) {

        ctx.font = "45px Arial";
        ctx.fillStyle = "black";
        ctx.fillText("You Win", canvas.width / 2, canvas.height / 2);
        sound.background.pause();
        sound.win.play();
        clearInterval(interval);
    }


}

function detectionCollision() {
    // BLOC 1 ( bloc vert en bas a droite)***********************************************************************
    if (player.grandeBoiteX + player.largeur > bloc1.positionX && player.grandeBoiteY + player.hauteur > bloc1.positionY && !presseGauche) {
        // player.grandeBoiteX = bloc1.positionX - player.largeur
        player.dx = 0;
    }
    if (player.grandeBoiteY + player.hauteur > bloc1.positionY - 20 && player.grandeBoiteX + player.largeur > bloc1.positionX + 3) {
        player.grandeBoiteY = bloc1.positionY - player.hauteur - 20;
        player.dy = 0;
        player.isOnGround = true;
        player.isJumping = false;
        positionR = bloc1.positionY - player.hauteur;
    }

    // Plateau 1er niveau**********************************************************************************************************************

    if (player.grandeBoiteX < plateau.positionX + plateau.largeur - 5 && player.grandeBoiteY + player.hauteur >= plateau.positionY - 20 && player.grandeBoiteY + player.hauteur < plateau.positionY - 5) {
        player.dy = 0;
        player.grandeBoiteY = plateau.positionY - player.hauteur - 20;
        player.isOnGround = true;
        player.isJumping = false;
        niveau0 = false;
        niveau1 = true;
        positionR = plateau.positionY - player.hauteur - 20;
    }

    // Bloc 2 (bloc vert niveau 1 a gauche)***********************************************************************
    if (player.grandeBoiteX < bloc2.positionX + bloc2.largeur - 5 && player.grandeBoiteY + player.hauteur < bloc2.positionY + bloc2.largeur && player.grandeBoiteY + player.hauteur > bloc2.positionY && !presseDroite) {
        player.dx = 0; // arret sur le bord droit du bloc 2
    }

    if (player.grandeBoiteY + player.hauteur > bloc2.positionY - 20 && player.grandeBoiteY + player.hauteur < bloc2.positionY + bloc2.hauteur && player.grandeBoiteX < bloc2.positionX + bloc2.largeur - 10) { // permet de se poser sur le bloc 2 et pouvoir avancer sur le sol an dessous du bloc 2
        player.grandeBoiteY = bloc2.positionY - player.hauteur - 20;
        player.dy = 0;
        player.isOnGround = true;
        player.isJumping = false;
        positionR = bloc2.positionY - player.hauteur;
    }

    // Egout (niveau 1 a gauche) ***********************************************************************
    if (player.grandeBoiteX < egout.positionX + egout.largeur - 5 && player.grandeBoiteY + player.hauteur < egout.positionY + egout.hauteur && player.grandeBoiteY + player.hauteur > egout.positionY && !presseDroite) { // arret sur le bord droit de l'egout
        player.dx = 0;
    }

    if (player.grandeBoiteY + player.hauteur > egout.positionY - 23 && player.grandeBoiteY + player.hauteur < egout.positionY + egout.hauteur && player.grandeBoiteX < egout.positionX + egout.largeur - 10) { // permet de se poser sur le bloc 2
        player.grandeBoiteY = egout.positionY - player.hauteur - 23;
        player.dy = 0;
        player.isOnGround = true;
        player.isJumping = false;
        positionR = egout.positionY - player.hauteur;
    }

    // passerelle 1 (niveau 2 à gauche) ***********************************************************************

    if (player.grandeBoiteX + player.largeur > passerelle.positionX && player.grandeBoiteX < passerelle.positionX + passerelle.largeur - 20 && player.grandeBoiteY + player.hauteur > passerelle.positionY - 23 && player.grandeBoiteY + player.hauteur < passerelle.positionY + passerelle.hauteur) { // permet de se poser sur la passerelle 1
        player.grandeBoiteY = passerelle.positionY - player.hauteur - 23;
        player.dy = 0;
        player.isOnGround = true;
        player.isJumping = false;
        niveau1 = false;
        niveau2 = true;
        positionR = passerelle.positionY - player.hauteur;
    }
    // passerelle 2 (niveau 2 à milieu) ***********************************************************************
    if (player.grandeBoiteX + player.largeur > passerelle2.positionX && player.grandeBoiteX < passerelle2.positionX + passerelle2.largeur - 20 && player.grandeBoiteY + player.hauteur > passerelle2.positionY - 23 && player.grandeBoiteY + player.hauteur < passerelle2.positionY + passerelle2.hauteur) { // permet de se poser sur la passerelle 2
        player.grandeBoiteY = passerelle2.positionY - player.hauteur - 23;
        player.dy = 0;
        player.isOnGround = true;
        player.isJumping = false;
        niveau2 = true;
        positionR = passerelle2.positionY - player.hauteur;
    }

    // Nuage (niveau 2 à Droite) ***********************************************************************
    if (player.grandeBoiteX + player.largeur > nuage.positionX && player.grandeBoiteX < nuage.positionX + nuage.largeur - 20 && player.grandeBoiteY + player.hauteur > nuage.positionY - 23 && player.grandeBoiteY + player.hauteur < nuage.positionY + nuage.hauteur) { // permet de se poser sur la passerelle 2
        player.grandeBoiteY = nuage.positionY - player.hauteur - 23;
        player.dy = 0;
        player.isOnGround = true;
        player.isJumping = false;
        positionR = nuage.positionY - player.hauteur;
    }
}
function drawLogo(){
    ctx.drawImage(logo.sprite, logo.spritePositionX, logo.spritePositionY, logo.spriteLargeur, logo.spriteHauteur, logo.positionX, logo.positionY, logo.largeur, logo.hauteur);
    //   ctx.strokeRect(420,80,350,100);
}
// Dectection pickup et suppression lors de la collision
function drawCompetence() {

    // ctx.font = "20px Arial";
    // ctx.fillStyle = "#042903";
    // ctx.fillText("Bienvenue chez Yoshiland avec Luigi ", 5, 40);
    // ctx.fillText("Prend un max d'etoile pour gagner en compétence ", 5, 60);

    if (score >= 5) {

        document.getElementById('html').style['opacity'] = '1';
        document.getElementById('html').style['transition'] = '1.5s';
    }

    if (score >= 10) {

        document.getElementById('css').style['opacity'] = '1';
        document.getElementById('css').style['transition'] = '2s';
    }

    if (score >= 15) {
        document.getElementById('javascript').style['opacity'] = '1';
        document.getElementById('javascript').style['transition'] = '2s';
    }
    if (score >= 20) {
        document.getElementById('jquery').style['opacity'] = '1';
        document.getElementById('jquery').style['transition'] = '2s';
    }
    if (score >= 25) {
        document.getElementById('angular').style['opacity'] = '1';
        document.getElementById('angular').style['transition'] = '2s';
    }
    if (score >= 30) {
        document.getElementById('mongo').style['opacity'] = '1';
        document.getElementById('mongo').style['transition'] = '2s';
    }
    if (score >= 35) {
        document.getElementById('vue').style['opacity'] = '1';
        document.getElementById('vue').style['transition'] = '2s';
    }
    if (score >= 40) {
        document.getElementById('node').style['opacity'] = '1';
        document.getElementById('node').style['transition'] = '2s';
    }
    if (score >= 45) {
        document.getElementById('bootstrap').style['opacity'] = '1';
        document.getElementById('bootstrap').style['transition'] = '2s';
    }
    if (score >= 50) {
        document.getElementById('wordpress').style['opacity'] = '1';
        document.getElementById('wordpress').style['transition'] = '2s';
    }

}

function drawScore() {
    ctx.font = "35px Arial";
    ctx.fillStyle = "#B25A5D";
    ctx.fillText("Score: " + score, 1045, 40);


}
//ghosting
//function (player) draw
function drawPlayer() {
    // draw player
    ctx.drawImage(player.sprite, player.sw * frameX, player.sh * frameY, player.sw, player.sh, player.grandeBoiteX, player.grandeBoiteY, player.largeur * 2, player.hauteur * 2) // création du player 
}

function drawBloc() {

    ctx.drawImage(bloc1.sprite, bloc1.spritePositionX, bloc1.spritePositionY, bloc1.spriteLargeur, bloc1.spriteHauteur, bloc1.positionX, bloc1.positionY, bloc1.largeur, bloc1.hauteur);

    ctx.drawImage(bloc2.sprite, bloc2.spritePositionX, bloc2.spritePositionY, bloc2.spriteLargeur, bloc2.spriteHauteur, bloc2.positionX, bloc2.positionY, bloc2.largeur, bloc2.hauteur);
    // ctx.strokeRect(85,580,80,70);

    ctx.drawImage(plateau.sprite, plateau.spritePositionX, plateau.spritePositionY, plateau.spriteLargeur, plateau.spriteHauteur, plateau.positionX, plateau.positionY, plateau.largeur, plateau.hauteur);

    ctx.drawImage(plateau1.sprite, plateau1.spritePositionX, plateau1.spritePositionY, plateau1.spriteLargeur, plateau1.spriteHauteur, plateau1.positionX, plateau1.positionY, plateau1.largeur, plateau1.hauteur);

    ctx.drawImage(plateau2.sprite, plateau2.spritePositionX, plateau2.spritePositionY, plateau2.spriteLargeur, plateau2.spriteHauteur, plateau2.positionX, plateau2.positionY, plateau2.largeur, plateau2.hauteur);

    ctx.drawImage(plateau3.sprite, plateau3.spritePositionX, plateau3.spritePositionY, plateau3.spriteLargeur, plateau3.spriteHauteur, plateau3.positionX, plateau3.positionY, plateau3.largeur, plateau3.hauteur);

    ctx.drawImage(egout.sprite, egout.spritePositionX, egout.spritePositionY, egout.spriteLargeur, egout.spriteHauteur, egout.positionX, egout.positionY, egout.largeur, egout.hauteur);
    // ctx.strokeRect(0,523,80,120);

    ctx.drawImage(passerelle.sprite, passerelle.spritePositionX, passerelle.spritePositionY, passerelle.spriteLargeur, passerelle.spriteHauteur, passerelle.positionX, passerelle.positionY, passerelle.largeur, passerelle.hauteur);
    // ctx.strokeRect(140, 478, 258, 30);

    ctx.drawImage(passerelle2.sprite, passerelle2.spritePositionX, passerelle2.spritePositionY, passerelle2.spriteLargeur, passerelle2.spriteHauteur, passerelle2.positionX, passerelle2.positionY, passerelle.largeur, passerelle.hauteur);

    ctx.drawImage(nuage.sprite, nuage.spritePositionX, nuage.spritePositionY, nuage.spriteLargeur, nuage.spriteHauteur, nuage.positionX, nuage.positionY, nuage.largeur, nuage.hauteur);
    // ctx.strokeRect(900, 478, 220, 30);

    ctx.drawImage(porte.sprite, porte.spritePositionX, porte.spritePositionY, porte.spriteLargeur, porte.spriteHauteur, porte.positionX, porte.positionY, porte.largeur, porte.hauteur);


}


// function  keys

document.addEventListener('keydown', function () {
    window.onkeydown = function (event) { // Code bouton pressé
        var code = event.keyCode;
        switch (code) {
            case 39: // touche droite
                presseDroite = true;

                if (frameX < 8) { // repositionner le cadre dans l'image pour marcher vers la droite
                    player.sw = 28.7;
                    frameX = 8

                }
                if (frameX < 13) {
                    frameX += 1;
                } else {
                    frameX = 8
                }
                break;

            case 37: // Touche gauche
                presseGauche = true;
                player.sw = 27;
                if (frameX > 7) {
                    frameX = 7; // repositionner le cadre dans l'image pour marcher vers la gauche

                }
                if (frameX > 2) {
                    frameX -= 1;
                } else {
                    frameX = 6;
                }
                break;
            case 38: // Touche Saut
                presseHaut = true;
                // player.jumping = true
                break;
        }

    }

    window.onkeyup = function (event) { // Code bouton relevé
        var code = event.keyCode;
        switch (code) {
            case 39: // touche droite
                presseDroite = false;
                player.dx = 0;

            case 37:
                presseGauche = false;
                player.dx = 0;
                break;
            case 38:
                // presseHaut = false;
                break;
        }

    }
});
