/**
 * Created by GunaySukru on 15.05.2017.
 */
app.controller("surveysController", function ($scope, surveyServices, voteService ) {
    $scope.surveys = [];
    function getSurveys() {
        surveyServices.getSurveysData().then(function (data) {
            $scope.surveys = data;
        }).catch(function (err) {
            console.error(err);
        });
    }
    getSurveys();
    $scope.toVoted1 = function (index) {
        voteService.toVote($scope.surveys[index]._id, 'answer1').then(function () {
            getSurveys();
        }).catch(function (err) {
            console.log(err)
        })
    }
    $scope.toVoted2 = function (index) {
        voteService.toVote($scope.surveys[index]._id, 'answer2').then(function () {
            getSurveys();
        }).catch(function (err) {
            console.log(err)
        })
    }
});