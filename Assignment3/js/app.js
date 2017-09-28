/* global angular */

(function () {
    "use strict";
    
    function MenuSearchService($http) {
        var service = this,
            found = [];
        
        service.getMatchedMenuItem = function (searchTerm) {
            var response = $http({
                method: "GET",
                url: "https://davids-restaurant.herokuapp.com/menu_items.json"
            });
            
            return response.then(function (result) {
                var i,
                    menuItems = result.data.menu_items;
                for (i = 0; i < menuItems.length; i += 1) {
                    if ((menuItems[i].description.indexOf(searchTerm) !== -1) && searchTerm !== "") {
                        found.push(menuItems[i]);
                    }
                }
                console.log(found);
                return found;
            });
        };
        
    }
    MenuSearchService.$inject = ['$http'];
    
    function NarrowItDownController(MenuSearchService) {
        var menu = this;
        menu.searchTerm = "";
        menu.findItems = function (searchTerm) {
            var promise = MenuSearchService.getMatchedMenuItem(searchTerm);
            
            promise.then(function (response) {
                menu.found = response;
            });
        };
        
        menu.removeItem = function (index) {
            menu.found.splice(index, 1);
        };
    }
    NarrowItDownController.$inject = ['MenuSearchService'];
    
    function FoundItemsDirectiveController() {
        var list = this;
        
        list.isListEmpty = function () {
            if (list.found.length === 0) {
                return true;
            } else {
                return false;
            }
        };
    }
    
    function FoundItemsDirective() {
        var ddo = {
            templateUrl: 'itemsloader.html',
            scope: {
                found: '<',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'list',
            bindToController: true
        };
        
        return ddo;
    }
    
    angular.module('NarrowItDownApp', []).controller('NarrowItDownController', NarrowItDownController).service('MenuSearchService', MenuSearchService).directive('foundItems', FoundItemsDirective);
}());