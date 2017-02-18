/*
 * IIFE to encapsulate code and avoid global variables
 */
(function () {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("studentsCtrl", StudentsCtrl);

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
    StudentsCtrl.$inject = ['Auth', '$firebaseArray', 'firebase'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function StudentsCtrl(Auth, $firebaseArray, firebase) {
        var vm = this;
        var ref = firebase.database().ref().child("lessons");
        vm.lessons = $firebaseArray(ref);

        vm.lessons.$loaded()
            .then(function () {
                console.log(vm.lessons);
            })
    }

})();