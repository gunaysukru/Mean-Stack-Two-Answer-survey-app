/**
 * Created by GunaySukru on 15.05.2017.
 */
var app = angular.module("surveyApp", ["ui.router", "angularModalService"]);

app.factory('DisableSSL', function ($location, $window) {
    return {
        activate: function () {
            if ($location.protocol() !== 'http') {
                $window.location.href = $location.absUrl().replace('https', 'http');
            }
        }
    };
})