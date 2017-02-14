/*
 * IIFE to encapsulate code and avoid global variables
 */
(function() {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("authCtrl", AuthCtrl);

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
    AuthCtrl.$inject = ['AuthService', '$state'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function AuthCtrl(AuthService, $state) {
        var vm = this;


        vm.user = {
            email: 'jon@hybrain.co',
            pasword: '@123qweasd'
        };

        this.login = function() {
                AuthService.signInWithEmailAndPassword(email, password).catch(function(error) {
                    // Handle Errors here.
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    // ...
                });

            }
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


    }

})();