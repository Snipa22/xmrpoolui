'use strict';

app.controller('DashboardCtrl', function($scope , $route, dataService, timerService, minerService) {
	$scope.paymentAddress = "";

	$scope.addAddress = function (){
		if ($scope.paymentAddress){
			minerService.trackAddress($scope.paymentAddress);
			//$scope.paymentAddress = "";
		}
	};

	$scope.setAlarm = function(addr, bool){
		minerService.setAlarm(addr, bool);
	};

	// 48s97vfViXi27Yd8gC9dgDbyToXzyFw2UM9BTFGsjKtH5mf8EHMnoe8gLyceFwNqnUMLnZEkpeTx8NE7tyxhy7ecL3JEjiB

	// Recurring API calls and timer
	var loadData = function () {
		$scope.poolList.forEach(function(pool_type) {
		    dataService.getData("/pool/stats/"+pool_type, function(data){
				$scope.poolStats[pool_type] = data;
			});
		});
        $scope.poolList.forEach(function(pool_type) {
            dataService.getData("/pool/blocks/"+pool_type, function(data){
            	if (data.length > 0){
                    $scope.lastBlock[pool_type] = data[0];
				} else {
                    $scope.lastBlock[pool_type] = {
                    	ts: 0,
						hash: "",
						diff: 0,
						shares: 0,
						height: 0,
						valid: false,
						unlocked: false,
						pool_type: pool_type,
						value: 0
					}
                }
            });
        });
	};

	// Register call with timer 
	timerService.register(loadData, $route.current.controller);
	loadData();
	
	$scope.$on("$routeChangeStart", function () {
     timerService.remove($route.current.controller);
  });
});