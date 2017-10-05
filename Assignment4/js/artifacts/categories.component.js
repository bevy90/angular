(function () {
    "use strict";
    
    angular.module('Data').component('categoryComponent', {
        templateUrl: 'js/templates/categories.template.html',
        bindings: {
            categories: '<'
        }
    });
}());