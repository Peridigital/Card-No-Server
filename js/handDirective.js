angular.module('cardGame')
.directive('handDirective', function() {
  return {
    templateUrl: "views/hand.html",
    restrict: 'E',
    scope: {
      game: '=',
      localPlayer: '='

    },
    link: function(scope, element, attributes ) {
    }
  }
});
