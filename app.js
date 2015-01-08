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

  module.controller('problemSqr', [
    '$rootScope', '$scope', '$location', '$timeout', '$log', (function($rootScope, $scope, $location, $timeout, $log) {
      $scope.problems = [
        {
          name: 'work',
          coordIn: [1, 0],
          coordOut: [-1, -1],
          sign: 'работа',
          isSelected: false,
          sections: ['Синдром выгорания', 'Поиск призвания', 'Сложности в отношениях с партерами']
        }, {
          name: 'emotions',
          coordIn: [-1, 0],
          coordOut: [1, -1],
          sign: 'эмоции',
          isSelected: false
        }, {
          name: 'family',
          coordIn: [-1, -1],
          coordOut: [1, 1],
          sign: 'семья',
          isSelected: false
        }, {
          name: 'health',
          coordIn: [1, -1],
          coordOut: [-1, 1],
          sign: 'здоровье',
          isSelected: false
        }
      ];
      $scope.problemsSqr = {
        state: 'zoomOut',
        zoomInProblem: (function($index) {
          if ($scope.problemsSqr.state === 'zoomOut') {
            $scope.problemsSqr.state = 'zoomIn';
            $scope.problems[$index].isSelected = true;
            $('#circle-bg').addClass('big');
            $("[id^='sign-']").addClass('hide');
            $(".problem-square > .wrapper").addClass('hide');
            $('#problem-title').snabbt({
              from_position: [-142.5, -33, 0],
              position: [-142.5, -340, 0],
              duration: 200,
              easing: 'ease'
            });
          }
        }),
        zoomOutProblem: (function() {
          $scope.problemsSqr.state = 'zoomOut';
          $('#circle-bg').removeClass('big');
          $(".problem-square > .wrapper").removeClass('hide');
          $('#back-to-problem').removeClass('show');
          $('#problem-title-detail').html("");
          $('#problem-title').snabbt({
            from_position: [-142.5, -340, 0],
            position: [-142.5, -33, 0],
            duration: 200,
            easing: 'ease',
            callback: (function() {
              return setTimeout(function() {
                $("[id^='sign-']").removeClass('hide');
                return $('.problem-sections').removeClass('show');
              }, 150);
            })
          });
          $scope.problems.forEach(function(item) {
            return item.isSelected = false;
          });
          $scope.problemsSqr.selectedName = {};
        }),
        showArticle: (function(problemIndex, articleIndex) {
          $scope.problemsSqr.selectedName = {
            problem: problemIndex,
            article: articleIndex
          };
        })
      };
      ({
        selectedName: {}
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

  module.directive('myShake', [
    (function() {
      return {
        restrict: 'A',
        link: (function($scope, element, attrs) {
          element.on('mouseenter', (function() {
            if ($scope.problemsSqr.state === 'zoomOut') {
              snabbt(element, {
                rotation: [0, 0, Math.PI / 2],
                easing: 'spring',
                spring_constant: 1.9,
                spring_deacceleration: 0.9
              }).then({
                rotation: [0, 0, 0]
              });
            }
          }));
        })
      };
    })
  ]);

  module.directive('problemCircle', [
    (function() {
      return {
        restrict: 'A',
        link: function($scope, element, attrs, container) {
          var model;
          model = $scope.problems[attrs.problemCircle];
          $scope.$watch('problemsSqr.state', function(newVal, oldVal) {
            if (newVal === oldVal) {
              return;
            }
            if (newVal === 'zoomIn') {
              if (model.isSelected) {
                $(element).snabbt({
                  position: [175 * model.coordIn[0], 350 * model.coordIn[1], 0],
                  duration: 300,
                  easing: 'ease',
                  callback: (function() {
                    setTimeout(function() {
                      $('#problem-title-detail').html(model.sign);
                      $('#back-to-problem').addClass('show');
                      return $('.problem-sections').addClass('show');
                    }, 150);
                  })
                });
                model.currentPosition = [175 * model.coordIn[0], 350 * model.coordIn[1]];
              } else {
                $(element).snabbt({
                  position: [500 * model.coordOut[0], 500 * model.coordOut[1], 0],
                  duration: 300,
                  delay: 200,
                  easing: 'ease'
                });
              }
              model.currentPosition = [500 * model.coordOut[0], 500 * model.coordOut[1]];
            }
            if (newVal === 'zoomOut') {
              $(element).snabbt({
                from_position: [model.currentPosition[0], model.currentPosition[1], 0],
                position: [0, 0, 0],
                duration: 300,
                delay: 200,
                easing: 'ease-out'
              });
              return model.currentPosition = [0, 0];
            }
          });
        }
      };
    })
  ]);

}).call(this);
