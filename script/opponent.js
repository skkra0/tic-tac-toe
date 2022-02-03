  const Opponent = {
   play: () => {
     let possibleMoves = Game.getBoard().map((e, i) => !e ? i : null).filter(e => e !== null);
     let p = Math.floor(Math.random() * possibleMoves.length);
     Game.players[1].move(possibleMoves[p]);
   }
 };
