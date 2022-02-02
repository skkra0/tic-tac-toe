const InterfaceManager = {
   init: () => {
     let cells = document.querySelectorAll("#gameBoard > div");
     for (let i = 0; i < cells.length; i++) {
       const j = i;
       cells[i].setAttribute("style", `
grid-column-start: ${i % 3 + 1};
grid-column-end: ${i % 3 + 2};
grid-row-start: ${i % 3 + 1}
grid-row-end: ${i % 3 + 2}`);
       cells[i].addEventListener("click", function() {
         let currentPlayerIndex = Game.getTurn() % 2;
         if ( /*currentPlayerIndex == 0 && */ Game.players[currentPlayerIndex].move(j)) {
           this.textContent = Game.players[currentPlayerIndex].sym;
         }
       });
     }
     document.getElementById("reset").addEventListener("click", function() {
       Game.clearGame();
       for (let i = 0; i < cells.length; i++) {
         cells[i].textContent = "";
       }
       document.getElementById("desc").textContent = `${Game.players[Game.getTurn() % 2].sym}'s turn`;
       this.style.display = "none";
     });
     document.getElementById("desc").textContent = `${Game.players[Game.getTurn() % 2].sym}'s turn`;
     document.getElementById("gameBoard").addEventListener("click", InterfaceManager.updateDesc);
   },
   updateDesc: () => {
     let isFin = Game.checkFin();
     let desc = document.getElementById("desc");
     desc.textContent = `${Game.players[Game.getTurn() % 2].sym}'s turn`;
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
         break

     }
   }
 }
 InterfaceManager.init();
