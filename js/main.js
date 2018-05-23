function el(id){
	return document.getElementById(id);

};
var ballSammler = [];
var paddleSammler = [];
var tCode; // cursor position

function kollision(a,b){
	if(a.x < b.x + b.w  &&
		a.x + a.w > b.x &&
		a.y < b.y + b.h &&
		a.h + a.y > b.y) {
		return true;
	}else{
		return false;
	}
}
var protoPaddle = {
					w:15,
					h:80,
					x:645, // pos rechts
					y:150, // pos oben
					html:0,
					left:false,
					right:false,
					make:function(){
								if(this.left){
									this.x = 40;
								}
					 			if(this.right){
									this.x = 645;
								}
								this.html = document.createElement('div');
								this.html.setAttribute('class','paddle');
								this.html.style.left = this.x + "px";
								this.html.style.top = this.y + "px";
								el('game').appendChild(this.html);
								paddleSammler.push(this);
					}, // ENDE protoPaddle.make()
					move: function(){
								if (this.left){
										if (tCode == 87 && this.y > 0){this.y -=3.5;}; //nach oben
										if (tCode == 83 && this.y < 319){this.y +=3.5;}; //nach unten
								};
								if (this.right){
									if (tCode == 38 && this.y > 0){this.y -=3.5;}; // nach oben
									if (tCode == 40 && this.y < 319){this.y +=3.5;}; // nach unten

								};
								this.html.style.top = this.y + "px";
					}  // ENDE protoPaddle.move()
}; // ENDE protoPaddle

var protoBall  = {
					w:25,
					h:25,
					x:120,
					y:140,
					rx:0, // 0=> nach rechts ; 1 nach links
					ry:0,
					speedx:3,
					speedy:2,
					html:0,
					make:function(){
								this.html = document.createElement('div');
								this.html.setAttribute('class','ball');
								this.x = 335;
								this.y = 185;
								this.html.style.left = this.x + "px";
								this.html.style.top = this.y + "px";

								el('game').appendChild(this.html);

								ballSammler.push(this);
					},
					move:function(){
						//colision btw ball - right paddle
						if (kollision(this,paddleSammler[0])){
							this.rx = 1; //nach links

						}
						//colision btw ball - left paddle
					 	if (kollision(this,paddleSammler[1])){
							this.rx = 0; //nach rechts
						}

						//Ball im off
							// links weg
						if (this.x < 5){
							this.rx = 1;
							this.x = 335;
							this.y = 185;
						};
							// rechts weg
						if (this.x > 675){
							this.rx = 0;
							this.x = 335;
							this.y = 185;
						}

						// Aufprall unter --- oben
						if (this.y > 375){
							this.ry = 1; //nach oben
						}
						if (this.y < 0){
							this.ry = 0; //nach unten
						}
						if (this.rx == 0){this.x += this.speedx;}
						if (this.rx == 1){this.x -= this.speedx;}
						if (this.ry == 0){this.y += this.speedy;}
						if (this.ry == 1){this.y -= this.speedy;}

						//ubergabe der Positionen
						this.html.style.left = this.x + "px";
						this.html.style.top = this.y + "px";
					}
}; //ENDE protoBall



function checkKey(e){
	tCode = e.keyCode;
	console.log(tCode);
//	e.preventDefault();

}
function up(){
	tCode = -1;
	console.log(tCode);
}

function ballFabrik(){
	var clone = Object.create(protoBall);
	clone.make();
}

function paddleFabrik(){
	var clone = Object.create(protoPaddle);
	clone.right = true;
	clone.make();

	var clone = Object.create(protoPaddle);
	clone.left = true;
	clone.make();

};

function render(){

	// paddle animation
	for (var i = 0; i < paddleSammler.length; i++){
		paddleSammler[i].move();
	}
	// ball animation
	for (var i = 0; i < ballSammler.length; i++){
		ballSammler[i].move();
	}
	requestAnimationFrame(render);
};

ballFabrik();
paddleFabrik();
render();
document.addEventListener('keydown',checkKey);
document.addEventListener('keyup',up);
