
/*TESTING*/


app.controller("httpController", function($scope, $http) {
    $scope.myData = {};
    $scope.doClick = function() {
        var responsePromise = $http.get("mymanager/users.do?op=t");

        responsePromise.success(function(data, status, headers, config) {
            $scope.myData.fromServer = data.title;
        });
        responsePromise.error(function(data, status, headers, config) {
            alert("AJAX failed!");
        });
    };
} );


//app.service('myService', function($http, $q) {
//  var _this = this;
//
//  this.promiseToHaveData = function() {
//      var defer = $q.defer();
//
//      $http.get('data/users.json')
//          .success(function(data) {
//              angular.extend(_this, data);
//              defer.resolve();
//          })
//          .error(function() {
//              defer.reject('could not find users.json');
//          });
//
//      return defer.promise;
//  };
//});