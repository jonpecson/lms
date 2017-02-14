/*
 * IIFE to encapsulate code and avoid global variables
 */
(function() {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("lessonsCtrl", LessonsCtrl);

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
    LessonsCtrl.$inject = ['Auth', '$firebaseArray', 'firebase'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function LessonsCtrl(Auth, $firebaseArray, firebase) {

        var vm = this;
        vm.msg = "Hello World";

        vm.user = {
            email: 'jon@hybrain.co',
            password: '@123qweasd'
        };

        Auth.signInWithEmailAndPassword(vm.user.email, vm.user.password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // ...
        }).then(function(res) {
            console.log(res);
        });


        vm.login = function() {
            Auth.signInWithEmailAndPassword(vm.user.email, vm.user.password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            }).then(function(res) {
                console.log(res);
            });

        }

        // vm.writeUserData = function() { 
        //     firebase.database().ref('users/' + 1).set({
        //         username: 'name',
        //         email: 'email',
        //         profile_picture: 'imageUrl'
        //     });
        // }

        var ref = firebase.database().ref().child("messages");
        // create a synchronized array
        vm.messages = $firebaseArray(ref);
        // add new items to the array
        // the message is automatically added to our Firebase database!
        vm.addMessage = function() {
            vm.messages.$add({
                text: vm.msg
            }).then(function(x) {
                console.log(x);
            });
        };

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