'use strict';

angular.module('myApp.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope','$rootScope', 'MetaService','USERSERVICE','$http','$location', function($scope, $rootScope, MetaService,USERSERVICE, $http, $location) {
	// Configure Meta Tags and Title
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("Login | angular-seed","desc","");
    $scope.userData = {};
   $scope.loginUser = function(info){
   		console.log(info);
   		$scope.loading = true;

   		//$http.defaults.headers.post["Content-Type"] = "application/json";
	    var startTime = new Date().getTime();
	    $http.post(SERVERAPI + 'api/login', info, {timeout : TIMEOUT}).then( 
	    function(result) {
	    	//console.log(result);
	        if (result.data.status) {
				$scope.loading = false;
				USERSERVICE.setUser(result.data.data);
		        $location.path('/index');
		        
	        } else {
		       $scope.loading = false;
		       alert(result.data.message);
	        }
	    },function(error) {
	        $scope.loading = false;
	        var respTime = new Date().getTime() - startTime;
	        if(respTime >= TIMEOUT){
	          alert('Server is busy, please try again.');
	        }else{
	          alert('Please check entered details');
	        }
	    });

   };
}])

.service('USERSERVICE', function(){
    var setUser = function(user_data) {
        window.localStorage.userDetails = JSON.stringify(user_data);
    };

    var getUser = function(){
        return JSON.parse(window.localStorage.userDetails || '{}');
    };
    var dropUser = function(){
        window.localStorage.removeItem("userDetails");
        return true;
    };

    return {
        getUser: getUser,
        setUser: setUser,
        dropUser: dropUser
    };
});
