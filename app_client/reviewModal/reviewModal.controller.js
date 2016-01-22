(function() {
  'use strict';
  angular.module('loc8rApp')
    .controller('reviewModalCtrl', reviewModalCtrl);

  reviewModalCtrl.$inject = ['$uibModalInstance', 'locationData', 'loc8rData'];

  function reviewModalCtrl($uibModalInstance, locationData, loc8rData) {
    var vm = this;
    vm.location = locationData;
    vm.onSubmit = function() {
      vm.formError = '';
      if (!vm.formData || !vm.formData.name || !vm.formData.rating || !vm.formData.reviewText) {
        vm.error = 'All fields required, please try again.';
        return false;
      } else {
        vm.doAddReview(locationData.id, vm.formData);
      }
    };
    vm.modal = {
      cancel: function() {
        $uibModalInstance.dismiss('cancel');
      },
      close: function(result) {
        $uibModalInstance.close(result);
      }
    };

    vm.doAddReview = function(locationid, reviewData) {
      loc8rData.addReviewById(locationid, {
          author: reviewData.name,
          rating: reviewData.rating,
          reviewText: reviewData.reviewText
        }).success(function(data) {
          vm.modal.close(data);
        })
        .error(function() {
          vm.error = 'Your review has not been saved, try again.';
        });
    };
  }
}());