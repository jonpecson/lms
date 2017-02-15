/*
 * IIFE to encapsulate code and avoid global variables
 */
(function () {

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
    LessonsCtrl.$inject = ['Auth', '$firebaseArray', 'firebase', '$state'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function LessonsCtrl(Auth, $firebaseArray, firebase, $state) {
        var vm = this;
        console.log("Lessons Controller")

        var ref = firebase.database().ref().child("lessons");
        // create a synchronized array

        console.log("Creating a lessons reference.");
        vm.lessons = $firebaseArray(ref);

        vm.lessons.$loaded()
            .then(function () {
               console.log(vm.lessons);
            })


        // console.log(vm.lessons);
        // add new items to the array
        // the message is automatically added to our Firebase database!
        vm.lesson = {
            "title": "Step-by-step HTML and CSS for Absolute Beginners",
            "description": "Learn how to code HTML5 + CSS3 to create your o...",
            "thumbnail": "https://udemy-images.udemy.com/course/750x422/73080_7783_6.jpg"
        };

        vm.login = function () {
            Auth.signInWithEmailAndPassword('jon@hybrain.co', '@123qweasd').catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            }).then(function (res) {
                console.log(res);
            });

        }

        vm.logout = function () {
            Auth.signOut();
        }

        vm.addLesson = function () {
            // vm.lessons.$loaded()
            //     .then(function () {
            //         vm.lessons.$add({
            //             title: vm.lesson.title,
            //             description: vm.lesson.description,
            //             thumbnail: vm.lesson.thumbnail
            //         }).then(function (x) {
            //             console.log(x);
            //         });
            //     });

            $state.go('app.lessons.add');

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