/*
 * IIFE to encapsulate code and avoid global variables
 */
(function () {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("lessonsViewCtrl", LessonsViewCtrl);

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
    LessonsViewCtrl.$inject = ['$firebaseArray', 'firebase', '$state', '$stateParams'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function LessonsViewCtrl($firebaseArray, firebase, $state, $stateParams) {
        var vm = this;
        var id = $stateParams.id;
        vm.lesson = {};

        // console.log(id);

        var ref = firebase.database().ref().child("lessons");

        // create a synchronized array
        // console.log("Creating a lessons reference.");
        vm.lessons = $firebaseArray(ref);

        vm.lessons.$loaded()
            .then(function () {
                console.log(vm.lessons);
                vm.lesson = vm.lessons.$getRecord(id);
                console.log(vm.lesson);
            })

        vm.goBack = function() {
            $state.go('app.lessons.all');
        }


        // vm.lesson.title = "Hello";
        // vm.lessons.$save(vm.lesson).then(function (res) {
        //     console.log(res) // true)
        // }, function (error) {
        //     console.log("Error:", error);
        // });


    }

})();