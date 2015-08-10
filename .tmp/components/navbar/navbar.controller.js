'use strict';

angular.module('validMailApp').controller('NavbarCtrl', function ($scope, $location, Auth) {
  $scope.menu = [{
    'title': 'Home',
    'link': '/'
  }];

  $scope.isCollapsed = true;
  $scope.isLoggedIn = Auth.isLoggedIn;
  $scope.isAdmin = Auth.isAdmin;
  $scope.getCurrentUser = Auth.getCurrentUser;

  $scope.logout = function () {
    Auth.logout();
    $location.path('/login');
  };

  $scope.isActive = function (route) {
    return route === $location.path();
  };
});
//# sourceMappingURL=navbar.controller.js.map