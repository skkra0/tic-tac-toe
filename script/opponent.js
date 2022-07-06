  const Opponent = (() => {
   const hPlayerIndex = 0, aiPlayerIndex = 1;
   let winCombos = Game.winCombos;
   const getPossibleMoveIndexes = (board) => {
       let possibleMoves = board
         .map((current, index) => !current ? index : -1)
         .filter(current => current !== -1);
       
       return possibleMoves;
   };
      
   const random = () => {
     let board = Game.getBoard();
     let possibleMoves = getPossibleMoveIndexes(board);
     let p = Math.floor(Math.random() * possibleMoves.length);
     return possibleMoves[p];
    };

    const countWinRows = (sym, board) => { 
        // count how many rows are two of a symbol and a blank
        let wRows = 0;
        for (let combo of winCombos) {
            let symCount = 0;
            for (let cellInd of combo) {
                let cell = board[cellInd];
                if (cell === sym) {
                    symCount++;
                }
            }
            if (symCount === 3)wRows++;
        }
        return wRows;
    };
    
    const getUtility = (board) => {
        let maxPlayer = Game.players[aiPlayerIndex];
        let minPlayer = Game.players[hPlayerIndex];

        let maxWRows = countWinRows(maxPlayer.sym, board);
        let minWRows = countWinRows(minPlayer.sym, board);
        if (maxWRows) {
            return 10;
        } else if (minWRows) {
            return -10;
        } 
        return 0;
    };

    const minimax = (board, depth=0, isMaximizer=true) => {
        if (Game.checkFin(board).gameState) {
            console.log("h")
            return { // if game finished
                move: null, 
                utility: getUtility(board),
            };}
        
        let possibleMoveIndexes = getPossibleMoveIndexes(board);

        let bestMove = null;
        let bestUtility;
        
        if (isMaximizer) {
            let possibleMoves = possibleMoveIndexes.map((moveIndex) => {
            let pMove = {
                board: [...board],
                index: moveIndex,
            };
            pMove.board[moveIndex] = Game.players[aiPlayerIndex].sym;
            return pMove;
        });
            bestMove = null;
            bestUtility = -1000;
            for (let pMove of possibleMoves) {
                let moveInfo = minimax(pMove.board, depth + 1, false);
                if (moveInfo.utility > bestUtility) {
                    console.log(`maximizer passing one up to depth ${depth}, utility ${moveInfo.utility}`)
                    console.log(pMove)
                    bestUtility = moveInfo.utility;
                    bestMove = pMove;
                }
            }
        } else {
            let possibleMoves = possibleMoveIndexes.map((moveIndex) => {
            let pMove = {
                board: [...board],
                index: moveIndex,
            };
            pMove.board[moveIndex] = Game.players[hPlayerIndex].sym;
            return pMove;
        });
            
            bestUtility = 1000;
            for (let pMove of possibleMoves) {
                console.log("calling maximizer")
                let moveInfo = minimax(pMove.board, depth + 1, true);
                if (moveInfo.utility < bestUtility) {
                    console.log(`minimizer passing one up to depth ${depth}, utility ${moveInfo.utility}`)
                    console.log(pMove)
                    bestUtility = moveInfo.utility;
                    bestMove = pMove;
                }
            }
        }
        return {
            move: bestMove,
            utility: bestUtility,
        }
    }
      return {
          random,
          minimax,
          getUtility
      }
  })();
