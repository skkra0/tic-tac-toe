const Game = (() => {
   let board = ['', '', '', '', '', '', '', '', ''];
   let turn = 0;
   const winCombos = [
       [0, 1, 2],
       [3, 4, 5],
       [6, 7, 8],
       [0, 3, 6],
       [1, 4, 7],
       [2, 5, 8],
       [0, 4, 8],
       [2, 4, 6]
     ];

   const getBoard = () => board;
   const getTurn = () => turn;
   const clearGame = () => {
     board = ['', '', '', '', '', '', '', '', ''];
     turn = 0;
   };

   const checkFin = (b=board) => {
     let gameState;
     let winner = null;
     for (let combo of winCombos) {
       if (b[combo[0]] === b[combo[1]] && b[combo[1]] === b[combo[2]]) {
         if (b[combo[0]]) {
           gameState = 1;
           winner = b[combo[0]];
           return {
             gameState,
             winner
           };
         }
       }
     }
     if (b.findIndex(c =>  c === "") === -1) {
         console.log("hey")
       gameState = -1; // board full w/ no win(tie)
     } else {
       gameState = 0;
     }
     return {
       gameState,
       winner
     };
   };

   const Player = (sym) => {
     const move = (pos) => {
       if (checkFin().gameState === 0 && !board[pos]) {
         board[pos] = sym;
         turn += 1;
         return true;
       }
       return false;
     };
     return {
       sym,
       move
     };
   };
   const players = [Player("X"), Player("O")];

   return {
     getBoard,
     getTurn,
     checkFin,
     players,
     clearGame,
     winCombos
   };
 })();
