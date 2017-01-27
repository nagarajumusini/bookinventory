'use strict';

angular.module('myApp.index', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/index', {
    templateUrl: 'index/index.html',
    controller: 'IndexCtrl'
  });
}])


.controller('IndexCtrl', ['$scope','$rootScope', 'MetaService','USERSERVICE','$location', function($scope, $rootScope, MetaService, USERSERVICE, $location) {
	// Configure Meta Tags and Title
	$scope.templates =
	      [{ name: 'sidemenu.html', url: 'sidemenu/sidemenu.html'}];
	$scope.template = $scope.templates[0];
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("Dashboard | angular-seed","desc","blah blah");




    $rootScope.UserData = USERSERVICE.getUser();
    console.log(typeof $rootScope.UserData.userName);
  	if($rootScope.UserData.userName == undefined){
  		$location.path('/login');
  	}
}]);