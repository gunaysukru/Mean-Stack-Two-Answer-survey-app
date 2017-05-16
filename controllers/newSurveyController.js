/**
 * Created by GunaySukru on 15.05.2017.
 */
app.controller("newSurveyController", function ($scope, $timeout, surveyServices) {

    $scope.addNewSurvey = function () {
        surveyServices.addNewSurvey().then(function (res) {
            $scope.addSurveySuccessful = 1;
            questionName.value = "";
            answer1.value = "";
            answer2.value = "";
            console.log(res);
        }).catch(function (err) {
            console.error(err);
            $scope.addSurveySuccessful = 2;
        });
        $timeout(function () {
            $scope.addSurveySuccessful = 0;
        }, 6000);
    }
});