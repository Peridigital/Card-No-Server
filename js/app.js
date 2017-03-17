

angular.module('cardGame', ['ui.router'])

  .config( function ($urlRouterProvider, $stateProvider ){

$urlRouterProvider.when('', '/');

  $stateProvider
    .state('welcome', {
      templateUrl: './views/welcome.html',

      url: '/',
      resolve: {
        loginCheck: function (gameService, $state) {
          if (gameService.localPlayer) {
            $state.go('game')
          }
        }
      }
    })

    .state('game', {
      templateUrl: './views/game.html' ,

      url: '/game',
      resolve: {
        loginCheck: function (gameService, $state) {
          if (!gameService.localPlayer) {
            $state.go('welcome')
          }
        }
      }
    })

})
