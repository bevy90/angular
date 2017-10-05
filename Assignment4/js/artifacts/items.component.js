(function () {
    "use strict";
    
    angular.module('Data').component('itemsComponent', {
        templateUrl: 'js/templates/items.template.html',
        bindings: {
            items: '<'
        }
    });
}());