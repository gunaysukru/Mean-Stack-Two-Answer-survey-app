/**
 * Created by GunaySukru on 15.05.2017.
 */
var app = angular.module("surveyApp", ["ui.router"]);

app.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/surveys');

    $stateProvider
        .state('survey', {
            url: '/survey/:id',
            templateUrl: 'view/survey.html',
            controller: 'surveyController'
        })
        .state('surveys', {
            url: '/surveys',
            templateUrl: 'view/surveys.html',
            controller: 'surveysController'
        });
});