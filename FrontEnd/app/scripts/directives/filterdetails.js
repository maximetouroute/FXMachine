'use strict';

/**
 * @ngdoc directive
 * @name frontEndApp.directive:filterDetails
 * @description
 * # filterDetails
 */
angular.module('frontEndApp')
       .directive('filterDetails', function () {
           return {
               templateUrl: '../../views/templates/filterDetailsTmpl.html',
               restrict   : 'E',
               scope      : {
                   filter: '='
               },
               controller : function ($scope, uuidGenerator) {
                   /**
                    * A unique id for every filter details container.
                    * @type {*|String}
                    */
                   $scope.uuid = uuidGenerator.generateUUID();

                   /**
                    * A toggle variable
                    * @type {boolean}
                    */
                   $scope.show = false;

                   /**
                    * This function shows the filter details container.
                    */
                   $scope.showFilter = function () {
                       angular.element('div[uuid=' + $scope.uuid + ']').collapse('show');
                       $scope.show = true;
                   };

                   /**
                    * This function hides the filter details container.
                    */
                   $scope.hideFilter = function () {
                       angular.element('div[uuid=' + $scope.uuid + ']').collapse('hide');
                       $scope.show = false;
                   };

               }
           };
       });
