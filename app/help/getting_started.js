'use strict';

app.controller('GettingStartedCtrl', function($scope, dataService) {
	$scope.portsList = {};

	dataService.getData("/pool/ports", function(data){
		$scope.portsList = data;
	});
});