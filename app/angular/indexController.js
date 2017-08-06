export default angular.module('home',[])
    .controller('indexController', ['$scope',function ($scope) {
        $scope.name = "webpack and angular";
    }]);