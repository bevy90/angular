/*global angular*/
(function () {
    "use strict";
    
    // Checks to see if there are any empty items in the menu entered
    function getEmptySpaces(my_arr) {
        var i,
            count = 0;
        for (i = 0; i < my_arr.length; i += 1) {
            if (my_arr[i] === "" || my_arr[i] === " ") {
                count += 1;
            }
        }
        
        return count;
    }
    
    function LunchCheckController($scope) {
        $scope.menu = "";
        $scope.message = "";
        $scope.textbox = {};
        $scope.checkMenu = function () {
            var menuItems = $scope.menu.split(','),
                emptyItems = getEmptySpaces(menuItems),
                finalCount = menuItems.length - emptyItems;
            
            if (finalCount === 0) {
                $scope.message = "Please enter data first";
                $scope.textbox = { "color": "red", "border": "1px solid red"};
            } else {
                $scope.textbox = { "color": "green", "border": "1px solid green"};
                
                if (finalCount <= 3) {
                    $scope.message = "Enjoy!";
                
                } else {
                    $scope.message = "Too much!";
                }
            }
        };
    }
    
    LunchCheckController.$inject = ['$scope'];
    
    angular.module('LunchCheck', []).controller('LunchController', LunchCheckController);
}());