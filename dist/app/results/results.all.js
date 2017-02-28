/*
 * IIFE to encapsulate code and avoid global variables
 */
(function() {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("resultsCtrl", ResultsCtrl);

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
    ResultsCtrl.$inject = ['$firebaseArray', 'firebase', '$state'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function ResultsCtrl($firebaseArray, firebase, $state) {
        var vm = this;
        var ref = firebase.database().ref().child("results");
        vm.results = $firebaseArray(ref);

        vm.results.$loaded()
            .then(function() {
                // Filter all result by Email

                // $scope.localResults = $filter('filter')($scope.results, { email: email });
            })


    }

})();