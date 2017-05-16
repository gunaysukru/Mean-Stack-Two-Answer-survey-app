/**
 * Created by GunaySukru on 15.05.2017.
 */
app.service('surveyServices', function ($http, $q) {
    this.getSurveysData = function () {
        var deferred = $q.defer();
        $http.get('/api/surveys').then(function (response) {
            deferred.resolve(response.data);
        }).catch(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    this.getSurveyData = function (surveyID) {
        var deferred = $q.defer();
        $http.get('/api/survey/' + surveyID).then(function (response) {
            deferred.resolve(response.data[0]);
        }).catch(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
    this.addNewSurvey = function() {
        var deferred = $q.defer();
        $http.post('/api/newSurvey',
            {surveyName:questionName.value,
            answer1: answer1.value,
            answer2:answer2.value
            }).then(function (response) {
            deferred.resolve(response);
        }).catch(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    }
});