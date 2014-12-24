(function() {
  var module;

  module = angular.module('app', []);

  module.controller('main', [
    '$rootScope', '$scope', '$http', '$location', '$timeout', '$log', (function($rootScope, $scope, $http, $location, $timeout, $log) {
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
                subject: 'Заявка с сайта kinevskaya.ru',
                html: '<h2>Заявка с сайта kinevskaya.ru</h2><ul><li>' + $scope.request.name + '</li><li>' + $scope.request.phone + '</li></ul>',
                text: 'Имя: ' + $scope.request.name + ', тел.: ' + $scope.request.phone,
                from_email: 'info@kinevskaya.ru',
                to: [
                  {
                    email: 'petma17@gmail.com',
                    name: 'Maria',
                    type: 'to'
                  }, {
                    email: 'pepelazz00@gmail.com',
                    name: 'admin',
                    type: 'to'
                  }
                ]
              }
            }
          }).done((function(data) {
            $log.info(data);
          })).fail((function() {
            $log.error('server not respond');
          }));
          $scope.request.name = null;
          $scope.request.phone = null;
          return false;
        })
      };
      $scope.getContent = (function() {
        $.ajax({
          method: 'POST',
          url: "https://mandrillapp.com/api/1.0/messages/content.json",
          data: {
            key: 'XrhYSIo5ZAQ6Dcbp5ItPDA',
            id: 'a5747fc40c334736933c17ac8c9dffc6'
          }
        }).done((function(data) {
          $log.info(data);
        })).fail((function() {
          $log.error('server not respond');
        }));
      });
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
