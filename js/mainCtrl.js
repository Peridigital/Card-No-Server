angular.module('cardGame').controller('mainCtrl', function($scope, cardService) {
  $scope.test = cardService.serviceTest

  $scope.hands = []

  $scope.grabDeck = function() {
    cardService.getDeck().then(function (data) {
      $scope.deck = data
    })
    $scope.deckButtonDisabled = true
    setTimeout(function(){
      $scope.$apply(function () {
        $scope.deckButtonDisabled = false
      })
    }, 5000)
  }
  $scope.drawCard = function (index, deckId) {


    // $scope.hands[index].cards.push("hello, " + index)

    cardService.drawCard(deckId).then(function (data) {
      $scope.hands[index].cards.push(data.cards)
      $scope.deck.remainingCards = data.remainingCards
    })
    // console.log($scope.hands[index].cards);

  }
  $scope.deal = function () {

    for (var i = 0; i < $scope.dealCount; i++) {
      for (var j = 0; j < $scope.hands.length; j++) {
        $scope.drawCard(j, $scope.deck.deckId)
      }

    }
    $scope.dealCount = ''
  }

  $scope.newHand = function () {
    $scope.hands.push(
      {
        name: $scope.playerName,
        cards: []
      }
    );
    $scope.playerName = ''
  }

})
