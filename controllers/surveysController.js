/**
 * Created by GunaySukru on 15.05.2017.
 */
app.controller("surveysController", function ($scope, surveyServices ) {
    $scope.surveys = [];
    surveyServices.getSurveysData().then(function (data) {
        $scope.surveys = data;
    }).catch(function (err) {
        console.error(err);
    });
});