var playerType = document.getElementById("player-type");

playerType.addEventListener("click", function(){
    if (playerType.src.endsWith('player.png')){
        playerType.src = 'pics/player-1.png';
    }else{
      playerType.src = 'pics/player.png';
    }
}, false);
