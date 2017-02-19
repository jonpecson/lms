/*
 * IIFE to encapsulate code and avoid global variables
 */
(function() {

    /*
     * attaching results controller function to the turtleFacts module 
     */
    angular
        .module("app")
        .controller("studentsEditCtrl", StudentsEditCtrl);

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
    StudentsEditCtrl.$inject = ['Auth', '$firebaseArray', 'firebase', '$state', '$stateParams'];

    /*
     * definition of the results controller function itself. Taking 
     * quizMetrics as an argument
     */
    function StudentsEditCtrl(Auth, $firebaseArray, firebase, $state, $stateParams) {
        var vm = this;
        var id = $stateParams.id;

        console.log("Edit student controller");


        vm.student = {};

        var ref = firebase.database().ref().child("students");
        vm.students = $firebaseArray(ref);
        vm.students.$loaded().then(function() {
            vm.student = vm.students.$getRecord(id);
        })

        vm.saveStudent = function() {
            console.log(vm.student.photo);

            //Holds the image url upload to firebase
            var imgUrl;

            // Create a storage reference 
            var storageRef = firebase.storage().ref();

            // Upload a fil

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
                    console.log('Upload complete: ' + imgUrl);
                    vm.student.photo = imgUrl;
                    vm.students.$save(vm.student).then(function(res) {
                        console.log(res) // true)
                        $state.go('app.students.all');
                    }, function(error) {
                        console.log("Error:", error);
                    });
                }
            )
        }


    }

})();