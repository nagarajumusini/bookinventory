'use strict';

angular.module('myApp.index', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/index', {
    templateUrl: 'index/index.html',
    controller: 'IndexCtrl'
  });
}])


.controller('IndexCtrl', ['$scope','$rootScope', 'MetaService','USERSERVICE','$location', '$http', function($scope, $rootScope, MetaService, USERSERVICE, $location, $http) {
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


     $scope.insertBook = function(item){
      
      if(typeof item.ISBN13 == 'undefined'){
        item.ISBN = '';
      }else{
        item.ISBN = item.ISBN13.toString().replace(/-/g, "");
      }

      if(typeof item.ISBN10 == 'undefined'){
        item.ISBN10 = '';
      }else{
        item.ISBN10 = item.ISBN10.toString().replace(/-/g, "");
      }

      var userData = USERSERVICE.getUser();
      item.userId = userData._id;

      var startTime = new Date().getTime();
      $http.post(SERVERAPI + 'api/book', item, {timeout : TIMEOUT}).then( 
        function(result) {
            if (result.data.status) {
                  
                  alert("success fully inserted");
            } else {
              
              alert(result.data.message);
            }
        },function(error) {
            
            var respTime = new Date().getTime() - startTime;
              if(respTime >= TIMEOUT){
                alert('Server is busy, please try again.');
              }else{
                alert('Something went wrong, Please contact administrator.');
              }
        }); 

   };
}]);