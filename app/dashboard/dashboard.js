'use strict';

app.controller('DashboardCtrl', function($scope , $route, dataService, timerService, minerService) {
	$scope.paymentAddress = "48s97vfViXi27Yd8gC9dgDbyToXzyFw2UM9BTFGsjKtH5mf8EHMnoe8gLyceFwNqnUMLnZEkpeTx8NE7tyxhy7ecL3JEjiB";

	$scope.addAddress = function (){
		if ($scope.paymentAddress){
			minerService.trackAddress($scope.paymentAddress);
			//$scope.paymentAddress = "";
		}
	}

	$scope.setAlarm = function(addr, bool){
		minerService.setAlarm(addr, bool);
	}

	// 48s97vfViXi27Yd8gC9dgDbyToXzyFw2UM9BTFGsjKtH5mf8EHMnoe8gLyceFwNqnUMLnZEkpeTx8NE7tyxhy7ecL3JEjiB

	// Recurring API calls and timer
	var loadData = function () {
		$scope.poolList.forEach(function(pool_type) {
		    dataService.getData("/pool/stats/"+pool_type, function(data){
				$scope.poolStats[pool_type] = data;
			});
		});

	}

	// Register call with timer 
	timerService.register(loadData, $route.current.controller);
	loadData();
	
	$scope.$on("$routeChangeStart", function () {
     timerService.remove($route.current.controller);
  });
});