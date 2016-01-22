(function() {
  'use strict';
  angular.module('loc8rApp')
    .controller('locationDetailCtrl', locationDetailCtrl);

  //Manual injection to prevent errors on minification
  locationDetailCtrl.$inject = ['$routeParams', '$uibModal', 'loc8rData'];

  function locationDetailCtrl($routeParams, $uibModal, loc8rData) {
    var vm = this;
    var locationid = $routeParams.locationid;
    loc8rData.locationById(locationid)
      .success(function(data) {
        vm.data = {
          location: data
        };
        vm.pageHeader = {
          title: vm.data.location.name
        };
      })
      .error(function(e) {
        console.log(e);
      });
    vm.popupReviewForm = function() {
      var modalInstance = $uibModal.open({
        templateUrl: '/reviewModal/reviewModal.view.html',
        controller: 'reviewModalCtrl',
        controllerAs: 'vm',
        resolve: {
          locationData: {
            id: locationid,
            name: vm.data.location.name
          }
        }
      });
      modalInstance.result.then(function(data) {
        vm.data.location.reviews.push(data);
      });
    };
  }
}());