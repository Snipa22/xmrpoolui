'use strict';

app.controller('BlocksCtrl', function($scope, dataService) {
	$scope.blocks = {};

	dataService.getData("/pool/blocks/pps", function(data){
		$scope.blocks.pps = data;
	});

	dataService.getData("/pool/blocks/pplns", function(data){
		$scope.blocks.pplns = data;
	});
});