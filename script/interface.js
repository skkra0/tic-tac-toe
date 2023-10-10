 const InterfaceManager = (() => {
   let cells = document.querySelectorAll("#gameBoard > div");
   let difficulty = "easy";
   let desc = document.getElementById("desc");
     
   const init = () => {
     for (let i = 0; i < cells.length; i++) {
       const j = i;
       cells[i].setAttribute("style", `
grid-column-start: ${i % 3 + 1};
grid-column-end: ${i % 3 + 2};
grid-row-start: ${i % 3 + 1}
grid-row-end: ${i % 3 + 2}`);
       cells[i].addEventListener("click", function() {
         let currentPlayerIndex = Game.getTurn() % 2;
         if (currentPlayerIndex == 0 && Game.players[currentPlayerIndex].move(j)) {
           InterfaceManager.updateDisplay();
setTimeout(() => {
               if (difficulty === "easy") {  
               Game.players[1].move( Opponent.random() );
            } else if (difficulty === "hard") {
               Game.players[1].move( Opponent.minimax(Game.getBoard()).move.index );
           } else {
               throw "lol what";
           }
               InterfaceManager.updateDisplay();
           }, 100); //https://stackoverflow.com/questions/66574622/javascript-not-finishing-dom-update-and-moving-to-next-function
         }
       });
     }
    document.getElementById("difficulty").addEventListener("input", function() {
        Game.clearGame();
        InterfaceManager.updateDisplay();
        desc.textContent = `X's turn`;
        document.getElementById("reset").style.display = "none";
        difficulty = this.value;
    });
     document.getElementById("reset").addEventListener("click", function() {
       Game.clearGame();
       InterfaceManager.updateDisplay();
       desc.textContent = `X's turn`;
       this.style.display = "none";
     });
    desc.textContent = `X's turn`;
   };

   const updateDisplay = () => { // fix so that it doesn't update every single cell every time
     let isFin = Game.checkFin();
     switch (isFin.gameState) {
       case -1:
         desc.textContent = "Tie";
         document.getElementById("reset").style.display = "inline-block";
         break
       case 1:
         desc.textContent = `Winner: ${isFin.winner}`;
         document.getElementById("reset").style.display = "inline-block";
         break
      case 0:
         desc.textContent = `${Game.players[Game.getTurn() % 2].sym}'s turn`;
     }
    for (let i = 0; i < cells.length; i++) {
       cells[i].textContent = Game.getBoard()[i];
     }
   }
   return {
     init,
     updateDisplay
   };
 })();
 InterfaceManager.init();
