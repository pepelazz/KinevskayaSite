(function() {
  var module;

  module = angular.module('app', []);

  module.controller('main', [
    '$rootScope', '$scope', '$http', '$location', '$timeout', (function($rootScope, $scope, $http, $location, $timeout) {
      var fixFooter;
      fixFooter = (function() {
        if (($('header').height() + $('.main-area').height() + $('.footer').height()) < $(window).height()) {
          $('.footer').addClass('sticky');
        }
      });
      fixFooter();
      $(window).resize((function() {
        fixFooter();
      }));
      $rootScope.fixFooter = fixFooter;
      $scope.modal = {
        isShown: false
      };
    })
  ]);

  module.directive('yandexMap', [
    '$rootScope', (function($rootScope) {
      return {
        restrict: 'A',
        link: function($scope, element, attrs) {
          var coord, fixContentHeight, init;
          fixContentHeight = function() {
            var width;
            width = $(window).width();
            $(element).css('height', 500).css('width', width);
            $rootScope.fixFooter();
          };
          fixContentHeight();
          $(window).resize(function() {
            fixContentHeight();
          });
          coord = $scope.$eval(attrs.yandexMap);
          init = (function() {
            var myMap;
            myMap = new ymaps.Map("map", {
              center: [coord.lat, coord.lon],
              zoom: 16
            });
            myMap.controls.add('zoomControl', {
              left: 5,
              top: 15
            });
            myMap.balloon.open([coord.lat, coord.lon], coord.adr, {
              closeButton: false
            });
          });
          ymaps.ready(init);
        }
      };
    })
  ]);

}).call(this);
