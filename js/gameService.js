angular.module('cardGame').service('gameService', function($http) {

  this.makePlayer = function (playerName, playerID){
    return {
      name: playerName,
      playerID: playerID,
      hand: []
    }
  }

  this.makeGame = function (players, deck) {
    return {
      deckId: deck.deckId,
      remainingCards: deck.remainingCards,
      players: players,
      turn: {
        currentPlayer: 1,
        currentPhase: 'draw',
        turnCount: 1,
        advancePhase: function () {
          switch (this.currentPhase) {
            case 'draw':
                this.currentPhase = 'discard'
            break;
            case 'discard':
                this.currentPhase = 'draw'

                // TODO check for winner

                switch (this.currentPlayer) {
                  case 1:
                      this.currentPlayer = 2
                  break;
                  case 2:
                      this.currentPlayer = 1
                      this.turnCount ++
                  break;
                  default:
                }

            break;

            default:

          }
        }
      }
    }
  }
})
