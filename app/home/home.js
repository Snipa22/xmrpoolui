'use strict';

app.controller('HomeCtrl', function($scope, $route, dataService, timerService) {
	
	var loadData = function () {
		dataService.getData("/config", function(data){
			$scope.config = data;
		});
	};
	
	loadData();
	// timerService.register(loadData, $route.current.controller);

	// $scope.$on("$routeChangeStart", function () {
	//    timerService.remove($route.current.controller);
	// });
});