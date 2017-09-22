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
    
    function styleOutput(selector, count) {
        if (count === 0) {
            selector.style.color = "red";
            selector.style.border = "1px solid red";
        } else {
            selector.style.color = "green";
            selector.style.border = "1px solid green";
        }
    }
    
    function LunchCheckController($scope) {
        $scope.menu = "";
        $scope.message = "";
        $scope.checkMenu = function () {
            var menuItems = $scope.menu.split(','),
                emptyItems = getEmptySpaces(menuItems),
                finalCount = menuItems.length - emptyItems,
                textbox = document.querySelector("#textbox");
            
            if (finalCount === 0) {
                $scope.message = "Please enter data first";
                styleOutput(textbox, 0);
            } else if (finalCount <= 3) {
                $scope.message = "Enjoy!";
                styleOutput(textbox, 1);
            } else {
                $scope.message = "Too much!";
                styleOutput(textbox, 1);
            }
        };
    }
    
    LunchCheckController.$inject = ['$scope'];
    
    angular.module('LunchCheck', []).controller('LunchController', LunchCheckController);
}());