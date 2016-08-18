  angular
    .controller('ButtonListController', loadFunction);

  loadFunction.$inject = ['$scope', 'structureService', 'storageService', '$location', '$rootScope'];

  function loadFunction($scope, structureService, storageService, $location, $rootScope) {
    //Register upper level modules
    structureService.registerModule($location, $scope, 'buttonlist');
    var list = [];

    $scope.click = function(item){
      var index = _.findIndex($scope.buttonlist.modulescope.newsections, {'url': item.url});
      $location.path(item.url);
    };

    angular.forEach($scope.buttonlist.modulescope.menuItems, function(value, key) {
      if (structureService.get().modules[value.path]) {
        if( typeof($rootScope.currentIndex) === 'undefined' && $location.path() === value.path)
          $rootScope.currentIndex = key;

        list.push({
          name: value.name,
          url: value.path
        });
      }
    });
    $scope.buttonlist.modulescope.newsections = list;
  }
