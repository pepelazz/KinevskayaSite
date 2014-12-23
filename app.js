(function() {
  var module;

  module = angular.module('app', []);

  module.controller('main', [
    '$rootScope', '$scope', '$http', '$location', '$timeout', '$log', (function($rootScope, $scope, $http, $location, $timeout, $log) {
      var fixFooter;
      fixFooter = (function() {
        if (($('header').innerHeight() + $('.main-area').innerHeight() + $('.footer').innerHeight()) < $(window).innerHeight()) {
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
      $scope.request = {
        name: null,
        phone: null,
        send: (function() {
          $scope.modal.isShown = false;
          $.ajax({
            method: 'POST',
            url: "https://mandrillapp.com/api/1.0/messages/send.json",
            data: {
              key: 'XrhYSIo5ZAQ6Dcbp5ItPDA',
              message: {
                from_email: 'pepelazz00@gmail.com',
                to: [
                  {
                    email: 'markovmail@gmail.com',
                    name: 'alex',
                    type: 'to'
                  }
                ]
              },
              subject: 'test email',
              html: '<p>Example HTML content</p>',
              text: 'example content'
            }
          }).done((function(data) {
            $log.info(data);
          })).fail((function() {
            $log.error('server not respond');
          }));
          return false;
        })
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
