angular.module('cardGame').service('gameService', function($http) {

  this.makePlayer = function (playerName, playerID){
    var opponent
    function test() {
      if (playerID === 2) {
        opponent = 1
      } else if (playerID === 1) {
        opponent = 2
      }
    }
    test()
    this.localPlayer = {
      name: playerName,
      playerID: playerID,
      opponent: opponent,
      hand: []
    }
    return this.localPlayer
  }

  this.makeGame = function (players, deck) {
    return {
      deckId: deck.deckId,
      remainingCards: deck.remainingCards,
      players: players,
      discardedCards: [{image: ''}],
      declareWinner: function (player) {
        this.declaredWinner = player.name;
        this.winningHand = player.hand
      },
      checkTurn: function (playerID, action) {
        if (playerID === this.turn.currentPlayer) {
          if (action === this.turn.currentPhase) {
            return true
          } else {
            console.log('Wrong phase');
          }
        } else {
          console.log('Wrong player, ' + playerID);
        }
      },
      turn: {
        currentPlayer: 1,
        currentPhase: 'Draw',
        turnCount: 1,
        checkWinner: function () {
          if (this.turnCount == 4) {
            return true
          }
        },
        advancePhase: function () {
          switch (this.currentPhase) {
            case 'Draw':
                this.currentPhase = 'Discard'
            break;
            case 'Discard':
                this.currentPhase = 'Draw'

                // TODO check for winner

                if (this.checkWinner()) {
                  return this.currentPlayer
                }

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

  this.dealWinningHand = function () {
    return [{
      code: "2H",
      image: 'http://deckofcardsapi.com/static/img/2H.png',
      suit: "HEARTS",
      value: "2"
    },
    {
      code: "3H",
      image: 'http://deckofcardsapi.com/static/img/3H.png',
      suit: "HEARTS",
      value: "3"
    },
    {
      code: "4H",
      image: 'http://deckofcardsapi.com/static/img/4H.png',
      suit: "HEARTS",
      value: "4"
    },
    {
      code: "4H",
      image: 'http://deckofcardsapi.com/static/img/4H.png',
      suit: "HEARTS",
      value: "4"
    },
    {
      code: "5H",
      image: 'http://deckofcardsapi.com/static/img/5H.png',
      suit: "HEARTS",
      value: "5"
    },
    {
      code: "6H",
      image: 'http://deckofcardsapi.com/static/img/6H.png',
      suit: "HEARTS",
      value: "6"
    },
    {
      code: "7H",
      image: 'http://deckofcardsapi.com/static/img/7H.png',
      suit: "HEARTS",
      value: "7"
    }]
  }

})
