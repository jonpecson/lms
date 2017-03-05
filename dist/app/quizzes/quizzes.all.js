/*
 * IIFE to encapsulate code and avoid global variables
 */
(function() {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("quizzesCtrl", QuizzesCtrl);

    /*
     * injecting the [] into the students controller 
     * using the $inject method.
     *
     * Injecting dependencies like this is done so as to avoid issues when 
     * uglifying the code. Function arguments will get shortened during the 
     * uglify process but strings will not. Therefore by injecting the argument
     * as strings in an array using the $inject method we can be sure angular 
     * still knows what we want to do.
     */
    QuizzesCtrl.$inject = ['$state', '$firebaseArray', 'firebase'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function QuizzesCtrl($state, $firebaseArray, firebase) {
        var vm = this;
        var ref = firebase.database().ref().child("quizzes");
        vm.quizzes = $firebaseArray(ref);
        vm.quizzes.$loaded().then(function() {
            console.log(vm.quizzes);
        })

        vm.removeQuiz = function(id) {
            var item = vm.quizzes.$getRecord(id);
            vm.quizzes.$remove(item);
        }

        vm.previewQuiz = function(id) {
            // console.log("Edit student: " + id);
            $state.go('app.quizzes.preview', { "id": id });
            // $state.go('app.students.edit');
        }


    }

})();