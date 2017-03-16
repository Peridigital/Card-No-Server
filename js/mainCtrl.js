angular.module('cardGame').controller('mainCtrl', function($scope, cardService, gameService) {
  $scope.test = cardService.serviceTest

  $scope.hands = []
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

  $scope.startNewGame = function () {
    $scope.grabDeck().then(function (data) {
      $scope.game = gameService.makeGame($scope.players, data);
      $scope.deal(7)
      console.log($scope.game);
    })
    $scope.loginPlayer("Roboto")
  }

})
