'use strict';

const SERVERAPI = "https://fierce-hollows-55761.herokuapp.com/";
const TIMEOUT = 15000;
// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'metaservice',
  'myApp.index',
  'myApp.search',
  'myApp.login',
  'myApp.list',
  'myApp.version',
  'myApp.registration'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('!');
  $routeProvider.otherwise({redirectTo: '/login'});
}])
.run([ '$rootScope', '$location', '$anchorScroll', 'USERSERVICE', function( $rootScope, $location, $anchorScroll, USERSERVICE) {
  $rootScope.$on("$locationChangeSuccess", function(){
    $anchorScroll();
  });

}])
.controller('MainCtrl', ['$scope','USERSERVICE','$location','$rootScope', function($scope, USERSERVICE, $location, $rootScope){
    $scope.logout = function(){
      USERSERVICE.dropUser();
      $rootScope.UserData = USERSERVICE.getUser();
      $location.path('/login');
    };
}])
;
