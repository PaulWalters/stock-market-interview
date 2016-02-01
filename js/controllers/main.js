'use strict';

angular.module('stockApp')
 .controller('MainCtrl', MainCtrl);

//MainCtrl.$inject = ['dataservice', 'logger'];

function MainCtrl($scope, dataservice) {
    var vm = this;
    vm.quote = [];
	$scope.stockSymbol ="";

    $scope.getStock = function() {
        return getQuote().then(function() {
             $scope.stockQuote = vm.quote;
			
        });
    }

    function getQuote() {
        return dataservice.getQuote($scope.stockSymbol)
            .then(function(data) {
                vm.quote = data;
                return vm.quote;
            });
    }
}