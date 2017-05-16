/**
 * Created by GunaySukru on 15.05.2017.
 */
app.service('voteService', function ($http, $q) {
    this.toVote = function (pollID, answer) {
        var deferred = $q.defer();
        $http.post('/api/vote/' + pollID + '/' + answer).then(function (response) {
            deferred.resolve(response.data[0]);
        }).catch(function (err) {
            deferred.reject(err);
        });
        return deferred.promise;
    };
});