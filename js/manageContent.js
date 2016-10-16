//BACKGROUND
var bgImage = new Image();
bgImage.src = "images/game-background.png";

//USABLE
var pokeball = new Image();
pokeball.src = "pics/pokeball.png";

var megaBall = new Image();
megaBall.src = "pics/mega-ball.png";

var OpenPokeball = new Image();
OpenPokeball.src = "pics/open-pokeball.png";

var candy = new Image();
candy.src = "pics/candy.png";

var eggIncubator = new Image();
eggIncubator.src = "pics/egg-incubator.png";

var egg = new Image();
egg.src = "pics/egg.png";

var pokedex = new Image();
pokedex.src = "pics/pokedex.png";

var superBall = new Image();
superBall.src = "pics/superball.png";

var ultraBall = new Image();
ultraBall.src = "pics/ultra-ball.png";


//INSIGNIAS
var insignia1 = new Image();
insignia1.src = "pics/insignia-1.png";

var insignia = new Image();
insignia.src = "pics/insignia.png";


//TEAMS
var blueTeam = new Image();
blueTeam.src = "pics/blue-team.png";

var mystic = new Image();
mystic.src = "pics/mystic-1.png";

var redTeam = new Image();
redTeam.src = "pics/red-team.png";

var valor = new Image();
valor.src = "pics/valor-1.png";

var yellowTeam = new Image();
yellowTeam.src = "pics/yellow-team.png";

var instinct = new Image();
instinct.src = "pics/instinct-1.png";


//POKEMONS
var bellsprout = new Image();
bellsprout.src = "pics/bellsprout.png";

var bullbasaur = new Image();
bullbasaur.src = "pics/bullbasaur.png";

var caterpie = new Image();
caterpie.src = "pics/caterpie.png";

var charmander = new Image();
charmander.src = "pics/charmander.png";

var dratini = new Image();
dratini.src = "pics/dratini.png";

var eevee = new Image();
eevee.src = "pics/eevee.png";

var abra = new Image();
abra.src = "pics/abra.png";

var zaptos = new Image();
zaptos.src = "pics/zaptos.png";

var jigglypuff = new Image();
jigglypuff.src = "pics/jigglypuff.png";

var mankey = new Image();
mankey.src = "pics/mankey.png";

var meowth = new Image();
meowth.src = "pics/meowth.png";

var mew = new Image();
mew.src = "pics/mew.png";

var pidgey = new Image();
pidgey.src = "pics/pidgey.png";

var pikachu = new Image();
pikachu.src = "pics/pikachu.png";

var psyduck = new Image();
psyduck.src = "pics/psyduck.png";

var rattata = new Image();
rattata.src = "pics/rattata.png";

var snorlax = new Image();
snorlax.src = "pics/snorlax.png";

var squirtle = new Image();
squirtle.src = "pics/squirtle.png";

var venonat = new Image();
venonat.src = "pics/venonat.png";

var weedle = new Image();
weedle.src = "pics/weedle.png";

var zubat = new Image();
zubat.src = "pics/zubat.png";


//OTHERS
var battle = new Image();
battle.src = "pics/battle.png";

var cp = new Image();
cp.src = "pics/combat-power.png";

var crown = new Image();
crown.src = "pics/crown.png";

var eggCrashing = new Image();
eggCrashing.src = "pics/egg-1.png";

var fight = new Image();
fight.src = "pics/fight.png";

var gotcha = new Image();
gotcha.src = "pics/gotcha.png";

var star = new Image();
star.src = "pics/star.png";


$(document).ready(function(){
	var canvas = document.getElementById("main-screen");
	var ctx = canvas.getContext("2d");
	canvas.width = 512;
	canvas.height = 480;

	trainer = {
		level: 1,
		pokemons: 2
	}

	//var to draw pokemon at this point
	var pokemonX, pokemonY;
	//Who is this pokemon?
	var pokemonAux;
	var createPokemon = 0;
	var hasPokemon = false;
	var pokeballTouched = false;
	var pokemonLifeTime;
	//all pokemons
	var sprites = [bellsprout, bullbasaur, caterpie, charmander, dratini, eevee, abra, zaptos, jigglypuff, mankey, meowth, mew, pidgey, pikachu, psyduck, rattata, snorlax, squirtle, venonat, weedle, zubat];

	function getPosition(event){
		if (hasPokemon) {
				var x = event.x - canvas.offsetLeft;
  			var y = event.y - canvas.offsetTop;
				if (x <= pokemonX+30 && x >= pokemonX-30 && y <= pokemonY+30 && y >= pokemonY-30) {
						hasPokemon = 0;
						createPokemon = 0;
						clearTimeout(pokemonLifeTime);
						pokeballTouched = true;
						//touchPokeball(x, y);
				}
		}


	}
	canvas.addEventListener("mousedown", getPosition, false);

	// Draw everything
	var render = function () {
		//background draw (no interect with it)
		ctx.drawImage(bgImage, 0, 0);

		if ( pokeballTouched ){
				ctx.drawImage(pokeball, pokemonX, pokemonY);
		}

		//chance to draw a pokemon
		if ( createPokemon != 49 ){
				createPokemon = Math.floor(Math.random()*50);
		}

		//draw a pokemon
		else {
			if (hasPokemon){
					ctx.drawImage(sprites[pokemonAux], pokemonX, pokemonY);
			}else{
				//pokemon choose
				pokemonAux = Math.floor(Math.random()*21);

				pokemonX = 32 + (Math.random() * (canvas.width - 94));
				pokemonY = 32 + (Math.random() * (canvas.height - 94));

				hasPokemon = true;

				//if 5 seconds and the pokemon stays there another pokemon can be draw
				pokemonLifeTime = window.setTimeout(function(){
					createPokemon = 0
					hasPokemon = false;
				}, 1500);
			}
		}

		// level
		ctx.fillStyle = "rgb(255,255,255)";
		ctx.font = "20px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText("Level: " + trainer.level, 32, 32);
		ctx.font = "18px Helvetica";
		ctx.fillText("Pokemons: " , 32,72);

		var auxX = 130;
		for(var i=0; i<trainer.pokemonsCaught; i++){
			ctx.drawImage(pokeball, auxX, 68);
			auxX += 35;
		}
	};

	var mainloop = function() {
        render();
  };
	// have a most efficient way to do this
	// 16.6666 = 60 FPS
	setInterval( mainloop, 16.6666 );
});
