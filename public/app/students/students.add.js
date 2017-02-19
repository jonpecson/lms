/*
 * IIFE to encapsulate code and avoid global variables
 */
(function() {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("studentsAddCtrl", StudentsAddCtrl);

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
    StudentsAddCtrl.$inject = ['Auth', '$firebaseArray', 'firebase', '$state'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function StudentsAddCtrl(Auth, $firebaseArray, firebase, $state) {
        var vm = this;
        vm.student = {};
        var ref = firebase.database().ref().child("students");
        vm.students = $firebaseArray(ref);
        vm.students.$loaded().then(function() {
            console.log(vm.students);
        })

        vm.addStudent = function() {

            //Holds the image url upload to firebase
            var imgUrl;

            // Create a storage reference 
            var storageRef = firebase.storage().ref();

            console.log(vm.student.photo);
            console.log(vm.student.photo.name);

            // Upload a file
            var uploadTask = storageRef.child('images/' + vm.student.photo.name).put(vm.student.photo);


            uploadTask.on('state_changed',

                function progress(snapshot) {
                    var percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    console.log(percentage);
                },

                function error(err) {
                    console.log(err);
                },

                function complete() {
                    imgUrl = uploadTask.snapshot.downloadURL;
                    vm.student.photo = imgUrl;
                    vm.students.$add(vm.student).then(function(x) {
                        console.log('Adding student complete: ' + x);
                    });
                });
        }

    }

})();