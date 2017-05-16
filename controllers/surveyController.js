/**
 * Created by GunaySukru on 15.05.2017.
 */
app.controller("surveyController", function ($scope, $http, $q, $stateParams, $state, $timeout, voteService, surveyServices) {
    $scope.surveyData = [];
    surveyServices.getSurveyData($stateParams.id).then(function (data) {
        $scope.surveyData = data;
        $scope.surveyName = $scope.surveyData.surveyName;

    });

    var calcPerVotes = function () {
        surveyServices.getSurveyData($stateParams.id).then(function (data) {
            $scope.surveyData = data;
        }).then(function () {
            $scope.positiveVoteCount = $scope.surveyData.answers.answer1.answerCount;
            $scope.negativeVoteCount = $scope.surveyData.answers.answer2.answerCount;
            $scope.positiveVotePercent = (($scope.surveyData.answers.answer1.answerCount * 100) / ($scope.surveyData.answers.answer1.answerCount + $scope.surveyData.answers.answer2.answerCount)).toFixed(2);
            $scope.negativeVotePercent = (($scope.surveyData.answers.answer2.answerCount * 100) / ($scope.surveyData.answers.answer1.answerCount + $scope.surveyData.answers.answer2.answerCount)).toFixed(2);
        }).catch(function (err) {
            console.error(err);
            $state.go('surveys')
        });
    }

    calcPerVotes();

    $scope.toVoted1 = function () {
        voteService.toVote($stateParams.id, 'answer1').then(function (res) {
            calcPerVotes();
        }).catch(function (err) {
            console.error(err)
        })
    }

    $scope.toVoted2 = function () {
        voteService.toVote($stateParams.id, 'answer2').then(function (res) {
            calcPerVotes()
        }).catch(function (err) {
            console.error(err)
        })
    }
});