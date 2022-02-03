 const InterfaceManager = (() => {
   let cells = document.querySelectorAll("#gameBoard > div");
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
           Opponent.play();
           InterfaceManager.updateBoard();
         }
       });
     }
     document.getElementById("gameBoard").addEventListener("click", InterfaceManager.updateDesc);

     document.getElementById("reset").addEventListener("click", function() {
       Game.clearGame();
       for (let i = 0; i < cells.length; i++) {
         cells[i].textContent = "";
       }
       document.getElementById("desc").textContent = `X's turn`;
       this.style.display = "none";
     });

     document.getElementById("desc").textContent = `X's turn`;
   };

   const updateBoard = () => {
     for (let i = 0; i < cells.length; i++) {
       cells[i].textContent = Game.getBoard()[i];

     }
   }
   const updateDesc = () => {
     let isFin = Game.checkFin();
     let desc = document.getElementById("desc");
     switch (isFin.gameState) {
       case -1:
         desc.textContent = "Tie";
         document.getElementById("reset").style.display = "inline-block";
         break
       case 1:
         desc.textContent = `Winner: ${isFin.winner}`;
         document.getElementById("reset").style.display = "inline-block";
         break
     }
   }
   return {
     init,
     updateBoard,
     updateDesc
   };
 })();
 InterfaceManager.init();
