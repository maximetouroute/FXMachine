'use strict';

/**
 * Created by guillaume on 08/02/2016.
 */

/**
 * Ce service contient la liste des constantes de l'application.
 * Pour l'utiliser il suffit d'inclure le service <i>constants</i>.
 *
 * @example
 * angular.module('monModule')
 *  .controller('MonCtrl', ['constants', function (constants) {
 *    var serverAdress = constants.backendUrl;
 *  }]);
 *
 * @ngdoc service
 * @name frontEndApp.constants
 * @description
 * # constants
 * Constant in the frontEndApp.
 */
angular.module('frontEndApp')
       .constant('constants', {
           backendUrl : 'http://192.168.1.12:3000/' // L'adresse du serveur.
       });