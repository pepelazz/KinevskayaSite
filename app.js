(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/javascript/app.coffee":[function(require,module,exports){
require('./ng-app');

require('./yandex-map');

require('./problem-sqr');

require('./choice-select');



},{"./choice-select":"/Users/Trikster/static_sites/Kinavskaya/_Kinevskaya/src/javascript/choice-select.coffee","./ng-app":"/Users/Trikster/static_sites/Kinavskaya/_Kinevskaya/src/javascript/ng-app.coffee","./problem-sqr":"/Users/Trikster/static_sites/Kinavskaya/_Kinevskaya/src/javascript/problem-sqr.coffee","./yandex-map":"/Users/Trikster/static_sites/Kinavskaya/_Kinevskaya/src/javascript/yandex-map.coffee"}],"/Users/Trikster/static_sites/Kinavskaya/_Kinevskaya/src/javascript/choice-select.coffee":[function(require,module,exports){
var module;

module = angular.module('choiceSelect', []);

module.controller('choiceSelect', [
  '$rootScope', '$scope', (function($rootScope, $scope) {
    $scope.answer = 0;
    $scope.choice = (function(index) {
      if ($scope.answer === index) {
        $scope.answer = 0;
      } else {
        $scope.answer = index;
      }
    });
  })
]);



},{}],"/Users/Trikster/static_sites/Kinavskaya/_Kinevskaya/src/javascript/ng-app.coffee":[function(require,module,exports){
var module;

module = angular.module('app', ['yandexMap', 'problemSqr', 'choiceSelect']);

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



},{}],"/Users/Trikster/static_sites/Kinavskaya/_Kinevskaya/src/javascript/problem-sqr.coffee":[function(require,module,exports){
var calcArticleHeight, module;

module = angular.module('problemSqr', []);

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
        calcArticleHeight();
      })
    };
    ({
      selectedName: {}
    });
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
              model.currentPosition = [500 * model.coordOut[0], 500 * model.coordOut[1]];
            }
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

calcArticleHeight = (function() {
  var articles;
  articles = $('.article-text', '.problem-articles');
  setTimeout(function() {
    return articles.each(function(i) {
      var articleHeight;
      articleHeight = $(articles[i]).height();
      if (articleHeight > 0) {
        return $('.problem-square').css({
          height: articleHeight + $('.problem-articles').offset().top - $('.problem-square').offset().top
        });
      }
    });
  }, 100);
});



},{}],"/Users/Trikster/static_sites/Kinavskaya/_Kinevskaya/src/javascript/yandex-map.coffee":[function(require,module,exports){
var module;

module = angular.module('yandexMap', []);

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



},{}]},{},["./src/javascript/app.coffee"]);
