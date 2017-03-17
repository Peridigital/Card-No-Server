angular.module('cardGame').controller('mainCtrl', function($scope, cardService, gameService) {
  $scope.test = 'test'

  $scope.players = []

  //GETs a deck from the API
  $scope.grabDeck = function() {
    return cardService.getDeck().then(function (data) {
      return data
    })
  }
  //Draws a card into a specific hand but GETting a card from the deckID API
  $scope.drawCard = function (index, deckId) {
    cardService.drawCard(deckId).then(function (data) {
      $scope.game.players[index].hand.push(data.cards)
      $scope.game.remainingCards = data.remainingCards
    })
  }
  //Draws a number of cards to every hand
  $scope.deal = function (dealCount) {
    for (var i = 0; i < dealCount; i++) {
      for (var j = 0; j < 2; j++) {
        $scope.drawCard(j, $scope.game.deckId)
      }
    }
  }
  //Creates a new hand
  $scope.newHand = function () {
    $scope.hands.push(
      {
        name: $scope.playerName,
        cards: []
      }
    );
    $scope.playerName = ''
  }
  $scope.loginPlayer = function (playerName) {
    var playerSlot = $scope.players.length + 1;
    $scope.localPlayer = gameService.makePlayer(playerName, playerSlot);
    $scope.players.push($scope.localPlayer);
  }
;
  $scope.startNewGame = function () {
    $scope.grabDeck().then(function (data) {
      $scope.game = gameService.makeGame($scope.players, data);
      cardService.drawCard($scope.game.deckId).then(function (data) {
        $scope.game.discardedCards.unshift(data.cards)
      })
      $scope.deal(7)

      console.log($scope.game);
    })
    $scope.loginPlayer("Roboto")
    // TODO Remove after testing
    $scope.loginPlayer("Aaron")
  }
  $scope.advancePhase = function () {
    var winCheck = $scope.game.turn.advancePhase()
    if (winCheck) {
      $scope.winner = true
      if (winCheck === $scope.localPlayer.playerID) {

      }
    }
  }
  $scope.drawFromDeck = function () {
    if ($scope.game.checkTurn($scope.localPlayer.playerID, 'Draw')) {

      cardService.drawCard($scope.game.deckId).then(function (data) {
        $scope.game.players[$scope.localPlayer.playerID - 1].hand.push(data.cards)
        $scope.game.remainingCards = data.remainingCards
        $scope.advancePhase()
      })
    }
  }
  $scope.drawFromDiscard = function () {
    if ($scope.game.checkTurn($scope.localPlayer.playerID, 'Draw')) {
      $scope.game.players[$scope.localPlayer.playerID - 1].hand.push($scope.game.discardedCards[0])
      $scope.game.discardedCards.shift()
      $scope.advancePhase()

    }
  }
  $scope.dealWinningHand = function () {
    $scope.game.players[$scope.localPlayer.playerID - 1].hand = [];
    var winningHand = gameService.dealWinningHand()
    for (var i = 0; i < winningHand.length; i++) {
      $scope.game.players[$scope.localPlayer.playerID - 1].hand.push(winningHand[i])

    }
  }
  $scope.resetGame = function () {
    $scope.game = '';
    $scope.players = [];
    $scope.localPlayer = '';
    $scope.winner = '';
  }
})
