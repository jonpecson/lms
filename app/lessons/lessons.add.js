/*
 * IIFE to encapsulate code and avoid global variables
 */
(function () {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("lessonsAddCtrl", LessonsAddCtrl);

    /*
     * injecting the [] into the lessons controller 
     * using the $inject method.
     *
     * Injecting dependencies like this is done so as to avoid issues when 
     * uglifying the code. Function arguments will get shortened during the 
     * uglify process but strings will not. Therefore by injecting the argument
     * as strings in an array using the $inject method we can be sure angular 
     * still knows what we want to do.
     */
    LessonsAddCtrl.$inject = [];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function LessonsAddCtrl() {
        var vm = this;

        /*
         * The pattern used in the controllers in this app puts all the 
         * properties and methods available to the view at the top of the 
         * function. Any methods are referenced as named functions which are 
         * defined at the bottom.
         *
         * This allows the interface of the controller to be seen at a glance. 
         * Which is not usually the case when defining methods as anon 
         * functions inline.
         */



        vm.validationOpt = {
            rules: {
                email: {
                    required: true,
                    // email: true,
                    minlength: 3
                },
                desc: {
                    required: true,
                    minlength: 10
                },
                passwordfield: {
                    required: true,
                    minlength: 6
                },
                cpasswordfield: {
                    required: true,
                    minlength: 6,
                    equalTo: '#passwordfield'
                },
                description: {
                    required: true
                },
                number: {
                    required: true
                },
                name: {
                    required: true
                },
                expiry: {
                    required: true
                },
                cvc: {
                    required: true
                }
            }
        };

        vm.wizardOpt = {
            tabClass: '',
            'nextSelector': '.button-next',
            'previousSelector': '.button-previous',
            'firstSelector': '.button-first',
            'lastSelector': '.button-last',
            onNext: function () {
                var $valid = angular.element('#wizardForm').valid(),
                    $validator;
                if (!$valid) {
                    //$validator.focusInvalid();
                    return false;
                }
            },
            onTabClick: function () {
                return false;
            }
        };




        vm.htmlContent = '<h2>Try me!</h2><p>textAngular is a super cool WYSIWYG Text Editor directive for AngularJS</p><p><b>Features:</b></p><ol><li>Automatic Seamless Two-Way-Binding</li><li style="color: blue;">Super Easy <b>Theming</b> Options</li><li>Simple Editor Instance Creation</li><li>Safely Parses Html for Custom Toolbar Icons</li><li>Doesn&apos;t Use an iFrame</li><li>Works with Firefox, Chrome, and IE8+</li></ol><p><b>Code at GitHub:</b> <a href="https://github.com/fraywing/textAngular">Here</a> </p>';
        vm.text = 'Hello World';
        vm.opt1 = {
            toolbar: {
                fa: true
            }
        };


    }

})();