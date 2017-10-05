(function () {
    "use strict";
    
    function RoutesConfig($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/');
        
        $stateProvider.state('home', {
            url: '/',
            templateUrl: 'js/templates/home.template.html'
        }).state('categories', {
            url: '/categories',
            templateUrl: 'js/templates/main-categories.template.html',
            controller: 'CategoriesController as cat',
            resolve: {
                categories: ['MenuDataService', function (MenuDataService) {
                    return MenuDataService.getAllCategories();
                }]
            }
        }).state('items', {
            url: '/items/{categoryShortName}',
            templateUrl: 'js/templates/main-items.template.html',
            controller: 'ListItemsController as list',
            resolve: {
                items: ['$stateParams', 'MenuDataService', function ($stateParams, MenuDataService) {
                    return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
                }]
            }
        });
    }
    
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    angular.module('MenuApp').config(RoutesConfig);
}());