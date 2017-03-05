/*
 * IIFE to encapsulate code and avoid global variables
 */
(function() {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("studentsCtrl", StudentsCtrl);

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
    StudentsCtrl.$inject = ['$state', '$firebaseArray', 'firebase'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function StudentsCtrl($state, $firebaseArray, firebase) {
        var vm = this;
        var ref = firebase.database().ref().child("students");
        var user = firebase.auth().currentUser;

        vm.students = $firebaseArray(ref);

        vm.students.$loaded()
            .then(function() {
                console.log(vm.students);
            })

        vm.addStudent = function() {
            $state.go('app.students.add');
        }

        vm.editStudent = function(id) {
            // console.log("Edit student: " + id);
            $state.go('app.students.edit', { "id": id });
            // $state.go('app.students.edit');
        }

        vm.removeStudent = function(id) {
            // var item = vm.students.$getRecord(id);
            // vm.students.$remove(item);


            user.delete().then(function() {
                // User deleted.
                console.log("User deleted successfully.")
            }, function(error) {
                // An error happened.
                console.log("Error deleting the user.")
            });

        }
    }

})();