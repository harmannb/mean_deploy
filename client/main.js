var app = angular.module("myApp", ["ngRoute"])


// ROUTES
app.config(function($routeProvider){
   $routeProvider
      .when("/players", {
         templateUrl: "partials/players.html"
      })
      .when("/teams", {
         templateUrl: "partials/teams.html"
      })
      .when("/associations", {
         templateUrl: "partials/associations.html"
      })
      .otherwise({
         redirectTo: "/players"
      });
})


app.factory("playerFactory", [function(){
   var players = [];
   var factory = {};

   factory.addPlayer = function(newPlayer, callback) {
      console.log('player is added');
      newPlayer.team = '';
      players.push(newPlayer);
      callback();
   }

   factory.showPlayer = function(callback) {
      console.log('player is being shown')
      callback(players);
   }

   factory.deletePlayer = function(player, callback){
      console.log('player is being removed')
      players.splice(players.indexOf(player), 1)
      callback();
   }

   factory.update = function(association, callback){
     players[association.playerindex].team = association.team;
     callback(players);
   }


   return factory;
}])


app.factory("teamFactory", [function(){
   var teams = [];
   var factory = {};

   factory.addTeam = function(newTeam, callback){
      console.log("team is being added")
      teams.push(newTeam);
      callback();
   }

   factory.showTeam = function(callback) {
      console.log("team is being shown")
      callback(teams);
   }

   factory.deleteTeam = function(team, callback){
      teams.splice(teams.indexOf(team), 1)
      callback();
   }

   return factory;
}])

// CONTROLLERS
app.controller("playersController", ['$scope', 'playerFactory', function($scope, playerFactory){
   $scope.players = [];

   playerFactory.showPlayer(function(data) {
      $scope.players = data
   })

   $scope.addPlayer = function() {
      playerFactory.addPlayer($scope.newPlayer, function() {
         $scope.newPlayer = {};
      })
   }

   $scope.deletePlayer = function(player) {
      playerFactory.deletePlayer(player, function(){
         playerFactory.showPlayer(function(data){
            $scope.players = data
         })
      })
   }

}])

app.controller("teamsController", ['$scope', 'teamFactory', function($scope, teamFactory){
   $scope.teams = [];

   teamFactory.showTeam(function(data) {
      $scope.teams = data
   })

   $scope.addTeam = function() {
      teamFactory.addTeam($scope.newTeam, function() {
         $scope.newTeam = {};
      })
   }

   $scope.deleteTeam = function(team) {
      teamFactory.deleteTeam(team, function(){
         teamFactory.showTeam(function(data){
            $scope.teams = data
         })
      })
   }

}])

app.controller("associationsController", function($scope, playerFactory, teamFactory){
   $scope.teams = [];
   $scope.players = [];

   playerFactory.showPlayer(function(data) {
      $scope.players = data
   })

   teamFactory.showTeam(function(data) {
      $scope.teams = data
   })

   $scope.assignPlayer = function(){
      playerFactory.update($scope.association, function(players){
      console.log(players)
      })
   }


})


