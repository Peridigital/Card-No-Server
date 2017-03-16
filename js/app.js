

angular.module('cardGame', ['ui.router'])

  .config( function ($urlRouterProvider, $stateProvider){

$urlRouterProvider.when('', '/');

  $stateProvider
    .state('welcome', {
      templateUrl: './views/welcome.html',

      url: '/'
    })

    .state('game', {
      templateUrl: './views/game.html' ,
      
      url: '/game'
    })

})
