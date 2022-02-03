const Game = (() => {
   let board = ['', '', '', '', '', '', '', '', ''];
   let turn = 0;
   const getBoard = () => board;
   const getTurn = () => turn;
   const clearGame = () => {
     board = ['', '', '', '', '', '', '', '', ''];
     turn = 0;
   };
   const checkFin = () => {
     let gameState = 0;
     let winner = null;
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
     for (let combo of winCombos) {
       if (board[combo[0]] === board[combo[1]] && board[combo[1]] === board[combo[2]]) {
         if (board[combo[0]]) {
           gameState = 1;
           winner = board[combo[0]];
           return {
             gameState,
             winner
           };
         }
       }
     }
     if (board.find(t => t === "") !== "") {
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
     clearGame
   };
 })();
