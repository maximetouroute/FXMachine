'use strict';

/**
 * @ngdoc service
 * @name frontEndApp.filter2
 * @description
 * # filter
 * Service in the frontEndApp.
 */
angular.module('frontEndApp')
    .service('Filter', ['uuidGenerator', function (uuidGenerator) {
        // AngularJS will instantiate a singleton by calling "new" on this function


        class Filter {

            // TODO : ESTCE QUON A VRAIMENT BESOIN DUN TABLEAU DINPUTS ?? techniquement non... a voir.

            //****************** CONSTRUCTOR(S) STUFF

            /**
             * The constructor of Filter
             * @param type {String} - the type of filter we want to create.
             * @param webaudioService - the webaudioService, that we need know in which audio context we create the audioNodes
             */
            constructor(type, webaudioService) {


                var success = this.setAudioNode(type, webaudioService);

                if (success) {
                    // Continue construction
                    this._type = type;
                    // using uuidGenerator service
                    this._uuid = uuidGenerator.generateUUID();
                    this._inputs = [];
                    this._outputs = [];
                    console.log("Filter : success creation filter");
                }
                else {
                    console.error('we shoudlnt be here')
                }


            }


            /**
             * Object Constructor for a filter
             * @param filterJSON
             * @param webaudioService
             */
            objectContructor(filterJSON, webaudioService) {

                console.info("import filter : " + JSON.stringify(filterJSON));

                // IF AN OBJECT WAS PASSED THEN INITIALISE PROPERTIES FROM THAT OBJECT

                // *********** CONSTRUCTING VARIABLES
                // We loop on the JSON,  and put everything
                // Permit to initialize all the variables properly
                for (var prop in filterJSON) this[prop] = filterJSON[prop];

                // *********** CONSTRUCTING INNER-CLASSES
                // THEN, we need to update the objects.

                // HERE WE REINSTANTIATE OUR AUDIO NODE PROPERLY
                var audioNodeType = filterJSON._type;

                // ALL OUR AVAILABLE FILTERS ARE HERE
                switch (audioNodeType) {
                    // Only passing the audio signal
                    case 'node':
                        // TODO: doit disparaitre
                        // TODO : j'ai mis panner pour bien les differencier dans les graphes, mais a terme, mettre des gains.
                        this._audioNode = webaudioService.context.createPanner();
                        break;

                    // SPECIAL filters, to represent input and output of a graph
                    case 'input':
                        this._audioNode = webaudioService.context.createGain();
                        break;
                    case 'output':
                        this._audioNode = webaudioService.context.createGain();
                        break;

                    case 'gain':
                        this._audioNode = webaudioService.context.createGain();
                        break;
                    case 'biquad':
                        this._audioNode = webaudioService.context.createBiquadFilter();
                        break;
                    case "waveShaper":
                        this._audioNode = webaudioService.context.createWaveShaper();
                        break;
                    case "delay":
                        this._audioNode = webaudioService.context.createDelay(5.0);// represents the maximum delay time
                        break;
                    case "dynamicCompressor":
                        this._audioNode = webaudioService.context.createDynamicsCompressor();
                        break;
                    case "stereoPanner":
                        this._audioNode = webaudioService.context.createStereoPanner();
                        break;
                    case'visualiser':
                        this._audioNode = webaudioService.context.createAnalyser();
                        break;

                    default:
                        console.error("Filter : wrong type given to constructor :");
                        console.error(audioNodeType);
                        break;
                }

                // HERE WE SHOULD HAVE ALL OUR AUDIO NODES READY, but without the right parameters


                /*console.log("the filter at this point 2 :" + this);
                 for (var prop2 in filterJSON._audioNode) this._audioNode[prop2] = filterJSON._audioNode[prop2];

                 console.log("the filter at this point 3 :" + this);
                 console.info("change filter context");
                 //this.changeWebAudioContext(webaudioService.context);
                 */
            }

            /**
             * Takes care of the audionode Set part of the constructor(s)
             * @param type
             * @param webaudioService
             * @returns {boolean}
             */
            setAudioNode(type, webaudioService) {
                var success = true;

                // ALL OUR AVAILABLE FILTERS ARE HERE
                switch (type) {
                    // Only passing the audio signal
                    case 'node':
                        // TODO: doit disparaitre
                        // TODO : j'ai mis panner pour bien les differencier dans les graphes, mais a terme, mettre des gains.
                        this._audioNode = webaudioService.context.createPanner();
                        break;

                    // SPECIAL filters, to represent input and output of a graph
                    case 'input':
                        this._audioNode = webaudioService.context.createGain();
                        break;
                    case 'output':
                        this._audioNode = webaudioService.context.createGain();
                        break;

                    case 'gain':
                        this._audioNode = webaudioService.context.createGain();
                        break;
                    case 'biquad':
                        this._audioNode = webaudioService.context.createBiquadFilter();
                        break;
                    case "waveShaper":
                        this._audioNode = webaudioService.context.createWaveShaper();
                        break;
                    case "delay":
                        this._audioNode = webaudioService.context.createDelay(5.0);// represents the maximum delay time
                        break;
                    case "dynamicCompressor":
                        this._audioNode = webaudioService.context.createDynamicsCompressor();
                        break;
                    case "stereoPanner":
                        this._audioNode = webaudioService.context.createStereoPanner();
                        break;
                    case'visualiser':
                        this._audioNode = webaudioService.context.createAnalyser();
                        break;

                    default:
                        success = false;
                        console.error("Filter : wrong type given to constructor :");
                        console.error(type);
                        break;
                }

                return success;
            }

            /**
             * TODO : euhh
             */
            changeWebAudioContext(audioCtx) {
                // TODO : manque la conservation des parametres de chaque filtre.
                // Methode privilegiee : faire une "copie locale" du filtre
                //Rappeler le constructeur
                // Remettre tous les parametres SAUF le webaudioctx ? et encore il est même pas dedans je crois
                // TODO: on tente le coup avec la methode bruteforce
                this.context = audioCtx;
                //TODO : NOTE ! si ca marche, on peut supprimer des filtres du contexte en les mettant dans un ctx null
            }


            //********************************************************


            // TODO ca devrait ne servir a rien.
            /**
             * Adds a filter id to the filters input array.
             * @param {Filter} filter - The filter to add.
             */
            addInput(filterId) {
                this.inputs.push(filterId);
            }


            /**
             * Adds a filter id to the filters output array.
             * @param {Filter} filter - The filter to add.
             */
            addOutput(filterId) {
                this.outputs.push(filterId);
            }

            /**
             * Removes an input
             * @param filterId
             */
            removeInput(filterId) {
                var index = this._inputs.indexOf(filterId);


                if (index > -1) {
                    // removing the uuid from connexions
                    this._inputs.splice(index, 1);
                    console.info("input removed");
                }
                else {
                    console.info("no input to remove");
                }
            }

            /**
             * Removes an output
             * @param filterId
             */
            removeOutput(filterId) {
                var index = this._outputs.indexOf(filterId);

                if (index > -1) {
                    // removing the uuid from connexions
                    this._outputs.splice(index, 1);
                    console.info("output removed");
                }
                else {
                    console.info("no output to remove");
                }
            }


            /**
             * Clean all connexions of the filter
             */
            cleanConnexions() {
                this._outputs = [];
                this._inputs = [];
            }


            /**
             * Getter of the type.
             * @returns {String} The type of the filter.
             */
            get type() {
                return this._type;
            }

            /**
             * Getter of the filter.
             * @returns {AudioNode} The audioNode object.
             */
            get audioNode() {
                return this._audioNode;
            }

            /**
             * Getter of the filter's uuid.
             * @returns {String} The type of the filter.
             */
            get uuid() {
                return this._uuid;
            }

            /**
             * Getter of the filter's inputs.
             * @returns {Array of uuids} .
             */
            get inputs() {
                return this._inputs;
            }

            /**
             * Getter of the filter's outputs
             * @returns {Array of uuids}
             */
            get outputs() {
                return this._outputs;
            }
        }

        return Filter;

    }]);
