'use strict';

app.controller('PaymentsCtrl', function($scope, dataService) {
	$scope.payments = {};

	dataService.getData("/pool/payments/pplns", function(data){
		$scope.payments.pplns = data;
	});

	dataService.getData("/pool/payments/pps", function(data){
		$scope.payments.pps = data;
	});
});